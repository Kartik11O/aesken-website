"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ServicePromoCard } from "@/components/service/service-promo-card";
import { promoCards } from "@/lib/service-data";

function PromoConnector() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      className="pointer-events-none relative flex size-14 items-center justify-center md:size-16"
      aria-hidden
    >
      <motion.span
        className="absolute inset-0 rounded-full border border-black/15 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
        animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute inset-[-6px] rounded-full border border-black/8"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <span className="relative size-2 rounded-full bg-black/70" />
    </motion.div>
  );
}

export function ServicePromo() {
  return (
    <section className="bg-white py-20 md:py-24" data-cursor-bg="light">
      <div className="mx-auto max-w-[1256px] px-6 md:px-[92px]">
        <ScrollReveal className="text-center">
          <span className="inline-block rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-black/50">
            Andere Dienstleistungen
          </span>
          <h2 className="mx-auto mt-4 max-w-[800px] font-[family-name:var(--font-instrument)] text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-tight tracking-[-0.02em]">
            Wir machen mehr als nur Website-Entwicklung
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="relative mt-14">
          <div className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <PromoConnector />
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:gap-0 md:[perspective:1200px]">
            {promoCards.map((card, i) => (
              <ServicePromoCard
                key={card.title}
                card={card}
                className={
                  i === 0
                    ? "rounded-3xl md:rounded-r-none md:rounded-l-[28px]"
                    : "rounded-3xl md:rounded-l-none md:rounded-r-[28px]"
                }
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
