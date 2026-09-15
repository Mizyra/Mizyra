from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import Application, BlogPost, Course, User
from app.schemas import ApplicationRead, BlogPostCreate, BlogPostRead, CourseCreate, CourseRead

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/applications", response_model=list[ApplicationRead])
def list_applications(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return db.query(Application).order_by(Application.created_at.desc()).all()


@router.get("/courses", response_model=list[CourseRead])
def admin_list_courses(db: Session = Depends(get_db), _: User = Depends(get_current_admin)):
    return db.query(Course).order_by(Course.id.asc()).all()


@router.post("/courses", response_model=CourseRead, status_code=status.HTTP_201_CREATED)
def create_course(
    payload: CourseCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    course = Course(**payload.model_dump())
    db.add(course)
    db.commit()
    db.refresh(course)
    return course


@router.put("/courses/{course_id}", response_model=CourseRead)
def update_course(
    course_id: int,
    payload: CourseCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    for key, value in payload.model_dump().items():
        setattr(course, key, value)

    db.commit()
    db.refresh(course)
    return course


@router.delete("/courses/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(course_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_admin)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    db.delete(course)
    db.commit()


@router.get("/blog-posts", response_model=list[BlogPostRead])
def list_blog_posts(db: Session = Depends(get_db), _: User = Depends(get_current_admin)):
    return db.query(BlogPost).order_by(BlogPost.created_at.desc()).all()


@router.post("/blog-posts", response_model=BlogPostRead, status_code=status.HTTP_201_CREATED)
def create_blog_post(
    payload: BlogPostCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    post = BlogPost(**payload.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.get("/overview")
def admin_overview(_: User = Depends(get_current_admin)):
    return {
        "training_materials": "Managed via secure cloud storage links",
        "progress_monitoring": "Internship completion tracked by weekly checkpoints",
        "mentor_management": "Mentor allocation and message review active",
    }
