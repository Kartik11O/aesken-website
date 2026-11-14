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
import { domainEmailWhyUs } from "@/lib/domain-email-service-data";

const tiltSpring = { stiffness: 220, damping: 22, mass: 0.6 };

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

function WhyUsHub() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springX = useSpring(pointerX, tiltSpring);
  const springY = useSpring(pointerY, tiltSpring);

  const rotateX = useTransform(springY, [0, 1], [7, -7]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);
  const glowX = useTransform(springX, [0, 1], ["18%", "82%"]);
  const glowY = useTransform(springY, [0, 1], ["12%", "88%"]);
  const spotlightBg = useMotionTemplate`radial-gradient(260px circle at ${glowX} ${glowY}, #F5C98A22, transparent 70%)`;

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

  const radius = 112;
  const reasons = domainEmailWhyUs.reasons;

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[520px]"
      style={{ perspective: 1400 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="pointer-events-none absolute -inset-10 rounded-[40px] opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, #F5C98A40, transparent 68%)" }}
        animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <motion.div
        className="relative overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.14)] sm:p-12"
        style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY, transformStyle: "preserve-3d" }}
      >
        {!reduce && (
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0"
            style={{ background: spotlightBg }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            aria-hidden
          />
        )}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative flex aspect-square items-center justify-center">
          <svg className="absolute inset-0 h-full w-full" viewBox="-160 -160 320 320" aria-hidden>
            {reasons.map((sat) => {
              const p = polar(sat.angle, radius);
              return (
                <motion.line
                  key={sat.key}
                  x1={0}
                  y1={0}
                  x2={p.x}
                  y2={p.y}
                  stroke={sat.color}
                  strokeWidth={1.4}
                  strokeDasharray="4 5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.55 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              );
            })}
            {reasons.map((sat, i) => {
              const p = polar(sat.angle, radius);
              return (
                <motion.circle
                  key={`${sat.key}-pulse`}
                  r={3}
                  fill={sat.color}
                  initial={{ cx: 0, cy: 0, opacity: 0 }}
                  animate={
                    reduce
                      ? { cx: p.x, cy: p.y, opacity: 0.9 }
                      : { cx: [0, p.x], cy: [0, p.y], opacity: [0, 1, 0] }
                  }
                  transition={{
                    duration: 1.8,
                    repeat: reduce ? 0 : Infinity,
                    ease: "easeInOut",
                    delay: i * 0.45,
                    repeatDelay: 0.6,
                  }}
                />
              );
            })}
          </svg>

          <motion.div
            className="relative z-[1] flex size-24 flex-col items-center justify-center rounded-2xl border border-black/[0.06] bg-[#161618] text-white shadow-[0_16px_32px_rgba(0,0,0,0.18)] sm:size-28"
            animate={reduce ? undefined : { scale: [1, 1.03, 1] }}
            whileHover={reduce ? undefined : { scale: 1.06 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[9px] font-semibold uppercase tracking-wider text-white/45">Ihr Partner</span>
            <span className="text-[13px] font-bold">Aesken</span>
          </motion.div>

          {reasons.map((sat, i) => {
            const p = polar(sat.angle, radius);
            return (
              <motion.div
                key={sat.key}
                className="absolute z-[1] flex w-[92px] flex-col items-center gap-1.5 text-center"
                style={{ left: `calc(50% + ${p.x}px)`, top: `calc(50% + ${p.y}px)`, x: "-50%", y: "-50%" }}
                animate={reduce ? undefined : { y: ["-50%", "calc(-50% - 4px)", "-50%"] }}
                whileHover={reduce ? undefined : { scale: 1.08 }}
                transition={{ duration: 2.6 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              >
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-white text-[9px] font-bold shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                  style={{ borderColor: `${sat.color}55`, color: "#161618" }}
                >
                  {i + 1}
                </span>
                <span className="text-[9px] font-semibold uppercase leading-[1.3] tracking-wider text-black/40">
                  {sat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export function DomainEmailWhyUs() {
  return (
    <section className="overflow-hidden border-y border-black/[0.06] bg-white py-20 md:py-28" data-cursor-bg="light">
      <div className="mx-auto max-w-[1220px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <ScrollReveal>
            <span className="inline-block rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
              {domainEmailWhyUs.eyebrow}
            </span>
            <h2 className="mt-4 max-w-[420px] font-[family-name:var(--font-instrument)] text-[clamp(1.875rem,3.5vw,2.625rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-[#161618]">
              {domainEmailWhyUs.title}
            </h2>
            <p className="mt-4 max-w-[420px] text-base leading-relaxed text-black/55">
              {domainEmailWhyUs.desc}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <WhyUsHub />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
