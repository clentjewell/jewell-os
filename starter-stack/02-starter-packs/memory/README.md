# Memory pack

Templates and rules for the memory and intelligence layer. Part of the Jewell × Maxxim starter
kit. This is a starter kit, not a production app. The live memory store is not in this pack; see
below.

Governance is set elsewhere and is not restated here. AI proposes, a human decides. Nothing
auto-promotes. See the manual at `../../../OPERATING-SYSTEM.md` (Section 10) for the full memory
model.

## The 7 layers, one line each

1. **Constitution** — who Jewell is, the non-negotiables, the voice. Rarely changes.
2. **People** — who is who: team, partners, clients, roles and preferences.
3. **Decisions** — the log of binding calls, dated, with the reason.
4. **Preferences** — how Clent and the team like things done.
5. **SOPs** — the standard ways of working.
6. **Lessons** — what was learned, what to do differently.
7. **Active Context** — what is live right now, the near-term working state. See
   `working-memory-policy.md` for how this layer differs from the other six.

## The washback path

```
Signal → weekly synthesis → proposed change → human approval → approved memory or playbook update
```

Nothing enters memory without going through this path. See `memory-promotion-rules.md` for the
rules that govern what can be proposed and what can never be proposed.

## The live store

This pack holds templates, rules and policy. The live, approved memory store is
[`../../../06-memory/`](../../../06-memory/) in `jewell-os` — the decision log and the approved
memory layers live there, not here. Do not copy live memory content into this pack. This pack is
what a target repo adopts to build its own memory discipline; `06-memory` is the one Jewell ×
Maxxim instance of it in production.

## Files in this pack

| File | What it covers |
| --- | --- |
| `memory-promotion-rules.md` | The rules for what can and cannot enter memory, and how. |
| `working-memory-policy.md` | How the volatile Active Context layer is handled. |
| `approved-memory-policy.md` | What approved memory is, where it lives, and what may never enter it. |
| `weekly-washback-template.md` | The fill-in form for the weekly washback ritual. |

**Next:** read `memory-promotion-rules.md` before proposing anything for memory, and
`approved-memory-policy.md` before treating anything as approved.
