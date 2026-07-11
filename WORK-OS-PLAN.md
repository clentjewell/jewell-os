# The Jewell Work Operating System — the plan

**Status: PROPOSED, awaiting Clent's go.** Drafted 11 July 2026 from the six-repo research pass
(`06-memory/work-os-research-digest.md`), the team-knowledge pack, the live tool estate and
Clent's brief. Nothing below is built until Clent says go — and his pending context (Maxxim
integration depth, further workflow ideas) slots into the open questions at the end before
anything is locked.

---

## 1. The model in one page

Everything Jewell does is an **engagement** moving through one spine:

```
Prospect → Qualified → Proposal → Won → Onboarding → 3D Delivery → Launch → Support → Knowledge
```

Three engagement types run on the same spine, differing only in who drives: **client work**
(Jewell- or partner-delivered), **own projects** (Jewell IP: Maxxim, PetZip, Jewell Tyres,
estimator), and **product/self-serve** (portal-led 3D, direct-to-market). A partner or a portal
user is just a different driver of the same stages — the system does not fork.

Every stage transition is either a **gate** (a named human signs; Gates 2 and 5 are Clent's) or a
**state change** (owner moves the Asana stage). The 3D Process (Discover → Design → Deploy →
Deepen) is the delivery segment of the spine, unchanged.

Two loops make it self-improving:

- **Fast loop (daily, automatic):** meetings, decisions, feedback, delivery learnings and Slack
  context are captured into the intelligence inbox — tagged, searchable, usable today. Under the
  standing improvement directive, anything below strategy level (SOPs, templates, docs) improves
  directly, logged, reversible.
- **Slow loop (weekly → monthly → quarterly, human-gated):** the weekly washback reviews the
  week's signals and proposes strategy/template/system changes; Clent approves; the change lands
  and is logged. Noise physically cannot touch strategy: signals live in the inbox, strategy
  lives in governance, and only the washback path connects them.

## 2. Tool boundaries — what lives where, and nowhere else

| Tool | Is the one home of | Never holds |
| --- | --- | --- |
| **Asana** | Engagement state (pipeline stage per engagement), tasks, owners, dates, sign-offs (approval task + 6-comment audit trail) | Files, knowledge, strategy, credentials |
| **Google Drive** | Human- and client-facing files: client folders (current shell), working docs, meeting-note docs, the human-readable mirrors | Machine state, rules, the master copy of anything the system reads |
| **GitHub `jewell-os`** | The system itself: rules, SOPs, templates, workflows, indexes, decision log, intelligence/memory, gated personal state | Client deliverable files (those live in client repos/Drive), secrets |
| **GitHub client repos** | That client's deliverables-as-code: 3D outputs (semantic HTML + provenance headers), portal, site | Other clients' anything; internal strategy corpus |
| **Gmail** | Correspondence. Triage rule: an email that needs action becomes an Asana task same-day; Gmail is never a to-do list | State, files, knowledge |
| **Slack** | Coordination and routine outputs. Ephemeral by design: anything durable is promoted same-day to Asana (action), Drive (file) or GitHub (decision/knowledge) | Sign-offs, decisions of record, files, credentials |
| **Claude** | The engine: scheduled routines, delivery sessions against repos, Ask surfaces. Takes over Sam's schedulable duties (§8 holds the full retirement path — event-driven jobs go to Workers, personal-layer jobs to the private layer) | — |
| **Maxxim** | Productised delivery: the plugin (3D skills + templates), client portals, artifact chrome. Consumes `jewell-os` templates; never a second home for rules | The operating rules, client raw data in reusable assets |
| **Xero** | Finance facts | — |

One-way flows only: GitHub → Drive (generated mirrors: rules summary, decision-log export),
Drive → GitHub never (files stay files; the system indexes them by pointer). Duplication test:
if the same content exists in two tools, one of them is wrong — name the master, make the other a
pointer, log it.

## 3. The workflows (trigger → path → gate)

1. **Prospecting & sales.** Lead arrives (site form → KV + email; referral → Gmail) → Asana
   engagement created at *Prospect* with the intake pack linked → qualification call (Circleback
   captures) → *Proposal* (P04 from template; pricing is Clent's) → Gate: Clent signs commercial
   terms → *Won*. Weekly pipeline review reads the Asana board — no separate CRM until volume
   forces one (it does not today).
2. **Onboarding.** *Won* triggers the onboarding checklist (one template): Slack channel, Drive
   client folder (current shell), Asana sections, client repo from template (beyondtheclinic
   pattern, fixed: one manifest, one committed copy), welcome pack, SLA. Gate: the engagement
   owner reviews and sends the welcome pack and SLA — client-facing sends are never automated.
   Target: ready-to-work in under a day, Liz-executable.
3. **3D delivery (Jewell- or partner-driven).** The 3D-system spine as it exists — artefact
   codes, phase folders, checkpoint gate docs (CP1/CP2/CP3 with a defended position), decision
   addenda ("held, not reopened"), sign-off in Asana, definition-of-done per artefact type,
   Intelligence Brief updated at session end. Partners drive the same spine with scoped access:
   their client's repo, channel and folder — never `jewell-os`.
4. **Self-serve / portal-led 3D.** The Maxxim portal runs the same stages with the same gate
   docs; the user drives, but a named Jewell engagement owner remains the reviewer of record for
   anything published or committed from the portal, on both self-serve and assisted tiers —
   approval-points applies unchanged. Portal output lands in a
   client repo like any other engagement — same provenance headers, same registry.
5. **Own projects.** Same spine, Clent as client. One Asana section per project; same repos,
   same gates (self-signed), same knowledge capture — own projects feed the blueprint library
   fastest.
6. **Project management.** Asana is the control plane; the Today door is the daily heartbeat;
   the weekly washback closes the loop. Ronnie owns the board; the monthly hygiene routine keeps
   it honest.
7. **Admin & finance.** The `11-finance/` playbook as merged (daily pulse reads, weekly writes,
   monthly close), gated per the boundary. Business admin lives in Drive 03; the obligations
   calendar in state.json is the machine copy.
8. **Team & partner management.** Roster, roles and access in `06-memory/team-knowledge/05` +
   the Access Permissions Matrix (Drive). Partner onboarding = contractor SLA + scoped access
   pack (their repos/channels/folders enumerated, logged). Offboarding = same-day revocation,
   logged (existing rule).
9. **Reporting & client updates.** Weekly update deck per retainer client (Pottsville cadence),
   generated as a draft from the client repo + Asana state; the engagement owner reviews and
    sends it — client delivery is never automated (approval-points).
   Internal: Today door (daily), Friday close (weekly), monthly close (finance).
10. **Asset & file management.** Files in Drive per the current shell; deliverables-as-code in
    client repos; reusable assets promoted to `08-templates`/Maxxim only after sanitisation
    (existing rule). Naming: artefact codes.
11. **Knowledge capture & intelligence.** §4 below.
12. **Launch, support, optimisation.** Launch = the go-live-blocker checklist (jewell repo
    pattern) closed by a named commit; support = the client channel + Asana *Support* stage;
    optimisation = Deepen loop signals feeding the washback.

## 4. The self-learning layer

**Capture (fast loop).** One inbox: `06-memory/intelligence/` — one markdown file per signal,
front-matter tagged: `date, source (meeting|slack|email|delivery|feedback), engagement, stage,
kind (fact|assumption|lesson|preference|risk), confidence`. Personal or private-layer signals
never enter this shared inbox — they route to the gated areas, and any routine or Ask surface
reading the inbox reads a personal-free store by construction. Fed by: the Circleback
sweep (already live), the Today door's "changed since yesterday", delivery sessions' Intelligence
Brief updates, and manual drops. Searchable by grep/Claude immediately — useful the same day.

**Separation.** Signals are append-only and never edit anything. SOPs/templates/docs improve
directly under the improvement directive (logged, reversible). Strategy, positioning, pricing and
system-level changes only move through the washback: **weekly** (Friday close: synthesise the
week's inbox → proposals → Clent's word), **monthly** (systems review: automation health, tool
drift, gate check), **quarterly** (strategy review + retire pass — anything not earning its keep).

**Promotion.** An approved proposal updates the target (strategy doc, template, SOP), gets a
decision-log row, and the source signals are marked promoted. A rejected one gets a sticky
"DECIDED — do not re-raise" row (jewell-finance pattern), killing zombie proposals.

## 5. Drive ↔ GitHub structure

Drive keeps its current structure — it works and humans know it. GitHub mirrors the *mental
model*, not the folders: `01-clients/` in `jewell-os` holds one index file per client (pointers:
Drive folder, Asana project, repo, portal, channel, stage, gate status) — the "master dashboard"
data Ronnie wants, as flat files first. Client *content* stays in client repos and Drive.
`06 Own Projects` maps to the same index with type=own. `04 Intelligence` maps to `06-memory/`.
`05 Personal` maps to the gated areas. The nightly rules-summary sync (live, sibling-file
pattern — the Drive connector cannot update in place, so a human paste-refresh step is part of
the cadence) plus a decision-log export cover GitHub→Drive; nothing flows the other way.

## 6. Minimum viable system — build first, in order

1. **`01-clients/` engagement index** (one file per active client + own project, from the
   team-knowledge pack) + pipeline stages as Asana sections/fields on the existing board.
2. **`06-memory/intelligence/` inbox** + tagging schema + wire the Circleback sweep to also file
   signals there. Amending that live routine widens its recorded standing-approval scope, so it
   needs Clent's one-word re-approval, and mechanically it is a delete-and-recreate of the
   trigger (no in-place prompt edit exists).
3. **The onboarding checklist template** (one file; Liz-executable).
4. **Friday close washback** as a scheduled proposal-only routine (template exists; needs
   Clent's go as a standing routine).
5. **A thin capstone pointer**: `WORK-OS.md` as a one-page index naming this plan as the
   operating model and pointing at the four manuals it will absorb. The full consolidation (and
   archiving the manuals to `99-archive/`) is phase 2, after items 1–4 are proven in use.

Everything else phases in behind these five.

## 7. Automate / keep manual / remove

**Automated (live today, keep):** Today door + runway line; Circleback sweep; monthly Asana
hygiene; monthly security review (now gate-verifying); nightly rules sync; finance daily/weekly/
monthly. **Automate next:** washback pre-draft (Friday); intelligence filing; weekly client-update
draft generation. **Keep manual, deliberately:** gate sign-offs; pricing/scope; anything
client-facing outbound; partner access grants; strategy changes. **Remove:** Sam's remaining
crons (§8); duplicate strategy corpora in website repos (one canonical home each); the
Drive/Sheet double registry (JSON registry wins); catbox.moe transport (replaced by repo-to-repo
handoff); the 8:30am and 7:00am duplicate briefs (already dying). Every removal is archive-first
with Clent's sign-off, logged — constitution rule 9; nothing is deleted.

## 8. Sam retirement (accelerated by Clent's verdict: too expensive, unreliable, token-heavy)

Claude routines already cover the daily brief, meeting sweep, hygiene, security and finance
cadences. Clent's verdict supersedes the July cron review's "keep on Sam" defaults, but every
remaining job still needs a named destination before the gateway dies — the review's reachability
findings still hold. The full residual list and destinations: the **nightly Drive index refresh**
→ Claude routine (sibling-file pattern plus a human-replace step, same constraint as the live
rules sync); **client provisioning** → the onboarding checklist, run as a Claude session, not a
cron; the **website-leads listener** (event-driven — Claude routines are clock-only) → a
Cloudflare Worker on the site, scoped with Raef; the **personal-layer email sync** → a
private-layer home, Clent's Tier 3 call, never a shared routine; the **comms bridges**
(WhatsApp/Messenger/phone→Slack) → assess per bridge: retire if unused, else a Worker; the
**watchdogs, 10pm model reset, health checks and structural-change logging** → not migrated —
they guard Sam itself and die with the gateway once nothing else runs there. Sequence: (1)
Ronnie/Raef confirm the two duplicate briefs are dead; (2) Drive index refresh migrated; (3)
provisioning folded into onboarding; (4) leads listener and any kept bridges on Workers; (5)
personal sync re-homed by Clent; (6) two-week parallel run with zero Sam-only duties, then
decommission the Mac Mini gateway. Reversible at every step until (6), and (6) only happens when
the residual list above is empty.

## 9. Overcomplicated / fragile / expensive — flagged

The four-manual overlap (fix: §6.5). Five intelligence homes (fix: §4's one inbox). The public
`maxxim` repo carrying strategy and pricing (needs Clent's visibility call — still open). The
`jewell`/`jewell-ai` duplicate site corpora. 3d-system's public-file-host transport and
Slack-chronology locking. jewell-finance's stubbed load-bearing scripts and never-completed
weekly pipeline. Committed build output in three repos (fix: build in CI or commit exactly one
copy). Empty scaffold folders in this repo (retire or fill at MVS).

## 10. Implementation plan (Ronnie, Liz, Rao)

**Week 1 — Ronnie:** approve-and-run MVS items 1–2 with me; kill the duplicate briefs on Sam;
confirm Jewell Tyres/OTR repo state. **Week 1 — Liz:** onboarding checklist dry-run on Adam Hall
(the next live engagement); 3D training call with Clent (already a meeting action). **Week 1 —
Rao:** client-repo template hardening (one manifest, CI build, no committed dist) — the template
lives in its own template repo, not `jewell-os`: while gated content is present, this repo's
collaborators are only ever Clent, Ronnie and Liz, so Rao and Raef work from exported artifacts
and their own repos, never `jewell-os` access. **Week 2:**
washback routine live; first Friday close on the new loop; Sam migration steps 1–2. **Week 3–4:**
partner access pack template; portal-led 3D pilot scoped with Raef (Maxxim plugin v0.33.x);
quarterly retire pass scheduled. Ronnie owns the rollout; I run the automation and the checks;
every step lands with a decision-log row.

## Open questions for Clent (his pending context slots here)

1. **Maxxim integration depth** — plugin/portal consuming `jewell-os` templates (current design),
   or Maxxim absorbing more of the OS itself over time?
2. **Partner model mechanics** — scoped repos/channels per partner (current design), or a
   partner portal as the only surface?
3. **`maxxim` repo visibility** — private, or split site from strategy?
4. **Anything in his further-ideas list** not yet reflected above.

**Next:** Clent's go on the MVS (one word), plus answers to the open questions — then the build
runs under the standing orchestration rule with a verify-and-fix pass before anything is called
done.
