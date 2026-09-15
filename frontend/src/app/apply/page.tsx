import Link from "next/link";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Sparkles } from "lucide-react";
import PageReveal from "@/components/PageReveal";
import SectionHeading from "@/components/SectionHeading";

const highlights = [
  "Technology and design strategy support",
  "Product and research project planning",
  "Fast response from the MIZYRA team"
];

export default function ApplyPage() {
  return (
    <PageReveal>
      <section className="page-hero section-shell reveal-up px-4 sm:px-6 md:px-8">
        <SectionHeading
          eyebrow="Consultation"
          title="Request a project consultation"
          description="Tell us about your software, research, design, or digital growth requirement and we will guide the next steps."
        />

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-6">
            <article className="glass-panel p-6">
              <p className="neo-chip inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-moonInk/80">
                <Sparkles size={14} className="text-moonGreen" />
                Why partner with us
              </p>
              <ul className="mt-4 space-y-3 text-sm text-moonInk/80">
                {highlights.map((item) => (
                  <li key={item} className="neo-chip flex items-start gap-2 rounded-2xl px-3 py-3">
                    <BadgeCheck size={16} className="mt-0.5 text-moonGreen" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass-panel grid gap-3 p-6">
              <div className="neo-chip flex items-center gap-3 rounded-2xl px-3 py-3">
                <BriefcaseBusiness size={16} className="text-moonGreen" />
                <div>
                  <p className="text-xs text-moonInk/65">Project Support</p>
                  <p className="text-sm font-semibold text-moonInk">Software, research, design, and digital strategy</p>
                </div>
              </div>
            </article>
          </aside>

          <form className="glass-panel grid gap-4 p-6 md:grid-cols-2 md:p-8">
            <div>
              <label htmlFor="full_name" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Full Name</label>
              <input id="full_name" required name="full_name" placeholder="Your full name" className="w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
            </div>

            <div>
              <label htmlFor="organization" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Organization</label>
              <input id="organization" required name="organization" placeholder="Company or team" className="w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="project_type" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Service Interest</label>
              <input id="project_type" name="project_type" placeholder="Example: Web app development, research support, UI/UX design" className="w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Email</label>
              <input id="email" required name="email" type="email" placeholder="you@example.com" className="w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Phone</label>
              <input id="phone" required name="phone" placeholder="Phone number" className="w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="notes" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Project Details</label>
              <textarea id="notes" name="notes" placeholder="Tell us about your goals, timeline, and current requirements" className="min-h-[120px] w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
            </div>

            <div className="md:col-span-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button className="neo-btn-primary btn-glow shine-on-hover rounded-full px-5 py-3 text-sm font-semibold">
                Submit Request
              </button>
              <Link href="/#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-moonInk hover:text-moonGreen">
                Contact directly <ArrowRight size={16} />
              </Link>
            </div>
          </form>
        </div>
      </section>
    </PageReveal>
  );
}
