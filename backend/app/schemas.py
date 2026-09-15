from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str


class UserCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=6)
    organization: str = ""


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserRead(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True


class CourseRead(BaseModel):
    id: int
    title: str
    track: str
    duration: str
    level: str
    instructor: str
    description: str

    class Config:
        from_attributes = True


class CourseCreate(BaseModel):
    title: str
    track: str
    duration: str
    level: str
    instructor: str
    description: str


class ApplicationRead(BaseModel):
    id: int
    full_name: str
    organization: str
    learner_type: str
    application_type: str
    course_interest: str
    experience_level: str
    career_goal: str
    email: EmailStr
    phone: str
    notes: str
    resume_path: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class DashboardResponse(BaseModel):
    student_name: str
    enrolled_courses: list[str]
    assignments_due: list[str]
    internship_progress: int
    mentor_messages: list[str]


class BlogPostCreate(BaseModel):
    title: str
    summary: str
    content: str
    category: str


class BlogPostRead(BaseModel):
    id: int
    title: str
    summary: str
    content: str
    category: str

    class Config:
        from_attributes = True
