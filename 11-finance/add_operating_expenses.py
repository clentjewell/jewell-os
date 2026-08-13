#!/usr/bin/env python3
"""
add_operating_expenses.py
-------------------------
One-off migration: adds the missing business operating-expense line items to
the "Cashflow Budget FY27" tab of the finance workbook.

WHY THIS EXISTS
---------------
As at v1.6 the workbook's BUSINESS EXPENSES section carried only three
blocks: Contractors, Subscriptions, and an "Operating Expense" block holding
just two lines -- Legal Expense ($350, Jul) and Window Cleaning ($360, Aug).
Everything else the business actually spends -- premises, vehicle, travel,
telco, insurance, bank fees, office, entertainment -- was absent, so
TOTAL BUSINESS EXPENSES and the whole closing-cash chain understated the
FY27 burn.

The v1.6 banner records that "rows 140-171 removed and subtotal formulas
repaired"; the stale comment left on the old "Operating - subtotal" row
("$2,800/mo base + $2,000 travel ... FY $39,600") is the fingerprint of an
operating block that was removed and never rebuilt. This script rebuilds it
from source data rather than from that comment.

SOURCE OF THE NUMBERS
---------------------
Xero (Jewell Group Pty Ltd, AUD), pulled 13 Aug 2026, three lenses:
  - FY26 full year   (1 Jul 2025 - 30 Jun 2026, accrual): opex $141,750.80
  - H2 FY26          (1 Jan - 30 Jun 2026, cash):         opex  $68,233.73
  - FY27 year-to-date(1 Jul - 13 Aug 2026, cash):         opex  $11,793.91

Xero's bank feed for the NAB business accounts is the underlying record for
all three, so this covers the "NAB historical business expenses" reference
as well.

Accounts already modelled elsewhere in the workbook are deliberately NOT
duplicated here:
  - Subscriptions / Subscription-Anthropic / Subscription-OpenAi
        -> the Subscriptions block (rows 60-87)
  - Bookkeeping fees   -> "Bookkeeping" (row 57)
  - Accounting fees    -> "Accountant / ASIC (TWB)" (business tax block)
  - Legal expenses     -> "Legal Expense" (row 90, left as-is)
  - Cleaning (window)  -> "Window Cleaning" (row 91, left as-is)

FORECASTING RULE APPLIED
------------------------
Jul-Sep 2026 sit at the most recent actual run rate (FY27 YTD where there is
one, otherwise the H2 FY26 monthly average). From Oct 2026 the workbook's own
structural events apply: 10 Buncrana Terrace settles 28 Sep 2026 and Clent
relocates, so premises lines (cleaning, power, rates, repairs) and the
vehicle line go to nil, and travel/entertainment step down to a reduced
steady state. Every line carries its basis in column P.

These are assumptions, not commitments. Column P names the source for each
line so any of them can be argued with directly.

WHAT THIS SCRIPT DOES
---------------------
1. Inserts 18 rows at row 92 (immediately below "Window Cleaning").
2. Writes the new line items, styled and grouped to match rows 90-91 --
   outline level 1, hidden, so the block collapses like every other block
   on the sheet.
3. Shifts every formula in the workbook that references a Cashflow row
   >= 92 by +18, including the cross-sheet references on the
   "Net Worth Forecast - 1 Oct 2026" tab and the AT A GLANCE box.
4. Repoints the operating subtotal at the full new range and refreshes the
   two subtotal comments.
5. Moves conditional-formatting ranges and cell comments that sit below the
   insertion point.
6. Bumps the version banner to v1.7.

Run verify_workbook.py afterwards. This script is idempotent-guarded: it
refuses to run twice by checking for a marker line item.

USAGE
-----
    python3 add_operating_expenses.py --workbook PATH [--dry-run]
"""

import argparse
import re
import sys
from copy import copy
from pathlib import Path

try:
    from openpyxl import load_workbook
    from openpyxl.comments import Comment
    from openpyxl.formatting.formatting import ConditionalFormattingList
    from openpyxl.utils import get_column_letter
except ImportError:
    sys.exit("ERROR: openpyxl is required. Install it with: pip install openpyxl")

SHEET = "Cashflow Budget FY27"
INSERT_AT = 92          # first new row; rows >= this shift down
STYLE_SOURCE_ROW = 90   # an existing item row in the Operating block
MONTH_COLS = list("BCDEFGHIJKLM")   # Jul-26 .. Jun-27
MARKER = "Cleaning — premises"      # idempotency guard

# Jul, Aug, Sep sit pre-settlement; Oct-Jun are post-settlement/relocation.
PRE = MONTH_COLS[:3]
POST = MONTH_COLS[3:]


def flat(value, cols=MONTH_COLS):
    return {c: value for c in cols}


def stepped(pre_value, post_value):
    d = {c: pre_value for c in PRE}
    d.update({c: post_value for c in POST})
    return d


# ---------------------------------------------------------------------------
# The new line items, in row order from INSERT_AT.
#   label   -> column A
#   values  -> {column letter: monthly amount}; omitted months stay blank
#   note    -> column P (source + basis)
# ---------------------------------------------------------------------------
NEW_ROWS = [
    (
        "  Cleaning — premises",
        stepped(375, None),
        "Xero 'Cleaning'. H2 FY26 cash $2,250 over 6 months = $375/mo. "
        "Buncrana Terrace premises — ceases at settlement 28 Sep 2026. "
        "Separate from the Window Cleaning one-off above, so no double count.",
    ),
    (
        "  Light, Power & Heating",
        stepped(70, None),
        "Xero 'Light, Power, Heating'. FY26 $837.65 = $70/mo. "
        "Premises — ceases at settlement 28 Sep 2026.",
    ),
    (
        "  Rates — business portion",
        stepped(105, None),
        "Xero 'Rates'. FY26 $1,284.29 = $107/mo; H2 FY26 cash $601.53. "
        "Ceases at settlement 28 Sep 2026. Personal share of Tweed Shire rates "
        "is already in personal Miscellaneous.",
    ),
    (
        "  Repairs & Maintenance",
        stepped(310, None),
        "Xero 'Repairs and Maintenance'. H2 FY26 cash $1,845 = $308/mo "
        "(pre-sale property upkeep). Ceases at settlement 28 Sep 2026.",
    ),
    (
        "  Motor Vehicle Expenses",
        stepped(400, None),
        "Xero 'Motor Vehicle Expenses'. H2 FY26 cash $2,815.81 = $469/mo; "
        "FY27 YTD $393.36 to 13 Aug. Held at $400/mo to settlement, then nil "
        "on relocation. BMW X5 rego/CTP sits in personal Rego/govt.",
    ),
    (
        "  Travel — National",
        stepped(700, 250),
        "Xero 'Travel - National'. FY26 $24,721.74; H2 FY26 cash $8,563.88 "
        "= $1,427/mo; FY27 YTD $1,003.27. Steps down to $250/mo post-relocation "
        "(in-country travel only). ASSUMPTION — confirm.",
    ),
    (
        "  Travel — International",
        stepped(650, 300),
        "Xero 'Travel - International'. FY26 $18,419.54; H2 FY26 cash "
        "$11,197.45; FY27 YTD $656.28. $300/mo post-relocation for client "
        "trips back to AU. One-off relocation flights sit in personal, not here. "
        "ASSUMPTION — confirm.",
    ),
    (
        "  Entertainment",
        {"B": 1000, "C": 950, "D": 400, **flat(200, POST)},
        "Xero 'Entertainment'. FY26 $4,475.70; FY27 YTD cash $1,935.99 to "
        "13 Aug — Jul/Aug carry that actual. Steps down to $200/mo "
        "post-relocation.",
    ),
    (
        "  Telephone & Internet",
        flat(270),
        "Xero 'Telephone & Internet'. H2 FY26 cash $1,617.04 = $270/mo; "
        "FY27 YTD $287.64. Continues post-relocation. Contractor internet fee "
        "is separate, in Subscriptions.",
    ),
    (
        "  Insurance",
        flat(250),
        "Xero 'Insurance'. FY26 $3,020.06; H2 FY26 cash $2,530.59. Business "
        "PI/PL held flat at $250/mo. CHECK: confirm cover is retained, and "
        "still valid, once operating from overseas.",
    ),
    (
        "  Bank Fees & FX",
        flat(180),
        "Xero 'Bank Fees' $2,711.54 FY26 plus realised FX on overseas "
        "contractor payments (−$263.38 FY26). H2 FY26 cash $1,438.55; FY27 YTD "
        "$185.08. Held at $180/mo as volume falls.",
    ),
    (
        "  Office Expenses",
        flat(75),
        "Xero 'Office Expenses'. FY26 $5,438.01, but H2 FY26 cash only $432.40 "
        "= $72/mo. Modelled on the recent run rate, not the FY26 total — the "
        "FY26 figure reflects a staffed AU office that no longer exists.",
    ),
    (
        "  Small Equipment (<$1,000)",
        flat(60),
        "Xero 'Small Equipment (Less than <$1000)'. FY26 $689.42 = $57/mo.",
    ),
    (
        "  Printing, Postage & Stationery",
        flat(10),
        "Xero 'Printing & Stationery' $24.07 + 'Postage, Freight & Courier' "
        "$17.78 (FY26). Nominal $10/mo.",
    ),
    (
        "  Filing Fees",
        flat(55),
        "Xero 'Filling Fees'. FY26 $658 = $55/mo. Residual lodgement/filing "
        "fees only — the ASIC annual review fee is in Accountant / ASIC (TWB) "
        "in the business tax block below.",
    ),
    (
        "  Professional & Consulting",
        {"B": 1250},
        "Xero 'Professional & Consulting'. FY26 $1,550; FY27 YTD cash $1,250 "
        "to 13 Aug, booked to Jul here. No further spend assumed.",
    ),
    (
        "  Advisory Fee",
        {},
        "Xero 'Advisory Fee'. FY26 $4,500, but nil in H2 FY26 and nil FY27 YTD. "
        "Left at nil: FY27 advisory is carried in Accountant / ASIC (TWB) below. "
        "Raise this line if a separate adviser is engaged.",
    ),
    (
        "  Other operating (sundry)",
        {},
        "Xero sundries, FY26: Clothing/laundry $653.91, Donation $205.95, "
        "Staff bonus $200, General $65, Client Gifts $22.73, Software $20.26, "
        "Interest $16.58 — c. $1,185 total. All nil in H2 FY26 cash and FY27 "
        "YTD; assumed not recurring. Merchant/Stripe/GoCardless fees are nil "
        "in Xero for FY26.",
    ),
]

N_NEW = len(NEW_ROWS)

VERSION_BANNER_OLD = "v1.6"
VERSION_BANNER_NEW = "v1.7"
BANNER_APPEND = (
    " · v1.7 (13 Aug 2026): business operating expenses rebuilt from Xero "
    "(FY26, H2 FY26 and FY27 YTD) — 18 line items added to the Operating "
    "Expense block, which previously held only Legal Expense and Window "
    "Cleaning."
)

CELL_REF = re.compile(r"(?<![A-Za-z0-9_!])(\$?)([A-Z]{1,3})(\$?)(\d+)(?![0-9(])")


def shift_formula(formula: str, at: int, by: int) -> str:
    """Shift row numbers >= `at` by `by` in an A1-style formula."""

    def repl(m):
        d1, col, d2, row = m.groups()
        row_i = int(row)
        if row_i >= at:
            row_i += by
        return f"{d1}{col}{d2}{row_i}"

    return CELL_REF.sub(repl, formula)


def shift_cross_sheet(formula: str, at: int, by: int) -> str:
    """Shift only references explicitly prefixed with the Cashflow sheet name."""
    pattern = re.compile(
        r"('%s'!)(\$?[A-Z]{1,3}\$?\d+)" % re.escape(SHEET)
    )

    def repl(m):
        prefix, ref = m.groups()
        return prefix + shift_formula(ref, at, by)

    out = pattern.sub(repl, formula)
    # Ranges like 'Sheet'!B132:D132 -- the second half carries no prefix, so
    # handle it by shifting the tail of any prefixed range too.
    range_pattern = re.compile(
        r"('%s'!\$?[A-Z]{1,3}\$?\d+):(\$?[A-Z]{1,3}\$?\d+)" % re.escape(SHEET)
    )
    out = range_pattern.sub(
        lambda m: f"{m.group(1)}:{shift_formula(m.group(2), at, by)}", out
    )
    return out


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workbook", type=Path, required=True)
    parser.add_argument("--out", type=Path, default=None,
                        help="Output path (defaults to overwriting --workbook)")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not args.workbook.exists():
        sys.exit(f"ERROR: workbook not found at {args.workbook}")

    wb = load_workbook(args.workbook)
    if SHEET not in wb.sheetnames:
        sys.exit(f"ERROR: sheet {SHEET!r} not found. Have: {wb.sheetnames}")
    ws = wb[SHEET]

    # --- idempotency guard --------------------------------------------------
    for row in ws.iter_rows(min_col=1, max_col=1):
        if isinstance(row[0].value, str) and MARKER in row[0].value:
            sys.exit(
                f"ERROR: {MARKER!r} already present at {row[0].coordinate} — "
                "the operating block has already been rebuilt. Aborting so the "
                "lines are not added twice."
            )

    print(f"Sheet {SHEET!r}: inserting {N_NEW} rows at row {INSERT_AT}")

    # --- capture things openpyxl will not move for us -----------------------
    comments = []
    for row in ws.iter_rows():
        for c in row:
            if c.comment is not None:
                comments.append((c.row, c.column, c.comment.text, c.comment.author))
    print(f"  captured {len(comments)} cell comment(s)")

    cf_ranges = []
    for rng, rules in ws.conditional_formatting._cf_rules.items():
        cf_ranges.append((str(rng.sqref), list(rules)))
    print(f"  captured {len(cf_ranges)} conditional-formatting range(s)")

    row_meta = {}
    for r, rd in ws.row_dimensions.items():
        row_meta[r] = (rd.outline_level, rd.hidden, rd.height)

    if args.dry_run:
        print("\nWould add these line items:")
        for i, (label, values, _note) in enumerate(NEW_ROWS):
            total = sum(v for v in values.values() if v)
            print(f"  r{INSERT_AT + i:<4} {label.strip():<32} FY27 ${total:,.0f}")
        grand = sum(sum(v for v in vals.values() if v) for _, vals, _ in NEW_ROWS)
        print(f"\n  New operating spend added across FY27: ${grand:,.0f}")
        print("\nDRY RUN — nothing written.")
        return

    # --- 1. insert -----------------------------------------------------------
    ws.insert_rows(INSERT_AT, N_NEW)

    # --- 2. restore row grouping/height below the insertion point -----------
    for r in sorted(row_meta, reverse=True):
        lvl, hidden, height = row_meta[r]
        target = r + N_NEW if r >= INSERT_AT else r
        rd = ws.row_dimensions[target]
        rd.outline_level, rd.hidden, rd.height = lvl, hidden, height

    # --- 3. style and fill the new rows -------------------------------------
    src = STYLE_SOURCE_ROW
    for i, (label, values, note) in enumerate(NEW_ROWS):
        r = INSERT_AT + i
        for col in range(1, 17):          # A..P
            dst = ws.cell(row=r, column=col)
            dst._style = copy(ws.cell(row=src, column=col)._style)
        ws.cell(row=r, column=1).value = label
        for col_letter, amount in values.items():
            if amount:
                ws[f"{col_letter}{r}"] = amount
        ws[f"P{r}"] = note
        rd = ws.row_dimensions[r]
        rd.outline_level, rd.hidden, rd.height = 1, True, 15.75
    # N/O formulas for the new rows are written AFTER the shift pass below --
    # writing them here would let the shift pass rewrite them onto themselves.

    # --- 4. shift every formula in the workbook -----------------------------
    shifted = 0
    for sheet in wb.worksheets:
        local = sheet.title == SHEET
        for row in sheet.iter_rows():
            for c in row:
                if not (isinstance(c.value, str) and c.value.startswith("=")):
                    continue
                new = (shift_formula(c.value, INSERT_AT, N_NEW) if local
                       else shift_cross_sheet(c.value, INSERT_AT, N_NEW))
                if new != c.value:
                    c.value = new
                    shifted += 1
    print(f"  rewrote {shifted} formula(s) for the +{N_NEW} row shift")

    # --- 4b. FY Total / Av-per-month for the new rows -----------------------
    # Written after the shift so the shift pass cannot rewrite them.
    for i in range(N_NEW):
        r = INSERT_AT + i
        ws[f"N{r}"] = f"=SUM(B{r}:M{r})"
        ws[f"O{r}"] = f"=N{r}/12"
    # Window Cleaning (row 91) never had its FY Total wired up -- fix it while
    # the block is being repaired, so every line in the block totals.
    if ws["N91"].value is None:
        ws["N91"] = "=SUM(B91:M91)"
        ws["O91"] = "=N91/12"
        print("  wired up the missing FY Total on Window Cleaning (row 91)")

    # --- 5. repoint the operating subtotal at the full block ----------------
    sub_row = 92 + N_NEW          # old 92 "Operating Expense - subtotal"
    tot_row = 93 + N_NEW          # old 93 "Operating — subtotal"
    last_item = INSERT_AT + N_NEW - 1
    for col in MONTH_COLS:
        ws[f"{col}{sub_row}"] = f"=SUM({col}90:{col}{last_item})"
        ws[f"{col}{tot_row}"] = f"={col}{sub_row}"
    ws[f"N{sub_row}"] = f"=SUM(B{sub_row}:M{sub_row})"
    ws[f"O{sub_row}"] = f"=N{sub_row}/12"
    ws[f"N{tot_row}"] = f"=SUM(B{tot_row}:M{tot_row})"
    ws[f"O{tot_row}"] = f"=N{tot_row}/12"
    ws[f"P{sub_row}"] = (
        f"Sum of rows 90–{last_item}. Rebuilt 13 Aug 2026 from Xero "
        "(FY26 accrual, H2 FY26 cash, FY27 YTD cash) — see each line's note "
        "for its basis."
    )
    ws[f"P{tot_row}"] = (
        "Operating expenses, excluding contractors, subscriptions, "
        "bookkeeping and accounting (each carried in their own block). "
        "Premises and vehicle lines end at settlement 28 Sep 2026; travel and "
        "entertainment step down post-relocation."
    )
    print(f"  operating subtotal repointed: rows 90–{last_item} "
          f"-> subtotal r{sub_row}, total r{tot_row}")

    # --- 6. move conditional formatting -------------------------------------
    new_cf = ConditionalFormattingList()
    for sqref, rules in cf_ranges:
        parts = []
        for part in str(sqref).split():
            parts.append(shift_formula(part, INSERT_AT, N_NEW))
        moved = " ".join(parts)
        for rule in rules:
            new_cf.add(moved, rule)
        if moved != str(sqref):
            print(f"  conditional formatting {sqref} -> {moved}")
    ws.conditional_formatting = new_cf

    # --- 7. move cell comments ----------------------------------------------
    for r, col, text, author in comments:
        target = r + N_NEW if r >= INSERT_AT else r
        cell = ws.cell(row=target, column=col)
        if cell.comment is None:
            cell.comment = Comment(text, author)
            print(f"  restored comment at {get_column_letter(col)}{target}")

    # --- 8. version banner ---------------------------------------------------
    banner = ws["A2"].value
    if isinstance(banner, str):
        ws["A2"] = banner.replace(VERSION_BANNER_OLD, VERSION_BANNER_NEW, 1) + BANNER_APPEND
        print(f"  banner bumped to {VERSION_BANNER_NEW}")

    out = args.out or args.workbook
    wb.save(out)
    grand = sum(sum(v for v in vals.values() if v) for _, vals, _ in NEW_ROWS)
    print(f"\nSaved: {out}")
    print(f"Added ${grand:,.0f} of previously-missing FY27 operating spend.")
    print("Next: run verify_workbook.py, then re-upload to Google Drive.")


if __name__ == "__main__":
    main()
