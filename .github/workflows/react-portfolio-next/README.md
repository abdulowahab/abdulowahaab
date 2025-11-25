
# react-portfolio-next

A modern React (Next.js) portfolio with:
- Public profile, projects, and events pages
- Admin dashboard (auth via Supabase) to manage content
- Tailwind CSS styling & dark mode
- SEO-friendly, responsive, and deployable on Vercel

## Quick Start

1. **Install & run locally**
```bash
npm install
npm run dev
```

2. **Set environment variables** (create `.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Supabase setup**
- Create a Supabase project: https://supabase.com/
- Enable Authentication: Email/Password provider
- Create tables with the SQL below
- (Optional) Create a Storage bucket named `portfolio` for images

### SQL for tables
```sql
-- Profiles
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  title text,
  bio text,
  avatar_url text,
  location text,
  email text,
  phone text,
  website text,
  github text,
  linkedin text,
  twitter text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  tech_stack text,
  demo_url text,
  repo_url text,
  featured boolean default false,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Events
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  start_date date,
  end_date date,
  location text,
  link text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);
```

## Deploy to Vercel
1. Push the code to GitHub or import directly in Vercel
2. In Vercel project settings → **Environment Variables**, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy. Your site will get a live URL like `https://your-app.vercel.app`

## Admin Access
- Go to `/admin/login` to sign in (email/password). Create a user in Supabase Auth.
- Manage **Profile**, **Projects**, and **Events** from `/admin/dashboard`.

## Fallback sample content
If Supabase is not configured, public pages will show sample content from `/data/sample` so you can preview the design.

