# SKIIP Marketing Site - Current State

## What this repo is now

This repo now contains a production Next.js rebuild of the approved SKIIP marketing prototype.

The production app lives at the repo root:

- `app/` - Next.js routes and API routes
- `components/` - shared UI and forms
- `content/` - navigation, FAQ, route content helpers
- `lib/` - future lead API helpers for Supabase and Resend
- `public/` - production assets copied from the approved prototype
- `supabase/` - deferred migration for later API-backed lead capture

The approved client prototype is preserved untouched:

- `SKIIP website - V4/`
- `SKIIP website - V4.zip`

Those legacy files are the visual/content source of truth. Do not remove them unless the client explicitly approves archival later.

## Product boundary

This is a production marketing and lead-generation website, not a product platform.

In v1, do not build:

- real attendee ordering
- payments
- attendee accounts
- vendor auth
- organiser auth
- a live vendor dashboard
- a lead management dashboard

The site should communicate the product and capture enquiries.

## Why the project was simplified

The first plan included Supabase lead storage, Resend notifications, richer analytics events, stronger rate limiting, and more production hardening.

That was reduced to keep delivery fast and practical. The current v1 goal is:

- faithfully rebuild the approved prototype
- make it mobile-first
- deploy it cleanly on Vercel
- use basic email for lead capture
- keep Supabase and Resend code available for a later upgrade

## Current lead capture mode

The frontend forms default to basic email using `mailto:`.

Required env vars for the current mode:

```bash
NEXT_PUBLIC_LEAD_DELIVERY=mailto
NEXT_PUBLIC_LEAD_EMAIL=hello@skiip.co
```

When a visitor submits a form, their email app opens with a pre-filled message. This is simple and has no backend dependency, but it depends on the visitor completing the send in their email client.

## Deferred lead API mode

The Supabase and Resend API path has not been removed. It remains in:

- `app/api/leads/contact/route.ts`
- `app/api/leads/vendor/route.ts`
- `app/api/leads/organiser/route.ts`
- `lib/lead.ts`
- `lib/supabase.ts`
- `lib/resend.ts`
- `supabase/migrations/001_create_leads.sql`

To switch to API-backed lead capture later:

```bash
NEXT_PUBLIC_LEAD_DELIVERY=api
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
LEAD_NOTIFY_EMAIL=
IP_HASH_SECRET=
```

Then apply the Supabase migration and test real lead inserts plus notification emails.

## Local dev server note

The earlier WebSocket errors were local-only Next.js development behavior.

Next.js uses a WebSocket in development for hot module reloading. When the site was opened via the LAN IP `192.168.0.150`, Next blocked internal dev resources by default. That caused HMR/font 403 errors.

This was addressed by:

- adding `allowedDevOrigins` in `next.config.ts`
- changing `npm run dev` to bind to `0.0.0.0`

This does not affect production on Vercel.

## Current routes

Production routes:

- `/`
- `/how-it-works`
- `/experience`
- `/vendors`
- `/organisers`
- `/help`
- `/get-started`
- `/vendor-apply`
- `/privacy`
- `/terms`
- `/cookies`

Generated routes:

- `/sitemap.xml`
- `/robots.txt`
- `/manifest.webmanifest`

API routes are present for later API-backed leads but are not used in default `mailto` mode.

## Verification status

The project currently passes:

```bash
npm run typecheck
npm run build
```

Manual checks completed:

- local dev server renders
- mobile-first layout looks good
- cookie banner can be accepted/dismissed
- local HMR/LAN origin issue was addressed

Before production deployment, repeat the deployment checklist in `docs/DEPLOYMENT_NEXT_STEPS.md`.
