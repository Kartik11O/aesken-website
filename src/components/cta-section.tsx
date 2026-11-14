"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GsapTextReveal } from "@/components/gsap/text-reveal";
import { ScrollReveal } from "@/components/scroll-reveal";

export function CtaSection() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="relative overflow-hidden bg-surface-dark py-48" data-cursor-bg="dark">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[722px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2a1f15] opacity-30 blur-[123px]"
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-[1440px] px-10">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">— Beginnen</p>
        </ScrollReveal>

        <div className="mt-10 max-w-[1140px]">
          <GsapTextReveal
            as="h2"
            trigger="scroll"
            delay={0.05}
            stagger={0.04}
            split="words"
            text="Lass uns dein Ökosystem aufbauen"
            className="text-[clamp(2.75rem,8vw,7.25rem)] font-medium leading-[0.95] tracking-[-0.03em] text-accent-cream"
          />
        </div>

        <div className="mt-16 flex flex-col gap-10 lg:flex-row lg:justify-between">
          <ScrollReveal delay={0.12} className="max-w-md">
            <p className="text-base leading-[26px] text-white/55">
              Erzählen Sie uns von Ihrem Unternehmen. Wir antworten innerhalb eines
              Arbeitstages mit einem maßgeschneiderten Ökosystem-Vorschlag.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.16} className="w-full max-w-[656px] space-y-3">
            <Link
              href="mailto:hello@aesken.com"
              data-cursor="button"
              className="group flex h-16 items-center justify-between bg-accent-cream px-6 text-black transition-transform hover:scale-[1.01]"
            >
              <span className="underline underline-offset-4">hello@aesken.com</span>
              <motion.span
                aria-hidden
                className="inline-block"
                whileHover={reduce ? undefined : { x: 4 }}
              >
                →
              </motion.span>
            </Link>
            <Link
              href="#contact"
              data-cursor="button"
              className="group flex h-[66px] items-center justify-between border border-white/20 px-6 text-accent-cream transition-colors hover:border-white/40 hover:bg-white/5"
            >
              <span>Vereinbaren Sie einen Entdeckungstermin</span>
              <motion.span
                aria-hidden
                className="inline-block"
                whileHover={reduce ? undefined : { x: 4 }}
              >
                →
              </motion.span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
