begin;

create table if not exists webhook_events (
  id text primary key,
  provider text not null,
  external_event_id text not null,
  event_type text not null,
  payload_json jsonb not null,
  signature_verified boolean not null default false,
  processing_status text not null default 'RECEIVED'
    check(processing_status in ('RECEIVED','QUEUED','PROCESSING','PROCESSED','FAILED')),
  attempts integer not null default 0,
  last_error text,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  unique(provider, external_event_id)
);

create table if not exists async_jobs (
  id text primary key,
  job_type text not null,
  status text not null default 'QUEUED'
    check(status in ('QUEUED','RUNNING','SUCCEEDED','FAILED','DEAD')),
  payload_json jsonb not null default '{}'::jsonb,
  attempts integer not null default 0,
  max_attempts integer not null default 6,
  run_after timestamptz not null default now(),
  locked_at timestamptz,
  locked_by text,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists notification_queue (
  id text primary key,
  customer_id text references customers(id) on delete set null,
  channel text not null check(channel in ('EMAIL','WHATSAPP')),
  recipient text not null,
  template_key text not null,
  payload_json jsonb not null default '{}'::jsonb,
  status text not null default 'QUEUED'
    check(status in ('QUEUED','PROCESSING','SENT','FAILED','DEAD')),
  attempts integer not null default 0,
  max_attempts integer not null default 6,
  run_after timestamptz not null default now(),
  provider_message_id text,
  last_error text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

create table if not exists payment_events (
  id text primary key,
  provider text not null,
  external_event_id text not null,
  entity_type text,
  entity_id text,
  event_type text not null,
  amount numeric(14,2),
  currency text,
  payment_id text,
  order_id text,
  status text,
  raw_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(provider, external_event_id)
);

create index if not exists webhook_events_status_idx
  on webhook_events(processing_status, received_at);

create index if not exists async_jobs_ready_idx
  on async_jobs(status, run_after, created_at);

create index if not exists notification_queue_ready_idx
  on notification_queue(status, run_after, created_at);

create index if not exists payment_events_entity_idx
  on payment_events(entity_type, entity_id, created_at desc);

alter table webhook_events enable row level security;
alter table async_jobs enable row level security;
alter table notification_queue enable row level security;
alter table payment_events enable row level security;

create or replace function luxe_ingest_webhook(
  p_provider text,
  p_external_event_id text,
  p_event_type text,
  p_payload jsonb,
  p_signature_verified boolean
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_event_id text;
  v_inserted integer;
  v_job_id text;
begin
  v_event_id := 'WH-' || replace(gen_random_uuid()::text,'-','');

  insert into webhook_events(
    id,provider,external_event_id,event_type,payload_json,
    signature_verified,processing_status
  )
  values(
    v_event_id,p_provider,p_external_event_id,p_event_type,p_payload,
    p_signature_verified,'RECEIVED'
  )
  on conflict(provider,external_event_id) do nothing;

  get diagnostics v_inserted = row_count;

  if v_inserted = 0 then
    select id into v_event_id
    from webhook_events
    where provider = p_provider
      and external_event_id = p_external_event_id
    limit 1;

    return jsonb_build_object(
      'accepted', true,
      'duplicate', true,
      'eventId', v_event_id
    );
  end if;

  v_job_id := 'JOB-' || replace(gen_random_uuid()::text,'-','');

  insert into async_jobs(
    id,job_type,status,payload_json,max_attempts,run_after
  )
  values(
    v_job_id,
    'WEBHOOK_PROCESS',
    'QUEUED',
    jsonb_build_object('webhookEventId',v_event_id),
    8,
    now()
  );

  update webhook_events
  set processing_status = 'QUEUED'
  where id = v_event_id;

  return jsonb_build_object(
    'accepted', true,
    'duplicate', false,
    'eventId', v_event_id,
    'jobId', v_job_id
  );
end;
$$;

create or replace function luxe_claim_jobs(
  p_worker_id text,
  p_limit integer default 10
)
returns setof async_jobs
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  with picked as (
    select id
    from async_jobs
    where status in ('QUEUED','FAILED')
      and run_after <= now()
      and attempts < max_attempts
    order by run_after asc, created_at asc
    for update skip locked
    limit greatest(1,least(p_limit,25))
  )
  update async_jobs j
  set
    status = 'RUNNING',
    attempts = j.attempts + 1,
    locked_at = now(),
    locked_by = p_worker_id,
    updated_at = now()
  from picked
  where j.id = picked.id
  returning j.*;
end;
$$;

create or replace function luxe_complete_job(
  p_job_id text,
  p_worker_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_updated integer;
begin
  update async_jobs
  set
    status = 'SUCCEEDED',
    locked_at = null,
    locked_by = null,
    last_error = null,
    updated_at = now()
  where id = p_job_id
    and status = 'RUNNING'
    and locked_by = p_worker_id;

  get diagnostics v_updated = row_count;

  return jsonb_build_object(
    'ok', v_updated = 1,
    'status', case when v_updated = 1 then 'SUCCEEDED' else 'NOT_OWNED' end
  );
end;
$$;

create or replace function luxe_fail_job(
  p_job_id text,
  p_worker_id text,
  p_error text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_job async_jobs%rowtype;
  v_dead boolean;
  v_delay integer;
begin
  select *
  into v_job
  from async_jobs
  where id = p_job_id
    and status = 'RUNNING'
    and locked_by = p_worker_id
  for update;

  if v_job.id is null then
    return jsonb_build_object('ok',false,'status','NOT_OWNED');
  end if;

  v_dead := v_job.attempts >= v_job.max_attempts;
  v_delay := least(
    3600,
    30 * (2 ^ greatest(v_job.attempts - 1,0))
  );

  update async_jobs
  set
    status = case when v_dead then 'DEAD' else 'FAILED' end,
    run_after = case
      when v_dead then run_after
      else now() + make_interval(secs => v_delay)
    end,
    locked_at = null,
    locked_by = null,
    last_error = left(p_error,2000),
    updated_at = now()
  where id = p_job_id;

  return jsonb_build_object(
    'ok', true,
    'status', case when v_dead then 'DEAD' else 'FAILED' end,
    'retryInSeconds', case when v_dead then 0 else v_delay end
  );
end;
$$;

grant execute on function luxe_ingest_webhook(text,text,text,jsonb,boolean)
to service_role;

grant execute on function luxe_claim_jobs(text,integer)
to service_role;

grant execute on function luxe_complete_job(text,text)
to service_role;

grant execute on function luxe_fail_job(text,text,text)
to service_role;

insert into schema_migrations(version)
values ('011_async_jobs_webhooks')
on conflict(version) do nothing;

commit;
