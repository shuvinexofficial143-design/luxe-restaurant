begin;

create table if not exists dining_tables (
  id text primary key,
  label text not null,
  area text not null,
  min_guests integer not null default 1 check(min_guests > 0),
  max_guests integer not null check(max_guests > 0),
  active boolean not null default true,
  sort_order integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists reservation_holds (
  id text primary key,
  reservation_date date not null,
  reservation_time text not null,
  guest_count integer not null check(guest_count between 1 and 30),
  area text,
  table_id text not null references dining_tables(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists waitlist_entries (
  id text primary key,
  customer_id text references customers(id) on delete set null,
  guest_name text not null,
  email text not null,
  phone text not null,
  reservation_date date not null,
  preferred_time text not null,
  guest_count integer not null check(guest_count between 1 and 30),
  area text,
  status text not null default 'WAITING',
  notes text,
  created_at timestamptz not null default now()
);

alter table reservations
  add column if not exists customer_id text references customers(id) on delete set null,
  add column if not exists hold_id text,
  add column if not exists deposit_required boolean not null default false,
  add column if not exists deposit_amount numeric(12,2) not null default 0,
  add column if not exists payment_status text not null default 'NOT_REQUIRED',
  add column if not exists razorpay_order_id text,
  add column if not exists razorpay_payment_id text;

insert into dining_tables(id,label,area,min_guests,max_guests,active,sort_order)
values
  ('T01','Table 01','Main Dining',1,2,true,1),
  ('T02','Table 02','Main Dining',2,4,true,2),
  ('T03','Table 03','Main Dining',2,4,true,3),
  ('T04','Table 04','Main Dining',4,6,true,4),
  ('W01','Window 01','Window',1,2,true,5),
  ('W02','Window 02','Window',2,4,true,6),
  ('TR1','Terrace 01','Terrace',2,4,true,7),
  ('TR2','Terrace 02','Terrace',4,6,true,8),
  ('CT1','Chef Table','Chef Table',4,8,true,9),
  ('PD1','Salon Table','Private Dining',6,12,true,10)
on conflict (id) do update set
  label = excluded.label,
  area = excluded.area,
  min_guests = excluded.min_guests,
  max_guests = excluded.max_guests,
  active = excluded.active,
  sort_order = excluded.sort_order;

create index if not exists dining_tables_area_idx
  on dining_tables(area, active, sort_order);

create index if not exists reservation_holds_slot_idx
  on reservation_holds(reservation_date, reservation_time, table_id, expires_at);

create index if not exists reservations_slot_table_idx
  on reservations(reservation_date, reservation_time, table_id, status);

create index if not exists waitlist_slot_idx
  on waitlist_entries(reservation_date, preferred_time, status);

alter table dining_tables enable row level security;
alter table reservation_holds enable row level security;
alter table waitlist_entries enable row level security;

create or replace function luxe_reservation_availability(
  p_date date,
  p_time text,
  p_guests integer,
  p_area text default null
)
returns table (
  table_id text,
  table_label text,
  area text,
  max_guests integer,
  available boolean
)
language sql
security definer
set search_path = public
as $$
  select
    dt.id,
    dt.label,
    dt.area,
    dt.max_guests,
    not exists (
      select 1
      from reservations r
      where r.reservation_date = p_date
        and r.reservation_time = p_time
        and r.table_id = dt.id
        and r.status not in ('CANCELLED')
    )
    and not exists (
      select 1
      from reservation_holds h
      where h.reservation_date = p_date
        and h.reservation_time = p_time
        and h.table_id = dt.id
        and h.expires_at > now()
    ) as available
  from dining_tables dt
  where dt.active = true
    and p_guests between dt.min_guests and dt.max_guests
    and (p_area is null or p_area = '' or dt.area = p_area)
  order by dt.sort_order asc;
$$;

create or replace function luxe_create_reservation_hold(
  p_hold_id text,
  p_date date,
  p_time text,
  p_guests integer,
  p_area text default null,
  p_table_id text default null,
  p_minutes integer default 8
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_table dining_tables%rowtype;
  v_expires timestamptz;
begin
  if p_guests < 1 or p_guests > 30 then
    raise exception 'invalid_guest_count';
  end if;

  perform pg_advisory_xact_lock(
    hashtext(p_date::text || '|' || p_time || '|' || coalesce(p_area,''))
  );

  delete from reservation_holds where expires_at <= now();

  select dt.*
  into v_table
  from dining_tables dt
  where dt.active = true
    and p_guests between dt.min_guests and dt.max_guests
    and (p_area is null or p_area = '' or dt.area = p_area)
    and (p_table_id is null or p_table_id = '' or dt.id = p_table_id)
    and not exists (
      select 1
      from reservations r
      where r.reservation_date = p_date
        and r.reservation_time = p_time
        and r.table_id = dt.id
        and r.status not in ('CANCELLED')
    )
    and not exists (
      select 1
      from reservation_holds h
      where h.reservation_date = p_date
        and h.reservation_time = p_time
        and h.table_id = dt.id
        and h.expires_at > now()
    )
  order by
    case when p_table_id is not null and dt.id = p_table_id then 0 else 1 end,
    (dt.max_guests - p_guests) asc,
    dt.sort_order asc
  limit 1
  for update;

  if v_table.id is null then
    return jsonb_build_object(
      'ok', false,
      'code', 'NO_TABLE_AVAILABLE'
    );
  end if;

  v_expires := now() + make_interval(mins => greatest(2, least(p_minutes, 15)));

  insert into reservation_holds(
    id,reservation_date,reservation_time,guest_count,area,table_id,expires_at
  )
  values(
    p_hold_id,p_date,p_time,p_guests,v_table.area,v_table.id,v_expires
  );

  return jsonb_build_object(
    'ok', true,
    'holdId', p_hold_id,
    'tableId', v_table.id,
    'tableLabel', v_table.label,
    'area', v_table.area,
    'expiresAt', v_expires
  );
end;
$$;

create or replace function luxe_confirm_reservation_hold(
  p_reservation_id text,
  p_hold_id text,
  p_customer_id text,
  p_guest_name text,
  p_email text,
  p_phone text,
  p_occasion text default null,
  p_notes text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hold reservation_holds%rowtype;
  v_deposit_required boolean;
  v_deposit_amount numeric(12,2);
begin
  select *
  into v_hold
  from reservation_holds
  where id = p_hold_id
  for update;

  if v_hold.id is null then
    return jsonb_build_object('ok', false, 'code', 'HOLD_NOT_FOUND');
  end if;

  if v_hold.expires_at <= now() then
    delete from reservation_holds where id = p_hold_id;
    return jsonb_build_object('ok', false, 'code', 'HOLD_EXPIRED');
  end if;

  perform pg_advisory_xact_lock(
    hashtext(
      v_hold.reservation_date::text || '|' ||
      v_hold.reservation_time || '|' ||
      v_hold.table_id
    )
  );

  if exists (
    select 1
    from reservations r
    where r.reservation_date = v_hold.reservation_date
      and r.reservation_time = v_hold.reservation_time
      and r.table_id = v_hold.table_id
      and r.status not in ('CANCELLED')
  ) then
    delete from reservation_holds where id = p_hold_id;
    return jsonb_build_object('ok', false, 'code', 'TABLE_ALREADY_BOOKED');
  end if;

  v_deposit_required :=
    v_hold.guest_count >= 6
    or extract(isodow from v_hold.reservation_date) in (5,6,7);

  v_deposit_amount :=
    case
      when v_deposit_required then greatest(1000, v_hold.guest_count * 500)
      else 0
    end;

  insert into reservations(
    id,
    customer_id,
    hold_id,
    guest_name,
    email,
    phone,
    reservation_date,
    reservation_time,
    guest_count,
    area,
    table_id,
    occasion,
    notes,
    status,
    deposit_required,
    deposit_amount,
    payment_status
  )
  values(
    p_reservation_id,
    nullif(p_customer_id,''),
    p_hold_id,
    p_guest_name,
    lower(p_email),
    p_phone,
    v_hold.reservation_date,
    v_hold.reservation_time,
    v_hold.guest_count,
    v_hold.area,
    v_hold.table_id,
    nullif(p_occasion,''),
    nullif(p_notes,''),
    case when v_deposit_required then 'PENDING_DEPOSIT' else 'CONFIRMED' end,
    v_deposit_required,
    v_deposit_amount,
    case when v_deposit_required then 'PENDING' else 'NOT_REQUIRED' end
  );

  delete from reservation_holds where id = p_hold_id;

  return jsonb_build_object(
    'ok', true,
    'reservationId', p_reservation_id,
    'status', case when v_deposit_required then 'PENDING_DEPOSIT' else 'CONFIRMED' end,
    'depositRequired', v_deposit_required,
    'depositAmount', v_deposit_amount,
    'tableId', v_hold.table_id,
    'area', v_hold.area
  );
end;
$$;

grant execute on function luxe_reservation_availability(date,text,integer,text) to service_role;
grant execute on function luxe_create_reservation_hold(text,date,text,integer,text,text,integer) to service_role;
grant execute on function luxe_confirm_reservation_hold(text,text,text,text,text,text,text,text) to service_role;

insert into schema_migrations(version)
values ('005_reservation_engine')
on conflict (version) do nothing;

commit;
