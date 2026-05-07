# SKIIP v1 deployment checklist

Canonical deployment docs now live in [docs/DEPLOYMENT_NEXT_STEPS.md](docs/DEPLOYMENT_NEXT_STEPS.md). This file remains as a short root-level reference.

## 1. Basic email mode for v1

Use this mode first to keep launch simple.

1. Set `NEXT_PUBLIC_LEAD_DELIVERY=mailto`.
2. Set `NEXT_PUBLIC_LEAD_EMAIL` to the inbox that should receive enquiries.
3. Test contact, vendor, and organiser forms. Each should open the visitor's email app with a pre-filled message.

## 2. Supabase and Resend later

1. Create or select the Supabase project.
2. Run `supabase/migrations/001_create_leads.sql` in the SQL editor.
3. Confirm `public.leads` exists.
4. Confirm RLS is enabled.
5. Do not add anon/authenticated public policies for `public.leads` in v1.
6. Copy the project URL into `NEXT_PUBLIC_SUPABASE_URL`.
7. Copy the service role key into `SUPABASE_SERVICE_ROLE_KEY`.
8. Set `NEXT_PUBLIC_LEAD_DELIVERY=api` when ready to use the server API flow.

## 3. Resend

1. Verify the sending domain when the final domain is available.
2. Set `RESEND_API_KEY`.
3. Set `LEAD_NOTIFY_EMAIL`.
4. Set `LEAD_FROM_EMAIL` to the verified sender. Use Resend onboarding sender only for testing.

## 4. Vercel

1. Import the GitHub repo.
2. Framework preset: Next.js.
3. Build command: `npm run build`.
4. Install command: `npm ci`.
5. Production branch: `main`.
6. Add environment variables from `.env.example`.
7. Enable Vercel Web Analytics.
8. Enable Vercel Speed Insights.
9. Add the production domain and set `NEXT_PUBLIC_SITE_URL` to the canonical URL.

## 5. Pre-production checks

```bash
npm ci
npm run typecheck
npm run build
```

Then verify:

- `/`, `/vendors`, `/organisers`, `/help`, `/vendor-apply` load on mobile and desktop.
- Cookie banner dismisses.
- GA4 does not load before accepting analytics.
- In mailto mode: contact, vendor, and organiser forms open a pre-filled email.
- In API mode: contact, vendor, and organiser forms create Supabase rows and send notifications.
- Vercel preview deployment works before production.

## 6. Rollback

Use Vercel's previous healthy production deployment if the launch deploy has a production issue.
