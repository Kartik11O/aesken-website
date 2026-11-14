"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { processTokens as t } from "@/components/service/webdesign/process-tokens";
import { easeOut } from "@/lib/motion";

const pop = { type: "spring" as const, stiffness: 420, damping: 18 };
const pulse = {
  type: "tween" as const,
  duration: 0.6,
  ease: "easeInOut" as const,
  repeat: Infinity,
  repeatType: "mirror" as const,
};

type VisualProps = {
  active: boolean;
  hovered: boolean;
};

const frameVariants: Variants = {
  idle: { scale: 1, y: 0 },
  live: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -3 },
};

function MockupFrame({
  active,
  hovered,
  accent = t.teal,
  children,
  className = "",
  dark = false,
}: VisualProps & {
  accent?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const reduce = useReducedMotion();
  const live = active || hovered;
  const bg = dark ? "#0f172a" : "#f4f6f8";
  const edge = dark
    ? "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.08)"
    : "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 0 0 1px rgba(15,23,42,0.06)";
  const hoverEdge = dark
    ? "inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 18px rgba(0,0,0,0.22)"
    : `inset 0 1px 0 rgba(255,255,255,0.98), inset 0 0 0 1px ${accent}35, 0 8px 18px ${accent}14`;

  return (
    <motion.div
      className={`relative mt-3.5 flex h-[84px] flex-col justify-center overflow-hidden p-3 ${className}`}
      style={{ borderRadius: t.radiusMockup, backgroundColor: bg, boxShadow: edge }}
      variants={frameVariants}
      initial="idle"
      animate={reduce ? "idle" : hovered ? "hover" : live ? "live" : "idle"}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      aria-hidden
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={false}
        animate={{
          opacity: hovered && !reduce ? 1 : 0,
          boxShadow: hovered && !reduce ? hoverEdge : edge,
        }}
        transition={{ duration: 0.25 }}
        style={{ borderRadius: t.radiusMockup }}
      />

      {!dark && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%)",
          }}
          animate={
            hovered && !reduce
              ? { x: ["-130%", "140%"], opacity: [0, 0.8, 0] }
              : { x: "-130%", opacity: 0 }
          }
          transition={{ duration: 0.9, ease: "easeInOut", repeat: hovered ? Infinity : 0, repeatDelay: 1.2 }}
        />
      )}

      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}

/** Step 01 — Zielscheibe + Checkliste */
function GoalsVisual({ active, hovered }: VisualProps) {
  const reduce = useReducedMotion();
  const live = active || hovered;

  return (
    <MockupFrame active={active} hovered={hovered}>
      <div className="flex items-center gap-2.5">
        <motion.div
          className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08)]"
          animate={
            live && !reduce
              ? { scale: hovered ? [1, 1.06] : 1 }
              : { scale: 0.88 }
          }
          transition={hovered && !reduce ? { ...pulse, repeatDelay: 0.45 } : { ...pop }}
        >
          <span className="absolute size-[30px] rounded-full border border-[#d1d5db]" />
          <span className="absolute size-[18px] rounded-full border border-[#94a3b8]/70" />
          <motion.span
            className="size-2 rounded-full"
            style={{ backgroundColor: t.teal }}
            animate={
              live && !reduce
                ? { scale: hovered ? [1, 1.4] : 1 }
                : { scale: 0.5 }
            }
            transition={hovered && !reduce ? { ...pulse, repeatDelay: 0.35 } : { ...pop, delay: 0.08 }}
          />
        </motion.div>

        <div className="flex flex-1 flex-col gap-[5px]">
          {[62, 48, 54].map((w, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-1.5"
              animate={live && !reduce ? { opacity: 1, x: 0 } : { opacity: 0.2, x: -5 }}
              transition={{ delay: live ? 0.06 + i * 0.07 : 0, duration: 0.3, ease: easeOut }}
            >
              <motion.span
                className="flex size-3 items-center justify-center rounded-full text-[7px] font-bold text-white"
                style={{ backgroundColor: t.teal }}
                animate={
                  hovered && !reduce
                    ? { scale: [1, 1.18] }
                    : { scale: live ? 1 : 0.55 }
                }
                transition={
                  hovered && !reduce
                    ? { ...pulse, delay: i * 0.09, repeatDelay: 0.5 }
                    : { ...pop, delay: live ? 0.08 + i * 0.07 : 0 }
                }
              >
                ✓
              </motion.span>
              <span className="h-[5px] rounded-full bg-[#d5dbe3]" style={{ width: `${w}%` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/** Step 02 — Sitemap */
function StructureVisual({ active, hovered }: VisualProps) {
  const reduce = useReducedMotion();
  const live = active || hovered;

  return (
    <MockupFrame active={active} hovered={hovered}>
      <div className="flex flex-col items-center">
        <motion.span
          className="flex size-[18px] items-center justify-center rounded-[4px] text-[6px] font-bold text-white"
          style={{ backgroundColor: t.teal }}
          animate={
            live && !reduce
              ? { scale: hovered ? [1, 1.12] : 1, y: hovered ? [0, -1.5] : 0 }
              : { scale: 0.85, opacity: 0.7 }
          }
          transition={hovered && !reduce ? { ...pulse, repeatDelay: 0.4 } : { ...pop }}
        >
          ●
        </motion.span>

        <svg className="h-3 w-[58px]" viewBox="0 0 58 12" aria-hidden>
          <motion.path
            d="M29 0 V5 M29 5 H8 V12 M29 5 H50 V12"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.4"
            strokeLinecap="round"
            animate={live && !reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0.35, opacity: 0.45 }}
            transition={{ duration: 0.45, ease: easeOut }}
          />
        </svg>

        <div className="mt-0.5 flex w-full justify-center gap-1.5 px-0.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-[15px] flex-1 max-w-[30px] rounded-[4px] border border-[#e2e8f0] bg-[#e8edf2]"
              animate={
                live && !reduce
                  ? {
                      opacity: 1,
                      y: hovered ? [0, -2] : 0,
                      borderColor: hovered && i === 1 ? `${t.teal}55` : "#e2e8f0",
                      backgroundColor: hovered && i === 1 ? `${t.teal}18` : "#e8edf2",
                    }
                  : { opacity: 0.55, y: 0 }
              }
              transition={
                hovered && !reduce
                  ? { y: { ...pulse, delay: i * 0.07, repeatDelay: 0.35 } }
                  : { ...pop, delay: 0.1 + i * 0.05 }
              }
            />
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/** Step 03 — Code-Fenster */
function BuildVisual({ active, hovered }: VisualProps) {
  const reduce = useReducedMotion();
  const live = active || hovered;
  const lines = [
    { w: "76%", c: "#38bdf8" },
    { w: "50%", c: t.teal },
    { w: "64%", c: "#a78bfa", o: 0.85 },
  ];

  return (
    <MockupFrame active={active} hovered={hovered} dark>
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex gap-1">
          {["#ef4444", "#eab308", "#22c55e"].map((c) => (
            <span key={c} className="size-1.5 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
        <motion.span
          className="rounded bg-white/10 px-1.5 py-px font-mono text-[9px] font-semibold text-white/85"
          animate={
            live && !reduce
              ? { opacity: 1, scale: hovered ? [1, 1.08] : 1 }
              : { opacity: 0.25, scale: 0.9 }
          }
          transition={hovered && !reduce ? { ...pulse, repeatDelay: 0.45 } : { duration: 0.28 }}
        >
          {"</>"}
        </motion.span>
      </div>
      <div className="space-y-[5px]">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="h-[3px] origin-left rounded-full"
            style={{ width: line.w, backgroundColor: line.c, opacity: line.o ?? 1 }}
            animate={
              live && !reduce
                ? { scaleX: hovered ? [1, 0.88] : 1, opacity: line.o ?? 1 }
                : { scaleX: 0.08, opacity: 0.15 }
            }
            transition={{
              scaleX: hovered
                ? { ...pulse, repeatDelay: 0.35, delay: i * 0.07 }
                : { duration: 0.32, delay: 0.08 + i * 0.08, ease: easeOut },
            }}
          />
        ))}
      </div>
    </MockupFrame>
  );
}

/** Step 04 — QA + 100% */
function QualityVisual({ active, hovered }: VisualProps) {
  const reduce = useReducedMotion();
  const live = active || hovered;
  const items = ["Funktionen", "Responsive", "Performance"];
  const r = 13;
  const circ = 2 * Math.PI * r;

  return (
    <MockupFrame active={active} hovered={hovered}>
      <div className="flex items-center gap-2.5">
        <div className="flex flex-1 flex-col gap-[5px]">
          {items.map((label, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-1.5"
              animate={live && !reduce ? { opacity: 1, x: 0 } : { opacity: 0.2, x: -4 }}
              transition={{ delay: live ? 0.05 + i * 0.06 : 0, duration: 0.28 }}
            >
              <motion.span
                className="flex size-[11px] items-center justify-center rounded-full text-[6px] font-bold text-white"
                style={{ backgroundColor: t.teal }}
                animate={
                  hovered && !reduce
                    ? { scale: [1, 1.22] }
                    : { scale: live ? 1 : 0.5 }
                }
                transition={
                  hovered && !reduce
                    ? { ...pulse, delay: i * 0.09, repeatDelay: 0.45 }
                    : { ...pop, delay: live ? 0.06 + i * 0.06 : 0 }
                }
              >
                ✓
              </motion.span>
              <span className="text-[8px] font-medium leading-none text-[#64748b]">{label}</span>
            </motion.div>
          ))}
        </div>

        <div className="relative size-9 shrink-0">
          <svg className="size-full -rotate-90" viewBox="0 0 36 36" aria-hidden>
            <circle cx="18" cy="18" r={r} fill="none" stroke="#e2e8f0" strokeWidth="2.8" />
            <motion.circle
              cx="18"
              cy="18"
              r={r}
              fill="none"
              stroke={t.teal}
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={false}
              animate={
                live && !reduce
                  ? { strokeDashoffset: hovered ? 0 : circ * 0.06 }
                  : { strokeDashoffset: circ }
              }
              transition={{ duration: 0.8, ease: easeOut }}
            />
          </svg>
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-[8px] font-bold tabular-nums text-[#0f172a]"
            animate={
              live && !reduce
                ? { opacity: 1, scale: hovered ? [1, 1.08] : 1 }
                : { opacity: 0.25, scale: 0.85 }
            }
            transition={hovered && !reduce ? { ...pulse, repeatDelay: 0.5 } : { duration: 0.28 }}
          >
            100%
          </motion.span>
        </div>
      </div>
    </MockupFrame>
  );
}

/** Step 05 — Globe + LIVE + Trend */
function LaunchVisual({ active, hovered }: VisualProps) {
  const reduce = useReducedMotion();
  const live = active || hovered;

  return (
    <MockupFrame active={active} hovered={hovered} accent="#22c55e">
      <div className="flex items-center gap-2">
        <motion.span
          className="flex size-7 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08)]"
          animate={
            live && !reduce
              ? { rotate: hovered ? [0, 10, -6, 0] : 0, scale: 1 }
              : { rotate: 0, scale: 0.75 }
          }
          transition={
            hovered && !reduce
              ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
              : { ...pop }
          }
        >
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <circle cx="12" cy="12" r="8" stroke="#64748b" strokeWidth="1.4" fill="none" />
            <path
              d="M4 12h16M12 4a12 12 0 010 16M12 4a12 12 0 000 16"
              stroke="#94a3b8"
              strokeWidth="1.15"
              fill="none"
            />
          </svg>
        </motion.span>
        <motion.span
          className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white"
          style={{ backgroundColor: t.teal }}
          animate={
            live && !reduce
              ? { opacity: 1, scale: hovered ? [1, 1.06] : 1 }
              : { opacity: 0.25, scale: 0.85 }
          }
          transition={hovered && !reduce ? { ...pulse, repeatDelay: 0.4 } : { ...pop, delay: 0.08 }}
        >
          Live
        </motion.span>
      </div>

      <svg className="mt-1.5 h-5 w-full overflow-visible" viewBox="0 0 100 20" aria-hidden>
        <motion.path
          d="M2 17 L20 14 L38 15 L55 9 L72 10 L86 4 L98 8"
          fill="none"
          stroke={t.teal}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={live && !reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.2 }}
          transition={{ duration: 0.85, ease: easeOut }}
        />
        {/* Animate r (not CSS scale) — scale on SVG circles jumps to the viewport center */}
        <motion.circle
          cx="98"
          cy="8"
          fill={t.teal}
          initial={false}
          animate={
            live && !reduce
              ? { r: hovered ? [2.2, 3] : 2.2, opacity: 1 }
              : { r: 0, opacity: 0 }
          }
          transition={
            hovered && !reduce
              ? { ...pulse, repeatDelay: 0.35 }
              : { delay: 0.65, duration: 0.35, ease: easeOut }
          }
        />
      </svg>
    </MockupFrame>
  );
}

const VISUALS = [GoalsVisual, StructureVisual, BuildVisual, QualityVisual, LaunchVisual] as const;

export function ProcessStepVisual({
  index,
  active,
  hovered = false,
}: {
  index: number;
  active: boolean;
  hovered?: boolean;
}) {
  const Visual = VISUALS[index] ?? GoalsVisual;
  return <Visual active={active} hovered={hovered} />;
}
