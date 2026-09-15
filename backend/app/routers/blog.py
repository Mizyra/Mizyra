from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import BlogPost
from app.schemas import BlogPostRead

router = APIRouter(prefix="/blog", tags=["blog"])


@router.get("", response_model=list[BlogPostRead])
def list_public_blog_posts(db: Session = Depends(get_db)):
    return db.query(BlogPost).order_by(BlogPost.created_at.desc()).all()
