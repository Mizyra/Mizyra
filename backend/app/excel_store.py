"""
Excel-backed storage for Contact form submissions.

Every submission is appended as a new row in a single workbook
(``contacts.xlsx`` by default, see ``Settings.contacts_excel_path``).
All read-modify-write access to the file is protected by a cross-process
file lock (via ``filelock``) so that concurrent requests — whether handled
by separate asyncio tasks, threads, or separate uvicorn worker processes —
never corrupt the workbook or silently drop a submission.

Timezone: submission timestamps are recorded in Asia/Kolkata (IST), which
is the timezone Mizyra operates in (Chennai, Tamil Nadu). Configurable via
the ``CONTACT_TIMEZONE`` environment variable.
"""

from __future__ import annotations

import threading
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

from filelock import FileLock, Timeout
from openpyxl import Workbook, load_workbook
from openpyxl.styles import Alignment, Font
from openpyxl.worksheet.worksheet import Worksheet

from app.config import get_settings

settings = get_settings()

SHEET_NAME = "Contacts"
HEADERS = ["ID", "Date & Time", "Name", "Email", "Phone", "Organization", "Message"]

# Column width heuristics (characters). The Message column wraps instead of
# growing indefinitely.
COLUMN_WIDTHS = {
    "A": 8,
    "B": 20,
    "C": 24,
    "D": 30,
    "E": 16,
    "F": 24,
    "G": 60,
}

# Characters that Excel/Sheets/LibreOffice interpret as the start of a
# formula. A leading apostrophe forces the cell to be treated as plain text.
FORMULA_TRIGGER_CHARS = ("=", "+", "-", "@")

# A single in-process lock guards the *decision* to acquire the file lock so
# threads in this worker queue up quickly instead of all hitting the
# filesystem lock at once; the FileLock itself is what makes this safe
# across separate processes/workers too.
_process_lock = threading.Lock()


class ExcelStoreError(Exception):
    """Raised when the submission cannot be safely written to disk."""


@dataclass
class ContactRecord:
    name: str
    email: str
    phone: str
    organization: str
    message: str


def _workbook_path() -> Path:
    configured = Path(settings.contacts_excel_path)
    if configured.is_absolute():
        return configured
    # Store next to the backend package root (same convention as the
    # existing SQLite database file and the /uploads directory).
    backend_root = Path(__file__).resolve().parent.parent
    return backend_root / configured


def _lock_path(workbook_path: Path) -> Path:
    return workbook_path.with_suffix(workbook_path.suffix + ".lock")


def sanitize_cell(value: str) -> str:
    """Neutralize Excel/CSV formula injection.

    If a value starts with a character Excel treats as the beginning of a
    formula (=, +, -, @), prefix it with an apostrophe so spreadsheet
    applications render it as literal text instead of evaluating it.
    """
    if value and value[0] in FORMULA_TRIGGER_CHARS:
        return "'" + value
    return value


def _style_worksheet(ws: Worksheet) -> None:
    header_font = Font(bold=True)
    for col_idx, header in enumerate(HEADERS, start=1):
        cell = ws.cell(row=1, column=col_idx, value=header)
        cell.font = header_font
        cell.alignment = Alignment(vertical="center")

    ws.freeze_panes = "A2"

    for col_letter, width in COLUMN_WIDTHS.items():
        ws.column_dimensions[col_letter].width = width


def _create_workbook(workbook_path: Path) -> Workbook:
    wb = Workbook()
    ws = wb.active
    ws.title = SHEET_NAME
    _style_worksheet(ws)
    workbook_path.parent.mkdir(parents=True, exist_ok=True)
    wb.save(workbook_path)
    return wb


def _next_id(ws: Worksheet) -> int:
    max_id = 0
    for row in ws.iter_rows(min_row=2, max_col=1, values_only=True):
        value = row[0]
        if isinstance(value, int):
            max_id = max(max_id, value)
        elif isinstance(value, str) and value.isdigit():
            max_id = max(max_id, int(value))
    return max_id + 1


def _current_timestamp() -> str:
    tz = ZoneInfo(settings.contact_timezone)
    return datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S %Z")


def append_contact(record: ContactRecord) -> int:
    """Append one submission as a new row and return its generated ID.

    Thread-safe and safe across multiple worker processes: guarded by an
    OS-level file lock scoped to the workbook, in addition to an in-process
    lock so threads in this worker don't hammer the filesystem lock.
    """
    workbook_path = _workbook_path()
    lock = FileLock(str(_lock_path(workbook_path)), timeout=10)

    with _process_lock:
        try:
            with lock:
                if workbook_path.exists():
                    wb = load_workbook(workbook_path)
                    if SHEET_NAME in wb.sheetnames:
                        ws = wb[SHEET_NAME]
                    else:
                        ws = wb.active
                        ws.title = SHEET_NAME
                        _style_worksheet(ws)
                else:
                    wb = _create_workbook(workbook_path)
                    ws = wb[SHEET_NAME]

                new_id = _next_id(ws)
                row_values = [
                    new_id,
                    _current_timestamp(),
                    sanitize_cell(record.name),
                    sanitize_cell(record.email),
                    sanitize_cell(record.phone),
                    sanitize_cell(record.organization),
                    sanitize_cell(record.message),
                ]
                ws.append(row_values)

                new_row = ws.max_row
                message_cell = ws.cell(row=new_row, column=HEADERS.index("Message") + 1)
                message_cell.alignment = Alignment(wrap_text=True, vertical="top")

                wb.save(workbook_path)
                return new_id
        except Timeout as exc:
            raise ExcelStoreError(
                "Another submission is being saved right now. Please try again in a moment."
            ) from exc
        except (OSError, PermissionError) as exc:
            raise ExcelStoreError(
                "The server could not access the submissions file. Please try again shortly."
            ) from exc
