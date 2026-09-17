# Spanish localization shared Contact composition

## Objective

Extract the English Contact page into one typed, locale-ready Astro composition, correct the form's false delivery claim, encode the future Spanish map-omission policy, and publish no Spanish route or content.

## Problem and rationale

WU-1 through WU-4 established locale contracts, the shared shell, and shared Home/About compositions. The Contact route still assembles English-only sections directly and embeds presentation, channel, form, validation, status, map, and accessibility strings across components. Its form has no backend or delivery action but currently resets user data and claims “Message sent,” which is factually false.

## Scope

- Introduce one wrapper-free shared Contact composition in the current order: PageHero, ContactSection, conditional ServiceMap.
- Define narrow serializable Contact metadata, hero, section, channel-card, form, validation, truthful status, map-presentation, and accessibility content.
- Keep phone/email/social/contact destinations, service facts, media IDs, map coordinates/URLs, business identity, coverage, schema URLs, and relationships outside localized content.
- Keep existing mobile/desktop Instagram fallback behavior and selectors.
- Replace the false English sent-status with an explicit prepared/not-sent status; retain entered fields and direct users to real contact channels.
- Encode `en-US` map inclusion and future `es-US` whole-section omission so Spanish output cannot imply an address, branch, storefront, coordinates, or directions.
- Strengthen deterministic source verification for composition order, canonical destinations, truthful status, map policy, and no Spanish publication.

## Constraints

- Preserve all English structure, attributes, content, metadata, JSON-LD, scripts, links, CSS, keyboard behavior, selectors, reveal behavior, and form validation except the explicitly approved truthful status/reset correction.
- Do not add `src/pages/es/`, deployable Spanish content, approval/publication records, alternate links, Spanish build output, or claim-ledger entries.
- Localized content cannot redefine canonical destinations, identifiers, services, media, coordinates, coverage, or schema identity/relationships.
- Preserve shared component callers and do not redesign canonical contact data in this slice.
- Keep source near/below 400 authored changed lines. If no honest cohesive implementation fits, stop and report rather than compressing code or weakening checks.
- No commit, push, PR, merge, or deployment without explicit user authorization.

## Testing mode

TDD is not configured. Use source, Astro, build, SEO, semantic English-parity, focused form-runtime, no-Spanish, and scoped-diff checks. The immutable merged WU-4 commit `ab6cd556ad9bb40e0f2f9fe1afa628d1284c13bd` is the baseline. Parity excludes only the approved form status/reset correction and proven behavior-neutral Astro serialization variance.

## Tasks

- [x] **ODD-WU5-01 — Reconcile baseline and boundaries.** Confirmed PR #52 merged, created a clean WU-5 worktree, mapped Contact composition/runtime contracts, and resolved the truthful-status product decision.
- [x] **ODD-WU5-02 — Define typed Contact content and policies.** Added serializable English Contact contracts plus explicit locale map policy without storing canonical destinations/facts.
- [x] **ODD-WU5-03 — Extract the shared Contact composition.** Moved hero, contact section, and conditional map assembly behind one wrapper-free composition.
- [x] **ODD-WU5-04 — Parameterize interactions truthfully.** Typed channel/form/map presentation and validation strings, preserved destination/runtime selectors, and implemented prepared/not-sent status without clearing user data.
- [x] **ODD-WU5-05 — Verify parity, runtime behavior, publication boundary, and review budget.** All static/build/parity checks, actual-script VM runtime cases, no-Spanish boundary, source budget, independent verification, and native reliability review passed; real-browser integration remained environment-blocked and is reported.

## Acceptance criteria

1. `/contact/` renders through one wrapper-free composition and retains existing metadata and ContactPage schema relationships.
2. English output is semantically equivalent to `ab6cd55` except the approved truthful form status/reset behavior and documented Astro serialization variance.
3. Contact presentation, controls, validation, status, map copy, and accessibility strings are explicitly typed and serializable.
4. Valid form submission claims only preparation/non-delivery, preserves entered data, and directs the user to actual contact channels.
5. Phone/email/social destinations, map coordinates/URLs, media, service facts, coverage, and schema identity remain canonical and unchanged.
6. Future `es-US` policy omits the entire ServiceMap subtree; no Spanish route/content/claim/publication output is introduced.
7. The source slice remains within the honest review boundary or reports the smallest cohesive overage.

## Required checks

- `node scripts/verify-localization-source.mjs --self-test`
- `PUBLIC_CLOUDINARY_CLOUD_NAME=dkq4plo7s ./node_modules/.bin/astro check`
- Baseline and candidate Astro builds plus `node scripts/verify-seo-output.mjs`
- Semantic `/contact/` parity with approved status/reset exception
- Focused valid/invalid/honeypot form runtime checks and mobile/desktop contact-channel behavior
- No-Spanish output/content/alternate/claim-ledger scan
- `git diff --check` and scoped line count
- Independent verification and native review

## Progress and evidence

- 2026-09-17: PR #52 merged at `ab6cd55`; refreshed `origin/main` and created clean `/home/oscar/code/duartes-auto-detailing-wu5` on `feat/spanish-localization-contact`.
- 2026-09-17: mapping confirmed the current route order, form selectors/status flow, Instagram mobile fallback, canonical data sources, map subtree, and a 360–430 source-line estimate.
- 2026-09-17: user explicitly approved correcting the English false-delivery status, retaining entered values, and directing users to real contact channels.
- 2026-09-17: implemented typed English Contact content, explicit `en-US` include / future `es-US` omit map policy, wrapper-free composition, canonical channel/map boundaries, and truthful live form status in 320 authored source changed lines.
- 2026-09-17: writer source self-test, Astro check, and diff check passed; Astro reported only the two pre-existing unused-import hints.
- 2026-09-17: independent verification passed source self-test, Astro check, baseline/candidate 30-page builds, 31-route SEO verification, semantic Contact parity with the approved truthful-status exception, no-Spanish/claim-ledger boundary, diff check, and the 320-line source budget.
- 2026-09-17: installed browsers could not launch (`libnspr4.so` missing; WSL remote-debugging pipe rejected). A deterministic temporary VM harness transpiled and executed the actual ContactForm/ContactOptions scripts and passed invalid, clear-error, valid/value-retention, honeypot, desktop/mobile Instagram, fallback-timing, live-status, channel-attribute, and map-contract cases. Real browser-engine integration remains unavailable and is explicitly reported.
- 2026-09-17: native medium-tier reliability review approved and was acknowledged under lineage `review-0a1c893ab90cfd59`. Advisories `R3-misleading-prepared-status` and `R3-no-durable-form-runtime-proof` are informational; no correction transition was offered.

## Rollback boundary

Remove the WU-5 Contact composition/content files and restore only scoped Contact route/components, content types, and source-verifier edits to `ab6cd55`. No shell, canonical data, Spanish route/content, claim ledger, or unrelated files belong to this unit.

## Next step

Request explicit user authorization and resolve any final total review-workload boundary before commit, push, or PR. The source slice is 320 lines. The post-review checkbox/evidence update is passive tracking only; reviewed source is unchanged.
