"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { faqItems } from "@/lib/service-data";

export function ServiceFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section className="bg-white py-20 md:py-24" data-cursor-bg="light">
      <div className="mx-auto max-w-[1256px] px-6 md:px-[92px]">
        <div className="overflow-hidden rounded-3xl border border-black/8 bg-[#fafafa] p-6 md:p-8">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            <ScrollReveal>
              <h2 className="font-[family-name:var(--font-instrument)] text-3xl font-medium leading-tight tracking-[-0.02em] md:text-4xl">
                Häufig gestellte Fragen
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-black/55">
                Wir führen Sie durch unsere Abläufe und Dienstleistungen
              </p>
            </ScrollReveal>

            <div className="space-y-3">
              {faqItems.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <ScrollReveal key={item.question} delay={i * 0.04}>
                    <div className="overflow-hidden rounded-2xl border border-black/8 bg-white">
                      <button
                        type="button"
                        data-cursor="button"
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="font-medium">{item.question}</span>
                        <span
                          className={`flex size-6 shrink-0 items-center justify-center rounded-full bg-black/5 text-sm transition-transform ${isOpen ? "rotate-45" : ""}`}
                        >
                          +
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <p className="border-t border-black/6 px-6 pb-5 pt-4 text-sm leading-relaxed text-black/55">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollReveal>
                );
              })}

              <p className="pt-4 text-center text-sm text-black/50 lg:text-left">
                Haben Sie noch Fragen?{" "}
                <Link href="mailto:hi@aesken.io" data-cursor="link" className="text-black underline-offset-2 hover:underline">
                  hi@aesken.io
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
