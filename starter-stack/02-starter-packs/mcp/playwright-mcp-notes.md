# Playwright MCP notes

Practical notes for `microsoft/playwright-mcp` (Apache-2.0). See the register entry in
`approved-mcp-servers.md` and the risk entries in `mcp-risk-register.md`. Status: template-only,
per `../../01-catalogue/`.

## What it is used for at Jewell

- Browser QA of a built site or client portal before launch: does the page render, does a flow
  work, does a link resolve.
- Testing client portal answers by role, alongside the eval pack in `../evals/`.

## When to reach for it

- Pre-launch QA of a site or portal, once the build is otherwise done.
- Verifying the client portal answer tester skill's expected behaviour end to end in a real
  browser, not only against the eval config.

Do not reach for it for routine content edits or for anything that does not need an actual
rendered browser.

## Keep it out of default installs

This connector is template-only. It is not part of the default `base-claude-code` pack or any
default session setup. Wire it into a session only when a specific QA task needs it, and remove
it once that task is done.

## Credentials in test scripts

No credentials of any kind belong in a Playwright test script or fixture. Where a test needs to
authenticate, reference an environment variable name only, marked `PLACEHOLDER`, and read the real
value from the approved secret store at run time — never hard-code it in the script.

**Next:** confirm the task genuinely needs a rendered browser before adding this connector to a
session.
