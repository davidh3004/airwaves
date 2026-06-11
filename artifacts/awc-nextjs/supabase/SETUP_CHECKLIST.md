# Supabase setup checklist — Air Waves Comfort

## 1. Create the project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**
2. **Name:** `air-waves-comfort` (or any name)
3. **Database password:** generate a strong password and **save it** (for direct DB access later)
4. **Region:** choose closest to Miami (e.g. `East US (Ohio)` or `East US (North Virginia)`)
5. Wait until the project status is **Active** (~2 minutes)

## 2. Run the database schema

1. In the left sidebar → **SQL Editor**
2. **New query**
3. Open [`schema.sql`](schema.sql) from this repo, copy the **entire file**, paste into the editor
4. Click **Run** (or Ctrl+Enter)
5. You should see **Success. No rows returned**

Optional: run [`verify.sql`](verify.sql) — you should see both tables listed with `0` rows.

## 3. Copy API keys

1. **Project Settings** (gear icon) → **API**
2. Copy these three values:

| Supabase label | Your `.env` variable |
|----------------|----------------------|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` |
| anon public | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| service_role (secret) | `SUPABASE_SERVICE_ROLE_KEY` |

Never commit `service_role` to GitHub or expose it in the browser.

## 4. Local `.env.local`

Edit `artifacts/awc-nextjs/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
```

Restart dev server:

```bash
cd artifacts/awc-nextjs
pnpm dev
```

## 5. Vercel (production)

**Settings → Environment Variables** — add the same three Supabase variables for **Production** and **Preview**.

Redeploy after saving.

## 6. Test everything

| Test | Expected |
|------|----------|
| Visit `/admin/login` → save content in **Website Content** | Rows appear in `site_settings` with keys `content_en`, `content_es` |
| Submit quote form on homepage | Row in `quote_submissions`, visible in admin **Quote Requests** |
| Refresh homepage EN/ES | CMS text changes show live |

## Tables reference

### `site_settings`

| Column | Purpose |
|--------|---------|
| `key` | `content_en` or `content_es` |
| `value` | Full bilingual site copy (JSON) |
| `updated_at` | Last CMS save |

### `quote_submissions`

| Column | Purpose |
|--------|---------|
| `name`, `email`, `phone` | Contact info |
| `service_type` | Service requested |
| `message` | Optional note |
| `lang` | `en` or `es` |
| `status` | `new` → `contacted` → `closed` |
| `created_at` | When submitted |

## Troubleshooting

**Admin save fails / 500 on content API**  
→ Check `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` or Vercel.

**Quote form fails**  
→ Same service role key; confirm `quote_submissions` table exists.

**CMS empty but site works**  
→ Normal until first save from `/admin`. Defaults come from the codebase.

**SQL policy errors on re-run**  
→ Use the latest `schema.sql` (policies are dropped before recreate).
