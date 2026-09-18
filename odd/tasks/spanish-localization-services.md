# Spanish localization shared Services composition

## Objective

Extract the English Services index into one typed, locale-ready Astro composition, introduce stable service identity, encode future Spanish disclosure and area-teaser policies, and publish no Spanish route or content.

## Problem and rationale

WU-1 through WU-5 established locale contracts, the shared shell, and shared Home, About, and Contact compositions. The Services index still assembles English-only sections directly, identifies services through route slugs, mixes localized card presentation with canonical service facts/media, and has no enforceable policy for linking future Spanish cards to English-only detail pages or omitting the English Bay Area teaser.

## Scope

- Introduce a stable locale-independent `ServiceId` on every canonical service record while retaining `slug` as the English route segment.
- Define narrow serializable Services metadata, hero, intro, grid, card-presentation, area-teaser, and disclosure content.
- Keep service order, slugs, URLs, media, images, inclusions, relationships, and structured-data facts canonical.
- Extract one wrapper-free shared Services composition in the current order: PageHero, ServicesSection, conditional area teaser, DiscountBanner.
- Resolve card media and English detail destinations exclusively from canonical service records.
- Encode required future `es-US` English-detail disclosure and whole area-teaser omission without drafting Spanish wording.
- Strengthen deterministic source/output verification for canonical card sources, ItemList contents, detail-link order, English parity, and the unpublished-Spanish boundary.

## Constraints

- Preserve all English structure, attributes, visible copy, metadata, JSON-LD, links, media, CSS, accessibility, reveal behavior, and route output.
- Do not add `src/pages/es/`, deployable Spanish wording/content, approval/publication records, alternate links, Spanish build output, or claim-ledger entries.
- Localized content cannot redefine canonical service identity, order, slug, URL, media, inclusions, relationships, prices, or structured-data facts.
- Spanish disclosure wording and localized card names/summaries belong to WU-7 approval; WU-6 defines only their typed slots and required policy.
- Keep source near 320–390 authored changed lines when honest. The 400-line planning heuristic must not cause compressed code, omitted tests, or artificial splits.
- Preserve unrelated files and worktrees. No commit, push, PR, merge, or deployment without explicit user authorization.

## Testing mode

TDD is not configured. Use ordinary source, Astro, build, SEO, semantic English-parity, no-Spanish, and scoped-diff checks. The immutable merged WU-5 commit `48d449c2eec9e6c969f63522d7d6e3062e9c8923` is the baseline.

## Tasks

- [x] **ODD-WU6-01 — Reconcile baseline and Services boundaries.** Confirmed PR #54 merged at `48d449c`, created a clean WU-6 worktree, and mapped the Services route, canonical data, cards, ItemList schema, localization boundaries, and required policies.
- [x] **ODD-WU6-02 — Define stable identity and typed presentation.** Added exhaustive `ServiceId` identity and serializable Services/card presentation contracts that reject canonical fact overrides.
- [x] **ODD-WU6-03 — Extract the shared Services composition.** Moved hero, catalog/grid, conditional area teaser, and discount assembly behind one wrapper-free composition while preserving English order and output.
- [x] **ODD-WU6-04 — Wire cards to canonical service data.** Service order, media, accessible English detail URLs, and ItemList facts continue to resolve from canonical records; localized content owns presentation only.
- [x] **ODD-WU6-05 — Verify parity and publication boundaries.** Source/output assertions now enforce identity, canonical sources, ItemList/link order, future Spanish disclosure/omission policy, English semantic parity, no Spanish publication, and review budget.

## Acceptance criteria

1. `/services/` renders through one wrapper-free shared composition and retains current metadata and ItemList schema.
2. Every canonical service has one unique stable `ServiceId`; English slugs and all existing detail routes remain unchanged.
3. Card presentation is exhaustive by `ServiceId` and cannot redefine canonical order, media, slug, URL, inclusions, relationships, or schema facts.
4. Future `es-US` policy requires disclosure before navigation to English-only detail pages and omits the entire area-teaser subtree.
5. English output remains semantically equivalent to `48d449c`, including section/card order, accessible links, Bay Area teaser, and discount banner.
6. Built `/services/` ItemList names, positions, URLs, and card links exactly match canonical services in source order.
7. No Spanish route, wording, content, approval, claim, alternate, metadata, sitemap entry, or build output is introduced.

## Required checks

- `node scripts/verify-localization-source.mjs --self-test`
- `PUBLIC_CLOUDINARY_CLOUD_NAME=dkq4plo7s ./node_modules/.bin/astro check`
- Baseline and candidate Astro builds plus `node scripts/verify-seo-output.mjs`
- Semantic `/services/` parity against `48d449c`
- No-Spanish output/content/alternate/claim-ledger scan
- `git diff --check` and scoped authored/total changed-line counts
- Independent verification when required by native risk assessment and native review when available

## Progress and evidence

- 2026-09-17: refreshed `origin/main` over HTTPS to merged WU-5 commit `48d449c` after the configured SSH remote failed for lack of a local key.
- 2026-09-17: created clean `/home/oscar/code/duartes-auto-detailing-wu6` on `feat/spanish-localization-services` from `origin/main`.
- 2026-09-17: read-only mapping confirmed canonical services drive cards, detail routes, and ItemList; current cards construct URLs from slugs; the page directly mixes composition and area-teaser markup; existing verifiers reject Spanish publication but do not prove exact ItemList contents or card-link order.
- 2026-09-17: no WU-6 wording decision is required. Spanish display names, summaries, and disclosure wording remain deferred to WU-7; WU-6 provides typed slots and fail-closed policies only.
- 2026-09-17: implemented stable IDs, typed Services presentation, explicit locale policies, wrapper-free composition, canonical card wiring, fail-closed English-detail disclosure, and exact source/output assertions in 362 scoped source changed lines before the final one-line type hardening.
- 2026-09-17: corrected two parity-verifier defects discovered during deterministic builds: canonical ItemList URLs omit trailing slashes, while each baseline card intentionally exposes image-first and Button-second links to the same English detail route.
- 2026-09-17: source self-tests, Astro check, direct candidate build, SEO output verification across 31 generated HTML routes, diff check, no-Spanish checks, and immutable-baseline semantic `/services/` parity passed. The configured `pnpm` wrapper could not run because its local ignored-build policy generated an unauthorized placeholder; the direct project Astro runner passed without installation or config mutation, and the placeholder was removed with explicit user authorization.
- 2026-09-17: independent verification proved normalized baseline/candidate Services HTML equivalence except a behavior-neutral generated CSS hash/rule difference, then identified and closed the exact-empty-object typing gap by replacing `Record<never, never>` with `Record<string, never>`.

## Rollback boundary

Remove the WU-6 Services composition/content additions and restore only scoped Services route/components, service identity/type, and verifier edits to `48d449c`. No shell, detail-route behavior, unrelated canonical business data, Spanish route/content, approval ledger, claim ledger, or unrelated worktree files belong to this unit.

## Next step

Complete native review and final persistence, then request explicit delivery authorization before any commit, push, or PR.
