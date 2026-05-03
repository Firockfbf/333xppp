# 333XPPP CLOTHES

Next.js + TypeScript + Tailwind CSS + Supabase storefront and admin panel for an upcycled handmade fashion project.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
  - PostgreSQL
  - Auth
  - Storage
- Vercel-ready deployment

## Project Architecture

```text
app/
  (public)/
    page.tsx
    shop/page.tsx
    shop/[slug]/page.tsx
    about/page.tsx
    contact/page.tsx
  admin/
    login/page.tsx
    (protected)/
      page.tsx
      products/page.tsx
      products/new/page.tsx
      products/[id]/edit/page.tsx
  api/admin/products/...
components/
  public/
  admin/
  shared/
lib/
  supabase/
  admin.ts
  products.ts
  validations.ts
supabase/
  schema.sql
  policies.sql
types/
  database.ts
```

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/333xppp
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

## Supabase Setup

1. Create a new Supabase project.
2. In the SQL editor, run [schema.sql](/C:/Users/pierr/Desktop/site berlin girl/supabase/schema.sql) first.
3. Then run [policies.sql](/C:/Users/pierr/Desktop/site berlin girl/supabase/policies.sql).
4. Copy the project URL, anon key and service role key into `.env.local`.
5. Set a simple admin password in `.env.local`.

## Simple Admin Access

The admin is now designed for a non-technical user:

1. Open `/admin/login`
2. Enter the single admin password
3. Start creating products

No Supabase user account is required for day-to-day use.

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Helpful commands:

```bash
npm run lint
npm run typecheck
```

## Public Features

- Strong editorial homepage
- Filterable creations grid by category and status
- Product detail pages with gallery
- About and contact pages
- Instagram DM call-to-action for purchases

## Admin Features

- `/admin/login` single password access
- `/admin` dashboard with counts and recent products
- `/admin/products` list with quick status actions
- `/admin/products/new` create form
- `/admin/products/[id]/edit` edit form
- `/admin/library` to create clothing types and collection names
- Multiple image upload to Supabase Storage
- Main image selection and image preview
- Explicit support for `EU`, `INT`, `US` and `ONE SIZE`

## Deployment To Vercel

1. Push the project to GitHub.
2. Import the repo into Vercel.
3. Add the same environment variables from `.env.local` in Vercel Project Settings.
4. Deploy.
5. In Supabase Authentication, add your Vercel domain to allowed redirect URLs if needed.

## Notes About Security

- The public anon key is used for public reads only.
- Admin access is protected by a password cookie set server-side.
- Product CRUD and storage uploads go through server routes using the Supabase service role key.
- No secret key is exposed client-side.

## Pre-Launch Test Checklist

1. Homepage loads correctly on mobile and desktop.
2. `/shop` filters work for category and status.
3. Product detail pages render images, description, status and Instagram CTA.
4. `/admin/login` signs in successfully.
5. Wrong password cannot access `/admin`.
6. Admin can create a product with multiple images.
7. Admin can edit a product and change the main image.
8. Admin can mark a product as sold or reserved.
9. Admin can create a new type and a new collection from `/admin/library`.
10. Admin can select `EU` sizes and see them display correctly in the shop.
11. Admin can delete a product.
12. Uploaded images appear correctly in public pages.
13. Vercel production env vars match local env vars.
