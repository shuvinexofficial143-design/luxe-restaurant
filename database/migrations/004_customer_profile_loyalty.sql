begin;

create table if not exists customer_profiles (
  customer_id text primary key references customers(id) on delete cascade,
  favourite_area text,
  dietary_preferences jsonb not null default '[]'::jsonb,
  favourite_cuisines jsonb not null default '[]'::jsonb,
  marketing_opt_in boolean not null default false,
  notes text,
  updated_at timestamptz not null default now()
);

create table if not exists customer_occasions (
  id text primary key,
  customer_id text not null references customers(id) on delete cascade,
  label text not null,
  occasion_date date not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists customer_saved_dishes (
  id text primary key,
  customer_id text not null references customers(id) on delete cascade,
  dish_slug text not null,
  dish_title text not null,
  image_url text,
  created_at timestamptz not null default now(),
  unique(customer_id, dish_slug)
);

create table if not exists loyalty_wallets (
  customer_id text primary key references customers(id) on delete cascade,
  points_balance integer not null default 0 check(points_balance >= 0),
  lifetime_points integer not null default 0 check(lifetime_points >= 0),
  tier text not null default 'EMBER',
  updated_at timestamptz not null default now()
);

create table if not exists loyalty_transactions (
  id text primary key,
  customer_id text not null references customers(id) on delete cascade,
  transaction_type text not null check(transaction_type in ('EARN','REDEEM','ADJUST')),
  points integer not null,
  source text not null,
  reference_id text,
  description text not null,
  created_at timestamptz not null default now()
);

create index if not exists customer_occasions_customer_idx
  on customer_occasions(customer_id, occasion_date);

create index if not exists saved_dishes_customer_idx
  on customer_saved_dishes(customer_id, created_at desc);

create index if not exists loyalty_transactions_customer_idx
  on loyalty_transactions(customer_id, created_at desc);

alter table customer_profiles enable row level security;
alter table customer_occasions enable row level security;
alter table customer_saved_dishes enable row level security;
alter table loyalty_wallets enable row level security;
alter table loyalty_transactions enable row level security;

insert into schema_migrations(version)
values ('004_customer_profile_loyalty')
on conflict (version) do nothing;

commit;
