#!/usr/bin/env bash
#
# update-catalogue.sh
#
# PURPOSE
#   Read-only reachability check for every repo listed in
#   01-catalogue/repo-catalogue.yml. Confirms each URL still resolves and
#   responds to `git ls-remote`, so stale/renamed/deleted upstream repos get
#   flagged before someone relies on them.
#
# USAGE
#   ./update-catalogue.sh [--dry-run]
#
# EXAMPLE
#   ./update-catalogue.sh              # checks every catalogued repo
#   ./update-catalogue.sh --dry-run    # lists what would be checked, checks nothing
#
# SAFETY
#   - Entirely read-only: only runs `git ls-remote --heads <url>`, never clones,
#     writes, or modifies anything.
#   - --dry-run lists the repos it would check and checks nothing.
#   - Each check is capped at 10 seconds via `timeout` so one slow/unreachable
#     host cannot hang the whole run.
#   - Exits 1 if any repo is unreachable, so this can gate CI; exits 0 (and 0
#     again for --dry-run) otherwise.
#   - This script never edits repo-catalogue.yml. Classification changes
#     (clone_group, status, etc.) are made by hand in that file and require
#     Clent's approval per starter-stack governance — this script only reports.
#
# CATALOGUE PARSING ASSUMPTION
#   Same assumption as clone-third-party-tools.sh: repo-catalogue.yml is a
#   `repos:` list of `- name: ...` blocks with indented `key: value` lines
#   (name, url, status, clone_group, licence), parsed line-by-line with awk.
#   No multi-line values, inline comments, or flow-style YAML are supported.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STARTER_STACK_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
CATALOGUE="${STARTER_STACK_ROOT}/01-catalogue/repo-catalogue.yml"

DRY_RUN=0
for arg in "$@"; do
  case "${arg}" in
    --dry-run) DRY_RUN=1 ;;
    -h|--help)
      echo "Usage: $(basename "${BASH_SOURCE[0]}") [--dry-run]" >&2
      exit 0
      ;;
    *)
      echo "Error: unrecognised argument '${arg}'." >&2
      exit 1
      ;;
  esac
done

if [[ ! -f "${CATALOGUE}" ]]; then
  echo "Error: catalogue file not found at ${CATALOGUE}." >&2
  exit 1
fi

echo "Jewell x Maxxim starter kit — catalogue reachability check"
echo "Catalogue: ${CATALOGUE}"
echo "Mode: $( [[ ${DRY_RUN} -eq 1 ]] && echo 'dry run (list only)' || echo 'live check' )"
echo

RECORDS="$(awk '
  function emit() {
    if (name != "") {
      print name "\x1f" url
    }
  }
  function clean(v) {
    sub(/^[ \t]+/, "", v)
    sub(/[ \t]+$/, "", v)
    gsub(/^["'"'"']|["'"'"']$/, "", v)
    return v
  }
  BEGIN { name=""; url="" }
  /^[[:space:]]*-[[:space:]]*name:/ {
    emit()
    v=$0; sub(/^[[:space:]]*-[[:space:]]*name:[[:space:]]*/, "", v); name=clean(v)
    url=""
    next
  }
  /^[[:space:]]*url:/ {
    v=$0; sub(/^[[:space:]]*url:[[:space:]]*/, "", v); url=clean(v); next
  }
  END { emit() }
' "${CATALOGUE}")"

if [[ -z "${RECORDS}" ]]; then
  echo "Error: no repo entries were parsed from ${CATALOGUE}." >&2
  exit 1
fi

OK_COUNT=0
UNREACHABLE_COUNT=0
declare -a UNREACHABLE_NAMES=()

while IFS=$'\x1f' read -r name url; do
  [[ -z "${name}" ]] && continue

  if [[ -z "${url}" ]]; then
    echo "UNREACHABLE (no url in catalogue): ${name}"
    UNREACHABLE_COUNT=$((UNREACHABLE_COUNT + 1))
    UNREACHABLE_NAMES+=("${name}")
    continue
  fi

  if [[ "${DRY_RUN}" -eq 1 ]]; then
    echo "[dry-run] would check: ${name} <- ${url}"
    continue
  fi

  if GIT_TERMINAL_PROMPT=0 timeout 10 git ls-remote --heads "${url}" >/dev/null 2>&1; then
    echo "OK:          ${name} (${url})"
    OK_COUNT=$((OK_COUNT + 1))
  else
    echo "UNREACHABLE: ${name} (${url})"
    UNREACHABLE_COUNT=$((UNREACHABLE_COUNT + 1))
    UNREACHABLE_NAMES+=("${name}")
  fi
done <<< "${RECORDS}"

echo
echo "----------------------------------------------------------------------"
if [[ "${DRY_RUN}" -eq 1 ]]; then
  echo "Dry run complete. No network checks were made."
else
  echo "Summary: ${OK_COUNT} OK, ${UNREACHABLE_COUNT} unreachable."
  if [[ ${#UNREACHABLE_NAMES[@]} -gt 0 ]]; then
    echo "  Unreachable: ${UNREACHABLE_NAMES[*]}"
  fi
fi
echo "----------------------------------------------------------------------"
echo "Reminder: this script is read-only. Classification changes (status,"
echo "clone_group, etc.) are made by editing repo-catalogue.yml by hand and"
echo "require Clent's approval per starter-stack governance."

if [[ "${DRY_RUN}" -eq 0 && ${UNREACHABLE_COUNT} -gt 0 ]]; then
  exit 1
fi
exit 0
