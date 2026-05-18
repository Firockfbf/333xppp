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

create table if not exists public.site_content (
  id text primary key default 'main',
  updated_at timestamptz not null default now(),
  hero_issue_title text not null default 'Issue 01 / Bubble Threat',
  hero_issue_copy text not null default 'A dark-cute Y2K portal for upcycled clothes, one-of-one drops and anti-clean styling.',
  hero_card_title text not null default 'Cool girl alert!',
  hero_card_body text not null default '333XPPP CLOTHES is an upcycled, handmade and no-gender fashion project. Each piece is reworked by hand through sewing, painting, embroidery, knitting and textile experimentation.',
  hero_notes text[] not null default '{"2000s website aesthetic","kitsch magazine","upcycled handmade clothing"}',
  hero_mood_tags text[] not null default '{"cool girl alert","drop archive","teen portal","clubwear","DIY"}',
  hero_manifesto text[] not null default '{"Offer alternatives to capitalism fashion.","Clothes and objects thought as artworks.","Trashy over clean. Human over mass production."}',
  brand_logo_url text,
  hero_primary_image_url text,
  hero_secondary_image_url text,
  hero_manifesto_image_url text,
  latest_drop_image_url text,
  about_title text not null default 'upcycling',
  about_subtitle text not null default 'as attitude',
  about_intro text not null default 'Handmade, anti-fast fashion, no-gender and rooted in underground culture.',
  about_body text[] not null default '{"333XPPP works from reclaimed garments and materials, pushing them into a darker editorial and internet-born space through hand sewing, painting, embroidery, knitting and experimental surface treatment.","The project is no-gender, anti-normative and deeply opposed to fast fashion logic."}',
  about_tags text[] not null default '{"Handmade","No gender","One of one","DIY","Underground"}',
  about_image_url text,
  contact_title text not null default 'DM to buy',
  contact_subtitle text not null default 'DM to commission',
  contact_body text not null default 'Orders happen through Instagram DM in this first version. Custom pieces are open on request depending on materials, timeline and concept.'
);

alter table public.site_content
add column if not exists latest_drop_image_url text;

alter table public.site_content
add column if not exists brand_logo_url text;

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

drop trigger if exists site_content_set_updated_at on public.site_content;
create trigger site_content_set_updated_at
before update on public.site_content
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

insert into public.site_content (id)
values ('main')
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;
