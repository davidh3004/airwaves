-- ============================================================
-- Air Waves Comfort — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Site content (key-value store for editable content)
create table if not exists site_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

-- Trigger: auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger site_settings_updated_at
  before update on site_settings
  for each row execute function update_updated_at();

-- Quote submissions
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

-- ── Row Level Security ──────────────────────────────────────────────────────

-- site_settings: public read, no public write
alter table site_settings enable row level security;

create policy "Public read site_settings"
  on site_settings for select
  using (true);

create policy "Service role can write site_settings"
  on site_settings for all
  using (auth.role() = 'service_role');

-- quote_submissions: no public read, insert only via service role / server
alter table quote_submissions enable row level security;

create policy "Service role manages quotes"
  on quote_submissions for all
  using (auth.role() = 'service_role');

-- ── Optional: Seed default site settings ───────────────────────────────────
-- You can seed the content here or let the app use its built-in defaults.
-- Example:
-- insert into site_settings (key, value) values
--   ('hero', '{"tag":"Miami''s Premier Climate Control","headline":"Where Experience Meets Cool.","subheadline":"Miami''s Most Trusted HVAC Service — 15+ Years of Excellence.","ctaEstimate":"Get a Free Estimate","ctaEmergency":"Emergency Service"}'::jsonb)
-- on conflict (key) do nothing;
