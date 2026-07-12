# The Jewell Life OS

**The single source of truth index for everything — work and personal.**
Status: live. Established 11 July 2026 on Clent's instruction. Maintained nightly.
Last refreshed: 2026-07-11 (initial build).

This file is the master index, not another manual. It sits at the top of the authority order
and points to exactly one home for every object. It fulfils the capstone role proposed in
`WORK-OS-PLAN.md` §6.5 and extends it across work and personal. If a rule and this index ever
disagree, fix the pointer — the rule wins in its own home.

## The system in one paragraph

Jewell is a human-led commercialisation business powered by Maxxim, run on a proprietary
3D Process (Discover, Design, Deploy, plus the Deepen loop). The whole operation — client
delivery, finance, intelligence, memory, cadence and the personal layer — runs as one operating
system: rules and playbooks in GitHub, files in Drive, actions in Asana, decisions in the
decision log, finance in Xero, and a private gated layer for everything personal. AI proposes,
a human decides; the strongest model orchestrates and the lightest capable model executes; the
system learns nightly and washes learnings back weekly.

## Authority order

1. `AGENTS.md` — canonical AI operating instructions. Always read first.
2. `00-governance/` — constitution, approval tiers, boundaries, roles.
3. This index — where everything lives and how it stays current.
4. The manuals — `OPERATING-SYSTEM.md` (canonical, 20 sections),
   `PLATFORM-OPERATING-SYSTEM.md` (execution layer; loses to the manual on conflict),
   `RONNIE-RUNBOOK.md` (deployment steps), `WORK-OS-PLAN.md` (proposed successor model).
5. Everything else in the folders below.

## The map — one home per object

| Object | Home | Notes |
| --- | --- | --- |
| AI instructions | [`AGENTS.md`](./AGENTS.md) | Portable across models; `CLAUDE.md` holds Claude-only notes |
| Governance and boundaries | [`00-governance/`](./00-governance/) | Constitution, approval points, work-personal gate, roles |
| Objectives and key results | [`02-okrs/`](./02-okrs/) | Work OKRs; personal OKRs live in the private repo |
| AI index (machine read-order) | [`AI-INDEX.md`](./AI-INDEX.md) | What any agent reads first, what it must never read outward |
| Skills | [`01-skills/`](./01-skills/) + `starter-stack/02-starter-packs/skills/` | Canonical copies in the starter stack for now |
| Connectors and MCP | [`04-mcp/`](./04-mcp/) | Scopes, risk register, least privilege |
| Evals and golden questions | [`05-evals/`](./05-evals/) | CI gate parked until the Ask endpoint exists |
| Memory | [`06-memory/`](./06-memory/) | Decision log, lessons, preferences, people, team knowledge |
| Intelligence inbox | [`06-memory/intelligence/`](./06-memory/intelligence/) | The one intelligence home; nightly sweep files here |
| CI and guardrails | [`07-github-actions/`](./07-github-actions/) | Target state defined; workflows not yet applied |
| Templates | [`08-templates/`](./08-templates/) | Structure only, never client data |
| Playbook (3D spine) | [`09-playbook/`](./09-playbook/) | Delivery stages, gates, Ask behaviour |
| Cadence | [`10-cadence/`](./10-cadence/) | Daily to annual rhythm; nightly Life OS refresh SOP |
| Finance OS | [`11-finance/`](./11-finance/) | Gated area — carries personal finance elements |
| Starter stack | [`starter-stack/`](./starter-stack/) | Portable kit: security, evals, skills, MCP packs |
| Files | Google Drive | Root: 00 Inbox, 01 Clients, 02 Jewell Group, 03 Administration, 04 Intelligence, 05 Personal, 06 Own Projects, 99 Archive |
| Actions | Asana | One work board: "Clent - 2026"; private board separate |
| Decisions | [`06-memory/decision-log.md`](./06-memory/decision-log.md) | Repo is master; Drive copy is a generated export |
| Calendar | Google Calendar | Feeds the Today door |
| Finance records | Xero | The finance OS prepares; humans pay and lodge |
| Meetings | Circleback → Drive | Daily 4pm sweep proposes actions |
| Secrets | Approved secret store only | Never in this repo, Asana, Slack, Docs or prompts |
| Personal layer | `clentjewell/clent-jewell-personal` + Drive `05 Personal` | Private audience only; see boundary below |

## Operating principles (the short list)

The full set lives in the constitution and `AGENTS.md`. The ten that govern everything:

1. AI proposes, a human decides — for anything external or irreversible. Standing-approved
   routines and system improvements are the two recorded carve-outs, always logged, always
   reversible.
2. One source of truth per object. A second master is a bug.
3. Least privilege, read-only first, secrets never in prompts or tools.
4. Client data never enters reusable Maxxim assets; one client never sees another's.
5. Personal content lives only behind the gate and never flows outward.
6. Day-to-day noise never overwrites long-term strategy — washback is the filter.
7. Maxxim never crowds the Jewell client experience.
8. Nothing is deleted — archive first, with approval.
9. Orchestrate high, execute low: Fable (or Opus) plans and reviews; the lightest capable
   model executes. Token efficiency never outranks the outcome. Every build ends with a
   check-and-fix pass.
10. Keep it simple. If a routine does not earn its keep, retire it.

## The learning loop — how this stays current and self-improving

| Rhythm | What happens | Where it lands |
| --- | --- | --- |
| Nightly (2:30am AEST) | Intelligence sweep: #sam-ingest drops + followed sources, captured and evaluated | `06-memory/intelligence/` |
| Nightly (2:00am AEST) | Drive rules-summary sync for Sam | Drive sibling file |
| Nightly (3:00am AEST) | **Life OS refresh** — new: sweeps the day's decisions, lessons, intelligence and OKR movement into this index and its stamps; flags drift; exports the human-readable edition | This file + `10-cadence/nightly-life-os-refresh.md` |
| Daily 7:00am | Today door brief | Slack |
| Daily 4:00pm | Circleback meeting sweep (proposal-only) | Intelligence inbox + Asana proposals |
| Weekly Friday | Close + washback: signals become proposed strategy changes; Clent approves | Decision log, memory |
| Monthly | OS scorecard (keep, improve, simplify, automate, delegate, retire), security review, model re-tier, Asana hygiene | `06-memory/`, findings to Clent |
| Quarterly | Access recertification, strategy, simplification, pricing | Decision log |

Self-learning rules: everything below strategy level improves directly under the standing
improvement directive (logged, reversible, vetoable). Strategy changes only move through
washback with Clent's word. New models are benchmarked at the monthly re-tier, never adopted
on launch-day vibes.

## Objectives

Current OKRs: [`02-okrs/OKRS-2026-H2.md`](./02-okrs/OKRS-2026-H2.md). Reviewed at the Friday
close; scored monthly; reset each half. Personal OKRs live in the private repo.

## The work at a glance

- **The engine**: the 3D Process — gated, Clent signs Gates 2 and 5; Asana boards double as
  the process structure. Tiers Good, Better, Best; entry product is the Discovery Sprint.
- **The live bets**: Pottsville (flagship, recurring), the ~$5K warm pipeline (Adam Hall,
  Meridian, Ultimate Nutrition), the Maxxim platform with Raef (Alex/3P ~36-client pipeline),
  and the Jewell Tyres raise via Christy.
- **The people**: Clent (architect, rainmaker, gates), Ronnie (operator), Raef (Maxxim
  co-owner, build), Liz (social, finance operator from 28 July, private-layer back-up),
  Nicole (finance handover), Rao (web), Sam (AI execution layer, being migrated), Christy
  (capital and referrals), Alex/3P (partner channel), Damian (tax). Personal-layer contacts
  are registered in the private repo.
- **The stack**: Google Workspace, Slack, Asana, Xero, GitHub (`clentjewell/*`), Claude
  (Teams, Code, Remote routines), Sam/OpenClaw on the Mac Mini (retiring), Circleback,
  Cloudflare, Gamma, Canva; n8n Cloud recommended for event-driven glue. Full current-state
  map in `OPERATING-SYSTEM.md` §4; verdicts in `WORK-OS-PLAN.md` §11.

## The personal layer

Work and personal are one integrated system — the business is a vehicle for the life. The
personal layer holds the north star, values, goals, tensions and decision protocol, and it is
gated: it lives in `clentjewell/clent-jewell-personal` (summaries and pointers) and Drive
`05 Personal` (full detail), audience Clent, Ronnie and Liz only. Inside this repo, the only
gated area is `11-finance/` (personal elements), per the register in
[`00-governance/work-personal-boundary.md`](./00-governance/work-personal-boundary.md).
Nothing personal flows into any outward surface, digest, pack or answer set. This index stays
categorical about it by design.

## Known gaps (honest list, from the 11 July sweep)

- **Flagged to Clent, same day**: live API keys in plaintext inside old n8n workflow exports
  in Drive `02 AI & Systems / 03 AI Agents` — rotate and re-home; and personal or legal
  references inside 3 shared crawled Drive docs (Master Index, Sam Operations Manual, the
  Stuart Carlaw doc) — moving them is Clent's Tier 3 call. Detail in
  `06-memory/intelligence/2026-07-11-drive-intelligence-sweep.md`.
- The nightly Life OS refresh routine is defined with standing approval but needs one
  interactive click to arm the schedule (see `10-cadence/nightly-life-os-refresh.md`).
- Drive duplication sprawl: 10 Sam Operations Manual variants, a triplicated Master Index,
  identical doc-plus-markdown pairs, and empty duplicate folder shells — cleanup proposals go
  to the Friday washback.
- Eval CI gate, Ask Jewell AI endpoint and portals: parked until the endpoint exists.
- `07-github-actions/` guardrails defined but not yet applied; branch protection pending.
- `08-templates/`, `09-playbook/`, `01-skills/` are thin scaffolds; content lives inline or
  in the starter stack.
- Sam's local intelligence artifacts must be rescued off the Mac Mini before decommission.
- DST will shift every AEST-anchored cron in October — retime at the October review.
- `maxxim` repo visibility, partner mechanics and Maxxim integration depth: open questions
  awaiting Clent.
- Lessons, preferences and people files in `06-memory/` are scaffolds — the nightly refresh
  now feeds them.

## Changelog

| Date | Change |
| --- | --- |
| 2026-07-11 | Life OS established: this index, `AI-INDEX.md`, `02-okrs/`, the nightly refresh SOP and routine, and the personal repo scaffold. Built from a full sweep of this repo, the Drive `04 Intelligence` tree and the Intelligence Brief v2.7. |

Next: read `AI-INDEX.md` if you are an agent, `02-okrs/OKRS-2026-H2.md` if you are human.
