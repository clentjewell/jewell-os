# 03-scripts

Operational helper scripts for the Jewell x Maxxim starter kit. All scripts:

- are plain `bash` (require **bash 4+** and `git` on `PATH`; no other runtime dependencies);
- resolve their own location (`SCRIPT_DIR`) so they can be run from any working directory;
- fail safely — non-zero exit code and a clear message on error, never a silent no-op;
- never touch secrets, never run `git commit`/`git push`, and never write outside the
  path they're explicitly told to write to;
- support `--dry-run` wherever the script changes anything on disk.

Run any script with `-h`/`--help` (where supported) or no arguments for a usage reminder.

---

## clone-third-party-tools.sh

**Purpose:** shallow-clone (`git clone --depth 1`) third-party repositories listed in
`../01-catalogue/repo-catalogue.yml` into `.vendor/<repo-name>`, filtered by
`clone_group` (or every non-rejected repo for `all`).

**Usage:**
```
./clone-third-party-tools.sh <adopt-now|security|evals|mcp|context|memory|all> [--dry-run]
```

**Example:**
```
./clone-third-party-tools.sh security --dry-run   # preview only
./clone-third-party-tools.sh evals                # actually clone the evals group
```

**Safety notes:**
- `--dry-run` lists what would be cloned and clones nothing.
- Repos already present under `.vendor/` are skipped, not overwritten.
- A clone failure is logged as `SKIPPED (unavailable): <name>` and the batch
  continues — one broken/renamed repo never aborts the whole run.
- Any repo marked `status: reject` in the catalogue is always excluded, even
  under `all`.
- After a successful clone, checks for a `LICENSE*`/`COPYING*` file and warns
  if none is found.
- Always ends with the reminder: *"Third-party clones are for local/cloud-session
  reference only. `.vendor/` is gitignored — never commit it."*

---

## apply-to-target-repo.sh

**Purpose:** copy one or more starter packs from `02-starter-packs/` into a
target repository, safely.

**Usage:**
```
./apply-to-target-repo.sh --target <path> --pack <base|security|evals|skills|mcp> [--pack ...] [--dry-run]
```

**Example:**
```
./apply-to-target-repo.sh --target ../maxxim-site --pack base --pack security --dry-run
./apply-to-target-repo.sh --target ../maxxim-site --pack base
```

**Safety notes:**
- `--dry-run` prints the full copy plan (source → dest, and whether dest
  already exists) and changes nothing.
- Never overwrites an existing file without an interactive `[y/N]` confirm;
  in a non-interactive session the default is always **No** (file kept as-is).
- `AGENTS.md`/`CLAUDE.md` are special-cased: if the target already has one,
  the script writes `AGENTS.md.new`/`CLAUDE.md.new` alongside it rather than
  prompting or overwriting.
- Security-pack workflows copy into `<target>/.github/workflows/`; the three
  security templates (`CODEOWNERS`, `pull_request_template.md`,
  `issue_template.md`) copy into `<target>/.github/` **only if missing**.
- Refuses (and says so) to copy anything matching a secret pattern
  (`.env*`, `*.pem`, `*.key`, `secrets/`), and never copies `.vendor/`.
- Ends by printing next manual steps: enable branch protection, review
  workflow placeholders, run evals once the real endpoint is wired up.

---

## bootstrap-cloud-session.sh

**Purpose:** orient a fresh Claude Code cloud session — print the recommended
reading order, then ask (interactively, via `read -r`) what kind of task this
is, and point at exactly the one pack README (and, if relevant, one clone
group) worth fetching.

**Usage:**
```
./bootstrap-cloud-session.sh                 # prompts interactively
./bootstrap-cloud-session.sh <base|security|evals|mcp|browser-qa|full-review>
```

**Example:**
```
./bootstrap-cloud-session.sh security
```

**Safety notes:**
- Entirely read-only/informational — no `--dry-run` needed because nothing
  here is destructive.
- It only ever **prints** the relevant `clone-third-party-tools.sh` command;
  it never runs it on the operator's behalf.
- Always ends with: *"Loading everything increases token usage. Fetch only
  what the task needs."*

---

## update-catalogue.sh

**Purpose:** read-only reachability check for every repo in
`../01-catalogue/repo-catalogue.yml`, using `git ls-remote --heads` with a
10-second timeout per repo.

**Usage:**
```
./update-catalogue.sh [--dry-run]
```

**Example:**
```
./update-catalogue.sh              # check every catalogued repo
./update-catalogue.sh --dry-run    # list what would be checked, check nothing
```

**Safety notes:**
- Never clones, writes, or edits `repo-catalogue.yml` — it only reports.
- `--dry-run` lists the repos it would check and checks nothing.
- Exits `1` if any repo is unreachable (so this can gate CI), `0` otherwise.
- Reminds the operator that classification changes (status, clone_group,
  etc.) are made by hand in `repo-catalogue.yml` and require Clent's approval
  per starter-stack governance.

---

## check-target-repo.sh

**Purpose:** read-only audit of a target repo against the starter-kit
baseline (`AGENTS.md`, `CLAUDE.md`, `.gitignore` secret coverage,
`.github/workflows/gitleaks.yml`, `.github/CODEOWNERS`,
`.github/pull_request_template.md`), plus a count-only scan for likely
secret-looking strings.

**Usage:**
```
./check-target-repo.sh --target <path>
```

**Example:**
```
./check-target-repo.sh --target ../maxxim-site
```

**Safety notes:**
- Entirely read-only: nothing is created, modified, or deleted.
- Reports a **count only** of likely-secret matches — matched values are
  never printed to the terminal.
- Always exits `0`; this is a scorecard for a human to act on, not a gate.

---

## Catalogue parsing assumption (shared by clone-third-party-tools.sh and update-catalogue.sh)

`repo-catalogue.yml` is treated as a simple YAML list: a top-level `repos:`
key containing `- name: ...` entries, each followed by indented `key: value`
lines (`url`, `status`, `clone_group`, `licence`). Both scripts parse this
with `awk`/`grep`/`sed` line-by-line — there is no `yq`/full-YAML dependency.
This means multi-line values, inline comments after a value, and flow-style
(`{ }`/`[ ]`) YAML are **not** supported. If the catalogue's shape changes,
the parsing block in both scripts will need updating together.
