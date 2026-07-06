# How to review third-party tools

The checklist used to re-review a tool already in the catalogue, on the annual re-vetting
cadence in `OPERATING-SYSTEM.md` Section 11 Part C, or sooner if something about the tool
changes. See `how-to-add-a-new-tool.md` for bringing a tool in for the first time.

## The checklist

- **Active?** Is the project still maintained. Check the last release or commit date, and whether
  issues are being answered.
- **Licence?** Has the licence changed since it was last reviewed. Re-check against
  `../LICENSE-NOTES.md` if so.
- **Maintainer?** Has ownership changed hands (a new maintainer, an acquisition, a fork becoming
  the de facto project). A change here is itself a reason to re-review sooner than scheduled.
- **Security posture?** Any known incidents, disclosed vulnerabilities, or a track record that has
  changed since the last review.
- **Token cost?** Does using it well still cost a reasonable amount of context, or has it grown
  heavier than the value it provides.
- **Duplicative?** Does another already-adopted tool now do the same job better or more cheaply.
  If so, that is a reason to consider retiring one of the two.

## The decision

Every review ends in a catalogue update, dated and attributed:

- **Keep as is.**
- **Change status** — for example move from `watch` to `adopt-now`, or from `adopt-now` to
  `rejected`.
- **Retire** — remove it from active use, note why, and note what replaces it if anything.

Record the date of the review and the reviewer's name against the catalogue entry, per
`../01-catalogue/`. A review that changes nothing is still worth a dated note; it confirms the
tool was actually looked at, not just left alone by default.

**Next:** if the review changes a tool's status, update `../01-catalogue/adopt-now.md` or
`../01-catalogue/rejected.md` as appropriate, and note the change in the next monthly or quarterly
review per `OPERATING-SYSTEM.md` Section 12.
