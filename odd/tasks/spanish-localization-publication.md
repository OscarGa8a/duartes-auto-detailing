# Spanish route publication

## Objective
Publish the exact approved `es-US` shell, Home, About, Contact, and Services content through exactly four Spanish routes while preserving canonical ownership, reciprocal international SEO, approved omissions, and all non-counterpart English output.

## Baseline and evidence
- Baseline: merged WU-8C commit `f707809aa6122c8072f3010b5cece8663b6f36a4`.
- Approved handoff: Engram observation `1438`, manifest digest `8cbde96c2f2f38d05454398df33251fe77b1739a408893ad97e8c2a2d8119910`.
- Exact block digests: shell `702d3c0059d1ef3e048b1064050209ddb7c77b59cf55a821a3369cbf1058ae25`; Home `6c259ed9ecb79022dd778d8fad74ec6d287a9b02e084664ec2a2de8e732b4b2d`; About `29dc14fa4af33cd95392115c82693bb7263e37464288862953c4e9e5a684c645`; Contact `0812252896e042a485682a2716c7e7792deb7dbf41f405cccb38fc2294ecafaf`; Services `8d2cd90a9f164f7a0c1f10b110ec32e1e925a63bf244d6de4fbbf52d1b5caadf`.

## Scope
- Populate repository-owned approval/publication evidence from the already-approved blocks.
- Publish only `/es/`, `/es/about/`, `/es/contact/`, and `/es/services/`.
- Activate the four logical page IDs in the publication registry.
- Render existing shared compositions with `es-US` content; create no duplicate facts, media, routes, or copy.
- Emit reciprocal language controls, canonical/hreflang, sitemap, and localized schema only for the four published pairs.
- Replace pre-publication verifier assertions with exact-four-route source and generated-output contracts.

## Constraints
- Publish no Spanish service-detail route or any fifth Spanish route.
- Keep Home testimonials/discount banner, Contact map/location, and Services area teaser/discount banner structurally omitted.
- Keep the Services English-detail disclosure once before the first English detail navigation.
- Preserve English semantics; only the four English counterparts may change for language controls and alternate metadata.
- Preserve `public/llms.txt` exactly.
- Invent no wording, claims, locations, promotions, prices, or schema facts.
- Do not install dependencies or download browsers.
- No commit, push, PR, merge, or deployment without explicit owner authorization.

## Testing mode and delivery
TDD is not configured; use deterministic source/output contracts, Astro/type checking, isolated baseline/candidate builds, SEO checks, reciprocal-pair checks, English parity, and rollback proof. Route: delegated ODD because mapping and implementation cross the four-file and multi-file triggers. Forecast: 300–420 authored changed lines, advisory only. Delivery strategy: `auto-chain`, chain strategy: `stacked-to-main`; split only at a coherent review boundary if the actual candidate materially exceeds the repository review budget.

## Tasks
- [x] **ODD-WU9-01 — Promote publication evidence.** Populated exact approved ledger/manifest closure and activated only the four publishable page IDs.
- [x] **ODD-WU9-02 — Emit four Spanish routes.** Added bounded static Astro routes using existing shared compositions, canonical paths, approved content, and omission/disclosure policies.
- [x] **ODD-WU9-03 — Invert publication verifiers.** Required exact routes, reciprocal SEO, sitemap/schema/internal-link boundaries, unchanged `llms.txt`, and no Spanish detail routes.
- [x] **ODD-WU9-04 — Verify release and rollback.** Passed source self-tests, Astro check, isolated builds, SEO/output checks, English parity, exact route inventories, diff checks, rollback proof, and independent verification; native review remains required before delivery.

## Acceptance criteria
1. The approval ledger and publication manifest close over exactly the five approved blocks and four approved routes with the recorded digests.
2. Build output contains exactly four Spanish HTML routes and no Spanish service-detail output.
3. Each English/Spanish pair has reciprocal canonical, hreflang, language-switch, and localized schema behavior; no unpublished page advertises a counterpart.
4. Spanish omissions and the Services disclosure remain structural and correctly ordered.
5. Non-counterpart English HTML and `public/llms.txt` remain byte-identical; counterpart English differences are limited to publication-driven alternate/language controls.
6. Sitemap and generated route inventories include exactly the new canonical Spanish routes and continue excluding aliases from canonical inventories.

## Required checks
- `pnpm run verify:i18n-source -- --self-test`
- `pnpm run verify:i18n-source`
- Astro/type check with the existing installed toolchain only
- Production build plus `pnpm run verify:seo`
- Exact generated route, sitemap, reciprocal SEO, schema, internal-link, and no-detail-route checks
- Baseline/candidate English parity with explicit counterpart exceptions
- `public/llms.txt` byte parity
- `git diff --check` and exact changed-path inventory
- Independent verification as routed and native review before authorized delivery

## Progress
- 2026-09-19: confirmed PR #64 merged at baseline `f707809a`; created isolated worktree `/home/oscar/code/duartes-auto-detailing-wu9` and branch `feat/spanish-localization-publication`.
- 2026-09-19: delegated read-only mapping found no content or product blocker. Existing typed sources are publication-ready; `getPublishedCounterpart()` and `publishedSpanishPageIds` already form the central runtime gate.
- 2026-09-19: ODD-WU9-01 through ODD-WU9-03 completed after `node scripts/verify-localization-source.mjs --self-test` and `node scripts/verify-localization-source.mjs` passed with all five approved source digests. The prescribed external-worktree Astro check requested a dependency installation and was not allowed to proceed; release/output verification remained assigned to ODD-WU9-04.
- 2026-09-19: corrected one verifier-only `Map` tuple syntax defect and one Astro `getStaticPaths()` isolation defect found by independent execution. Source checks continued to pass after both bounded corrections.
- 2026-09-19: final independent ODD-WU9-04 gate passed with private physical dependency copies excluding `.vite`: Astro check 0 errors/0 warnings/3 hints; baseline 31 and candidate 35 HTML routes; both SEO verifiers passed; exactly four Spanish HTML/sitemap routes were added; reciprocal SEO, localized metadata/schema, disclosure order, structural omissions, non-counterpart English byte parity, bounded counterpart differences, `llms.txt`, approval closure, rollback proof, and cleanup all passed.
- 2026-09-19: exact changed-path inventory is eight expected paths with no unrelated files. Git numstat plus untracked line counts reconcile to 328 authored changed lines before this final evidence update; the verifier's reported 1,585 lines was total file length, not authored diff lines.

## Next step
Complete native review, then request explicit issue/commit/push/PR authorization. Do not merge or deploy.
