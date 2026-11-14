"use client";

import { ScrollReveal } from "@/components/scroll-reveal";

export function WebdesignSectionHeader({
  eyebrow,
  title,
  desc,
  align = "center",
  className = "",
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <ScrollReveal className={className}>
      <span
        className={`inline-block rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50 ${align === "center" ? "mx-auto" : ""}`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-4 max-w-[760px] font-[family-name:var(--font-instrument)] text-[clamp(1.875rem,3.5vw,2.625rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-[#161618] ${alignClass}`}
      >
        {title}
      </h2>
      {desc ? (
        <p className={`mt-4 max-w-[620px] text-base leading-relaxed text-black/55 ${alignClass}`}>
          {desc}
        </p>
      ) : null}
    </ScrollReveal>
  );
}
