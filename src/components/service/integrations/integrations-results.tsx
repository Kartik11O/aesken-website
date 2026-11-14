"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebdesignSectionHeader } from "@/components/service/webdesign/webdesign-section-header";
import { WebdesignStatValue } from "@/components/service/webdesign/webdesign-stat-value";
import { INTEGRATIONS_ACCENT, integrationsResults as data } from "@/lib/integrations-service-data";

export function IntegrationsResults() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-[#fafafa] py-20 md:py-28" data-cursor-bg="light">
      <div className="mx-auto max-w-[1000px] px-6 md:px-10">
        <WebdesignSectionHeader eyebrow={data.eyebrow} title={data.title} />

        <ScrollReveal delay={0.06}>
          <div className="mx-auto mt-12 grid max-w-[760px] gap-4 sm:grid-cols-3">
            {data.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-2xl border border-black/[0.06] bg-white px-4 py-6 text-center shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -5,
                        scale: 1.03,
                        borderColor: `${INTEGRATIONS_ACCENT}55`,
                        boxShadow: `0 12px 28px ${INTEGRATIONS_ACCENT}18`,
                      }
                }
                transition={{ delay: i * 0.08, duration: 0.4, type: "spring", stiffness: 340, damping: 24 }}
              >
                <WebdesignStatValue
                  value={stat.value}
                  className="text-[clamp(1.5rem,2.6vw,2rem)] font-bold text-[#2e2e33]"
                />
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7a7a7c]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.14}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {data.tools.map((tool, i) => (
              <motion.span
                key={tool}
                className="rounded-full border border-black/[0.08] bg-white px-4 py-2 text-xs font-medium text-black/60"
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                whileHover={
                  reduce
                    ? undefined
                    : { y: -2, scale: 1.05, borderColor: `${INTEGRATIONS_ACCENT}70`, color: "#161618" }
                }
                transition={{ delay: i * 0.05, duration: 0.3, type: "spring", stiffness: 380, damping: 22 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
