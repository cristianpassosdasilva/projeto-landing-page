create extension if not exists pgcrypto;

create table if not exists public.site_settings (
  id text primary key default 'default',
  brand jsonb not null default '{}'::jsonb,
  contact jsonb not null default '{}'::jsonb,
  footer jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.landing_sections (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  order_index integer not null default 0,
  enabled boolean not null default true,
  props jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

create or replace function public.is_landing_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where email = auth.jwt() ->> 'email'
  );
$$;

alter table public.site_settings enable row level security;
alter table public.landing_sections enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read"
on public.site_settings
for select
using (true);

drop policy if exists "site_settings_admin_write" on public.site_settings;
create policy "site_settings_admin_write"
on public.site_settings
for all
using (public.is_landing_admin())
with check (public.is_landing_admin());

drop policy if exists "landing_sections_public_read_enabled" on public.landing_sections;
create policy "landing_sections_public_read_enabled"
on public.landing_sections
for select
using (enabled = true or public.is_landing_admin());

drop policy if exists "landing_sections_admin_write" on public.landing_sections;
create policy "landing_sections_admin_write"
on public.landing_sections
for all
using (public.is_landing_admin())
with check (public.is_landing_admin());

drop policy if exists "admin_users_admin_read" on public.admin_users;
create policy "admin_users_admin_read"
on public.admin_users
for select
using (public.is_landing_admin());

insert into storage.buckets (id, name, public)
values ('landing-images', 'landing-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "landing_images_public_read" on storage.objects;
create policy "landing_images_public_read"
on storage.objects
for select
using (bucket_id = 'landing-images');

drop policy if exists "landing_images_admin_insert" on storage.objects;
create policy "landing_images_admin_insert"
on storage.objects
for insert
with check (bucket_id = 'landing-images' and public.is_landing_admin());

drop policy if exists "landing_images_admin_update" on storage.objects;
create policy "landing_images_admin_update"
on storage.objects
for update
using (bucket_id = 'landing-images' and public.is_landing_admin())
with check (bucket_id = 'landing-images' and public.is_landing_admin());

drop policy if exists "landing_images_admin_delete" on storage.objects;
create policy "landing_images_admin_delete"
on storage.objects
for delete
using (bucket_id = 'landing-images' and public.is_landing_admin());

-- Depois de criar o primeiro usuário em Authentication, autorize o e-mail:
-- insert into public.admin_users (email) values ('seu-email@dominio.com');
