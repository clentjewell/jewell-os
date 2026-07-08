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

Nothing enters memory without human approval. The path is always:

**Signal → weekly synthesis → proposed change → human approval → approved memory or playbook update.**

## What never enters shared memory

Secrets and credentials, personal or family matters, legal or sensitive content, un-sanitised
client data, anything Clent-only, and anything not yet approved.

## Files in this folder

- [`decision-log.md`](./decision-log.md) — the living log of binding decisions.
- [`people.md`](./people.md), [`preferences.md`](./preferences.md), [`sops.md`](./sops.md),
  [`lessons.md`](./lessons.md) — seeded templates, one file per layer, filled only through the
  weekly washback with human approval.
