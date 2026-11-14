"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { ProcessStepVisual } from "@/components/service/webdesign/process-step-visual";
import { processTokens as t, TIMELINE } from "@/components/service/webdesign/process-tokens";
import { WebdesignSectionHeader } from "@/components/service/webdesign/webdesign-section-header";
import { PROCESS_TEAL, webdesignProcessSteps } from "@/lib/webdesign-service-data";
import { gsap, registerGsap } from "@/lib/gsap";

export type ServiceProcessStep = {
  step: string;
  phase: string;
  title: string;
  desc: string;
  accent: string;
  dotColor: string;
};

const GRID_COLS = "grid grid-cols-5 gap-x-3";

function ProcessCardBody({
  step,
  index,
  visualActive,
  isCurrent,
  hovered,
  isTop,
}: {
  step: ServiceProcessStep;
  index: number;
  visualActive: boolean;
  isCurrent: boolean;
  hovered: boolean;
  isTop: boolean;
}) {
  const reduce = useReducedMotion();
  const lifted = isCurrent || hovered;

  return (
    <motion.article
      className="group/card relative flex h-full w-full flex-col overflow-hidden rounded-[18px] border bg-white px-4 pb-4 pt-[18px] outline-none"
      style={{ boxShadow: t.shadowCard }}
      initial={false}
      animate={
        reduce
          ? undefined
          : {
              y: lifted ? (isTop ? -6 : 6) : 0,
              scale: lifted ? 1.025 : 1,
              boxShadow: lifted ? t.shadowHover : t.shadowCard,
              borderColor: lifted ? `${PROCESS_TEAL}55` : t.border,
            }
      }
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      aria-current={isCurrent ? "step" : undefined}
      aria-label={`Schritt ${step.step}: ${step.title}`}
    >
      <motion.span
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(120% 80% at 0% 0%, ${PROCESS_TEAL}10, transparent 62%)` }}
        initial={false}
        animate={{ opacity: lifted && !reduce ? 1 : 0 }}
        transition={{ duration: 0.28 }}
        aria-hidden
      />

      <motion.span
        className="pointer-events-none absolute -right-0.5 top-1 select-none font-[family-name:var(--font-instrument)] text-[42px] font-medium leading-none tracking-tight"
        initial={false}
        animate={{
          color: lifted && !reduce ? "#d7e3e0" : "#e8eef2",
          scale: lifted && !reduce ? 1.04 : 1,
        }}
        transition={{ duration: 0.3 }}
        aria-hidden
      >
        {step.step}
      </motion.span>

      <motion.div
        className="relative"
        initial={false}
        animate={{ x: lifted && !reduce ? 2 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: PROCESS_TEAL }}>
          Step {step.step}
        </span>
      </motion.div>

      <motion.h3
        className="relative mt-2.5 font-[family-name:var(--font-instrument)] text-[14px] font-semibold leading-snug tracking-[-0.01em] text-[#0f172a]"
        initial={false}
        animate={{ x: lifted && !reduce ? 2 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.02 }}
      >
        {step.title}
      </motion.h3>
      <p className="relative mt-1.5 min-h-[54px] text-[11.5px] leading-[1.55] text-[#64748b]">{step.desc}</p>

      <div className="relative mt-auto">
        <ProcessStepVisual index={index} active={visualActive} hovered={hovered} />
      </div>
    </motion.article>
  );
}

function ProcessCard({
  step,
  index,
  isCurrent,
}: {
  step: ServiceProcessStep;
  index: number;
  isCurrent: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const isTop = index % 2 === 0;

  useEffect(() => {
    if (isCurrent || hovered) setHasPlayed(true);
  }, [isCurrent, hovered]);

  const visualActive = hovered || isCurrent || hasPlayed;

  return (
    <div
      className="process-card h-full w-full max-w-[228px] opacity-0"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <ProcessCardBody
        step={step}
        index={index}
        visualActive={visualActive}
        isCurrent={isCurrent}
        hovered={hovered}
        isTop={isTop}
      />
    </div>
  );
}

function MobileTimeline({ steps }: { steps: readonly ServiceProcessStep[] }) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (reduce || !containerRef.current) return;

      const items = containerRef.current.querySelectorAll(".mobile-step");
      gsap.fromTo(
        items,
        { opacity: 0, x: -16, filter: "blur(4px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.55,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            once: true,
          },
        },
      );
    },
    { scope: containerRef, dependencies: [reduce] },
  );

  return (
    <div ref={containerRef} className="relative mt-14 lg:hidden">
      <div className="absolute bottom-4 left-[15px] top-4 w-px bg-gradient-to-b from-[#cbd5e1] via-[#00A38D] to-[#00A38D]" aria-hidden />

      <ol className="relative space-y-6">
        {steps.map((step, i) => (
          <MobileStep key={step.step} step={step} index={i} />
        ))}
      </ol>
    </div>
  );
}

function MobileStep({
  step,
  index,
}: {
  step: ServiceProcessStep;
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const [played, setPlayed] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPlayed(true);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const active = played || hovered;

  return (
    <li ref={ref} className="mobile-step relative flex gap-4 opacity-0">
      <div className="relative z-[1] flex shrink-0 flex-col items-center">
        <motion.span
          className="flex size-[30px] items-center justify-center rounded-full border-2 border-white text-[10px] font-bold shadow-sm"
          initial={false}
          animate={{
            backgroundColor: active ? step.dotColor : "#e2e8f0",
            color: active && index >= 2 ? "#fff" : "#64748b",
            scale: hovered && !reduce ? 1.12 : 1,
          }}
          transition={{ type: "spring", stiffness: 340, damping: 20 }}
        >
          {step.step}
        </motion.span>
      </div>

      <motion.article
        className="flex-1 rounded-[18px] border bg-white p-5"
        initial={false}
        animate={
          reduce
            ? undefined
            : {
                y: hovered ? -3 : 0,
                boxShadow: hovered ? t.shadowHover : "0 4px 16px rgba(15,23,42,0.05)",
                borderColor: hovered ? `${step.accent}55` : t.border,
              }
        }
        transition={{ type: "spring", stiffness: 360, damping: 26 }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: step.accent }}>
          {step.phase}
        </div>
        <h3 className="mt-2 font-[family-name:var(--font-instrument)] text-base font-semibold text-[#0f172a]">
          {step.title}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#64748b]">{step.desc}</p>
        <ProcessStepVisual index={index} active={played} hovered={hovered} />
      </motion.article>
    </li>
  );
}

type WebdesignProcessProps = {
  steps?: readonly ServiceProcessStep[];
  eyebrow?: string;
  title?: string;
  desc?: string;
  footer?: ReactNode;
  id?: string;
  showLegend?: boolean;
};

export function WebdesignProcess({
  steps = webdesignProcessSteps,
  eyebrow = "Unser Prozess",
  title = "Strukturiert. Transparent. Erfolgreich.",
  desc = "Fünf klare Phasen — von der Strategie bis zum Launch. Keine Überraschungen, volle Transparenz in jedem Schritt.",
  footer = (
    <>
      Typische Projektdauer{" "}
      <span className="font-semibold text-[#64748b]">4–8 Wochen</span> · Wöchentliche Updates · Feste Meilensteine
    </>
  ),
  id = "prozess",
  showLegend = true,
}: WebdesignProcessProps = {}) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const travelDotRef = useRef<HTMLSpanElement>(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const lastStepIndex = Math.max(0, steps.length - 1);

  const revealStep = useCallback((index: number) => {
    setCurrentStep(index);
  }, []);

  useGSAP(
    () => {
      registerGsap();
      if (reduce || !timelineRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(".process-card", timelineRef.current);
      const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node", timelineRef.current);

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 72%",
          once: true,
        },
      });

      if (lineRef.current) {
        master.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.6, ease: "power2.inOut" },
          0,
        );
      }

      cards.forEach((card, i) => {
        const at = 0.22 + i * 0.14;
        master.fromTo(
          card,
          {
            opacity: 0,
            y: i % 2 === 0 ? -28 : 28,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "power3.out",
            onStart: () => revealStep(i),
          },
          at,
        );
      });

      nodes.forEach((node, i) => {
        master.fromTo(node, { scale: 0 }, { scale: 1, duration: 0.35, ease: "back.out(2)" }, 0.4 + i * 0.1);
      });

      if (travelDotRef.current) {
        master.fromTo(travelDotRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2 }, 0.1);
        master.to(
          travelDotRef.current,
          {
            left: `${TIMELINE.leftPct + TIMELINE.stepPct * lastStepIndex}%`,
            duration: 2,
            ease: "none",
            onUpdate: function () {
              setCurrentStep(Math.min(lastStepIndex, Math.floor(this.progress() * steps.length)));
            },
          },
          0.15,
        );
        master.call(() => setCurrentStep(-1), undefined, 2.3);
      }
    },
    { scope: sectionRef, dependencies: [reduce, revealStep, lastStepIndex, steps.length] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: t.canvas }}
      data-cursor-bg="light"
      id={id}
    >
      {/* Soft ambient wash */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute left-1/2 top-[12%] h-[380px] w-[720px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{ background: `radial-gradient(ellipse, ${t.tealMuted}, transparent 72%)` }}
        />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-6 md:px-10">
        <WebdesignSectionHeader eyebrow={eyebrow} title={title} desc={desc} />

        {showLegend ? (
          <div className="mx-auto mt-8 hidden max-w-[720px] flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:flex">
            {steps.map((step, i) => (
              <div key={step.step} className="flex items-center gap-2">
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: i >= 2 ? t.teal : t.dotInactive }}
                  aria-hidden
                />
                <span className="text-[11px] font-medium text-[#64748b]">{step.phase}</span>
                {i < steps.length - 1 && (
                  <span className="ml-2 text-[#cbd5e1]" aria-hidden>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : null}

        {/* Desktop zigzag timeline — explicit 3-row grid: top-cards / track / bottom-cards. */}
        <div
          ref={timelineRef}
          className={`relative mx-auto hidden max-w-[1180px] lg:block ${showLegend ? "mt-14" : "mt-16"}`}
          role="list"
          aria-label="Projektphasen"
        >
          <div
            className={GRID_COLS}
            style={{ gridTemplateRows: `auto ${TIMELINE.trackHeight}px auto` }}
          >
            {/* Row 1 — top cards (steps 1, 3, 5) */}
            {steps.map((step, i) => {
              const isTop = i % 2 === 0;
              return (
                <div
                  key={`top-${step.step}`}
                  role="listitem"
                  className="flex items-stretch justify-center"
                  style={{ gridRow: 1, gridColumn: i + 1 }}
                >
                  {isTop && <ProcessCard step={step} index={i} isCurrent={currentStep === i} />}
                </div>
              );
            })}

            {/* Row 2 — horizontal track, nodes and dashed connectors, full width */}
            <div className="relative" style={{ gridRow: 2, gridColumn: "1 / -1" }}>
              <div className="absolute left-[10%] right-[10%] top-1/2 z-[1] h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-[#e2e8f0]">
                <div
                  ref={lineRef}
                  className="h-full origin-left rounded-full"
                  style={{
                    background: `linear-gradient(90deg, #d1d5db 0%, #94a3b8 30%, ${PROCESS_TEAL} 60%, ${PROCESS_TEAL} 100%)`,
                    transform: "scaleX(0)",
                  }}
                />
              </div>

              <span
                ref={travelDotRef}
                className="pointer-events-none absolute top-1/2 z-[3] size-2 -translate-y-1/2 rounded-full bg-white"
                style={{ left: `${TIMELINE.leftPct}%`, boxShadow: `0 0 0 3px ${t.tealGlow}`, opacity: 0 }}
                aria-hidden
              />

              <div className={`${GRID_COLS} h-full`}>
                {steps.map((step, i) => {
                  const isTop = i % 2 === 0;
                  const active = currentStep === i || currentStep > i;
                  const connectorColor = active
                    ? PROCESS_TEAL
                    : i >= 2
                      ? `${PROCESS_TEAL}66`
                      : "#cbd5e1";
                  return (
                    <div key={`node-${step.step}`} className="relative flex justify-center">
                      <div
                        className={`h-1/2 w-px border-l border-dashed transition-colors duration-500 ${isTop ? "self-start" : "self-end"}`}
                        style={{ borderColor: connectorColor }}
                        aria-hidden
                      />
                      <span
                        className="timeline-node pointer-events-none absolute left-1/2 top-1/2 z-[2] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
                        style={{
                          backgroundColor: step.dotColor,
                          boxShadow: i >= 2 ? `0 0 0 3px ${t.tealMuted}` : "0 0 0 2px rgba(148,163,184,0.18)",
                          transform: "scale(0)",
                        }}
                        aria-hidden
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Row 3 — bottom cards (steps 2, 4) */}
            {steps.map((step, i) => {
              const isTop = i % 2 === 0;
              return (
                <div
                  key={`bottom-${step.step}`}
                  role="listitem"
                  className="flex items-stretch justify-center"
                  style={{ gridRow: 3, gridColumn: i + 1 }}
                >
                  {!isTop && <ProcessCard step={step} index={i} isCurrent={currentStep === i} />}
                </div>
              );
            })}
          </div>
        </div>

        <MobileTimeline steps={steps} />

        {/* Trust footer */}
        <p className="mx-auto mt-14 max-w-md text-center text-[12px] leading-relaxed text-[#94a3b8]">
          {footer}
        </p>
      </div>
    </section>
  );
}
