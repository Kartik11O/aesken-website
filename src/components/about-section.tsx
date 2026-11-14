"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { GsapTextReveal } from "@/components/gsap/text-reveal";
import { GsapStaggerGrid } from "@/components/gsap/stagger-grid";
import { ScrollReveal } from "@/components/scroll-reveal";
import { gsap, registerGsap } from "@/lib/gsap";
import { stats } from "@/lib/data";

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      if (reduce || !ref.current || value === "2019") return;

      const numeric = parseInt(value.replace(/\D/g, ""), 10);
      if (Number.isNaN(numeric)) return;

      const suffix = value.includes("+") ? "+" : "";
      const pad = value.length > 2 && !suffix ? 0 : 2;
      const obj = { val: 0 };

      gsap.to(obj, {
        val: numeric,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (ref.current) {
            const rounded = Math.round(obj.val).toString();
            ref.current.textContent = pad
              ? `${rounded.padStart(pad, "0")}${suffix}`
              : `${rounded}${suffix}`;
          }
        },
      });
    },
    { scope: ref, dependencies: [reduce, value] },
  );

  return (
    <div className="border-r border-b border-black/10 px-2 pt-8 pb-6 last:border-r-0">
      <p ref={ref} className="text-5xl font-medium tracking-[-0.02em] text-black">
        {value}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.25em] text-black/50">{label}</p>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="border-t border-black/10 bg-white pt-44 pb-32" data-cursor-bg="light">
      <div className="mx-auto max-w-[1440px] px-10">
        <ScrollReveal className="mb-20 flex flex-col gap-10 lg:flex-row lg:justify-between">
          <p className="shrink-0 text-xs uppercase tracking-[0.3em] text-black/45">— Über</p>
          <GsapTextReveal
            as="p"
            trigger="scroll"
            stagger={0.025}
            split="words"
            text="Aesken ist ein vernetztes Ökosystem aus kreativen, Wachstums-, Betriebs- und Ingenieurpraktiken – entwickelt, um modernen Unternehmen zu mehr Sichtbarkeit, Intelligenz und struktureller Stabilität zu verhelfen."
            className="max-w-[1013px] text-[clamp(1.75rem,4vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-black"
          />
        </ScrollReveal>

        <GsapStaggerGrid
          className="grid grid-cols-2 border-t border-black/10 lg:grid-cols-4"
          stagger={0.1}
          start="top 90%"
        >
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </GsapStaggerGrid>
      </div>
    </section>
  );
}
