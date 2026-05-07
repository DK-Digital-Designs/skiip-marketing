create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('contact', 'vendor', 'organiser')),
  status text not null default 'new',
  name text,
  email text not null,
  phone text,
  category text,
  business_name text,
  organisation_name text,
  message text,
  source_path text,
  referrer text,
  payload jsonb not null default '{}'::jsonb,
  ip_hash text,
  user_agent_hash text,
  environment text not null default 'production',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create index if not exists leads_type_created_idx on public.leads (type, created_at desc);
create index if not exists leads_email_idx on public.leads (email);

-- No anon/authenticated policies are added for v1.
-- Leads are inserted only by the Next.js server route using the service role key.
