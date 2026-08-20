begin;

create table if not exists communication_preferences (
  id text primary key,
  customer_id text not null unique references customers(id) on delete cascade,
  transactional_email boolean not null default true,
  transactional_whatsapp boolean not null default false,
  marketing_email boolean not null default false,
  marketing_whatsapp boolean not null default false,
  language text not null default 'en' check(language in ('en','hi')),
  updated_at timestamptz not null default now()
);

create table if not exists notification_delivery_events (
  id text primary key,
  notification_id text not null references notification_queue(id) on delete cascade,
  provider text not null,
  event_type text not null,
  provider_message_id text,
  payload_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table notification_queue
  add column if not exists category text not null default 'TRANSACTIONAL'
    check(category in ('TRANSACTIONAL','MARKETING')),
  add column if not exists subject_label text,
  add column if not exists consent_checked_at timestamptz;

create index if not exists communication_preferences_customer_idx
  on communication_preferences(customer_id);

create index if not exists notification_delivery_notification_idx
  on notification_delivery_events(notification_id, created_at desc);

create index if not exists notification_queue_customer_idx
  on notification_queue(customer_id, created_at desc);

alter table communication_preferences enable row level security;
alter table notification_delivery_events enable row level security;

insert into schema_migrations(version)
values ('013_communications_consent')
on conflict(version) do nothing;

commit;
