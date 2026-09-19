# Spanish shell and Home content promotion

## Objective

Promote the exact owner-approved `es-US.shell.v1` and `es-US.home.v1` values into typed repository source, complete the shared shell and Home localization contracts, and keep every Spanish route unpublished.

## Baseline and approved evidence

- Baseline: merged WU-7 commit `14874deeba2f0776d35d0bd566d68cc90c6d0f14`.
- Shell block: `es-US.shell.v1`, SHA-256 `702d3c0059d1ef3e048b1064050209ddb7c77b59cf55a821a3369cbf1058ae25`, Engram observation `1422`.
- Home block: `es-US.home.v1`, SHA-256 `6c259ed9ecb79022dd778d8fad74ec6d287a9b02e084664ec2a2de8e732b4b2d`, Engram observation `1427`.
- Handoff: observation `1438`, manifest SHA-256 `8cbde96c2f2f38d05454398df33251fe77b1739a408893ad97e8c2a2d8119910`.

## Scope

- Add typed source for the exact approved Spanish shell and Home presentation values.
- Extend shell types for navigation identity, language-control text, menu text, footer labels, and social accessible names.
- Resolve navigation and CTA destinations from canonical route identity rather than localized draft-owned URLs.
- Extend the Home metadata boundary and section policy to support whole testimonial and discount-banner omission.
- Preserve runtime ownership of business identity, URLs, contact destinations, media, schema relationships, and numeric metrics.
- Strengthen deterministic verification so promoted values reproduce the approved digests.

## Constraints

- Preserve the exact approved values and array order; any content change invalidates approval.
- Keep `publishedSpanishPageIds` empty and create no `src/pages/es/`, Spanish publication manifest, alternate, sitemap entry, JSON-LD route, or generated `/es/` output.
- Do not promote About, Contact, or Services content in this work unit.
- Preserve English rendering, metadata, navigation, accessibility behavior, and route output.
- Spanish Home omits the complete testimonials and discount-banner subtrees.
- No commit, push, PR, merge, or deployment without explicit user authorization.

## Testing mode

Use contract-first implementation with focused deterministic source checks before full Astro/build/SEO verification. Browser evidence proves unchanged English shell/Home behavior and absence of Spanish navigation; it does not simulate an unpublished Spanish route.

## Tasks

- [x] **ODD-WU8A-01 — Model approved shell and Home sources.** Extended omission-aware typed content/metadata/policy contracts, added exact Spanish source values, and bound both objects to their approved canonical digests.
- [x] **ODD-WU8A-02 — Complete shared shell localization wiring.** Passed locale-derived typed shell content through the layout, Navbar, and Footer; all destinations resolve from canonical route identity and English behavior remains source-equivalent.
- [x] **ODD-WU8A-03 — Complete Home policy and destination wiring.** Wired metadata, whole-subtree testimonial/discount omission, locale-aware canonical CTAs, runtime-owned metrics, and the approved Spanish-card catalog destination policy.
- [x] **ODD-WU8A-04 — Verify parity and no publication.** Passed focused contracts, Astro/type checks, production build/SEO, exact baseline-output parity, changed-path review, and independent verification; browser evidence was unavailable because no local browser executable is installed.

## Acceptance criteria

1. Typed Spanish shell and Home source objects reproduce the two owner-approved SHA-256 digests exactly.
2. Shell visible and accessible strings are content-driven, while destinations remain canonical route-owned facts.
3. Home metadata is typed; Spanish testimonials and discount banner are omitted as complete subtrees.
4. Home metric values, formatting, media, business facts, contact destinations, and schema relationships remain runtime-owned.
5. Existing English output remains equivalent except for implementation-only source wiring.
6. No Spanish route, alternate, sitemap entry, JSON-LD page, manifest, or build output is published.
7. WU-8B/C content and contracts remain outside this candidate except unavoidable backward-compatible shared typing.

## Required checks

- Approved block canonicalization and SHA-256 reproduction
- `node scripts/verify-localization-source.mjs --self-test`
- Astro/type check using the repository's existing installed toolchain only
- Production build and `scripts/verify-seo-output.mjs` using the existing installed toolchain only
- Confirm empty Spanish publication registry and absence of `/es/` source/output
- English shell/Home structural and accessibility parity
- `git diff --check` and exact changed-path inventory against `14874de`
- Independent verification before delivery

## Progress and evidence

- 2026-09-18: PR #58 merged as `14874de`, completing WU-7 exact content approval and unlocking WU-8A.
- 2026-09-18: recovered approved Shell/Home values and the frozen WU-8 handoff from Engram.
- 2026-09-18: mapped shell/Home type, component, route, approval, and verification gaps; publication registry remains empty.
- 2026-09-18: added typed English/Spanish shell sources and omission-aware Home sources; exact Spanish digests reproduce `702d3c00…` and `6c259ed9…` from the actual TypeScript objects.
- 2026-09-18: independent task-1 verification passed after confirming English metadata literals and schema facts remain unchanged.
- 2026-09-18: wired locale-derived shell content through BaseLayout, Navbar, and Footer; route-owned destination resolution preserves the English-only Bay Area footer URL and publication-gates language switches.
- 2026-09-18: independent shell verification passed at source level, including both mobile close controls, canonical social destinations, href-free localized content, and the empty publication registry.
- 2026-09-18: owner selected the future Spanish Services catalog as the destination for Spanish Home featured cards, avoiding an undisclosed transition to English detail pages without changing approved copy.
- 2026-09-18: Home metadata, omission guards, and locale-aware destinations are wired; independent task-3 verification passed with English detail links preserved and no Spanish publication.
- 2026-09-18: full verification passed with 0 Astro errors/warnings, 30 Astro pages built, 31 generated HTML routes accepted by the SEO verifier, and no Spanish page, manifest, alternate, sitemap entry, internal link, or build output.
- 2026-09-18: semantic comparison against the pre-WU8A build found identical route sets, visible text, metadata, canonicals, JSON-LD, Home section order, and runtime metric markup; only intentional trailing-slash normalization and the footer social-list accessible label changed.
- 2026-09-18: browser evidence was skipped because project-local `playwright-core@1.63.0` has no installed browser executable; no browser was downloaded.
- 2026-09-18: the candidate totals 482 review lines including 153 lines of ODD/new-source documentation, so delivery requires a chained-PR strategy or explicit `size:exception` before commit/PR creation.

## Rollback boundary

Revert only WU-8A typed source, shell/Home wiring, deterministic verification, and this task document. Do not alter WU-7 approval observations or unrelated WU-8B/C content.

## Next step

Choose the review-load delivery strategy, then run native review on each resulting commit/PR slice before any push or PR creation.
