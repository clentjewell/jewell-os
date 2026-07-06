#!/usr/bin/env bash
#
# bootstrap-cloud-session.sh
#
# PURPOSE
#   Orient a fresh Claude Code cloud session (or any operator) inside this
#   starter kit: print a recommended reading order, ask what kind of task is
#   at hand, and point at the one pack README and (optionally) one clone
#   group that are actually relevant — instead of loading the whole kit.
#
# USAGE
#   ./bootstrap-cloud-session.sh
#   ./bootstrap-cloud-session.sh <base|security|evals|mcp|browser-qa|full-review>
#
# EXAMPLE
#   ./bootstrap-cloud-session.sh                 # prompts interactively for a mode
#   ./bootstrap-cloud-session.sh security         # non-interactive, e.g. for CI logs
#
# SAFETY
#   This script is entirely read-only / informational. It never clones,
#   writes, deletes, or touches git. It only ever PRINTS the third-party
#   clone command that might be worth running next — it never runs it.
#   No --dry-run flag is needed because nothing here is destructive.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STARTER_STACK_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

VALID_MODES=(base security evals mcp browser-qa full-review)

echo "Jewell x Maxxim starter kit — cloud session bootstrap"
echo "======================================================"
echo
echo "Recommended reading order (in this order, before doing anything else):"
echo "  1. README.md"
echo "  2. AGENTS.md"
echo "  3. 01-catalogue/adopt-now.md"
echo "  4. 02-starter-packs/base-claude-code/README.md"
echo "  5. (then, once you know the task) only the one relevant pack README below."
echo
echo "Loading everything up front costs tokens for no benefit — read (1)-(4), then"
echo "come back here to pick the one thing relevant to the task in front of you."
echo

MODE="${1:-}"

if [[ -n "${MODE}" ]]; then
  mode_is_valid=0
  for m in "${VALID_MODES[@]}"; do
    [[ "${MODE}" == "${m}" ]] && mode_is_valid=1
  done
  if [[ "${mode_is_valid}" -ne 1 ]]; then
    echo "Error: '${MODE}' is not a valid mode. Choose one of: ${VALID_MODES[*]}." >&2
    exit 1
  fi
else
  echo "Choose a mode: ${VALID_MODES[*]}"
  if [[ -t 0 ]]; then
    read -r -p "Mode: " MODE
  else
    echo "Error: no mode given and no interactive terminal available." >&2
    echo "Re-run with a mode argument, e.g.: $(basename "${BASH_SOURCE[0]}") security" >&2
    exit 1
  fi
fi

mode_is_valid=0
for m in "${VALID_MODES[@]}"; do
  [[ "${MODE}" == "${m}" ]] && mode_is_valid=1
done
if [[ "${mode_is_valid}" -ne 1 ]]; then
  echo "Error: '${MODE}' is not a valid mode. Choose one of: ${VALID_MODES[*]}." >&2
  exit 1
fi

echo
echo "----------------------------------------------------------------------"
CLONE_SCRIPT="${SCRIPT_DIR}/clone-third-party-tools.sh"

case "${MODE}" in
  base)
    echo "Mode: base"
    echo "  Read: 02-starter-packs/base-claude-code/README.md"
    echo "  Clone group: none needed for base setup. Clone nothing."
    ;;
  security)
    echo "Mode: security"
    echo "  Read: 02-starter-packs/security/README.md"
    echo "  Clone group worth fetching: security"
    echo "  (only if you need a local copy of a catalogued security tool's source):"
    echo "    ${CLONE_SCRIPT} security"
    ;;
  evals)
    echo "Mode: evals"
    echo "  Read: 02-starter-packs/evals/README.md"
    echo "  Clone group worth fetching: evals"
    echo "    ${CLONE_SCRIPT} evals"
    ;;
  mcp)
    echo "Mode: mcp"
    echo "  Read: 02-starter-packs/mcp/README.md"
    echo "  Clone group worth fetching: mcp"
    echo "    ${CLONE_SCRIPT} mcp"
    ;;
  browser-qa)
    echo "Mode: browser-qa"
    echo "  Read: 02-starter-packs/mcp/README.md"
    echo "  Clone group worth fetching: mcp (specifically look for playwright-mcp in the"
    echo "  catalogue — that's the browser-automation MCP server this mode needs)."
    echo "    ${CLONE_SCRIPT} mcp"
    ;;
  full-review)
    echo "Mode: full-review"
    echo "  Read: 02-starter-packs/security/README.md and 02-starter-packs/evals/README.md"
    echo "  Clone groups worth fetching: security and evals"
    echo "    ${CLONE_SCRIPT} security"
    echo "    ${CLONE_SCRIPT} evals"
    ;;
esac

echo "----------------------------------------------------------------------"
echo
echo "Reminder: the command(s) above are printed for you to review and run yourself —"
echo "this script never runs them on your behalf."
echo
echo "Loading everything increases token usage. Fetch only what the task needs."
