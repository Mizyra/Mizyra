"use client";

import type { LucideIcon } from "lucide-react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

type AnimatedCounterProps = {
  value: number;
  label: string;
  icon?: LucideIcon;
  className?: string;
};

export default function AnimatedCounter({ value, label, icon: Icon, className }: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.7, ease: "easeOut" });
    return controls.stop;
  }, [count, value]);

  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className={`neo-surface hover-lift p-5 ${className ?? ""}`}
    >
      {Icon ? (
        <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-moonGreen/40 bg-moonSoft/80">
          <Icon size={20} className="text-moonGreen" />
        </div>
      ) : null}
      <p className="text-3xl font-semibold text-moonInk">
        <motion.span>{rounded}</motion.span>+
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-moonMuted">{label}</p>
      <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-moonGreen/20 via-moonGreen/60 to-transparent" />
    </motion.div>
  );
}

