# How to add a new tool

Step-by-step for bringing a new third-party AI or dev tool into scope. See `../01-catalogue/` for
the classification files this procedure produces, and `how-to-review-third-party-tools.md` for
the review checklist used on an ongoing basis once a tool is in.

## Step 1: classify first

Before writing a single reference, template or script, classify the tool against
`../01-catalogue/`:

- **Status** — adopt now, template only, watch, or rejected.
- **Licence** — what it is, and whether it creates an obligation on our own IP (see
  `../LICENSE-NOTES.md`).
- **Security posture** — what it touches, what access it needs, whether it has a track record.
- **Token notes** — how much context it costs to use well, and whether a lighter alternative
  already does the job.

Write this up as a catalogue entry even before the tool is approved. The entry is the proposal;
it is not yet a decision.

## Step 2: Clent approves the classification

Do not move a tool to `adopt-now.md` on your own judgement, especially if it touches secrets,
cost, or a new external service. Propose the classification and let Clent approve the move,
per `../README.md`.

## Step 3: only then reference, template or script it

Once the classification is approved:

- **Adopt now** — the tool can be referenced directly in a pack, wired into a script, or given a
  workflow file. Follow the pattern already used for adopt-now tools in `../02-starter-packs/security/`.
- **Template only** — provide an example configuration or workflow, clearly marked as a pattern
  to adapt, not something switched on by default. See the `security` pack's `harden-runner-example.yml`
  for the pattern this follows.
- **Watch** — a catalogue entry only. No reference, template or script yet. Revisit at the next
  scheduled review.
- **Rejected** — a catalogue entry recording why, so the same tool is not re-proposed without new
  information.

## Never vendor by default

Do not clone or commit the tool's source code into this kit as a matter of course. If inspecting
the source is genuinely necessary, clone it on demand into `.vendor/` with
`03-scripts/clone-third-party-tools.sh <group>`, which is git-ignored and disposable. See
`../README.md` for why vendoring by default is avoided: licence risk, token and repo weight, and
drift against the upstream project.

**Next:** once a tool is adopt-now and referenced, add it to the token-usage notes in
`token-usage-guidance.md` if it changes how much context a session needs to load.
