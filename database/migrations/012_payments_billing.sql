begin;

create table if not exists payment_intents (
  id text primary key,
  entity_type text not null check(entity_type in ('ORDER','RESERVATION')),
  entity_id text not null,
  amount numeric(14,2) not null check(amount > 0),
  currency text not null default 'INR',
  status text not null default 'CREATED'
    check(status in ('CREATED','PENDING','PAID','FAILED','REFUNDED','PARTIALLY_REFUNDED')),
  razorpay_order_id text,
  razorpay_payment_id text,
  failure_code text,
  failure_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists billing_receipts (
  id text primary key,
  payment_intent_id text not null references payment_intents(id) on delete cascade,
  receipt_number text not null unique,
  entity_type text not null,
  entity_id text not null,
  amount numeric(14,2) not null,
  currency text not null default 'INR',
  customer_name text,
  customer_email text,
  customer_phone text,
  payment_id text,
  issued_at timestamptz not null default now()
);

create table if not exists refund_requests (
  id text primary key,
  payment_intent_id text not null references payment_intents(id) on delete cascade,
  requested_amount numeric(14,2) not null check(requested_amount > 0),
  reason text not null,
  status text not null default 'REQUESTED'
    check(status in ('REQUESTED','PROCESSING','REFUNDED','FAILED','REJECTED')),
  razorpay_refund_id text,
  provider_status text,
  requested_by text,
  processed_by text,
  last_error text,
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create index if not exists payment_intents_entity_idx
  on payment_intents(entity_type, entity_id, created_at desc);

create index if not exists payment_intents_status_idx
  on payment_intents(status, created_at desc);

create index if not exists billing_receipts_entity_idx
  on billing_receipts(entity_type, entity_id, issued_at desc);

create index if not exists refund_requests_status_idx
  on refund_requests(status, created_at asc);

alter table payment_intents enable row level security;
alter table billing_receipts enable row level security;
alter table refund_requests enable row level security;

insert into schema_migrations(version)
values ('012_payments_billing')
on conflict(version) do nothing;

commit;
