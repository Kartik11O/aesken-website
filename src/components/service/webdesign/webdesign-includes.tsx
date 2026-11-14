"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebdesignSectionHeader } from "@/components/service/webdesign/webdesign-section-header";
import { webdesignIncludes } from "@/lib/webdesign-service-data";

function IncludeIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    research: (
      <path d="M6 18V6h12v12M9 10h6M9 14h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    ),
    design: (
      <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    ),
    dev: (
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 7l-2 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    ),
    support: (
      <path d="M12 4a6 6 0 00-6 6v2H4v4h4a6 6 0 0012 0h4v-4h-2v-2a6 6 0 00-6-6z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
  };

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      {icons[type] ?? icons.research}
    </svg>
  );
}

export function WebdesignIncludes() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-white py-20 md:py-28" data-cursor-bg="light" id="leistungen">
      <div className="mx-auto max-w-[1220px] px-6 md:px-10">
        <WebdesignSectionHeader
          eyebrow="Was ist inklusive?"
          title="Alles, was Ihre Website zum Erfolg braucht."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {webdesignIncludes.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.07}>
              <motion.article
                className="group relative flex h-full min-h-[308px] flex-col justify-between overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-6 shadow-[0_4px_4px_rgba(0,0,0,0.04)]"
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

                {i === 0 ? (
                  <div
                    className="pointer-events-none absolute -bottom-8 left-1/2 h-40 w-[90%] -translate-x-1/2 opacity-50 blur-2xl"
                    aria-hidden
                    style={{ backgroundColor: `${item.accent}35` }}
                  />
                ) : null}

                <div className="relative">
                  <div
                    className="flex size-10 items-center justify-center rounded-xl text-[#161618] transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: `${item.accent}42` }}
                  >
                    <IncludeIcon type={item.icon} />
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
