begin;

create table if not exists crm_customer_profiles (
  id text primary key,
  customer_id text not null unique references customers(id) on delete cascade,
  segment text not null default 'NEW',
  vip_score integer not null default 0,
  lifetime_value numeric(12,2) not null default 0,
  total_orders integer not null default 0,
  total_reservations integer not null default 0,
  last_activity_at timestamptz,
  preferred_channel text not null default 'EMAIL',
  do_not_contact boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists crm_customer_tags (
  id text primary key,
  customer_id text not null references customers(id) on delete cascade,
  tag text not null,
  created_at timestamptz not null default now(),
  unique(customer_id, tag)
);

create table if not exists crm_customer_notes (
  id text primary key,
  customer_id text not null references customers(id) on delete cascade,
  author_label text not null,
  note text not null,
  created_at timestamptz not null default now()
);

create table if not exists crm_customer_events (
  id text primary key,
  customer_id text not null references customers(id) on delete cascade,
  event_type text not null,
  source text not null,
  reference_id text,
  amount numeric(12,2),
  metadata_json jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table if not exists crm_campaigns (
  id text primary key,
  name text not null,
  channel text not null check(channel in ('EMAIL','WHATSAPP')),
  audience_filter jsonb not null default '{}'::jsonb,
  status text not null default 'DRAFT',
  estimated_recipients integer not null default 0,
  sent_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists crm_profile_segment_idx
  on crm_customer_profiles(segment, vip_score desc);

create index if not exists crm_profile_value_idx
  on crm_customer_profiles(lifetime_value desc);

create index if not exists crm_tags_customer_idx
  on crm_customer_tags(customer_id, tag);

create index if not exists crm_notes_customer_idx
  on crm_customer_notes(customer_id, created_at desc);

create index if not exists crm_events_customer_idx
  on crm_customer_events(customer_id, occurred_at desc);

alter table crm_customer_profiles enable row level security;
alter table crm_customer_tags enable row level security;
alter table crm_customer_notes enable row level security;
alter table crm_customer_events enable row level security;
alter table crm_campaigns enable row level security;

insert into schema_migrations(version)
values ('007_crm')
on conflict (version) do nothing;

commit;
