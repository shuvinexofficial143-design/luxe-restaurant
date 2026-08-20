begin;

create table if not exists customers (
  id text primary key,
  name text not null,
  email text not null unique,
  phone text,
  password_hash text not null,
  email_verified boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists customer_sessions (
  id text primary key,
  customer_id text not null references customers(id) on delete cascade,
  token_hash text not null unique,
  user_agent text,
  ip_hint text,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists password_reset_tokens (
  id text primary key,
  customer_id text not null references customers(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists customers_email_idx
  on customers(lower(email));

create index if not exists customer_sessions_customer_idx
  on customer_sessions(customer_id, created_at desc);

create index if not exists customer_sessions_token_idx
  on customer_sessions(token_hash);

create index if not exists password_reset_token_idx
  on password_reset_tokens(token_hash);

alter table customers enable row level security;
alter table customer_sessions enable row level security;
alter table password_reset_tokens enable row level security;

insert into schema_migrations(version)
values ('003_customer_auth')
on conflict (version) do nothing;

commit;
