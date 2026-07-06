#!/usr/bin/env bash
#
# check-target-repo.sh
#
# PURPOSE
#   Read-only audit of a target repository against the starter-kit baseline:
#   which baseline files are present/missing, and a rough count of
#   likely-secret-looking strings in tracked files (count only — matched
#   values are never printed).
#
# USAGE
#   ./check-target-repo.sh --target <path>
#
# EXAMPLE
#   ./check-target-repo.sh --target ../maxxim-site
#
# SAFETY
#   - Entirely read-only: no file is created, modified, or deleted.
#   - Never prints matched secret-like values, only a count.
#   - Always exits 0 (this is a report, not a gate) — read the scorecard.
#
# SECRET-PATTERN ASSUMPTION
#   The secret-string scan looks for `api_key` / `apikey` / `api-key` / `token`
#   / `password` (case-insensitive) followed by an assigned value of 16 or
#   more characters, and excludes any line containing "PLACEHOLDER" or
#   "example" (case-insensitive), since those are the starter kit's own
#   convention for dummy values. This is a heuristic, not a guarantee — it
#   will miss cleverly-obfuscated secrets and may flag long non-secret
#   strings. Treat a non-zero count as "go look", not "confirmed breach".

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

TARGET=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --target)
      [[ $# -ge 2 ]] || { echo "Error: --target requires a path." >&2; exit 1; }
      TARGET="$2"
      shift 2
      ;;
    -h|--help)
      echo "Usage: $(basename "${BASH_SOURCE[0]}") --target <path>" >&2
      exit 0
      ;;
    *)
      echo "Error: unrecognised argument '$1'." >&2
      exit 1
      ;;
  esac
done

if [[ -z "${TARGET}" ]]; then
  echo "Error: --target <path> is required." >&2
  exit 1
fi
if [[ ! -d "${TARGET}" ]]; then
  echo "Error: target '${TARGET}' does not exist or is not a directory." >&2
  exit 1
fi
TARGET="$(cd "${TARGET}" && pwd)"

echo "Jewell x Maxxim starter kit — target repo baseline audit"
echo "Target: ${TARGET}"
echo

# --- Baseline file presence -------------------------------------------------
declare -a ROWS=()

check_file() {
  local label="$1" rel="$2"
  if [[ -e "${TARGET}/${rel}" ]]; then
    ROWS+=("$(printf '%-45s %s' "${label}" 'found')")
  else
    ROWS+=("$(printf '%-45s %s' "${label}" 'missing')")
  fi
}

check_file "AGENTS.md"                              "AGENTS.md"
check_file "CLAUDE.md"                               "CLAUDE.md"
check_file ".github/workflows/gitleaks.yml"          ".github/workflows/gitleaks.yml"
check_file ".github/CODEOWNERS"                      ".github/CODEOWNERS"
check_file ".github/pull_request_template.md"        ".github/pull_request_template.md"

# .gitignore is checked separately: found/missing AND whether it covers the
# starter kit's secret patterns (.env*, *.pem, *.key, secrets/).
GITIGNORE_STATUS="missing"
if [[ -f "${TARGET}/.gitignore" ]]; then
  missing_patterns=()
  grep -qE '(^|/)\.env([^a-zA-Z0-9]|$)' "${TARGET}/.gitignore" 2>/dev/null || missing_patterns+=(".env*")
  grep -qE '\*\.pem($|[[:space:]])' "${TARGET}/.gitignore" 2>/dev/null || missing_patterns+=("*.pem")
  grep -qE '\*\.key($|[[:space:]])' "${TARGET}/.gitignore" 2>/dev/null || missing_patterns+=("*.key")
  grep -qE '(^|/)secrets/?($|[[:space:]])' "${TARGET}/.gitignore" 2>/dev/null || missing_patterns+=("secrets/")
  if [[ ${#missing_patterns[@]} -eq 0 ]]; then
    GITIGNORE_STATUS="found (covers .env*, *.pem, *.key, secrets/)"
  else
    GITIGNORE_STATUS="found but incomplete (missing: ${missing_patterns[*]})"
  fi
fi
ROWS+=("$(printf '%-45s %s' ".gitignore with secret patterns" "${GITIGNORE_STATUS}")")

# --- Secret-like string scan (count only, tracked files only where possible) -
SECRET_PATTERN='(api[_-]?key|apikey|token|password)[[:space:]]*[:=][[:space:]]*.{16,}'
EXCLUDE_PATTERN='placeholder|example'

secret_hits=0
files_scanned=0

if git -C "${TARGET}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  while IFS= read -r -d '' f; do
    [[ -f "${TARGET}/${f}" ]] || continue
    files_scanned=$((files_scanned + 1))
    hits="$(grep -IEc "${SECRET_PATTERN}" "${TARGET}/${f}" 2>/dev/null || true)"
    # grep -c counts matching lines, not excluded ones yet; refine with a
    # second pass only when the file has at least one candidate line, so we
    # never hold the actual matched text in a variable longer than necessary.
    if [[ "${hits}" -gt 0 ]]; then
      refined="$(grep -IE "${SECRET_PATTERN}" "${TARGET}/${f}" 2>/dev/null | grep -vciE "${EXCLUDE_PATTERN}" || true)"
      secret_hits=$((secret_hits + refined))
    fi
  done < <(git -C "${TARGET}" ls-files -z 2>/dev/null)
else
  echo "(target is not a git repository — falling back to a full filesystem scan, excluding .git/)"
  while IFS= read -r -d '' f; do
    files_scanned=$((files_scanned + 1))
    hits="$(grep -IEc "${SECRET_PATTERN}" "${f}" 2>/dev/null || true)"
    if [[ "${hits}" -gt 0 ]]; then
      refined="$(grep -IE "${SECRET_PATTERN}" "${f}" 2>/dev/null | grep -vciE "${EXCLUDE_PATTERN}" || true)"
      secret_hits=$((secret_hits + refined))
    fi
  done < <(find "${TARGET}" -type f -not -path '*/.git/*' -print0)
fi

echo "Baseline file scorecard"
echo "-----------------------"
for row in "${ROWS[@]}"; do
  echo "  ${row}"
done
echo
echo "Secret-like string scan"
echo "------------------------"
echo "  Files scanned:            ${files_scanned}"
echo "  Likely-secret lines found: ${secret_hits} (count only — no values printed)"
if [[ "${secret_hits}" -gt 0 ]]; then
  echo "  -> Review manually before this repo is shared or made public."
fi
echo
echo "This is a read-only report; nothing in the target repo was changed."
exit 0
