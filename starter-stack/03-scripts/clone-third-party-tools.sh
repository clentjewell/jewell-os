#!/usr/bin/env bash
#
# clone-third-party-tools.sh
#
# PURPOSE
#   Shallow-clone third-party repositories listed in 01-catalogue/repo-catalogue.yml
#   into .vendor/<repo-name>, filtered by clone_group (or "all" for every
#   non-rejected repo). This gives a local/cloud-session copy of reference
#   material without ever committing it to this repository.
#
# USAGE
#   ./clone-third-party-tools.sh <adopt-now|security|evals|mcp|context|memory|all> [--dry-run]
#
# SAFETY
#   - --dry-run lists what would be cloned and clones nothing.
#   - A failed clone (network, auth, repo gone) is logged as
#     "SKIPPED (unavailable): <name>" and the batch continues — it never aborts.
#   - A repo whose destination directory already exists is skipped, not overwritten.
#   - Never touches secrets; only runs `git clone --depth 1` against catalogued URLs.
#   - Never commits anything. .vendor/ is expected to be gitignored — this script
#     does not push, add, or commit.
#
# CATALOGUE PARSING ASSUMPTION
#   repo-catalogue.yml is treated as a simple YAML list under a top-level `repos:`
#   key, where each entry is a `- name: ...` line followed by indented
#   `key: value` lines (url, status, clone_group, licence). This script parses it
#   with awk/grep/sed line-by-line — it does NOT understand full YAML (no
#   multi-line values, no inline comments after a value, no flow-style mappings).
#   If the catalogue format changes, this parser will need updating.
#
# SELECTION RULE
#   - Any repo with status: reject (case-insensitive) is always excluded, for
#     every mode including "all". This is a deliberate safety choice beyond the
#     literal brief, so that a rejected repo can never be cloned by mistake.
#   - mode "all"          -> every repo that is not rejected.
#   - mode <clone_group>  -> every non-rejected repo whose clone_group matches.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STARTER_STACK_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
CATALOGUE="${STARTER_STACK_ROOT}/01-catalogue/repo-catalogue.yml"
VENDOR_DIR="${STARTER_STACK_ROOT}/.vendor"

VALID_MODES=(adopt-now security evals mcp context memory all)

DRY_RUN=0
MODE=""

usage() {
  echo "Usage: $(basename "${BASH_SOURCE[0]}") <adopt-now|security|evals|mcp|context|memory|all> [--dry-run]" >&2
}

# --- Argument parsing (mode and --dry-run may appear in either order) -------
while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      if [[ -n "${MODE}" ]]; then
        echo "Error: unexpected extra argument '$1'." >&2
        usage
        exit 1
      fi
      MODE="$1"
      shift
      ;;
  esac
done

if [[ -z "${MODE}" ]]; then
  echo "Error: a mode is required." >&2
  usage
  exit 1
fi

mode_is_valid=0
for m in "${VALID_MODES[@]}"; do
  if [[ "${MODE}" == "${m}" ]]; then
    mode_is_valid=1
    break
  fi
done
if [[ "${mode_is_valid}" -ne 1 ]]; then
  echo "Error: '${MODE}' is not a valid mode. Choose one of: ${VALID_MODES[*]}." >&2
  exit 1
fi

if [[ ! -f "${CATALOGUE}" ]]; then
  echo "Error: catalogue file not found at ${CATALOGUE}." >&2
  echo "Nothing was cloned." >&2
  exit 1
fi

echo "Jewell x Maxxim starter kit — third-party clone helper"
echo "Mode: ${MODE}$( [[ ${DRY_RUN} -eq 1 ]] && echo ' (dry run)' )"
echo "Catalogue: ${CATALOGUE}"
echo "Destination: ${VENDOR_DIR}"
echo

# --- Parse the catalogue into pipe-free records (name, url, status, group) --
# Field separator is 0x1F (ASCII Unit Separator) so ordinary text can't collide.
RECORDS="$(awk '
  function emit() {
    if (name != "") {
      print name "\x1f" url "\x1f" status "\x1f" clone_group "\x1f" licence
    }
  }
  function clean(v) {
    sub(/^[ \t]+/, "", v)
    sub(/[ \t]+$/, "", v)
    gsub(/^["'"'"']|["'"'"']$/, "", v)
    return v
  }
  BEGIN { name=""; url=""; status=""; clone_group=""; licence="" }
  /^[[:space:]]*-[[:space:]]*name:/ {
    emit()
    v=$0; sub(/^[[:space:]]*-[[:space:]]*name:[[:space:]]*/, "", v); name=clean(v)
    url=""; status=""; clone_group=""; licence=""
    next
  }
  /^[[:space:]]*url:/ {
    v=$0; sub(/^[[:space:]]*url:[[:space:]]*/, "", v); url=clean(v); next
  }
  /^[[:space:]]*status:/ {
    v=$0; sub(/^[[:space:]]*status:[[:space:]]*/, "", v); status=clean(v); next
  }
  /^[[:space:]]*clone_group:/ {
    v=$0; sub(/^[[:space:]]*clone_group:[[:space:]]*/, "", v); clone_group=clean(v); next
  }
  /^[[:space:]]*licence:/ {
    v=$0; sub(/^[[:space:]]*licence:[[:space:]]*/, "", v); licence=clean(v); next
  }
  END { emit() }
' "${CATALOGUE}")"

if [[ -z "${RECORDS}" ]]; then
  echo "Error: no repo entries were parsed from ${CATALOGUE}." >&2
  echo "Check the file follows the documented 'repos: / - name: / key: value' shape." >&2
  exit 1
fi

CLONED=0
SKIPPED=0
FAILED=0
declare -a FAILED_NAMES=()
declare -a SKIPPED_NAMES=()

if [[ "${DRY_RUN}" -eq 0 ]]; then mkdir -p "${VENDOR_DIR}"; fi

while IFS=$'\x1f' read -r name url status clone_group licence; do
  [[ -z "${name}" ]] && continue

  status_lc="$(printf '%s' "${status}" | tr '[:upper:]' '[:lower:]')"
  if [[ "${status_lc}" == "reject" ]]; then
    continue
  fi

  if [[ "${MODE}" != "all" && "${clone_group}" != "${MODE}" ]]; then
    continue
  fi

  if [[ -z "${url}" ]]; then
    echo "SKIPPED (no url in catalogue): ${name}"
    SKIPPED=$((SKIPPED + 1))
    SKIPPED_NAMES+=("${name}")
    continue
  fi

  DEST="${VENDOR_DIR}/${name}"

  if [[ -e "${DEST}" ]]; then
    echo "SKIPPED (already present): ${name} -> ${DEST}"
    SKIPPED=$((SKIPPED + 1))
    SKIPPED_NAMES+=("${name}")
    continue
  fi

  if [[ "${DRY_RUN}" -eq 1 ]]; then
    echo "[dry-run] would clone: ${name} <- ${url} -> ${DEST} (clone_group: ${clone_group}, licence: ${licence})"
    continue
  fi

  echo "Cloning ${name} <- ${url} ..."
  CLONE_ERR="$(mktemp)"
  if GIT_TERMINAL_PROMPT=0 timeout 60 git clone --depth 1 --quiet "${url}" "${DEST}" 2>"${CLONE_ERR}"; then
    rm -f "${CLONE_ERR}"
    CLONED=$((CLONED + 1))

    if ! find "${DEST}" -maxdepth 1 \( -iname 'LICENSE*' -o -iname 'COPYING*' \) -print -quit | grep -q .; then
      echo "  WARNING: no LICENSE/COPYING file found in ${name} — check licence terms before reuse."
    fi
  else
    echo "SKIPPED (unavailable): ${name}"
    if [[ -s "${CLONE_ERR}" ]]; then
      sed 's/^/    git: /' "${CLONE_ERR}" || true
    fi
    rm -f "${CLONE_ERR}"
    rm -rf "${DEST}" 2>/dev/null || true
    FAILED=$((FAILED + 1))
    FAILED_NAMES+=("${name}")
  fi
done <<< "${RECORDS}"

echo
echo "----------------------------------------------------------------------"
if [[ "${DRY_RUN}" -eq 1 ]]; then
  echo "Dry run complete. No repositories were cloned."
else
  echo "Summary: ${CLONED} cloned, ${#SKIPPED_NAMES[@]} skipped, ${#FAILED_NAMES[@]} failed."
  if [[ ${#SKIPPED_NAMES[@]} -gt 0 ]]; then
    echo "  Skipped: ${SKIPPED_NAMES[*]}"
  fi
  if [[ ${#FAILED_NAMES[@]} -gt 0 ]]; then
    echo "  Failed:  ${FAILED_NAMES[*]}"
  fi
fi
echo "----------------------------------------------------------------------"
echo "Third-party clones are for local/cloud-session reference only. .vendor/ is gitignored — never commit it."
