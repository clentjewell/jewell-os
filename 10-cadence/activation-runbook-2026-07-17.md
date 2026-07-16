# Activation runbook — Thursday 17 July 2026

The morning working session for Clent and Ronnie. Review the plan, modify, approve, then
execute top to bottom. Every action states its owner, its gate and its check. Companion:
the plan page (artifact "Jewell OS — The Plan", v3.0) and `LIFE-OS.md`.

Timebox: 90 minutes to review and clear Steps 1–2. Steps 3+ run on their own dates.

## 0. Review and approve (Clent + Ronnie, 20 min)

1. Read the plan page together. Correct anything that reads wrong — especially the funnel
   gradings and the tool verdicts (Ronnie sees the traffic).
2. Approve the sequence, or reorder. The words to use: "approved" for the plan,
   "do it" per step.
3. Review `06-memory/proposed-decisions-2026-07-16.md` — approved rows move into the
   decision log on your word. Rows 2–3 log only after Steps 1–2 confirm; the staging file
   is deleted after that, not at Step 0.

## 1. Make it safe (on Clent's word; ~40 min) — Tier 3

Owners per row below. Rows 1g–1h are Raef's (Maxxim side) — if he is not available at
9am they queue for the same day and do not block the sitting.

| # | Action | Owner | How | Check |
| --- | --- | --- | --- | --- |
| 1a | Remove the exposed private-deck line from "Clent - 2026" notes | Ronnie | Asana → project → edit description field (UI only; no API can) | Re-read field: clean |
| 1b | Rotate the Tavily token | Ronnie | tavily.com dashboard → API keys → regenerate. The dead token remains in the files 1c archives — harmless once rotated | Old key dead |
| 1c | Archive the 2 legacy n8n JSONs out of shared Drive | Ronnie | Move `AI Mate.json` + `Linkedin Post generation.json` from `02 AI & Systems/03 AI Agents` to a restricted archive folder | Files gone from shared tree |
| 1d | Rotate the GitHub PAT (pasted in 2 chats) | Clent | GitHub → Settings → Developer settings → Personal access tokens → revoke + regenerate | Old token dead |
| 1e | Disconnect Cloudflare Workers Builds from both Life OS repos | Ronnie (or whoever holds Cloudflare admin) | Cloudflare dash → Workers → `jewell-os` service → Settings → Builds → disconnect repo; same for `clent-jewell-personal` | Next repo push triggers no build |
| 1f | Rotate the private deck's gate password first; then the other 11 chat-shared gates | Ronnie | Each gate lives in its Worker's settings: Cloudflare dash → Workers → the service (see the digital estate register for which asset maps to which worker) → Settings → Variables/Secrets. If a gate cannot be located, note it and move on — do not stall the session | New gates live; unlocatable ones listed |
| 1g | Gate or remove the live `/3d-process` pack on the Maxxim site | Raef | Comment the route or add an access gate; redeploy | URL returns gate or 404 |
| 1h | Flip the maxxim repo private | Clent or Raef (repo admin) | GitHub → maxxim → Settings → Danger zone → change visibility | Repo shows private |

## 2. Prune, re-home, relight the routines (Ronnie; ~30 min) — Tier 2

Work IN the Jewell Team account (check the workspace switcher first — not Personal Max).

| Routine | Call | Connectors to enable in its chat |
| --- | --- | --- |
| Morning brief (6:30) | Retire — duplicate of Today door | — |
| Finance: monthly close (2nd copy) | Retire one | — |
| Daily Today door (7:00) | Recreate under Team; fix the date bug; add the pipeline-attention section | Calendar, Asana, Slack |
| Finance: daily pulse | Recreate under Team | Xero, Gmail, Slack |
| Finance: weekly update | Recreate under Team | Xero, Drive, Gmail, GitHub |
| Nightly AI-intelligence sweep (2:30) | Recreate under Team | Slack |
| Daily Circleback sweep (4:00) | Recreate under Team | Circleback, Slack, Asana |
| Nightly Drive rules sync (2:00) | Retire — absorbed by the Life OS refresh | — |
| Monthly security review | Recreate under Team | GitHub, Slack, Asana, Drive |
| Monthly Asana hygiene (from 1 Aug) | Recreate under Team | Asana, Slack |
| **Nightly Life OS refresh (3:00)** | **Create new** per `10-cadence/nightly-life-os-refresh.md` — Ronnie creates from a Team session; Clent confirms the trigger before first fire | GitHub, Drive, Slack |

Per routine: create with **a fresh session per fire** (this is the fix for the failure
that darkened the system — never bind a routine to a long-lived chat) → open its chat →
enable ONLY that row's connectors (already org-authorised; no new grants) → run once
manually → confirm the post lands. **If a fire-test fails**: check the connector toggles
first, then the account (Team, not Personal), then stop and flag — do not stack retries.
Sam's crons stay off.

## 3. Queue the rest (5 min to schedule, then on their dates)

- **Friday 18 July, 45 min**: OKRs — reconcile the drafted `02-okrs` set with Jewell's own
  v3 OKR set (`objectives-key-results.html`: proof-led visibility; fix the income gap with
  2–3 warm retainers by end Q4; scale mechanism — 2 Client Partner principals in active
  conversation by 30 Sep; brand platform); economics stay "illustrative pending pilots".
  Then the budget sheet's 2 discrepancies; the time rules (kill-or-keep each recurring
  meeting, protect the deep-work blocks, weekly traffic review adopted); the own-projects
  portfolio split — noting the v3 canon already gates the partner motion behind 2 stable
  direct recurring clients, so the cash lane leads by doctrine, not preference.
- **This week**: jewell-ai strategy zip stripped (PR ready for the word); Claude project
  re-pointed at the repo; personal delta addendum; Sam artifact rescue; maxxim
  strategy-docs split per the audit table.
- **The 3 proof clients**: IHG — not yet sent: page fixes first (strip the 2 internal
  annotations, de-dash), then Clent's word, then it goes via Neil Hazelman on the 30-day
  clock; the Adam Hall call (Clent, this week — it ages daily); BTC brief restored and
  dashboard synced.
- **Walter Wealth case-study fixes** (proposed row 8): Sonnet drafts the copy fixes
  (canonical testimonial, Jewell naming, em dashes out), Rao applies, Clent's word to
  publish — this week. It is proof point 1 of the cleared set; keep it bulletproof.
- **Next week**: Sam v2 Phase 1 scaffold PR; Meta Ads MCP + capped pilot once the relight
  holds a week.

## If anything surprises you

Stop and ask, in this session. AI proposes, humans decide — including tomorrow.

Next: Step 0, together, with coffee.
