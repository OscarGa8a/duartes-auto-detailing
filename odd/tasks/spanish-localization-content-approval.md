# Spanish localization content review and approval

## Objective

Draft, review, and explicitly approve the exact US Spanish presentation blocks for the Phase 1 shell, Home, About, Contact, and Services pages without adding deployable Spanish source, changing publication state, or emitting any `/es/` route.

## Problem and rationale

WU-1 through WU-6 established localization contracts and shared page compositions while preserving English output. Spanish wording still cannot be promoted safely: every visible and machine-readable block needs exact owner approval, consequential local claims need evidence and allowed wording, unsupported English claims must not be translated, and incomplete content must remain outside deployable source.

## Scope

- Store WU-7 drafts, review history, exact canonical JSON values, SHA-256 digests, claim records, and approval state in Engram only.
- Review five bounded batches: shared shell/controls, Home, About, Contact, and Services.
- Include metadata, visible copy, control/a11y strings, image alternatives, form validation/status/prefilled messages, service names/summaries, and the English-detail disclosure.
- Preserve business identity, contact destinations, service/media facts, route slugs, IDs, canonical numeric values, and schema relationships outside draft-owned content.
- Record supported wording and exclusions for every consequential claim.
- Prepare an exact WU-8 handoff containing only fully approved blocks and digests.

## Constraints

- Use neutral, natural US Spanish; avoid regionalisms and literal translations that sound unnatural.
- Publish no route, source content bundle, manifest entry, alternate metadata, sitemap entry, JSON-LD, or Spanish output in WU-7.
- Do not edit `localization/es-US/approval-ledger.json` or `localization/es-US/claim-ledger.md`; those repository files are transitional and are not the post-migration review store.
- Spanish Home omits the full testimonials subtree and, by explicit owner decision, the full unsupported discount banner.
- Spanish Contact omits the complete map/location subtree and cannot imply an address, branch, storefront, coordinates, or directions.
- Spanish Services omits the area teaser and must disclose before navigation that service details open in English.
- The contact form status must state that the message was prepared but not sent; never claim receipt or delivery.
- Do not translate unsupported promotions, rankings, guarantees, reviews, prices, staff, proximity, or availability claims.
- No commit, push, PR, merge, or deployment without explicit user authorization.

## Testing mode

TDD is not configured because WU-7 creates review records rather than runtime behavior. Use deterministic canonical JSON/digest checks, claim-source review, exact user approval, repository no-publication verification, and scoped diff checks. Baseline is merged WU-6 commit `01d33fbd8f9fb75bd9ebf34b25b8743510247d43`.

## Tasks

- [x] **ODD-WU7-01 — Reconcile baseline, storage, and publication boundaries.** Confirmed WU-6 merged, created an isolated WU-7 worktree, mapped all reviewable fields and canonical exclusions, and resolved that only this ODD document changes in the repository.
- [x] **ODD-WU7-02 — Establish the claim ledger.** Stored 17 evidence-backed claim records, allowed Spanish wording, affected surfaces, and explicit unsupported exclusions in Engram.
- [x] **ODD-WU7-03 — Draft shell, Home, About, and Contact batches.** Produced exact canonical JSON with omission policies and received direct owner approval for all four digests.
- [x] **ODD-WU7-04 — Draft the Services batch.** Approved exact presentation for all eight stable `ServiceId` records plus the English-detail disclosure and area-teaser omission.
- [x] **ODD-WU7-05 — Freeze approvals and prepare WU-8 handoff.** Canonicalized all five approved blocks, recorded approval lineage, froze the staged route/slice manifest, and documented required WU-8 contract work.

## Acceptance criteria

1. Every required Phase 1 Spanish presentation field belongs to one stable review block with exact JSON and a deterministic digest.
2. Every consequential claim has canonical evidence, status, surfaces, allowed wording, and prohibited implications.
3. Every approved block has an explicit owner decision bound to its exact value and digest; revisions invalidate prior approval.
4. Home omits testimonials and the discount banner; Contact omits the map/location subtree; Services omits the area teaser and includes an approved English-detail disclosure.
5. No repository file besides this task document changes, and no Spanish route/content/output is published.
6. WU-8 receives only approved exact values/digests and a documented gap for the Services typed card-presentation promotion.

## Required checks

- Canonical key-sorted compact JSON and SHA-256 digest reproduction for every approved block
- Claim-ledger source/status/allowed-wording review
- `node scripts/verify-localization-source.mjs --self-test`
- Confirm no `src/pages/es/`, deployable Spanish content, publication records, route alternates, or Spanish build output
- `git diff --check` and exact changed-path inventory against `01d33fb`
- Independent review of approval integrity and factuality before delivery

## Progress and evidence

- 2026-09-18: PR #56 merged as `01d33fb`, completing the shared Services composition and all WU-1 through WU-6 prerequisites.
- 2026-09-18: created clean `/home/oscar/code/duartes-auto-detailing-wu7` on `feat/spanish-localization-content-review` from merged `origin/main`.
- 2026-09-18: mapped five approval batches, canonical facts/exclusions, accessibility strings, omission policies, approval hashing, and the Engram-only post-migration review boundary.
- 2026-09-18: owner selected whole discount-banner omission for Spanish Home because the 20%-off claim has no authoritative current evidence.
- 2026-09-18: stored claim ledger `localization/es-US/wu7/claim-ledger-v1` with 17 supported, conditional, and unsupported claim boundaries.
- 2026-09-18: owner directly approved exact blocks `es-US.shell.v1` (`702d3c00…`), `es-US.home.v1` (`6c259ed9…`), `es-US.about.v1` (`29dc14fa…`), `es-US.contact.v1` (`08122528…`), and `es-US.services.v1` (`8d2cd90a…`). Any wording, structure, policy, metric order, ServiceId order, or array-order change invalidates the affected approval.
- 2026-09-18: froze Engram handoff `localization/es-US/wu7/wu8-handoff-v1` with manifest digest `8cbde96c2f2f38d05454398df33251fe77b1739a408893ad97e8c2a2d8119910` and exact WU-8A/B/C slice boundaries.
- 2026-09-18: WU-8 prerequisite gaps are explicit: shell a11y strings/route resolution, Home metadata/discount omission, Contact omission-aware map typing, and Services localized-card typing plus disclosure placement before the image link.
- 2026-09-18: deterministic evidence verification reproduced all five block digests and the handoff digest, validated approval authority, four staged routes, WU-8A/B/C slices, omissions, truthful status, disclosure, exact ServiceId order, and forbidden-claim boundaries.
- 2026-09-18: source self-test, diff check, empty repository approval ledger, no-publication path checks, and independent verification passed; the only repository path is this 82-line ODD document.
- 2026-09-18: an isolated verifier accidentally installed `node_modules` and generated `pnpm-workspace.yaml`; both were removed with explicit owner authorization, source remained untouched, and final verification used only direct Node commands.

## Rollback boundary

Remove this WU-7 task document and delete only the WU-7 Engram draft/claim/approval/handoff topics. No runtime source, repository localization ledger, route registry, English content, canonical data, or publication state belongs to this unit.

## Next step

Complete native review and final persistence, then request explicit delivery authorization before any commit, push, or PR.
