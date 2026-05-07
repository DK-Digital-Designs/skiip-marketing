# skiip-marketing

Production marketing and lead-generation website for SKIIP.

## Current status

This is a lean v1 production rebuild. Forms currently use basic `mailto:` email delivery so the site can launch without Supabase or Resend setup. The Supabase/Resend API path is still in the codebase for a later upgrade.

Read these docs before deployment:

- [Project state](docs/PROJECT_STATE.md)
- [Deployment next steps](docs/DEPLOYMENT_NEXT_STEPS.md)
- [v1 scope and deferred work](docs/V1_SCOPE_AND_DEFERRED.md)

## Legacy prototype preservation

`SKIIP website - V4/` and `SKIIP website - V4.zip` are preserved as the client-approved prototype source. Do not delete or rewrite those files during the v1 rebuild. The production Next.js app at the repo root migrates the approved design, copy intent, logo, page structure, CTAs, and mobile product mockups into a deployable website.

## Development

```bash
npm install
npm run dev
```

The dev server binds to `0.0.0.0` so the site can be checked from another device on the local network.

## Required environment variables

For the current basic email setup:

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_LEAD_DELIVERY=mailto
NEXT_PUBLIC_LEAD_EMAIL=
NEXT_PUBLIC_GA4_ID=
```

For the later Supabase + Resend API lead flow:

```bash
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
LEAD_NOTIFY_EMAIL=
NEXT_PUBLIC_GA4_ID=
IP_HASH_SECRET=
```

`SUPABASE_SERVICE_ROLE_KEY` must stay server-only. Do not expose it with a `NEXT_PUBLIC_` prefix.


