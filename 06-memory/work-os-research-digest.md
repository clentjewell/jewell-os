# Work OS design — research digest (10 July 2026)

Captured ahead of the Work OS design. Six parallel research passes (five repos plus an audit of
this repo), run under the standing orchestration rule. The design itself is deliberately on hold:
Clent is adding further context (Maxxim integration, workflow ideas) before anything is designed
or built. This file is capture, not design.

## What each repo teaches the Work OS

**`maxxim` (public site + the method's own 3D run).** The strongest patterns in the estate:
checkpoint gate documents that distil a phase, take a defended position and list exactly what the
human must confirm; dated decision-addendum documents that supersede open items and are "held, not
reopened"; machine-readable provenance headers on every generated deliverable (client, phase,
skill, version, checkpoint, sources, replaceable flag); a named-specialist model (AI runs the
repeatable 80 per cent, a named human owns the 20 and signs every gate); proof governance by
clearance tier. Fragility: content committed in up to four copies because there is no CI build;
publication clearance enforced by commenting out build lines while held-back files stay committed.

**`3d-system` (the 3D process as an installable plugin).** The delivery spine fully encoded: one
artefact-code taxonomy (P/D/DS/DD/B/KH/IB + versioned filenames) that resolves to a Drive path, an
Asana task and a gate; sign-off lives in the Asana task, never a document, with a prescribed
6-comment audit trail; a machine-readable artefact registry as the data model; SHIPPED manifests
as validated YAML handoff contracts; mandatory preflight-context at session start and a mandatory
Intelligence Brief update at session end; type-specific definition-of-done checklists. Fragility:
agent-to-agent transport via a public anonymous file host; locking by Slack chronology; registry
duplicated between JSON and a Sheet; pilot client names hardcoded into "reusable" skills.

**`jewell-finance` (the best working Claude-routine pattern).** Fresh-context runbook contract
(every runbook self-contained, mandated read order); two-layer truth (state.json wins on facts,
markdown is narrative, explicit conflict rule); cadence hierarchy with differentiated authority
(daily reads and reports only, weekly owns writes); a weekly playbook-reconciliation step that
sweeps meetings/email for fact drift; a sticky decisions log ("DECIDED — do not re-raise");
exception-only output contracts; prepare-don't-execute boundaries. Fragility: facts triplicated
across state/controller/prose; load-bearing scripts still stubbed; the weekly pipeline has never
completed end-to-end.

**`beyondtheclinic` (exemplar client repo).** 27 deliverables as clean semantic HTML with
provenance headers; source and presentation separated (brand chrome applied at build, "swap per
client" CSS tokens); checkpoint summaries as first-class gate artifacts; editorial guardrails in
the repo (named-proof whitelist, "[NOT AVAILABLE: confirm]" instead of invented facts); the
password-gated Workers portal stack, fail-closed. Fragility: output committed in three places;
document manifest duplicated across two build scripts; README stale against reality.

**`jewell` (third website repo, single squashed commit, 7 July).** Confirms the duplication habit
the OS must kill: the full 3D strategy corpus committed byte-identical in two website repos; two
parallel marketing-site codebases with two independent lead-capture pipelines. Worth adopting:
content-as-data (typed data files, thin renderers); CLAUDE.md-as-runbook with convention-plus-
gotcha entries; never-drop-a-lead layering; go-live-blocker checklist framing; a rule that every
repo README states its role relative to sibling repos (canonical / experiment / archive).

**This repo (audit).** The capstone must replace the authority apex, not join it — four large
manuals overlap today, and two assert a Drive structure that no longer exists (the current real
root is 00 Inbox - Sort Weekly / 01 Clients / 02 Jewell Group / 03 Administration /
04 Intelligence / 05 Personal / 06 Own Projects / 99 Archive; the current client shell is
00 Admin / 01 Discover / 02 Design / 03 Deploy / 04 Deepen + Intelligence / 05 Blueprint
Extraction / 06 Source + Working + Imports / 99 Archive). The stale structure is asserted across
both manuals and roughly a dozen starter-stack skills. Five separate "intelligence homes" already
exist and must converge to one. Empty scaffold folders (01-skills, 08-templates, 09-playbook,
10-cadence) have been README-only since creation. Retirement candidates: FABLE-BUILD-PROMPT.md
and OPERATING-SYSTEM.md Section 20 (historical), PLATFORM-OPERATING-SYSTEM.md's superseded audit
prose, ROADMAP.md. Constitution rule 9 applies to all of it: archive, never delete, logged.

## Boundary and exposure findings (urgent, independent of the design — flagged to Clent)

Categorical only; specifics held in the session, not written here.

1. **`maxxim` is a public repository carrying internal strategy** — real pricing, gate-decision
   records, and client documents marked "held back pending clearance" that are nonetheless fully
   committed, plus loose archives duplicating them. Needs a visibility decision or a content
   split, urgently.
2. **`jewell-finance` carries personal and family-legal material in full detail** — account
   numbers, balances, tax specifics, and a family ledger naming minors — inside an automation
   repo, plus documented credential-sharing as the approved operating model. This is exactly the
   class of content the boundary rule keeps out of work surfaces; it needs Clent's call on a
   private-layer home (the Life OS repo) and a sanitised state split.
3. **`3d-system` documents a public anonymous file host as the standard client-deliverable
   transport**, and hardcodes a real client's name and identifiers into a reusable plugin.
4. **`jewell` (website repo) carries the internal strategy corpus and a financial model**, and its
   config comments include the exact command to enumerate stored lead PII.
5. **`beyondtheclinic` holds client financials, named third parties and an investor IM** behind a
   single shared password and repo privacy alone.

## Held for the design (when Clent's context arrives)

The design brief, Clent's ten requirements and principles, the current Drive structure, the
partner-led direction, Sam's retirement, and all of the above patterns. Nothing designed yet.
