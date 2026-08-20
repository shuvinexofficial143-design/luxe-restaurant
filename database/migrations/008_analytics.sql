begin;

create table if not exists analytics_events (
  id text primary key,
  event_name text not null,
  customer_id text references customers(id) on delete set null,
  session_id text,
  source text not null default 'web',
  path text,
  value_numeric numeric(14,2),
  metadata_json jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table if not exists analytics_daily_snapshots (
  snapshot_date date primary key,
  reservation_count integer not null default 0,
  confirmed_reservations integer not null default 0,
  cancelled_reservations integer not null default 0,
  order_count integer not null default 0,
  completed_orders integer not null default 0,
  order_revenue numeric(14,2) not null default 0,
  avg_order_value numeric(14,2) not null default 0,
  new_customers integer not null default 0,
  active_customers integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists analytics_events_name_idx
  on analytics_events(event_name, occurred_at desc);

create index if not exists analytics_events_customer_idx
  on analytics_events(customer_id, occurred_at desc);

create index if not exists analytics_events_path_idx
  on analytics_events(path, occurred_at desc);

alter table analytics_events enable row level security;
alter table analytics_daily_snapshots enable row level security;

insert into schema_migrations(version)
values ('008_analytics')
on conflict (version) do nothing;

commit;
