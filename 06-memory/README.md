# 06-memory

The memory layers and the decision log. The full design lives in
[OPERATING-SYSTEM.md, Section 10](../OPERATING-SYSTEM.md#section-10-memory-and-intelligence-layer).

## The seven layers

1. **Constitution** — who Jewell is, the non-negotiables. See `00-governance/constitution.md`.
2. **People** — who is who, roles and preferences.
3. **Decisions** — the log of binding calls. See `decision-log.md`.
4. **Preferences** — how Clent and the team like things done.
5. **SOPs** — the standard ways of working.
6. **Lessons** — what was learned, what to do differently.
7. **Active Context** — what is live right now.

## The one rule

Nothing enters memory without human approval. The path is always:

**Signal → weekly synthesis → proposed change → human approval → approved memory or playbook update.**

## What never enters shared memory

Secrets and credentials, personal or family matters, legal or sensitive content, un-sanitised
client data, anything Clent-only, and anything not yet approved.

## Files in this folder

- `decision-log.md` — the living log of binding decisions.
- Add `people.md`, `preferences.md`, `sops.md`, `lessons.md` as they fill, one file per layer.
