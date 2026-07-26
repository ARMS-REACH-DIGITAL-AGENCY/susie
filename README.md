# Susie Sculpts — Landing Page

**Body Reset, PEMF, Lymphatic & Sculpting in Gilbert AZ**

A clean, mobile-first Next.js landing page for Susie Sculpts. Built for fast launch, lead capture, and HighLevel CRM integration.

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Copy the environment variable example
cp .env.local.example .env.local

# 3. Fill in your values in .env.local (see Environment Variables below)

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploy to Vercel

### Option A — Vercel Dashboard (recommended)

1. Go to [vercel.com](https://vercel.com) and open the **ARMS REACH DIGITAL AGENCY** team.
2. Click **Add New → Project**.
3. Import the `ARMS-REACH-DIGITAL-AGENCY/susie` GitHub repository.
4. Framework will be auto-detected as **Next.js**.
5. Add your environment variables (see below) in the **Environment Variables** section before deploying.
6. Click **Deploy**.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

---

## Environment Variables

Set these in Vercel → Project → Settings → Environment Variables.

| Variable | Required | Description |
|---|---|---|
| `HIGHLEVEL_WEBHOOK_URL` | Recommended | Your HighLevel workflow webhook URL. Get it from HL → Automation → Workflows → your workflow → Webhook Trigger. |
| `NEXT_PUBLIC_BOOKING_LINK` | Optional | Your booking page URL (Calendly, HighLevel calendar, etc.). If not set, a placeholder message is shown. |

**If `HIGHLEVEL_WEBHOOK_URL` is not set:** The form will still work — submissions are logged server-side and the user sees a success message. No errors are shown to the visitor.

---

## How to Get Your HighLevel Webhook URL

1. In HighLevel, go to **Automation → Workflows**.
2. Create a new workflow (or open an existing one).
3. Add a **Webhook** trigger as the first step.
4. Copy the webhook URL provided.
5. Paste it into Vercel as `HIGHLEVEL_WEBHOOK_URL`.

**Webhook payload sent on form submit:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "(555) 000-0000",
  "interest": "Feeling less puffy, heavy, or inflamed",
  "timeline": "This week",
  "preferredNextStep": "Book a consultation",
  "source": "Susie Sculpts Landing Page",
  "page": "Body Reset Experience"
}
```

---

## Connecting susiesculpts.com (GoDaddy → Vercel)

### Step 1 — Add the domain in Vercel

1. In Vercel → Project → **Domains**.
2. Click **Add** and type `susiesculpts.com`.
3. Also add `www.susiesculpts.com`.
4. Vercel will show you the DNS records needed.

### Step 2 — Update DNS in GoDaddy

**Option A: Change Nameservers (cleanest — recommended)**

In GoDaddy → Domain → **Manage DNS → Nameservers → Change**:

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

This hands full DNS control to Vercel. Propagation takes 1–48 hours.

**Option B: Add individual DNS records (keep GoDaddy DNS)**

In GoDaddy → DNS Management, add:

| Type | Name | Value | TTL |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` | 600 |
| `CNAME` | `www` | `cname.vercel-dns.com` | 600 |

---

## Updating Content

| What to change | Where |
|---|---|
| Phone number | `components/Footer.tsx` — look for `(000) 000-0000` |
| Email address | `components/Footer.tsx` — look for `hello@susiesculpts.com` |
| Instagram handle | `components/Footer.tsx` — look for `@susiesculpts` |
| Google Business link | `components/Footer.tsx` — look for `g.page/susiesculpts` |
| Logo | Replace `public/images/logo.png` |
| Susie's photo | Replace `public/images/susie.jpg` |
| Testimonials | `components/Trust.tsx` — replace the placeholder blockquote |
| Hero headline / copy | `components/Hero.tsx` |
| Service descriptions | `components/Services.tsx` |
| FAQ answers | `components/FAQ.tsx` |
| Booking link | Set `NEXT_PUBLIC_BOOKING_LINK` env variable |

---

## Version 2 Roadmap

- Full booking calendar embed (HighLevel or Calendly)
- HighLevel pipeline automation (tags, stages, follow-up sequences)
- Dedicated service pages: Synergy, PEMF, EMShape
- Google Business Profile optimization
- Review automation
- Social proof / testimonial section with real reviews
- Retargeting pixel setup (Meta, Google)
- Blog / SEO expansion
- Separate landing pages for each service
- Before/after gallery (with proper consent)

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Fonts:** Cormorant Garamond (serif) + Jost (sans) via Google Fonts
- **Deployment:** Vercel
- **CRM Integration:** HighLevel via serverless webhook API route
- **TypeScript:** Yes
