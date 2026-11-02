import re
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, field_validator


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


PHONE_PATTERN = re.compile(r"^[0-9+\-()\s]{7,20}$")


class ContactCreate(BaseModel):
    """Matches the fields already present on the Mizyra contact forms
    (dedicated /contact page and the homepage #contact section)."""

    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field("", max_length=30)
    organization: str = Field("", max_length=200)
    message: str = Field(..., min_length=5, max_length=3000)

    @field_validator("name")
    @classmethod
    def name_not_blank(cls, value: str) -> str:
        cleaned = value.strip()
        if len(cleaned) < 2:
            raise ValueError("Name must be at least 2 characters long")
        return cleaned

    @field_validator("phone")
    @classmethod
    def phone_format(cls, value: str) -> str:
        cleaned = value.strip()
        if cleaned and not PHONE_PATTERN.match(cleaned):
            raise ValueError("Phone number contains invalid characters")
        return cleaned

    @field_validator("organization")
    @classmethod
    def organization_trim(cls, value: str) -> str:
        return value.strip()

    @field_validator("message")
    @classmethod
    def message_not_blank(cls, value: str) -> str:
        cleaned = value.strip()
        if len(cleaned) < 5:
            raise ValueError("Message must be at least 5 characters long")
        return cleaned


class ContactResponse(BaseModel):
    success: bool
    message: str
