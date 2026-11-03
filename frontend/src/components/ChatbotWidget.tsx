"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { courses, projectShowcase } from "@/data/siteData";
import { WHATSAPP_CHAT_URL } from "@/lib/whatsapp";

type ChatAction = {
  label: string;
  href: string;
};

type ChatMessage = {
  id: number;
  role: "bot" | "user";
  text: string;
  actions?: ChatAction[];
};

const quickActions: ChatAction[] = [
  { label: "Projects", href: "/projects" },
  { label: "Apply Now", href: "/apply" },
  { label: "Contact", href: "/contact" }
];

const serviceAreas = [
  "Software development",
  "AI and machine learning",
  "Web and mobile app development",
  "UI/UX and graphic design",
  "Research and publication support",
  "IoT and cloud solutions",
  "Digital marketing"
];

const projectCategories = [
  "Web Development",
  "App Development",
  "IoT Projects",
  "Real-Time Projects",
  "Research Papers",
  "Digital Marketing"
];

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9@.+\s]/g, " ").replace(/\s+/g, " ").trim();
}

function containsAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function answerQuestion(input: string): Pick<ChatMessage, "text" | "actions"> {
  const question = normalize(input);

  if (containsAny(question, ["what is mizyra", "who is mizyra", "about mizyra", "mizyra overview", "company overview", "about the company", "who are you", "what do you do"])) {
    return {
      text: "MIZYRA is a technology and learning company offering software, AI, design, research, IoT, and digital growth services, alongside technology learning programs.",
      actions: [{ label: "Explore services", href: "/#services" }, ...quickActions]
    };
  }

  if (containsAny(question, ["email", "mail id", "gmail"])) {
    return {
      text: "You can email MIZYRA at mizyra.official@gmail.com.",
      actions: [{ label: "Email MIZYRA", href: "mailto:mizyra.official@gmail.com" }, { label: "Contact page", href: "/contact" }]
    };
  }

  if (containsAny(question, ["whatsapp", "phone", "telephone", "call", "mobile number"])) {
    return {
      text: "MIZYRA's listed phone number is +91 93631 56825. You can also reach the team on WhatsApp.",
      actions: [
        { label: "WhatsApp", href: WHATSAPP_CHAT_URL },
        { label: "Call", href: "tel:+919363156825" }
      ]
    };
  }

  if (containsAny(question, ["location", "address", "where are you", "where is mizyra", "nagercoil", "kanyakumari"])) {
    return {
      text: "MIZYRA is based in Nagercoil, Kanyakumari, Tamil Nadu, India.",
      actions: [{ label: "Contact MIZYRA", href: "/contact" }]
    };
  }

  const matchedProject = projectShowcase.find((project) =>
    question.includes(normalize(project.title))
  );
  if (matchedProject) {
    return {
      text: `${matchedProject.title}: ${matchedProject.description} Technologies: ${matchedProject.technologies.join(", ")}.`,
      actions: [
        { label: "View project showcase", href: "/projects" },
        ...(matchedProject.repoUrl ? [{ label: "Open GitHub repository", href: matchedProject.repoUrl }] : [])
      ]
    };
  }

  const matchedCourse = courses.find((course) => {
    const title = normalize(course.title);
    const distinctiveTitleWords = title
      .split(" ")
      .filter((word) => word.length >= 4 && !["programming", "development", "course"].includes(word));
    return question.includes(title) || distinctiveTitleWords.some((word) => question.includes(word));
  });
  if (matchedCourse) {
    return {
      text: `${matchedCourse.title} is a ${matchedCourse.level.toLowerCase()} ${matchedCourse.category.toLowerCase()} course. It runs for ${matchedCourse.duration} and covers ${matchedCourse.technologies.join(", ")}. ${matchedCourse.description}`,
      actions: [{ label: "Explore programs", href: "/#programs" }, { label: "Apply now", href: "/apply" }]
    };
  }

  if (containsAny(question, ["course", "courses", "program", "programs", "training", "learn", "class", "classes", "teach"])) {
    const categories = [...new Set(courses.map((course) => course.category))];
    return {
      text: `MIZYRA offers technology programs in ${categories.join(", ")}. Tracks are designed for school students, college students, and working professionals; course length and level vary by program.`,
      actions: [{ label: "Browse programs", href: "/#programs" }, { label: "Apply now", href: "/apply" }]
    };
  }

  if (containsAny(question, ["service", "services", "what can you build", "development", "design", "marketing agency"])) {
    return {
      text: `MIZYRA can help with ${serviceAreas.join("; ")}. Share your requirements and the team can discuss the right scope.`,
      actions: [{ label: "Contact for a quote", href: "/#contact" }, { label: "View projects", href: "/projects" }]
    };
  }

  if (containsAny(question, ["research", "paper", "ieee", "scopus", "sci", "scie", "springer", "elsevier", "publication"])) {
    return {
      text: "MIZYRA provides research planning, technical writing, data analysis, formatting, and submission-readiness support for IEEE, Scopus-indexed, SCI/SCIE, Springer, and Elsevier formats. Acceptance or indexing is decided by the publisher and is not guaranteed.",
      actions: [{ label: "Research support", href: "/projects#research-papers" }, { label: "Contact team", href: "/contact" }]
    };
  }

  if (containsAny(question, ["project", "projects", "portfolio", "showcase", "github", "website", "web app"])) {
    return {
      text: `The showcase is organized into ${projectCategories.join(", ")}. It includes public GitHub examples as well as representative service areas.`,
      actions: [{ label: "Open project showcase", href: "/projects" }]
    };
  }

  if (containsAny(question, ["digital marketing", "seo", "social media", "advertising", "ads", "campaign", "content marketing"])) {
    return {
      text: "MIZYRA's digital marketing services include SEO, social media campaigns, content marketing, paid advertising, and analytics/conversion optimization.",
      actions: [{ label: "Discuss marketing", href: "/#contact" }]
    };
  }

  if (containsAny(question, ["internship", "intern"])) {
    return {
      text: "For current internship availability, eligibility, schedule, and terms, please contact MIZYRA directly; those details are not confirmed in the site information.",
      actions: [{ label: "Contact MIZYRA", href: "/contact" }, { label: "Apply", href: "/apply" }]
    };
  }

  if (containsAny(question, ["fee", "fees", "price", "pricing", "cost", "scholarship", "discount"])) {
    return {
      text: "Fees and discounts are not published here and may depend on the program or project scope. Contact MIZYRA for current pricing.",
      actions: [{ label: "Ask about pricing", href: "/contact" }]
    };
  }

  if (containsAny(question, ["apply", "application", "admission", "admissions", "enroll", "enrollment", "join", "register"])) {
    return {
      text: "To apply, open the application form and share your details, learning track, and goals. The team can follow up about the next steps.",
      actions: [{ label: "Open application", href: "/apply" }, { label: "Ask a question", href: "/contact" }]
    };
  }

  if (containsAny(question, ["login", "sign in", "dashboard", "account"])) {
    return {
      text: "Registered users can open the login page and sign in with their account details.",
      actions: [{ label: "Open login", href: "/login" }]
    };
  }

  if (containsAny(question, ["career", "roadmap", "learning path", "job", "role"])) {
    return {
      text: "MIZYRA's learning paths cover roles such as software developer, web developer, AI engineer, data scientist, cybersecurity specialist, cloud engineer, mobile app developer, and robotics engineer. Course suggestions depend on your starting level and goal.",
      actions: [{ label: "Explore learning paths", href: "/#programs" }, { label: "Get guidance", href: "/contact" }]
    };
  }

  if (containsAny(question, ["blog", "news", "event", "article"])) {
    return {
      text: "The News & Events page shares MIZYRA articles and updates on technology careers, software, AI, and digital innovation.",
      actions: [{ label: "News & Events", href: "/blog" }]
    };
  }

  return {
    text: "I can answer questions using MIZYRA's published information about services, courses, projects, research support, admissions, and contact details. For information not listed on the site—such as custom pricing, schedules, or availability—please ask the team directly.",
    actions: quickActions
  };
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const botSpeakTimer = useRef<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "bot",
      text: "Hi, I am MIZYRA Guide. Ask me about MIZYRA's services, courses, projects, research support, admissions, or contact details.",
      actions: quickActions
    }
  ]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    const input = query.trim();
    const nextId = Date.now();
    const userMessage: ChatMessage = { id: nextId, role: "user", text: input };
    const botMessage: ChatMessage = {
      id: nextId + 1,
      role: "bot",
      ...answerQuestion(input)
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setQuery("");

    if (botSpeakTimer.current) {
      window.clearTimeout(botSpeakTimer.current);
    }
    const speakDuration = Math.min(2400, 900 + botMessage.text.length * 18);
    setIsBotSpeaking(true);
    botSpeakTimer.current = window.setTimeout(() => {
      setIsBotSpeaking(false);
    }, speakDuration);
  };

  useEffect(() => {
    return () => {
      if (botSpeakTimer.current) {
        window.clearTimeout(botSpeakTimer.current);
      }
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="glass-panel mb-3 w-[calc(100vw-2rem)] max-w-[360px] p-4"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-moonGreen/20 text-moonGreen">
                <Image src="/mizyra-chatbot-green.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
              </div>
              <div>
                <p className="text-sm font-semibold text-moonInk">MIZYRA Guide</p>
                <p className="text-[11px] text-moonMuted">Online now</p>
              </div>
            </div>

            {isBotSpeaking ? (
              <div className="mb-3 flex items-center gap-2 text-[11px] text-moonMuted">
                <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-moonGreen/70" />
                Typing...
              </div>
            ) : null}

            <div className="premium-scroll h-64 space-y-3 overflow-y-auto rounded-2xl border border-moonBorder/70 bg-moonCard/70 p-3">
              {messages.map((message) => (
                <div key={message.id} className={message.role === "user" ? "text-right" : "text-left"}>
                  <div
                    className={`inline-block max-w-[92%] rounded-2xl px-3 py-2 text-xs ${
                      message.role === "user"
                        ? "bg-moonGreen/30 text-moonInk"
                        : "bg-moonCard text-moonInk/80"
                    }`}
                  >
                    <p>{message.text}</p>
                    {message.actions ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.actions.map((action) => (
                          <a
                            key={`${message.id}-${action.href}`}
                            href={action.href}
                            className="rounded-full border border-moonBorder/70 bg-moonSoft/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-moonInk/80 hover:text-moonGreen"
                          >
                            {action.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <form className="mt-3 flex gap-2" onSubmit={onSubmit}>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ask MIZYRA Guide..."
                className="w-full rounded-full px-3 py-2 text-xs outline-none focus:border-moonGreen"
              />
              <button
                className="neo-btn-primary btn-glow inline-flex h-9 w-9 items-center justify-center rounded-full"
                type="submit"
                aria-label="Send"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((state) => !state)}
        className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-moonCard transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moonGold"
        aria-label="Open MIZYRA Guide"
        aria-expanded={open}
      >
        <Image src="/mizyra-chatbot-green.png" alt="" width={56} height={56} className="h-full w-full object-contain" />
      </button>

      <a
        href={WHATSAPP_CHAT_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with MIZYRA on WhatsApp"
        className="fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1fbd5b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-6 sm:left-6"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  );
}

function WhatsAppIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <path d="M16 4a11.3 11.3 0 0 0-9.7 17.1L4.8 27l6.1-1.5A11.3 11.3 0 1 0 16 4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M12 10.5c-.4-.8-.8-.8-1.2-.8h-.9c-.4 0-.9.2-1.2.7-.4.5-1.5 1.5-1.5 3.6s1.5 4.2 1.7 4.5c.2.3 2.9 4.6 7.1 6.2 3.5 1.3 4.2 1 5 .9.8-.1 2.6-1.1 3-2.1.4-1 .4-1.9.3-2.1-.1-.2-.4-.3-.9-.5l-3-1.5c-.4-.2-.7-.2-1 .2-.3.4-1.1 1.4-1.4 1.7-.3.3-.5.3-.9.1-.4-.2-1.8-.7-3.4-2.2-1.3-1.1-2.2-2.5-2.5-2.9-.3-.4 0-.7.2-.9.2-.2.4-.5.7-.8.2-.3.3-.4.5-.7.2-.3.1-.6 0-.8-.1-.2-1.1-2.8-1.5-3.6Z" fill="currentColor" transform="translate(3 0) scale(.8)" />
    </svg>
  );
}
