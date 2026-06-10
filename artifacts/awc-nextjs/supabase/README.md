# Supabase — Air Waves Comfort

## Setup (one time)

1. [Create a Supabase project](https://supabase.com/dashboard).
2. Open **SQL Editor**.
3. Run [`schema.sql`](schema.sql) in full.

## Schema overview

### `site_settings`

| Column | Type | Notes |
|--------|------|-------|
| `key` | `text` PK | `content_en` or `content_es` |
| `value` | `jsonb` | Full `SiteContent` object for that language |
| `updated_at` | `timestamptz` | Auto-updated on change |

- **Public read** (anon) — for optional direct client reads
- **Writes** — service role only (admin API routes)

### `quote_submissions`

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | Auto-generated |
| `name`, `email`, `phone` | `text` | Required |
| `service_type` | `text` | Service selected on form |
| `message` | `text` | Optional |
| `lang` | `text` | `en` or `es` |
| `status` | `text` | `new` → `contacted` → `closed` |
| `created_at` | `timestamptz` | Submission time |

- **No public access** — all access via service role (API routes)

## Verify setup

In **Table Editor**, confirm both tables exist. After saving content in `/admin`, you should see rows:

- `site_settings`: keys `content_en`, `content_es`
- `quote_submissions`: rows after form submissions

## API keys

Copy from **Project Settings → API**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — **never** commit or expose to the browser
