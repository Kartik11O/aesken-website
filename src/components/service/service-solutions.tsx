"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SolutionCard, solutionsGridVariants } from "@/components/service/solution-card";
import { solutionCards } from "@/lib/service-data";
import { easeOut } from "@/lib/motion";

const headerVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export function ServiceSolutions() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-[#111111] py-20 md:py-24" data-cursor-bg="dark" id="projekte">
      <div className="mx-auto max-w-[1312px] px-6 md:px-16">
        <motion.div
          className="text-center"
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headerVariants}
        >
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/60">
            Unsere Lösungen
          </span>
          <h2 className="mx-auto mt-4 max-w-[900px] font-[family-name:var(--font-instrument)] text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-tight tracking-[-0.02em] text-white">
            Verabschieden Sie sich von Website-Problemen
          </h2>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 lg:grid-cols-3"
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={solutionsGridVariants}
        >
          {solutionCards.map((card, i) => (
            <SolutionCard key={card.title} card={card} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
