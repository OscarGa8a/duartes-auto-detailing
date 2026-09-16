# Spanish localization shell and SEO contracts

## Objective

Prepare the shared Astro shell and SEO boundary for the approved `en-US` / `es-US` architecture while preserving the current English site exactly and publishing no Spanish route or content.

## Problem and rationale

PR #46 introduced locale, candidate-route, content, and approval contracts. The current shell still hard-codes English locale metadata and has no typed way to receive a known translated counterpart. This work threads the existing contracts through the shell now so later localized page compositions can reuse one implementation without advertising unpublished URLs.

## Scope

- Reuse `src/i18n/locales.ts` and `src/i18n/routes.ts`; do not create a duplicate localization registry.
- Add optional locale and known-counterpart props through `BaseLayout`, `SEOHead`, `Navbar`, and `Footer` with English-safe defaults.
- Emit locale-specific document and Open Graph metadata.
- Emit alternate links and a language selector only when a counterpart is explicitly published.
- Extend source and built-output verification for the unpublished-Spanish boundary and English parity.
- Keep `src/data/config.ts`, page compositions, business schema construction, `public/llms.txt`, and mobile focus behavior unchanged.

## Constraints

- No `src/pages/es/`, deployable Spanish content, Spanish build output, or links to unpublished Spanish URLs.
- Preserve current English visible strings, links, canonicals, JSON-LD, sitemap, and `llms.txt`.
- Preserve unrelated staged/untracked files, including `scripts/*:Zone.Identifier`, `docs/PLAYBOOK.md*`, and `pnpm-workspace.yaml`.
- Keep the PR candidate below the repository's 400 changed-line gate; about 400 lines remains an ODD planning heuristic, not a reason to omit tests or distort code.
- No commit, push, PR, or deployment without explicit user authorization.

## Testing mode

TDD is not configured for this ODD task: no project/session ODD TDD setting or dedicated unit runner was found. Use ordinary functional checks with existing deterministic source/build verifiers. Required runner commands are listed below.

## Tasks

- [x] **ODD-WU2-01 — Reconcile baseline and requirements.** Confirm PR #46 is merged on `origin/main`, update local `main`, create `feat/spanish-localization-shell`, preserve unrelated files, and reconcile Engram requirements with current source.
- [x] **ODD-WU2-02 — Define shell-facing counterpart contract.** Counterpart resolution is bound to the repository-owned published-route registry and the matching candidate pair; shell callers cannot assert publication.
- [x] **ODD-WU2-03 — Thread locale through shared shell.** Added backward-compatible props to `BaseLayout`, `SEOHead`, `Navbar`, and `Footer`; default English rendering remains unchanged.
- [x] **ODD-WU2-04 — Render only published language alternatives.** Shell alternatives resolve internally from the publication registry, which remains empty for WU-2.
- [x] **ODD-WU2-05 — Strengthen deterministic verification.** Source checks reject caller publication markers, and output checks reject exact `/es` plus nested `/es/...` forms without matching `/services/`.
- [x] **ODD-WU2-06 — Verify candidate and review boundary.** Writer checks, parent spot-check, corrected independent verification, and medium-tier native reliability review all passed; the approved review was acknowledged.

## Acceptance criteria

1. Existing page callers require no changes and continue to render `lang="en-US"` and `og:locale="en_US"`.
2. Canonical URLs, JSON-LD, sitemap entries, visible English navigation/footer content, and `llms.txt` remain unchanged.
3. The shell can receive `en-US` or `es-US` plus a known counterpart using existing typed route contracts.
4. `hreflang` and language-switch links are generated only for explicitly published counterparts.
5. No `/es/` route, Spanish page output, or link to an unpublished Spanish route exists after build.
6. The bounded candidate remains below 400 changed lines and excludes unrelated working-tree files.

## Required checks

- `pnpm run verify:i18n-source -- --self-test`
- `pnpm run check`
- `pnpm run test:seo`
- `git diff --check`
- Scoped changed-line count against `main`, excluding documented unrelated baseline files

## Progress and evidence

- 2026-09-15: fetched `origin/main` over HTTPS at `ea58fd2` (`feat(i18n): add localization foundation (#46)`). The merged WU-1 source tree matches commit `211ccfc` for all eight WU-1 paths.
- 2026-09-15: local `main` fast-forwarded to `ea58fd2`; branch `feat/spanish-localization-shell` created from it.
- 2026-09-15: read-only mapping confirmed `BaseLayout` owns the shared shell; `SEOHead` hard-codes English Open Graph locale; existing `src/i18n/locales.ts` and `src/i18n/routes.ts` already own locale and counterpart paths; `src/data/config.ts` needs no change.
- 2026-09-15: implemented the counterpart, shell, SEO, and deterministic verifier changes in exactly seven scoped source files: 107 additions and 7 deletions (114 changed lines).
- 2026-09-15: `pnpm run verify:i18n-source -- --self-test` passed in both the writer run and parent spot-check.
- 2026-09-15: `pnpm run check` passed with 0 errors and 2 pre-existing hints.
- 2026-09-15: `pnpm run test:seo` passed after building 31 HTML routes; the existing chunk-size warning remains non-blocking.
- 2026-09-15: scoped `git diff --check` passed. No current caller supplies a counterpart, and the first verification run observed no Spanish route, output, or alternate link.
- 2026-09-15: native assessment was unavailable because the native command returned empty output; the fail-closed plan required an independent verifier.
- 2026-09-15: independent verification failed. High: callers could forge `{ state: "published", route }`, bypassing a real publication source of truth. Medium: built-output verification rejected `/es/` links but could miss the equivalent `/es` form. Tasks ODD-WU2-02, ODD-WU2-04, and ODD-WU2-05 were reopened.
- 2026-09-15: correction replaced caller publication authority with `publishedSpanishPageIds` plus candidate-pair resolution, and added path-aware rejection for exact `/es` and nested `/es/...` URLs.
- 2026-09-15: corrected writer checks and parent source spot-check passed. Final scoped candidate is 145 additions and 25 deletions (170 changed lines).
- 2026-09-15: independent re-verification passed with both prior findings closed. `verify:i18n-source`, Astro check, build/SEO verification, scoped diff check, and line-budget check all passed; two existing unused-import hints and the existing Vite chunk-size warning remain non-blocking.
- 2026-09-15: native medium-tier reliability review approved and was acknowledged under lineage `review-c2d624f0a00cee89`. Its three advisory warnings are deferred, not blockers: prove the positive counterpart branch when WU-9 publishes routes, consider redirect-output coverage separately, and keep the pre-existing Zone.Identifier artifacts out of delivery.
- 2026-09-15: user authorized commit, push, and PR. Commit `69859ac` (`feat(i18n): add localization shell contracts`) was created with only the eight scoped WU-2 files and pushed to `feat/spanish-localization-shell`; unrelated staged/untracked files remain untouched.
- 2026-09-15: the issue-first policy prerequisites were bootstrapped on `main` by explicit owner authorization. Issue #47 was created from the installed feature form and received `status:approved` after issue-specific authorization.
- 2026-09-15: PR #48 (`https://github.com/OscarGa8a/duartes-auto-detailing/pull/48`) was created against `main`, closes approved issue #47, and carries exactly `type:feature`. The branch was merged with the bootstrap commit so remote checks run against the current base policy.

## Next step

Confirm all remote PR checks pass; do not merge or deploy without a separate explicit user request.
