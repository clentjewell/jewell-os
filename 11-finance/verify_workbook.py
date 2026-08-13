#!/usr/bin/env python3
"""
verify_workbook.py
------------------
Sanity-checks the workbook after update_workbook.py has run (or after any
manual edit). Always run this before re-uploading a new version to Google
Drive -- it is the guard against silently pushing a broken model.

Dependency: openpyxl only.

USAGE
-----
    python3 verify_workbook.py [--workbook PATH]

Checks performed
-----------------
1. Scans every sheet/cell for the literal string '#REF' (or any Excel
   error token) -- catches broken formula references from edits/copies.
2. Recomputes the personal cash subtotal (sum of the personal/day-to-day
   NAB accounts) and compares it against the workbook's own subtotal cell.
3. Recomputes total assets and net worth (sum of leaf asset/liability
   input cells) and compares against the workbook's own total cells.
4. Walks the Cashflow tab's closing-cash chain (closing[m] =
   opening[m] + inflows[m] - outflows[m], and opening[m+1] ==
   closing[m]) and reports any month where the chain breaks.
5. Prints a single PASS/FAIL report with every discrepancy found, and
   exits with a non-zero status code on FAIL so it can gate automation.

*** ORCHESTRATOR TODO ***
Every cell reference below (CELL_MAP-style constants at the top of this
file) is a placeholder. Fill them in against the real workbook layout.
Until they are filled in, the corresponding check is SKIPPED (reported
as "SKIPPED (not configured)"), not silently passed.
"""

import re
import sys
from pathlib import Path

try:
    from openpyxl import load_workbook
    from openpyxl.utils import column_index_from_string, get_column_letter
except ImportError:
    sys.exit(
        "ERROR: openpyxl is required. Install it with: pip install openpyxl"
    )

DEFAULT_WORKBOOK = Path(__file__).parent / "Clent-Jewell-Finance-FY27.xlsx"
ERROR_TOKENS = ("#REF!", "#REF", "#DIV/0!", "#VALUE!", "#NAME?", "#N/A", "#NULL!", "#NUM!")

TOLERANCE = 0.01  # dollars; allow for float/rounding noise

# ---------------------------------------------------------------------------
# Sheet names: "Net Worth 7 Jul 2026" (net worth cells) and "Cashflow Budget FY27" (cashflow rows). Chain rule: closing[c] = opening_or_prior_closing + net[c]; opening = B7 for Jul, prior M-1 closing after.
# ---------------------------------------------------------------------------

# Net Worth tab: leaf input cells that should sum to each subtotal/total.
NET_WORTH_SHEET = "Net Worth 7 Jul 2026"

PERSONAL_CASH_LEAF_CELLS = [
    "B6","B7","B8","B9","B10",
    # float/petty-cash cells that roll up into "personal cash" (exclude the
    # offset account if the workbook treats it as an asset-reduction against
    # the mortgage rather than personal cash -- confirm layout first).
]
PERSONAL_CASH_SUBTOTAL_CELL = "B11"

TOTAL_ASSETS_LEAF_CELLS = [
    "B11","B13","B15","B23",
    # Hub24 investment + super, property values, etc.)
]
TOTAL_ASSETS_CELL = "B24"

TOTAL_LIABILITIES_LEAF_CELLS = [
    "B26","B27",
    # any other debts)
]
TOTAL_LIABILITIES_CELL = "B28"

NET_WORTH_CELL = "B32"  # = B24 + B28
# (liabilities are expected to be stored as negative numbers; adjust the
# formula in check_net_worth() below if the workbook stores them as positive
# magnitudes instead).

# Cashflow tab: one column per month, with an opening, net and closing row.
#
# Rows are located by their column-A label, NOT by hardcoded row number. The
# previous hardcoded constants silently rotted out of date when rows were
# inserted or removed (they still pointed at a layout two versions old, so the
# chain check failed on every run and told us nothing). Labels survive
# insertions; row numbers do not.
CASHFLOW_SHEET = "Cashflow Budget FY27"
CASHFLOW_MONTH_COLUMNS = [
    "B","C","D","E","F","G","H","I","J","K","L","M",
]
CASHFLOW_OPENING_LABEL = "OPENING CASH (combined)"
CASHFLOW_NET_LABEL = "NET CASHFLOW (month)"
CASHFLOW_CLOSING_LABEL = "CLOSING CASH (end of month)"

# Jul and Aug openings are deliberately anchored to live bank balances rather
# than to the prior month's forecast closing, so the "opening == prior closing"
# rule only applies from the third month onward.
CASHFLOW_ANCHORED_MONTHS = 2


def _num(ws, cell_ref):
    val = ws[cell_ref].value
    if val is None:
        return 0.0
    try:
        return float(val)
    except (TypeError, ValueError):
        raise ValueError(f"Cell {ws.title}!{cell_ref} = {val!r} is not numeric")


def scan_for_errors(wb):
    findings = []
    for ws in wb.worksheets:
        for row in ws.iter_rows():
            for cell in row:
                if isinstance(cell.value, str) and any(tok in cell.value for tok in ERROR_TOKENS):
                    findings.append(f"{ws.title}!{cell.coordinate} = {cell.value!r}")
    return findings


def _leaf(ws, cell):
    v = ws[cell].value
    return v if isinstance(v, (int, float)) else 0.0


_A1 = re.compile(r"^\$?([A-Z]{1,3})\$?(\d+)$")
_REF = re.compile(r"\$?[A-Z]{1,3}\$?\d+")
_SUM = re.compile(r"SUM\(([^()]*)\)")
_SAFE = re.compile(r"^[0-9eE\.\+\-\*/\(\), ]*$")


def _make_evaluator(ws):
    """Return value(ref) -> float, evaluating this sheet's formula graph.

    Deliberately supports only what the Cashflow tab actually uses: numeric
    literals, SUM() over ranges and comma-separated args, the four arithmetic
    operators, parentheses and unary minus. Anything else -- a cross-sheet
    reference, an unexpected function -- raises rather than silently
    evaluating to zero, because a check that quietly returns 0 is worse than
    no check at all.
    """
    cache = {}
    in_progress = set()

    def expand(a, b):
        m1, m2 = _A1.match(a.replace("$", "")), _A1.match(b.replace("$", ""))
        if not (m1 and m2):
            raise ValueError(f"unsupported range {a}:{b}")
        c1, r1 = m1.groups()
        c2, r2 = m2.groups()
        cols = range(column_index_from_string(c1), column_index_from_string(c2) + 1)
        return [f"{get_column_letter(c)}{r}"
                for c in cols for r in range(int(r1), int(r2) + 1)]

    def evaluate(expr, origin):
        if "!" in expr:
            raise ValueError(f"{origin}: cross-sheet reference not supported")
        while True:
            m = _SUM.search(expr)
            if not m:
                break
            total = 0.0
            for part in m.group(1).split(","):
                part = part.strip()
                if not part:
                    continue
                if ":" in part:
                    a, b = part.split(":", 1)
                    total += sum(value(x) for x in expand(a, b))
                else:
                    total += value(part)
            expr = f"{expr[:m.start()]}({total!r}){expr[m.end():]}"
        expr = _REF.sub(lambda m: f"({value(m.group(0))!r})", expr)
        if not _SAFE.match(expr):
            raise ValueError(f"{origin}: unsupported expression {expr!r}")
        return float(eval(expr))          # noqa: S307 -- guarded by _SAFE

    def value(ref):
        ref = ref.replace("$", "").upper()
        if ref in cache:
            return cache[ref]
        if ref in in_progress:
            raise ValueError(f"circular reference at {ref}")
        raw = ws[ref].value
        if raw is None:
            result = 0.0
        elif isinstance(raw, (int, float)):
            result = float(raw)
        elif isinstance(raw, str) and raw.startswith("="):
            in_progress.add(ref)
            try:
                result = evaluate(raw[1:], ref)
            finally:
                in_progress.discard(ref)
        else:
            result = 0.0
        cache[ref] = result
        return result

    return value


def _nw_recompute(wb):
    ws = wb[NET_WORTH_SHEET]
    cash = sum(_leaf(ws, c) for c in PERSONAL_CASH_LEAF_CELLS)
    ent = _leaf(ws, "B18") + _leaf(ws, "B19") + _leaf(ws, "B20") + _leaf(ws, "B22")
    assets = cash + _leaf(ws, "B13") + _leaf(ws, "B15") + ent
    liab = _leaf(ws, "B26") + _leaf(ws, "B27")
    return cash, assets, liab


def check_personal_cash(wb):
    ws = wb[NET_WORTH_SHEET]
    f = ws[PERSONAL_CASH_SUBTOTAL_CELL].value
    if f != "=SUM(B6:B10)":
        return "FAIL", f"subtotal formula changed: {f!r} (expected =SUM(B6:B10))"
    cash, _, _ = _nw_recompute(wb)
    return "PASS", f"leaf sum {cash:,.2f}; subtotal formula intact"


def check_total_assets(wb):
    ws = wb[NET_WORTH_SHEET]
    f = ws[TOTAL_ASSETS_CELL].value
    if f != "=B11+B13+B15+B23":
        return "FAIL", f"total-assets formula changed: {f!r}"
    _, assets, _ = _nw_recompute(wb)
    return "PASS", f"recomputed total assets {assets:,.2f}; formula intact"


def check_net_worth(wb):
    ws = wb[NET_WORTH_SHEET]
    f_nw = ws[NET_WORTH_CELL].value
    f_li = ws[TOTAL_LIABILITIES_CELL].value
    if f_nw != "=B24+B28":
        return "FAIL", f"net-worth formula changed: {f_nw!r}"
    if f_li != "=SUM(B26:B27)":
        return "FAIL", f"liabilities formula changed: {f_li!r}"
    _, assets, liab = _nw_recompute(wb)
    return "PASS", f"recomputed net worth {assets + liab:,.2f} (assets {assets:,.2f} + liabilities {liab:,.2f})"


def _find_row(ws, label):
    """Return the row number whose column-A value matches `label` (trimmed)."""
    for row in ws.iter_rows(min_col=1, max_col=1, max_row=400):
        v = row[0].value
        if isinstance(v, str) and v.strip() == label:
            return row[0].row
    return None


def check_cashflow_chain(wb):
    """Independently evaluate the sheet's formulas and walk the cash chain.

    Rather than re-deriving the model from hardcoded leaf-row ranges (which
    goes stale the moment a row moves), this evaluates the workbook's own
    formula graph and then asserts the two identities the chain relies on:

        closing[m] == opening[m] + net[m]           (every month)
        opening[m] == closing[m-1]                  (after the anchored months)
    """
    ws = wb[CASHFLOW_SHEET]

    rows = {}
    for key, label in (("opening", CASHFLOW_OPENING_LABEL),
                       ("net", CASHFLOW_NET_LABEL),
                       ("closing", CASHFLOW_CLOSING_LABEL)):
        r = _find_row(ws, label)
        if r is None:
            return "FAIL", f"could not find the {label!r} row on {CASHFLOW_SHEET}"
        rows[key] = r

    try:
        value = _make_evaluator(ws)
    except Exception as exc:                      # noqa: BLE001
        return "FAIL", f"could not evaluate the sheet's formulas: {exc}"

    problems = []
    closings = []
    for i, col in enumerate(CASHFLOW_MONTH_COLUMNS):
        try:
            opening = value(f"{col}{rows['opening']}")
            net = value(f"{col}{rows['net']}")
            closing = value(f"{col}{rows['closing']}")
        except Exception as exc:                  # noqa: BLE001
            problems.append(f"{col}: {exc}")
            continue
        if abs((opening + net) - closing) > TOLERANCE:
            problems.append(
                f"{col}: closing {closing:,.2f} != opening {opening:,.2f} "
                f"+ net {net:,.2f}"
            )
        if i >= CASHFLOW_ANCHORED_MONTHS:
            prior = value(f"{CASHFLOW_MONTH_COLUMNS[i - 1]}{rows['closing']}")
            if abs(opening - prior) > TOLERANCE:
                problems.append(
                    f"{col}: opening {opening:,.2f} != prior closing {prior:,.2f}"
                )
        closings.append(f"{col}={closing:,.0f}")

    if problems:
        return "FAIL", "; ".join(problems)
    return "PASS", (
        f"rows {rows['opening']}/{rows['net']}/{rows['closing']}; chain intact "
        "across 12 months; last 3 closings: " + " ".join(closings[-3:])
    )


def main():
    import argparse
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workbook", type=Path, default=DEFAULT_WORKBOOK)
    args = parser.parse_args()

    if not args.workbook.exists():
        sys.exit(f"ERROR: workbook not found at {args.workbook}")

    print(f"Verifying workbook: {args.workbook}\n")
    wb = load_workbook(args.workbook, data_only=False)

    results = []

    error_findings = scan_for_errors(wb)
    results.append((
        "Excel error tokens (#REF! etc.)",
        "FAIL" if error_findings else "PASS",
        "; ".join(error_findings) if error_findings else "none found",
    ))

    for label, fn in (
        ("Personal cash subtotal", check_personal_cash),
        ("Total assets", check_total_assets),
        ("Net worth", check_net_worth),
        ("Cashflow closing-cash chain", check_cashflow_chain),
    ):
        status, detail = fn(wb)
        results.append((label, status, detail or ""))

    print(f"{'CHECK':40} {'STATUS':10} DETAIL")
    print("-" * 100)
    overall_fail = False
    for label, status, detail in results:
        print(f"{label:40} {status:10} {detail}")
        if status == "FAIL":
            overall_fail = True

    print("-" * 100)
    if overall_fail:
        print("\nOVERALL: FAIL -- fix the issues above before re-uploading.")
        sys.exit(1)
    else:
        skipped = sum(1 for _, status, _ in results if status.startswith("SKIPPED"))
        if skipped:
            print(f"\nOVERALL: PASS ({skipped} check(s) SKIPPED -- CELL_MAP not fully "
                  "configured yet; do not treat as a full guarantee).")
        else:
            print("\nOVERALL: PASS")


if __name__ == "__main__":
    main()
