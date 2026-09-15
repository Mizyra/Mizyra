from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/learning-path", tags=["learning-path"])


class LearningPathRequest(BaseModel):
    skill_level: str
    career_goal: str
    technology: str = ""


ROADMAPS: dict[str, list[dict[str, list[str] | str]]] = {
    "Software Developer": [
        {"milestone": "Programming Foundations", "courses": ["Python Programming", "Java Programming", "C++ Programming"]},
        {"milestone": "Backend Engineering", "courses": ["Node.js Backend Engineering", "Express.js API Development"]},
        {"milestone": "Cloud Deployment", "courses": ["Docker for Developers", "CI/CD Pipelines"]},
    ],
    "Web Developer": [
        {"milestone": "Frontend Fundamentals", "courses": ["HTML & CSS Foundations", "JavaScript Programming"]},
        {"milestone": "Framework Expertise", "courses": ["React Development", "Next.js Full Stack Development", "Angular Application Development"]},
        {"milestone": "Backend APIs", "courses": ["Node.js Backend Engineering", "Express.js API Development"]},
    ],
    "AI Engineer": [
        {"milestone": "Data Foundations", "courses": ["Python Programming", "Data Analysis"]},
        {"milestone": "Model Development", "courses": ["Machine Learning", "Deep Learning"]},
        {"milestone": "Applied AI", "courses": ["Computer Vision", "Natural Language Processing"]},
    ],
    "Data Scientist": [
        {"milestone": "Data Handling", "courses": ["Data Analysis", "Python Programming"]},
        {"milestone": "Visualization", "courses": ["Data Visualization"]},
        {"milestone": "Scale and Modeling", "courses": ["Big Data Engineering", "Machine Learning"]},
    ],
    "Cybersecurity Specialist": [
        {"milestone": "Security Fundamentals", "courses": ["Network Security"]},
        {"milestone": "Offensive Security", "courses": ["Ethical Hacking"]},
        {"milestone": "Forensics", "courses": ["Digital Forensics"]},
    ],
    "Cloud Engineer": [
        {"milestone": "Cloud Core", "courses": ["AWS Cloud Practitioner to Architect", "Docker for Developers"]},
        {"milestone": "Orchestration", "courses": ["Kubernetes Orchestration"]},
        {"milestone": "Automation", "courses": ["CI/CD Pipelines"]},
    ],
    "Mobile App Developer": [
        {"milestone": "Language Core", "courses": ["Dart Programming", "Kotlin Programming", "Swift Programming"]},
        {"milestone": "Cross Platform", "courses": ["Flutter App Development", "React Native Development"]},
        {"milestone": "Native Systems", "courses": ["Android Development", "iOS Development"]},
    ],
    "Game Developer": [
        {"milestone": "Programming Core", "courses": ["C Programming", "C++ Programming"]},
        {"milestone": "Interactive Logic", "courses": ["JavaScript Programming", "TypeScript for Scalable Apps"]},
        {"milestone": "Performance", "courses": ["Docker for Developers", "Kubernetes Orchestration"]},
    ],
    "Robotics Engineer": [
        {"milestone": "Hardware Foundations", "courses": ["Arduino Prototyping", "Raspberry Pi Systems"]},
        {"milestone": "Control and Embedded", "courses": ["Embedded Systems Engineering"]},
        {"milestone": "Autonomous Robotics", "courses": ["Robotics Programming", "Computer Vision"]},
    ],
}


@router.post("/generate")
def generate_learning_path(payload: LearningPathRequest):
    steps = ROADMAPS.get(payload.career_goal, ROADMAPS["Software Developer"])

    if payload.technology.strip():
        lowered = payload.technology.lower()
        filtered_steps: list[dict[str, list[str] | str]] = []

        for step in steps:
            matching_courses = [
                course for course in step["courses"] if lowered in course.lower()
            ]
            if matching_courses:
                filtered_steps.append({"milestone": step["milestone"], "courses": matching_courses})

        if filtered_steps:
            steps = filtered_steps

    return {
        "skill_level": payload.skill_level,
        "career_goal": payload.career_goal,
        "technology": payload.technology,
        "steps": steps,
    }
