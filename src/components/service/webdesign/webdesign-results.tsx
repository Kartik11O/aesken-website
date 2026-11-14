"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ServicePillButton } from "@/components/service/service-pill-button";
import { WebdesignStatValue } from "@/components/service/webdesign/webdesign-stat-value";
import { WEBDESIGN_ACCENT, webdesignResults } from "@/lib/webdesign-service-data";

const tiltSpring = { stiffness: 220, damping: 22, mass: 0.6 };

function ProjectMockup() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springX = useSpring(pointerX, tiltSpring);
  const springY = useSpring(pointerY, tiltSpring);

  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-7, 7]);
  const glowX = useTransform(springX, [0, 1], ["15%", "85%"]);
  const glowY = useTransform(springY, [0, 1], ["10%", "90%"]);
  const spotlightBg = useMotionTemplate`radial-gradient(220px circle at ${glowX} ${glowY}, ${WEBDESIGN_ACCENT}28, transparent 72%)`;

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[540px]"
      style={{ perspective: 1400 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="pointer-events-none absolute -inset-6 rounded-[32px] opacity-50 blur-3xl"
        style={{ background: `radial-gradient(circle, ${WEBDESIGN_ACCENT}35, transparent 70%)` }}
        animate={reduce ? undefined : { scale: [1, 1.05, 1], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <motion.div
        className="absolute -right-1 top-10 z-20 hidden rounded-2xl border border-black/[0.07] bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.1)] backdrop-blur-md sm:block"
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        whileHover={reduce ? undefined : { scale: 1.06, y: -9, boxShadow: "0 22px 48px rgba(0,0,0,0.16)" }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-black/40">Ergebnis</p>
        <p className="text-xs font-medium text-[#161618]">+72% mehr Anfragen</p>
      </motion.div>

      <motion.div
        className="relative overflow-hidden rounded-[20px] border-[10px] border-[#161618] bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.28)]"
        style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY, transformStyle: "preserve-3d" }}
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#151515] via-[#241f1c] to-[#120f0d] p-6 md:p-7">
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0"
              style={{ background: spotlightBg }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              aria-hidden
            />
          )}

          <motion.div
            className="relative mb-5 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/55"
            whileHover={reduce ? undefined : { scale: 1.05, borderColor: "rgba(255,255,255,0.28)", backgroundColor: "rgba(255,255,255,0.1)" }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
          >
            <motion.span
              className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-400"
              animate={reduce ? undefined : { opacity: [1, 0.45, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            Projekt · Live
          </motion.div>

          <div className="relative h-6 max-w-[260px] rounded-lg bg-white/92" />
          <div className="relative mt-2.5 h-3.5 max-w-[190px] rounded bg-white/25" />

          <div className="relative mt-8 grid grid-cols-2 gap-3">
            <motion.div
              className="aspect-[4/3] cursor-pointer rounded-xl border border-white/10 bg-white/8"
              whileHover={
                reduce
                  ? undefined
                  : {
                      scale: 1.05,
                      y: -3,
                      borderColor: "rgba(255,255,255,0.22)",
                      backgroundColor: "rgba(255,255,255,0.12)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
                    }
              }
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
            />
            <motion.div
              className="aspect-[4/3] cursor-pointer rounded-xl border border-white/10"
              style={{ backgroundColor: `${WEBDESIGN_ACCENT}55` }}
              whileHover={
                reduce
                  ? undefined
                  : {
                      scale: 1.05,
                      y: -3,
                      borderColor: `${WEBDESIGN_ACCENT}90`,
                      boxShadow: `0 12px 28px ${WEBDESIGN_ACCENT}35`,
                    }
              }
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-8 -left-5 w-[128px] cursor-pointer overflow-hidden rounded-[24px] border-[5px] border-[#161618] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.2)] sm:-left-10"
        style={{ transformStyle: "preserve-3d" }}
        animate={reduce ? undefined : { y: [0, 6, 0] }}
        whileHover={reduce ? undefined : { scale: 1.08, y: 2, rotate: 2, boxShadow: "0 28px 48px rgba(0,0,0,0.26)" }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="aspect-[9/16] bg-gradient-to-b from-[#fff5f8] to-white p-3">
          <div className="mb-2 h-2 w-10 rounded bg-black/10" />
          <motion.div
            className="mb-2 h-14 rounded-lg"
            style={{ backgroundColor: `${WEBDESIGN_ACCENT}40` }}
            whileHover={reduce ? undefined : { scale: 1.03 }}
            transition={{ duration: 0.25 }}
          />
          <div className="h-10 rounded-lg bg-black/[0.05]" />
        </div>
      </motion.div>
    </div>
  );
}

export function WebdesignResults() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-[#fafafa] py-20 md:py-28" data-cursor-bg="light">
      <div className="mx-auto max-w-[1220px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <ProjectMockup />
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <motion.span
              className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2e2e33]"
              whileHover={reduce ? undefined : { color: "#161618", letterSpacing: "0.22em" }}
              transition={{ duration: 0.25 }}
            >
              {webdesignResults.eyebrow}
            </motion.span>

            <h2 className="mt-4 font-[family-name:var(--font-instrument)] text-[clamp(1.875rem,3.2vw,2.375rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-[#161618]">
              {webdesignResults.title}
            </h2>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {webdesignResults.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl border border-black/[0.06] bg-white px-3 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          y: -5,
                          scale: 1.04,
                          borderColor: `${WEBDESIGN_ACCENT}55`,
                          boxShadow: `0 12px 28px ${WEBDESIGN_ACCENT}18, 0 4px 16px rgba(0,0,0,0.06)`,
                        }
                  }
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4, type: "spring", stiffness: 340, damping: 24 }}
                >
                  <motion.div whileHover={reduce ? undefined : { scale: 1.06 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
                    <WebdesignStatValue
                      value={stat.value}
                      className="text-[clamp(1.375rem,2.5vw,1.875rem)] font-bold text-[#2e2e33]"
                    />
                  </motion.div>
                  <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7a7a7c]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {webdesignResults.features.map((feature, i) => (
                <motion.li
                  key={feature}
                  className="flex cursor-default items-center gap-2.5 rounded-xl border border-black/[0.05] bg-white px-3 py-2.5 text-sm font-semibold text-[#161618]"
                  initial={reduce ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          x: 3,
                          y: -2,
                          scale: 1.02,
                          borderColor: `${WEBDESIGN_ACCENT}50`,
                          backgroundColor: `${WEBDESIGN_ACCENT}0c`,
                          boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                        }
                  }
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.35, type: "spring", stiffness: 360, damping: 24 }}
                >
                  <motion.span
                    className="flex size-[18px] shrink-0 items-center justify-center rounded-full text-[10px] text-white"
                    style={{ backgroundColor: WEBDESIGN_ACCENT }}
                    whileHover={reduce ? undefined : { scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 480, damping: 16 }}
                    aria-hidden
                  >
                    ✓
                  </motion.span>
                  {feature}
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-9"
              whileHover={reduce ? undefined : { x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
            >
              <ServicePillButton href="/service#contact">Projekt starten</ServicePillButton>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
