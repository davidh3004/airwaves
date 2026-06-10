# Air Waves Comfort — Next.js Website

Premium bilingual HVAC website for **Air Waves Comfort LLC** (Miami, FL).

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Supabase · Resend · Framer Motion

**Full setup (Supabase + GitHub + deploy):** see **[SETUP.md](SETUP.md)**

---

## Quick start

```bash
# From monorepo root
pnpm install

cd artifacts/awc-nextjs
cp .env.example .env.local
# Add Supabase keys + ADMIN_PASSWORD + JWT_SECRET

# One-time: run supabase/schema.sql in Supabase SQL Editor

pnpm dev
# → http://localhost:3000
```

---

## Environment variables

| Variable | Required | Where to get it |
|----------|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase → Settings → API (server only) |
| `ADMIN_PASSWORD` | Yes | Choose a strong password |
| `JWT_SECRET` | Yes | `openssl rand -base64 32` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Your site URL |
| `RESEND_API_KEY` | Optional | resend.com |
| `RESEND_FROM_EMAIL` | Optional | Verified sender in Resend |
| `QUOTE_NOTIFY_EMAIL` | Optional | Inbox for quote alerts |

---

## Features

- **Bilingual (EN/ES)** — full site copy; language persists in localStorage
- **Content CMS** — `/admin` → edit all sections, both languages, gallery images
- **Supabase storage** — CMS content in `site_settings`; quotes in `quote_submissions`
- **Quote form** — saves to Supabase + optional Resend emails
- **Admin inbox** — view and update quote status (new / contacted / closed)
- **Responsive** — mobile-first layout and admin UI

---

## Admin panel

| URL | Purpose |
|-----|---------|
| `/admin/login` | Password login |
| `/admin` | Dashboard |

Tabs:

1. **Website Content** — EN/ES editors, image upload
2. **Quote Requests** — submissions from the contact form

When Supabase is configured, saves go to the `site_settings` table (keys `content_en`, `content_es`).

---

## Project structure

```
app/
  admin/              # Login + CMS dashboard
  api/
    content/          # Public GET site content
    quote/            # POST quote form
    admin/            # Auth, CMS save, uploads, quotes
components/           # Layout + homepage sections
lib/
  cms.ts              # Supabase + local file fallback
  default-content.ts  # Built-in EN/ES defaults
supabase/
  schema.sql          # Run once in Supabase
public/gallery/       # Job photos (committed to repo)
```

---

## Supabase

See **[supabase/README.md](supabase/README.md)** and run **`supabase/schema.sql`** once.

---

## Deploy

Recommended: **Vercel** with root directory `artifacts/awc-nextjs`. Details in **[SETUP.md](SETUP.md)**.
