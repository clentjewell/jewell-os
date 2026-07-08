# Roadmap and next actions

The phased build and the immediate next steps. Full detail in
[OPERATING-SYSTEM.md, Section 18](./OPERATING-SYSTEM.md#section-18-implementation-roadmap) and
[Section 19](./OPERATING-SYSTEM.md#section-19-immediate-next-actions).

## The nine phases

1. **Audit and map** — read-only. Understand before changing.
2. **Design the operating system** — approve the manual.
3. **Create the `jewell-os` repo and core playbook** — this scaffold, populated.
4. **Set up security and access controls** — safe before scaling.
5. **Build the first routines** — Today door, packs, washback.
6. **Build the first skills** — the reusable workflows.
7. **Add evals and quality control** — trustworthy.
8. **Pilot with real work** — gates on, low-risk clients first.
9. **Review, simplify and scale** — retire what does not earn its keep.

Each phase has a goal, actions, outputs, owner, approval, risks and a definition of done in
Section 18.

## Immediate next actions

### Do now (low-risk, read-only or planning)
- Approve `OPERATING-SYSTEM.md`, or mark the changes you want.
- Run the read-only audits (Section 11 Part A).
- Draft the source-of-truth map against the real tools.
- Turn on GitHub secret scanning, branch protection and gitleaks on `jewell-os`.
- Review this scaffold.

### Do after approval (changes to files, permissions, repos, routines)
- Apply the Drive top-level structure (Section 6). Create, never delete.
- Set connector and token scopes to least privilege.
- Wire the Today door read from Calendar and Asana.
- Build the first routines and skills.
- Curate the Ask Jewell AI approved source set.
- Stand up the eval suite.

### Do not touch yet
- No deletions.
- No permission, credential, scope or auth change without sign-off.
- No moving of personal or legal content, and none into shared space.
- No client-facing change without the engagement owner and Clent.
- No secret in any prompt, doc or shared tool.

## Questions for Clent (only if genuinely blocking)
- Which secret store is canonical.
- Which clients are the low-risk pilot for Phase 8.
- Is Fireflies or Zoom the meeting-capture source of truth.
- Who holds Finance/Bookkeeping access today.

Audit first, then ask only what remains. **Next:** approve the "do now" list and start Phase 1.
