import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import PageReveal from "@/components/PageReveal";
import SectionHeading from "@/components/SectionHeading";
import { blogPosts } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Technology Insights & Events",
  description: "Read MIZYRA Institute of Technology insights on AI careers, software engineering, cloud skills, and digital innovation for students, professionals, and businesses.",
  alternates: {
    canonical: "https://www.mizyra.org/blog"
  },
  keywords: [
    "AI career roadmap",
    "developer portfolio guidance",
    "cloud and DevOps skills",
    "MIZYRA insights",
    "technology learning resources"
  ]
};

export default function BlogPage() {
  return (
    <PageReveal>
      <section className="page-hero section-shell">
        <SectionHeading
          eyebrow="News & Events"
          title="Signals from the MIZYRA technology community"
          description="Explore practical notes from engineering, research, and digital product work."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <article key={post.title} className="glass-panel p-6 transition duration-200 hover:-translate-y-1 hover:border-moonGold/60">
              <div className="flex items-center justify-between gap-4">
                <span className="metric-icon h-12 w-12">
                  <Newspaper size={19} strokeWidth={1.7} />
                </span>
                <span className="rounded-full border border-moonGold/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-moonGold">
                  {post.category}
                </span>
              </div>
              <p className="mt-7 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-moonMuted">
                <CalendarDays size={14} />
                Event Note {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-moonInk">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-moonMuted">{post.summary}</p>
              <Link href="/#contact" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-moonGreen hover:text-moonGold">
                Ask about this <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </PageReveal>
  );
}
