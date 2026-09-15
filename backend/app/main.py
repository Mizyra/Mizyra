from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text
from sqlalchemy.orm import Session

from app.auth import hash_password
from app.config import get_settings
from app.database import Base, SessionLocal, engine
from app.models import BlogPost, Course, User
from app.routers import admin, applications, auth, blog, courses, dashboard, learning_path

settings = get_settings()

app = FastAPI(title=settings.app_name)

origins = [origin.strip() for origin in settings.cors_origins.split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    ensure_schema_compatibility()
    seed_initial_data()


def ensure_schema_compatibility():
    inspector = inspect(engine)
    if not inspector.has_table("applications"):
        return

    app_columns = {column["name"] for column in inspector.get_columns("applications")}
    with engine.begin() as connection:
        if "learner_type" not in app_columns:
            connection.execute(text("ALTER TABLE applications ADD COLUMN learner_type VARCHAR(40) NOT NULL DEFAULT ''"))
        if "career_goal" not in app_columns:
            connection.execute(text("ALTER TABLE applications ADD COLUMN career_goal VARCHAR(120) NOT NULL DEFAULT ''"))


def seed_initial_data():
    db: Session = SessionLocal()
    try:
        if not db.query(User).filter(User.email == "admin@mooninstitute.tech").first():
            db.add(
                User(
                    full_name="Moon Admin",
                    email="admin@mooninstitute.tech",
                    organization="Moon Institute",
                    hashed_password=hash_password("Admin@123"),
                    role="admin",
                )
            )

        if not db.query(User).filter(User.email == "student@mooninstitute.tech").first():
            db.add(
                User(
                    full_name="Demo Student",
                    email="student@mooninstitute.tech",
                    organization="Moon Learner",
                    hashed_password=hash_password("Student@123"),
                    role="student",
                )
            )

        if db.query(Course).count() == 0:
            db.add_all(
                [
                    Course(
                        title="Basic Programming",
                        track="School Students",
                        duration="8 Weeks",
                        level="Beginner",
                        instructor="Meera Krishnan",
                        description="Foundational programming with visual logic and Python basics.",
                    ),
                    Course(
                        title="Python Programming",
                        track="College Students (UG/PG)",
                        duration="12 Weeks",
                        level="Intermediate",
                        instructor="Sneha Raj",
                        description="Core Python, APIs, OOP, and project development.",
                    ),
                    Course(
                        title="Machine Learning",
                        track="College Students (UG/PG)",
                        duration="14 Weeks",
                        level="Intermediate",
                        instructor="Priya S",
                        description="Model building, evaluation, and deployment fundamentals.",
                    ),
                    Course(
                        title="Cloud Engineering",
                        track="Working Professionals",
                        duration="14 Weeks",
                        level="Advanced",
                        instructor="Ishita Gupta",
                        description="Design and operate scalable cloud systems.",
                    ),
                    Course(
                        title="DevOps",
                        track="Working Professionals",
                        duration="12 Weeks",
                        level="Advanced",
                        instructor="Siddharth Rao",
                        description="CI/CD pipelines, container orchestration, and observability.",
                    ),
                ]
            )

        if db.query(BlogPost).count() == 0:
            db.add_all(
                [
                    BlogPost(
                        title="AI Career Roadmap for 2026",
                        summary="From fundamentals to portfolio and internship readiness.",
                        content="Structured guide to building AI expertise with projects and mentorship.",
                        category="AI Careers",
                    ),
                    BlogPost(
                        title="How to Build a Strong Developer Portfolio",
                        summary="Project curation and presentation strategy for hiring impact.",
                        content="A practical approach to portfolio planning for students and professionals.",
                        category="Career",
                    ),
                ]
            )

        db.commit()
    finally:
        db.close()


@app.get("/")
def health():
    return {"status": "ok", "service": "Moon Institute API"}


app.include_router(auth.router)
app.include_router(courses.router)
app.include_router(blog.router)
app.include_router(applications.router)
app.include_router(dashboard.router)
app.include_router(learning_path.router)
app.include_router(admin.router)
