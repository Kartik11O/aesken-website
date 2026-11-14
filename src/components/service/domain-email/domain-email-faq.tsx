"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ServicePillButton } from "@/components/service/service-pill-button";
import { DOMAIN_EMAIL_ACCENT, domainEmailCta, domainEmailFaqs } from "@/lib/domain-email-service-data";

export function DomainEmailFaq() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-20 md:py-28" data-cursor-bg="light" id="faq">
      <div className="mx-auto max-w-[1220px] px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <ScrollReveal>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/45">
                FAQ
              </span>
              <h2 className="mt-4 max-w-[520px] font-[family-name:var(--font-instrument)] text-[clamp(1.875rem,3.2vw,2.375rem)] font-semibold leading-[1.12] tracking-[-0.025em]">
                Häufige Fragen zu Domain & E-Mail
              </h2>
            </ScrollReveal>

            <div className="mt-10 overflow-hidden rounded-[24px] border border-black/[0.08] bg-[#fafafa]">
              {domainEmailFaqs.map((item, i) => {
                const open = openIndex === i;

                return (
                  <ScrollReveal key={item.q} delay={i * 0.04}>
                    <div className="border-b border-black/[0.06] last:border-b-0">
                      <button
                        type="button"
                        data-cursor="button"
                        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-white/70"
                        onClick={() => setOpenIndex(open ? -1 : i)}
                        aria-expanded={open}
                      >
                        <span className="text-[15px] font-semibold leading-snug text-[#161618]">
                          {item.q}
                        </span>
                        <span
                          className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-black/[0.05] text-sm text-black/50"
                          aria-hidden
                        >
                          {open ? "−" : "+"}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 text-sm leading-[1.7] text-black/55">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          <ScrollReveal delay={0.1} className="lg:pt-12">
            <div className="relative overflow-hidden rounded-[28px] bg-[#161618] p-8 md:p-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                aria-hidden
                style={{
                  background: `radial-gradient(circle at 80% 0%, ${DOMAIN_EMAIL_ACCENT}55, transparent 55%)`,
                }}
              />

              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {domainEmailCta.eyebrow}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-instrument)] text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-[-0.02em] text-white">
                  {domainEmailCta.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/55">
                  {domainEmailCta.desc}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {domainEmailCta.checklist.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/75">
                      <span
                        className="flex size-4 items-center justify-center rounded-full text-[9px]"
                        style={{ backgroundColor: `${DOMAIN_EMAIL_ACCENT}90`, color: "#161618" }}
                        aria-hidden
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <ServicePillButton href="/service#contact" variant="light" size="lg">
                    Kostenloses Gespräch vereinbaren
                  </ServicePillButton>
                </div>

                <Link
                  href="/service#services"
                  data-cursor="link"
                  className="mt-5 inline-flex text-sm text-white/45 transition-colors hover:text-white/70"
                >
                  ← Zurück zu allen Leistungen
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
