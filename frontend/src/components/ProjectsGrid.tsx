"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projectShowcase } from "@/data/siteData";

export default function ProjectsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projectShowcase.map((project, index) => (
        <motion.article
          key={project.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.07 }}
          className="glass-panel hover-lift overflow-hidden"
        >
          <div className="group relative h-52 w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-moonBg/82 via-moonBg/10 to-transparent opacity-90" />
            <div className="absolute bottom-3 left-3 rounded-full bg-moonCard/80 px-3 py-1 text-xs font-semibold text-moonInk opacity-0 transition group-hover:opacity-100">
              Live Preview
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-xl font-semibold text-moonInk">{project.title}</h3>
            <p className="mt-2 text-sm text-moonInk/70">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="neo-chip px-3 py-1 text-xs text-moonInk/75">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
