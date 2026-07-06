# Worked example: setting up a maxxim repo

Applying the starter kit to a Maxxim product repo (the engine, portal or Ask-function code,
rather than the client-facing Jewell brand). Placeholder output below; run the real scripts
against the real repo before treating any of this as done. See `../README.md` and
`../02-starter-packs/`.

## Why this shape

A Maxxim repo carries more platform risk than a client build repo: it touches Cloudflare
infrastructure, and it will eventually serve an Ask endpoint that needs evals wired to it. Base
and security come first, exactly as with any repo. The MCP pack matters earlier here than
elsewhere, because Maxxim repos are the ones most likely to need a Cloudflare connector. Evals
come last, once there is a real Ask endpoint to point them at.

## Step 1: base and security first

```
03-scripts/apply-to-target-repo.sh --dry-run --pack base-claude-code --target ../maxxim-repo
03-scripts/apply-to-target-repo.sh --dry-run --pack security --target ../maxxim-repo
```

Same process as `jewell-ai-setup-example.md`: review the dry-run diff, merge any `.new` files,
replace `PLACEHOLDER` values, apply for real, then ask Clent to enable branch protection and
confirm CODEOWNERS.

## Step 2: mcp pack notes for Cloudflare

A Maxxim repo is the most likely place to need the Cloudflare MCP server (deployment, DNS,
Workers bindings). Before wiring it:

1. Confirm Cloudflare is on the approved register in
   `02-starter-packs/mcp/approved-mcp-servers.md`. It is not this pack's job to invent scope; the
   register states it.
2. Read `02-starter-packs/mcp/cloudflare-mcp-notes.md` for the practical setup and its known
   caveats before granting any token.
3. Stand the connector up read-only first. Adding write scope (deploying, changing DNS, editing a
   Worker) is a separate, later step that needs a named reason and Clent's sign-off, per
   `02-starter-packs/mcp/README.md`.
4. Never place a Cloudflare API token in this repo, in a prompt, or in a doc. It lives in the
   approved secret store only.

## Step 3: evals, once the Ask endpoint exists

Do not wire the evals pack until the Maxxim repo actually serves an Ask endpoint or portal
surface to test. Wiring an eval config against a placeholder or a stub produces a false sense of
coverage. Once the endpoint is live:

```
03-scripts/apply-to-target-repo.sh --dry-run --pack evals --target ../maxxim-repo
```

Wire `promptfoo/promptfooconfig.example.yaml` to the real endpoint, run it, and read the result
against `02-starter-packs/evals/README.md`. Fail the build on any leak or hallucination, per that
pack's hard rule.

## What needs Clent's sign-off

- Branch protection and CODEOWNERS, as with any repo.
- Any Cloudflare token scope, and any write-scope widening for that connector.
- Any real client- or portal-facing surface the evals end up testing, before it is treated as
  production-ready.

**Next:** once base, security and (where relevant) the mcp Cloudflare notes are applied, run
`03-scripts/check-target-repo.sh --target ../maxxim-repo` to confirm the applied state.
