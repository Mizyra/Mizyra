"use client";

import Link from "next/link";
import Image from "next/image";
import { Award, BrainCircuit, Code2, FileText, GraduationCap, Lightbulb, Microchip, Palette, Rocket, ShieldCheck, Sparkles, TrendingUp, UsersRound, Zap } from "lucide-react";
import { useState, type FormEvent } from "react";
import PageReveal from "@/components/PageReveal";
import SectionHeading from "@/components/SectionHeading";
import { projectShowcase } from "@/data/siteData";

const serviceHighlights = [
  {
    title: "Software Development",
    description: "Custom web, mobile, and business applications designed for speed, clarity, and scalability.",
    points: ["Web Application Development", "Custom Software", "Frontend & Backend", "API Development", "Business Applications"],
    icon: Code2
  },
  {
    title: "Research & Publications",
    description: "Support for idea development, paper writing, methodology, data analysis, and publication readiness.",
    points: ["Research Paper Support", "IEEE Paper Assistance", "Data Analysis", "AI & IoT Research", "Formatting & Publication Support"],
    icon: FileText
  },
  {
    title: "UI/UX & Graphic Designing",
    description: "Modern interfaces and branded design systems that turn ideas into polished digital experiences.",
    points: ["UI/UX Design", "Website Design", "Branding", "Logo Design", "Presentation Design"],
    icon: Palette
  },
  {
    title: "Digital Marketing",
    description: "Strategic digital growth for reach, engagement, and measurable conversion performance.",
    points: ["Social Media Marketing", "SEO", "Content Marketing", "Branding", "Performance Marketing"],
    icon: TrendingUp
  },
  {
    title: "Technology Solutions",
    description: "AI, ML, data, automation, and cloud-ready solutions for practical business outcomes.",
    points: ["Artificial Intelligence", "Machine Learning", "Generative AI", "IoT Solutions", "Cloud & Automation"],
    icon: Zap
  }
];

const reasons = [
  "Business-ready technology execution",
  "Research-driven problem solving",
  "Design-first experience strategy",
  "Performance-focused digital growth"
];

const heroStats = [
  { value: "120+", label: "Project engagements", icon: GraduationCap },
  { value: "8+", label: "Core capability areas", icon: Microchip },
  { value: "24/7", label: "Client communication", icon: UsersRound }
];

const programCards = [
  {
    title: "Software Engineering",
    text: "Build production systems, product architecture, and full-stack delivery workflows with research-informed engineering principles.",
    icon: Code2
  },
  {
    title: "AI & Data Science",
    text: "Explore practical AI, data modeling, automation, and analytics capabilities designed for the next generation of decisions.",
    icon: BrainCircuit
  },
  {
    title: "Research & Innovation",
    text: "Turn ideas into experiments, publications, and proof-of-concept systems supported by structured academic and industry guidance.",
    icon: Award
  }
];

export default function HomePage() {
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactSent(true);
  };

  const featuredProject = projectShowcase[0];
  const spotlightProjects = projectShowcase.slice(1, 4);
  const galleryProjects = projectShowcase.slice(4, 10);

  return (
    <PageReveal>
      <section id="home" className="-mt-14 overflow-hidden pb-20 pt-28 md:-mt-16 md:pt-32">
        <div className="section-shell">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-4xl text-center">
              <div className="eyebrow-pill">
                Engineering • Research • Industry
              </div>
              <h1 className="hero-title mt-8 text-5xl font-medium leading-[1.02] md:text-6xl lg:text-7xl">
                <span className="block bg-gradient-to-r from-[#F4D06F] via-[#E8C86B] to-[#7DE7C4] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(212,175,55,0.22)]" style={{ letterSpacing: "0.18em", fontSize: "clamp(3.2rem, 8vw, 8rem)" }}>
                  MIZYRA
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-moonMuted md:text-xl">
                Start Where Others Stop
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link href="/#programs" className="neo-btn-primary btn-glow gold-shimmer rounded-full px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.25em]">
                  Explore Programs
                </Link>
                <Link href="/#about" className="neo-btn-secondary btn-glow rounded-full px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.25em]">
                  Discover MIZYRA
                </Link>
              </div>

              <div className="metric-strip mx-auto mt-12 grid max-w-5xl gap-0 px-4 py-5 sm:grid-cols-3 sm:px-8">
                {heroStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                  <div key={stat.label} className="flex items-center justify-center gap-5 border-b border-moonGreen/25 p-4 text-left last:border-0 sm:border-b-0 sm:border-r sm:last:border-0">
                    <span className="metric-icon shrink-0">
                      <Icon size={26} strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="font-serif text-3xl text-moonInk">{stat.value}</p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-moonMuted">{stat.label}</p>
                    </div>
                  </div>
                );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="scroll-mt-24 py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Programs"
            title="Purpose-built learning paths for engineering and digital innovation"
            description="Each pathway combines discipline, applied research, product thinking, and portfolio-ready outcomes to prepare students for modern technical careers."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {programCards.map((program) => {
              const Icon = program.icon;
              return (
                <article key={program.title} className="glass-panel group p-6 transition duration-200 hover:-translate-y-1 hover:border-moonGold/60">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-moonGold/40 bg-moonSoft/70 text-moonGold">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-moonInk">{program.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-moonMuted">{program.text}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-moonGreen">
                    <ShieldCheck size={14} />
                    Outcome-led learning
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 py-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow="About"
            title="Technology strategy built around real outcomes"
            description="MIZYRA focuses on measurable digital execution across software development, research, design systems, and growth-focused marketing."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {reasons.map((reason) => (
              <div key={reason} className="neo-surface p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-moonGreen/30 bg-moonSoft/70 text-moonGreen">
                  <Sparkles size={18} />
                </div>
                <p className="text-base font-semibold text-moonInk">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 py-24">
        <div className="section-shell">
          <div className="rounded-[30px] border border-moonGreen/35 px-6 py-10 shadow-[0_20px_60px_rgba(6,59,51,0.45)] md:px-10 md:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-moonGreen">Core Focus</p>
              <h2 className="mt-3 text-3xl font-semibold text-moonInk md:text-4xl">Technology services built for modern business growth</h2>
              <p className="mt-4 text-sm text-moonMuted md:text-base">
                We help teams design, build, research, and market digital products with clarity and consistency.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {serviceHighlights.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className="group rounded-3xl border border-moonGreen/30 bg-moonCard/80 p-6 transition duration-200 hover:-translate-y-1 hover:border-moonGold/70 hover:shadow-[0_18px_32px_rgba(13,107,90,0.28)]">
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-moonGreen/45 bg-moonSoft/70 text-moonGreen">
                        <Icon size={20} />
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-moonInk">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-moonMuted">{service.description}</p>
                    <ul className="mt-5 space-y-2 text-sm text-moonMuted">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-moonGold" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="research" className="scroll-mt-24 py-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Research"
            title="Practical research support with business-ready outcomes"
            description="From topic development to publication support, we help turn research goals into structured, reliable work."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { title: "Research Paper Development", text: "Methodology, literature review, writing, and proofing support for academic and professional research." },
              { title: "Data & AI Research", text: "Applied research support using modern data, AI, ML, and IoT workflows." },
              { title: "Publication Support", text: "Formatting, journal alignment, proofreading, and technical documentation assistance." }
            ].map((item) => (
              <div key={item.title} className="neo-surface p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-moonGreen/30 bg-moonSoft/70 text-moonGreen">
                  <Lightbulb size={18} />
                </div>
                <h3 className="text-lg font-semibold text-moonInk">{item.title}</h3>
                <p className="mt-3 text-sm text-moonMuted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 py-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Project Showcase"
            title="Selected technology work and digital product highlights"
            description="Explore modern projects spanning software products, research-focused systems, digital experiences, and growth platforms."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            {featuredProject ? (
              <div className="group relative overflow-hidden rounded-3xl border border-moonBorder/70 bg-moonCard/85 text-left shadow-sm transition hover:-translate-y-2 hover:shadow-lg spotlight border-animate">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={featuredProject.image} alt={featuredProject.title} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-moonBg/90 via-transparent to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-moonBorder/70 bg-moonCard/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-moonGreen">
                    Featured Build
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-moonInk transition-colors group-hover:text-moonGreen">{featuredProject.title}</h3>
                  <p className="mt-2 text-moonMuted">{featuredProject.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featuredProject.technologies.map((tech) => (
                      <span key={tech} className="rounded-full border border-moonBorder/70 bg-moonCard/80 px-3 py-1 text-xs font-medium text-moonInk/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="grid gap-4">
              {spotlightProjects.map((project) => (
                <div key={project.title} className="group flex items-center gap-4 rounded-3xl border border-moonBorder/70 bg-moonCard/85 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-20 w-28 overflow-hidden rounded-2xl border border-moonBorder/70">
                    <Image src={project.image} alt={project.title} fill sizes="112px" className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-moonInk group-hover:text-moonGreen">{project.title}</h4>
                    <p className="mt-1 text-xs text-moonMuted">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryProjects.map((project) => (
              <div key={project.title} className="group rounded-3xl border border-moonBorder/70 bg-moonCard/85 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-moonBorder/70">
                  <Image src={project.image} alt={project.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h4 className="mt-4 text-lg font-semibold text-moonInk group-hover:text-moonGreen">{project.title}</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded-full border border-moonBorder/70 bg-moonCard/80 px-3 py-1 text-[11px] text-moonInk/70">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 py-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Contact"
            title="Start your next technology initiative"
            description="Tell us what you need and we will help shape the right technical direction for your next build, research project, or digital campaign."
          />

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <form onSubmit={handleContactSubmit} className="glass-panel p-6 md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="relative">
                  <input type="text" name="fullName" placeholder=" " className="peer w-full rounded-2xl border border-moonBorder/70 bg-moonSoft/60 px-4 py-3 text-sm text-moonInk outline-none focus:border-moonGreen focus:ring-2 focus:ring-moonGreen/30" required />
                  <span className="absolute left-4 top-3 text-xs text-moonMuted transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-moonGreen">Name</span>
                </label>
                <label className="relative">
                  <input type="email" name="email" placeholder=" " className="peer w-full rounded-2xl border border-moonBorder/70 bg-moonSoft/60 px-4 py-3 text-sm text-moonInk outline-none focus:border-moonGreen focus:ring-2 focus:ring-moonGreen/30" required />
                  <span className="absolute left-4 top-3 text-xs text-moonMuted transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-moonGreen">Email</span>
                </label>
                <label className="relative md:col-span-2">
                  <input type="text" name="company" placeholder=" " className="peer w-full rounded-2xl border border-moonBorder/70 bg-moonSoft/60 px-4 py-3 text-sm text-moonInk outline-none focus:border-moonGreen focus:ring-2 focus:ring-moonGreen/30" />
                  <span className="absolute left-4 top-3 text-xs text-moonMuted transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-moonGreen">Company / Organization</span>
                </label>
                <label className="relative md:col-span-2">
                  <textarea name="message" placeholder=" " className="peer min-h-[140px] w-full rounded-2xl border border-moonBorder/70 bg-moonSoft/60 px-4 py-3 text-sm text-moonInk outline-none focus:border-moonGreen focus:ring-2 focus:ring-moonGreen/30" required />
                  <span className="absolute left-4 top-3 text-xs text-moonMuted transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-moonGreen">Project details</span>
                </label>
              </div>

              <button className="neo-btn-primary btn-glow shine-on-hover mt-5 rounded-full px-5 py-3 text-sm font-semibold">
                Send Inquiry
              </button>

              {contactSent ? (
                <p className="mt-4 rounded-2xl border border-moonGreen/50 bg-moonGreen/10 px-4 py-3 text-sm text-moonGreen">
                  Your inquiry has been recorded. We will get back to you shortly.
                </p>
              ) : null}
            </form>

            <aside className="space-y-6">
              <div className="glass-panel p-6">
                <h3 className="text-xl font-semibold text-moonInk">What we can support</h3>
                <ul className="mt-4 space-y-3 text-sm text-moonInk/80">
                  {[
                    "Software architecture and product development",
                    "Research support and publishing workflows",
                    "UI/UX and branding design",
                    "Digital marketing strategy and campaign support"
                  ].map((item) => (
                    <li key={item} className="neo-chip flex items-start gap-2 rounded-2xl px-3 py-3">
                      <Rocket size={16} className="mt-0.5 text-moonGreen" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel p-6">
                <h3 className="text-xl font-semibold text-moonInk">Contact details</h3>
                <div className="mt-4 space-y-3 text-sm text-moonInk/80">
                  <p><strong>Email:</strong> <a href="mailto:mizyra.instituteoftechnology@gmail.com" className="text-moonGreen">mizyra.instituteoftechnology@gmail.com</a></p>
                  <p><strong>Phone:</strong> +91 93631 56825</p>
                  <p><strong>Location:</strong> Chennai, Tamil Nadu</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageReveal>
  );
}
