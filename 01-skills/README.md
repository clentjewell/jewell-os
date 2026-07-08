# 01-skills

Reusable Claude skills and workflows. The full spec for the first 18 skills lives in
[OPERATING-SYSTEM.md, Section 15](../OPERATING-SYSTEM.md#section-15-skills-and-reusable-workflows).

**Where the skills actually live.** For now the canonical home of the skill files is
[`starter-stack/02-starter-packs/skills/`](../starter-stack/02-starter-packs/skills/). This
directory holds Jewell-specific skill overrides only, when a skill needs to diverge from the kit
version. Do not fork a skill here that is identical to the kit's copy.

## What belongs here

Skill definitions and prompts, versioned. Each skill states: purpose, input, output, owner, where
the output is filed, what source material it may use, what it must not use, what approval is
required, whether it is Jewell, Maxxim or both, and how success is measured.

## What does not belong here

Client data, secrets, or one-off prompts that are not reusable.

## Build order (first pass)

1. Today door generator
2. Meeting to actions
3. Client intelligence brief
4. 3D Discover / Design / Deploy summaries
5. Deepen intelligence brief
6. Weekly washback
7. Case study builder
8. Security review checklist

## Rules for every skill

- Answer or draft from approved source material only.
- Route the output to its one right home (see the source-of-truth map).
- Stop at the approval gate for anything client-facing or binding.
- Ship the smallest version that helps, then let the evals in `05-evals` prove it.
