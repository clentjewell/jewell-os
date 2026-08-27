#!/usr/bin/env python3
"""
update_downstream_tabs.py
-------------------------
Companion one-off to add_operating_expenses.py (cashflow v1.6 -> v1.7).

The cashflow rebuild changed every downstream number, and the three
narrative tabs -- 'Net Worth Forecast — 1 Oct 2026', 'Summary — Situation'
and 'Insights & Recommendations' -- carry hardcoded figures and prose keyed
to the old model. Their live formulas updated themselves; this script
updates the hardcoded text.

Drafted by delegated models against a fixed v1.6 -> v1.7 delta table,
reviewed and corrected by the orchestrator (per the AGENTS.md routing rule),
then applied here with strict guards: every find/replace must match exactly
once or the run aborts, so a drifted cell can never be silently half-edited.

Key deltas carried into the prose (recomputed independently, 13 Aug 2026):
  - Business burn Jul-Sep (net):        -$7,808  -> -$21,938
  - Closing Aug-26:                     $40,060  -> $35,600
  - Pre-settlement trough (late Sep):   $22,283  -> $13,913
  - Trough without the $25k bridge:     -$2,717  -> -$11,087
  - Combined liquid at settlement:      $456,926 -> $448,556
  - Net business cashflow Oct-Mar:      ~-$5.0k/mo -> ~-$6.7k/mo
  - Scenario business-burn assumption:  -$8,100  -> -$8,600
    (= v1.7 Oct-Jun average net business cashflow incl. tax months, -$8,557)
  - Runways (SEA lean / lean+$5k):      35 -> 34 months / 58 -> 55 months
  - Net worth 1 Oct forecast:           ~$1,139k -> ~$1,125k (both ~$1.13M)
  - Personal cash at 1 Oct:             ~$470k (unchanged; old prose said
    $466k/$472k from earlier imprecision -- aligned while touching the cells)

USAGE
-----
    python3 update_downstream_tabs.py --workbook PATH [--dry-run]
"""

import argparse
import sys
from pathlib import Path

try:
    from openpyxl import load_workbook
except ImportError:
    sys.exit("ERROR: openpyxl is required. Install it with: pip install openpyxl")

FORECAST = "Net Worth Forecast — 1 Oct 2026"
SUMMARY = "Summary — Situation"
INSIGHTS = "Insights & Recommendations"

# Each edit is (sheet, cell, action, payload):
#   "set"     -> payload is the full replacement value (str or number)
#   "replace" -> payload is a list of (find, replace) pairs; each must match
#                exactly once in the current cell text
#   "append"  -> payload is a string appended to the current cell text
EDITS = [
    # --- Net Worth Forecast — 1 Oct 2026 (v2.1 -> v2.2) --------------------
    (FORECAST, "A2", "set",
     "Forecast basis: 7 Jul 2026 net worth rolled forward through Jul–Sep "
     "2026 (selling costs + personal/business burn) · AUD · v2.2 · Updated "
     "13 Aug 2026 · Live formulas link to 'Net Worth 7 Jul 2026' and "
     "'Cashflow Budget FY27' · Yellow = editable assumptions. Now reflects "
     "the v1.7 cashflow — business operating expenses rebuilt from Xero "
     "actuals — plus worst-case Aug/Sep income and relocation costs."),
    (FORECAST, "C9", "append",
     " Rebuilt 13 Aug 2026 (cashflow v1.7): business operating expenses "
     "added from Xero — Jul–Sep business burn now −$21,938 (was −$7,808)."),
    (FORECAST, "A34", "replace", [("~$472k", "~$470k")]),
    (FORECAST, "C41", "set", -8600),
    (FORECAST, "C42", "set", -8600),
    (FORECAST, "C43", "set", -8600),
    (FORECAST, "C44", "set", -8600),
    (FORECAST, "C45", "set", -8600),
    (FORECAST, "A49", "replace",
     [("Updated 31 Jul 2026", "Updated 13 Aug 2026")]),
    (FORECAST, "A49", "append",
     " Business burn/mo set 13 Aug 2026 to −$8,600 = v1.7 Oct–Jun average "
     "net business cashflow incl. tax months (−$8,557)."),

    # --- Summary — Situation (v1.3 -> v1.4) --------------------------------
    (SUMMARY, "A2", "set",
     "As at 13 August 2026 · AUD · v1.4 · Cashflow Budget FY27 rebuilt to "
     "v1.7 — business operating expenses rebuilt from Xero, 13 Aug · NAB "
     "balances confirmed live 31 Jul (post payment run) · Hub24/Macquarie "
     "live 7 Jul"),
    (SUMMARY, "B7", "replace", [("≈ $466k", "≈ $470k")]),
    (SUMMARY, "B8", "replace", [
        ("business ≈ −$2.3k/mo net of confirmed income",
         "business ≈ −$6.7k/mo net of confirmed income "
         "(Oct–Mar, excl. tax-spike months; cashflow v1.7)"),
        ("Apr-27 spike ≈ $54k", "Apr-27 spike ≈ $60k"),
        ("May-27 ≈ $24k", "May-27 ≈ $30k"),
    ]),
    (SUMMARY, "B9", "replace",
     [("≈ $445k at settlement", "≈ $449k at settlement")]),

    # --- Insights & Recommendations ----------------------------------------
    (INSIGHTS, "A2", "replace", [("31 Jul 2026", "13 Aug 2026")]),
    (INSIGHTS, "B5", "replace", [
        ("≈ $445k", "≈ $449k"),
        ("≈ $1.12M", "≈ $1.13M"),
        ("~41% liquid", "~42% liquid"),
    ]),
    (INSIGHTS, "B6", "replace", [
        ("≈ −$10.4k", "≈ −$11.1k"),
        ("≈ +$14.6k", "≈ +$13.9k"),
        ("≈ $32.5k", "≈ $35.6k"),
    ]),
    (INSIGHTS, "B7", "replace", [
        ("≈ −$2.3k/mo", "≈ −$6.7k/mo")]),
    (INSIGHTS, "B8", "replace", [
        ("35 months", "34 months"),
        ("58 months", "55 months"),
    ]),
    (INSIGHTS, "B9", "replace", [
        ("≈ $54k out in April", "≈ $60k out in April"),
        ("≈ $24k in May", "≈ $30k in May"),
    ]),
    (INSIGHTS, "B12", "replace", [("≈ $466k", "≈ $470k")]),
    (INSIGHTS, "A21", "set", "Bookkeeping hygiene — RESOLVED (model side)"),
    (INSIGHTS, "B21", "set",
     "RESOLVED 13 Aug 2026: FY27 model rebuilt from Xero (cashflow v1.7) — "
     "18 operating lines added; Bank Fees $2,712 now a live line; Advisory "
     "$4,500 carried at nil with an explicit note. Still open: the Hubdoc "
     "forwarding loop (duplicate-entry risk)."),
    (INSIGHTS, "C21", "set", "DONE"),
    (INSIGHTS, "B24", "replace", [("only $17k net", "only $15k net")]),
    (INSIGHTS, "A42", "replace", [("31 Jul 2026", "13 Aug 2026")]),
]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workbook", type=Path, required=True)
    parser.add_argument("--out", type=Path, default=None)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not args.workbook.exists():
        sys.exit(f"ERROR: workbook not found at {args.workbook}")

    wb = load_workbook(args.workbook)
    errors = []
    applied = 0

    for sheet, cell, action, payload in EDITS:
        if sheet not in wb.sheetnames:
            errors.append(f"{sheet!r} missing from workbook")
            continue
        ws = wb[sheet]
        current = ws[cell].value

        if action == "set":
            print(f"  SET     {sheet}!{cell} -> {str(payload)[:70]}")
            if not args.dry_run:
                ws[cell] = payload
            applied += 1

        elif action == "append":
            if not isinstance(current, str):
                errors.append(f"{sheet}!{cell}: expected text to append to, "
                              f"found {current!r}")
                continue
            print(f"  APPEND  {sheet}!{cell} += {payload[:70]}")
            if not args.dry_run:
                ws[cell] = current + payload
            applied += 1

        elif action == "replace":
            if not isinstance(current, str):
                errors.append(f"{sheet}!{cell}: expected text, found {current!r}")
                continue
            text = current
            ok = True
            for find, repl in payload:
                n = text.count(find)
                if n != 1:
                    errors.append(f"{sheet}!{cell}: {find!r} found {n} times "
                                  "(need exactly 1)")
                    ok = False
                    continue
                text = text.replace(find, repl)
                print(f"  REPLACE {sheet}!{cell}: {find!r} -> {repl!r}")
            if ok and not args.dry_run:
                ws[cell] = text
            if ok:
                applied += 1

    if errors:
        print("\nABORTED — nothing saved. Guard failures:")
        for e in errors:
            print("  -", e)
        sys.exit(1)

    if args.dry_run:
        print(f"\nDRY RUN — {applied} edit(s) validated, nothing written.")
        return

    out = args.out or args.workbook
    wb.save(out)
    print(f"\nSaved: {out}  ({applied} edits)")
    print("Next: run verify_workbook.py, then re-upload to Google Drive.")


if __name__ == "__main__":
    main()
