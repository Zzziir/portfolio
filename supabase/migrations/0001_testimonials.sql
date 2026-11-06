-- Testimonials: visitor-submitted feedback, moderated before it appears publicly.
--
-- Mirrors `contact_submissions`: RLS is ON with ZERO policies, so the only path
-- that can read or write this table is the service-role server client (which
-- bypasses RLS). Nothing reaches the public section until status = 'approved'.
--
-- Run this once in the Supabase SQL editor for project `hawgaqdlhwzuvumpvwlb`
-- (My Personal Portfolio). Safe to re-run.

do $$ begin
  create type public.testimonial_status as enum ('pending', 'approved', 'hidden');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  title       text not null,
  quote       text not null,
  status      public.testimonial_status not null default 'pending',
  is_spam     boolean not null default false,
  ip          text,
  user_agent  text
);

-- Public read path: approved, newest first.
create index if not exists testimonials_approved_idx
  on public.testimonials (status, created_at desc);

-- IP-keyed rate-limit lookups.
create index if not exists testimonials_ip_created_idx
  on public.testimonials (ip, created_at desc);

alter table public.testimonials enable row level security;
-- Intentionally no policies: all access goes through the service-role client.
