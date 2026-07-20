# Jewell Console — the OS on a website (v1 spec, PROPOSED 17 July 2026)

Clent's direction, 17 July sitting: the operating system gets a website. The site connects
to the tech stack, AI agents handle each aspect of the business, every agent action is
logged in GitHub, and outputs execute automatically within the gates. This spec turns his
15 answers into a buildable v1. Status: proposed — enters the decision log on the word.

## What it is, in one line

A window on the whole business that can also press the buttons — GitHub remains the brain,
the console renders it live, and a gated agent layer acts on our behalf with every action
logged before it lands.

## The decisions locked from Clent's answers

| # | Decision |
| --- | --- |
| 1 | Users: Clent and Ronnie only at v1. Access by email identity, not a shared password. |
| 2 | Window, never brain. GitHub holds all state, organised around clients. The console holds nothing that GitHub does not. |
| 3–4 | v1 shows every aspect of the business on one board. Agent execution switches on lane by lane behind gates (see phasing). |
| 5 | Autonomy line: reads always; writes to the action log always; writes to external tools only from a pre-approved playbook; money, external sends, credentials and the private layer always take a human word. Tier 3 unchanged. |
| 6 | The word is given on the console. The Approve button commits the decision to the decision log in GitHub. Slack stays for conversation. |
| 7 | Cloudflare end to end, hardened for low maintenance (see "runs itself" below). No alternative platform reduces upkeep enough to justify a second stack. |
| 8 | Hybrid execution: deterministic Workers ingest the stack into GitHub automatically; Claude API powers the on-site agents and smarts; Claude Code routines and the Sam v2 lane keep the heavy builds. |
| 9 | Ronnie owns key management. v1 connects Asana + GitHub only; Xero and Gmail queue for v2. |
| 10 | Separate repo for the action log. |
| 11 | Smarts chosen to fit: the needs-Clent-today queue, cash runway, anomaly flags. |
| 12 | Nightly ingest plus refresh-on-open: opening a panel pulls that panel's data fresh. |
| 13 | Simplicity is the design constraint: the fewest moving parts that meet the standard. It follows that the console sits after activation Steps 1 and 2, and goes to Friday's portfolio split as the first named own-projects item. |
| 14 | Budget TBC — the pilot ships with a token meter and a hard monthly cap so the number is set from evidence, not guessed. |
| 15 | Own name, own home: **Jewell Console**, behind Cloudflare Access (Clent + Ronnie emails). Not the BTC worker's name; that rename proceeds separately per the estate register. |

## The brain — 3 repos, 3 jobs

| Repo | Job | Written by |
| --- | --- | --- |
| `jewell-os` | Governance, knowledge, playbooks, OKRs, decision log | Humans and gated PRs, as now |
| `jewell-brain` | Machine-written state: one folder per client, plus pipeline, finance and routine-health snapshots as structured JSON/markdown | The ingest Workers, on schedule |
| `jewell-ops` | Append-only action log: 1 JSONL line per agent action — agent, action, why, input, output, tier, word-given-by, timestamp. One file per agent per day; appends serialised through a single queue Worker so concurrent commits never conflict | Every agent, before an action counts as done |

Machine-written data churns nightly; keeping it out of `jewell-os` keeps the governance
history readable. A console panel is only ever a render of one of these repos or a live
read of a connected tool.

## The plumbing (Cloudflare)

- **Pages** — the console UI.
- **Workers** — the API layer between UI, GitHub and the tools; the ingest crons.
- **D1/KV** — cache only, rebuildable from GitHub at any time. Losing it loses nothing.
- **Cloudflare Access** — sign-in for the 2 identities. No shared password gates on this asset.
- **Secrets store** — every token, least-privilege, one per agent. Ronnie owns rotation.

**Runs itself (the Q7 answer):** low maintenance comes from fewer moving parts plus
self-checks, not from a different platform. Each ingest cron writes a heartbeat; the
console shows a red banner the moment any feed is stale; a daily one-line health post
goes to Slack. Nothing fails silently — that rule is what the 16 July verification taught.

## The agent layer

6 lanes, all visible on the board from day one: **Funnel, Finance, Delivery, Strategy,
Compliance, Time**. Execution switches on lane by lane:

- **v1.0 (the 2-week pilot):** Funnel and Finance agents live — they map to the routines
  and the FY27 number that drives everything. Scoped honestly to the v1 connections:
  the Funnel agent's external writes are Asana pipeline actions from its playbook; the
  Finance agent reads the snapshots the finance routines already write to `jewell-brain`
  and its only external write is an Asana task (an invoice chase, a review flag) — money
  moves stay Tier 3 words, and Xero connects at v2. The other 4 lanes render their data
  and show "proposals only".
- **v1.1+:** each further lane goes live when its playbook is approved and its
  predecessor's scorecard is clean. All 6 lanes automated is the v1 finish line, gated,
  not the day-1 switch-on.

Each live lane carries 4 things before it acts: a **playbook** (the pre-approved action
list), its **tier gates**, its **log format** in `jewell-ops`, and its **budget cap**.
An action not on the playbook queues for the word — visible in the needs-Clent queue.

**What fires an agent:** the nightly cron, immediately after its lane's ingest lands; and
on demand from the lane's Run button on the console. Every run is bounded by the
per-agent token cap. No agent runs on an external event at v1 — webhooks come later if
the scorecard earns them.

Model routing follows the house rule: the lightest model that meets the standard per
task; the orchestrator owns final quality; every output check-and-fixed before done.

## The smarts (v1)

1. **Needs Clent today** — a queue capped at 3: the word requests, the decaying deal, the
   anomaly. If everything is fine, it says so.
2. **Cash runway** — live against the FY27 number ($11,667 income vs $103,314 expenses),
   with the pipeline shown unweighted and clearly marked unbanked.
3. **Anomaly flags** — routine failed, feed stale, deal untouched past its stage clock,
   spend spike, token cap approaching.
4. **The Approve button** — every word given from the console lands as a decision-log
   entry with what was approved, by whom, when. Approval rights follow the tiers:
   Tier 2 items can take Ronnie's word; Tier 3 items accept Clent's identity only —
   the button is disabled for anyone else, enforced at the Worker, not the UI.

## Security (non-negotiable)

- Least-privilege token per agent, secrets only in the Cloudflare store, register updated
  in the same change as any new deployment.
- The console is work-only. The private layer never renders here, never has a token here.
- Gitleaks and the security review stay in the loop for every console PR.
- Builds only after activation Step 1 clears — this asset concentrates credentials and
  must never hold a pre-rotation key.

## Money

- Infra: near $0 on Cloudflare at this scale.
- Claude API: new budget line. The pilot runs under a starting hard cap of US$50 for the
  fortnight (proposed; Clent may reset it before build), with a per-agent meter on the
  console. The meter is also the kill switch. Clent sets the ongoing monthly cap at the
  pilot readout from measured cost per lane — evidence, not a guess.

## Build plan — 2-week pilot, after Steps 1 and 2

- **Week 1:** repos created (`jewell-brain`, `jewell-ops`); Asana + GitHub ingest Workers
  live with heartbeats; read-only console rendering all 6 lanes; Cloudflare Access on.
- **Week 2:** Approve button wired to the decision log; Funnel and Finance agents live on
  their playbooks; token meter and caps; anomaly flags; Slack daily health line.
- **Readout:** cost per lane, actions taken vs words requested, anything that surprised
  us. Then Clent sets the budget and the lane-by-lane switch-on order.

Build crew: Fable orchestrates and reviews; Sonnet builds; Rao on Workers glue and DNS;
Ronnie first user and key owner; Clent the word.

## Drift guards

1. Window, never brain — any feature that stores truth outside GitHub is rejected at review.
2. Nothing acts off-playbook without a word; Tier 3 never automates.
3. No silent failure — every feed and agent proves liveness or shows red.
4. One source of truth per object still applies: a console panel renders the source, it
   does not copy it.

## v2 — approved by Clent, 20 July 2026

Three layers, built in order while the pilot fortnight runs:

1. **Feeds.** Gmail and Google Calendar join the ingest (week 1), Xero follows
   (week 2). Privacy line, set by Clent: the brain stores summaries only — sender,
   subject, the extracted ask, dates — never full email bodies. Work account only;
   the private layer never enters the brain.
2. **Agents working together.** Lane agents cooperate through the brain, never
   directly: each writes findings; a chief-of-staff agent reads all of them and
   produces the daily digest — what happened, what needs the word (capped at 3),
   meeting prep, unanswered asks, decaying deals. Same tiers, playbooks, meter and
   log as v1.
3. **The Delivery cockpit** (weeks 3 to 4, after Gold is priced): intake form on
   the console, a Build button running the Gold pipeline to preview URL, a human QA
   gate, client folders tracking deliverables against the 3D Process. Browser only;
   Maxxim slots in underneath when stable, per the engine-agnostic rule.

Setup: 1 Google OAuth app (internal, read-only scopes), 1 Xero OAuth app, new
playbooks arriving as docket items for the word. Spend stays under the pilot cap
until the readout.

Next: on the word this file drops "PROPOSED", rows 16 to 19 enter the decision log,
and the pilot is scheduled behind Steps 1 and 2.
