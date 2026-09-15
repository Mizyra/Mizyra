"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto mb-10 max-w-3xl text-center"
    >
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-moonGreen">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold text-moonInk md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-moonMuted">{description}</p> : null}
      <div className="mx-auto mt-5 h-px w-24 glow-line" />
    </motion.div>
  );
}

