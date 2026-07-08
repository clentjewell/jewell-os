# Monthly OS scorecard

The monthly measure of whether the operating system is helping. One page. Mirrors
`OPERATING-SYSTEM.md` Section 17. Owner: Clent and Ronnie. Files to `00_Operating`.

For each measure below, record: the value this month, the direction (up, down or flat against
last month), the source it came from, and the one decision it drives: keep, improve, simplify,
automate, delegate or retire.

## Template

```
MONTHLY OS SCORECARD — <Month YYYY>

| Measure                                      | Value | Direction | Source              | Decision |
|-----------------------------------------------|-------|-----------|----------------------|----------|
| Packs delivered on time                       |       |           | Cadence log          |          |
| Decisions logged                              |       |           | Decision log         |          |
| Decisions re-litigated                        |       |           | Decision log         |          |
| Repeated questions                            |       |           | Ask logs             |          |
| Missing files                                 |       |           | Findability check    |          |
| Unclear ownership                             |       |           | Asana review         |          |
| Overdue tasks                                 |       |           | Asana                |          |
| Security issues found                         |       |           | Security review      |          |
| Access issues found                           |       |           | Access recertification|         |
| Hallucination or unsupported answers          |       |           | Evals                |          |
| Ask function accuracy                         |       |           | Evals                |          |
| Client portal answer quality                  |       |           | Evals                |          |
| Time saved                                    |       |           | Team estimate        |          |
| Unnecessary routines retired                  |       |           | Cadence review        |          |
| Maxxim IP created from Jewell work             |       |           | Library log          |          |
| Client-sensitive information protected         |       |           | Security review       |          |
| Personal information protected                |       |           | Boundary review        |          |
| Team adoption                                  |       |           | Usage                 |          |
```

## Reading the good direction

- Up is good: packs on time, decisions logged, Ask accuracy, portal quality, time saved, routines
  retired (a quarterly habit, some retirement each quarter is healthy), Maxxim IP created, adoption.
- Down is good: decisions re-litigated, repeated questions, missing files, unclear ownership,
  overdue tasks.
- Found early is good: security issues, access issues. A rising count here early in adoption is
  not automatically bad; it may mean the review is working.
- Zero is the target: hallucination or unsupported answers, client-sensitive information
  incidents, personal information incidents. These three carry zero tolerance. Any non-zero value
  is escalated immediately, not held for the monthly read.

## The one decision per measure

Do not leave a measure without a decision. The choices are: **keep** (it is working, change
nothing), **improve** (it is working but could be better), **simplify** (it is doing too much),
**automate** (a human is doing something the system could assemble), **delegate** (the right
owner is not the one currently doing it), or **retire** (it is not earning its keep).

## Notes

- **October: daylight saving check.** The Today door cron is set in UTC and does not track NSW
  daylight saving automatically. When daylight saving starts in October, either move the cron
  from 21:00 UTC to 20:00 UTC (Sun–Thu), or accept the post moving from 7:00am to 8:00am NSW.
  Check and record the decision at the October review.

## Filing

Save to `00_Operating`, named `YYYY-MM_OSScorecard.md`. Clent reads it at the monthly review in
`OPERATING-SYSTEM.md` Section 12. It is an input to that review, not a replacement for it.

**Next:** carry every "improve", "simplify", "automate", "delegate" or "retire" decision into the
next `weekly-washback.md` as a proposed change, with this scorecard as its evidence.
