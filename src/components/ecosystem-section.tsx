"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GsapStaggerGrid } from "@/components/gsap/stagger-grid";
import { GsapTextReveal } from "@/components/gsap/text-reveal";
import { InteractiveCardSurface } from "@/components/interactive-card-surface";
import { ScrollReveal } from "@/components/scroll-reveal";
import { divisions } from "@/lib/data";

function DivisionCard({
  phase,
  title,
  desc,
  glow,
  href = "#contact",
}: {
  phase: string;
  title: string;
  desc: string;
  glow: string;
  href?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <Link href={href} className="group block" data-cursor="card">
      <InteractiveCardSurface
        glow={glow}
        className="flex min-h-[538px] flex-col justify-between bg-surface-dark p-10"
      >
        <div className="relative flex items-start justify-between">
          <span className="text-xs uppercase tracking-[0.4em] text-white/40">{phase}</span>
          <motion.span
            className="text-white/40 transition-colors group-hover:text-white"
            whileHover={reduce ? undefined : { x: 4, y: -4 }}
          >
            →
          </motion.span>
        </div>

        <div className="relative">
          <h3 className="text-[clamp(2rem,3vw,2.6rem)] font-medium tracking-[-0.02em] text-accent-cream">
            {title}
          </h3>
          <p className="mt-5 max-w-md text-sm leading-[22px] text-white/60">{desc}</p>
        </div>
      </InteractiveCardSurface>
    </Link>
  );
}

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="border-t border-black/10 bg-white pt-44 pb-32" data-cursor-bg="light">
      <div className="mx-auto max-w-[1440px] px-10">
        <ScrollReveal className="mb-20 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-black/45">
              — Das Ökosystem
            </p>
            <h2 className="text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.03em]">
              <GsapTextReveal
                as="span"
                trigger="scroll"
                stagger={0.05}
                text="Vier Abteilungen."
                className="block text-black"
              />
              <GsapTextReveal
                as="span"
                trigger="scroll"
                delay={0.1}
                stagger={0.05}
                text="Eine Infrastruktur."
                className="block italic text-black/50"
              />
            </h2>
          </div>
          <p className="max-w-[433px] text-base leading-[26px] text-black/65">
            Das Aesken-Ökosystem durchläuft vier Phasen — Identität, Sichtbarkeit, Betrieb
            und Infrastruktur — die sich jeweils natürlich zur nächsten entwickeln.
          </p>
        </ScrollReveal>

        <GsapStaggerGrid className="grid gap-4 lg:grid-cols-2" stagger={0.1}>
          {divisions.map((division) => (
            <DivisionCard key={division.title} {...division} />
          ))}
        </GsapStaggerGrid>
      </div>
    </section>
  );
}
