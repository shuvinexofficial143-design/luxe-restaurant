begin;

alter table admin_users
  add column if not exists last_login_at timestamptz,
  add column if not exists updated_at timestamptz not null default now();

alter table admin_sessions
  add column if not exists user_agent text,
  add column if not exists ip_hint text,
  add column if not exists last_seen_at timestamptz not null default now();

create unique index if not exists admin_users_email_lower_idx
  on admin_users(lower(email));

create index if not exists admin_sessions_active_token_idx
  on admin_sessions(token_hash, expires_at)
  where revoked_at is null;

create table if not exists security_audit_events (
  id text primary key,
  admin_user_id text references admin_users(id) on delete set null,
  event_type text not null,
  severity text not null default 'INFO'
    check(severity in ('INFO','WARN','CRITICAL')),
  ip_hint text,
  user_agent text,
  resource text,
  action text,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists security_rate_limits (
  rate_key text not null,
  bucket_start timestamptz not null,
  hit_count integer not null default 0,
  expires_at timestamptz not null,
  primary key(rate_key, bucket_start)
);

create index if not exists security_audit_created_idx
  on security_audit_events(created_at desc);

create index if not exists security_audit_user_idx
  on security_audit_events(admin_user_id, created_at desc);

create index if not exists security_rate_limits_expiry_idx
  on security_rate_limits(expires_at);

alter table security_audit_events enable row level security;
alter table security_rate_limits enable row level security;

create or replace function luxe_security_rate_limit(
  p_key text,
  p_limit integer,
  p_window_seconds integer
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_window integer := greatest(60, least(p_window_seconds, 86400));
  v_limit integer := greatest(1, least(p_limit, 10000));
  v_bucket timestamptz;
  v_count integer;
  v_reset timestamptz;
begin
  v_bucket := to_timestamp(
    floor(extract(epoch from v_now) / v_window) * v_window
  );
  v_reset := v_bucket + make_interval(secs => v_window);

  perform pg_advisory_xact_lock(hashtext(p_key || '|' || v_bucket::text));

  delete from security_rate_limits
  where expires_at < v_now - interval '1 day';

  insert into security_rate_limits(rate_key,bucket_start,hit_count,expires_at)
  values(p_key,v_bucket,1,v_reset)
  on conflict(rate_key,bucket_start)
  do update set hit_count = security_rate_limits.hit_count + 1
  returning hit_count into v_count;

  return jsonb_build_object(
    'allowed', v_count <= v_limit,
    'count', v_count,
    'limit', v_limit,
    'remaining', greatest(0, v_limit - v_count),
    'resetAt', v_reset
  );
end;
$$;

grant execute on function luxe_security_rate_limit(text,integer,integer)
to service_role;

insert into schema_migrations(version)
values ('010_security_rbac')
on conflict(version) do nothing;

commit;
