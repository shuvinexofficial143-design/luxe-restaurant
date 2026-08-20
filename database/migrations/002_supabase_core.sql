begin;

create extension if not exists pgcrypto;

create table if not exists admin_users (
  id text primary key,
  name text not null,
  email text not null unique,
  password_hash text not null,
  role text not null check (role in ('OWNER','ADMIN','MANAGER','CONTENT','HOST','KITCHEN')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists admin_sessions (
  id text primary key,
  user_id text not null references admin_users(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists reservations (
  id text primary key,
  guest_name text not null,
  email text not null,
  phone text not null,
  reservation_date date not null,
  reservation_time text not null,
  guest_count integer not null check (guest_count between 1 and 30),
  area text,
  table_id text,
  occasion text,
  notes text,
  status text not null default 'CONFIRMED',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists orders (
  id text primary key,
  guest_name text not null,
  phone text not null,
  fulfillment text not null,
  table_number text,
  pickup_time text,
  subtotal numeric(12,2) not null default 0,
  service_charge numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  status text not null default 'RECEIVED',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id text primary key,
  order_id text not null references orders(id) on delete cascade,
  menu_item_slug text not null,
  title text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null,
  created_at timestamptz not null default now()
);

create table if not exists cms_content (
  id text primary key,
  collection text not null,
  title text not null,
  slug text not null,
  excerpt text not null default '',
  image_url text not null default '',
  category text not null default '',
  price numeric(12,2),
  status text not null default 'DRAFT',
  featured boolean not null default false,
  sort_order integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(collection, slug)
);

create table if not exists audit_logs (
  id text primary key,
  actor_user_id text references admin_users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  request_id text not null,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists schema_migrations (
  version text primary key,
  applied_at timestamptz not null default now()
);

insert into schema_migrations(version)
values ('002_supabase_core')
on conflict (version) do nothing;

create index if not exists reservations_date_idx
  on reservations(reservation_date, reservation_time);

create index if not exists orders_status_idx
  on orders(status, created_at desc);

create index if not exists cms_collection_status_idx
  on cms_content(collection, status, sort_order);

create index if not exists audit_created_idx
  on audit_logs(created_at desc);

-- Keep service-role access server-side. Public anonymous access is not granted here.
alter table admin_users enable row level security;
alter table admin_sessions enable row level security;
alter table reservations enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table cms_content enable row level security;
alter table audit_logs enable row level security;

commit;
