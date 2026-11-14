"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { INTEGRATIONS_ACCENT, INTEGRATIONS_TEAL, integrationsShowcase as data } from "@/lib/integrations-service-data";

const NODE_COLORS = ["#F4A4B8", INTEGRATIONS_ACCENT, "#A8E6CF"] as const;

function SyncPanel({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#111113] p-6 md:p-7">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{ background: `radial-gradient(circle at 85% 0%, ${INTEGRATIONS_ACCENT}30, transparent 55%)` }}
      />

      <div className="relative flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
          {data.panelLabel}
        </span>
        <motion.span
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white"
          style={{ backgroundColor: INTEGRATIONS_TEAL }}
          animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="size-1.5 rounded-full bg-white"
            animate={reduce ? undefined : { opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          {data.panelHighlight}
        </motion.span>
      </div>

      <div className="relative mt-8 flex items-center justify-between gap-3">
        {data.nodes.map((label, i) => (
          <motion.div
            key={label}
            className="flex flex-1 flex-col items-center gap-2"
            animate={reduce ? undefined : { y: [0, -3, 0] }}
            transition={{ duration: 2.4 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
          >
            <span
              className="flex size-11 items-center justify-center rounded-full border text-[10px] font-bold text-white"
              style={{ borderColor: `${NODE_COLORS[i]}60`, backgroundColor: `${NODE_COLORS[i]}22` }}
            >
              {label.slice(0, 2).toUpperCase()}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-white/45">{label}</span>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-6 flex items-center gap-3">
        {data.nodes.map((_, i) => (
          <div key={i} className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ backgroundColor: NODE_COLORS[i] }}
              animate={reduce ? { width: "70%" } : { width: ["10%", "85%", "10%"] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
          </div>
        ))}
      </div>

      <div className="relative mt-6 space-y-2">
        {["Neue Buchung synchronisiert", "Zahlung bestätigt", "Kontakt im CRM angelegt"].map((line, i) => (
          <motion.div
            key={line}
            className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2"
            initial={{ opacity: 0.4 }}
            animate={reduce ? { opacity: 0.8 } : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          >
            <span className="size-1.5 rounded-full" style={{ backgroundColor: NODE_COLORS[i] }} aria-hidden />
            <span className="text-[11px] text-white/60">{line}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function IntegrationsShowcase() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-[#fafafa] py-20 md:py-28" data-cursor-bg="light">
      <div className="mx-auto max-w-[1220px] px-6 md:px-10">
        <div className="overflow-hidden rounded-[32px] bg-[#161618] p-8 md:p-14">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                {data.eyebrow}
              </span>
              <h2 className="mt-4 max-w-[440px] font-[family-name:var(--font-instrument)] text-[clamp(1.875rem,3.2vw,2.375rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-white">
                {data.title}
              </h2>
              <p className="mt-5 max-w-[440px] text-[15px] leading-[1.7] text-white/55">{data.desc}</p>

              <ul className="mt-7 space-y-3">
                {data.points.map((point, i) => (
                  <motion.li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-white/75"
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.08, duration: 0.35 }}
                  >
                    <span
                      className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[9px]"
                      style={{ backgroundColor: `${INTEGRATIONS_ACCENT}90`, color: "#161618" }}
                      aria-hidden
                    >
                      ✓
                    </span>
                    {point}
                  </motion.li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <SyncPanel reduce={reduce} />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
