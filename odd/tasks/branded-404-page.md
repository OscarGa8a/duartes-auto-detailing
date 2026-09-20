# Branded bilingual 404 page

## Objective
Replace Cloudflare Pages' generic 200 homepage fallback with a premium bilingual 404 experience that matches Duarte's nocturnal automotive brand and returns a real HTTP 404 for unknown URLs.

## Baseline and production evidence
- Baseline: merged Spanish-localization commit `3dd4b4212544f2dd7ab3353645e1338d03af113a`.
- Production currently returns HTTP 200 from Cloudflare for random unknown paths and `/es/services/interior-detailing`.
- Official Cloudflare Pages behavior: without a top-level `404.html`, unknown paths receive the SPA entry point; adding a top-level `404.html` disables that fallback and serves the custom document with HTTP 404: https://developers.cloudflare.com/pages/configuration/serving-pages/.

## Approved design direction
- Premium nocturnal automotive language using existing graphite, cream, and gold tokens.
- Spanish-primary bilingual copy with concise English support on one static page; no pathname detection.
- Asymmetric, editorial composition with one clear return-home action.
- Restrained, motivated reflective-light motion with a complete reduced-motion fallback.
- Design dials: variance 7, motion 4, density 3.

## Scope
- Add a root Astro `404` page that generates `dist/404.html`.
- Reuse the existing logo, Poppins typography, brand tokens, and evidence-backed automotive imagery or a restrained reflective-light treatment.
- Emit error-safe head metadata: `noindex, nofollow`; no canonical, hreflang, Open Graph URL, or JSON-LD.
- Add deterministic static-output checks for the 404 document, bilingual/accessibility contract, and exclusion from sitemap/canonical inventories.
- Verify Cloudflare's real HTTP 404 behavior on a deployed preview or production deployment after delivery.

## Constraints
- Keep one primary action to `/`; do not render the full Navbar/Footer.
- Use `<html lang="es-US">` and mark English support with `lang="en"`.
- Exactly one `<h1>`, one `<main>`, descriptive action text, visible focus treatment, at least 44px target, AA contrast, and no decorative semantics.
- Respect `prefers-reduced-motion`; animate only transform/opacity or a decorative background position with a static fallback.
- Do not create localized fake routes, redirect unknown URLs to `/`, or add the 404 to the sitemap.
- Do not add dependencies, install packages, download browsers, invent business claims, or mutate hosting settings.
- No commit, push, PR, merge, or deployment without explicit owner authorization.

## Testing mode and delivery
TDD is not configured. Use ordinary deterministic source/output checks, Astro/type check, isolated build, SEO verification, accessibility-oriented source inspection, and read-only HTTP status validation. Route: delegated ODD because implementation spans multiple non-trivial files. Forecast: 170–250 authored changed lines. Delivery strategy: `ask-on-risk`; one cohesive PR is expected below the repository review budget.

## Tasks
- [x] **ODD-404-01 — Build the branded error page.** Added `src/pages/404.astro` with a standalone Spanish-primary, bilingual error page, error-safe metadata, accessible home action, responsive graphite/cream/gold composition, and reduced-motion reflective treatment.
- [x] **ODD-404-02 — Enforce static error contracts.** Extended `scripts/verify-seo-output.mjs` to require and validate `dist/404.html` while keeping it outside canonical route and sitemap inventories.
- [ ] **ODD-404-03 — Verify build and status boundary.** Run source checks, Astro check, isolated build/SEO, exact path/line inventory, visual/static review, native review, and post-delivery HTTP 404 validation.

## Acceptance criteria
1. `dist/404.html` exists and is not included in sitemap or canonical page inventories.
2. The document has `lang="es-US"`, Spanish-primary copy, explicitly marked English support, exactly one main heading, and one home action.
3. The page emits `noindex, nofollow` and no canonical, hreflang, Open Graph URL, or JSON-LD.
4. Desktop and mobile layouts retain premium brand hierarchy, keyboard focus, AA contrast, and reduced-motion behavior.
5. After deployment, both a random unknown path and `/es/services/interior-detailing` return HTTP 404 and render the custom page.
6. Existing English and Spanish canonical pages, sitemap, SEO metadata, and publication contracts remain unchanged.

## Required checks
- `node scripts/verify-localization-source.mjs --self-test`
- `node scripts/verify-localization-source.mjs`
- Astro check with the existing installed toolchain
- Isolated production build plus `node scripts/verify-seo-output.mjs`
- Deterministic `dist/404.html` assertions and sitemap exclusion
- `git diff --check` and exact changed-path inventory
- Independent verification as routed and native review before delivery
- Read-only preview/production HTTP status checks after deployment

## Progress
- 2026-09-19: owner selected premium nocturnal, combined bilingual, and design-plus-real-HTTP-404 scope.
- 2026-09-19: confirmed the live site is served by Cloudflare and unknown paths currently return HTTP 200. Official Cloudflare documentation confirms that adding top-level `404.html` switches unknown paths from SPA fallback to custom HTTP 404 behavior.
- 2026-09-19: created clean worktree `/home/oscar/code/duartes-auto-detailing-404` on `feat/branded-404-page` from `3dd4b421`.
- 2026-09-19: localization checks, Astro check, `git diff --check`, isolated production build, and the SEO/404 output gate passed; the build generated 35 canonical pages plus `/404.html`.
- 2026-09-19: native review `review-ed317939a3fcd0a7` was approved and acknowledged with one informational reminder that edge HTTP status proof remains post-deployment.
- 2026-09-19: delivery issue [#67](https://github.com/OscarGa8a/duartes-auto-detailing/issues/67) was created and owner-approved.

## Next step
Commit and open the approved delivery PR, then verify real HTTP 404 behavior after an explicitly authorized merge and deployment.
