-- Careers applications: written only by the submit-application Edge Function
-- (service role). RLS is ON with no anon policies, so the public anon key
-- cannot read or write this table. The owner reads it via the dashboard.

create table if not exists public.applications (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  full_name     text not null,
  email         text not null,
  phone         text not null,
  cnic          text not null,
  program       text not null,
  position      text not null,
  university    text not null,
  degree        text not null,
  year_or_grad  text not null,
  gpa           text not null,
  city          text not null,
  availability  text,
  cover_note    text,
  cv_path       text not null,
  user_agent    text,
  status        text not null default 'new'
);

alter table public.applications enable row level security;
-- Intentionally no policies: only the service role (Edge Function) accesses this table.

-- Private bucket for CV files. Reachable only via the service role / signed URLs.
insert into storage.buckets (id, name, public)
values ('cvs', 'cvs', false)
on conflict (id) do nothing;
-- No storage policies for anon: only the service role uploads/reads.
