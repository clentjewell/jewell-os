# Skills pack

Reusable Claude skills for the Jewell × Maxxim operating system. Part of the Jewell × Maxxim
starter kit. This is a starter kit, not a production app.

Governance is set elsewhere and is not re-explained here. AI proposes, a human decides. Ask
before you send. Approve before publish. See the manual at `../../../OPERATING-SYSTEM.md`
(Section 15) and the source-of-truth map at `../../../OPERATING-SYSTEM.md` (Section 3).

## What this pack is

A set of `SKILL.md` files, one per reusable workflow. Each skill turns a recurring piece of
Jewell or Maxxim work into a concrete, repeatable procedure: what it takes in, what it produces,
the steps to run, the guardrails it must respect, and the one place its output is filed. A skill
is a proposal engine. It drafts. It never publishes, promotes or acts on its own.

## The SKILL.md structure

Every `SKILL.md` in this pack uses exactly this structure, in this order:

```
# <Skill name>
one-line purpose
## When to use
## Inputs
## Outputs
## Steps  (numbered, concrete, includes the approval gate)
## Guardrails  (what it must not use or do; approval required; tier of any action it proposes)
## Where the output is filed  (the one home, per source-of-truth map)
## Example  (short, placeholder-client)
## Success measure
```

Keep every section short. A skill file is a working procedure, not an essay.

## Action tiers

Guardrails sections name a tier for any action a skill proposes:

- **Tier 1 (internal):** an internal task, note or draft. Confirmed by the task or engagement
  owner.
- **Tier 2 (client-facing):** anything a client will see or that changes a client commitment.
  Confirmed by the engagement owner and, where scope, pricing or a commitment is touched, Clent.

No skill auto-promotes a draft, auto-publishes a client output, or auto-applies a Tier 2 action.

## Build order

Build and pilot in this order, matching the roadmap in `OPERATING-SYSTEM.md` Section 18, Phase 6:

1. `jewell-meeting-to-actions` — the highest-frequency workflow; proves the actions-and-notes
   pattern.
2. `jewell-3d-discover-summary`, `jewell-3d-design-summary`, `jewell-3d-deploy-summary` — the 3D
   summaries, in stage order, since each depends on the one before it.
3. The rest, as the engagement calendar needs them.

## Every skill routes to one home and stops at the gate

Every skill in this pack:

- Writes its output to exactly one home, per the source-of-truth map in
  `OPERATING-SYSTEM.md` Section 3. It never scatters copies across Drive, Slack or Asana.
- Stops at a human approval gate before anything is promoted, published, or made client-visible.
  A draft stays a draft until the named owner approves it.
- Never reads another client's data, and never mixes client-specific content into a Maxxim
  reusable asset without review and sanitisation.

## How to add a new skill

1. Copy `new-skill-template/SKILL.md` into a new folder named for the skill, using the
   `jewell-` or `maxxim-` prefix that matches which layer owns it.
2. Fill in every section. Do not remove a section, even if short.
3. Name the one filing home, the owner, and the approval tier for any proposed action.
4. Add the skill to the build order above if it changes the sequence.
5. Ask Clent to review before the skill is used on live client work.

**Next:** read the one skill's `SKILL.md` you need, not the whole pack.
