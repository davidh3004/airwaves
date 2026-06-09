# Air Waves Comfort — Next.js Website

Premium HVAC company website for **Air Waves Comfort LLC** (Miami, FL).

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Supabase · Resend · Framer Motion

---

## Quick Start

```bash
# 1. Clone / open the project
cd artifacts/awc-nextjs

# 2. Install dependencies
npm install

# 3. Copy env file and fill in your values
cp .env.example .env.local

# 4. Run the Supabase schema (one-time)
# Go to https://app.supabase.com → your project → SQL Editor
# Paste and run the contents of supabase/schema.sql

# 5. Start the dev server
npm run dev
# → http://localhost:3000
```

---

## Environment Variables

Copy `.env.example` → `.env.local` and fill in:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase dashboard → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Project Settings → API |
| `ADMIN_PASSWORD` | Choose a strong password |
| `JWT_SECRET` | Generate with: `openssl rand -base64 32` |
| `RESEND_API_KEY` | https://resend.com → API Keys |
| `RESEND_FROM_EMAIL` | A verified domain email in Resend |
| `QUOTE_NOTIFY_EMAIL` | Where quote notifications are delivered |

---

## Project Structure

```
artifacts/awc-nextjs/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   ├── page.tsx                # Homepage — assembles all sections
│   ├── globals.css             # Tailwind base + custom utilities
│   ├── admin/
│   │   ├── page.tsx            # Admin dashboard (server component, auth-gated)
│   │   ├── AdminDashboard.tsx  # Client dashboard with quote table
│   │   └── login/page.tsx      # Admin login page
│   └── api/
│       ├── content/route.ts    # GET/PUT site content from Supabase
│       ├── quote/route.ts      # POST quote form → Supabase + Resend emails
│       └── admin/
│           ├── login/route.ts  # POST admin password → httpOnly JWT cookie
│           ├── logout/route.ts # POST clear session
│           └── quotes/route.ts # GET/PATCH quote submissions
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed responsive navbar with EN/ES toggle
│   │   └── Footer.tsx          # 4-column footer
│   └── sections/               # 12 homepage sections
│       ├── Hero.tsx            # Animated hero with canvas particles
│       ├── TrustBar.tsx        # 5 trust badges
│       ├── Services.tsx        # 6 service cards (grid)
│       ├── Gallery.tsx         # 9-photo grid with lightbox
│       ├── ComfortExperience.tsx  # Stats + bullet points
│       ├── EmergencyRepair.tsx # Emergency CTA section
│       ├── MaintenancePlans.tsx   # 3 pricing plan cards
│       ├── Reviews.tsx         # Horizontal scrolling review cards
│       ├── ServiceAreas.tsx    # Map area tags + HQ card
│       ├── FAQ.tsx             # Animated accordion
│       ├── QuoteForm.tsx       # Quote request form with email
│       └── FinalCTA.tsx        # Bottom call-to-action
├── context/
│   └── LanguageContext.tsx     # EN/ES language toggle (localStorage)
├── i18n/
│   └── translations.ts         # All EN + ES text strings
├── lib/
│   ├── auth.ts                 # JWT session helpers (admin auth)
│   ├── content.ts              # Supabase content helpers with fallbacks
│   ├── resend.ts               # Email sending (internal + customer)
│   ├── supabase.ts             # Supabase browser + service clients
│   └── utils.ts                # cn() Tailwind class merger
├── middleware.ts               # Protect /admin routes
├── types/
│   └── content.ts              # TypeScript interfaces
├── supabase/
│   └── schema.sql              # Run once in Supabase SQL Editor
├── public/
│   ├── logo.svg                # Air Waves Comfort logo
│   └── gallery/                # 9 HVAC job photos (photo1.jpg–photo9.jpg)
├── tailwind.config.ts          # Brand colors + font families
├── next.config.ts              # Next.js config
└── .env.example                # Environment variable template
```

---

## Key Features

- **Bilingual (EN/ES)** — full translation for all 14 sections; language persists via localStorage
- **Quote form** — submits to Supabase + sends branded HTML emails via Resend (internal notification + customer confirmation)
- **Admin panel** — `/admin` requires password; shows quote submissions table with status tracking
- **Gallery lightbox** — 9 photos with prev/next navigation
- **Animated** — Framer Motion entrance animations throughout
- **SEO ready** — Next.js metadata API with title, description, and OG tags
- **Responsive** — mobile-first, hamburger menu, touch-friendly

---

## Admin Panel

Visit `/admin` → enter the password from `ADMIN_PASSWORD` env var.

Features:
- View all quote submissions
- See status (new / contacted / closed)
- Stats summary

---

## Supabase Setup

1. Create a new project at https://app.supabase.com
2. Go to SQL Editor → paste `supabase/schema.sql` → Run
3. Copy your Project URL and API keys into `.env.local`

Tables created:
- `site_settings` — key/value content store (public read, service-role write)
- `quote_submissions` — quote form submissions (service-role only)

---

## Deployment

### Vercel (recommended)
```bash
npx vercel
# Set all env vars in Vercel dashboard → Settings → Environment Variables
```

### Other platforms
Any Node.js 18+ host works. Build with `npm run build`, start with `npm start`.

---

## Business Info

| | |
|---|---|
| **Company** | Air Waves Comfort LLC |
| **Phone 1** | (786) 362-3648 |
| **Phone 2** | (786) 424-2925 |
| **Address** | 9802 NW 80 Ave Bay G48, Hialeah Gardens, FL 33016 |
| **License** | CAC1820880 |
| **Email** | airwavescomfort33@gmail.com |
