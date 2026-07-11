# GitHub repo consolidation map

Audited 2026-07-11 across 28 of 29 repos (`spark-ui-builder` not audited — session access was
declined; pick it up Monday). Read-only audit by 4 delegated agents, reviewed by the
orchestrator. Nothing has been deleted. Actions marked DONE were executed on 11 July; every
other action is queued for Monday with Ronnie. Rule of thumb applied throughout: merging to a
default branch that a Cloudflare Worker or Pages project watches deploys to a live site, so
those merges need eyes on the preview first.

## The 3 structural problems

1. **Wrong default branches.** 6 repos have a `claude/*` feature branch as the GitHub default:
   `jewelltyres` (default is not even the deployed branch — production serves
   `claude/loving-dirac-zpzxu2`), `jewell`, `jewell-ai`, `clent-jewell-personal`,
   `jewell-finance` (no `main` at all), `website-development`. Fix: settings → default branch,
   after landing the branch each repo actually runs on.
2. **PR pile-up.** 66 open PRs across the estate, heaviest: `jewell-ai` (30), `jewelltyres`
   (8), `website-development` (8). Most are finished one-off deliverables that were never
   merged or closed.
3. **No deploy gates on live sites.** `pottsville-acupuncture-website` FTP-deploys to the live
   client site on every push to `main` with no review gate. `beyondtheclinic` and `maxxim`
   auto-deploy on push to their defaults. Fix: branch protection plus required review on those
   three at minimum.

## Summary table

| Repo | Verdict | Canonical branch | Deploy risk | Action |
| --- | --- | --- | --- | --- |
| jewell-os | KEEP — the OS | main | none | Registry sync shipping in PR #2; add 2 secrets |
| clent-jewell-personal | KEEP — personal OS | main (after landing PR #1) | none | Land PR #1, reset default to main, then #2 and #3 (personal layer — Clent only) |
| jewelltyres | KEEP — live site | claude/loving-dirac-zpzxu2 → promote to main | Pages, high | Make deployed branch the default; triage 8 PRs; 9 stale branches then deletable |
| jewell-ai | KEEP — busiest hub | main | Workers, high | Triage 30 PRs in order: site lineage (44, 47, 42, 29), OS docs (48, 40, 41), Ask hardening (46, 43, 31, 49, 50); deck PRs merge-or-export then close |
| jewell-health | KEEP — clean | main | Pages, medium | DONE: closed superseded PRs #1, #3, #4; review 2 active branches then delete stale |
| ultimate-access-portal | KEEP — active | main | Workers, high | Review stacked PRs #25 → #26 (launch readiness); 2 branches deletable |
| maxxim | KEEP — live product | main | Workers, high | Triage 5 PRs; preview work on focused-feynman to fold in |
| maxxim-positioning | KEEP — docs | main | none | Nothing to do |
| beyondtheclinic | KEEP — active | main | Workers, high (deploys on push) | Review PR #23; DONE: closed bot PR #1 |
| paint-estimator | KEEP — EstiTrade | main | Workers, low | PR #16 reverses a locked scope decision — flag for Raef; duplicate branch deletable |
| pottsville-acupuncture-website | KEEP — LIVE CLIENT SITE | main | FTP on push, no gate — CRITICAL | Add branch protection Monday; 40 stale branches bulk-deletable after spot check |
| jewell | KEEP — site rebuild | main (after landing rebuild) | Workers, medium | Land rebuild branch to main deliberately, reset default, then PR #3 |
| jewell-tyres-im | KEEP — IM deck | main | dashboard-configured | Converge 4 deck PRs (#10–#13) to one version, then delete 6 branches |
| jewell-finance | KEEP | create main from sole branch | none | Create/rename main Monday |
| jewell-clients | KEEP — empty shell | main | none | Nothing to do |
| 3d-system | KEEP — 3D Process core | main | none | Nothing to do |
| christy-jewell-partnership-deck | KEEP while live | main | none | Archive when the conversation concludes |
| assurant-presentation | KEEP — canonical Assurant | main | Pages | Decide PRs #1, #2 (5 weeks stalled), then delete branches |
| assurant | ARCHIVE — empty | — | none | Archive (superseded by assurant-presentation) |
| jewelltyres-stitch | ARCHIVE — superseded | — | Workers config only | DONE: closed bot PR #1. Archive |
| website-development | ARCHIVE after extraction | — | Workers — detach in CF dashboard first | Extract Walter Wealth eDM (PR #8 documents how), close 8 PRs, archive |
| antigravity-jewelltyres | ARCHIVED already | — | — | No action |
| antigravity-otrearthmovers | ARCHIVED already | — | — | Confirm OTR registry entry should point at jewelltyres instead |
| video-prod | DECIDE | main | none | 2 competing scaffold PRs; pick one or archive |
| claude-test | ARCHIVE or keep as scratch | main | none | Clent's call |
| hastings-wellness-hub | PARKED | main | none | Archive pending client decision |
| petzip | PARKED | main | none | No action |
| walterwealth | PARKED | main | none | Branch fully merged, deletable |
| spark-ui-builder | NOT AUDITED | — | — | Add to session and audit Monday |

## Monday checklist (Ronnie + Clent, ~1 hour)

1. Add `ASANA_TOKEN` and `REGISTRY_GH_TOKEN` secrets to jewell-os; run registry-sync via
   workflow dispatch; confirm Asana tasks update. Then merge jewell-os PR #2.
2. Branch protection + required review on: pottsville-acupuncture-website, maxxim,
   beyondtheclinic, jewelltyres, jewell-ai.
3. Default-branch fixes (settings → branches): jewelltyres → the deployed branch (then plan
   promotion to main), jewell, jewell-ai, clent-jewell-personal, jewell-finance.
4. Archive (repo settings, reversible): assurant, jewelltyres-stitch; website-development
   after the Walter Wealth eDM extraction and Cloudflare detach.
5. PR triage sessions per the table — jewell-ai is the big one (30 PRs); the order is in the
   table row and each PR closure keeps its branch until confirmed landed.
6. OTR Earthmover: confirm which repo now owns the OTR site (audit says content lives inside
   jewelltyres; the archived antigravity repo still holds the registry link) and update
   `registry.json`.
7. Audit spark-ui-builder.
