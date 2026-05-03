create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  slug text not null unique,
  category text not null,
  price numeric,
  size text not null,
  size_system text not null default 'INT' check (size_system in ('EU', 'INT', 'US', 'ONE SIZE')),
  status text not null default 'available' check (status in ('available', 'sold', 'reserved')),
  short_description text not null,
  full_description text not null,
  main_image_url text,
  gallery_image_urls text[] not null default '{}',
  featured boolean not null default false,
  is_unique_piece boolean not null default true,
  materials text,
  techniques text[] not null default '{}',
  collection_name text,
  drop_date date,
  instagram_post_url text,
  sort_order integer
);

alter table public.products
add column if not exists size_system text not null default 'INT';

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0
);

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row
execute function public.handle_updated_at();

insert into public.categories (name, slug, sort_order)
values
  ('Tops', 'tops', 1),
  ('Skirts', 'skirts', 2),
  ('Jeans', 'jeans', 3),
  ('Pants', 'pants', 4),
  ('Jackets', 'jackets', 5),
  ('Dresses', 'dresses', 6),
  ('Accessories', 'accessories', 7),
  ('Custom pieces', 'custom-pieces', 8),
  ('Sold archive', 'sold-archive', 9)
on conflict (slug) do update
set
  name = excluded.name,
  sort_order = excluded.sort_order;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;
