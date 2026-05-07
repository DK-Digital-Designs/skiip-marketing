# v1 Scope and Deferred Work

## v1 scope

v1 is intentionally lean.

Build and deploy:

- production Next.js marketing site
- mobile-first pages
- preserved approved prototype source
- basic email lead capture
- essential SEO metadata
- sitemap and robots
- cookie consent
- Vercel Analytics and Speed Insights
- basic security headers
- Vercel deployment and rollback path

## Not in v1

These are not defects. They are deliberate scope reductions.

## Deferred issues to create

### Add API-backed lead capture with Supabase and Resend

Priority: P1

Reason deferred: Basic email is enough to launch and avoids backend setup time.

Future value: More reliable lead storage, server-side notifications, and better tracking of submissions.

### Add stronger anti-spam protection

Priority: P1

Reason deferred: Mailto mode has no public write API, so the attack surface is smaller for v1.

Future value: Needed when API-backed forms are enabled.

### Finalise legal copy

Priority: P1

Reason deferred: Legal wording needs client/legal approval.

Future value: Reduces compliance risk before campaigns or broader launch.

### Add product preview demo route

Priority: P1

Reason deferred: Not required for launch or lead capture.

Future value: Helps prospects understand attendee and vendor workflows without building the real product platform.

### Add detailed conversion tracking

Priority: P1

Reason deferred: Vercel Analytics plus optional GA4 page tracking is enough for v1.

Future value: Improves funnel insight once traffic starts.

### Add strict nonce-based CSP

Priority: P2

Reason deferred: Can slow launch and complicate analytics scripts.

Future value: Stronger XSS protection.

### Add external error monitoring

Priority: P2

Reason deferred: Vercel logs and simple static pages are enough for v1.

Future value: Faster debugging as backend/API usage grows.

### Build internal lead admin dashboard

Priority: P2

Reason deferred: There is no lead database in mailto mode.

Future value: Useful after Supabase lead capture is enabled.

### Add CRM integration

Priority: P2

Reason deferred: CRM choice and sales process are not fixed.

Future value: Better lead handoff once volume increases.

### Add vendor file uploads

Priority: P2

Reason deferred: Uploads add storage, validation, abuse handling, and moderation.

Future value: Vendors can submit menus and photos directly.
