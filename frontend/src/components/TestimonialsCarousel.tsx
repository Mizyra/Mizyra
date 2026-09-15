"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { testimonials } from "@/data/siteData";

const AUTOPLAY_INTERVAL = 5000;
const USER_REVIEW_STORAGE_KEY = "moon-user-reviews-v1";

type ReviewItem = {
  name: string;
  role: string;
  feedback: string;
  image?: string;
  source: "institute" | "user";
};

const seededTestimonials: ReviewItem[] = testimonials.map((item) => ({
  ...item,
  source: "institute"
}));

function getWrappedIndex(index: number, total: number): number {
  return (index + total) % total;
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "U";
  if (words.length === 1) return words[0].slice(0, 1).toUpperCase();
  return `${words[0].slice(0, 1)}${words[1].slice(0, 1)}`.toUpperCase();
}

type ReviewAvatarProps = {
  name: string;
  image?: string;
  size: number;
  className?: string;
};

function ReviewAvatar({ name, image, size, className = "" }: ReviewAvatarProps) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={size}
        height={size}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center bg-gradient-to-br from-moonGreen/70 to-moonGold/65 text-xs font-semibold text-moonBg ${className}`}
      aria-label={`${name} avatar`}
    >
      {getInitials(name)}
    </span>
  );
}

export default function TestimonialsCarousel() {
  const [userReviews, setUserReviews] = useState<ReviewItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    role: "",
    feedback: ""
  });
  const [formMessage, setFormMessage] = useState("");

  const allTestimonials = [...seededTestimonials, ...userReviews];
  const totalTestimonials = allTestimonials.length;

  useEffect(() => {
    try {
      const storedReviews = window.localStorage.getItem(USER_REVIEW_STORAGE_KEY);
      if (!storedReviews) return;

      const parsedReviews: unknown = JSON.parse(storedReviews);
      if (!Array.isArray(parsedReviews)) return;

      const sanitizedReviews = parsedReviews
        .map((entry): ReviewItem | null => {
          if (!entry || typeof entry !== "object") return null;

          const record = entry as Partial<ReviewItem>;
          const name = typeof record.name === "string" ? record.name.trim() : "";
          const role = typeof record.role === "string" ? record.role.trim() : "";
          const feedback = typeof record.feedback === "string" ? record.feedback.trim() : "";
          const image = typeof record.image === "string" && record.image.trim() ? record.image : undefined;

          if (!name || !role || !feedback) return null;
          return { name, role, feedback, image, source: "user" };
        })
        .filter((entry): entry is ReviewItem => entry !== null)
        .slice(-20);

      setUserReviews(sanitizedReviews);
    } catch {
      setUserReviews([]);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(USER_REVIEW_STORAGE_KEY, JSON.stringify(userReviews));
    } catch {
      // Ignore storage write errors.
    }
  }, [userReviews]);

  useEffect(() => {
    if (totalTestimonials === 0) return;
    setActiveIndex((previous) => Math.min(previous, totalTestimonials - 1));
  }, [totalTestimonials]);

  useEffect(() => {
    if (totalTestimonials <= 1 || isPaused) return;

    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((previous) => getWrappedIndex(previous + 1, totalTestimonials));
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isPaused, totalTestimonials]);

  if (totalTestimonials === 0) return null;

  const activeTestimonial = allTestimonials[activeIndex];
  const progress = ((activeIndex + 1) / totalTestimonials) * 100;
  const upcomingTestimonials = Array.from(
    { length: Math.min(2, totalTestimonials - 1) },
    (_, offset) => {
      const previewIndex = getWrappedIndex(activeIndex + offset + 1, totalTestimonials);
      return { ...allTestimonials[previewIndex], previewIndex };
    }
  );

  const handleStep = (step: 1 | -1) => {
    setDirection(step);
    setActiveIndex((previous) => getWrappedIndex(previous + step, totalTestimonials));
  };

  const handleSelect = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;
    const forwardDistance = (nextIndex - activeIndex + totalTestimonials) % totalTestimonials;
    setDirection(forwardDistance <= totalTestimonials / 2 ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  const handleReviewSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = formState.name.trim();
    const role = formState.role.trim();
    const feedback = formState.feedback.trim();

    if (!name || !role || feedback.length < 20) {
      setFormMessage("Please fill all fields and keep feedback at least 20 characters.");
      return;
    }

    const newReview: ReviewItem = {
      name,
      role,
      feedback,
      source: "user"
    };

    const nextIndex = seededTestimonials.length + userReviews.length;

    setUserReviews((previous) => [...previous, newReview]);
    setDirection(1);
    setActiveIndex(nextIndex);
    setFormState({ name: "", role: "", feedback: "" });
    setFormMessage("Thank you. Your review has been added.");
  };

  return (
    <div
      className="mx-auto max-w-5xl rounded-[30px] border border-moonBorder/70 bg-gradient-to-br from-moonCard/95 via-moonCard/90 to-moonSoft/80 p-5 shadow-[0_22px_60px_rgba(2,8,18,0.55)] backdrop-blur-xl md:p-7"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-3xl border border-moonBorder/70 bg-moonCard/65 p-5 shadow-[0_16px_34px_rgba(2,8,18,0.35)] md:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-moonGreen">
              Verified Learner Stories
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleStep(-1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-moonBorder/80 bg-moonSoft/70 text-moonInk transition hover:border-moonGreen/60 hover:text-moonGreen"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleStep(1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-moonBorder/80 bg-moonSoft/70 text-moonInk transition hover:border-moonGreen/60 hover:text-moonGreen"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={activeTestimonial.name}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction > 0 ? 36 : -36,
                scale: 0.98
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -32 : 32,
                scale: 0.98
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ReviewAvatar
                    name={activeTestimonial.name}
                    image={activeTestimonial.image}
                    size={64}
                    className="h-16 w-16 rounded-2xl ring-2 ring-moonGreen/35"
                  />
                  <div>
                    <p className="text-base font-semibold text-moonInk">{activeTestimonial.name}</p>
                    <p className="text-xs text-moonMuted">{activeTestimonial.role}</p>
                  </div>
                </div>
                <Quote size={20} className="shrink-0 text-moonGold" />
              </div>

              <div className="mt-4 flex gap-1 text-moonGold">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={15} />
                ))}
              </div>

              <p className="mt-4 text-base leading-relaxed text-moonInk/90 md:text-lg">
                "{activeTestimonial.feedback}"
              </p>

              <span
                className={`mt-4 inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  activeTestimonial.source === "user"
                    ? "border-moonGold/45 bg-moonSoft/60 text-moonGold"
                    : "border-moonGreen/45 bg-moonSoft/60 text-moonGreen"
                }`}
              >
                {activeTestimonial.source === "user" ? "New Review" : "Verified feedback"}
              </span>
            </motion.article>
          </AnimatePresence>

          <div className="mt-6">
            <div className="h-1.5 overflow-hidden rounded-full bg-moonBorder/75">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35 }}
                className="h-full rounded-full bg-gradient-to-r from-moonGreen to-moonGold"
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-moonMuted">
              <span>
                Story {activeIndex + 1} of {totalTestimonials}
              </span>
              <span>{isPaused ? "Paused" : "Auto Rotate"}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-moonGold">Coming Up</p>

          {upcomingTestimonials.map((item) => (
            <button
              key={`${item.name}-${item.previewIndex}`}
              type="button"
              onClick={() => handleSelect(item.previewIndex)}
              className="w-full rounded-2xl border border-moonBorder/70 bg-moonCard/65 p-4 text-left transition duration-200 hover:-translate-y-1 hover:border-moonGreen/55 hover:shadow-[0_14px_26px_rgba(2,8,18,0.35)]"
            >
              <div className="flex items-center gap-3">
                <ReviewAvatar
                  name={item.name}
                  image={item.image}
                  size={44}
                  className="h-11 w-11 rounded-xl"
                />
                <div>
                  <p className="text-sm font-semibold text-moonInk">{item.name}</p>
                  <p className="text-xs text-moonMuted">{item.role}</p>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-moonInk/80">{item.feedback}</p>
            </button>
          ))}

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {allTestimonials.map((item, index) => (
              <button
                key={`${item.name}-${index}`}
                type="button"
                onClick={() => handleSelect(index)}
                aria-label={`Open review ${index + 1}`}
                className={`group inline-flex items-center gap-2 rounded-full border px-2 py-1 transition ${
                  activeIndex === index
                    ? "border-moonGreen/60 bg-moonSoft/70 text-moonInk"
                    : "border-moonBorder/70 bg-moonCard/65 text-moonMuted hover:border-moonGreen/45"
                }`}
              >
                <ReviewAvatar
                  name={item.name}
                  image={item.image}
                  size={28}
                  className="h-7 w-7 rounded-full"
                />
                <span className="pr-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-moonBorder/70 bg-moonCard/65 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-moonGreen">
              Add Your Review
            </p>
            <p className="mt-1 text-xs text-moonMuted">
              Share your learning experience. Your review appears instantly.
            </p>

            <form onSubmit={handleReviewSubmit} className="mt-4 space-y-3">
              <input
                type="text"
                value={formState.name}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, name: event.target.value }))
                }
                placeholder="Your Name"
                className="w-full rounded-xl border border-moonBorder/70 bg-moonSoft/65 px-3 py-2 text-sm outline-none transition focus:border-moonGreen/60 focus:ring-2 focus:ring-moonGreen/30"
                required
              />
              <input
                type="text"
                value={formState.role}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, role: event.target.value }))
                }
                placeholder="Your Role (Student, Professional, etc.)"
                className="w-full rounded-xl border border-moonBorder/70 bg-moonSoft/65 px-3 py-2 text-sm outline-none transition focus:border-moonGreen/60 focus:ring-2 focus:ring-moonGreen/30"
                required
              />
              <textarea
                value={formState.feedback}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, feedback: event.target.value }))
                }
                placeholder="Write your review..."
                rows={3}
                maxLength={220}
                className="w-full rounded-xl border border-moonBorder/70 bg-moonSoft/65 px-3 py-2 text-sm outline-none transition focus:border-moonGreen/60 focus:ring-2 focus:ring-moonGreen/30"
                required
              />
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] uppercase tracking-[0.18em] text-moonMuted">
                  {formState.feedback.trim().length}/220
                </span>
                <button
                  type="submit"
                  className="neo-btn-primary btn-glow rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em]"
                >
                  Submit Review
                </button>
              </div>
              {formMessage ? (
                <p className="text-xs text-moonGold">{formMessage}</p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

