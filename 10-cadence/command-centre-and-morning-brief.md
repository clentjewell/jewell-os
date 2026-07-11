# Command centre and morning brief

Set up 11 July 2026 on Clent's direction. This is the front door to the whole OS.

## Command centre

One place for Clent's thoughts and instructions: **#command-centre** in Slack (channel
C0BHHDS19RN, created 11 July 2026 on Clent's direction). Drop anything — thoughts,
instructions, decisions, half-ideas. Nobody files anything by hand.

Channel map: #command-centre = thoughts and instructions in, morning brief out.
#sam-ingest = links and content for the nightly AI sweep. #sam-build = Sam execution,
approval-phrase protocol per `CLAUDE.md`.

- The **nightly sweep** (2am) handles links and creators shared in #sam-ingest.
- The **morning brief** (6:30am AEST, Routine `trig_015pg4EeeaKpxTBE2X5RcoSA`) triages
  #command-centre: tasks are created in the right Asana project, decisions come back as
  questions, team instructions are routed in the brief.

## Morning brief — the contract

Posted to the channel by 6:30am AEST daily, one phone screen where possible:

1. The single next most valuable action for the business today.
2. Next most valuable action per active project, in Registry go-live-queue order.
3. One line each for Ronnie, Liz and Rao.
4. Clent's one personal anchor for the day (health, finance, or the girls) — categorical
   wording only, no sensitive detail in Slack.
5. Decisions blocked on Clent, as short questions.
6. "Next:" — the one thing to do first.

## Rabbit-hole rule

The brief names 1 next most valuable thing per lane. Going down a project rabbit hole is fine
when it IS the named thing; anything else gets 1 timeboxed block and then hands off — log the
handoff in the channel and the brief routes it next morning.

## Why the orchestration rule kept needing repeating — and the fix

The rule is canonical in `AGENTS.md` and loads automatically in any session opened on
`jewell-os`. Sessions opened elsewhere never see it. Fixes, in order:

1. Every repo gets a short `CLAUDE.md` stub pointing at the jewell-os rule (Monday checklist
   item; mechanical, delegate to a light model).
2. Clent pastes the 3-line short form into claude.ai profile preferences on BOTH accounts
   (Personal and Jewell Team), so chat sessions inherit it. 2 minutes each, only Clent can do
   this.
3. Every routine and trigger prompt embeds the rule (the morning brief and nightly sweep
   already do).

Short form for pasting: "Strongest available model orchestrates (Fable, else Opus); execution
is delegated to the lightest model that meets the standard; verify and fix on completion;
never compromise the outcome for token savings."

## Source of truth (restating the map, one line each)

Files: Google Drive (clent@jewellprojects.com only — the Gmail Drive is not part of the OS and
nothing syncs to it). Actions: Asana. Decisions: the decision log. Rules and AI instructions:
this repo. Finance: Xero. Project status: the Asana Project Registry, auto-updated nightly
from GitHub. GitHub does not sync files to Drive except the existing nightly rules-summary;
one-way, by design — routing, not mirroring, is what prevents version conflict.

## Open-source watching brief (to stand up next)

Add a repo-radar lane to the nightly sweep: GitHub trending via RSS bridge and 2–3 curated
awesome-list feeds, judged with the same adopt/trial/skip verdicts as #sam-ingest drops.
Queued for the next Fable session; spec lives here until then.
