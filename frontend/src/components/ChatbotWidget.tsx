"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Send, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { projectShowcase } from "@/data/siteData";
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

const suggestedQuestions = [
  "What does MIZYRA do?",
  "Are courses or internships open?",
  "Can you help with my project?",
  "How can I contact the team?"
];

const contactActions: ChatAction[] = [
  { label: "Email MIZYRA", href: "mailto:mizyra.official@gmail.com" },
  { label: "WhatsApp", href: WHATSAPP_CHAT_URL }
];

const contactDetails = "Email mizyra.official@gmail.com or WhatsApp/call +91 93631 56825.";

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
  return text.toLowerCase().replace(/[^a-z0-9@\s]/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeWord(word: string): string {
  if (word.length > 4 && word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  if (word.length > 4 && word.endsWith("ses") && !word.endsWith("sses")) return word.slice(0, -1);
  if (word.length > 4 && /(s|x|z|ch|sh)es$/.test(word)) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

function containsAny(text: string, terms: string[]): boolean {
  const words = text.split(" ").map(normalizeWord);
  return terms.some((term) => {
    const termWords = normalize(term).split(" ").map(normalizeWord);
    return words.some((_, index) =>
      termWords.every((word, termIndex) => words[index + termIndex] === word)
    );
  });
}

function answerQuestion(input: string): Pick<ChatMessage, "text" | "actions"> {
  const question = normalize(input);

  if (containsAny(question, ["course"]) && containsAny(question, ["internship", "intern"])) {
    return {
      text: "MIZYRA is not offering courses, training, or internships right now. These opportunities may be announced in the future. Would you like to share what you’re interested in? Contact the team.",
      actions: contactActions
    };
  }

  if (containsAny(question, ["what can you do", "how can you help"])) {
    return {
      text: "I can help with MIZYRA’s software, AI, design, research, IoT, cloud, digital growth, project support, and contact information. Tell me what you have in mind.",
      actions: [{ label: "Explore services", href: "/#services" }, ...contactActions]
    };
  }

  if (containsAny(question, ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"])) {
    return {
      text: "Hey! I’m MIZYRA’s chat assistant. Tell me what you’re looking for and I’ll point you in the right direction.",
      actions: contactActions
    };
  }

  if (containsAny(question, ["thank", "thanks", "thank you"])) {
    return {
      text: "You’re welcome! If anything else comes up, the MIZYRA team is happy to help.",
      actions: contactActions
    };
  }

  if (containsAny(question, ["goodbye", "bye", "see you", "talk later"])) {
    return {
      text: "Goodbye! Thanks for visiting MIZYRA. Feel free to message us whenever you need a hand.",
      actions: contactActions
    };
  }

  if (containsAny(question, ["internship", "intern", "recruit", "recruiting", "job opening", "job openings", "career opening", "resume", "paid or unpaid", "opportunity", "opportunities"])) {
    return {
      text: "MIZYRA isn’t offering internships or recruiting right now. Opportunities may be announced in the future, so stay tuned for updates. To share your interest, contact the team.",
      actions: contactActions
    };
  }

  if (containsAny(question, ["course", "courses", "training", "teach python", "learn python", "classes", "class", "certificate", "certificates", "one to one", "one on one", "mentoring", "mentor", "beginner", "hands on", "online classes", "offline training", "college students", "course fee", "course fees", "project based learning"])) {
    return {
      text: "MIZYRA isn’t running courses or training programs yet. Course topics, delivery format, duration, fees, certificates, and mentoring options will be shared when programs are announced. Would you like to tell us what you’re interested in learning? Contact the team to share your interest.",
      actions: contactActions
    };
  }

  const asksForContact = containsAny(question, [
    "email", "mail id", "gmail", "phone", "telephone", "call", "mobile number",
    "contact", "speak with a human", "talk to someone", "talk to a person", "human"
  ]) || (
    containsAny(question, ["whatsapp"]) &&
    !containsAny(question, ["integrate", "integration", "ai", "chatbot", "automation"])
  );
  if (asksForContact) {
    return {
      text: `You can reach the MIZYRA team at ${contactDetails}`,
      actions: [
        ...contactActions,
        { label: "Call", href: "tel:+919363156825" },
        { label: "Contact page", href: "/contact" }
      ]
    };
  }

  if (containsAny(question, ["location", "address", "where are you", "where is mizyra", "nagercoil", "kanyakumari", "remote", "remotely", "work from home", "fully remote"])) {
    return {
      text: "MIZYRA is based in Nagercoil, Tamil Nadu, and currently operates fully remotely. You can contact the team from wherever you are.",
      actions: contactActions
    };
  }

  if (containsAny(question, ["founded", "founder", "who founded", "startup", "start up", "fresh graduate", "fresh graduates"])) {
    return {
      text: "MIZYRA is a startup founded by a team of fresh graduates, bringing a practical, collaborative perspective to technology and problem-solving.",
      actions: [{ label: "Meet MIZYRA", href: "/#about" }, ...contactActions]
    };
  }

  if (containsAny(question, ["vision"])) {
    return {
      text: "MIZYRA’s vision is to be a trusted technology partner that turns bold ideas into real-world impact through software, research, design, and digital growth.",
      actions: [{ label: "About MIZYRA", href: "/#about" }, ...contactActions]
    };
  }

  if (containsAny(question, ["mission"])) {
    return {
      text: "MIZYRA’s mission is to deliver practical, high-quality technology solutions that help businesses, researchers, and innovators move faster and build better.",
      actions: [{ label: "About MIZYRA", href: "/#about" }, ...contactActions]
    };
  }

  if (containsAny(question, ["international", "outside india", "abroad", "global client", "global clients"])) {
    return {
      text: "Yes, MIZYRA works with international clients. The team currently operates remotely, making it easy to connect across locations.",
      actions: contactActions
    };
  }

  if (containsAny(question, ["what is mizyra", "who is mizyra", "about mizyra", "mizyra overview", "company overview", "about the company", "who are you", "what do you do", "what does mizyra do", "what does your company do", "tell me about your company", "what makes mizyra different", "different from other it companies", "startup or established"])) {
    return {
      text: "MIZYRA is a Nagercoil-based technology startup founded by fresh graduates. We work remotely and help businesses and innovators turn ideas into practical digital solutions. We’re happy to connect with you from home, wherever you’re based.",
      actions: [{ label: "Explore MIZYRA", href: "/#about" }, ...contactActions]
    };
  }

  if (containsAny(question, ["agentic ai"])) {
    return {
      text: "Agentic AI describes AI systems that can plan steps and use tools to work toward a goal, rather than only replying to a prompt. To know more, contact MIZYRA.",
      actions: contactActions
    };
  }

  if (containsAny(question, ["difference between an ai chatbot", "difference between chatbot and agent", "chatbot and ai agent", "ai agent and chatbot"])) {
    return {
      text: "An AI chatbot mainly responds to messages, while an AI agent can also plan actions and use tools to complete tasks. To know more, contact MIZYRA.",
      actions: contactActions
    };
  }

  if (containsAny(question, ["free consultation", "consultation", "quotation", "quote", "pricing", "price", "cost", "maintenance charge", "monthly support", "schedule a meeting", "schedule meeting", "book a meeting", "enterprise solution", "enterprise solutions", "business enquiry", "business inquiry", "project requirement", "project requirements", "start working", "work with mizyra"])) {
    return {
      text: `Yes, you can discuss your requirements with the team and request a consultation or customized quotation. Pricing and any ongoing support depend on the project scope. To arrange a meeting time or request a quote, ${contactDetails}`,
      actions: contactActions
    };
  }

  if (containsAny(question, ["develop a project", "build a project", "project based on my idea", "custom project", "project requirement", "project requirements", "final year", "final-year", "source code", "project documentation", "project demonstration", "project demo", "real time application", "modify an existing project", "robotics project", "robotics projects"])) {
    return {
      text: `MIZYRA can discuss custom software, AI, web, mobile, robotics, and IoT projects, including student project ideas. Scope, timeline, pricing, and deliverables are agreed with the team. To get started, ${contactDetails}`,
      actions: contactActions
    };
  }

  if (containsAny(question, ["ai", "artificial intelligence", "automation", "automate", "n8n", "openai", "llm", "chatbot", "ai agent", "workflow", "business task"])) {
    return {
      text: "MIZYRA can discuss AI applications such as chatbots, LLM integrations, and workflow automation, with the right approach depending on your needs. To know more, contact MIZYRA.",
      actions: contactActions
    };
  }

  if (containsAny(question, ["issue", "not working", "technical support", "bug", "fix bug", "maintenance", "track my project", "track progress", "project progress", "feature update", "post delivery", "report a technical", "support"])) {
    return {
      text: `Sorry you’re running into trouble. MIZYRA can discuss fixes, maintenance, progress updates, or feature changes for existing work. Send the team a short description of the issue at ${contactDetails}`,
      actions: contactActions
    };
  }

  const matchedProject = projectShowcase.find((project) => question.includes(normalize(project.title)));
  if (matchedProject) {
    return {
      text: `${matchedProject.title}: ${matchedProject.description} Technologies: ${matchedProject.technologies.join(", ")}.`,
      actions: [
        { label: "View project showcase", href: "/projects" },
        ...(matchedProject.repoUrl ? [{ label: "Open GitHub repository", href: matchedProject.repoUrl }] : [])
      ]
    };
  }

  if (containsAny(question, ["project", "projects", "portfolio", "showcase", "github"])) {
    return {
      text: `MIZYRA can discuss building from a new idea, updating an existing project, or supporting technical issues. Timelines and cost depend on the scope. Browse examples across ${projectCategories.join(", ")}, or contact us: ${contactDetails}`,
      actions: [{ label: "View projects", href: "/projects" }, ...contactActions]
    };
  }

  if (containsAny(question, ["website", "web development", "mobile application", "mobile applications", "mobile app", "mobile apps", "e commerce", "ecommerce", "custom software", "api integration", "iot", "robotics", "cloud", "digital transformation", "software development", "service", "services", "solutions", "what can you build", "development", "design", "business process"])) {
    return {
      text: `MIZYRA can discuss ${serviceAreas.join(", ")}, custom software, websites and e-commerce, mobile apps, AI and automation, IoT and robotics, cloud solutions, API integrations, and digital transformation. Tell us what you need and the team can discuss the right scope. To know more, contact MIZYRA.`,
      actions: [{ label: "Discuss a project", href: "/contact" }, ...contactActions]
    };
  }

  if (containsAny(question, ["login", "sign in", "dashboard", "account"])) {
    return {
      text: "Registered users can open the login page and sign in with their account details.",
      actions: [{ label: "Open login", href: "/login" }]
    };
  }

  if (containsAny(question, ["blog", "news", "event", "article"])) {
    return {
      text: "The News & Events page shares MIZYRA articles and updates on technology careers, software, AI, and digital innovation.",
      actions: [{ label: "News & Events", href: "/blog" }]
    };
  }

  if (containsAny(question, ["research", "paper", "ieee", "scopus", "sci", "scie", "springer", "elsevier", "publication"])) {
    return {
      text: "MIZYRA can discuss research planning, technical writing, data analysis, formatting, and submission-readiness support. Publication or indexing decisions are made by publishers and are not guaranteed.",
      actions: [{ label: "Research support", href: "/projects#research-papers" }, ...contactActions]
    };
  }

  if (containsAny(question, ["idea", "help me", "can you help", "need a technology partner", "technology partner", "business owner", "ai business", "student", "someone from your team", "hello what can you do", "what can you do"])) {
    return {
      text: "Absolutely! Whether you’re a student with a project idea or a business looking for a technology partner, tell MIZYRA what you’re trying to do and the team can discuss possible next steps. Courses and internships aren’t open yet; stay tuned for announcements.",
      actions: [{ label: "Contact the team", href: "/contact" }, ...contactActions]
    };
  }

  return {
    text: "I can help with MIZYRA’s services, projects, courses, internships, pricing, and support. Tell me a little more, or contact the team directly for personalized help.",
    actions: contactActions
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
      text: "Hey there! I’m MIZYRA’s chat assistant. Let me help you find what you need. What would you like to know?",
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const nextMessageId = useRef(2);

  function sendMessage(message: string) {
    const input = message.trim();
    if (!input || isBotSpeaking) return;
    const nextId = nextMessageId.current;
    nextMessageId.current += 2;
    const userMessage: ChatMessage = { id: nextId, role: "user", text: input };
    const botMessage: ChatMessage = {
      id: nextId + 1,
      role: "bot",
      ...answerQuestion(input)
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuery("");

    if (botSpeakTimer.current) {
      window.clearTimeout(botSpeakTimer.current);
    }
    const speakDuration = Math.min(2400, 900 + botMessage.text.length * 18);
    setIsBotSpeaking(true);
    botSpeakTimer.current = window.setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
      setIsBotSpeaking(false);
    }, speakDuration);
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(query);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isBotSpeaking]);

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
            className="glass-panel mb-3 flex h-[min(42rem,calc(100dvh-6rem))] w-[calc(100vw-2rem)] max-w-[440px] flex-col p-4 sm:h-[min(42rem,calc(100dvh-7rem))]"
          >
            <div className="mb-4 flex shrink-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-moonGreen/20 text-moonGreen">
                <Image src="/mizyra-chatbot-green.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-moonInk">MIZYRA Guide</p>
                <p className="text-[11px] text-moonMuted">Here to help</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-moonMuted transition hover:bg-moonGreen/10 hover:text-moonInk focus-visible:outline focus-visible:outline-2 focus-visible:outline-moonGold"
                aria-label="Close MIZYRA Guide"
              >
                <X size={18} />
              </button>
            </div>

            <div className="premium-scroll min-h-0 flex-1 space-y-3 overflow-y-auto rounded-2xl border border-moonBorder/70 bg-moonCard/70 p-3 sm:p-4">
              {messages.map((message) => (
                <div key={message.id} className={message.role === "user" ? "text-right" : "text-left"}>
                  <div
                    className={`inline-block max-w-[92%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed ${
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
                            className="inline-flex items-center gap-1 rounded-full border border-moonBorder/70 bg-moonSoft/60 px-3 py-1.5 text-xs font-semibold text-moonInk/80 transition hover:text-moonGreen"
                          >
                            {action.label}
                            <ArrowUpRight size={13} aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
              {messages.length === 1 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => sendMessage(question)}
                      className="rounded-2xl border border-moonBorder/60 bg-moonSoft/60 px-3 py-2 text-left text-xs leading-relaxed text-moonInk/80 transition hover:border-moonGreen hover:text-moonInk focus-visible:outline focus-visible:outline-2 focus-visible:outline-moonGold"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              ) : null}
              {isBotSpeaking ? (
                <div className="flex items-center gap-2 text-xs text-moonMuted" role="status" aria-live="polite">
                  <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-moonGreen/70" />
                  MIZYRA is typing...
                </div>
              ) : null}
              <div ref={messagesEndRef} />
            </div>

            <form className="mt-3 flex shrink-0 gap-2" onSubmit={onSubmit}>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ask MIZYRA anything..."
                aria-label="Message MIZYRA's chat assistant"
                className="w-full rounded-full border border-moonBorder/50 bg-moonCard px-4 py-3 text-sm text-moonInk outline-none placeholder:text-moonMuted/70 focus:border-moonGreen"
                disabled={isBotSpeaking}
              />
              <button
                className="neo-btn-primary btn-glow inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-50"
                type="submit"
                aria-label="Send message"
                disabled={!query.trim() || isBotSpeaking}
              >
                <Send size={16} />
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
