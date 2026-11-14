"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebdesignSectionHeader } from "@/components/service/webdesign/webdesign-section-header";
import {
  PROCESS_TEAL,
  WEBDESIGN_ACCENT,
  webdesignTransformation as data,
} from "@/lib/webdesign-service-data";

const WARN = "#E07A5F";
const GOOD = PROCESS_TEAL;

function BeforeMockup() {
  return (
    <div className="flex h-[132px] flex-col p-4">
      <div className="mb-2.5 flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-black/15" />
        <span className="size-1.5 rounded-full bg-black/15" />
        <span className="size-1.5 rounded-full bg-black/15" />
      </div>
      <div className="mb-2 h-5 w-[65%] rounded-md bg-black/[0.09]" />
      <div className="mb-3 h-2.5 w-[45%] rounded bg-black/[0.06]" />
      <div className="grid flex-1 grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md border border-dashed border-black/10 bg-white/50" />
        ))}
      </div>
    </div>
  );
}

function AfterMockup({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="flex h-[132px] flex-col bg-gradient-to-br from-white to-[#effaf7] p-4">
      <div className="mb-2.5 flex items-center gap-1.5">
        <motion.span
          className="size-1.5 rounded-full"
          style={{ backgroundColor: PROCESS_TEAL }}
          animate={reduce ? undefined : { opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="size-1.5 rounded-full bg-black/15" />
        <span className="size-1.5 rounded-full bg-black/15" />
      </div>
      <div className="mb-2 h-5 w-[65%] rounded-md bg-black/[0.09]" />
      <motion.div
        className="mb-3 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[9px] font-bold text-white"
        style={{ backgroundColor: PROCESS_TEAL }}
        animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Jetzt anfragen →
      </motion.div>
      <div className="grid flex-1 grid-cols-3 gap-1.5">
        {[PROCESS_TEAL, WEBDESIGN_ACCENT, "#9DB8F5"].map((c, i) => (
          <motion.div
            key={c}
            className="rounded-md border border-black/[0.05] bg-white"
            animate={reduce ? undefined : { y: [0, -2, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
          >
            <div className="m-1.5 h-[calc(100%-12px)] rounded-sm" style={{ backgroundColor: `${c}30` }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TransformCard({
  side,
  reduce,
}: {
  side: "before" | "after";
  reduce: boolean | null;
}) {
  const isAfter = side === "after";
  const info = isAfter ? data.after : data.before;
  const color = isAfter ? GOOD : WARN;

  return (
    <motion.div
      className="relative flex-1 overflow-hidden rounded-[20px] border bg-white"
      style={{ borderColor: isAfter ? `${color}35` : "rgba(0,0,0,0.07)" }}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={
        reduce
          ? undefined
          : { y: -4, boxShadow: `0 16px 36px ${color}18, 0 4px 16px rgba(0,0,0,0.05)` }
      }
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
    >
      <div className="flex items-center gap-2 border-b border-black/[0.05] px-4 py-3">
        <span className="flex size-4 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ backgroundColor: color }}>
          {isAfter ? "✓" : "✕"}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: isAfter ? color : "#7a7a7c" }}>
          {info.label}
        </span>
      </div>

      {isAfter ? <AfterMockup reduce={reduce} /> : <BeforeMockup />}

      <p className="border-t border-black/[0.05] px-4 py-3 text-[12px] leading-snug text-black/60">
        {info.caption}
      </p>
    </motion.div>
  );
}

function TransformArrow({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="flex flex-row items-center justify-center gap-3 py-2 lg:flex-col lg:gap-2 lg:py-0">
      <motion.div
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-base text-white shadow-[0_8px_20px_rgba(0,163,141,0.25)] lg:rotate-90"
        style={{ backgroundColor: PROCESS_TEAL }}
        animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        →
      </motion.div>
      <div className="text-center">
        <p className="text-lg font-bold tabular-nums leading-none" style={{ color: PROCESS_TEAL }}>
          {data.after.highlight}
        </p>
        <p className="mt-0.5 text-[9px] font-semibold uppercase leading-none tracking-wider text-black/40">
          {data.after.highlightLabel}
        </p>
      </div>
    </div>
  );
}

function MetricRow({
  label,
  before,
  after,
  index,
  reduce,
}: {
  label: string;
  before: string;
  after: string;
  index: number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      className="flex items-center justify-between gap-4 border-b border-black/[0.05] py-3.5 last:border-b-0"
      initial={reduce ? false : { opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
    >
      <span className="text-[13px] font-medium text-black/60">{label}</span>
      <div className="flex items-center gap-2.5 text-sm">
        <span className="text-black/35 line-through">{before}</span>
        <span className="text-black/25">→</span>
        <span className="font-bold tabular-nums" style={{ color: GOOD }}>
          {after}
        </span>
      </div>
    </motion.div>
  );
}

export function WebdesignTransformation() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-[#fafafa] py-20 md:py-28" data-cursor-bg="light">
      <div className="relative mx-auto max-w-[1000px] px-6 md:px-10">
        <WebdesignSectionHeader eyebrow={data.eyebrow} title={data.title} desc={data.desc} />

        <ScrollReveal delay={0.06}>
          <div className="mt-14 flex flex-col items-stretch gap-0 lg:flex-row lg:items-center lg:gap-6">
            <TransformCard side="before" reduce={reduce} />
            <TransformArrow reduce={reduce} />
            <TransformCard side="after" reduce={reduce} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.14}>
          <div className="mx-auto mt-10 max-w-[560px] rounded-[20px] border border-black/[0.06] bg-white px-5 py-2 shadow-sm">
            {data.after.metrics.map((m, i) => (
              <MetricRow key={m.label} label={m.label} before={data.before.metrics[i].value} after={m.value} index={i} reduce={reduce} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
