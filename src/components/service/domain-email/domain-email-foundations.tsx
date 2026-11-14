"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebdesignSectionHeader } from "@/components/service/webdesign/webdesign-section-header";
import { DOMAIN_EMAIL_ACCENT, domainEmailFoundations } from "@/lib/domain-email-service-data";

function FoundationIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    domain: (
      <>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path
          d="M4 12h16M12 4a12 12 0 010 16M12 4a12 12 0 000 16"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    shield: (
      <path
        d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />
    ),
    support: (
      <>
        <path
          d="M12 4a6 6 0 00-6 6v2H4v4h4a6 6 0 0012 0h4v-4h-2v-2a6 6 0 00-6-6z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </>
    ),
  };

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      {icons[type] ?? icons.domain}
    </svg>
  );
}

export function DomainEmailFoundations() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-[#fafafa] py-20 md:py-28" data-cursor-bg="light">
      <div className="mx-auto max-w-[1220px] px-6 md:px-10">
        <WebdesignSectionHeader
          eyebrow="Die Grundlage"
          title="Ein professioneller Auftritt beginnt mit der richtigen Basis."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {domainEmailFoundations.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.07}>
              <motion.article
                className="group relative flex h-full flex-col items-center overflow-hidden rounded-[24px] border border-black/[0.06] bg-white px-6 py-8 text-center shadow-[0_4px_4px_rgba(0,0,0,0.04)]"
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                  style={{
                    background: `radial-gradient(ellipse 90% 70% at 50% 0%, ${DOMAIN_EMAIL_ACCENT}35, transparent 72%)`,
                  }}
                />

                <div
                  className="relative flex size-12 items-center justify-center rounded-2xl border border-black/[0.06] text-[#161618] transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: "white" }}
                >
                  <FoundationIcon type={item.icon} />
                </div>

                <h3 className="relative mt-5 text-sm font-bold leading-snug text-[#161618]">
                  {item.title}
                </h3>
                <p className="relative mt-2.5 text-[13px] leading-[1.65] text-black/55">
                  {item.desc}
                </p>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
