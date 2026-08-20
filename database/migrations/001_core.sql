begin;

create table if not exists schema_migrations (
  version text primary key,
  applied_at timestamptz not null default now()
);

insert into schema_migrations(version)
values ('001_core')
on conflict (version) do nothing;

-- The canonical table definitions live in database/schema.sql.
-- In the database-connection batch this migration will be expanded/applied
-- through the selected PostgreSQL provider and migration runner.

commit;
