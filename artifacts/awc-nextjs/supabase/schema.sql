-- ============================================================
-- Air Waves Comfort — Supabase Schema
-- Run once in: Supabase Dashboard → SQL Editor → New query
-- Safe to re-run (drops/recreates policies & trigger)
-- ============================================================

-- Site content (key-value store for editable CMS copy)
create table if not exists site_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

-- Quote form submissions (admin inbox)
create table if not exists quote_submissions (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  phone        text not null,
  service_type text not null,
  message      text,
  lang         text not null default 'en' check (lang in ('en', 'es')),
  status       text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at   timestamptz not null default now()
);

-- Auto-update site_settings.updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_settings_updated_at on site_settings;
create trigger site_settings_updated_at
  before update on site_settings
  for each row execute function update_updated_at();

-- ── Row Level Security ──────────────────────────────────────────────────────

alter table site_settings enable row level security;
alter table quote_submissions enable row level security;

drop policy if exists "Public read site_settings" on site_settings;
create policy "Public read site_settings"
  on site_settings for select
  using (true);

drop policy if exists "Service role can write site_settings" on site_settings;
create policy "Service role can write site_settings"
  on site_settings for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

drop policy if exists "Service role manages quotes" on quote_submissions;
create policy "Service role manages quotes"
  on quote_submissions for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ── CMS keys (created when you save from /admin) ────────────────────────────
--   content_en  — full English SiteContent JSON
--   content_es  — full Spanish SiteContent JSON
-- Until then, the site uses built-in defaults from the codebase.
