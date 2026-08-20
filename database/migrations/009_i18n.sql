begin;
alter table cms_content add column if not exists translations_json jsonb not null default '{}'::jsonb;
alter table customer_profiles add column if not exists preferred_locale text not null default 'en' check(preferred_locale in ('en','hi'));
create table if not exists content_translations(
 id text primary key,
 entity_type text not null,
 entity_id text not null,
 locale text not null check(locale in ('en','hi')),
 field_name text not null,
 translated_value text not null,
 updated_at timestamptz not null default now(),
 unique(entity_type,entity_id,locale,field_name)
);
create index if not exists content_translations_lookup_idx on content_translations(entity_type,entity_id,locale);
alter table content_translations enable row level security;
insert into schema_migrations(version) values('009_i18n') on conflict(version) do nothing;
commit;
