# Build log — orchestrated OS build

**Run:** 7 July 2026, 9:45am AEST start. Target: entire rebuild, high confidence, by 4pm AEST.
**Orchestrator:** Fable (`claude-fable-5`). Builders: Sonnet (`claude-sonnet-5`). Verifier: Opus (`claude-opus-4-8`).
**Branch:** `claude/latest-os-build-prompt-jlfk6a`. PR: #41 (draft).

## Result — complete, verified, 11:15am AEST (4 hours 45 minutes ahead of target)

All three tracks built, independently verified (verdict: PASS WITH FIXES, zero critical), and
every finding fixed and re-verified. ~60 files across the kit; the runbook is the headline.

**Final rubric (all dimensions at 4 or higher — stop condition met):**

| Dimension | Score | One-line reason |
| --- | --- | --- |
| Time-saving (north-star) | 4 | Today door + meeting-to-actions proven/specified, est. 5–8 hrs/week; not yet measured in use |
| Delegable (Ronnie test) | 4 | Runbook passed the verifier's Ronnie test; awaits the real Ronnie |
| Findable | 4 | One home per object mapped; Drive reconciliation awaits Clent (runbook Step 6) |
| Trustworthy | 4 | Source-only rules + eval fixtures ready; evals not yet green against a live endpoint (flagged) |
| Actionable | 4 | Meeting-to-actions + Today door specified and live-demoed |
| Improvable | 5 | Washback path fully templated, approval-gated, nothing self-promotes |
| Secure | 4 | Scripts safety-verified, boundary scans clean at every commit; access recert still to run |
| Scalable | 4 | Kit + catalogue + apply scripts complete; not yet applied to maxxim |
| Simple | 4 | Reference-not-restate held; smallest-pack rule guards token cost |
| Boundary-clean & portable | 5 | Independent boundary scan clean; AGENTS-first portability |

**Honest exceptions, flagged not hidden:** (1) promptfoo evals cannot run green until the Ask
endpoint is wired — fixtures ship ready. (2) Runbook Steps 4–6 await Clent's sign-offs by design.
(3) Time-saving numbers are estimates until 2 weeks of use.

**Verification verdicts:** boundary CLEAN · secrets CLEAN · references 16/18 → 18/18 after fix ·
Ronnie test PASS · script safety PASS (+1 dry-run tightening) · consistency fixed (5-file pack-name
defect, 2 broken refs, flag/path defects) · voice PASS.

---

## Final optimisation pass — 8 July 2026 (Fable orchestrating; Sonnet and Opus executing)

Four parallel audits (integration end-to-end by Opus; efficiency, security and operator-currency
by Sonnet) produced ~90 findings. Three Sonnet fixers closed them on disjoint scopes; Fable
personally handled the private-adjacent work (decision-log redaction; the standing-approval
carve-out in the constitution and AGENTS.md). An independent Opus adversarial verifier then
attacked 6 claims: privacy HOLDS, references HOLDS, security HOLDS, currency and honesty held
with narrow refutations, all closed and mechanically re-verified (0 floating action pins,
0 broken links across 91 files, 0 leak terms, all 7 packs install clean via --dry-run).

Headline fixes: decision log redacted of private-layer specifics with a recorded redaction rule;
constitution reconciled with the live "AI executes, Ronnie reviews" model via a scoped
standing-approval carve-out; runbook rewritten to the automated state (7:00am NSW brief, failure
path, escalation channel, verification steps); 6 duplication clusters collapsed to
canonical-plus-pointer; memory layer files created so washback has destinations; security
workflows pinned with alert routing; MCP defaults read-only; prompt-injection eval added and
wired; every aspirational integration honestly parked; PLATFORM-OPERATING-SYSTEM.md (new,
draft) explicitly subordinated to OPERATING-SYSTEM.md.

**Final rubric (0-5):** Time-saving 4 (estimates until 2 weeks of live use) · Delegable 5 ·
Findable 4 (platform-doc reconciliation awaits Clent) · Trustworthy 4 (evals ready, not in CI
until the Ask endpoint) · Actionable 5 · Improvable 5 · Secure 4 (SHA pinning and repo CI queued)
· Scalable 5 · Simple 4 (the new platform doc adds surface, subordinated) · Boundary-clean 5.
All dimensions at 4 or higher — stop condition met. 45/50.

**Open for Clent (Tier 2):** review PLATFORM-OPERATING-SYSTEM.md and pick the Sam-brief
reconciliation option (its Section 6.5 note); the second Asana inventory proposal; applying the
security pack to this repo. **Parked honestly:** Ask endpoint + eval CI, Gmail route, Monday
reset, finance packs, meeting-capture connector.

## Pass 1 — plan and delegation

**Reality audit (done live, this session, read-only):** Calendar, Asana and Drive connectors
authorised and read. Today door assembled from real data. Findings routed to the runbook; the
itemised personal/legal list is held privately by Clent and is not in this repo.

**Delegation log:**

| Slice | Builder | Status |
| --- | --- | --- |
| RONNIE-RUNBOOK.md + Track A manual edits | Fable | complete |
| Starter-stack top level + base-claude-code pack (10 files) | Sonnet S1 | complete |
| 01-catalogue (6 files, 25 repos, counts validated) | Sonnet S2 | complete |
| 03-scripts (5 scripts + README; syntax + smoke-tested; dry-run verified against the live catalogue by Fable) | Sonnet S3 | complete |
| skills pack (README + template + 7 SKILL.md) | Sonnet S4 | complete |
| mcp pack (6) + 00-governance (7) | Sonnet S5 | complete |
| operating-rhythm (6) + memory (5) + 05-examples (4) + 06-docs (6) | Sonnet S6 | complete |
| Independent verification (all of the above) | Opus | in progress |

**Pass 1 result:** all slices built. Boundary scans clean at each commit. Scripts integration-
tested against the real catalogue (security and adopt-now groups parse correctly, licences carry
through). Live Track C demonstrations done earlier in-session: Today door assembled from real
Calendar + Asana, read-only.

## Pass 2 — independent verification

Opus verifier running: boundary scan, secret scan, reference integrity (15+ links), the Ronnie
test on the runbook, script safety re-check, consistency vs claims, voice spot-check. Verdicts
land here.
