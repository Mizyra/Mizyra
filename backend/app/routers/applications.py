from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, Form, UploadFile, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Application

router = APIRouter(prefix="/applications", tags=["applications"])

UPLOAD_DIR = Path(__file__).resolve().parents[2] / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("", status_code=status.HTTP_201_CREATED)
async def submit_application(
    full_name: str = Form(...),
    organization: str = Form(...),
    learner_type: str = Form(""),
    application_type: str = Form(...),
    course_interest: str = Form(...),
    experience_level: str = Form(...),
    career_goal: str = Form(""),
    email: str = Form(...),
    phone: str = Form(...),
    notes: str = Form(""),
    resume: UploadFile | None = File(default=None),
    db: Session = Depends(get_db),
):
    resume_path = ""
    if resume and resume.filename:
        extension = Path(resume.filename).suffix
        filename = f"{uuid4().hex}{extension}"
        destination = UPLOAD_DIR / filename
        content = await resume.read()
        destination.write_bytes(content)
        resume_path = str(destination)

    application = Application(
        full_name=full_name,
        organization=organization,
        learner_type=learner_type,
        application_type=application_type,
        course_interest=course_interest,
        experience_level=experience_level,
        career_goal=career_goal,
        email=email,
        phone=phone,
        notes=notes,
        resume_path=resume_path,
    )
    db.add(application)
    db.commit()
    db.refresh(application)

    return {"id": application.id, "message": "Application submitted successfully"}
