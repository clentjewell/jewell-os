# generate-build-brief.js

Generates a `BUILD-BRIEF.md` for any client by pulling live data from
`jewell-brain` — the 3D Process registry, discover artefacts, and inputs.

Ronnie drops the generated brief into Claude Code at the start of every
build session. Claude reads it and builds with the right context — no re-briefing needed.

## Usage

```bash
# Basic — writes BUILD-BRIEF.md to current directory
node generate-build-brief.js <client-slug>

# Write directly into the client repo
node generate-build-brief.js hiskins --output ../hiskins/BUILD-BRIEF.md

# Examples
node generate-build-brief.js hiskins
node generate-build-brief.js jewelltyres --output ../jewelltyres/BUILD-BRIEF.md
node generate-build-brief.js adamhallwebsite --output ../adamhallwebsite/BUILD-BRIEF.md
```

## What it pulls

1. `jewell-brain/clients/<slug>/3d-registry.json` — tier, repo, created by
2. `jewell-brain/clients/<slug>/inputs/README.md` — Ronnie's session notes
3. `<client-repo>/memory/generated/discover/*.html` — Discover artefacts (if generated)
4. `<client-repo>/CLAUDE.md` — existing house rules (referenced in brief)
5. Active branch from GitHub API

## What it produces

A `BUILD-BRIEF.md` with:
- Client identity + repo + active branch
- Discover phase status (what artefacts exist vs what's still needed)
- Audience, offer, competitor sections (from artefacts or fillable placeholders)
- House rules (no em dashes, AU English, GEO/AEO requirements)
- What Claude must NOT do
- Inputs from Ronnie's session notes
- Regeneration command at the bottom

## Workflow for Ronnie

1. Before starting a Claude Code session, run:
   `node generate-build-brief.js <client-slug> --output ./<client-repo>/BUILD-BRIEF.md`
2. Open Claude Code, point it at the client repo
3. Say: "Read BUILD-BRIEF.md first, then let's build [what you want]"
4. Claude has full 3D Process context and house rules — build away

## When Discover artefacts exist

If the Jewell Console has already generated Discover phase documents, the script
pulls and summarises them automatically. The brief becomes much richer — audience,
pains, offer, competitors all pre-loaded.

## Requirements

- `gh` CLI authenticated (`gh auth status`)
- Node.js 18+

## Adding a new client

A client appears once the Jewell Console creates their entry.
If missing: open the Console, start a new engagement, and
`jewell-brain/clients/<slug>/` is created automatically.
