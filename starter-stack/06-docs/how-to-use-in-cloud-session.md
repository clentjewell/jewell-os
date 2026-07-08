# How to use this kit in a Claude Cloud session

Step-by-step for an operator starting a Claude Cloud session against this kit. See
`../05-examples/cloud-session-usage-example.md` for a worked transcript of this exact flow.

## Read order

Read in this order, and stop once you have what the task needs:

1. `../README.md` — what the kit is and how the packs fit together.
2. `../AGENTS.md` — the rules for any agent working in this kit.
3. `../01-catalogue/adopt-now.md` — what is already cleared to use.
4. The `README.md` of the one pack the task actually needs. Nothing else.

Do not read the whole kit up front. Do not open a second pack's `README.md` unless the task
genuinely spans two packs.

## Choose a mode

Run the bootstrap script and choose the mode that matches the task:

```
03-scripts/bootstrap-cloud-session.sh
```

Modes: `security`, `skills`, `evals`, `mcp`, `full-review`. Pick the narrowest mode that covers
the task. `full-review` loads more and should be the exception, not the default.

## Choose the smallest pack

Once inside a mode, load only the one pack `README.md` the task needs from
`../02-starter-packs/`. A task that touches security touches the `security` pack's `README.md`,
not `evals` or `skills` as well, unless the task genuinely spans both.

## Never load `.vendor/` by default

`.vendor/` holds third-party tool source, cloned on demand and git-ignored. It is disposable and
large. Never read it into context unless the task specifically requires inspecting a cloned
tool's source. See `../README.md` for why nothing is vendored by default.

## Token discipline

See `token-usage-guidance.md` — the canonical set of rules for keeping context small.

**Next:** with the mode and pack chosen, follow `how-to-apply-to-existing-repo.md` to apply it to
a target repo.
