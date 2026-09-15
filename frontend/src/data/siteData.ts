export type LearnerTrack = "School Students" | "College Students (UG/PG)" | "Working Professionals";
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export type CourseCategory =
  | "Programming Languages"
  | "Web Development"
  | "Mobile Development"
  | "Artificial Intelligence"
  | "Data Science"
  | "Cloud & DevOps"
  | "Cybersecurity"
  | "IoT & Robotics";

export type DurationFilter = "All" | "<= 8 Weeks" | "9-12 Weeks" | "13-16 Weeks" | "> 16 Weeks";

export type Course = {
  id: string;
  title: string;
  category: CourseCategory;
  track: LearnerTrack;
  durationWeeks: number;
  duration: string;
  level: SkillLevel;
  mentor: string;
  description: string;
  technologies: string[];
  enrollmentOptions: string[];
};

const mentorPool = [
  "Meera Krishnan",
  "Rahul Menon",
  "Priya S",
  "Siddharth Rao",
  "Nisha Kapoor",
  "Ishita Gupta",
  "Aman Verma",
  "Karan Iyer",
  "Divya Anand",
  "Vinod Mathew"
];

function mentor(index: number): string {
  return mentorPool[index % mentorPool.length];
}

function defaultTrack(level: SkillLevel): LearnerTrack {
  if (level === "Beginner") return "School Students";
  if (level === "Intermediate") return "College Students (UG/PG)";
  return "Working Professionals";
}

function makeCourse(
  id: string,
  title: string,
  category: CourseCategory,
  level: SkillLevel,
  durationWeeks: number,
  technologies: string[],
  description: string,
  mentorIndex: number,
  track?: LearnerTrack
): Course {
  return {
    id,
    title,
    category,
    track: track ?? defaultTrack(level),
    durationWeeks,
    duration: `${durationWeeks} Weeks`,
    level,
    mentor: mentor(mentorIndex),
    description,
    technologies,
    enrollmentOptions: ["Standard", "Mentor Plus", "Career Pro"]
  };
}

export const courses: Course[] = [
  makeCourse("python", "Python Programming", "Programming Languages", "Beginner", 10, ["Python", "OOP", "APIs"], "Build strong programming fundamentals with practical mini-projects.", 0, "College Students (UG/PG)"),
  makeCourse("java", "Java Programming", "Programming Languages", "Intermediate", 12, ["Java", "Spring Basics", "Collections"], "Object-oriented development with enterprise-ready Java practices.", 1),
  makeCourse("c-language", "C Programming", "Programming Languages", "Beginner", 8, ["C", "Pointers", "Memory"], "Master system-level programming basics and algorithmic thinking.", 2),
  makeCourse("cpp", "C++ Programming", "Programming Languages", "Intermediate", 10, ["C++", "STL", "OOP"], "Develop performant applications with modern C++ concepts.", 3),
  makeCourse("javascript", "JavaScript Programming", "Programming Languages", "Beginner", 8, ["JavaScript", "DOM", "ES6+"], "Learn core JavaScript and browser-based interactive programming.", 4),
  makeCourse("typescript", "TypeScript for Scalable Apps", "Programming Languages", "Intermediate", 8, ["TypeScript", "Typing", "Tooling"], "Write safer and scalable frontend/backend code with TypeScript.", 5),
  makeCourse("go", "Go Programming", "Programming Languages", "Intermediate", 10, ["Go", "Concurrency", "Microservices"], "Create high-performance backend services with Go.", 6, "Working Professionals"),
  makeCourse("rust", "Rust Systems Programming", "Programming Languages", "Advanced", 12, ["Rust", "Memory Safety", "Performance"], "Build robust systems software using safe low-level abstractions.", 7),
  makeCourse("kotlin", "Kotlin Programming", "Programming Languages", "Intermediate", 8, ["Kotlin", "JVM", "Coroutines"], "Develop concise modern JVM applications with Kotlin.", 8),
  makeCourse("swift", "Swift Programming", "Programming Languages", "Intermediate", 10, ["Swift", "iOS APIs", "Xcode"], "Create iOS-ready foundations with Swift language mastery.", 9),
  makeCourse("dart", "Dart Programming", "Programming Languages", "Beginner", 6, ["Dart", "OOP", "Flutter Base"], "Learn Dart to unlock cross-platform app development.", 0),
  makeCourse("php", "PHP Development", "Programming Languages", "Intermediate", 8, ["PHP", "Laravel", "Backend"], "Build server-side web applications with practical backend patterns.", 1),
  makeCourse("ruby", "Ruby Programming", "Programming Languages", "Intermediate", 8, ["Ruby", "Rails", "MVC"], "Rapidly build clean backend systems with Ruby.", 2),

  makeCourse("html-css", "HTML & CSS Foundations", "Web Development", "Beginner", 6, ["HTML", "CSS", "Responsive Design"], "Design beautiful, responsive web interfaces from scratch.", 3, "School Students"),
  makeCourse("react", "React Development", "Web Development", "Intermediate", 10, ["React", "Hooks", "State Management"], "Build modern component-driven web applications.", 4, "College Students (UG/PG)"),
  makeCourse("angular", "Angular Application Development", "Web Development", "Intermediate", 12, ["Angular", "RxJS", "TypeScript"], "Create enterprise-scale SPA applications with Angular.", 5),
  makeCourse("nextjs", "Next.js Full Stack Development", "Web Development", "Intermediate", 12, ["Next.js", "SSR", "App Router"], "Develop performant SEO-friendly full stack applications.", 6),
  makeCourse("nodejs", "Node.js Backend Engineering", "Web Development", "Intermediate", 10, ["Node.js", "REST APIs", "Express"], "Build backend services and API-first products.", 7),
  makeCourse("express", "Express.js API Development", "Web Development", "Beginner", 8, ["Express.js", "Middleware", "MongoDB"], "Fast-track API development with practical backend architecture.", 8),

  makeCourse("flutter", "Flutter App Development", "Mobile Development", "Intermediate", 12, ["Flutter", "Dart", "State Management"], "Build cross-platform mobile apps with a single codebase.", 9),
  makeCourse("react-native", "React Native Development", "Mobile Development", "Intermediate", 12, ["React Native", "Expo", "APIs"], "Create production mobile apps with JavaScript and React patterns.", 0),
  makeCourse("android", "Android Development", "Mobile Development", "Intermediate", 14, ["Kotlin", "Android SDK", "Jetpack"], "Develop Android applications with modern architecture components.", 1),
  makeCourse("ios", "iOS Development", "Mobile Development", "Advanced", 14, ["Swift", "UIKit", "SwiftUI"], "Deliver premium iOS applications and publishing workflows.", 2),

  makeCourse("ml", "Machine Learning", "Artificial Intelligence", "Intermediate", 14, ["Scikit-learn", "Modeling", "Evaluation"], "Learn end-to-end ML workflows from data prep to deployment.", 3),
  makeCourse("deep-learning", "Deep Learning", "Artificial Intelligence", "Advanced", 16, ["PyTorch", "TensorFlow", "Neural Networks"], "Design and train advanced deep neural architectures.", 4),
  makeCourse("computer-vision", "Computer Vision", "Artificial Intelligence", "Advanced", 12, ["OpenCV", "CNN", "Image Processing"], "Build vision applications for detection and recognition.", 5),
  makeCourse("nlp", "Natural Language Processing", "Artificial Intelligence", "Advanced", 12, ["NLP", "Transformers", "LLMs"], "Create language AI solutions for chat and automation.", 6),

  makeCourse("data-analysis", "Data Analysis", "Data Science", "Beginner", 10, ["Python", "Pandas", "SQL"], "Analyze real datasets and derive actionable insights.", 7),
  makeCourse("data-viz", "Data Visualization", "Data Science", "Intermediate", 8, ["Power BI", "Tableau", "Storytelling"], "Communicate data insights through executive-level dashboards.", 8),
  makeCourse("big-data", "Big Data Engineering", "Data Science", "Advanced", 14, ["Spark", "Hadoop", "Data Pipelines"], "Scale data processing systems for enterprise workloads.", 9),

  makeCourse("aws", "AWS Cloud Practitioner to Architect", "Cloud & DevOps", "Intermediate", 12, ["AWS", "EC2", "S3"], "Deploy and scale resilient cloud-native systems on AWS.", 0),
  makeCourse("docker", "Docker for Developers", "Cloud & DevOps", "Beginner", 6, ["Docker", "Containers", "Images"], "Containerize applications with production-ready practices.", 1),
  makeCourse("kubernetes", "Kubernetes Orchestration", "Cloud & DevOps", "Advanced", 12, ["Kubernetes", "Helm", "Cluster Ops"], "Manage distributed workloads with robust orchestration.", 2),
  makeCourse("cicd", "CI/CD Pipelines", "Cloud & DevOps", "Intermediate", 8, ["GitHub Actions", "Jenkins", "DevOps"], "Automate testing and deployment lifecycle effectively.", 3),

  makeCourse("ethical-hacking", "Ethical Hacking", "Cybersecurity", "Intermediate", 12, ["Pentesting", "OWASP", "Kali Linux"], "Understand vulnerabilities and ethical attack simulation.", 4),
  makeCourse("network-security", "Network Security", "Cybersecurity", "Intermediate", 10, ["Firewalls", "SIEM", "NIDS"], "Protect enterprise infrastructure with layered network defense.", 5),
  makeCourse("digital-forensics", "Digital Forensics", "Cybersecurity", "Advanced", 12, ["Forensics", "Incident Response", "Chain of Custody"], "Investigate cyber incidents with forensic workflows.", 6),

  makeCourse("arduino", "Arduino Prototyping", "IoT & Robotics", "Beginner", 8, ["Arduino", "Sensors", "Embedded C"], "Create smart prototypes using hardware and sensor integrations.", 7, "School Students"),
  makeCourse("raspberry-pi", "Raspberry Pi Systems", "IoT & Robotics", "Intermediate", 10, ["Raspberry Pi", "Linux", "IoT"], "Develop edge devices and automation systems with Pi.", 8),
  makeCourse("embedded-systems", "Embedded Systems Engineering", "IoT & Robotics", "Advanced", 14, ["MCU", "RTOS", "Firmware"], "Design efficient embedded software and hardware interfaces.", 9),
  makeCourse("robotics", "Robotics Programming", "IoT & Robotics", "Intermediate", 12, ["Robotics", "Control Systems", "ROS"], "Program intelligent robotic workflows and motion systems.", 0)
];

export type Internship = {
  title: string;
  duration: string;
  stipend: string;
  mode: string;
  details: string;
  skillsGained: string[];
  projectWork: string;
  certification: string;
  process: string[];
};

export const internships: Internship[] = [
  {
    title: "Python Developer Internship",
    duration: "10 Weeks",
    stipend: "Paid Internship",
    mode: "Virtual + Mentor Guided",
    details: "Build backend APIs, automation systems, and production-ready scripts through sprint-based training.",
    skillsGained: ["Python", "APIs", "Git", "Testing"],
    projectWork: "Build a complete backend service with deployment checklist.",
    certification: "Industry Internship Certificate + Performance Grade",
    process: ["Application", "Training Phase", "Project Development", "Evaluation", "Certification"]
  },
  {
    title: "AI and Machine Learning Internship",
    duration: "12 Weeks",
    stipend: "Paid Internship",
    mode: "Virtual + Weekly Reviews",
    details: "Work on model pipelines, evaluation metrics, and deployable AI use-cases with mentors.",
    skillsGained: ["ML Pipelines", "Feature Engineering", "Model Deployment"],
    projectWork: "Build and present an AI solution with measurable performance metrics.",
    certification: "AI Internship Certificate + Project Assessment",
    process: ["Application", "Training Phase", "Project Development", "Evaluation", "Certification"]
  },
  {
    title: "Web Development Internship",
    duration: "8 Weeks",
    stipend: "Paid Internship",
    mode: "Remote Collaborative",
    details: "Develop full stack web products with sprint reviews and mentor code audits.",
    skillsGained: ["React", "Node.js", "Database Design", "Deployment"],
    projectWork: "Build a full stack product and publish portfolio-ready source code.",
    certification: "Web Internship Certificate + GitHub Portfolio Review",
    process: ["Application", "Training Phase", "Project Development", "Evaluation", "Certification"]
  },
  {
    title: "Data Science Internship",
    duration: "10 Weeks",
    stipend: "Paid Internship",
    mode: "Virtual",
    details: "Solve analytics problems with data modeling, visualization, and business reporting.",
    skillsGained: ["Data Analysis", "Visualization", "Storytelling", "ML Basics"],
    projectWork: "Build a business insight dashboard and predictive baseline model.",
    certification: "Data Science Internship Certificate",
    process: ["Application", "Training Phase", "Project Development", "Evaluation", "Certification"]
  },
  {
    title: "IoT Development Internship",
    duration: "9 Weeks",
    stipend: "Paid Internship",
    mode: "Hybrid Remote Hardware Lab",
    details: "Create smart IoT automation workflows using sensor data, edge devices, and dashboards.",
    skillsGained: ["IoT", "Embedded Basics", "MQTT", "Monitoring"],
    projectWork: "Deliver an end-to-end IoT project with real-time monitoring.",
    certification: "IoT Internship Certificate + Mentor Endorsement",
    process: ["Application", "Training Phase", "Project Development", "Evaluation", "Certification"]
  }
];

export const stats = [
  { label: "Students Trained", value: 12800 },
  { label: "Technologies Offered", value: 72 },
  { label: "Internships Completed", value: 3400 },
  { label: "Projects Built", value: 5200 }
];

const projectShowcaseSeed = [
  {
    title: "AI Chat Assistant Suite",
    description: "A multi-domain conversational assistant for admissions and technical guidance.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Python", "FastAPI", "LLM APIs", "PostgreSQL"]
  },
  {
    title: "Smart IoT Automation Hub",
    description: "Remote monitoring and rule-based automation platform for smart environments.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Raspberry Pi", "MQTT", "Node.js", "Grafana"]
  },
  {
    title: "Face Recognition Attendance",
    description: "Secure attendance system with liveness checks and analytics dashboard.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
    technologies: ["OpenCV", "TensorFlow", "FastAPI", "React"]
  },
  {
    title: "Full Stack Learning Platform",
    description: "Role-based LMS with assessments, progress tracking, and mentor collaboration.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Docker"]
  },
  {
    title: "Cybersecurity Command Center",
    description: "SOC dashboard for incident triage, response workflows, and risk reporting.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    technologies: ["SIEM", "Elastic", "Threat Intel", "React"]
  },
  {
    title: "Cloud FinOps Optimizer",
    description: "Usage analytics platform to optimize cloud cost and resource allocation.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    technologies: ["AWS", "BigQuery", "Looker", "Node.js"]
  },
  {
    title: "HealthTech Scheduling Grid",
    description: "Real-time scheduling engine for clinics with automated reminders.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Next.js", "Redis", "Twilio", "PostgreSQL"]
  },
  {
    title: "Smart Retail Vision AI",
    description: "Shelf analytics and demand forecasting with edge vision models.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80",
    technologies: ["PyTorch", "Edge AI", "OpenCV", "FastAPI"]
  },
  {
    title: "FinTech Risk Analyzer",
    description: "Model-driven credit risk system with explainable dashboards.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Python", "XGBoost", "Dash", "SQL"]
  },
  {
    title: "Robotics Fleet Manager",
    description: "Control center for autonomous lab robots with real-time telemetry.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    technologies: ["ROS", "IoT", "Telemetry", "React"]
  }
];

export const projectShowcase = Array.from({ length: 50 }, (_, index) => {
  const base = projectShowcaseSeed[index % projectShowcaseSeed.length];
  const sequence = String(index + 1).padStart(2, "0");
  return {
    ...base,
    title: `${base.title} ${sequence}`,
    image: `${base.image}&sig=${index + 1}`
  };
});

export const testimonials = [
  {
    name: "Anjali V",
    role: "B.Tech Student - AI Track",
    feedback: "The roadmap and practical project workflow gave me direct industry confidence.",

    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Rahul K",
    role: "Working Professional - Cloud Program",
    feedback: "I transitioned roles after building deployment projects with mentor reviews.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Sahana M",
    role: "School Student - Robotics",
    feedback: "My exhibition project and coding confidence improved dramatically in one term.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
  }
];

export const blogPosts = [
  {
    title: "AI Career Roadmap for Students in 2026",
    summary: "A practical roadmap from foundations to internship-ready AI projects.",
    category: "AI Careers"
  },
  {
    title: "How to Build a Strong Developer Portfolio",
    summary: "Project curation strategy that improves interview conversion.",
    category: "Career Guidance"
  },
  {
    title: "Cloud and DevOps Skills Hiring Teams Prioritize",
    summary: "The most valuable cloud engineering and automation skills in modern teams.",
    category: "Cloud"
  }
];

export const communityFeatures = [
  {
    title: "Discussion Boards",
    description: "Topic channels for coding, AI, cloud, cybersecurity, and project support."
  },
  {
    title: "Peer Project Sharing",
    description: "Showcase your builds, collect feedback, and collaborate with other learners."
  },
  {
    title: "Mentor Office Hours",
    description: "Weekly problem-solving sessions with faculty and industry mentors."
  },
  {
    title: "Networking Circles",
    description: "Career-focused cohorts for referrals, interview prep, and growth support."
  }
];

export const chatbotFaq: Record<string, string> = {
  course: "Use the Courses page filters to find programs by category, level, technology, or duration.",
  internship: "All internships are paid, project-based, and include mentor evaluation plus certification.",
  admission: "Submit the application form and expect an admissions response within 24-48 hours.",
  counseling: "Book counseling via Contact page for personalized learning path guidance.",
  roadmap: "Open Learning Path to generate your personalized technology roadmap by skill level and career goal.",
  career: "I can recommend tracks for Software Developer, AI Engineer, Data Scientist, Cloud Engineer, and more."
};

export type CareerPath =
  | "Software Developer"
  | "Web Developer"
  | "AI Engineer"
  | "Data Scientist"
  | "Cybersecurity Specialist"
  | "Cloud Engineer"
  | "Mobile App Developer"
  | "Game Developer"
  | "Robotics Engineer";

export const careerPaths: CareerPath[] = [
  "Software Developer",
  "Web Developer",
  "AI Engineer",
  "Data Scientist",
  "Cybersecurity Specialist",
  "Cloud Engineer",
  "Mobile App Developer",
  "Game Developer",
  "Robotics Engineer"
];

export type LearningPathStep = {
  milestone: string;
  category: CourseCategory;
  recommendedCourseIds: string[];
};

export const learningPathBlueprints: Record<CareerPath, LearningPathStep[]> = {
  "Software Developer": [
    { milestone: "Programming Foundations", category: "Programming Languages", recommendedCourseIds: ["python", "java", "cpp"] },
    { milestone: "Backend Engineering", category: "Web Development", recommendedCourseIds: ["nodejs", "express"] },
    { milestone: "Cloud Deployment", category: "Cloud & DevOps", recommendedCourseIds: ["docker", "cicd"] }
  ],
  "Web Developer": [
    { milestone: "Frontend Fundamentals", category: "Web Development", recommendedCourseIds: ["html-css", "javascript"] },
    { milestone: "Framework Expertise", category: "Web Development", recommendedCourseIds: ["react", "nextjs", "angular"] },
    { milestone: "Backend APIs", category: "Web Development", recommendedCourseIds: ["nodejs", "express"] }
  ],
  "AI Engineer": [
    { milestone: "Python and Data Foundations", category: "Programming Languages", recommendedCourseIds: ["python", "data-analysis"] },
    { milestone: "Core Machine Learning", category: "Artificial Intelligence", recommendedCourseIds: ["ml", "deep-learning"] },
    { milestone: "Applied AI Specialization", category: "Artificial Intelligence", recommendedCourseIds: ["computer-vision", "nlp"] }
  ],
  "Data Scientist": [
    { milestone: "Data Foundations", category: "Data Science", recommendedCourseIds: ["data-analysis", "python"] },
    { milestone: "Visualization and Communication", category: "Data Science", recommendedCourseIds: ["data-viz"] },
    { milestone: "Scalable Data Systems", category: "Data Science", recommendedCourseIds: ["big-data", "ml"] }
  ],
  "Cybersecurity Specialist": [
    { milestone: "Security Fundamentals", category: "Cybersecurity", recommendedCourseIds: ["network-security"] },
    { milestone: "Ethical Testing", category: "Cybersecurity", recommendedCourseIds: ["ethical-hacking"] },
    { milestone: "Incident and Forensics", category: "Cybersecurity", recommendedCourseIds: ["digital-forensics"] }
  ],
  "Cloud Engineer": [
    { milestone: "Cloud Core", category: "Cloud & DevOps", recommendedCourseIds: ["aws", "docker"] },
    { milestone: "Orchestration", category: "Cloud & DevOps", recommendedCourseIds: ["kubernetes"] },
    { milestone: "Automation and Reliability", category: "Cloud & DevOps", recommendedCourseIds: ["cicd"] }
  ],
  "Mobile App Developer": [
    { milestone: "Programming Foundation", category: "Programming Languages", recommendedCourseIds: ["dart", "kotlin", "swift"] },
    { milestone: "Cross-Platform Build", category: "Mobile Development", recommendedCourseIds: ["flutter", "react-native"] },
    { milestone: "Native Specialization", category: "Mobile Development", recommendedCourseIds: ["android", "ios"] }
  ],
  "Game Developer": [
    { milestone: "Core Programming", category: "Programming Languages", recommendedCourseIds: ["cpp", "c-language"] },
    { milestone: "Interactive Logic", category: "Web Development", recommendedCourseIds: ["javascript", "typescript"] },
    { milestone: "Performance and Systems", category: "Cloud & DevOps", recommendedCourseIds: ["docker", "kubernetes"] }
  ],
  "Robotics Engineer": [
    { milestone: "Electronics and Hardware", category: "IoT & Robotics", recommendedCourseIds: ["arduino", "raspberry-pi"] },
    { milestone: "Control and Embedded", category: "IoT & Robotics", recommendedCourseIds: ["embedded-systems"] },
    { milestone: "Intelligent Robotics", category: "IoT & Robotics", recommendedCourseIds: ["robotics", "computer-vision"] }
  ]
};

export function durationMatchesFilter(durationWeeks: number, filter: DurationFilter): boolean {
  if (filter === "All") return true;
  if (filter === "<= 8 Weeks") return durationWeeks <= 8;
  if (filter === "9-12 Weeks") return durationWeeks >= 9 && durationWeeks <= 12;
  if (filter === "13-16 Weeks") return durationWeeks >= 13 && durationWeeks <= 16;
  return durationWeeks > 16;
}


