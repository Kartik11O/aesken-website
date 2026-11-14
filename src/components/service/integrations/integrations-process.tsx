"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebdesignSectionHeader } from "@/components/service/webdesign/webdesign-section-header";
import { INTEGRATIONS_ACCENT, integrationsProcess } from "@/lib/integrations-service-data";

function ProcessStep({
  item,
  index,
  total,
  reduce,
}: {
  item: (typeof integrationsProcess)[number];
  index: number;
  total: number;
  reduce: boolean | null;
}) {
  return (
    <div className="relative flex flex-1 flex-col items-center text-center">
      {index < total - 1 && (
        <div className="absolute left-1/2 top-6 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-black/[0.1] to-transparent sm:block" aria-hidden />
      )}

      <motion.div
        className="relative z-[1] flex size-12 items-center justify-center rounded-full border-2 border-white bg-white text-sm font-bold text-[#161618] shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
        whileHover={reduce ? undefined : { scale: 1.1, borderColor: `${INTEGRATIONS_ACCENT}90` }}
        animate={reduce ? undefined : { y: [0, -3, 0] }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
          scale: { type: "spring", stiffness: 400, damping: 20 },
        }}
        style={{ backgroundColor: "white" }}
      >
        {item.step}
      </motion.div>

      <h3 className="mt-4 text-sm font-semibold leading-snug text-[#161618]">{item.title}</h3>
      <p className="mt-1.5 max-w-[180px] text-[12px] leading-[1.6] text-black/50">{item.desc}</p>
    </div>
  );
}

export function IntegrationsProcess() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-white py-20 md:py-28" data-cursor-bg="light" id="prozess">
      <div className="mx-auto max-w-[1220px] px-6 md:px-10">
        <WebdesignSectionHeader
          eyebrow="Unser Ablauf"
          title="Ein klarer Prozess für reibungslose Anbindungen."
          desc="Von der Analyse bis zum laufenden Monitoring – jede Integration folgt dem gleichen bewährten Ablauf."
        />

        <ScrollReveal delay={0.06}>
          <div className="mt-16 flex flex-col gap-10 sm:flex-row sm:gap-4">
            {integrationsProcess.map((item, i) => (
              <ProcessStep key={item.step} item={item} index={i} total={integrationsProcess.length} reduce={reduce} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
