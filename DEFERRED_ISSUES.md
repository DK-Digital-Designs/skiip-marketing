# Deferred scope for GitHub issues

Canonical scope docs now live in [docs/V1_SCOPE_AND_DEFERRED.md](docs/V1_SCOPE_AND_DEFERRED.md). This file remains as a short root-level reference.

These items are intentionally out of v1 to keep the marketing site lean.

## P1

- Add product preview demo route
  - Deferred because it is not required for lead capture or launch stability.
  - Later value: helps prospects understand attendee/vendor flows without building the real platform.

- Add detailed conversion event tracking
  - Deferred because Vercel Analytics, Speed Insights, GA4 page tracking, and working forms are enough for v1.
  - Later value: improves funnel insight for CTA clicks, role selection, and form starts.

- Finalise legal copy
  - Deferred because legal wording needs client/legal approval.
  - Later value: reduces compliance risk before larger campaigns.

- Add stronger anti-spam/rate limiting
  - Deferred because honeypot fields, payload limits, and server validation are enough for launch.
  - Later value: protects forms if spam increases.

## P2

- Add strict nonce-based CSP
  - Deferred because it can slow launch and conflict with analytics/consent scripts.
  - Later value: stronger XSS protection.

- Add external error monitoring
  - Deferred because Vercel logs are enough for v1.
  - Later value: faster debugging as traffic grows.

- Build internal lead admin dashboard
  - Deferred because email notifications plus Supabase table access are enough initially.
  - Later value: easier lead review and follow-up tracking.

- Add CRM integration
  - Deferred because CRM choice and sales process are not fixed in v1.
  - Later value: better lead handoff once volume increases.

- Add vendor file uploads
  - Deferred because upload handling adds storage, validation, abuse, and moderation work.
  - Later value: lets vendors submit menus and photos directly.
