# Jewell meeting to actions

Turn a meeting transcript into owned, dated actions and a routed meeting note.

## When to use

After any internal or client meeting that has a transcript or a reliable capture. Use it once per
meeting, as soon as the capture is available.

## Inputs

- The meeting transcript. **Transcript source, honestly:** Circleback is the PRIMARY source. The
  skill searches Circleback for the meeting by title and date (`SearchMeetings`), then pulls the
  transcript via the connector (`GetTranscriptsForMeetings`). Manual paste of the transcript is
  the FALLBACK, used only when a meeting was not captured in Circleback (for example a call taken
  outside the connector, or a capture failure).
- The attendee list as recorded by the capture tool.
- The relevant Asana project (client project or internal project) to propose tasks into.

## Outputs

- A set of proposed Asana tasks, each with a suggested owner and a suggested date.
- A meeting note, routed to the client folder or `02_Internal`.

## Steps

1. Search Circleback for the meeting by title and date. If found, pull the transcript via the
   connector. If not found, fall back to a manual paste of the transcript. Read the transcript and
   identify candidate actions: anything committed to, assigned, or agreed as a next step.
2. For each candidate action, draft an owner (from the attendee list only) and a date (from what
   was actually said, or flagged as "no date given").
3. Draft the meeting note: attendees, decisions raised (not decided — decisions go through the
   decision log), and the action list.
4. Route the note to the client folder if the meeting was client-facing, or to `02_Internal` if
   it was internal.
5. Propose the actions into Asana as draft tasks, one task, one owner, one date each. Do not
   create the tasks as confirmed.
6. **Approval gate.** Each task owner reviews their proposed task(s) and confirms, edits, or
   rejects them. Only a confirmed task becomes a live Asana task.

## Guardrails

- Never invents an attendee, a commitment, or a date not present in the transcript. If unclear,
  flag it as a question rather than guessing.
- Never pulls in unrelated client data to fill a gap in this meeting's note.
- Actions are PROPOSED only: Tier 1 (internal meeting) confirmed by the task owner; Tier 2
  (client-facing meeting, or any action that touches client scope, pricing or a commitment)
  confirmed by the task owner and the engagement owner.
- Never leaves a note stranded in the capture tool. It always routes to its one home.
- Before filing an output to a Drive folder, confirm the folder exists; if it does not, propose
  creating it — never create it silently.

## Where the output is filed

The meeting note goes to the client folder (client `01_Discover` onward, or the closest matching
stage folder) for a client meeting, or to `02_Internal` for an internal meeting. Actions go to
Asana, in the relevant client or internal project, as one task with one owner and one date each.

## Example

Acme Co discovery call, 45 minutes, captured by Circleback. The skill drafts a note for
`01_Clients/Acme Co/01_Discover`, and proposes three Asana tasks: "Send Acme Co the audience
questionnaire" (owner: Ronnie, date: this Friday), "Confirm Acme Co's competitor list" (owner:
engagement owner, date: no date given, flagged), and "Share draft sitemap for review" (owner:
Ronnie, date: next Tuesday). Ronnie reviews and confirms two, and adds a date to the third before
confirming it.

## Success measure

Every real commitment from the meeting is captured as an action, none are missed, and none are
invented.
