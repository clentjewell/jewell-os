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
| `#sam-*` (personal layer) | Correctly restricted, Clent (+Ronnie) only in every case checked bar one | see below |
| Named individual | Per-person coordination channel | `#sam-raef`, `#sam-liz`, `#sam-ronnie`, `#sam-rao`, `#sam-brent` |
| Legacy/undocumented | No topic or purpose set | `#jewell-tyres`, `#sam-rao`, `#claude-sam` |

### Boundary check — the finding that matters most
Personal-layer channels identified: 8, all Clent-only or Clent+Ronnie-only, matching the boundary
rule — **with one exception worth a second look.** One personal-adjacent channel (Sam's own
documentation describes it as "personal/action") currently includes a third member beyond
Clent and Ronnie. This mirrors the exact pattern found and fixed in Asana this week (a work-only
member on a personal board). **Recommend the same fix: review that one membership and remove the
third party if the channel is meant to stay personal-only.** I have not changed any Slack
membership — this needs your review, the same way the Asana one did.

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
