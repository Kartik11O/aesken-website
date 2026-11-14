"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { testimonials } from "@/lib/service-data";

function getInitials(name: string) {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function formatIndex(value: number) {
  return String(value).padStart(2, "0");
}

export function ServiceTestimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduce = useReducedMotion();
  const current = testimonials[index];

  const goTo = useCallback((nextIndex: number, dir: number) => {
    setDirection(dir);
    setIndex(nextIndex);
  }, []);

  const prev = () =>
    goTo(index === 0 ? testimonials.length - 1 : index - 1, -1);
  const next = () =>
    goTo(index === testimonials.length - 1 ? 0 : index + 1, 1);

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      y: reduce ? 0 : dir > 0 ? 24 : -24,
    }),
    center: { opacity: 1, y: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      y: reduce ? 0 : dir > 0 ? -24 : 24,
    }),
  };

  return (
    <section className="bg-[#f7f7f5] pt-20 md:pt-24" data-cursor-bg="light">
      <div className="mx-auto max-w-[1256px] px-6 md:px-[92px]">
        <ScrollReveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-block rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-black/50">
              Erfahrungsberichte
            </span>
            <h2 className="mt-4 max-w-xl font-[family-name:var(--font-instrument)] text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              Stimmen, die für uns sprechen
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-black/55">
            Partner aus unterschiedlichen Branchen – ein gemeinsamer Nenner: klare
            Kommunikation und messbare Ergebnisse.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="overflow-hidden rounded-[32px] border border-black/[0.06] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.06)]">
            <div className="grid lg:grid-cols-[minmax(280px,340px)_1fr]">
              {/* Author rail */}
              <aside className="border-b border-black/[0.06] bg-[#111111] p-6 md:p-8 lg:border-b-0 lg:border-r">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                  Partner
                </p>

                <ul className="mt-6 space-y-2">
                  {testimonials.map((item, i) => {
                    const active = i === index;
                    return (
                      <li key={item.name}>
                        <button
                          type="button"
                          data-cursor="button"
                          onClick={() => goTo(i, i > index ? 1 : -1)}
                          className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${
                            active
                              ? "bg-white/10"
                              : "hover:bg-white/[0.06]"
                          }`}
                        >
                          <span
                            className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                              active
                                ? "bg-white text-black"
                                : "bg-white/10 text-white/80 group-hover:bg-white/15"
                            }`}
                          >
                            {getInitials(item.name)}
                          </span>
                          <span className="min-w-0">
                            <span
                              className={`block truncate text-sm font-medium ${
                                active ? "text-white" : "text-white/75"
                              }`}
                            >
                              {item.name}
                            </span>
                            <span className="block truncate text-xs text-white/45">
                              {item.role}
                            </span>
                          </span>
                          <span
                            className={`ml-auto text-[10px] tabular-nums tracking-widest ${
                              active ? "text-white/60" : "text-white/25"
                            }`}
                          >
                            {formatIndex(i + 1)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8 hidden items-center justify-between border-t border-white/10 pt-6 lg:flex">
                  <button
                    type="button"
                    onClick={prev}
                    data-cursor="button"
                    aria-label="Vorheriges Testimonial"
                    className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    ←
                  </button>
                  <span className="text-xs tabular-nums tracking-[0.2em] text-white/40">
                    {formatIndex(index + 1)} / {formatIndex(testimonials.length)}
                  </span>
                  <button
                    type="button"
                    onClick={next}
                    data-cursor="button"
                    aria-label="Nächstes Testimonial"
                    className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    →
                  </button>
                </div>
              </aside>

              {/* Quote panel */}
              <div className="relative flex min-h-[360px] flex-col justify-between p-8 md:min-h-[420px] md:p-12 lg:p-14">
                <div
                  className="pointer-events-none absolute right-8 top-8 select-none font-[family-name:var(--font-instrument)] text-[7rem] leading-none text-black/[0.04] md:text-[9rem]"
                  aria-hidden
                >
                  “
                </div>

                <div className="relative flex items-start justify-between gap-6">
                  <span className="font-[family-name:var(--font-instrument)] text-5xl font-medium tabular-nums leading-none tracking-[-0.04em] text-black/10 md:text-6xl">
                    {formatIndex(index + 1)}
                  </span>
                  <div className="flex gap-2 lg:hidden">
                    <button
                      type="button"
                      onClick={prev}
                      data-cursor="button"
                      aria-label="Vorheriges Testimonial"
                      className="flex size-9 items-center justify-center rounded-full border border-black/10 text-sm text-black/60"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      data-cursor="button"
                      aria-label="Nächstes Testimonial"
                      className="flex size-9 items-center justify-center rounded-full border border-black/10 text-sm text-black/60"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div className="relative my-8 flex-1">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.blockquote
                      key={index}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="max-w-2xl font-[family-name:var(--font-instrument)] text-[clamp(1.35rem,2.8vw,2rem)] font-medium leading-[1.25] tracking-[-0.02em] text-black/90"
                    >
                      {current.quote}
                    </motion.blockquote>
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`meta-${index}`}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex items-center gap-4 border-t border-black/[0.06] pt-6"
                  >
                    <div className="flex size-11 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
                      {getInitials(current.name)}
                    </div>
                    <div>
                      <p className="font-medium">{current.name}</p>
                      <p className="text-sm text-black/50">{current.role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
