# GPT-5.6 ("Saul") — model flexibility signal

Date: 2026-07-11. Source: YouTube Short shared by Clent into #sam-ingest
(`https://youtube.com/shorts/QlmCaYiU-Oc`), creator Vaibhav Sisinty, followed on explicit
instruction. Sam's summary is in the channel; this file records the evaluation and what changed.

## What the item claims

OpenAI's GPT-5.6 family (flagship "Saul"): strong on long, complex builds (a 30M-token
single-session build cited), and materially cheaper — a Terraria-clone comparison finished in
roughly 2/3 the time of Claude Sonnet 5 at a fraction of the cost. The video itself concedes
Claude Sonnet 5 still wins on polish and design quality.

## Kind: separate the fact from the claim

- Fact: Clent directs that this level of flexibility be built into planning (11 Jul 2026).
- Claim, unverified: the performance and cost figures come from a promotional Short, not from
  our own evals.
- Recommendation: treat GPT-5.6 as a trial candidate for the execution pool, not an adoption.

## What changed

- `AGENTS.md` orchestration rule gains a model-flexibility clause: execution may route to
  another vendor's model when evals prove the standard is met at lower cost or on longer
  builds. Orchestrator, quality gate and verify-and-fix are unchanged.
- Vaibhav Sisinty added ACTIVE to the sources register (YouTube RSS, verified).

## Next

When GPT-5.6 access is available, run the `05-evals` suite side by side with the current
execution models on 2 task shapes: a long scaffold build and a polish-sensitive page build.
Adopt per task shape only where it wins on cost with no outcome compromise.
