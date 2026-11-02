import logging
import threading
import time

from fastapi import APIRouter, HTTPException, Request, status

from app.excel_store import ContactRecord, ExcelStoreError, append_contact
from app.schemas import ContactCreate, ContactResponse

router = APIRouter(prefix="/contact", tags=["contact"])
logger = logging.getLogger("mizyra.contact")

# Minimal in-memory throttle: block obviously abusive back-to-back
# submissions from the same client IP. This is intentionally simple (no
# extra infrastructure) and resets on server restart; it is a first line
# of defense, not a replacement for a dedicated WAF/rate-limiting service.
_RATE_LIMIT_SECONDS = 20
_last_submission_by_ip: dict[str, float] = {}
_rate_limit_lock = threading.Lock()


def _enforce_rate_limit(client_ip: str) -> None:
    now = time.monotonic()
    with _rate_limit_lock:
        last = _last_submission_by_ip.get(client_ip)
        if last is not None and (now - last) < _RATE_LIMIT_SECONDS:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="You're submitting too quickly. Please wait a few seconds and try again.",
            )
        _last_submission_by_ip[client_ip] = now


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def submit_contact(payload: ContactCreate, request: Request) -> ContactResponse:
    client_ip = request.client.host if request.client else "unknown"
    _enforce_rate_limit(client_ip)

    try:
        append_contact(
            ContactRecord(
                name=payload.name,
                email=payload.email,
                phone=payload.phone,
                organization=payload.organization,
                message=payload.message,
            )
        )
    except ExcelStoreError as exc:
        # Do not leak internal file paths / stack traces to the client.
        logger.error("Failed to save contact submission: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Unable to submit your message right now. Please try again shortly.",
        ) from exc
    except Exception as exc:  # pragma: no cover - defensive catch-all
        logger.exception("Unexpected error while saving contact submission")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to submit your message right now. Please try again shortly.",
        ) from exc

    return ContactResponse(success=True, message="Your message has been submitted successfully.")
