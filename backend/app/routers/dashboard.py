from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.database import get_db
from app.models import Course, User
from app.schemas import DashboardResponse

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/me", response_model=DashboardResponse)
def get_student_dashboard(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    course_rows = db.query(Course.title).limit(3).all()
    enrolled = [row[0] for row in course_rows] or ["Python Programming", "Machine Learning", "Cloud Computing"]

    return DashboardResponse(
        student_name=user.full_name,
        enrolled_courses=enrolled,
        assignments_due=["Week 3 API Project", "ML Model Evaluation Notebook", "Cloud Deployment Task"],
        internship_progress=68,
        mentor_messages=[
            "Great progress on your sprint deliverables.",
            "Please submit the architecture diagram by Friday.",
            "Your portfolio README is ready for final review.",
        ],
    )
