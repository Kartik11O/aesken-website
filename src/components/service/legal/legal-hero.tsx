"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ServicePillButton } from "@/components/service/service-pill-button";
import { LEGAL_ACCENT, legalHero } from "@/lib/legal-service-data";

function ShieldPanel() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[32px] opacity-70 blur-3xl"
        style={{ background: `radial-gradient(circle, ${LEGAL_ACCENT}1f, transparent 70%)` }}
        aria-hidden
      />

      <div className="relative rounded-[20px] border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_rgba(15,23,42,0.06)] sm:p-7">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-black/45">{legalHero.panel.label}</span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold"
            style={{ backgroundColor: `${LEGAL_ACCENT}14`, color: LEGAL_ACCENT }}
          >
            <motion.span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: LEGAL_ACCENT }}
              animate={reduce ? undefined : { opacity: [1, 0.35, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            {legalHero.panel.status}
          </span>
        </div>

        <div className="mt-6 flex justify-center">
          <motion.div
            className="flex size-[76px] items-center justify-center rounded-[22px]"
            style={{ backgroundColor: `${LEGAL_ACCENT}12` }}
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
              <path
                d="M12 3l7 3v6c0 4.4-2.9 7.4-7 9-4.1-1.6-7-4.6-7-9V6l7-3z"
                fill="none"
                stroke={LEGAL_ACCENT}
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <rect x="9" y="11" width="6" height="5" rx="1.2" fill="none" stroke={LEGAL_ACCENT} strokeWidth="1.3" />
              <path d="M10.3 11V9.8a1.7 1.7 0 013.4 0V11" fill="none" stroke={LEGAL_ACCENT} strokeWidth="1.3" />
            </svg>
          </motion.div>
        </div>

        <ul className="mt-6 space-y-2.5 border-t border-black/[0.06] pt-5">
          {legalHero.panel.checks.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-[13px] text-black/70">
              <span
                className="flex size-4 shrink-0 items-center justify-center rounded-full text-[9px] text-white"
                style={{ backgroundColor: LEGAL_ACCENT }}
                aria-hidden
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function LegalHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-8 md:pb-24 md:pt-12" data-cursor-bg="light">
      <div className="relative mx-auto max-w-[1220px] px-6 md:px-10">
        <ScrollReveal>
          <Link
            href="/service#services"
            data-cursor="link"
            className="inline-flex items-center gap-2 text-sm text-black/45 transition-colors hover:text-black"
          >
            <span aria-hidden>←</span>
            Zurück zu allen Diensten
          </Link>
        </ScrollReveal>

        <div className="mt-12 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <ScrollReveal>
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: LEGAL_ACCENT }}
            >
              {legalHero.eyebrow}
            </span>

            <h1 className="mt-5 font-[family-name:var(--font-instrument)] text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#161618]">
              {legalHero.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-6 max-w-[520px] text-[16px] leading-[1.75] text-black/55">
              {legalHero.desc}
            </p>

            <div className="mt-9">
              <ServicePillButton href="/service#contact" size="lg">
                {legalHero.cta}
              </ServicePillButton>
            </div>

            <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-black/[0.06] pt-6">
              {legalHero.trust.map((item) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-2 text-[13px] text-black/50"
                  whileHover={reduce ? undefined : { color: "#161618" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: LEGAL_ACCENT }} aria-hidden />
                  {item}
                </motion.li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <ShieldPanel />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
