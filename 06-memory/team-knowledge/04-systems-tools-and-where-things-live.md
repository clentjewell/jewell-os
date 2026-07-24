# Systems, Tools & Where Things Live

## Google Drive — the shared drive map

Canonical entry point: **"Jewell Drive — Master Index"** (04 Intelligence →
06 Master Index & Navigation), auto-regenerated nightly. Root structure:

| Folder | Purpose |
| --- | --- |
| `00 Inbox - Sort Weekly` | Unsorted landing zone, cleared weekly |
| `01 Clients` | One subfolder per client, standard 3D shell (00 Admin … 99 Archive); plus `_Prospects` and `_Old Clients` |
| `02 Jewell Group` | Jewell's own brand & identity, website, social, templates, presentations, training, media |
| `03 Administration` | Finance, people & team, policies & governance, meetings, forms & inbound, engagements |
| `04 Intelligence` | Strategy & direction, AI & systems, knowledge base, meeting notes, master index |
| `05 Personal` | Private — do not touch, excluded from all team/AI use |
| `06 Own Projects` | Jewell IP: Maxxim, PetZip, Jewell Tyres, Memoir Maker, estimator, VMT |
| `99 Archive` | Legacy / closed |

Conventions: every folder carries a `_README - NN Name` doc (Purpose / Owner /
Access / Should contain / Should not contain); documents use the 3D artefact
codes (D0x, DS0x, DD0x, IB, KH00, P0x); each client has a KH00 Knowledge Hub
index as its front door. The Drive runs on an "OKF" (Open, Keyed, Findable)
operating philosophy defined in the Drive Operating System SOP (04 Intelligence).
Client-specific proposals and sign-off packs live in that client's `00 Admin`,
not in Administration.

## Slack — channel directory (jewell-projects.slack.com)

**Client channels** (private, one per client): `#client-btc`, `#client-ewu`,
`#client-adam-hall`, `#client-maxxim`, `#client-meridian`, `#client-circl`,
`#client-undisputed`, `#client-pottsville-acupuncture`, `#sam-walter-wealth`,
`#jewell-tyres`. Portfolio-level health/risk rollup: `#sam-clients`.

**Production channels** (public, discipline-specific request lanes):
- `#prod-strategy` — GTM/commercial planning
- `#prod-brief` — turns a brief into an executable per-channel plan
- `#prod-copy` — ads/web/email/proposal copywriting
- `#prod-design` — design briefs, brand compliance review
- `#prod-video` — scripts, shot lists, edit briefs
- `#prod-decks` — deck builds (Canva/Gamma/Slides per brief)
- `#prod-web` — website design & development
- `#prod-social-media` — social scheduling/publishing

**Sam / operations channels**: `#sam-command-centre` (daily brief, triage,
urgent flags — the cockpit), `#sam-operations` (SOPs, cron health, Drive/Asana
mutation logs), `#sam-operations-group`, `#sam-build` (Sam's own config),
`#sam-own-projects` (Jewell IP work), `#sam-ingest` (data intake),
`#sam-people` (team/HR coordination), finance lanes (`#sam-accounts`,
`#sam-financial-controller` — role-restricted), `#sam-deals` (deal flow), and
per-person channels (`#sam-ronnie`, `#sam-liz`, `#sam-rao`, `#sam-brent`,
`#sam-raef`, `#sam-clent`).

**Comms bridges** (external channels funnel into Slack; urgent items cross-post
to the command centre): `#gmail`, `#whatsapp`, `#messenger`, `#phone-messages`.
Rule: Slack is the primary channel; WhatsApp is redundancy that should triage
back to Slack.

**General**: `#full-team-general` (team coordination), `#all-jewell-projects`
(announcements), `#meeting-notes` (auto-ingested Circleback meeting notes).

A small number of personal channels exist and are Clent-only; they are out of
scope for this project.

## Sam — the AI operations agent

**Sam ⚡** is Jewell's autonomous AI ops layer, built on the **OpenClaw**
framework, running on a Mac mini, posting across Slack as the "Sam" bot. What
Sam does: weekday ~7am daily briefs in `#sam-command-centre` (meetings, Asana
due/overdue, "needs Clent" items, risk flags) with a next-day self-audit;
cron/system health monitoring; structured Drive/Asana mutation logging in
`#sam-operations`; SOP creation and enforcement (e.g. mandatory "Site by
Jewell" footer on every shipped website); client environment provisioning
(`scaffold-client.js`).

**Operating rules** (canonical, locked 25 June 2026): human-facing channels
always run on Claude Sonnet; Gemini Flash is background-crons only; never
switch a live session's model mid-conversation; secrets live in a keyfile,
never plaintext; nightly reset and watchdogs guard reliability. Cost lesson on
record: one runaway watchdog cron burned 23M tokens/week — kill runaway
background jobs before downgrading models. Token guardrails (13 July 2026):
Sonnet ceiling and Haiku background work enforced by config allowlist, plus a
capped Sam workspace in the Anthropic Console — see
`00-governance/sam-token-guardrails.md`.

**Guardrails**: Sam never sends externally, pays, or takes legal action without
Clent's explicit "send it"; it drafts and proposes only.

**Direction of travel** (July 2026 "Jewell operating playbook" plan): Sam's
cron/watchdog duties move to scheduled Routines in the Claude Teams workspace;
a private `jewell-os` repo becomes the canonical playbook home (AGENTS.md,
governance docs, skills like `jewell-meeting-to-actions`,
`jewell-client-intelligence-brief`, `maxxim-website-brief-builder`); a
memory-promotion rule applies — "Signal → weekly synthesis → proposed change →
human approval"; nothing promotes automatically. An official-MCP-servers-only
rule applies to connectors.

## GitHub — repo register (account `clentjewell`, all private)

Auto-generated nightly as "GitHub Project Register — Jewell AI". Key mapping:

| Repo | What it is |
| --- | --- |
| `jewell-ai` | Main Jewell website/platform (formerly Jewell Projects) |
| `jewell`, `website-development` | Earlier/adjacent site work |
| `3d-system` | 3D Process operating assets and Cowork plugin |
| `maxxim` / `maxxim-positioning` | Maxxim platform / internal positioning (do not share externally) |
| `jewelltyres`, `jewelltyres-stitch`, `jewell-tyres-im` | Jewell Tyres live site, Astro rebuild, investor IM deck |
| `pottsville-acupuncture-website`, `hastings-wellness-hub` | Pottsville / wellness hub builds |
| `beyondtheclinic` | BTC |
| `walterwealth` | Walter Wealth site |
| `paint-estimator` | AI painting estimator |
| `petzip` | PetZip |
| `ultimate-access-portal` | Ultimate (Spencer) portal |
| `assurant`, `assurant-presentation` | Assurant pitch (parked, Jan 2027) |
| `antigravity-otrearthmovers`, `antigravity-jewelltyres` | OTR/Jewell Tyres experiments |
| `christy-jewell-partnership-deck` | Christy partnership deck |
| `jewell-health` | Personal Health OS (personal, out of scope) |
| `jewell-finance` | Finance tooling |
| `spark-ui-builder`, `video-prod`, `claude-test`, `clent-jewell-personal`, `maxxim` pilots | Tooling/experiments |
| `openclaw/openclaw` | The OpenClaw agent framework Sam runs on |

## Deploy & tool stack

- **Websites**: built with Claude Code → **Cloudflare Pages/Workers**
  (`wrangler deploy` / `wrangler pages deploy`), custom domains via Cloudflare
  DNS, **Resend** for transactional email, **GA4** for analytics. Every shipped
  site carries a "Site by Jewell" footer link (SOP).
- **Delivery system of record**: **Asana** (projects, tasks, artifact registry).
- **Meetings**: **Circleback** transcription → `#meeting-notes` → action items.
- **Finance**: **Xero** + Google Sheets cashflow tooling (see the processes file).
- **Other tools in use**: Google Workspace, Canva/Adobe/Firefly/Midjourney
  (design), Lovable/Cursor/Webflow (web), Go High Level, Klaviyo/Mailchimp
  (email), HubSpot (CRM seam), Gamma (decks), Wildjar, Namecheap, WPMUDEV.

## Working conventions worth knowing

- One private Slack channel per client; production requests go to the right
  `#prod-*` lane; `#sam-command-centre` is for judgment/triage,
  `#sam-operations` for mechanical logs.
- Never store credentials in Docs, Asana, or Slack — secrets belong in the
  managed keyfile/secret store.
- Personal, legal, and health material never sits on shared, AI-crawled
  surfaces (charter rule).
- Document naming: `JP_Client_DocumentType_vXX` legacy pattern; current
  practice keys off the artefact codes and descriptive titles (the Knowledge
  Base is a primary retrieval source for agents — title things descriptively).
