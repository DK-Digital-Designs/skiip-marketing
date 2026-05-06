# Revised SKIIP Marketing Site v1 Plan

## 1. v1 Goal
Ship a fast, mobile-first production rebuild of the approved SKIIP marketing prototype as a real Vercel-hosted website with reliable lead capture, essential SEO, analytics, legal basics, and stable deployment. v1 is not a platform build: no real ordering, payments, attendee auth, vendor auth, or live dashboard.

## 2. What Stays
- Preserve all existing prototype/client-approved files in the repo.
- Faithfully migrate the current design, messaging intent, logo, page structure, CTAs, and product mockups.
- Make mobile the primary design target.
- Use real routes instead of prototype state navigation.
- Use working lead forms with notification delivery.
- Use Supabase because it already fits the broader SKIIP ecosystem.
- Deploy on Vercel with preview/production workflow and rollback awareness.
- Add essential SEO metadata, sitemap, robots, Open Graph, analytics, and basic legal pages.
- Remove prototype-only runtime risks: CDN React, browser Babel, edit mode, localStorage routing, broken encoding.

## 3. What Changes
- Use Supabase only as a simple lead store in v1, not a mini CRM or audit platform.
- Use one `leads` table instead of multiple lead/rate-limit/audit tables.
- No Supabase Auth or SSR auth setup in v1.
- No complex RLS policy model beyond “no public client access; server writes only.”
- No database-backed rate limiting in v1; use simple honeypot, payload limits, and server validation.
- Reduce analytics to Vercel Analytics, Speed Insights, and basic consent-aware GA4 page tracking.
- Reduce custom event tracking to only core conversion events if quick to add.
- Keep tests focused on build, routing, forms, mobile layout, and analytics consent.
- Defer product preview/demo polish unless the migrated homepage already uses the mockups.
- Defer advanced CSP, log drains, synthetic monitoring, dashboards, and CRM-style lead workflows.

## 4. P0 / Must-Have for v1
- Create a production Next.js app at repo root using TypeScript and Vercel-compatible defaults.
- Preserve `SKIIP website - V4/` and the zip as untouched legacy/source-reference files.
- Add a short repo note explaining the legacy folder is the approved prototype source.
- Migrate these public routes:
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
- Use real `<Link>` navigation and real URLs.
- Keep the approved SKIIP visual language, logo, stakeholder split, story, FAQ, CTAs, and phone mockups.
- Fix encoding issues and replace broken symbols with clean text/icons.
- Build mobile-first layouts for 360px/390px first, then tablet/desktop.
- Ensure no horizontal overflow on common mobile widths.
- Make nav, forms, CTAs, FAQ, and footer polished on mobile.
- Add working lead forms:
  - Help/contact form.
  - Vendor application form.
  - Organiser enquiry path, either on `/organisers` or `/get-started`.
- Use server-side form submission through Next.js route handlers.
- Use Zod or equivalent server-side validation.
- Use Supabase server-side insert with service role key only on the server.
- Use one simple Supabase table, e.g. `public.leads`.
- Enable RLS on the leads table and do not expose public read/write access from the browser.
- Send lead notification emails through Resend.
- Include form loading, success, validation error, and generic failure states.
- Add basic spam protection: honeypot field, max payload size, required consent checkbox.
- Add essential metadata per route: title, description, canonical, Open Graph image.
- Add `sitemap.ts`, `robots.ts`, favicons, and manifest.
- Add Vercel Web Analytics and Speed Insights.
- Add GA4 only behind cookie consent.
- Add basic security headers: HSTS, `nosniff`, referrer policy, frame denial, basic permissions policy.
- Configure Vercel preview deployments and production deployment from `main`.
- Document rollback as “use previous healthy Vercel production deployment.”

## 5. P1 / Defer if Needed
- Product preview/demo route using attendee/vendor prototype surfaces.
  - Defer to GitHub issue.
- Custom conversion event tracking beyond form submit success.
  - Defer to GitHub issue.
- Full legal copy refinement beyond placeholder-safe privacy/terms/cookies pages.
  - Defer to GitHub issue if final legal copy is unavailable.
- Rich form categorisation/status workflow in Supabase.
  - Defer to GitHub issue.
- Supabase-generated TypeScript database types.
  - Defer to GitHub issue if setup time is tight.
- Stronger anti-spam/rate limiting.
  - Defer to GitHub issue.
- Lighthouse tuning beyond obvious image/font/script fixes.
  - Defer to GitHub issue if baseline is already acceptable.

## 6. P2 / Post-Launch Hardening
- Full nonce-based CSP.
  - Defer to GitHub issue.
- Log drains or external monitoring.
  - Defer to GitHub issue.
- Sentry or dedicated error tracking.
  - Defer to GitHub issue.
- Admin dashboard for viewing leads.
  - Defer to GitHub issue.
- CRM integration.
  - Defer to GitHub issue.
- File uploads for vendor photos/menus.
  - Defer to GitHub issue.
- Automated synthetic monitoring.
  - Defer to GitHub issue.
- Advanced SEO schema beyond basic Organization/WebSite metadata.
  - Defer to GitHub issue.

## 7. GitHub Issues to Create From Deferred Scope
- Issue title: Add product preview demo route  
  Priority: P1  
  Reason deferred: Not required for lead capture or launch stability.  
  Future value: Helps prospects understand the attendee/vendor experience without building the real platform.

- Issue title: Add detailed conversion event tracking  
  Priority: P1  
  Reason deferred: Basic analytics and form submissions are enough for v1.  
  Future value: Improves funnel insight for CTA clicks, role selection, and form starts.

- Issue title: Finalise legal copy  
  Priority: P1  
  Reason deferred: Legal wording may need client/legal approval outside engineering.  
  Future value: Reduces compliance risk before larger campaigns.

- Issue title: Add lead status workflow  
  Priority: P1  
  Reason deferred: v1 only needs reliable capture and notification.  
  Future value: Helps the team manage leads as volume grows.

- Issue title: Generate and wire Supabase database types  
  Priority: P1  
  Reason deferred: Useful but not essential for a small lead table.  
  Future value: Reduces type errors as backend usage expands.

- Issue title: Add stronger rate limiting for lead forms  
  Priority: P1  
  Reason deferred: Honeypot, validation, and payload limits are enough for initial launch.  
  Future value: Protects forms if spam increases.

- Issue title: Tune Lighthouse and Core Web Vitals after launch data  
  Priority: P1  
  Reason deferred: Real Vercel Speed Insights data is more useful after traffic starts.  
  Future value: Improves mobile conversion and SEO quality.

- Issue title: Add strict nonce-based Content Security Policy  
  Priority: P2  
  Reason deferred: Can slow delivery and conflict with analytics/consent scripts.  
  Future value: Stronger XSS protection.

- Issue title: Add external error monitoring  
  Priority: P2  
  Reason deferred: Vercel logs are enough for v1.  
  Future value: Faster production debugging as traffic grows.

- Issue title: Build internal lead admin dashboard  
  Priority: P2  
  Reason deferred: Email notifications plus Supabase table access are enough initially.  
  Future value: Easier lead review and follow-up tracking.

- Issue title: Integrate CRM for lead handoff  
  Priority: P2  
  Reason deferred: CRM choice/process may not be fixed yet.  
  Future value: Better sales workflow once lead volume increases.

- Issue title: Add vendor file uploads  
  Priority: P2  
  Reason deferred: Upload handling adds storage, validation, abuse, and moderation complexity.  
  Future value: Lets vendors submit menus/photos directly.

- Issue title: Add synthetic uptime checks  
  Priority: P2  
  Reason deferred: Manual post-deploy checks are enough for launch.  
  Future value: Early detection of outages or broken forms.

- Issue title: Add advanced structured SEO schema  
  Priority: P2  
  Reason deferred: Basic metadata/sitemap/OG is enough for v1.  
  Future value: Better search presentation as content expands.

## 8. Revised Acceptance Criteria
- Existing prototype files are preserved and documented.
- Production app uses Next.js and runs without browser Babel/CDN React.
- Approved design and messaging are faithfully migrated.
- Site is polished and usable on mobile first.
- No horizontal overflow at 360px, 390px, 768px, and desktop widths.
- All P0 routes load as real URLs.
- Nav works on mobile and desktop.
- Contact, vendor, and organiser leads submit successfully.
- Leads are stored in Supabase.
- Notification emails are delivered through Resend.
- User-facing form errors and success states work.
- Supabase service role key is server-only.
- Basic RLS is enabled on the leads table.
- Vercel Analytics and Speed Insights are installed.
- GA4 does not load before analytics consent.
- Essential metadata, sitemap, robots, favicon, and OG image exist.
- Basic security headers are present.
- `npm ci`, lint/typecheck if configured, and production build pass.
- Manual mobile QA passes on key pages and forms.
- Vercel preview deploy works.
- Production deploy works.
- Rollback path is known and documented.
