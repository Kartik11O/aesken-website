"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebdesignSectionHeader } from "@/components/service/webdesign/webdesign-section-header";
import { integrationsCategories } from "@/lib/integrations-service-data";

function CategoryIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M4 9h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="13" r="1" fill="currentColor" />
        <circle cx="13" cy="13" r="1" fill="currentColor" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M16 6.5a3 3 0 010 6M19 20c0-2.8-1.9-5.1-4.5-5.8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    ),
    payment: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" />
        <rect x="6" y="13.5" width="5" height="2.2" rx="0.6" fill="currentColor" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  };

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      {icons[type] ?? icons.calendar}
    </svg>
  );
}

export function IntegrationsCategories() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-white py-20 md:py-28" data-cursor-bg="light" id="leistungen">
      <div className="mx-auto max-w-[1220px] px-6 md:px-10">
        <WebdesignSectionHeader
          eyebrow="Was wir verbinden"
          title="Die wichtigsten Systeme für Ihr Business."
          desc="Wir binden die Tools an, mit denen Sie ohnehin schon arbeiten – oder empfehlen Ihnen die passenden."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {integrationsCategories.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.07}>
              <motion.article
                className="group relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-6 shadow-[0_4px_4px_rgba(0,0,0,0.04)]"
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-[55%] h-40 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                  style={{
                    background: `radial-gradient(ellipse 90% 70% at 50% 100%, ${item.accent}40, transparent 72%)`,
                  }}
                />

                <div className="relative">
                  <div
                    className="flex size-10 items-center justify-center rounded-xl text-[#161618] transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: `${item.accent}42` }}
                  >
                    <CategoryIcon type={item.icon} />
                  </div>
                  <p className="mt-5 text-[13px] leading-[1.65] text-black/55">{item.desc}</p>
                </div>

                <h3 className="relative mt-8 text-base font-semibold leading-snug text-[#161618]">
                  {item.title}
                </h3>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
