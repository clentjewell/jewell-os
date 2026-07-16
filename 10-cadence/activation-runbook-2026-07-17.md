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
3. Review `06-memory/proposed-decisions-2026-07-16.md` — each row moves into the decision
   log on your word, then the staging file is deleted.

## 1. Make it safe (Ronnie executes on Clent's word; ~40 min) — Tier 3

| # | Action | How | Check |
| --- | --- | --- | --- |
| 1a | Remove the exposed private-deck line from "Clent - 2026" notes | Asana → project → edit description field (UI only; no API can) | Re-read field: clean |
| 1b | Rotate the Tavily token | tavily.com dashboard → API keys → regenerate; update n8n credential store if still used | Old key dead |
| 1c | Archive the 2 legacy n8n JSONs out of shared Drive | Move `AI Mate.json` + `Linkedin Post generation.json` from `02 AI & Systems/03 AI Agents` to a restricted archive folder | Files gone from shared tree |
| 1d | Rotate the GitHub PAT (pasted in 2 chats) | GitHub → Settings → Developer settings → Personal access tokens → revoke + regenerate | Old token dead |
| 1e | Disconnect Cloudflare Workers Builds from both Life OS repos | Cloudflare dash → Workers → `jewell-os` service → Settings → Builds → disconnect repo; same for `clent-jewell-personal` | Next repo push triggers no build |
| 1f | Rotate the private deck's gate password; review the other 11 shared in chat | Wherever each worker's gate is set (env/secret per worker) | New gates live |
| 1g | Gate or remove the live `/3d-process` pack on the Maxxim site | Raef: comment the route or add access gate; redeploy | URL returns gate/404 |
| 1h | Flip the maxxim repo private | GitHub → maxxim → Settings → Danger zone → change visibility | Repo shows private |

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
| **Nightly Life OS refresh (3:00)** | **Create new** per `10-cadence/nightly-life-os-refresh.md` | GitHub, Drive, Slack |

Per routine: create → open its chat → enable ONLY that row's connectors (already
org-authorised; no new grants) → run once manually → confirm the post lands. Sam's crons
stay off.

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
  re-pointed at the repo; personal delta addendum; Sam artefact rescue; maxxim
  strategy-docs split per the audit table.
- **The 3 proof clients**: IHG page fixes then send via Neil; the Adam Hall call (Clent,
  this week — it ages daily); BTC brief restored and dashboard synced.
- **Next week**: Sam v2 Phase 1 scaffold PR; Meta Ads MCP + capped pilot once the relight
  holds a week.

## If anything surprises you

Stop and ask, in this session. AI proposes, humans decide — including tomorrow.

Next: Step 0, together, with coffee.
