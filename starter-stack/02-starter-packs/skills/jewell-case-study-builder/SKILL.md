# Jewell case study builder

Turn approved delivery work into a sanitised, publishable case study draft.

## When to use

After a piece of delivery work is complete, approved, and the engagement owner believes it is
strong enough to show as proof of Jewell's work.

## Inputs

- Approved delivery work only (from `05_Approved`), never a draft.
- The client's consent to be referenced, and the scope of what they consent to (named, anonymised,
  or metrics-only).

## Outputs

- A sanitised case study draft, filed in `04_CaseStudies`.

## Steps

1. Confirm approved work exists to draw from, and confirm client consent has actually been given,
   before drafting anything.
2. Draft the case study from the approved work only: challenge, approach, outcome.
3. Strip identifying detail (client name, figures, specifics) unless the client's consent
   explicitly covers that level of detail.
4. Mark the draft clearly as DRAFT, not for external use yet.
5. **Approval gate.** Clent reviews and approves the draft, and confirms client consent covers
   what is about to publish, before anything is published or shared externally.

## Guardrails

- Must never use un-sanitised client data. Strip identifying data by default; only include it if
  consent explicitly covers it.
- Must never publish before both Clent approval and client consent are confirmed, in that order
  of check.
- This is a Tier 2 client-facing action once published (it references a real client's work).
  Requires Clent approval and client consent before anything goes out. Internally, the draft
  itself is Tier 1 until that point.

## Where the output is filed

`04_CaseStudies`. Only a Clent-approved, consented case study is ever shared outside that folder.

## Example

Acme Co's website relaunch is complete and sits in `05_Approved`. Acme Co has consented to be
named with headline metrics only, not internal figures. The draft names Acme Co and the public
metric (for example, "3 point rise in conversion rate") and omits the underlying revenue figures,
pending Clent's sign-off before anything is shared.

## Success measure

The case study is publishable and consented, with nothing identifying beyond what the client
agreed to.
