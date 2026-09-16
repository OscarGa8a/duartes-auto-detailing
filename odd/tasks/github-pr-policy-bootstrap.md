# GitHub issue-first PR policy bootstrap

## Objective

Bootstrap the minimum repository infrastructure required to open the already-pushed Spanish localization WU-2 branch as a policy-conforming pull request.

## Problem and rationale

The active PR workflow requires a YAML Issue Form, an approved linked issue, and exactly one `type:*` label. The repository currently has no `.github` directory, no Issue Forms or PR template, and neither `status:approved` nor `type:feature` labels. This creates a circular dependency because a conforming bootstrap PR cannot be opened before those prerequisites exist. The repository owner explicitly authorized one minimal direct-to-`main` bootstrap; `main` is unprotected and the authenticated actor has `ADMIN` permission.

## Scope

- Add one feature-request YAML Issue Form on `main`.
- Add Issue Form configuration that disables unsupported blank issues.
- Add a PR template encoding issue linkage, exactly-one-type selection, summary, changes, verification, and contributor checks.
- Create only the two labels required for this delivery: `status:approved` and `type:feature`.
- Create a feature issue for Spanish localization WU-2 from the installed form after an open-and-closed duplicate search.
- Apply `status:approved` only after a separate direct user authorization bound to the created issue number and verified `ADMIN` permission.
- Open the WU-2 PR against `main`, link the approved issue, and apply exactly `type:feature`.

## Constraints

- Direct `main` mutation is limited to this bootstrap and was explicitly authorized by the repository owner.
- Do not alter application source, localization behavior, existing issues, or unrelated labels.
- Do not publish credentials, local paths, host details, or private diagnostics.
- No force push, history rewrite, merge, release, or deployment.
- Preserve unrelated files in the primary worktree.

## Testing mode

TDD is not configured for repository policy documents. Use structural validation, Git diff checks, GitHub readback, duplicate search, and exact label/issue/PR readback.

## Tasks

- [x] **ODD-PRBOOT-01 — Add policy templates.** Created the feature Issue Form, Issue Form config, and PR template with concise repository-facing English copy.
- [x] **ODD-PRBOOT-02 — Validate and publish bootstrap.** YAML/Markdown validation, independent verification, native reliability review, direct-main commit/push, and default-branch GitHub readback passed.
- [x] **ODD-PRBOOT-03 — Create required labels.** Created and verified exactly named `status:approved` and `type:feature` labels.
- [x] **ODD-PRBOOT-04 — Create and approve the WU-2 issue.** Duplicate search found no candidate; issue #47 was created from the installed feature form, read back, and received `status:approved` after issue-specific owner authorization.
- [x] **ODD-PRBOOT-05 — Open compliant WU-2 PR.** PR #48 is open, closes approved issue #47, carries exactly `type:feature`, and the branch includes the bootstrap commit. Vercel checks pass; the Cloudflare preview failure is a verified pre-existing repository condition also present on merged PRs #44–#46, not introduced by WU-2.

## Acceptance criteria

1. `main` contains a valid feature Issue Form, Issue Form config, PR template, and ODD bootstrap record—nothing else.
2. GitHub exposes exactly named `status:approved` and `type:feature` labels required for this flow.
3. The WU-2 issue is created from the default-branch YAML form after duplicate search and receives `status:approved` only after exact human authorization.
4. The WU-2 PR links that approved issue, carries exactly `type:feature`, and targets `main` from `feat/spanish-localization-shell`.
5. No application behavior or unrelated working-tree state changes.

## Required checks

- YAML parsing for `.github/ISSUE_TEMPLATE/feature.yml` and `.github/ISSUE_TEMPLATE/config.yml`
- `git diff --check`
- Scoped diff/stat inspection before direct-main commit
- GitHub default-branch content readback after push
- Exact label readback
- Open-and-closed duplicate issue search
- Exact issue and PR readback after each write

## Progress and evidence

- 2026-09-15: repository discovery confirmed issues are enabled, authenticated permission is `ADMIN`, `main` is unprotected, no rulesets exist, and `.github` is absent.
- 2026-09-15: repository owner explicitly authorized the minimal direct-to-`main` bootstrap to break the circular policy dependency.
- 2026-09-15: created `.github/ISSUE_TEMPLATE/{feature,config}.yml` and `.github/PULL_REQUEST_TEMPLATE.md`. The delegated Ruby validation command was unavailable because Ruby is not installed; parent validation used available PyYAML, confirmed the three required textarea controls and existing `enhancement` label, and passed no-index whitespace checks for all new files.
- 2026-09-15: independent verification passed with no findings. Native medium-tier reliability review approved and was acknowledged under lineage `review-b063daac779188f6`.
- 2026-09-15: committed `dcb6cac` (`chore(repo): bootstrap issue-first PR policy`) directly to authorized `main`, pushed it, and confirmed all four files through GitHub default-branch content readback.
- 2026-09-15: created and read back `status:approved` and `type:feature` with the authorized exact names and descriptions.
- 2026-09-15: the open-and-closed duplicate search found no candidate. Issue #47 (`https://github.com/OscarGa8a/duartes-auto-detailing/issues/47`) was created from `feature.yml` with `enhancement`, then received `status:approved` after exact issue-specific authorization and atomic readback.
- 2026-09-15: PR #48 (`https://github.com/OscarGa8a/duartes-auto-detailing/pull/48`) was created from `feat/spanish-localization-shell` to `main`, closes #47, and received exactly `type:feature` after PR-specific authorization. The feature branch was then merged with current `main` and pushed to trigger fresh checks.
- 2026-09-15: Vercel and Vercel Preview Comments passed on the refreshed head. Cloudflare Pages preview failed without exposed GitHub diagnostics; the same Cloudflare preview check also failed on merged PRs #44, #45, and #46, while the new `main` bootstrap deployment succeeded. This is documented as a pre-existing preview-environment condition and not attributed to WU-2.

## Next step

Bootstrap and compliant PR creation are complete. Await review/merge decisions; do not merge or deploy without a separate explicit user request.
