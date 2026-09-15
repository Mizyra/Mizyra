"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { chatbotFaq } from "@/data/siteData";

type ChatAction = {
  label: string;
  href: string;
};

type ChatMessage = {
  id: number;
  role: "bot" | "user";
  text: string;
  steps?: string[];
  actions?: ChatAction[];
};

type AssistantFlow = {
  label: string;
  href: string;
  keywords: string[];
  steps: string[];
};

const assistantFlows: AssistantFlow[] = [
  {
    label: "Projects",
    href: "/projects",
    keywords: ["project", "projects", "portfolio", "showcase", "build"],
    steps: [
      "Explore featured and gallery builds.",
      "Open a project to study its stack.",
      "Use it as a blueprint for your own build."
    ]
  },
  {
    label: "Apply",
    href: "/apply",
    keywords: ["apply", "enroll", "admission", "register", "join"],
    steps: [
      "Open the application form.",
      "Fill in your background and goals.",
      "Submit to get admissions guidance."
    ]
  },
  {
    label: "Contact",
    href: "/contact",
    keywords: ["contact", "support", "counseling", "call", "whatsapp", "help"],
    steps: [
      "Open the contact page.",
      "Share your question or requirement.",
      "Our team replies within 24 hours."
    ]
  },
  {
    label: "Login",
    href: "/login",
    keywords: ["login", "sign in", "account", "dashboard"],
    steps: [
      "Open the login page.",
      "Use your registered email.",
      "Access your dashboard and progress."
    ]
  }
];

const quickActions: ChatAction[] = [
  { label: "Projects", href: "/projects" },
  { label: "Apply Now", href: "/apply" },
  { label: "Contact", href: "/contact" }
];

const careerKeywords = [
  "software developer",
  "web developer",
  "ai engineer",
  "data scientist",
  "cloud engineer",
  "cybersecurity",
  "mobile app developer",
  "robotics engineer"
];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const typingTimer = useRef<number | null>(null);
  const botSpeakTimer = useRef<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "bot",
      text: "Hi, I am MIZYRA Guide. Ask a question and I will take you to the right page with step-by-step help.",
      actions: quickActions
    }
  ]);

  const loweredFaq = useMemo(
    () =>
      Object.entries(chatbotFaq).map(([key, value]) => ({
        key,
        value
      })),
    []
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    setIsTyping(false);

    const input = query.trim();
    const nextId = Date.now();
    const normalized = input.toLowerCase();
    const userMessage: ChatMessage = { id: nextId, role: "user", text: input };

    const flowMatch = assistantFlows.find((flow) =>
      flow.keywords.some((keyword) => normalized.includes(keyword))
    );
    const faqMatch = loweredFaq.find((item) => normalized.includes(item.key));
    const careerMatch = careerKeywords.some((keyword) => normalized.includes(keyword));

    let botMessage: ChatMessage;

    if (flowMatch) {
      botMessage = {
        id: nextId + 1,
        role: "bot",
        text: `Best place to continue: ${flowMatch.label}.`,
        steps: flowMatch.steps,
        actions: [{ label: `Open ${flowMatch.label}`, href: flowMatch.href }]
      };
    } else if (careerMatch) {
      botMessage = {
        id: nextId + 1,
        role: "bot",
        text: "Use the project showcase and contact flow to plan the right next steps.",
        steps: [
          "Review the featured project work.",
          "Choose your next focus area.",
          "Reach out via the admissions team for guidance."
        ],
        actions: [
          { label: "View Projects", href: "/projects" },
          { label: "Contact Team", href: "/contact" }
        ]
      };
    } else if (faqMatch) {
      botMessage = {
        id: nextId + 1,
        role: "bot",
        text: faqMatch.value,
        actions: quickActions
      };
    } else {
      botMessage = {
        id: nextId + 1,
        role: "bot",
        text: "I can guide you to projects, admissions, contact support, or learning resources.",
        actions: quickActions
      };
    }

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
      if (typingTimer.current) {
        window.clearTimeout(typingTimer.current);
      }
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
                <MessageCircle size={18} />
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
                    {message.steps ? (
                      <ol className="mt-2 space-y-1 text-[11px] text-moonInk/70">
                        {message.steps.map((step, index) => (
                          <li key={`${message.id}-step-${step}`}>{index + 1}. {step}</li>
                        ))}
                      </ol>
                    ) : null}
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
                onChange={(event) => {
                  const value = event.target.value;
                  setQuery(value);
                  if (!value.trim()) {
                    setIsTyping(false);
                  } else {
                    setIsTyping(true);
                    if (typingTimer.current) {
                      window.clearTimeout(typingTimer.current);
                    }
                    typingTimer.current = window.setTimeout(() => {
                      setIsTyping(false);
                    }, 900);
                  }
                }}
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
        className="neo-btn-primary btn-glow relative flex h-12 w-12 items-center justify-center rounded-full shadow-glow"
        aria-label="Open MIZYRA Guide"
      >
        <MessageCircle size={18} />
      </button>
    </div>
  );
}
