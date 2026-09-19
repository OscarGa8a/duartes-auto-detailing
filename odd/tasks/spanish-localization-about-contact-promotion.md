# Spanish About and Contact content promotion

## Objective

Promote the exact owner-approved `es-US.about.v1` and `es-US.contact.v1` values into typed repository source, make Contact map omission structurally safe, and keep every Spanish route unpublished.

## Baseline and approved evidence

- Baseline: merged WU-8A commit `a632be7ef15871ed67b129cf97ec3f935c7c90bc`.
- About block: `es-US.about.v1`, SHA-256 `29dc14fa4af33cd95392115c82693bb7263e37464288862953c4e9e5a684c645`, Engram observation `1429`.
- Contact block: `es-US.contact.v1`, SHA-256 `0812252896e042a485682a2716c7e7792deb7dbf41f405cccb38fc2294ecafaf`, Engram observation `1431`.
- Handoff: observation `1438`, manifest SHA-256 `8cbde96c2f2f38d05454398df33251fe77b1739a408893ad97e8c2a2d8119910`.

## Scope

- Add typed source for the exact approved Spanish About and Contact presentation values.
- Preserve typed About template placeholders and runtime ownership of numeric metric values and formatting.
- Make Contact content a discriminated include/omit union so map content is required for English and forbidden for Spanish.
- Preserve runtime ownership of phone numbers, social handles, URLs, coordinates, media, schema relationships, and form behavior.
- Keep the truthful prepared-not-sent status and retained form values.
- Wire English About/Contact pages to explicit locale and logical page identity without changing output.
- Strengthen deterministic verification so promoted values reproduce approved digests and no Spanish publication occurs.

## Constraints

- Preserve exact approved values and array/metric order; any content change invalidates approval.
- Keep `publishedSpanishPageIds` empty and create no `src/pages/es/`, Spanish publication manifest, alternate, sitemap entry, JSON-LD route, internal `/es/` link, or generated `/es/` output.
- Do not promote Services content in this work unit.
- Spanish Contact omits the complete map/location subtree and cannot imply an address, branch, storefront, coordinates, directions, receipt, or delivery.
- English rendering, metadata, channel destinations, fallback behavior, validation, retained form values, map facts, and schema output must remain equivalent.
- No commit, push, PR, merge, or deployment without explicit user authorization.

## Testing mode

Use contract-first deterministic digest and omission checks, then Astro/type, production build/SEO, semantic baseline parity, and independent verification. Browser evidence may only use an already-installed approved executable; do not download one.

## Tasks

- [x] **ODD-WU8B-01 — Model exact About and Contact sources.** Added exact approved Spanish objects, preserved About metric templates, and bound both source objects to approved canonical digests.
- [x] **ODD-WU8B-02 — Make Contact map omission structurally safe.** Introduced an include/omit discriminated union, preserved English map content, and forbade Spanish map placeholders or location facts.
- [x] **ODD-WU8B-03 — Complete route identity and deterministic contracts.** Added explicit English About/Contact locale/page identity and verified metadata, runtime ownership, truthful form behavior, and no-publication boundaries.
- [x] **ODD-WU8B-04 — Verify parity and no publication.** Passed focused source checks, Astro/type checks, production build/SEO, baseline semantic parity, changed-path review, and independent verification; browser evidence was unavailable because no local browser executable is installed.

## Acceptance criteria

1. Typed Spanish About and Contact objects reproduce the two approved SHA-256 digests exactly.
2. About templates allow only typed runtime metric placeholders; numeric values and formatting remain canonical.
3. Contact `serviceMap: include` requires map content and `serviceMap: omit` forbids it.
4. Spanish Contact contains no map/location subtree; channel destinations and form behavior remain runtime-owned.
5. English About/Contact metadata, schema, content order, SMS/channel destinations, map facts, validation, status, and form retention remain equivalent.
6. No Spanish route, alternate, sitemap entry, JSON-LD route, manifest, internal link, or build output is published.
7. Services promotion remains outside this candidate.

## Required checks

- Approved About/Contact canonicalization and SHA-256 reproduction
- `node scripts/verify-localization-source.mjs --self-test`
- Astro check with the existing installed toolchain only
- Production build plus `node scripts/verify-seo-output.mjs`
- Confirm empty Spanish publication registry and absent `/es/` source/output
- English About/Contact semantic output and runtime-behavior parity
- `git diff --check` and exact changed-path inventory against `a632be7`
- Independent verification and native review before delivery

## Progress and evidence

- 2026-09-18: PR #60 merged as `a632be7`, completing WU-8A exact shell/Home promotion and preserving zero Spanish publication.
- 2026-09-18: recovered exact approved About/Contact values and frozen WU-8 handoff from Engram.
- 2026-09-18: mapped About template/runtime ownership and Contact map/channel/form boundaries; no unresolved product decision remains.
- 2026-09-18: added exact typed Spanish About/Contact sources; actual source objects reproduce approved digests `29dc14fa…` and `08122528…`.
- 2026-09-18: Contact now uses an omission-safe map union; English map content is unchanged and Spanish contains no map, URL, handle, phone, or coordinate facts.
- 2026-09-18: independent task-1/2 verification passed, including exact template metric order, channel order, truthful prepared-not-sent status, and unchanged English source values.
- 2026-09-18: About/Contact pages now pass explicit English locale and logical page identity, and JSON-LD paths resolve from the canonical route registry.
- 2026-09-18: Contact JSON-LD consumes typed schema fields with unchanged English values; independent task-3 verification passed with no component/runtime scope drift.
- 2026-09-18: Astro initially exposed optional-map typing at `ServiceMap` and `ContactComposition`; explicit `ContactMapContent` props plus a local `hasServiceMap` guard resolved both errors without output changes.
- 2026-09-18: final verification passed with 0 Astro errors/warnings, 30 pages built, 31 generated HTML routes accepted by SEO, and zero semantic differences against the merged WU-8A baseline.
- 2026-09-18: no Spanish page, manifest, alternate, sitemap entry, internal link, JSON-LD route, or build output exists; browser evidence was skipped because no approved local executable is installed.
- 2026-09-18: candidate review size is 313 lines across ten paths, below the 400-line single-PR threshold.

## Rollback boundary

Revert only WU-8B About/Contact typed source, omission-safe contracts, route identity wiring, deterministic verification, and this task document. Do not alter WU-7 approval observations, WU-8A sources, or WU-8C Services content.

## Next step

Run native review, persist final evidence, and request explicit delivery authorization before commit, push, or PR creation.
