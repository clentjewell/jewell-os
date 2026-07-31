# Sam token guardrails

Standing guardrail for Sam ⚡ (the OpenClaw agent on the Mac mini), created 13 July 2026
after the billing review of the Anthropic Console. The `Sam #2` API key had spent $196.28
since 10 April — roughly $65 a month and the largest single key in the organisation — with
no spend limit, sitting in the Default workspace. Observed pattern: messages sent by Claude
(signed in as Clent) into Sam's Slack channels were processed as full agent turns on the most
expensive model available to the session.

## The rule

Sam executes; it does not orchestrate. Under the standing orchestration rule (AGENTS.md,
8 July 2026), the strongest model orchestrates and execution goes to the lightest model that
meets the standard. Sam is the execution layer, so Sonnet is Sam's ceiling and Haiku does its
background work. Opus and Fable are never available to Sam — not by convention, but enforced
in config and capped in the Console. This makes the locked 25 June rule ("human-facing
channels always run on Claude Sonnet") enforceable rather than aspirational.

If a Sam task genuinely needs Opus-class reasoning, it routes to a Claude session (the
orchestrator), not by lifting Sam's ceiling. No outcome compromise — the work still gets the
right model, just not on Sam's key.

## Why the spend happened

- Every Slack message to Sam runs a full agent turn, carrying the session's whole
  conversation history. Long-lived sessions grow, so late-session turns are the dearest.
- If a session's model is the strongest available (a `/model` switch, or a default never
  pinned down), every one of those turns bills at the top rate.
- Current per-million-token pricing (re-check at each monthly re-tier):

| Model | Input $/M | Output $/M | Relative to Sonnet 5 intro |
| --- | --- | --- | --- |
| Fable 5 | 10.00 | 50.00 | ~5x |
| Opus 4.8 | 5.00 | 25.00 | ~2.5x |
| Sonnet 5 | 3.00 (2.00 intro to 31 Aug 2026) | 15.00 (10.00 intro) | 1x |
| Sonnet 4.6 | 3.00 | 15.00 | ~1.5x |
| Haiku 4.5 | 1.00 | 5.00 | ~0.5x |

A Fable-answered Slack turn costs about 5 times a Sonnet turn and about 10 times a Haiku
turn. Same message, same channel, same outcome expected.

## Layer 1 — hard cap in the Anthropic Console (Clent, ~10 minutes)

This is the only layer that actually stops spend; everything below reduces burn but cannot
cap it. API keys cannot carry limits or move between workspaces, so the cap goes on a
dedicated workspace:

1. Console → Organization settings → Workspaces → create a workspace named **Sam**.
2. Create a new API key inside the Sam workspace. Swap it into Sam's keyfile on the Mac mini
   (never plaintext, per the locked rules), confirm Sam responds, then disable `Sam #2`.
3. On the Sam workspace, set a **monthly spend limit of $100** and an **alert threshold of
   $50** (email lands with Clent). Tighten the limit after the first clean month on the new
   routing — expected spend is well under $50.
4. Side benefit: Sam's cost is now reported per workspace, no longer blended into Default.

When the limit is hit, Sam's API calls fail until the month rolls over or the limit is
raised. That is the point: a runaway loop now costs at most $100, not an open-ended bill.

## Layer 2 — model routing in `openclaw.json` (Ronnie/Raef on the Mac mini)

Merge this into `agents.defaults` in Sam's `openclaw.json`:

```json5
{
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-sonnet-5",
        fallbacks: ["anthropic/claude-sonnet-4-6", "anthropic/claude-haiku-4-5"]
      },
      // The allowlist is the real guardrail: Opus and Fable simply do not exist
      // for Sam. A /model switch or config drift cannot select them.
      models: {
        "anthropic/claude-sonnet-5": {},
        "anthropic/claude-sonnet-4-6": {},
        "anthropic/claude-haiku-4-5": {}
      },
      // Background and mechanical work runs on Haiku.
      utilityModel: "anthropic/claude-haiku-4-5",
      subagents: {
        model: "anthropic/claude-haiku-4-5",
        maxConcurrent: 4,
        maxChildrenPerAgent: 3
      },
      // Heartbeats run full agent turns; this is where 23M tokens/week went once.
      heartbeat: {
        every: "1h",
        model: "anthropic/claude-haiku-4-5",
        isolatedSession: true,   // ~2-5K tokens per run instead of full history
        lightContext: true       // bootstrap from HEARTBEAT.md only
      }
    }
  }
}
```

Notes:

- If the installed OpenClaw build does not yet list `claude-sonnet-5` in its model registry,
  run `anthropic/claude-sonnet-4-6` as primary and revisit at the monthly re-tier.
- Keep `HEARTBEAT.md` small; the checklist is the prompt.
- Per-agent overrides (`agents.list[].model`) must also stay inside the allowlist.
- Restart the gateway after the change and verify in `#sam-build`: ask Sam which model it is
  on, and send one test message from Claude to confirm the turn bills to Sonnet.

## Layer 3 — the Claude→Sam lane

- A message from Claude (signed in as Clent) is a human-facing channel like any other:
  Sonnet answers it. The allowlist enforces this; nobody needs to remember it.
- No agent-to-agent ping-pong. Claude does not ask Sam things Sam will answer by asking
  Claude back. One request, one response, done. Loops between 2 agents burn tokens at both
  ends and are the fastest way back to this document.
- Prefer fresh, scoped sessions for heavy work over one ever-growing session. Context length
  is the cost multiplier; `/new` is free.

## Layer 4 — watch it

- **Weekly**: Ronnie checks Console → Usage by workspace in the Monday pulse. The $50 alert
  email is the backstop, not the habit.
- **Monthly**: model prices and the allowlist are re-checked at the monthly re-tier alongside
  the cost table (per the 11 July new-model policy). The allowlist follows the cost table,
  never launch-day vibes.
- The cost lesson on record stands: kill runaway background jobs before downgrading models.
  A cheap model in a loop is still a loop.

## What this does not change

The orchestration rule stands untouched: Fable (or Opus) still orchestrates in Claude
sessions, and token efficiency never outranks the outcome there. This guardrail scopes Sam
only — the execution layer gets execution-layer models, and the hard cap makes sure a bad
week costs $100, not a surprise.

Next: Clent creates the Sam workspace, sets the $100 limit and rotates the key (Layer 1);
Ronnie/Raef apply the `openclaw.json` block and confirm the test turn in `#sam-build`
(Layer 2).
