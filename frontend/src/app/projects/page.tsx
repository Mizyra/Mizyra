import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Rocket } from "lucide-react";
import { projectShowcase } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Technology Projects & Case Studies",
  description: "Explore MIZYRA projects spanning software development, AI, computer vision, full-stack platforms, and digital transformation case studies.",
  alternates: {
    canonical: "https://www.mizyra.org/projects"
  },
  keywords: [
    "MIZYRA projects",
    "AI projects",
    "software development case studies",
    "research and product builds",
    "full stack portfolio"
  ]
};

export default function ProjectsPage() {
  const featuredProject = projectShowcase[0];
  const spotlightProjects = projectShowcase.slice(1, 5);
  const galleryProjects = projectShowcase.slice(5);

  return (
    <section className="page-hero py-20">
      <div className="section-shell">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-moonBorder/70 bg-moonCard/80 px-4 py-2 text-sm font-medium text-moonGreen">
            <Rocket size={16} />
            Project Showcase
          </span>
          <h1 className="mt-4 text-3xl font-semibold text-moonInk md:text-4xl">
            Technology solutions built for real use cases
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-moonInk/70">
            Each project reflects a practical business challenge, a clean technology approach, and a measurable product outcome.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {featuredProject ? (
            <div className="glass-panel overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={featuredProject.image} alt={featuredProject.title} fill sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-moonBg/90 via-transparent to-transparent" />
                <div className="absolute left-6 top-6 rounded-full border border-moonBorder/70 bg-moonCard/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-moonGreen">
                  Featured Build
                </div>
                <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-moonBorder/70 bg-moonCard/90 shadow-sm">
                  <Play size={20} className="ml-0.5 text-moonGreen" />
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-moonInk">{featuredProject.title}</h2>
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
              <div key={project.title} className="glass-panel overflow-hidden">
                <div className="flex items-start gap-3 p-4 sm:items-center sm:gap-4">
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-2xl border border-moonBorder/70 sm:h-20 sm:w-28">
                    <Image src={project.image} alt={project.title} fill sizes="(min-width: 640px) 112px, 80px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-moonInk">{project.title}</h3>
                    <p className="mt-1 text-xs text-moonMuted">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryProjects.map((project) => (
            <div key={project.title} className="glass-panel overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={project.image} alt={project.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-moonBg/80 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-moonInk">{project.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded-full border border-moonBorder/70 bg-moonCard/80 px-3 py-1 text-[11px] text-moonInk/70">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/#contact" className="neo-btn-primary btn-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
            Start a Project <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
