# Token usage guidance

Practical rules for keeping context small and cost sensible when working in this kit or in a
target repo it has been applied to. See `how-to-use-in-cloud-session.md` for how this applies
inside a Claude Cloud session specifically.

## The rules

- **Load the smallest relevant pack.** One pack `README.md`, not the whole kit. See `../README.md`
  for the recommended adoption order and how the packs are meant to be read one at a time.
- **Catalogue yml over full docs.** When checking a tool's status, licence or notes, read the
  structured catalogue entry in `../01-catalogue/` before reaching for the tool's own full
  documentation. The catalogue entry is written to answer the common question directly; the full
  upstream docs are a much larger read for the same answer.
- **`.vendor/` only on demand.** Never load `.vendor/` into context by default. It holds cloned
  third-party source, is disposable, and is often large. Clone a single tool with
  `03-scripts/clone-third-party-tools.sh <tool-name>` only when the task genuinely needs to
  inspect that tool's source.
- **Prefer refs to restatement.** Point at `OPERATING-SYSTEM.md` or a pack's `README.md` by
  section reference rather than copying its content into a new file. A rule written twice drifts;
  a rule referenced once stays correct. See the authority split in `OPERATING-SYSTEM.md` Section 7.
- **Use `--dry-run` output to decide what to read next**, rather than reading every file in a pack
  up front.

## Measuring actual usage

`ccusage` is catalogued as **template-only**: use it as a pattern for measuring token and cost
usage across a session or project, not as an adopt-now, wired-in dependency. See
`../01-catalogue/` for its full entry, licence and notes. Run it against a session to get a real
read on where tokens are going before assuming a pack or a habit is the cause of a heavy session.

## Long sessions

In a long session, prefer to summarise progress so far and continue from that summary, rather than
re-reading files already loaded earlier in the same session. If a file's content is needed again,
re-read only the section that matters, not the whole file, where the tool being used supports a
partial read.

**Next:** if a session repeatedly runs heavy on tokens for the same kind of task, raise it at the
next weekly washback (`../02-starter-packs/operating-rhythm/weekly-washback.md`) as a signal, so
the pack or the read order can be improved.
