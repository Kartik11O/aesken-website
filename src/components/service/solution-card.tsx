"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import type { solutionCards } from "@/lib/service-data";

type SolutionCardData = (typeof solutionCards)[number];

export const solutionsGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const solutionCardVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.94, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 70, damping: 18, mass: 0.85 },
  },
};

function AnimatedMockup({ type, active }: { type: string; active: boolean }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="mx-auto w-full max-w-[320px] overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1a] shadow-2xl"
      animate={
        reduce
          ? undefined
          : active
            ? { scale: 1.04, y: -6, boxShadow: "0 28px 60px rgba(0,0,0,0.45)" }
            : { scale: 1, y: 0, boxShadow: "0 16px 40px rgba(0,0,0,0.35)" }
      }
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        {["bg-red-400/80", "bg-yellow-400/80", "bg-green-400/80"].map((color) => (
          <motion.span
            key={color}
            className={`size-2 rounded-full ${color}`}
            animate={active && !reduce ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.5, repeat: active ? Infinity : 0, repeatDelay: 1.2 }}
          />
        ))}
        <span className="ml-2 text-[10px] text-white/40">Schritt 1 · Marke</span>
      </div>

      <div className="space-y-3 p-4">
        {type === "seo" ? (
          <>
            <motion.div
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              animate={
                active && !reduce
                  ? { borderColor: "rgba(52,211,153,0.35)" }
                  : { borderColor: "rgba(255,255,255,0.1)" }
              }
              transition={{ duration: 0.35 }}
            >
              <p className="text-[10px] text-white/40">Suchbegriff</p>
              <motion.p
                className="text-xs text-white/80"
                animate={active && !reduce ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
                transition={{ duration: 2, repeat: active ? Infinity : 0 }}
              >
                Friseur Berlin Mitte
              </motion.p>
            </motion.div>
            <div className="space-y-1.5">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex items-center gap-2 rounded bg-white/5 px-2 py-1.5">
                  <span className="text-[10px] text-emerald-400">#{n}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded bg-white/10">
                    <motion.div
                      className="h-full rounded bg-gradient-to-r from-emerald-500/80 to-emerald-300/60"
                      initial={false}
                      animate={
                        active && !reduce
                          ? { width: n === 1 ? "92%" : n === 2 ? "74%" : "58%" }
                          : { width: n === 1 ? "55%" : n === 2 ? "42%" : "30%" }
                      }
                      transition={{ type: "spring", stiffness: 120, damping: 20, delay: n * 0.06 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : type === "cms" ? (
          <>
            <motion.div
              className="rounded-lg border border-white/10 bg-white/5 p-3"
              animate={
                active && !reduce ? { borderColor: "rgba(167,139,250,0.35)" } : { borderColor: "rgba(255,255,255,0.1)" }
              }
            >
              <p className="text-[10px] text-white/40">Seite bearbeiten</p>
              <div className="relative mt-2 h-16 overflow-hidden rounded bg-white/8">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={active && !reduce ? { x: ["-100%", "120%"] } : { x: "-100%" }}
                  transition={{
                    duration: 1.6,
                    repeat: active ? Infinity : 0,
                    ease: "linear",
                    repeatDelay: 0.8,
                  }}
                />
              </div>
            </motion.div>
            <div className="flex gap-2">
              <motion.span
                className="rounded bg-violet-500/30 px-2 py-1 text-[10px] text-violet-200"
                animate={active && !reduce ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                transition={{ duration: 0.45, repeat: active ? Infinity : 0, repeatDelay: 1 }}
              >
                Speichern
              </motion.span>
              <span className="rounded bg-white/10 px-2 py-1 text-[10px] text-white/60">Vorschau</span>
            </div>
          </>
        ) : (
          <>
            <motion.div
              className="rounded-lg border bg-white/5 px-3 py-2"
              animate={
                active && !reduce
                  ? { borderColor: "rgba(255,255,255,0.28)", backgroundColor: "rgba(255,255,255,0.08)" }
                  : { borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)" }
              }
            >
              <p className="text-[10px] text-white/40">Wie heißt Ihr Unternehmen?</p>
              <div className="relative mt-1 h-7 overflow-hidden rounded bg-white/8">
                <motion.div
                  className="absolute bottom-1 left-2 h-3 w-px bg-white/60"
                  animate={active && !reduce ? { opacity: [0, 1, 0] } : { opacity: 0 }}
                  transition={{ duration: 0.9, repeat: active ? Infinity : 0 }}
                />
              </div>
            </motion.div>
            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-[10px] text-white/40">Logo-Ausrichtung</p>
              <div className="mt-2 flex gap-2">
                <motion.span
                  className="rounded px-2 py-0.5 text-[10px] text-white/70"
                  animate={
                    active && !reduce
                      ? { backgroundColor: "rgba(255,255,255,0.18)", scale: 1.05 }
                      : { backgroundColor: "rgba(255,255,255,0.15)", scale: 1 }
                  }
                >
                  Vertikal
                </motion.span>
                <motion.span
                  className="rounded bg-white/8 px-2 py-0.5 text-[10px] text-white/40"
                  animate={active && !reduce ? { x: [0, 2, 0] } : { x: 0 }}
                  transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}
                >
                  Horizontal
                </motion.span>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export function SolutionCard({ card, index }: { card: SolutionCardData; index: number }) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const lift = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 220, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 220, damping: 20 });
  const smoothLift = useSpring(lift, { stiffness: 300, damping: 22 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    rotateY.set(px * 12);
    rotateX.set(-py * 12);
    lift.set(16);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      variants={solutionCardVariants}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-cursor="card"
      className="group/card relative [perspective:1000px]"
      style={{
        rotateX: reduce ? 0 : smoothRotateX,
        rotateY: reduce ? 0 : smoothRotateY,
        z: reduce ? 0 : smoothLift,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl"
        aria-hidden
        animate={
          hovered && !reduce ? { opacity: [0.25, 0.5, 0.25] } : { opacity: 0 }
        }
        transition={{ duration: 3, repeat: hovered ? Infinity : 0, ease: "easeInOut", delay: index * 0.15 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.14), transparent 45%, rgba(255,255,255,0.06))",
        }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-colors duration-500 group-hover/card:border-white/20 group-hover/card:bg-white/[0.05]">
        <div className="flex min-h-[280px] items-center justify-center bg-gradient-to-b from-white/[0.04] to-transparent p-6">
          <AnimatedMockup type={card.mockup} active={hovered} />
        </div>

        <motion.div
          className="border-t border-white/8 p-6"
          animate={hovered && !reduce ? { backgroundColor: "rgba(255,255,255,0.025)" } : { backgroundColor: "rgba(255,255,255,0)" }}
          transition={{ duration: 0.35 }}
        >
          <motion.h3
            className="font-[family-name:var(--font-instrument)] text-xl font-medium leading-snug text-white"
            animate={hovered && !reduce ? { x: 4 } : { x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            {card.title}
          </motion.h3>
          <motion.p
            className="mt-3 text-sm leading-relaxed text-white/55"
            animate={hovered && !reduce ? { color: "rgba(255,255,255,0.72)" } : { color: "rgba(255,255,255,0.55)" }}
            transition={{ duration: 0.35 }}
          >
            {card.desc}
          </motion.p>

          <Link
            href="#services"
            data-cursor="link"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            Leistungen ansehen
            <span className="flex size-6 items-center justify-center rounded-full bg-white/10 text-[11px] transition-transform duration-300 group-hover/card:translate-x-0.5">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}
