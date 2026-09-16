# Spanish localization shared home composition

## Objective

Extract the English home page into one typed, locale-ready Astro composition while preserving the generated English output exactly, encoding the approved Spanish testimonial-omission policy, and publishing no Spanish route or content.

## Problem and rationale

WU-1 established locale/content contracts and WU-2 prepared the shared shell and SEO publication boundary. The home page still assembles English-only sections directly in `src/pages/index.astro`, while several interaction and accessibility strings remain embedded in section components. WU-3 creates the shared page boundary needed by later approved Spanish content without changing what the current English route renders.

## Scope

- Introduce a shared home composition with the current section order and no wrapper markup.
- Define narrow typed home content and interaction/accessibility contracts.
- Move current English presentation strings into one typed English home bundle where required for shared rendering.
- Gate the entire testimonials section through an explicit policy; the future Spanish bundle must omit it.
- Reuse existing locale, route, shell, canonical business data, media data, services, social links, selectors, and client scripts.
- Strengthen deterministic source verification for the shared-composition and unpublished-Spanish boundaries when practical within the slice.

## Constraints

- Preserve exact English visible content, DOM order, IDs, classes, data attributes, media behavior, canonical metadata, JSON-LD, sitemap, and `llms.txt`.
- Do not add `src/pages/es/`, deployable Spanish content, publication records, alternates, or links to unpublished Spanish URLs.
- Do not translate, alter, or synthesize testimonials.
- Preserve unrelated staged/untracked files in the original worktree, including `scripts/*:Zone.Identifier`, `docs/PLAYBOOK.md*`, and `pnpm-workspace.yaml`.
- Keep the source candidate below 400 changed lines without code-golf or omitted verification.
- No commit, push, PR, merge, or deployment without explicit user authorization.

## Testing mode

TDD is not configured for this ODD task. Use the repository's deterministic source, Astro, build, SEO, English-parity, and scoped-diff checks. The immutable merged WU-2 commit `62bc67acd5676cc0824d6361005689ed43d448b5` is the English baseline. English parity means identical parsed structure, attributes, visible text, metadata, JSON-LD, scripts, links, and CSS payloads; documented Astro-only whitespace and head-asset placement differences caused by the shared component boundary are allowed only when they are proven behavior-neutral.

## Tasks

- [x] **ODD-WU3-01 — Isolate and map the work unit.** Created `feat/spanish-localization-home` in a clean worktree at merged WU-2 and mapped the smallest shared-home boundary without touching the original dirty worktree.
- [x] **ODD-WU3-02 — Define typed home content and policy.** Added narrow contracts and one exact English bundle for home presentation, interactions, gallery/carousel accessibility labels, and testimonial visibility.
- [x] **ODD-WU3-03 — Extract the shared home composition.** Moved section assembly behind one wrapper-free composition while preserving exact English section order and behavior.
- [x] **ODD-WU3-04 — Parameterize bounded home sections.** Replaced relevant embedded English presentation strings with typed props without changing selectors, media, canonical facts, or client behavior; retained the services page's no-prop discount-banner caller through an English fallback.
- [x] **ODD-WU3-05 — Verify parity, publication boundary, and review budget.** All required checks, semantic English baseline parity, no-Spanish boundary, line budget, independent verification, and native reliability review passed.

## Acceptance criteria

1. `src/pages/index.astro` renders the home through one shared composition and retains its existing `BaseLayout` metadata and structured data.
2. Generated English home output has identical parsed structure, attributes, visible text, metadata, JSON-LD, scripts, links, and CSS payloads to commit `62bc67a`; any raw-byte difference is limited to documented behavior-neutral Astro whitespace or head-asset placement caused by the shared component boundary.
3. Home interaction and accessibility strings needed by a future locale bundle are explicitly typed rather than inferred from locale globals.
4. Testimonial inclusion is an explicit home-content policy; the future Spanish policy is omission of the whole section, not an empty carousel.
5. No Spanish route, content bundle, publication record, alternate link, or build output is introduced.
6. The scoped source candidate remains below 400 changed lines.

## Required checks

- `pnpm run verify:i18n-source -- --self-test`
- `pnpm run check`
- `pnpm run test:seo`
- Built English home parity against commit `62bc67a`
- `git diff --check`
- Scoped changed-line count against `62bc67a`
- Independent verification and native review according to repository policy

## Progress and evidence

- 2026-09-16: Engram context confirmed WU-1 and WU-2 are complete and WU-3 is the next ordered slice.
- 2026-09-16: read-only exploration identified a wrapper-free shared composition, narrow typed strings, whole-section testimonial omission, and exact selector/media preservation as the safe boundary.
- 2026-09-16: created clean worktree `/home/oscar/code/duartes-auto-detailing-wu3` on branch `feat/spanish-localization-home` from merged commit `62bc67a`; the original worktree and its unrelated staged/untracked files remain untouched.
- 2026-09-16: implemented the typed English home bundle, explicit `en-US` include / future `es-US` omit testimonial policy, wrapper-free shared composition, bounded section props, legacy discount-banner fallback, and source assertions in 247 authored changed lines.
- 2026-09-16: source self-test, Astro check, both baseline/candidate builds, SEO verification, diff check, no-Spanish boundary, and 400-line budget passed.
- 2026-09-16: independent semantic parity verification passed. Home structure, normalized attributes, visible text, metadata, parsed JSON-LD, scripts, links, and CSS payloads match the `62bc67a` baseline. Astro-only raw differences are documented stylesheet-link placement and collapsed expression-source whitespace; the external and inline CSS bytes match and have no direct selector/keyframe conflict. All 103 non-home generated paths match; `/services/` has the same allowed serialization variance and identical parsed behavior.
- 2026-09-16: native medium-tier reliability review approved and was acknowledged under lineage `review-9bb3eba460803190`. Its only advisory is non-blocking follow-up `R3-gallery-label-cardinality` at `src/i18n/content-types.ts:61`; the approved review offers no correction transition.

## Rollback boundary

Remove the WU-3 shared home composition/content files and restore only the scoped home page/components, content types, and verifier edits to `62bc67a`. No shell, route publication, canonical business data, or unrelated working-tree files belong to this unit.

## Next step

Request explicit user authorization before any commit, push, PR, merge, or deployment. The post-review checkbox/evidence update is passive tracking only; the reviewed source candidate is unchanged.
