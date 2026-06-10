# Setup Guide — Supabase, GitHub & Deployment

Step-by-step to run locally, push to GitHub, and deploy with Supabase as the database.

---

## 1. Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** → **New query**.
3. Paste the full contents of [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
4. Go to **Project Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (server only — never expose in the browser)

### Tables created

| Table | Purpose |
|-------|---------|
| `site_settings` | CMS content (`content_en`, `content_es` JSON blobs) |
| `quote_submissions` | Quote form leads (admin inbox) |

Content keys used by the app: `content_en` and `content_es` (see `types/site-content.ts`).

---

## 2. Local environment

```bash
cd artifacts/awc-nextjs
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Required — Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Required — Admin panel
ADMIN_PASSWORD=choose-a-strong-password
JWT_SECRET=run: openssl rand -base64 32

# Optional — quote emails (recommended for production)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=quotes@yourdomain.com
QUOTE_NOTIFY_EMAIL=you@example.com

# Production URL (use your real domain when deployed)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

```bash
pnpm install   # from repo root, or here if standalone
pnpm dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin/login  

When Supabase env vars are set, CMS saves go to `site_settings` (not the local `cms/` folder).

---

## 3. Push to GitHub

From the **repo root** (`Asset-Manager-3`):

```bash
# Confirm secrets are NOT staged
git status

# Stage source (not .env.local or .next)
git add .

git commit -m "Add Air Waves Comfort Next.js site with Supabase CMS"

# Create repo on GitHub (CLI) — or create empty repo on github.com first
gh repo create air-waves-comfort --private --source=. --remote=origin --push
```

If the repo already exists:

```bash
git remote add origin https://github.com/YOUR_USER/air-waves-comfort.git
git branch -M main
git push -u origin main
```

### Never commit

- `.env.local`
- `SUPABASE_SERVICE_ROLE_KEY`
- `cms/content.json` (local dev fallback)

These are listed in `.gitignore`.

---

## 4. Deploy on Vercel (recommended)

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new).
2. **Root Directory:** `artifacts/awc-nextjs`
3. **Framework:** Next.js (auto-detected)
4. **Install command:** `cd ../.. && pnpm install`  
   Or set monorepo root to repo root and use default `pnpm install`.
5. Add **all** environment variables from `.env.local` in **Settings → Environment Variables**.
6. Deploy.

Set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://airwavesc.com`).

### Image uploads on Vercel

Gallery images shipped in `public/gallery/` are served from the repo. **New uploads** from the admin panel write to the server filesystem, which does **not** persist on Vercel after redeploy. For production image uploads, use [Supabase Storage](https://supabase.com/docs/guides/storage) (future enhancement) or commit new images to the repo.

---

## 5. Resend (optional)

Quote form sends:

1. Internal notification to `QUOTE_NOTIFY_EMAIL`
2. Confirmation email to the customer

Without Resend, quote **storage in Supabase still works**; only emails fail. Configure Resend before launch or wrap email calls to fail gracefully.

---

## 6. Checklist before go-live

- [ ] `supabase/schema.sql` executed
- [ ] All env vars set in Vercel (or host)
- [ ] Strong `ADMIN_PASSWORD` and unique `JWT_SECRET`
- [ ] `NEXT_PUBLIC_SITE_URL` matches production domain
- [ ] Test quote form → row appears in Supabase + admin **Quote Requests**
- [ ] Test CMS save → refresh homepage in EN and ES
- [ ] Resend domain verified (if using email)
