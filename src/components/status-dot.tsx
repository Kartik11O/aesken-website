"use client";

import { motion, useReducedMotion } from "framer-motion";

export function StatusDot({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const reduce = useReducedMotion();

  return (
    <span className="relative inline-flex size-1.5">
      <motion.span
        className={`absolute inset-0 rounded-full ${
          variant === "dark" ? "bg-accent-green/55" : "bg-accent-green"
        }`}
        animate={reduce ? undefined : { scale: [1, 1.6, 1], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span
        className={`relative size-1.5 rounded-full ${
          variant === "dark" ? "bg-accent-green/55" : "bg-accent-green"
        }`}
      />
    </span>
  );
}
