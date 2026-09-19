# Spanish Services content promotion

## Objective

Promote the exact owner-approved `es-US.services.v1` values into typed repository source, make Spanish Services omissions and English-detail disclosure structurally safe, and keep every Spanish route unpublished.

## Baseline and approved evidence

- Baseline: merged WU-8B commit `cd4908612131630fbf253310106b6b29492f46cf`.
- Services block: `es-US.services.v1`, SHA-256 `8d2cd90a9f164f7a0c1f10b110ec32e1e925a63bf244d6de4fbbf52d1b5caadf`, Engram observation `1435`.
- Approval event: Engram observation `1436`.
- Handoff: Engram observation `1438`, manifest SHA-256 `8cbde96c2f2f38d05454398df33251fe77b1739a408893ad97e8c2a2d8119910`.

## Problem and rationale

The shared Services composition already preserves canonical service facts, routes, and media, but its localized card records are empty, its English-detail disclosure appears after the first image navigation, and its area teaser and discount banner cannot both be omitted structurally for Spanish. WU-8C must promote only the approved Services presentation block while preserving English output and zero Spanish publication.

## Scope

- Add typed source for the exact approved Spanish Services presentation values.
- Require exhaustive localized `{ displayName, summary }` records by stable canonical `ServiceId`.
- Keep slugs, routes, images, schema relationships, business facts, and canonical service records runtime-owned.
- Place the required English-detail disclosure before the first image or button navigation to an English service detail.
- Make the Spanish area teaser and discount banner complete structural omissions; do not invent promotional copy.
- Wire the English Services page to explicit locale and logical page identity without changing output.
- Strengthen deterministic verification for the approved digest, exact service coverage/order, omission policies, English parity, and no publication.

## Constraints

- Preserve the approved JSON values, structure, and `ServiceId` order exactly; any content change invalidates approval.
- Keep `publishedSpanishPageIds` empty and create no `src/pages/es/`, Spanish publication manifest, alternate, sitemap entry, JSON-LD route, internal `/es/` link, or generated `/es/` output.
- Do not localize or duplicate canonical service facts from `src/data/services.ts`.
- Spanish Services must omit the complete area teaser and complete discount banner.
- The disclosure must precede the first English image/button navigation; content hidden after navigation is insufficient.
- English rendering, metadata, service order, links, media, schema output, teaser, and discount banner must remain equivalent.
- Do not install dependencies or download a browser.
- No commit, push, PR, merge, or deployment without explicit user authorization.

## Testing mode

TDD is not configured. Evidence: the repository has no test runner or `test` script, and the established Services workflow uses contract-first deterministic verification. Use the existing Node verifier, Astro/type check, production build/SEO verification, English semantic parity, no-publication checks, and independent verification. Browser evidence may use only an already-installed approved executable.

## Delivery and routing

- Route: Organic Driven Development with bounded delegated writers; SDD is not selected.
- `ODD-WU8C-01`: delegated writer because it changes multiple non-trivial i18n files.
- `ODD-WU8C-02`: delegated writer because it changes multiple Astro components.
- `ODD-WU8C-03`: delegated writer because verifier changes require focused source-contract work.
- `ODD-WU8C-04`: delegated verification because commands exceed a local 1–3-file readback.
- Forecast: 280–405 authored changed lines, with the approximately 400-line guidance treated as advisory.
- Delivery strategy: `ask-on-risk`; no delivery action is authorized yet.

## Tasks

- [x] **ODD-WU8C-01 — Promote exact typed Services sources.** Extended omission-safe Services contracts, added the exact approved Spanish source and digest binding, required exhaustive localized card presentation by `ServiceId`, preserved English values, and encoded Spanish discount-banner omission. Independent verification passed.
- [x] **ODD-WU8C-02 — Wire structural omissions and disclosure order.** Propagated explicit locale/page identity and localized presentation through the Services composition, rendered one disclosure before every English detail navigation, omitted the Spanish area teaser and discount banner structurally, and preserved English descriptions. Independent static verification passed; compiler-backed Astro verification remains deferred.
- [x] **ODD-WU8C-03 — Complete deterministic Services contracts.** Verified the exact approved digest, service ID coverage/order, runtime-owned facts, unique pre-navigation disclosure placement, structural omissions, English identity, and empty source publication boundary. Independent verification passed after one bounded correction round.
- [x] **ODD-WU8C-04 — Verify parity and no publication.** Passed focused verifier, Astro/type, isolated baseline/candidate builds, SEO, exact 31-file English HTML parity, changed-path review, generated/source no-publication checks, digest reproduction, and independent verification.

## Acceptance criteria

1. Typed Spanish Services source reproduces SHA-256 `8d2cd90a9f164f7a0c1f10b110ec32e1e925a63bf244d6de4fbbf52d1b5caadf` exactly.
2. Every canonical `ServiceId` has exactly one localized `{ displayName, summary }` record in approved order, with no localized slug, route, image, or canonical fact.
3. The required disclosure appears before the first image or button navigation to English service details.
4. Spanish Services structurally omits the full area teaser and discount banner without placeholder or invented promotional copy.
5. English Services metadata, visible content, service order, destinations, media, teaser, discount banner, and JSON-LD remain equivalent.
6. No Spanish route, alternate, sitemap entry, JSON-LD route, manifest, internal link, or build output is published.

## Required checks

- Approved Services canonicalization and SHA-256 reproduction
- `node scripts/verify-localization-source.mjs --self-test`
- Astro check with the existing installed toolchain only
- Production build plus `node scripts/verify-seo-output.mjs`
- Confirm empty Spanish publication registry and absent `/es/` source/output
- English `/services/` semantic output and schema parity against `cd4908612131630fbf253310106b6b29492f46cf`
- `git diff --check` and exact changed-path inventory against the baseline
- Independent verification and native review before any authorized delivery

## Progress and evidence

- 2026-09-19: fetched `origin/main` through a one-off HTTPS rewrite without changing repository remote configuration.
- 2026-09-19: confirmed merged WU-8B commit `cd4908612131630fbf253310106b6b29492f46cf` is exactly `origin/main`.
- 2026-09-19: created clean isolated worktree `/home/oscar/code/duartes-auto-detailing-wu8c` on `feat/spanish-localization-services-promotion`.
- 2026-09-19: recovered the exact approved Services block and digest from Engram and mapped current Services ownership, omissions, disclosure order, verifier gaps, and publication boundary.
- 2026-09-19: completed `ODD-WU8C-01`; added exact Spanish Services source, exhaustive typed card presentation, canonical English card derivation, and separate English-include/Spanish-omit discount policy.
- 2026-09-19: writer and independent verifier reproduced digest `8d2cd90a…`, passed scoped `git diff --check`, found no unrelated source paths, and found no apparent TypeScript excess-property or union-narrowing defect. Full Astro/build/SEO checks remain deferred to `ODD-WU8C-04`.
- 2026-09-19: native risk assessment was unavailable because the native command returned empty output, so the candidate was conservatively treated as high risk and independently verified.
- 2026-09-19: during `ODD-WU8C-02`, the writer found that the initial English card presentation used canonical taglines while baseline cards visibly used canonical descriptions. The owner selected preservation of descriptions and explicitly authorized the bounded `src/i18n/services-content.ts` correction.
- 2026-09-19: completed `ODD-WU8C-02`; English card text now remains canonical-name/description based, localized presentation flows through the grid/cards, one required disclosure precedes all detail links, and area teaser/discount banner omissions are structural.
- 2026-09-19: independent static verification passed scoped diff/order/ownership checks and found no likely Astro prop or narrowing defect. Astro execution was unavailable because this isolated worktree has no local executable; compiler-backed verification remains required in `ODD-WU8C-04`.
- 2026-09-19: the first `ODD-WU8C-03` verifier revision passed its own normal/self-test commands, but independent verification failed it for two missing deterministic assertions: explicit retirement of the stale blanket Spanish-content prohibition and uniqueness of the disclosure render site. Generated `dist/es/` absence remains intentionally assigned to post-build `ODD-WU8C-04`, not pre-build source verification.
- 2026-09-19: corrected `ODD-WU8C-03` within the verifier-only scope; the verifier now rejects the exact retired prohibition text, counts exactly one disclosure render site before the grid, and rejects any `ServiceCard` disclosure reference.
- 2026-09-19: independent re-verification passed normal/self-test execution and scoped diff checks. Residual source-text matching risk is accepted for this deterministic source verifier; generated output remains a post-build check.
- 2026-09-19: first full `ODD-WU8C-04` verification failed. Source verifier, diff check, exact nine-path inventory, 333 authored changed lines, and approved digest passed, but Astro found four candidate-caused optional `content.areaTeaser` errors in `ServicesComposition.astro`.
- 2026-09-19: baseline and candidate temporary builds both failed in shared tooling with `ClientRouter.astro: No cached compile metadata found`; therefore SEO, generated-output no-publication evidence, and 31-route HTML parity remained unverified. Temporary artifacts were removed and the real worktree retained only the expected nine WU-8C paths.
- 2026-09-19: incident diagnosis traced the shared failure condition to copied roots reusing one symlinked WU-6 dependency/cache topology; Astro's error was an in-memory virtual-style metadata-map miss, while stale absolute `.vite` paths remained a plausible but unproven contributor.
- 2026-09-19: second full verification used physical private dependency copies with `.vite` omitted. Both builds completed (30 Astro pages / 31 HTML files), SEO accepted 31 routes, the digest and all no-publication checks passed, and cleanup succeeded.
- 2026-09-19: `ODD-WU8C-04` still failed because the first narrowing correction assigned `ServicesContent | undefined` to a narrower asserted type, and `/services/index.html` gained one extra whitespace byte from the false disclosure conditional. Exactly one of 31 HTML files differed; no semantic content or route difference was reported.
- 2026-09-19: a second bounded component correction added a local helper that validates the include policy and teaser presence, and made the false disclosure conditional byte-neutral. The old deterministic banner-policy source pattern then rejected the semantically corrected component; the owner explicitly authorized a scoped verifier correction rather than deferring maintenance or reverting the component fix.
- 2026-09-19: the next full rerun failed because the helper correctly returned the teaser record itself but the template dereferenced `areaTeaserContent.areaTeaser.*`. Astro reported four property errors and candidate prerender failed on `/services`; baseline still built 30 pages/31 HTML files. Source verifier, exact nine-path inventory, 370-line budget, empty source publication boundary, and approved digest continued to pass.
- 2026-09-19: corrected the four direct teaser accesses and aligned the focused verifier. The following full run passed Astro (0 errors/warnings, 2 existing hints), both 30-page builds, SEO for 31 routes, digest, exact nine-path scope, 371-line budget, and every source/generated no-publication check.
- 2026-09-19: `ODD-WU8C-04` remains open solely because one of 31 HTML files, `services/index.html`, is still byte-different from baseline. All HTML inventories match and no other generated file differs; the exact remaining byte context required diagnosis before another component edit.
- 2026-09-19: byte-for-byte diagnosis proved the only difference is eight deleted ASCII spaces, one between each card summary `</p>` and detail button `<a>`. Moving disclosure out of `ServiceCard.astro` removed the former false-conditional expression boundary that emitted the second separator space. No markup, text, attribute, URL, or route byte differed.
- 2026-09-19: added one explicit Astro separator expression between each card summary and button. Final independent `ODD-WU8C-04` verification passed: source verifier normal/self-test, diff check, exact nine-path inventory, 374 authored changed lines, Astro 0 errors/0 warnings/2 existing hints, baseline and candidate 31 HTML files, SEO 31 routes, and zero byte differences across every English HTML file.
- 2026-09-19: final generated/source publication checks found zero `/es/` paths, `es-US` hreflang entries, internal `/es/` links, Spanish canonical/JSON-LD routes, or publication manifests; `publishedSpanishPageIds` remains empty. Independent Services digest reproduction passed. Temporary dependency/build copies were removed.
- 2026-09-19: native medium-tier review `review-44cd1c62d093ba92` approved the complete nine-path candidate and was acknowledged.
- 2026-09-19: owner authorized issue, commit, push, and PR delivery. Issue #63 was created from the repository feature form, verified by read-back, and explicitly received protected label `status:approved`: https://github.com/OscarGa8a/duartes-auto-detailing/issues/63.

## Rollback boundary

Revert only WU-8C typed Services source, omission-safe contracts, Services composition wiring, deterministic verification, and this task document. Do not alter WU-7 approval observations, WU-8A/B sources, canonical service records, route publication state, or unrelated content.

## Next step

Create the authorized conventional work-unit commit, push `feat/spanish-localization-services-promotion`, open the issue-linked PR with exactly `type:feature`, and do not merge or deploy.
