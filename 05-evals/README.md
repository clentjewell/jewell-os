# 05-evals

The eval system and quality control. The full design lives in
[OPERATING-SYSTEM.md, Section 16](../OPERATING-SYSTEM.md#section-16-evals-and-quality-control).

## Purpose

Test whether the operating system actually works: can it find the right file, answer from
approved source, refuse when it should, protect what is private, keep the boundaries, and hold
quality across models.

## How to run

- Keep golden sets as version-controlled files (`golden-questions.md` and any structured
  fixtures).
- Use promptfoo, or a similar tool, to run them in CI on any change to a prompt, source set or
  portal, and on a schedule.
- Run the same set across models to confirm quality holds.
- Assert on: correct answer, correct source cited, correct refusal, no leakage, correct
  escalation.
- **Fail the build hard on any leakage or hallucination.** A soft miss is a warning; a leak is a
  stop.

## What is tested

Ask function accuracy, hallucination prevention, portal answers, security handling, privacy
boundaries, model switching, repeat-question reduction, action quality, decision capture, file
findability, source citation, role-based access, Maxxim/Jewell boundary clarity, refusal quality,
escalation quality, stale-information detection.

## Files

- `golden-questions.md` — the maintained golden set, by role.
