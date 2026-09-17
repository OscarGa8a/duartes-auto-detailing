# Spanish localization shared About composition

## Objective

Extract the English About page into one typed, locale-ready Astro composition while preserving English behavior, keeping schema and numeric claims bound to canonical facts, and publishing no Spanish route or content.

## Problem and rationale

WU-1 established locale/content contracts, WU-2 prepared the shared shell/SEO boundary, and WU-3 established the first shared page composition. The About route still assembles English-only sections directly and embeds presentation, CTA, SMS, image-alt, and counter-label strings across the route and section components. WU-4 creates the next shared-page boundary without changing canonical business identity, contact data, media, metrics, or claims.

## Scope

- Introduce one wrapper-free shared About composition with the current section order.
- Define narrow, serializable typed About metadata, hero, section, image-alt, counter-label, CTA, and SMS-message content.
- Keep `yearsOfExperience`, `vehiclesDetailed`, `bayAreaLocations`, `phoneUSE164`, media IDs, and schema identity/relationship facts in existing canonical sources.
- Resolve typed metric placeholders from `src/data/config.ts` rather than storing mutable numeric facts in localized content.
- Keep `PageHero` and `CTABanner` interfaces unchanged and pass their existing props from the composition.
- Keep `getPageJsonLd` as the canonical schema identity boundary; pass it locale-facing name/description derived from typed content plus canonical facts.
- Strengthen deterministic source verification for shared About composition, canonical SMS destination, metric interpolation, and the unpublished-Spanish boundary.

## Constraints

- Preserve parsed English structure, attributes, visible text, metadata, JSON-LD, scripts, links, CSS behavior, section order, selectors, reveal/counter attributes, and media behavior.
- Do not add `src/pages/es/`, deployable Spanish content, approval/publication records, alternate links, or Spanish build output.
- Do not change `localization/es-US/claim-ledger.md`; WU-4 introduces no Spanish wording or claims.
- Do not let localized content redefine phone/contact data, business identity, service coverage, metrics, media IDs, schema URLs, or schema relationships.
- Preserve other `PageHero`, `CTABanner`, and `getPageJsonLd` callers.
- Keep the source candidate below 400 authored additions plus deletions without code-golf or omitted verification.
- No commit, push, PR, merge, or deployment without explicit user authorization.

## Testing mode

TDD is not configured for this ODD task. Use deterministic source, Astro, build, SEO, semantic English-parity, no-Spanish, and scoped-diff checks. The immutable merged WU-3 commit `6374136b061b29d2faa3bc0aba64b21f3256a17c` is the English baseline. Parity permits only proven behavior-neutral Astro serialization differences caused by the shared component boundary.

## Tasks

- [x] **ODD-WU4-01 — Reconcile merged baseline and boundaries.** Confirmed PR #50 merged at `6374136`, created a clean WU-4 worktree, loaded historical requirements, inspected canonical claim sources, and mapped the bounded About composition.
- [x] **ODD-WU4-02 — Define typed About content and canonical interpolation.** Added serializable English About content contracts and deterministic metric placeholders resolved only from canonical configuration.
- [x] **ODD-WU4-03 — Extract the shared About composition.** Moved PageHero, About sections, and CTA assembly behind one wrapper-free composition while preserving order and shared UI interfaces.
- [x] **ODD-WU4-04 — Parameterize About presentation safely.** Replaced embedded presentation, image-alt, counter-label, CTA, and SMS-message strings with typed props while preserving canonical media, phone, metrics, schema identity, selectors, and behavior.
- [x] **ODD-WU4-05 — Verify parity, publication boundary, and review budget.** All required checks, semantic English baseline parity, no-Spanish/claim-ledger boundary, source budget, independent verification, and native reliability review passed.

## Acceptance criteria

1. `src/pages/about.astro` renders through one shared wrapper-free About composition and retains the existing route, canonical metadata, and AboutPage schema relationships.
2. Generated English About output has identical parsed structure, attributes, visible text, metadata, JSON-LD, scripts, links, and CSS behavior to commit `6374136`, allowing only documented behavior-neutral Astro serialization variance.
3. About metadata, hero, sections, image alts, metric labels, CTA, and SMS message are explicitly typed and serializable.
4. Numeric claims and SMS destination are always derived from `src/data/config.ts`; localized content cannot redefine them.
5. Business identity, schema IDs/relationships, media IDs, and other shared-component callers remain unchanged.
6. No Spanish route, content, claim-ledger entry, publication record, alternate link, or build output is introduced.
7. The scoped source candidate remains below 400 authored changed lines.

## Required checks

- `node scripts/verify-localization-source.mjs --self-test`
- `PUBLIC_CLOUDINARY_CLOUD_NAME=dkq4plo7s ./node_modules/.bin/astro check`
- Baseline and candidate Astro builds with `PUBLIC_CLOUDINARY_CLOUD_NAME=dkq4plo7s`
- `node scripts/verify-seo-output.mjs`
- Semantic `/about/` parity against commit `6374136`
- No-Spanish output/content/alternate scan
- `git diff --check`
- Scoped authored changed-line count against `6374136`
- Independent verification and native review according to repository policy

## Progress and evidence

- 2026-09-16: confirmed PR #50 merged into `main` at `6374136`; refreshed `origin/main` without touching the original unrelated staged/untracked files.
- 2026-09-16: created clean worktree `/home/oscar/code/duartes-auto-detailing-wu4` on branch `feat/spanish-localization-about` from the merged commit.
- 2026-09-16: read-only mapping confirmed `PageHero` and `CTABanner` already expose sufficient props, `getPageJsonLd` already owns schema identity relationships, existing `/about/` SEO assertions cover emitted schema, and the empty Spanish claim ledger must remain unchanged.
- 2026-09-16: implemented typed serializable About content, fail-fast canonical metric interpolation, explicit localized social image alt, wrapper-free shared composition, canonical SMS destination, and parameterized About sections in 327 authored source changed lines.
- 2026-09-16: writer source self-test, Astro check, and diff check passed; Astro reported only the two pre-existing unused-import hints.
- 2026-09-16: independent verification passed source self-test, Astro check, baseline/candidate 30-page builds, 31-route SEO verification, diff check, no-Spanish/claim-ledger boundary, and the 327-line source budget.
- 2026-09-16: semantic `/about/` parity passed. Ordered structure, normalized attributes, visible text, metadata, parsed JSON-LD, scripts, links, inline styles, and linked CSS payload match `6374136`; the only generated-file hash difference is `/about/index.html`, limited to behavior-neutral Astro whitespace and apostrophe-entity serialization.
- 2026-09-16: native medium-tier reliability review approved and was acknowledged under lineage `review-f7336525b5e44074`. Its only advisory is non-blocking follow-up `R3-template-validation` at `src/i18n/about-content.ts:10-14`; the approved review offers no correction transition.

## Rollback boundary

Remove the WU-4 About composition/content files and restore only the scoped About route/components, content types, and source-verifier edits to `6374136`. No shell, route publication, canonical business/config data, shared UI interface, claim ledger, or unrelated working-tree files belong to this unit.

## Next step

Request explicit user authorization and resolve the total review-workload boundary before any commit, push, PR, merge, or deployment. The source slice is 327 lines; native review counted 408 lines including this tracking document. The post-review checkbox/evidence update is passive tracking only; the reviewed source candidate is unchanged.
