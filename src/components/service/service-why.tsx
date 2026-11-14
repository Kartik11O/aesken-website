"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { whyUsFeatures } from "@/lib/service-data";
import { easeOut } from "@/lib/motion";

type Feature = (typeof whyUsFeatures)[number];

const CYCLE_MS = 4800;

function formatIndex(value: number) {
  return String(value).padStart(2, "0");
}

function FeatureVisual({ feature, active }: { feature: Feature; active: boolean }) {
  const { icon, accent } = feature;

  if (icon === "speed") {
    return (
      <div className="relative h-3 w-full max-w-[280px] overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: accent }}
          animate={active ? { width: ["0%", "78%", "78%"] } : { width: "78%" }}
          transition={{ duration: 2.4, ease: easeOut, repeat: active ? Infinity : 0, repeatDelay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-white shadow"
          animate={active ? { left: ["0%", "74%", "74%"] } : { left: "74%" }}
          transition={{ duration: 2.4, ease: easeOut, repeat: active ? Infinity : 0, repeatDelay: 1 }}
        />
      </div>
    );
  }

  if (icon === "seo" || icon === "results") {
    const heights = icon === "results" ? [0.35, 0.55, 0.75, 1] : [0.4, 0.65, 1];
    return (
      <div className="flex h-20 items-end gap-2 sm:h-28">
        {heights.map((h, i) => (
          <motion.div
            key={i}
            className="h-20 w-4 rounded-t-md sm:h-28 sm:w-5"
            style={{ backgroundColor: accent, originY: 1 }}
            animate={active ? { scaleY: [0.15, h, h] } : { scaleY: h }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: easeOut,
              repeat: active ? Infinity : 0,
              repeatDelay: 2,
            }}
          />
        ))}
      </div>
    );
  }

  if (icon === "legal") {
    return (
      <svg viewBox="0 0 80 88" className="h-20 w-20 sm:h-28 sm:w-24" aria-hidden>
        <motion.path
          d="M40 6L12 18v22c0 14 10.4 22.8 28 28 17.6-5.2 28-14 28-28V18L40 6z"
          fill={`${accent}22`}
          stroke={accent}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={active ? { pathLength: [0, 1, 1] } : { pathLength: 1 }}
          transition={{ duration: 1.2, ease: easeOut, repeat: active ? Infinity : 0, repeatDelay: 2.2 }}
        />
        <motion.path
          d="M28 44l8 8 16-16"
          fill="none"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={active ? { pathLength: [0, 1, 1] } : { pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: easeOut, repeat: active ? Infinity : 0, repeatDelay: 2.7 }}
        />
      </svg>
    );
  }

  if (icon === "all" || icon === "support") {
    return (
      <svg viewBox="0 0 120 60" className="h-16 w-full max-w-[220px] sm:h-24" aria-hidden>
        <circle cx="20" cy="30" r="10" fill={`${accent}30`} stroke={accent} strokeWidth="2" />
        <circle cx="100" cy="30" r="10" fill={`${accent}30`} stroke={accent} strokeWidth="2" />
        <motion.line
          x1="30"
          y1="30"
          x2="90"
          y2="30"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={active ? { pathLength: [0, 1, 1] } : { pathLength: 1 }}
          transition={{ duration: 0.9, ease: easeOut, repeat: active ? Infinity : 0, repeatDelay: 2 }}
        />
        <motion.circle
          cx="60"
          cy="30"
          r="6"
          fill={accent}
          initial={{ scale: 0 }}
          animate={active ? { scale: [0, 1.2, 1, 1] } : { scale: 1 }}
          transition={{ duration: 0.45, delay: 0.7, ease: easeOut, repeat: active ? Infinity : 0, repeatDelay: 2.45 }}
        />
        {icon === "support" && (
          <motion.circle
            cx="60"
            cy="30"
            r="14"
            fill="none"
            stroke={accent}
            strokeWidth="1"
            initial={{ scale: 0.6, opacity: 0.8 }}
            animate={active ? { scale: [0.6, 1.4, 1.4], opacity: [0.8, 0, 0] } : { scale: 1.4, opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeOut", repeat: active ? Infinity : 0, repeatDelay: 0.8 }}
          />
        )}
      </svg>
    );
  }

  if (icon === "price") {
    return (
      <div className="flex flex-col gap-2 sm:gap-3">
        {["Festpreis", "Keine Extras", "Transparent"].map((label, i) => (
          <motion.div
            key={label}
            className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 sm:px-4 sm:py-2 sm:text-sm"
            initial={{ opacity: 0, x: -12 }}
            animate={active ? { opacity: [0, 1, 1], x: [-12, 0, 0] } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: i * 0.15, ease: easeOut, repeat: active ? Infinity : 0, repeatDelay: 2.5 }}
          >
            <span className="size-1.5 rounded-full" style={{ backgroundColor: accent }} />
            {label}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <svg viewBox="0 0 120 48" className="h-16 w-full max-w-[200px] sm:h-20" aria-hidden>
      <motion.path
        d="M10 38 L30 10 L50 26 L70 8 L90 22 L110 38"
        fill="none"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: [0, 1, 1] } : { pathLength: 1 }}
        transition={{ duration: 1.4, ease: easeOut, repeat: active ? Infinity : 0, repeatDelay: 2 }}
      />
    </svg>
  );
}

function WhyDetailPanel({
  feature,
  index,
  active,
}: {
  feature: Feature;
  index: number;
  active: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={feature.title}
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: easeOut }}
        className="flex flex-col gap-8"
      >
        <div>
          <span
            className="inline-block rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ backgroundColor: `${feature.accent}25`, color: feature.accent }}
          >
            {feature.stat}
          </span>

          <h3 className="mt-5 font-[family-name:var(--font-instrument)] text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.03em] text-white">
            {feature.title}
          </h3>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/65 sm:text-base">
            {feature.desc}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <FeatureVisual feature={feature} active={active && !reduce} />
          <span className="hidden font-[family-name:var(--font-instrument)] text-6xl font-medium leading-none tracking-[-0.04em] text-white/[0.07] lg:block">
            {formatIndex(index + 1)}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function ServiceWhy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const reduce = useReducedMotion();

  const feature = whyUsFeatures[activeIndex];

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    setCycleKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (reduce || paused) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((i) => (i + 1) % whyUsFeatures.length);
      setCycleKey((k) => k + 1);
    }, CYCLE_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, paused, reduce]);

  return (
    <section className="bg-[#f7f7f5] py-20 md:py-28" data-cursor-bg="light" id="about">
      <div className="mx-auto max-w-[1256px] px-6 md:px-[92px]">
        <motion.div
          className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: easeOut }}
        >
          <div>
            <span className="inline-block rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-black/50">
              Warum uns wählen
            </span>
            <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-instrument)] text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              Was Sie mit Aesken bekommen
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-black/55 md:text-right">
            Wählen Sie einen Vorteil – die Vorschau läuft automatisch weiter.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 overflow-hidden rounded-[28px] border border-black/[0.08] bg-[#111111] shadow-[0_32px_80px_rgba(0,0,0,0.14)] md:mt-12 md:rounded-[32px]"
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            setCycleKey((k) => k + 1);
          }}
        >
          <div className="flex flex-col lg:grid lg:grid-cols-[minmax(280px,340px)_1fr]">
            <nav
              className="shrink-0 border-b border-white/10 p-4 md:p-5 lg:border-b-0 lg:border-r"
              aria-label="Vorteile"
            >
              <div className="mb-3 flex items-center justify-between px-1 lg:px-2">
                <span className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                  Vorteile
                </span>
                <span className="text-xs tabular-nums text-white/35">
                  {formatIndex(activeIndex + 1)} / {formatIndex(whyUsFeatures.length)}
                </span>
              </div>

              <ul className="max-h-[220px] space-y-1 overflow-y-auto overscroll-contain lg:max-h-none">
                {whyUsFeatures.map((item, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li key={item.title}>
                      <button
                        type="button"
                        data-cursor="button"
                        onClick={() => goTo(i)}
                        className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors sm:rounded-2xl sm:py-3 ${
                          isActive ? "bg-white/10" : "hover:bg-white/[0.05]"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="why-active-bar"
                            className="absolute bottom-2 left-3 top-2 w-0.5 rounded-full"
                            style={{ backgroundColor: item.accent }}
                            transition={{ type: "spring", stiffness: 420, damping: 32 }}
                          />
                        )}
                        <span
                          className={`pl-2 font-[family-name:var(--font-instrument)] text-xs tabular-nums tracking-widest ${
                            isActive ? "text-white/50" : "text-white/25"
                          }`}
                        >
                          {formatIndex(i + 1)}
                        </span>
                        <span
                          className={`text-sm font-medium leading-snug ${
                            isActive ? "text-white" : "text-white/55"
                          }`}
                        >
                          {item.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 px-1 lg:px-2">
                <div className="h-0.5 overflow-hidden rounded-full bg-white/10">
                  {!reduce && !paused && (
                    <motion.div
                      key={`${activeIndex}-${cycleKey}`}
                      className="h-full origin-left rounded-full"
                      style={{ backgroundColor: feature.accent }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                    />
                  )}
                  {(reduce || paused) && (
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: feature.accent,
                        width: paused ? "100%" : "0%",
                      }}
                    />
                  )}
                </div>
              </div>
            </nav>

            <div
              className="relative p-6 sm:p-8 lg:min-h-[420px] lg:p-12"
              style={{
                background: `radial-gradient(circle at 80% 20%, ${feature.accent}18 0%, transparent 50%), radial-gradient(circle at 10% 90%, ${feature.accent}10 0%, transparent 45%)`,
              }}
            >
              <WhyDetailPanel feature={feature} index={activeIndex} active={!reduce} />
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/[0.06] bg-black/[0.06] md:mt-10 md:grid-cols-4">
          {whyUsFeatures.slice(0, 4).map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center bg-white px-3 py-4 text-center sm:px-4 sm:py-5 md:py-6"
            >
              <span
                className="font-[family-name:var(--font-instrument)] text-lg font-medium tracking-[-0.02em] sm:text-xl md:text-2xl"
                style={{ color: item.accent }}
              >
                {item.stat}
              </span>
              <span className="mt-1 text-[11px] text-black/45 sm:text-xs">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
