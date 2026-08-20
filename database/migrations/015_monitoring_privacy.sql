begin;

create table if not exists system_error_events (
  id text primary key,
  source text not null,
  severity text not null default 'ERROR'
    check(severity in ('INFO','WARN','ERROR','CRITICAL')),
  message text not null,
  stack_text text,
  request_path text,
  request_id text,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists backup_exports (
  id text primary key,
  requested_by text,
  scope text not null,
  status text not null default 'CREATED'
    check(status in ('CREATED','EXPORTED','FAILED')),
  record_count integer not null default 0,
  manifest_json jsonb not null default '{}'::jsonb,
  last_error text,
  created_at timestamptz not null default now()
);

create table if not exists privacy_requests (
  id text primary key,
  customer_id text references customers(id) on delete set null,
  request_type text not null
    check(request_type in ('EXPORT','DELETE','CORRECT')),
  status text not null default 'REQUESTED'
    check(status in ('REQUESTED','IN_REVIEW','COMPLETED','REJECTED')),
  request_note text,
  resolution_note text,
  requested_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists system_error_events_created_idx
  on system_error_events(created_at desc);

create index if not exists backup_exports_created_idx
  on backup_exports(created_at desc);

create index if not exists privacy_requests_status_idx
  on privacy_requests(status, requested_at asc);

alter table system_error_events enable row level security;
alter table backup_exports enable row level security;
alter table privacy_requests enable row level security;

insert into schema_migrations(version)
values ('015_monitoring_privacy')
on conflict(version) do nothing;

commit;
