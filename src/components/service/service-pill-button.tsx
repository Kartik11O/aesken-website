"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ServicePillButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light";
  size?: "md" | "lg";
};

export function ServicePillButton({
  href = "#contact",
  children,
  className = "",
  variant = "dark",
  size = "md",
}: ServicePillButtonProps) {
  const base =
    variant === "dark"
      ? "bg-black text-white shadow-[0_4px_0_rgba(0,0,0,0.12),0_12px_32px_rgba(0,0,0,0.12)]"
      : "bg-white text-black shadow-[0_2px_0_rgba(0,0,0,0.08)]";

  const sizing =
    size === "lg"
      ? "gap-4 p-2 pl-8 pr-2 text-[15px]"
      : "gap-3 p-1.5 pl-8 text-sm";

  const arrowSize = size === "lg" ? "size-[34px] text-base" : "size-[30px] text-sm";

  const arrowBg =
    variant === "dark"
      ? "bg-white/15 group-hover:bg-white/25"
      : "bg-black/[0.06] group-hover:bg-black/10";

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      <Link
        href={href}
        data-cursor="button"
        className={`group inline-flex items-center rounded-full transition-shadow duration-300 hover:shadow-[0_6px_0_rgba(0,0,0,0.1),0_20px_48px_rgba(0,0,0,0.16)] ${base} ${sizing} ${className}`}
      >
        <span className="font-medium">{children}</span>
        <span
          className={`flex ${arrowSize} items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-0.5 ${arrowBg}`}
        >
          <motion.span
            aria-hidden
            className="inline-block"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </span>
      </Link>
    </motion.div>
  );
}
