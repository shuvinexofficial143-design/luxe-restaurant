begin;

alter table orders
  add column if not exists customer_id text references customers(id) on delete set null,
  add column if not exists payment_status text not null default 'UNPAID',
  add column if not exists razorpay_order_id text,
  add column if not exists razorpay_payment_id text,
  add column if not exists table_token text,
  add column if not exists accepted_at timestamptz,
  add column if not exists preparing_at timestamptz,
  add column if not exists ready_at timestamptz,
  add column if not exists completed_at timestamptz;

create table if not exists order_status_history (
  id text primary key,
  order_id text not null references orders(id) on delete cascade,
  status text not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists kitchen_stations (
  id text primary key,
  label text not null,
  active boolean not null default true,
  sort_order integer not null default 1
);

insert into kitchen_stations(id,label,active,sort_order)
values
  ('HOT','Hot Kitchen',true,1),
  ('COLD','Cold Kitchen',true,2),
  ('PASTRY','Pastry',true,3),
  ('BAR','Bar',true,4)
on conflict (id) do update set
  label = excluded.label,
  active = excluded.active,
  sort_order = excluded.sort_order;

alter table order_items
  add column if not exists station text not null default 'HOT',
  add column if not exists notes text,
  add column if not exists item_status text not null default 'QUEUED';

create index if not exists orders_customer_idx
  on orders(customer_id, created_at desc);

create index if not exists orders_kitchen_idx
  on orders(status, created_at asc);

create index if not exists order_status_history_order_idx
  on order_status_history(order_id, created_at asc);

create index if not exists order_items_station_idx
  on order_items(station, item_status);

alter table order_status_history enable row level security;
alter table kitchen_stations enable row level security;

create or replace function luxe_create_order(
  p_order_id text,
  p_customer_id text,
  p_guest_name text,
  p_phone text,
  p_fulfillment text,
  p_table_number text,
  p_pickup_time text,
  p_notes text,
  p_items jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_item jsonb;
  v_slug text;
  v_qty integer;
  v_menu cms_content%rowtype;
  v_subtotal numeric(12,2) := 0;
  v_service numeric(12,2) := 0;
  v_total numeric(12,2) := 0;
  v_item_id text;
  v_station text;
begin
  if p_fulfillment not in ('TABLE','PICKUP') then
    raise exception 'invalid_fulfillment';
  end if;

  if jsonb_array_length(p_items) < 1 or jsonb_array_length(p_items) > 40 then
    raise exception 'invalid_item_count';
  end if;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_slug := nullif(trim(v_item->>'slug'),'');
    v_qty := greatest(1, least(20, coalesce((v_item->>'quantity')::integer,1)));

    select *
    into v_menu
    from cms_content
    where collection = 'menu'
      and slug = v_slug
      and status = 'PUBLISHED'
      and price is not null
    limit 1;

    if v_menu.id is null then
      raise exception 'menu_item_unavailable:%', v_slug;
    end if;

    v_subtotal := v_subtotal + (v_menu.price * v_qty);
  end loop;

  v_service :=
    case
      when p_fulfillment = 'TABLE' then round(v_subtotal * 0.05, 2)
      else 0
    end;

  v_total := v_subtotal + v_service;

  insert into orders(
    id,
    customer_id,
    guest_name,
    phone,
    fulfillment,
    table_number,
    pickup_time,
    subtotal,
    service_charge,
    total,
    status,
    payment_status,
    notes
  )
  values(
    p_order_id,
    nullif(p_customer_id,''),
    p_guest_name,
    p_phone,
    p_fulfillment,
    nullif(p_table_number,''),
    nullif(p_pickup_time,''),
    v_subtotal,
    v_service,
    v_total,
    'RECEIVED',
    'UNPAID',
    nullif(p_notes,'')
  );

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_slug := trim(v_item->>'slug');
    v_qty := greatest(1, least(20, coalesce((v_item->>'quantity')::integer,1)));

    select *
    into v_menu
    from cms_content
    where collection = 'menu'
      and slug = v_slug
      and status = 'PUBLISHED'
      and price is not null
    limit 1;

    v_station :=
      case
        when lower(v_menu.category) like '%dessert%' then 'PASTRY'
        when lower(v_menu.category) like '%drink%'
          or lower(v_menu.category) like '%beverage%'
          or lower(v_menu.category) like '%wine%' then 'BAR'
        when lower(v_menu.category) like '%salad%'
          or lower(v_menu.category) like '%cold%' then 'COLD'
        else 'HOT'
      end;

    v_item_id := 'OI-' || replace(gen_random_uuid()::text,'-','');

    insert into order_items(
      id,
      order_id,
      menu_item_slug,
      title,
      quantity,
      unit_price,
      station,
      notes,
      item_status
    )
    values(
      v_item_id,
      p_order_id,
      v_menu.slug,
      v_menu.title,
      v_qty,
      v_menu.price,
      v_station,
      nullif(v_item->>'notes',''),
      'QUEUED'
    );
  end loop;

  insert into order_status_history(id,order_id,status,note)
  values(
    'OSH-' || replace(gen_random_uuid()::text,'-',''),
    p_order_id,
    'RECEIVED',
    'Order created'
  );

  return jsonb_build_object(
    'ok', true,
    'orderId', p_order_id,
    'subtotal', v_subtotal,
    'serviceCharge', v_service,
    'total', v_total,
    'status', 'RECEIVED',
    'paymentStatus', 'UNPAID'
  );
end;
$$;

create or replace function luxe_update_order_status(
  p_order_id text,
  p_status text,
  p_note text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order orders%rowtype;
begin
  if p_status not in (
    'RECEIVED','CONFIRMED','PREPARING','READY','COMPLETED','CANCELLED'
  ) then
    raise exception 'invalid_order_status';
  end if;

  select *
  into v_order
  from orders
  where id = p_order_id
  for update;

  if v_order.id is null then
    return jsonb_build_object('ok',false,'code','ORDER_NOT_FOUND');
  end if;

  update orders
  set
    status = p_status,
    accepted_at = case when p_status = 'CONFIRMED' and accepted_at is null then now() else accepted_at end,
    preparing_at = case when p_status = 'PREPARING' and preparing_at is null then now() else preparing_at end,
    ready_at = case when p_status = 'READY' and ready_at is null then now() else ready_at end,
    completed_at = case when p_status = 'COMPLETED' and completed_at is null then now() else completed_at end,
    updated_at = now()
  where id = p_order_id;

  insert into order_status_history(id,order_id,status,note)
  values(
    'OSH-' || replace(gen_random_uuid()::text,'-',''),
    p_order_id,
    p_status,
    nullif(p_note,'')
  );

  return jsonb_build_object(
    'ok', true,
    'orderId', p_order_id,
    'status', p_status
  );
end;
$$;

grant execute on function luxe_create_order(text,text,text,text,text,text,text,text,jsonb)
to service_role;

grant execute on function luxe_update_order_status(text,text,text)
to service_role;

insert into schema_migrations(version)
values ('006_ordering_kds')
on conflict (version) do nothing;

commit;
