# Worked example: a new client build repo

The smallest sensible set for a repo built for a client (for example a website or a small
automation, not a Jewell or Maxxim platform repo). See `../README.md` and `../02-starter-packs/`.

## The smallest set: base + gitleaks only

```
03-scripts/apply-to-target-repo.sh --dry-run --pack base --target ../client-build-repo
```

Then copy only `gitleaks.yml` by hand — the apply script has no single-workflow filter:

```
cp 02-starter-packs/security/workflows/gitleaks.yml ../client-build-repo/.github/workflows/
```

Skip the rest of the security pack for a client build repo unless the engagement calls for it.

## What NOT to install

- **The rest of the security pack** (zizmor, scorecard, dependency-review, semgrep,
  trufflehog-quarterly). These earn their keep on a repo carrying more surface area and a longer
  life than most client build repos. Adding them here is overhead without a matching benefit.
- **The evals pack.** A client build repo has no Ask endpoint or portal surface to test. There is
  nothing for `promptfoo` to run against.
- **The skills pack.** Skills are for the Jewell/Maxxim operating layer, not for a one-off client
  build.
- **The mcp pack's write-scope connectors.** A client build repo should not carry a broad
  Cloudflare or deployment connector unless that specific build genuinely needs it, and then only
  with the same read-only-first, sign-off rule as any other repo.
- **The memory or operating-rhythm packs.** These are for how Jewell runs, not for an individual
  client's codebase.

## Where client files actually live

Not in this repo. Client files, strategy, contracts, invoices and anything client-specific live
in Google Drive, under `01_Clients/<Client>/`, per `OPERATING-SYSTEM.md` Section 6. A client build
repo holds code: the site, the automation, the integration. It should not accumulate client
briefs, brand assets, or strategy documents as files committed to git. If a build genuinely needs
an asset in the repo (an image, a config value), keep it to what the running code needs, and keep
anything sensitive out of version control entirely.

**Next:** once base and gitleaks are applied, run
`03-scripts/check-target-repo.sh --target ../client-build-repo` to confirm nothing more than the
smallest set landed.
