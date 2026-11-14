"use client";

import Link from "next/link";
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
import { WEBDESIGN_ACCENT, webdesignHero } from "@/lib/webdesign-service-data";

const TRUST_TOOLS = ["Wix Studio", "Figma", "Responsive", "CMS"] as const;

const tiltSpring = { stiffness: 220, damping: 22, mass: 0.6 };

function BrowserMockup() {
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
  const spotlightBg = useMotionTemplate`radial-gradient(240px circle at ${glowX} ${glowY}, ${WEBDESIGN_ACCENT}20, transparent 70%)`;

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
      className="relative mx-auto w-full max-w-[560px]"
      style={{ perspective: 1400 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="pointer-events-none absolute -inset-10 rounded-[40px] opacity-70 blur-3xl"
        style={{ background: `radial-gradient(circle, ${WEBDESIGN_ACCENT}45, transparent 68%)` }}
        animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <motion.div
        className="absolute -right-2 top-8 z-20 hidden rounded-2xl border border-black/[0.07] bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.1)] backdrop-blur-md sm:block"
        style={{ transformStyle: "preserve-3d" }}
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        whileHover={reduce ? undefined : { scale: 1.06, y: -10, boxShadow: "0 22px 48px rgba(0,0,0,0.16)" }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-black/40">UI/UX</p>
        <p className="text-xs font-medium text-[#161618]">Conversion-first Layout</p>
      </motion.div>

      <motion.div
        className="absolute -left-3 bottom-16 z-20 hidden rounded-2xl border border-black/[0.07] bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.1)] backdrop-blur-md sm:block"
        style={{ transformStyle: "preserve-3d" }}
        animate={reduce ? undefined : { y: [0, 10, 0] }}
        whileHover={reduce ? undefined : { scale: 1.06, y: 4, boxShadow: "0 22px 48px rgba(0,0,0,0.16)" }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-black/40">Wix Studio</p>
        <p className="text-xs font-medium text-[#161618]">Pixel-perfect Build</p>
      </motion.div>

      <motion.div
        className="relative overflow-hidden rounded-[20px] border-[10px] border-[#161618] bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.28)]"
        style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY, transformStyle: "preserve-3d" }}
      >
        <div className="flex items-center gap-2 border-b border-black/8 bg-[#fafafa] px-4 py-3">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-yellow-400/80" />
          <span className="size-2.5 rounded-full bg-green-400/80" />
          <span className="ml-2 text-[10px] text-black/40">aesken-studio.wixsite.com</span>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#fff7fa] via-white to-[#f3f6ff] p-6 md:p-7">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Cursor-follow spotlight */}
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0"
              style={{ background: spotlightBg }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              aria-hidden
            />
          )}

          <div className="relative mb-5 flex items-center justify-between">
            <div className="h-3 w-20 rounded-full bg-black/10" />
            <div className="hidden gap-2 sm:flex">
              {["Home", "Leistungen", "Kontakt"].map((item) => (
                <span key={item} className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[9px] text-black/45">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mb-2 h-9 max-w-[300px] rounded-xl bg-[#161618]/[0.08]" />
          <div className="relative mb-6 h-4 max-w-[240px] rounded-lg bg-black/[0.05]" />

          <div className="relative grid grid-cols-3 gap-3">
            {[WEBDESIGN_ACCENT, "#9DB8F5", "#A8E6CF"].map((color, i) => (
              <motion.div
                key={color}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-black/[0.06] shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
                style={{ backgroundColor: `${color}40` }}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        scale: 1.08,
                        y: -4,
                        boxShadow: "0 16px 32px rgba(0,0,0,0.12)",
                      }
                }
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5, type: "spring", stiffness: 340, damping: 22 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: `${color}00` }}
                  whileHover={{ backgroundColor: `${color}22` }}
                  transition={{ duration: 0.25 }}
                  aria-hidden
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="absolute bottom-5 right-5 h-[104px] w-[68px] cursor-pointer overflow-hidden rounded-[18px] border-[5px] border-[#161618] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
            style={{ transformStyle: "preserve-3d" }}
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            whileHover={reduce ? undefined : { scale: 1.08, y: -10, rotate: -2, boxShadow: "0 28px 48px rgba(0,0,0,0.24)" }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <div className="h-full bg-gradient-to-b from-[#fff5f8] to-white p-2">
              <div className="mb-1.5 h-1.5 w-full rounded bg-black/10" />
              <div className="mb-2 h-6 rounded-md" style={{ backgroundColor: `${WEBDESIGN_ACCENT}45` }} />
              <div className="h-8 rounded-md bg-black/[0.05]" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function WebdesignDetailHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-8 md:pb-20 md:pt-12" data-cursor-bg="light">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 15% 0%, ${WEBDESIGN_ACCENT}22, transparent 60%),
            radial-gradient(ellipse 50% 40% at 90% 10%, #9DB8F522, transparent 55%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-[1220px] px-6 md:px-10">
        <ScrollReveal>
          <motion.div whileHover={reduce ? undefined : { x: -2 }} transition={{ type: "spring", stiffness: 400, damping: 24 }}>
            <Link
              href="/service#services"
              data-cursor="link"
              className="group inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 px-3.5 py-2 text-sm text-black/55 shadow-sm backdrop-blur-sm transition-colors hover:border-black/15 hover:bg-white hover:text-black"
            >
              <motion.span
                aria-hidden
                className="inline-block text-black/35 group-hover:text-black/60"
                whileHover={{ x: -2 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                ←
              </motion.span>
              Alle Leistungen
            </Link>
          </motion.div>
        </ScrollReveal>

        <div className="mt-10 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <ScrollReveal>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{
                borderColor: `${WEBDESIGN_ACCENT}50`,
                backgroundColor: `${WEBDESIGN_ACCENT}16`,
                color: "#161618",
              }}
              whileHover={
                reduce
                  ? undefined
                  : {
                      backgroundColor: `${WEBDESIGN_ACCENT}28`,
                      borderColor: `${WEBDESIGN_ACCENT}80`,
                      scale: 1.03,
                    }
              }
              transition={{ duration: 0.25 }}
            >
              <motion.span
                className="size-2 rounded-full"
                style={{ backgroundColor: WEBDESIGN_ACCENT }}
                animate={reduce ? undefined : { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              {webdesignHero.eyebrow}
            </motion.span>

            <h1 className="mt-6 font-[family-name:var(--font-instrument)] text-[clamp(2.125rem,4.8vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#161618]">
              {webdesignHero.title}
            </h1>

            <p className="mt-5 max-w-[540px] text-[17px] leading-[1.72] text-black/55">
              {webdesignHero.desc}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {webdesignHero.highlights.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-1.5 rounded-full border border-black/[0.07] bg-[#fafafa] px-3.5 py-1.5 text-xs font-medium text-black/70"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          y: -2,
                          scale: 1.04,
                          borderColor: `${WEBDESIGN_ACCENT}70`,
                          backgroundColor: `${WEBDESIGN_ACCENT}14`,
                          color: "#161618",
                        }
                  }
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.35, type: "spring", stiffness: 360, damping: 24 }}
                >
                  <motion.span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: WEBDESIGN_ACCENT }}
                    aria-hidden
                  />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ServicePillButton href="/service#contact" size="lg">
                Projekt anfragen
              </ServicePillButton>
              <Link
                href="#prozess"
                data-cursor="link"
                className="group inline-flex items-center gap-2 text-sm font-medium text-black/65 transition-colors hover:text-black"
              >
                <span className="relative">
                  Unser Prozess ansehen
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-black/60 transition-all duration-300 group-hover:w-full" />
                </span>
                <motion.span
                  className="flex size-6 items-center justify-center rounded-full bg-black/[0.05] text-[11px]"
                  whileHover={{ x: 3, backgroundColor: "rgba(0,0,0,0.09)" }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                >
                  →
                </motion.span>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-black/[0.06] pt-6">
              {TRUST_TOOLS.map((tool) => (
                <motion.span
                  key={tool}
                  className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-black/35"
                  whileHover={reduce ? undefined : { color: "#161618", y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  {tool}
                  <motion.span
                    className="absolute -bottom-1.5 left-0 h-px w-full origin-left bg-black/25"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                </motion.span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <BrowserMockup />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
