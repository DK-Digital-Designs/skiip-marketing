# SKIIP v1 Deployment Next Steps

## Current recommendation

Deploy v1 with basic email lead capture first.

This avoids delaying launch on Supabase, Resend domain verification, RLS details, or backend form testing. Supabase and Resend can be switched on later without rebuilding the site.

## Step 1 - Final local check

Run:

```bash
npm ci
npm run typecheck
npm run build
```

Then locally verify:

- home page loads
- mobile nav opens and closes
- cookie banner dismisses
- `/help` contact form opens a pre-filled email
- `/vendor-apply` form opens a pre-filled email
- `/organisers` form opens a pre-filled email
- no obvious horizontal scroll on mobile

## Step 2 - Choose the lead inbox

Decide the email address that should receive enquiries.

Set:

```bash
NEXT_PUBLIC_LEAD_DELIVERY=mailto
NEXT_PUBLIC_LEAD_EMAIL=<chosen inbox>
```

Use a real shared inbox if possible, for example:

```bash
hello@skiip.co
partners@skiip.co
support@skiip.co
```

## Step 3 - Commit and push

Commit the production rebuild.

Suggested commit message:

```bash
Build lean SKIIP marketing website v1
```

Push the branch to GitHub.

## Step 4 - Create Vercel project

In Vercel:

1. Import the GitHub repo.
2. Framework preset: Next.js.
3. Install command: `npm ci`.
4. Build command: `npm run build`.
5. Production branch: `main`.
6. Add environment variables:

```bash
NEXT_PUBLIC_SITE_URL=<preview or production URL>
NEXT_PUBLIC_LEAD_DELIVERY=mailto
NEXT_PUBLIC_LEAD_EMAIL=<chosen inbox>
NEXT_PUBLIC_GA4_ID=<optional>
NEXT_ALLOWED_DEV_ORIGINS=
```

Do not add Supabase or Resend vars for the v1 mailto launch unless switching to API mode.

## Step 5 - Preview deployment QA

On the Vercel preview URL, test:

- `/`
- `/vendors`
- `/organisers`
- `/help`
- `/vendor-apply`
- `/privacy`
- `/terms`
- `/cookies`
- `/sitemap.xml`
- `/robots.txt`

Mobile QA:

- 360px or real phone viewport
- nav usable
- CTAs visible
- forms readable
- no horizontal overflow
- cookie banner does not block core actions after dismissal

Lead QA:

- submit contact form
- submit vendor form
- submit organiser form
- confirm each opens email client with clear subject/body
- manually send one test email to the chosen inbox

Analytics QA:

- Vercel Analytics enabled in dashboard
- Speed Insights enabled in dashboard
- GA4 remains optional
- if GA4 is configured, it should load only after accepting analytics cookies

## Step 6 - Domain setup

Add the production domain in Vercel.

After DNS is live, update:

```bash
NEXT_PUBLIC_SITE_URL=https://<canonical-domain>
```

Choose one canonical domain style and redirect the other:

- `https://skiip.co`
- or `https://www.skiip.co`

## Step 7 - Production deployment

Deploy production from `main`.

After it is live:

- open the production URL on desktop
- open it on mobile
- test all forms again
- confirm metadata/social preview basics
- confirm sitemap and robots
- confirm Vercel deployment status is healthy

## Step 8 - Rollback plan

If launch has a production issue, use Vercel's previous healthy production deployment.

Do not debug directly in production first. Roll back, then fix on a preview deployment.

## Step 9 - Later backend upgrade

When basic email becomes limiting, switch to API-backed lead capture:

1. Apply `supabase/migrations/001_create_leads.sql`.
2. Add Supabase env vars.
3. Add Resend env vars.
4. Set `NEXT_PUBLIC_LEAD_DELIVERY=api`.
5. Test forms on preview.
6. Confirm Supabase rows are created.
7. Confirm notification emails are sent.
8. Promote to production.
