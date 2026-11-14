"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GsapStaggerGrid } from "@/components/gsap/stagger-grid";
import { GsapTextReveal } from "@/components/gsap/text-reveal";
import { ScrollReveal } from "@/components/scroll-reveal";
import { capabilities } from "@/lib/data";

export function CapabilitiesSection() {
  const reduce = useReducedMotion();

  return (
    <section id="capabilities" className="bg-surface-warm pt-44 pb-32" data-cursor-bg="light">
      <div className="mx-auto max-w-[1440px] px-10">
        <ScrollReveal className="mb-16 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-black/45">
              — Vernetzte Fähigkeiten
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-medium leading-none tracking-[-0.03em]">
              <GsapTextReveal
                as="span"
                trigger="scroll"
                stagger={0.05}
                text="Neun Praktiken."
                className="block text-black"
              />
              <GsapTextReveal
                as="span"
                trigger="scroll"
                delay={0.1}
                stagger={0.05}
                text="Ein Ökosystem."
                className="block text-black/50"
              />
            </h2>
          </div>
          <p className="max-w-[549px] text-base leading-[26px] text-black/65">
            Jede Fähigkeit funktioniert als eigenständige Praxis, teilt jedoch Sprache,
            Werkzeuge und Absicht – so können Kunden Dienste zu einer einzigen koordinierten
            Infrastruktur zusammenstellen.
          </p>
        </ScrollReveal>

        <GsapStaggerGrid
          className="grid border-t border-black/10 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {capabilities.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              data-cursor="card"
              className="group flex h-[203px] flex-col justify-between border-r border-b border-black/10 p-8 transition-colors hover:bg-black/[0.03] max-lg:nth-[2n]:border-r-0 lg:nth-[3n]:border-r-0"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs tracking-[0.3em] text-black/40">{item.num}</span>
                <motion.span
                  className="text-black/40 transition-colors group-hover:text-black"
                  whileHover={reduce ? undefined : { x: 4 }}
                >
                  →
                </motion.span>
              </div>
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.02em] text-black">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-[22px] text-black/55">{item.desc}</p>
              </div>
            </Link>
          ))}
        </GsapStaggerGrid>
      </div>
    </section>
  );
}
