"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebdesignSectionHeader } from "@/components/service/webdesign/webdesign-section-header";
import { integrationsWhyUs } from "@/lib/integrations-service-data";

const getFloatTransition = (delay: number, distance = 4) => ({
  y: [0, -distance, 0],
  transition: {
    duration: 3.2 + delay * 0.4,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
  },
});

function WhyUsCard({
  item,
  index,
  focused,
  anyFocused,
  onFocus,
  reduce,
}: {
  item: (typeof integrationsWhyUs)[number];
  index: number;
  focused: boolean;
  anyFocused: boolean;
  onFocus: (index: number | null) => void;
  reduce: boolean | null;
}) {
  const accent = item.accent;

  return (
    <motion.article
      className="group relative cursor-default overflow-hidden rounded-[20px] border bg-[#fafafa] p-5"
      style={{
        borderColor: focused ? `${accent}55` : "rgba(0,0,0,0.06)",
        boxShadow: focused ? `0 16px 40px ${accent}18, 0 4px 16px rgba(0,0,0,0.04)` : "0 1px 2px rgba(0,0,0,0.03)",
      }}
      animate={
        reduce
          ? undefined
          : focused
            ? { y: -8, scale: 1.03 }
            : anyFocused
              ? { y: 0, scale: 0.98, opacity: 0.82 }
              : { y: [0, -4, 0] }
      }
      transition={
        focused || anyFocused
          ? { type: "spring", stiffness: 360, damping: 24 }
          : getFloatTransition(index * 0.5, 4).transition
      }
      onPointerEnter={() => onFocus(index)}
      onPointerLeave={() => onFocus(null)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{ background: `radial-gradient(120% 80% at 0% 0%, ${accent}14, transparent 65%)` }}
        animate={{ opacity: focused && !reduce ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        aria-hidden
      />

      <motion.span
        className="absolute left-0 top-5 w-1 rounded-r-full"
        style={{ backgroundColor: accent }}
        animate={{ height: focused ? 52 : 40, opacity: focused ? 1 : 0.85 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        aria-hidden
      />

      <div className="relative pl-3">
        <motion.p
          className="text-[11px] font-bold uppercase tracking-wider text-black/30"
          animate={focused && !reduce ? { color: accent, x: 2 } : { color: "rgba(0,0,0,0.3)", x: 0 }}
          transition={{ duration: 0.25 }}
        >
          0{index + 1}
        </motion.p>

        <h3 className="mt-2 text-base font-semibold text-[#161618]">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-black/55">{item.desc}</p>
      </div>

      {!reduce && (
        <motion.span
          className="pointer-events-none absolute -right-3 -top-3 size-16 rounded-full opacity-40 blur-2xl"
          style={{ backgroundColor: accent }}
          animate={
            focused
              ? { scale: [1, 1.25, 1], opacity: [0.35, 0.55, 0.35] }
              : { scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }
          }
          transition={{ duration: focused ? 1.8 : 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          aria-hidden
        />
      )}
    </motion.article>
  );
}

export function IntegrationsWhyUs() {
  const reduce = useReducedMotion();
  const [focusedCard, setFocusedCard] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 md:py-28" data-cursor-bg="light">
      <div className="mx-auto max-w-[1220px] px-6 md:px-10">
        <WebdesignSectionHeader
          eyebrow="Warum Aesken"
          title="Integration, auf die Sie sich verlassen können."
          desc="Wir kümmern uns um die technische Anbindung, damit Sie sich auf Ihr Geschäft konzentrieren können."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2" onPointerLeave={() => setFocusedCard(null)}>
          {integrationsWhyUs.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.06}>
              <WhyUsCard
                item={item}
                index={i}
                focused={focusedCard === i}
                anyFocused={focusedCard !== null}
                onFocus={setFocusedCard}
                reduce={reduce}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
