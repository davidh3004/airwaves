# Air Waves Comfort — Website

Monorepo containing the **Air Waves Comfort LLC** marketing website (Miami HVAC).

## Website app

The production site lives in:

**[`artifacts/awc-nextjs/`](artifacts/awc-nextjs/)**

| | |
|---|---|
| Stack | Next.js 14 · TypeScript · Tailwind · Supabase · Resend |
| Local dev | `cd artifacts/awc-nextjs && pnpm install && pnpm dev` |
| Admin | `/admin/login` — bilingual content CMS + quote inbox |
| Database | Supabase (`site_settings`, `quote_submissions`) |

## Quick start

```bash
# From repo root (pnpm monorepo)
pnpm install

cd artifacts/awc-nextjs
cp .env.example .env.local
# Fill in Supabase keys, admin password, JWT secret (see SETUP.md)

# One-time: run supabase/schema.sql in Supabase SQL Editor

pnpm dev
# → http://localhost:3000
```

Full setup (Supabase, Resend, GitHub, Vercel): **[artifacts/awc-nextjs/SETUP.md](artifacts/awc-nextjs/SETUP.md)**

### Vercel (required setting)

In **Project Settings → General → Root Directory**, set:

```
artifacts/awc-nextjs
```

Vercel must use the `package.json` that contains `next`. If Root Directory is the repo root, deploy will fail with “No Next.js version detected”.

## Repo layout

```
artifacts/awc-nextjs/   ← Next.js website (deploy this folder)
  supabase/schema.sql   ← Run once in Supabase
  .env.example          ← Copy to .env.local (never commit secrets)
```

## Security

- **Never commit** `.env.local` or Supabase service-role keys.
- Rotate `ADMIN_PASSWORD` and `JWT_SECRET` before going live.
