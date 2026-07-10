# 06-memory

The memory layers and the decision log. The full design lives in
[OPERATING-SYSTEM.md, Section 10](../OPERATING-SYSTEM.md#section-10-memory-and-intelligence-layer).

## The seven layers

1. **Constitution** — who Jewell is, the non-negotiables. See `../00-governance/constitution.md`.
2. **People** — who is who, roles and preferences. See [`people.md`](./people.md).
3. **Decisions** — the log of binding calls. See [`decision-log.md`](./decision-log.md).
4. **Preferences** — how Clent and the team like things done. See [`preferences.md`](./preferences.md).
5. **SOPs** — the standard ways of working. See [`sops.md`](./sops.md).
6. **Lessons** — what was learned, what to do differently. See [`lessons.md`](./lessons.md).
7. **Active Context** — what is live right now.

## The one rule

Memory improves continuously under the standing improvement directive (Clent, 10 July 2026):
anything that makes the system better may be promoted directly — logged in the decision log,
kept reversible, open to Clent's veto. The old per-item approval gate is removed. The one
exception: strategy-level changes still follow

**Signal → weekly synthesis → proposed change → Clent's approval → strategy update.**

## What never enters shared memory

Secrets and credentials, personal or family matters, legal or sensitive content, un-sanitised
client data, and anything Clent-only. These exclusions are absolute and survive the directive.

## Files in this folder

- [`decision-log.md`](./decision-log.md) — the living log of binding decisions.
- [`people.md`](./people.md), [`preferences.md`](./preferences.md), [`sops.md`](./sops.md),
  [`lessons.md`](./lessons.md) — one file per layer, improved directly under the standing
  directive, every promotion logged.
- [`team-knowledge/`](./team-knowledge/) — the populated institutional-knowledge pack (company,
  clients, projects, systems, team), ingested 10 July 2026.
