#!/usr/bin/env bash
#
# apply-to-target-repo.sh
#
# PURPOSE
#   Copy one or more starter-pack directories from this starter-stack into a
#   target repository, without ever silently clobbering the target's existing
#   files.
#
# USAGE
#   ./apply-to-target-repo.sh --target <path> --pack <base|security|evals|skills|mcp|memory|operating-rhythm> \
#       [--pack <...> ...] [--dry-run]
#
# EXAMPLE
#   ./apply-to-target-repo.sh --target ../maxxim-site --pack base --pack security --dry-run
#   ./apply-to-target-repo.sh --target ../maxxim-site --pack base
#
# PACK -> SOURCE DIRECTORY MAPPING
#   base     -> 02-starter-packs/base-claude-code
#   security -> 02-starter-packs/security
#   evals    -> 02-starter-packs/evals
#   skills   -> 02-starter-packs/skills
#   mcp      -> 02-starter-packs/mcp
#   memory           -> 02-starter-packs/memory
#   operating-rhythm -> 02-starter-packs/operating-rhythm
#
# BEHAVIOUR / SAFETY
#   - --dry-run prints the full copy plan (source -> dest, and whether dest
#     already exists) and changes nothing on disk.
#   - Never overwrites an existing file without an interactive [y/N] confirm.
#     In a non-interactive session (no controlling terminal), the default is
#     always "No" — the existing file is left untouched.
#   - AGENTS.md / CLAUDE.md are special-cased: if the target already has one,
#     this script writes AGENTS.md.new / CLAUDE.md.new alongside it instead of
#     prompting, so nothing is ever silently merged or lost.
#   - Security pack: workflow files copy into <target>/.github/workflows/
#     (subject to the normal overwrite-confirm rule). The three security
#     templates (CODEOWNERS, pull_request_template.md, issue_template.md) copy
#     into <target>/.github/ only if that file does not already exist there —
#     no prompt, they are simply skipped if present. The security pack's own
#     README.md and repo-security-baseline.md are reference-only and are never
#     copied into a target repo.
#   - base/evals/skills/mcp packs: every file copies preserving its path
#     relative to the pack's source directory, e.g. base-claude-code/.claude/x
#     -> <target>/.claude/x. Each pack's own top-level README.md (which
#     documents the pack for starter-stack maintainers) is deliberately never
#     copied into a target repo.
#   - Refuses to copy any path matching secret patterns (.env*, *.pem, *.key,
#     anything under a secrets/ directory) and says so — these should never
#     exist in a starter pack, but this is a deliberate belt-and-braces check.
#   - Never copies .vendor/ or anything under it.
#   - Never touches git (no add/commit/push) and never deletes anything in the
#     target repo.
#
# ASSUMPTIONS
#   - The target path must already exist and be a directory (this script does
#     not create a new repository).
#   - Pack source directories may be incomplete or still under construction;
#     a missing pack directory is reported and skipped, not treated as fatal.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STARTER_STACK_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

DRY_RUN=0
TARGET=""
declare -a PACKS=()

usage() {
  cat >&2 <<'EOF'
Usage: apply-to-target-repo.sh --target <path> --pack <base|security|evals|skills|mcp|memory|operating-rhythm> [--pack ...] [--dry-run]
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --target)
      [[ $# -ge 2 ]] || { echo "Error: --target requires a path." >&2; exit 1; }
      TARGET="$2"
      shift 2
      ;;
    --pack)
      [[ $# -ge 2 ]] || { echo "Error: --pack requires a value." >&2; exit 1; }
      PACKS+=("$2")
      shift 2
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Error: unrecognised argument '$1'." >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "${TARGET}" ]]; then
  echo "Error: --target <path> is required." >&2
  usage
  exit 1
fi
if [[ ${#PACKS[@]} -eq 0 ]]; then
  echo "Error: at least one --pack is required." >&2
  usage
  exit 1
fi
if [[ ! -d "${TARGET}" ]]; then
  echo "Error: target '${TARGET}' does not exist or is not a directory. Nothing was copied." >&2
  exit 1
fi
TARGET="$(cd "${TARGET}" && pwd)"

for p in "${PACKS[@]}"; do
  case "${p}" in
    base|security|evals|skills|mcp|memory|operating-rhythm) ;;
    *)
      echo "Error: '${p}' is not a valid pack. Choose from: base, security, evals, skills, mcp, memory, operating-rhythm." >&2
      exit 1
      ;;
  esac
done

echo "Jewell x Maxxim starter kit — apply starter pack(s) to a target repo"
echo "Target: ${TARGET}"
echo "Packs:  ${PACKS[*]}"
echo "Mode:   $( [[ ${DRY_RUN} -eq 1 ]] && echo 'dry run (no changes)' || echo 'live' )"
echo

SECRET_PATTERN='(^|/)(\.env[^/]*|[^/]*\.pem|[^/]*\.key|secrets/.*)$'

is_secret_path() {
  local rel="$1"
  [[ "${rel}" =~ ${SECRET_PATTERN} ]]
}

is_vendor_path() {
  local rel="$1"
  [[ "${rel}" == .vendor/* || "${rel}" == *".vendor/"* ]]
}

# confirm_overwrite <human-readable prompt>
# Returns 0 (proceed) only on an explicit "y"/"Y" typed at a real terminal.
confirm_overwrite() {
  local prompt="$1"
  local reply="n"
  if [[ -t 0 && -t 1 ]]; then
    read -r -p "${prompt} [y/N] " reply || reply="n"
  else
    echo "  (non-interactive session — defaulting to No, existing file kept)"
    reply="n"
  fi
  [[ "${reply}" =~ ^[Yy]$ ]]
}

COPIED=0
SKIPPED_EXISTING=0
REFUSED=0

# copy_one <src-file> <dest-file> <special:agents-claude|only-if-missing|normal>
copy_one() {
  local src="$1" dest="$2" special="$3"
  local dest_display="${dest#"${STARTER_STACK_ROOT}"/}"
  local exists="no"
  [[ -e "${dest}" ]] && exists="yes"

  if [[ "${special}" == "agents-claude" && "${exists}" == "yes" ]]; then
    local new_dest="${dest}.new"
    echo "  ${src#"${STARTER_STACK_ROOT}"/} -> ${dest} (exists: yes -> writing ${new_dest} instead)"
    if [[ "${DRY_RUN}" -eq 0 ]]; then
      mkdir -p "$(dirname "${new_dest}")"
      cp "${src}" "${new_dest}"
    fi
    COPIED=$((COPIED + 1))
    return
  fi

  if [[ "${special}" == "only-if-missing" && "${exists}" == "yes" ]]; then
    echo "  ${src#"${STARTER_STACK_ROOT}"/} -> ${dest} (exists: yes -> skipped, only-if-missing rule)"
    SKIPPED_EXISTING=$((SKIPPED_EXISTING + 1))
    return
  fi

  if [[ "${exists}" == "yes" ]]; then
    if [[ "${DRY_RUN}" -eq 1 ]]; then
      echo "  ${src#"${STARTER_STACK_ROOT}"/} -> ${dest} (exists: yes -> would prompt to overwrite)"
      return
    fi
    if confirm_overwrite "  ${dest} already exists. Overwrite?"; then
      mkdir -p "$(dirname "${dest}")"
      cp "${src}" "${dest}"
      echo "  overwritten: ${dest}"
      COPIED=$((COPIED + 1))
    else
      echo "  kept existing: ${dest}"
      SKIPPED_EXISTING=$((SKIPPED_EXISTING + 1))
    fi
    return
  fi

  echo "  ${src#"${STARTER_STACK_ROOT}"/} -> ${dest} (exists: no -> would create)"
  if [[ "${DRY_RUN}" -eq 0 ]]; then
    mkdir -p "$(dirname "${dest}")"
    cp "${src}" "${dest}"
  fi
  COPIED=$((COPIED + 1))
}

# apply_generic_pack <pack-name> <source-dir>
apply_generic_pack() {
  local pack_name="$1" src_dir="$2"
  if [[ ! -d "${src_dir}" ]]; then
    echo "Pack '${pack_name}': source directory not found (${src_dir}) — skipping."
    return
  fi
  echo "Pack '${pack_name}' (${src_dir}):"
  local found_any=0
  while IFS= read -r -d '' file; do
    found_any=1
    local rel="${file#"${src_dir}"/}"

    if [[ "${rel}" == "README.md" ]]; then
      continue
    fi
    if is_vendor_path "${rel}"; then
      echo "  REFUSED (never copy .vendor/): ${rel}"
      REFUSED=$((REFUSED + 1))
      continue
    fi
    if is_secret_path "${rel}"; then
      echo "  REFUSED (matches secret pattern): ${rel}"
      REFUSED=$((REFUSED + 1))
      continue
    fi

    local dest="${TARGET}/${rel}"
    local base
    base="$(basename "${rel}")"
    if [[ "${base}" == "AGENTS.md" || "${base}" == "CLAUDE.md" ]]; then
      copy_one "${file}" "${dest}" "agents-claude"
    else
      copy_one "${file}" "${dest}" "normal"
    fi
  done < <(find "${src_dir}" -type f -print0 | sort -z)
  if [[ "${found_any}" -eq 0 ]]; then
    echo "  (pack directory has no files yet — nothing to copy)"
  fi
}

# apply_security_pack <source-dir>
apply_security_pack() {
  local src_dir="$1"
  if [[ ! -d "${src_dir}" ]]; then
    echo "Pack 'security': source directory not found (${src_dir}) — skipping."
    return
  fi
  echo "Pack 'security' (${src_dir}):"

  local workflows_dir="${src_dir}/workflows"
  if [[ -d "${workflows_dir}" ]]; then
    while IFS= read -r -d '' file; do
      local rel="workflows/$(basename "${file}")"
      if is_secret_path "${rel}"; then
        echo "  REFUSED (matches secret pattern): ${rel}"
        REFUSED=$((REFUSED + 1))
        continue
      fi
      local dest="${TARGET}/.github/workflows/$(basename "${file}")"
      copy_one "${file}" "${dest}" "normal"
    done < <(find "${workflows_dir}" -maxdepth 1 -type f -print0 | sort -z)
  fi

  local templates_dir="${src_dir}/templates"
  if [[ -d "${templates_dir}" ]]; then
    for name in CODEOWNERS pull_request_template.md issue_template.md; do
      local file="${templates_dir}/${name}"
      if [[ -f "${file}" ]]; then
        local dest="${TARGET}/.github/${name}"
        copy_one "${file}" "${dest}" "only-if-missing"
      fi
    done
    echo "  (repo-security-baseline.md and security/README.md are reference-only and are not copied)"
  fi
}

for pack in "${PACKS[@]}"; do
  case "${pack}" in
    base)     apply_generic_pack "base"     "${STARTER_STACK_ROOT}/02-starter-packs/base-claude-code" ;;
    security) apply_security_pack           "${STARTER_STACK_ROOT}/02-starter-packs/security" ;;
    evals)    apply_generic_pack "evals"    "${STARTER_STACK_ROOT}/02-starter-packs/evals" ;;
    skills)   apply_generic_pack "skills"   "${STARTER_STACK_ROOT}/02-starter-packs/skills" ;;
    mcp)      apply_generic_pack "mcp"      "${STARTER_STACK_ROOT}/02-starter-packs/mcp" ;;
    memory)   apply_generic_pack "memory"   "${STARTER_STACK_ROOT}/02-starter-packs/memory" ;;
    operating-rhythm) apply_generic_pack "operating-rhythm" "${STARTER_STACK_ROOT}/02-starter-packs/operating-rhythm" ;;
  esac
  echo
done

echo "----------------------------------------------------------------------"
if [[ "${DRY_RUN}" -eq 1 ]]; then
  echo "Dry run complete. No files were changed."
else
  echo "Summary: ${COPIED} file(s) copied/updated, ${SKIPPED_EXISTING} kept as-is, ${REFUSED} refused (secret pattern or .vendor/)."
fi
echo "----------------------------------------------------------------------"
echo "Next manual steps:"
echo "  1. Enable branch protection on the target repo's default branch (require review + status checks)."
echo "  2. Review any copied workflow files for placeholders (secrets, org names, endpoints) before enabling them."
echo "  3. Run the evals pack once the real agent/endpoint is wired up — do not trust default/example config as-is."
