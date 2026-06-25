-- Nawikh EduHub UAT submissions table
-- Run this in Supabase SQL Editor.

create table if not exists public.uat_submissions (
  id uuid primary key,
  created_at timestamptz not null default now(),
  submission jsonb not null
);

create index if not exists uat_submissions_created_at_idx
  on public.uat_submissions (created_at desc);

alter table public.uat_submissions enable row level security;

-- Demo/FYP policy:
-- Allows public form submissions from the deployed website.
create policy "Allow public UAT submission insert"
  on public.uat_submissions
  for insert
  to anon
  with check (true);

-- Demo/FYP policy:
-- Allows the client-side owner dashboard to read all submissions.
-- For a real production system, replace this with Supabase Auth.
create policy "Allow public UAT submission read"
  on public.uat_submissions
  for select
  to anon
  using (true);
