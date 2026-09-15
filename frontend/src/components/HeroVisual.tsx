"use client";

import { motion } from "framer-motion";
import { Bot, CloudCog, Code2, Cpu } from "lucide-react";

const miniCards = [
  { icon: Code2, title: "Live Coding", value: "120+ labs" },
  { icon: Cpu, title: "Projects", value: "5,200+ builds" },
  { icon: CloudCog, title: "Cloud Tracks", value: "AWS + DevOps" },
  { icon: Bot, title: "AI Pathways", value: "ML + GenAI" }
];

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass-panel overflow-hidden p-6 md:p-8"
      >
        <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-moonGold/25 blur-2xl" />
        <div className="absolute -left-12 bottom-0 h-28 w-28 rounded-full bg-moonGreen/35 blur-2xl" />

        <div className="relative z-10 rounded-2xl border border-moonGreen/35 bg-moonCard/70 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-moonGold">MIZYRA Live Studio</p>
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-moonGold/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-moonGreen/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-moonInk/45" />
            </div>
          </div>

          <div className="space-y-2 rounded-xl bg-moonSoft/60 p-3 font-mono text-xs text-moonInk/80">
            <p>{"> Learning roadmap initialized"}</p>
            <p>{"> Project track: AI Engineer"}</p>
            <p>{"> Weekly sprint: Active"}</p>
            <p className="text-moonGold">{"> Mentor review in 02:30:00"}</p>
          </div>
        </div>

        <div className="relative z-10 mt-4 grid gap-3 sm:grid-cols-2">
          {miniCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.08, duration: 0.45 }}
                className="neo-chip flex items-center gap-3 px-3 py-2"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-moonGold/30 bg-moonGold/20 text-moonGold">
                  <Icon size={16} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-moonInk">{card.title}</p>
                  <p className="text-xs text-moonInk/70">{card.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
