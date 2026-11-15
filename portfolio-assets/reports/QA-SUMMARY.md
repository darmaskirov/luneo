# LUNEO final QA and media handoff

Public demo: https://luneo-nullexweb.pages.dev
Deployment: Cloudflare Pages Free, direct upload of static Next.js export.

## Automated verification
- All 18 main routes opened directly, including all 12 product variants.
- Desktop 1440, tablet 768, mobile 390: no horizontal overflow.
- Every image decoded successfully; no failed resource responses.
- No captured browser errors or warnings on the audited routes.
- axe-core WCAG 2 A/AA and WCAG 2.1 AA: zero detected violations across audited pages. Automated checks do not certify full accessibility.
- Category and price filtering, sorting, colour switching, quantity changes, persistent bag, local checkout, contact form and newsletter exercised.
- No non-GET requests observed during form/checkout interaction; order input is not stored by OrderService. Only product IDs and quantities persist in localStorage.
- Public deployment repeated the route, image, responsive, axe and interaction audit: zero reported errors.
- TypeScript, ESLint and static production build passed.

## Lighthouse mobile (local static production, simulated throttling)
Performance 81 / Accessibility 100 / Best Practices 100 / SEO 100.
FCP 0.9 s; LCP 5.2 s; TBT 80 ms; CLS 0; Speed Index 2.1 s.
This is one lab run, not field Core Web Vitals. Further mobile performance work could reduce JS delivery and provide smaller responsive image variants; static hosting uses pre-optimised WebP without a runtime image transformer.

## Fixes
1. Lifestyle grid intrinsic sizing caused desktop/tablet horizontal overflow; use minmax(0,1fr) and min-width:0.
2. Newsletter note contrast below AA; darkened small-text colour.
3. Small labels and footer text increased for readability.
4. GSAP no-target warnings on routes without Hero removed.
5. Shopping bag dialog now has an accessible name; added skip link and mobile-menu expanded state.
6. Malformed localStorage items are checked for null/object before reading IDs.
7. OrderService also validates phone syntax.
8. Added a local favicon to eliminate the missing resource request.
9. Added static-export configuration, direct product routes and correct production static preview script.

## Media
11 real UI screenshots (1440×900 desktop hero, full homepage, collection, philosophy, catalog, product, bag, checkout, three 390×844 mobile captures).
4 real-screenshot presentation boards, each 1600×1200.
Reel: 1080×1920, H.264, 30 FPS, 25.4 seconds, no audio. Real Playwright browser recordings with scroll, hover, colour selection and bag interaction, assembled with fades and a designed end card. Encoded at 30 FPS; browser capture cadence is variable. Raw recordings remain locally in the ignored video/raw directory.

## Manual steps
Publish the supplied copy and media to the desired social/portfolio profiles. Music may be added in Instagram. Direct Upload does not automatically redeploy on Git pushes; run the documented deploy command after future changes. There are no real payment, shipping or CRM services connected, intentionally.
