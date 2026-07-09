# The Jewell Platform Operating System — Tech Stack, Sam Integration & End-to-End Workflows

**Status:** Draft for review. Built from a live audit of the real systems (Slack, Drive, Sam's own
documentation), not assumptions. Nothing here changes a tool, permission or automation until you
approve it.
**Relationship to prior work:** this is the execution layer on top of `OPERATING-SYSTEM.md` (the
20-section manual), `RONNIE-RUNBOOK.md` (the switch-on guide) and the `starter-stack/` kit. Read
this alongside those, not instead of them. Where this document and `OPERATING-SYSTEM.md` disagree,
`OPERATING-SYSTEM.md` wins; propose a reconciliation, do not run the difference. Documents named
with a plain filename but held in Google Drive (for example `OS-CONTEXT-BUNDLE.md`,
`00-MASTER-INDEX.md`, `workspace/MEMORY.md`) live Drive-side, not in this repo.

---

## 0. Earlier briefs already prepared — check completed

You asked me to check first. Here is what already exists, so this document adds to it rather than
replacing it.

**Already built by this workstream (`jewell-os`, this repo):**
- `OPERATING-SYSTEM.md` — the 20-section manual: Jewell × Maxxim model, source-of-truth map,
  current-state tool map, Drive structure, repo structure, 3D Process, memory layers, security,
  cadence, roles.
- `RONNIE-RUNBOOK.md` — the live switch-on guide, now partly executed (Today door running daily).
- `starter-stack/` — the reusable kit: security and evals packs, skills, MCP notes, operating
  rhythm templates, memory policy.
- `06-memory/decision-log.md` — every binding call so far, including two pending recommendations
  this document now completes: **the Drive↔GitHub authority split** and **the Sam shared-memory
  question**.

**Already built by Sam (OpenClaw), found in Drive on audit — these are real, current, and this
plan builds on them rather than duplicating them:**
- **"Sam — Ready Reference (Incident Response and System Map)"** — the live system map: gateway,
  model policy, guardrails, key channels, backups.
- **"Sam — Operating Rules (Model, Reliability and Cost Playbook)"** — model policy, change
  management, cost philosophy.
- **"Sam — Operating Memory Snapshot | Business Context"** — a periodic, business-only extract of
  Sam's full memory, already following the exact "sanitise before it leaves the private layer"
  pattern this OS requires.
- **`OS-CONTEXT-BUNDLE.md` and `00-MASTER-INDEX.md`** — Sam already generates a nightly-refreshed,
  agent-loadable map of the Drive structure, with a "sensitive areas — pointer only" section that
  independently reaches the same boundary rule this OS was built around. **This is strong
  convergent validation: two independently-built systems arrived at the same boundary design.**
- **A live Drive structure** (`00. Inbox` through `09. Archive`, OKF-numbered) that already exists
  and substantially matches the structure `OPERATING-SYSTEM.md` Section 6 proposed. **Recommendation:
  adopt the existing structure as canonical rather than building a parallel one** — see Section 3.
- **A live Slack estate** — at least 42 channels, including automatic per-client channel creation,
  routing channels for Gmail/WhatsApp/Messenger/phone, and a personal-layer cluster that is
  correctly access-restricted in every case checked bar one (flagged in Section 5).

**Conclusion:** don't rebuild. Reconcile. The rest of this document is the reconciliation plan.

---

## 1. Tech stack — roles, source of truth, and how they connect

| Tool | Primary role | Source of truth for | Connects to |
| --- | --- | --- | --- |
| **Google Drive** | File store, client folders, Sam's context refresh target | Files, client deliverables, finance records, Sam's Active Context | GitHub (rules flow one way in), Slack (routing target), Asana (linked from tasks) |
| **GitHub (`jewell-os`)** | Canonical rules, AI instructions, skills, evals, templates | Operating rules, `AGENTS.md`, decision log, governance | Drive (summary flows out), Claude Code, Sam (read-only rule sync, proposed) |
| **Asana** | Actions and delivery tracking | Tasks, projects, client delivery status | Slack (via bot/links), Today door (reads it), Sam (writes via Asana CRM per its own docs) |
| **Slack** | Real-time coordination, routing, daily/weekly rhythm | Nothing structural — a routing and rhythm layer, not a file store | Gmail/WhatsApp/Messenger/phone (inbound routing), Sam (primary interactive channel), Today door (posts here) |
| **Sam (OpenClaw, on the Mac Mini)** | Always-on execution agent — the "Life OS" connective tissue | Its own working memory (`workspace/MEMORY.md`, private, local) | Slack (primary), Drive (nightly context refresh), Asana (CRM), WhatsApp (send-only) |
| **Claude Code / Claude Teams** | Building, architecture, on-demand reasoning | This repo, `AGENTS.md`, skills | GitHub, Drive (read/write via connector), Asana, Slack, Google Calendar |
| **Google Calendar** | Commitments and meetings | The day's schedule | Today door reads it |
| **Cloudflare** | Hosting for the Jewell site and Maxxim | Deployment | GitHub (Workers Builds) |
| **Xero** | Finance records | Cash position, invoices | Weekly Finance Review (human-run), referenced not automated |

**The one-line model:** Drive holds the work. GitHub holds the rules. Asana holds the actions.
Slack holds the rhythm. Sam is the always-on hands that touch all four, inside the rules GitHub
sets and the boundary Drive's own sensitive-areas map already enforces.

---

## 2. Google Drive — the structure that already exists (adopt, don't rebuild)

Per `OS-CONTEXT-BUNDLE.md`, generated nightly by Sam:

```
clent@jewellprojects.com — My Drive/
├── 00. Inbox — Sort Weekly
├── 01. Strategy
├── 02. Templates & Decks
├── 03. Admin & Finance
├── 04. Media
├── 05. Jewell                    (internal: brand, process, OS docs)
├── 06. Reference
├── 07. Team
├── 08. Clients/                  (one subfolder per client, 3D-structured:
│     [Client]/00. Brief & Scope, 01. Admin, 02. Discover, 03. Design,
│                04. Deploy, 05. Shared Library, 06. Archive)
└── 09. Archive
```

Separately, on a different Google account (`clentonjewell@gmail.com`), a sensitive-areas structure
already exists and is correctly access-scoped: health, legal (two categories), and personal
finance, each pointer-only in the nightly index, each restricted to the owner or owner+Ronnie.
**This is the private personal layer already operating exactly as this OS's boundary model
requires — no change needed, just formal recognition that it is the canonical private space,
alongside the Clent-only Asana board built this week.**

### Recommendation
- Retire the OKF structure proposed in `OPERATING-SYSTEM.md` Section 6 in favour of this real,
  already-adopted structure. Update Section 6 to reference it rather than propose a parallel one.
- Fold the `08. Clients/` 3D subfolder convention into the client-onboarding workflow (Section 6
  below) as the canonical client file structure — it already matches the 3D Process spine.

---

## 3. Drive ↔ GitHub interaction model

**The rule stays as set: one direction for rules, one direction for context.**

```
GitHub (jewell-os)                          Google Drive
─────────────────────                       ─────────────
Canonical rules, AGENTS.md,      ──(nightly, one-way)──►   A short rules-summary file,
governance, decision log                                    e.g. 00. Inbox/JEWELL-OS-RULES.md
                                                              (or folded into OS-CONTEXT-BUNDLE.md)

Drive structure, client                                     OS-CONTEXT-BUNDLE.md,
folders, Active Context           ◄──(read, never write)──  00-MASTER-INDEX.md
                                                              (Sam's live Drive map)
```

- **GitHub never reads Drive.** Rules are authored and reviewed here, in git, with a diff and a
  decision-log entry.
- **Drive never becomes a second rulebook.** The existing `OS-CONTEXT-BUNDLE.md` and
  `00-MASTER-INDEX.md` are Active Context and a file map — exactly the role this OS's memory
  design gives Drive. They should gain one more section: a short, auto-refreshed summary of the
  live `jewell-os` rules (constitution one-liners, current decision-tier thresholds, the boundary
  rule), so Sam's nightly context load includes the canonical ruleset without duplicating it.
- **Build task (Tier 2, Raef/Ronnie):** extend Sam's existing nightly Drive-refresh cron to pull a
  compact summary from `jewell-os/AGENTS.md` and `00-governance/` and append it to
  `OS-CONTEXT-BUNDLE.md`. This is a small addition to a cron that already exists — not a new
  system.

This closes the "two systems" risk flagged in the decision log on 7 July, with the smallest
possible change: one section appended to a file Sam already writes every night.

---

## 4. Sam (OpenClaw) — integration architecture and shared memory

### What Sam already is (from Sam's own documentation, verified, not assumed)
- **Gateway:** OpenClaw, running via `launchd` on the Mac Mini, local loopback websocket.
- **Model policy:** Sonnet for every interactive channel, always. Gemini Flash only for simple,
  mechanical background crons (log greps, syncs) — never for interactive or tool-heavy reasoning.
  This rule exists because switching models mid-session has broken Sam before; it is load-bearing,
  not a preference.
- **Guardrails already running:** a boot-loop watchdog, a stuck-session watchdog, a 10pm nightly
  reset to Sonnet, and a 2:50am health check (disk, restart verification).
- **Memory:** a full working memory (`workspace/MEMORY.md`), private and local, with periodic
  **business-context extracts** pushed to Drive — the same sanitise-before-sharing pattern this OS
  requires for anything crossing from the private layer into a shared surface.
- **Reach:** Slack (primary), WhatsApp (send-only), Gmail/Messenger/phone routed into Slack,
  Asana (writes pipeline/CRM data), and the Drive nightly refresh.

### The shared-memory model (what "connect Sam to the operating system" means in practice)

Sam should not read `jewell-os` directly, and `jewell-os` should not read Sam's private memory.
The connection is through two narrow, one-way channels, both already partially built:

1. **Rules flow to Sam, one way, via Drive** (Section 3 above). Sam's context refresh picks up a
   summary of the canonical rules alongside its existing Drive map. Sam never edits `jewell-os`.
2. **Decisions flow from the work Sam does, one way, into the decision log.** When Sam executes
   something under a standing approval (the same carve-out this OS's constitution already
   recognises — a human-approved routine executes on schedule, the operator reviews the output),
   the outcome is logged. Practically: Sam's existing `#sam-operations` channel rule ("any
   structural Drive change must be logged") extends to also note it in `06-memory/decision-log.md`
   for anything that touches the shared, non-personal layer. Personal-layer actions stay in Sam's
   own private memory and never reach this repo — same rule as everywhere else in this OS.

**What this buys:** Sam keeps its full autonomy and speed on personal/life-admin work (where it
already excels), while everything it does on the *shared, work* side of the boundary becomes
visible in the one place the team already looks — the decision log and the Today door — without
Sam ever needing write access to GitHub, and without `jewell-os` needing access to Sam's private
memory.

### Key finding: a likely duplicate daily brief — needs your call

The Today door built this week posts to **#sam-command-centre at 7:00am weekdays** (via a Claude
Code Remote scheduled routine, reading Calendar + Asana). Sam's own documented calendar
description says **Sam already posts a prep note to #sam-command-centre at 8:30am**. Both target
the same channel, ~90 minutes apart, likely covering overlapping ground.

**Recommend one of:**
- **(a)** Retire Sam's 8:30am prep-note cron; the 7:00am Today door becomes the single daily brief,
  and Sam's richer context (client health, deal flow) feeds into it as an input rather than a
  second post. *(Cleanest — one brief, one source.)*
- **(b)** Keep both, explicitly labelled: 7:00am is the calendar/task Today door, 8:30am is Sam's
  deeper business-context brief (deals, client risk) — retitle Sam's post so it reads as a
  complement, not a duplicate.
- **(c)** Merge: have the Today door script call into Sam's existing context (or vice versa) so one
  post at one time carries both. *(Best long-term, more build effort.)*

This needs your word before either automation changes — I have not touched Sam's cron.

---

## 4a. Sam (OpenClaw) cron review and migration plan (added 10 July 2026)

*Run as a Fable-orchestrated review: parallel Sonnet research (repo docs, live Claude Code
Remote routines, live Slack verification), a Fable synthesis pass, and an independent Opus
adversarial check before anything below was drafted. The Opus pass caught a real feasibility gap
(the Drive connector has no append/update operation) and a constitution-consistency issue
(build-approval is not the same as go-live approval) — both are reflected below, not glossed over.*

This review covered roughly two dozen automations across Sam's cron surface, the live Claude Code
Remote routines, and the approved-but-unbuilt items in the decision log. The honest headline is
that most of Sam's crons should stay exactly where they are: the Mac Mini cluster (watchdogs,
health checks, model reset, private-layer jobs) is non-migratable for hard reasons — Claude Code
Remote cannot reach Sam's filesystem, launchd, gateway or private memory; the Gmail connector
cannot delete; and private-layer work must never cross onto a shared surface. Event-triggered
automations are also structurally stuck on Sam, because Claude routines are clock-only. Sam's
Gemini-Flash cost profile is the standing economic test: migrating a purely mechanical cron onto a
full Claude session is a cost regression unless Claude-side capability (GitHub, connectors) is
actually required.

What should move is small but high-value, led by the Drive→GitHub rules-summary sync — the one job
Sam is forbidden by the OS to do (it requires reading `jewell-os` directly) and whose Sam-side
attempt has failed nightly since at least 27 June. Feasibility constraint from the Opus check:
Claude's Drive connector can create and copy files but cannot update or append, so the sync must
write a sibling file (for example `JEWELL-OS-RULES.md`) that Sam's own nightly refresh folds into
`OS-CONTEXT-BUNDLE.md` — the sibling-file pattern is the required design, not an option, and the
two jobs must be sequenced so the fold-in runs after the sibling file lands, avoiding a lost-write
race on the shared file.

| Automation | Current owner | Recommendation | Rationale | Risk tier | Confidence |
|---|---|---|---|---|---|
| Drive→GitHub rules-summary sync (nightly summary of AGENTS.md/00-governance into Sam's boot context) | Sam (failing nightly cron in #sam-build); documented as Tier 2 build task | Migrate to Claude — `0 16 * * *` (2:00am AEST) | Strongest case on the list: the producer must read jewell-os, which the OS forbids Sam from doing, and the Sam-side attempt has failed every night since at least 27 Jun. Claude has GitHub and Drive access. Required design: write a sibling file (e.g. JEWELL-OS-RULES.md) via create_file — the Drive connector has no append/update — with Sam's refresh folding it in; sequence the two jobs to avoid a lost-write race. Retire the failing Sam cron once live. | Tier 2 | Medium (rationale strong; write path unverified until build) |
| 8:30am prep-note to #sam-command-centre | Sam | Retire (duplicate) | Duplicates the 7:00am Today door in the same channel. Retirement approved 2026-07-10, handed to Ronnie. Slack shows no live 8:30am post, so it may already be dormant — Ronnie to confirm the cron is actually removed, not merely not firing. Sam's business context should feed the Today door as an input per Section 4 option (a) above. | Tier 1 | High |
| Sam-side 7:00am daily Xero Daily Finance Brief in #sam-financial-controller | Sam (inferred — fires daily incl. weekends; matches no live Claude cron) | Retire (duplicate) — pending verification and Clent's call | Newly identified: lands 30 minutes before Claude's 7:30am finance pulse in the same channel, covering overlapping receivables/payables/net-position ground. First confirm the poster's identity, then put retire-vs-merge to Clent — unlike the 8:30am note, this has no decision-log entry yet. | Tier 1 | Medium |
| Today door (7:00am NSW weekday brief) | Claude Code Remote (live, `0 21 * * 0-4`) — verified posting | Already migrated — keep | Verified live (most recent run 9 Jul ~7:04am AEST). Only action is the October DST retime (see note below). Runs under existing standing approval; read-only except the Slack post. | Tier 1 | High |
| Today door finance-dashboard runway line | Approved build (decision log 2026-07-08), not yet live | Migrate to Claude — amend the existing Today door prompt, not a new routine | A feature of a routine Claude already runs; Xero connector sources a read-only runway line. Standing approval exists; confirm the line stays categorical and read-only in a shared channel. | Tier 1 | High |
| Circleback daily meeting sweep (4:00pm, proposal-only) | Approved build (decision log 2026-07-08); likely not yet built | Migrate to Claude — `0 6 * * *` | The Circleback connector lives on the Claude side. Sweeps the day's meetings and proposes (never creates or sends) actions, per the propose-then-approve constitution. Build approval is logged, but per the constitution a new standing routine still needs Clent's one-word go before it fires unattended — go-live is gated on that. Confirm with Ronnie/Raef that no parallel Sam-side build has started. | Tier 2 | Medium |
| Monthly Asana hygiene routine (1st of month) | Claude Code Remote (live, `0 21 1 * *`) | Already migrated — keep | Live routine matches the documented spec and the approved 1 Aug 2026 start. Runs under the standing approval logged 2026-07-10; auto-fixes limited to safely reversible items. | Tier 2 | High |
| Claude finance suite (daily pulse, Thursday review prep, monthly close) | Claude Code Remote (three live routines) | Already on Claude — keep | No migration question; listed for completeness. The daily pulse is one half of the 7:00am/7:30am duplicate pair above. Weekday crons share the October DST consideration. | Tier 1 | High |
| 12:30pm Thursday cash-position snapshot | Sam per Section 6.6 — existence unverified | Needs more information | Slack shows no delivered ~12:30pm post, only a calendar expectation. Confirm whether the job exists and whether Nicole's 1pm review consumes it. If it exists, likely fold into Claude's Thursday review-prep routine (retimed nearer the meeting, e.g. `0 2 * * 4`) rather than keep a fourth finance job. Cannot recommend retiring something unconfirmed. | Tier 1 | Medium |
| Nightly Drive context refresh (OS-CONTEXT-BUNDLE.md / 00-MASTER-INDEX.md) | Sam (verified healthy via weekly OS health monitor) | Keep on Sam | Sam's own boot context, coupled to Sam's context-load cycle; the sensitive-areas pointer section needs Sam's local knowledge of the private layer. Mechanical Gemini-Flash-class job, verified working. Only the failing GitHub-facing piece moves (rules-summary row); this refresh gains a fold-in step for the sibling rules file. | Tier 1 | High |
| Business-context memory extracts to Drive (sanitised MEMORY.md snapshots) | Sam | Keep on Sam | Source is Sam's private, local-only working memory; sanitisation must happen inside the private boundary, at the source. Migration would invert the OS's core boundary rule. Structurally non-migratable. | Tier 2 | High |
| Boot-loop watchdog | Sam (Mac Mini / launchd) | Keep on Sam | Recovers the gateway process itself; a watchdog outside the machine it guards cannot restart anything. Non-migratable by definition. | Tier 1 | High |
| Stuck-session watchdog | Sam (Mac Mini / launchd) | Keep on Sam | Needs local session visibility and kill/restart authority. The duplicate-heartbeat symptom (four identical polls per 30-minute slot) is a Mac-Mini-side bug for Ronnie/Raef, not a migration signal. | Tier 1 | High |
| 10pm nightly reset to Sonnet | Sam (Mac Mini) | Keep on Sam | Edits local gateway model configuration, unreachable remotely, and load-bearing per Sam's own docs. Not to be touched except by Raef/Ronnie locally. | Tier 1 | High |
| 2:50am daily health check | Sam (Mac Mini) | Keep on Sam | Checks local disk and verifies local restarts — physically impossible remotely, and a textbook mechanical job in any case. | Tier 1 | High |
| Nightly Gmail bulk-delete sweep (~1:00am) | Sam (verified via Slack run logs; undocumented in repo) | Keep on Sam | Claude's Gmail connector is read/label/draft only — it cannot delete — and bulk deletion fits Sam's cost profile. Separate finding: a destructive nightly job should not exist only in Slack run logs — add it to the documented inventory and confirm standing approval in the decision log. | Tier 2 | High |
| Personal-layer email sync job and 3:30am Legal Sync Watchdog alert | Sam (verified active; watchdog fired again this morning) | Keep on Sam | Personal-layer work, categorical only; must stay inside Sam's private layer. Separately, watchdog firings on 27 Jun, 8 Jul and 9 Jul indicate the underlying sync job is failing repeatedly — a reliability fix for Ronnie/Raef, not a migration. | Tier 3 | High |
| Weekly OS health monitor (Sunday, #sam-clent) | Sam (verified 28 Jun, 5 Jul) | Keep on Sam | Monitors Sam's own local stack; only a local vantage point can see gateway health and RAG-crawl freshness. It is also the tool that verified the Drive refresh is healthy. | Tier 1 | High |
| OpenClaw Weekly Update Check | Sam (verified; repeatedly killed by a colliding gateway restart) | Keep on Sam | Inherently local — it checks the local install. Fix is trivial and local: Ronnie/Raef retime the cron or the restart window. | Tier 1 | High |
| New client onboarding (proposal won → Slack + Drive folders + Asana project) | Sam | Keep on Sam | Event-triggered; Claude routines are clock-only, and polling would add latency and burn sessions on empty checks. Sam executes this well. The Tier 2 commercial sign-off gate is process, not tooling, and stays regardless of owner. | Tier 2 (creation itself Tier 1) | High |
| Website leads → Asana opportunity + Slack notify | Approved build (decision log 2026-07-08); secret-gated with email fallback | Keep on Sam | Event-driven (webhook-shaped); the always-on listener must live where one exists — Sam, or arguably a Cloudflare Worker given the site already runs there (raise with Raef). A polling routine would add up to an hour of lead-response latency. | Tier 2 | Medium |
| #sam-operations structural-change logging (+ decision-log extension) | Sam | Keep on Sam | Triggered by Sam's own actions — the logger must live where the actions originate. The extension is a rule change for Sam's behaviour, executed locally by Ronnie/Raef; not a schedulable job. | Tier 1 | High |
| Friday close and washback | Human-run, calendar-scheduled | Offer partial migration — drafting step only, `0 5 * * 5` (3:00pm AEST Friday) | Deliberately a human ritual; only the pre-assembly of the close scaffold (wins, slips, waiting-on, decisions) is a candidate, with every approval staying human. Put to Clent as an offer, not a plan. The washback filing itself is not automated under any option. | Tier 2 | Low |
| Monthly security review | Human-run against the starter-stack checklist | Migrate the scheduled half — `0 0 15 * *` (mid-month, offset from the Asana hygiene routine) | The sweep can run the checklist against everything Claude can see and produce findings plus a Mac-Mini-local checklist for Ronnie/Raef. The change-triggered half cannot migrate and stays a human obligation. All findings remain Tier 3 human-gated — the routine reports, never remediates. Needs Clent's go as a new standing routine. | Tier 3 | Medium |
| Model routing policy (Sonnet interactive / Gemini Flash mechanical) | Sam (standing rule, load-bearing) | Keep on Sam — not a job | A configuration rule, not a schedulable job, and the economic test every migration here must pass. Any change is Tier 3 and goes through Raef/Ronnie locally. | Tier 3 (to change) | High |
| Fable/Opus orchestration → lightest-capable-model delegation | jewell-os governance (standing rule, decision log 2026-07-08) | Keep — not an automation | An OS-wide rule governing both sides; nothing to migrate or retire. Recorded so the inventory is complete. | Tier 1 | High |

**Daylight-saving note (October review item):** all AEST-anchored UTC crons shift when NSW DST
starts in October — the Today door and finance-suite weekday jobs as already flagged, and also the
proposed Circleback sweep (`0 6 * * *`) and rules-summary sync (`0 16 * * *`), which would drift an
hour later in local terms. Low operational impact for the overnight jobs; retime or accept at the
October monthly review.

### What needs Clent's go

- Rules-summary sync — new standing routine (sibling-file design, 2:00am AEST); one-word go before
  it fires unattended.
- Circleback 4:00pm sweep — build approval is logged, but go-live as an unattended standing routine
  still needs the one-word go, per the constitution.
- Retire-vs-merge call on the Sam-side 7:00am Xero brief, once the poster is verified — this
  duplication has no decision-log entry yet.
- Monthly security sweep (15th, 10:00am AEST) — new standing routine, report-only.
- Friday close pre-draft — an offer, not a plan; only if Clent wants the ritual pre-assembled.

### What needs Ronnie/Raef (Mac Mini access)

- Confirm the 8:30am prep-note cron is actually removed from Sam, not merely dormant (retirement
  approved 2026-07-10).
- Verify the poster identity of the 7:00am Xero brief, and confirm whether the 12:30pm Thursday
  snapshot job exists at all.
- Fix the duplicate-heartbeat bug (four identical polls per 30-minute slot) — stuck-session
  watchdog territory, local.
- Fix the repeatedly failing personal-layer sync behind the Legal Sync Watchdog alerts (27 Jun, 8
  Jul, 9 Jul).
- Retime the OpenClaw Weekly Update Check or the restart window so they stop colliding.
- Document the nightly Gmail bulk-delete sweep in the repo inventory and confirm its standing
  approval in the decision log.
- Sequence Sam's nightly Drive refresh to fold in the sibling rules file after the Claude sync
  lands; retire the failing GitHub-register cron once the replacement is live; confirm no parallel
  Sam-side Circleback build has started.

---

## 5. Slack — full setup review

### What was audited
42 channels enumerated across four search passes (channel type: public + private), plus
membership checks on 8 operationally significant channels. This is a strong sample, not
necessarily every channel in the workspace — a full enumeration can be completed on request.

### The taxonomy already in use (mostly good, worth formalising)
| Prefix | Pattern | Examples found |
| --- | --- | --- |
| `#client-*` | One channel per active client, auto-created by Sam | `#client-btc`, `#client-maxxim`, `#client-circl`, `#client-undisputed`, `#client-pottsville-acupuncture` |
| `#sam-*` (work) | Sam's operational and functional channels | `#sam-command-centre`, `#sam-operations`, `#sam-clients`, `#sam-accounts`, `#sam-financial-controller`, `#sam-deals`, `#sam-build`, `#sam-raef`, `#sam-people` |
| `#sam-*` (routing) | External-channel bridges into Slack | `#gmail`, `#whatsapp`, `#messenger`, `#phone-messages`, `#sam-ingest` |
| `#sam-*` (personal layer) | Correctly restricted to Clent, Ronnie and Liz (Ronnie's named back-up) in every case checked | see below |
| Named individual | Per-person coordination channel | `#sam-raef`, `#sam-liz`, `#sam-ronnie`, `#sam-rao`, `#sam-brent` |
| Legacy/undocumented | No topic or purpose set | `#jewell-tyres`, `#sam-rao`, `#claude-sam` |

### Boundary check — resolved
Personal-layer channels identified: 8. The one channel with a third member beyond Clent and Ronnie
(Sam's own documentation describes it as "personal/action") is **confirmed intentional, not a
gap:** Clent named Liz as Ronnie's back-up across the private layer on 10 July 2026, precisely so
it is never a single point of failure. The private audience everywhere in this OS is now Clent,
Ronnie, and Liz — not Clent alone. No Slack membership change is needed; this line originally
flagged it as a risk in error.

A second, smaller finding: one business finance channel's stated purpose mixes business cashflow
tracking with a personal/family legal-matter tracking item. Recommend splitting that channel's
scope the same way "Personal To do" was split in Asana — business stays, the personal tracking
item moves to the already-existing personal cluster.

### Recommended channel description standard (for every channel, going forward)
Every channel — new or existing — should have a **Topic** (one line, searchable) and a **Purpose**
that states: what it's for, what it's not for, and which layer it belongs to (work / personal /
client / routing). Most Sam-created channels already do this well; the legacy/undocumented ones
(`#jewell-tyres`, `#sam-rao`, `#claude-sam`) should get one before they're relied on further.

### Proposed structure going forward
- **Keep** the `#client-*` auto-creation pattern — it already mirrors the Drive `08. Clients/`
  folder and should be the canonical client-onboarding trigger (Section 6).
- **Keep** the personal `#sam-*` cluster exactly as is, after the one membership fix above.
- **Consolidate** routing channels (`#gmail`, `#whatsapp`, `#messenger`, `#phone-messages`) under a
  clear "inbound routing, not a store of truth" label — they already function this way; just name
  it so no one mistakes them for a record.
- **Retire or document** the three undocumented channels.
- **Resolve** the daily-brief duplication (Section 4) before adding anything else to
  `#sam-command-centre`.

---

## 6. End-to-end workflows and automations

Each workflow: trigger → tools touched → output → approval gate.

### 6.1 New client onboarding *(already mostly automated — formalise it)*
**Trigger:** a proposal is won.
**Chain:** Sam creates `#client-[name]` in Slack → Drive gets `08. Clients/[Client]/` with the six
3D-Process subfolders → an Asana project is created from the standard template → the engagement
owner is added to all three.
**Output:** a ready-to-work client space in under a minute, matching Drive, Slack and Asana 1:1.
**Gate:** Tier 2 — scope and commercial terms need Clent's sign-off before the client sees anything;
the channel/folder/project creation itself is Tier 1 (internal, reversible).

### 6.2 Today door *(live, pending the duplication fix in Section 4)*
**Trigger:** 7:00am weekdays, scheduled.
**Chain:** Google Calendar (work calendar only) + Asana (incomplete, overdue, blocked) → assembled
per `starter-stack/.../today-door.md` → posted to `#sam-command-centre`.
**Output:** the daily brief.
**Gate:** none to read (read-only); anything it flags for Clent routes to the 9:00 catch-up.

### 6.3 Meeting to actions
**Trigger:** a meeting ends (Daily Catch-Up, client call).
**Chain:** transcript or notes → the `jewell-meeting-to-actions` skill proposes owned, dated
actions → confirmed actions become Asana tasks in `Clent - 2026` or the client project → the note
files to the right Drive folder.
**Gate:** Tier 1 for internal actions (task owner confirms); Tier 2 if a proposed action is
client-facing.

### 6.4 3D Process delivery (Discover → Design → Deploy → Deepen)
**Trigger:** a Discover kickoff.
**Chain:** ABC inputs → Discover pack (`02. Discover/`) → Design drafts, gated (`03. Design/`) →
engagement owner promotes to approved → Deploy (`04. Deploy/`) with Asana tracking → Deepen signals
captured continuously, washed back only at weekly/monthly review.
**Gate:** every promotion from draft to approved needs the engagement owner; anything client-facing
needs Clent per the existing rule.

### 6.5 Weekly rhythm — Monday reset, Friday close, washback
**Trigger:** calendar-scheduled. *(Friday close and washback are templated and ready; the Monday
reset is parked until the weekly rhythm is built — see `OPERATING-SYSTEM.md` Section 12.)*
**Chain:** Friday close (wins, slips, waiting-on, decisions) → washback (signals → proposed changes,
each tagged fact/assumption, tier, evidence) → Clent approves, corrects or rejects each → approved
items route to `06-memory/decision-log.md` or the relevant SOP.
**Gate:** Tier 2 throughout — the washback is a proposal engine, never a self-editing one.

### 6.6 Weekly Finance Review
**Trigger:** Thursday, calendar-scheduled (already running, per the calendar audit).
**Chain:** Xero (or the finance workflow) → Sam's cash-position snapshot at 12:30pm →
`#sam-financial-controller` (business finance, Clent+Ronnie only, no Liz access per its own
purpose statement) → the 1pm review with Nicole.
**Gate:** human-run; no automation proposed beyond the existing snapshot.

### 6.7 Security review
**Trigger:** monthly, or triggered by a change to access, connectors, or answering rules.
**Chain:** the `starter-stack/02-starter-packs/security/` checklist → findings → Clent sign-off on
anything touching permissions or credentials.
**Gate:** Tier 3 for any actual permission or credential change.

### 6.8 Ask Jewell AI / client portal answers *(parked — needs the live endpoint)*
**Trigger:** a client or prospect asks the portal something.
**Chain:** approved source material only → cited answer → escalate if uncertain.
**Gate:** not yet live; the eval fixtures in `starter-stack/02-starter-packs/evals/` are ready to
run once the endpoint is wired (Raef's build lane).

### 6.9 Decision capture *(live)*
**Trigger:** any binding call, by anyone, at any point in the above.
**Chain:** logged in `06-memory/decision-log.md` the moment it is made, tagged fact / assumption /
recommendation / decision.
**Gate:** none to log a decision; the decision itself carries whatever gate applies to its content.

---

## 7. What needs you, ranked by value

| # | Item | Why it matters | Tier |
| --- | --- | --- | --- |
| 1 | **Resolve the duplicate daily brief** (Section 4) | Two systems posting similar briefs 90 minutes apart, same channel | Your call — pick (a), (b) or (c) |
| 2 | **Review the one flagged personal-channel membership** (Section 5) | Same pattern as the Asana fix; a personal-layer channel may have a non-Ronnie member | Tier 3 — your review |
| 3 | **Split the mixed business/personal finance channel** (Section 5) | Same fix as "Personal To do" in Asana, one layer over | Tier 2 |
| 4 | **Approve the Drive→GitHub rules-summary sync** (Section 3) | Small addition to a cron Sam already runs; closes the two-systems risk | Tier 2 — Ronnie/Raef build |
| 5 | **Retire the proposed parallel Drive OKF structure** in `OPERATING-SYSTEM.md` Section 6, adopt the real one | Avoids building something that already exists | Tier 1 — I can make this edit now if you agree |
| 6 | **Describe the three undocumented Slack channels** | Small hygiene item | Tier 1 |

**Next:** your read on item 1 and 2 first — everything else can proceed in parallel.
