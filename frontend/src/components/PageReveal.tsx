"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export default function PageReveal({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}




