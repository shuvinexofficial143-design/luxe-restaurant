begin;

alter table cms_content
  add column if not exists translations_json jsonb not null default '{}'::jsonb,
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists canonical_path text,
  add column if not exists og_image_url text,
  add column if not exists noindex boolean not null default false,
  add column if not exists published_at timestamptz;

create index if not exists cms_content_public_idx
  on cms_content(collection,status,sort_order,published_at desc);

create index if not exists cms_content_slug_public_idx
  on cms_content(collection,slug)
  where status = 'PUBLISHED';

insert into schema_migrations(version)
values ('014_public_cms_seo')
on conflict(version) do nothing;

commit;
