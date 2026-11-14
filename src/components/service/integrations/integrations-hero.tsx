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
import {
  INTEGRATIONS_ACCENT,
  INTEGRATIONS_TEAL,
  integrationsHero,
} from "@/lib/integrations-service-data";

const TRUST_TOOLS = ["Wix Bookings", "Stripe", "HubSpot", "Mailchimp"] as const;
const tiltSpring = { stiffness: 220, damping: 22, mass: 0.6 };

const SATELLITES = [
  { key: "booking", label: "Buchung", angle: -145, color: "#F4A4B8" },
  { key: "payment", label: "Zahlung", angle: -35, color: INTEGRATIONS_ACCENT },
  { key: "crm", label: "CRM", angle: 90, color: "#A8E6CF" },
  { key: "mail", label: "E-Mail", angle: 200, color: "#F5C98A" },
] as const;

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

function IntegrationHub() {
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
  const spotlightBg = useMotionTemplate`radial-gradient(260px circle at ${glowX} ${glowY}, ${INTEGRATIONS_ACCENT}22, transparent 70%)`;

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

  const radius = 132;

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
        style={{ background: `radial-gradient(circle, ${INTEGRATIONS_ACCENT}45, transparent 68%)` }}
        animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <motion.div
        className="absolute -right-2 top-6 z-20 hidden rounded-2xl border border-black/[0.07] bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.1)] backdrop-blur-md sm:block"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        whileHover={reduce ? undefined : { scale: 1.06, y: -10, boxShadow: "0 22px 48px rgba(0,0,0,0.16)" }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-black/40">Stripe</p>
        <p className="text-xs font-medium text-[#161618]">Verbunden ✓</p>
      </motion.div>

      <motion.div
        className="absolute -left-3 bottom-10 z-20 hidden rounded-2xl border border-black/[0.07] bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.1)] backdrop-blur-md sm:block"
        animate={reduce ? undefined : { y: [0, 10, 0] }}
        whileHover={reduce ? undefined : { scale: 1.06, y: 4, boxShadow: "0 22px 48px rgba(0,0,0,0.16)" }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-black/40">Buchungen</p>
        <p className="text-xs font-medium text-[#161618]">Echtzeit-Sync</p>
      </motion.div>

      <motion.div
        className="relative overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.14)] sm:p-10"
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
            {SATELLITES.map((sat) => {
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
            {SATELLITES.map((sat, i) => {
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

          {/* Center node — the website */}
          <motion.div
            className="relative z-[1] flex size-24 flex-col items-center justify-center rounded-2xl border border-black/[0.06] bg-[#161618] text-white shadow-[0_16px_32px_rgba(0,0,0,0.18)] sm:size-28"
            animate={reduce ? undefined : { scale: [1, 1.03, 1] }}
            whileHover={reduce ? undefined : { scale: 1.06 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[9px] font-semibold uppercase tracking-wider text-white/45">Ihre</span>
            <span className="text-[11px] font-bold">Website</span>
          </motion.div>

          {SATELLITES.map((sat, i) => {
            const p = polar(sat.angle, radius);
            return (
              <motion.div
                key={sat.key}
                className="absolute z-[1] flex flex-col items-center gap-1.5"
                style={{ left: `calc(50% + ${p.x}px)`, top: `calc(50% + ${p.y}px)`, x: "-50%", y: "-50%" }}
                animate={reduce ? undefined : { y: ["-50%", "calc(-50% - 4px)", "-50%"] }}
                whileHover={reduce ? undefined : { scale: 1.12 }}
                transition={{ duration: 2.6 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              >
                <span
                  className="flex size-11 items-center justify-center rounded-full border bg-white text-[10px] font-bold shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                  style={{ borderColor: `${sat.color}55`, color: "#161618" }}
                >
                  {sat.label.slice(0, 2).toUpperCase()}
                </span>
                <span className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-wider text-black/40">
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

export function IntegrationsHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-8 md:pb-20 md:pt-12" data-cursor-bg="light">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 15% 0%, ${INTEGRATIONS_ACCENT}22, transparent 60%),
            radial-gradient(ellipse 50% 40% at 90% 10%, ${INTEGRATIONS_TEAL}18, transparent 55%)
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
                borderColor: `${INTEGRATIONS_ACCENT}60`,
                backgroundColor: `${INTEGRATIONS_ACCENT}18`,
                color: "#161618",
              }}
              whileHover={
                reduce
                  ? undefined
                  : {
                      backgroundColor: `${INTEGRATIONS_ACCENT}30`,
                      borderColor: `${INTEGRATIONS_ACCENT}90`,
                      scale: 1.03,
                    }
              }
              transition={{ duration: 0.25 }}
            >
              <motion.span
                className="size-2 rounded-full"
                style={{ backgroundColor: INTEGRATIONS_ACCENT }}
                animate={reduce ? undefined : { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              {integrationsHero.eyebrow}
            </motion.span>

            <h1 className="mt-6 font-[family-name:var(--font-instrument)] text-[clamp(2.125rem,4.8vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#161618]">
              {integrationsHero.title}
            </h1>

            <p className="mt-5 max-w-[540px] text-[17px] leading-[1.72] text-black/55">
              {integrationsHero.desc}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {integrationsHero.highlights.map((item, i) => (
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
                          borderColor: `${INTEGRATIONS_ACCENT}80`,
                          backgroundColor: `${INTEGRATIONS_ACCENT}18`,
                          color: "#161618",
                        }
                  }
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.35, type: "spring", stiffness: 360, damping: 24 }}
                >
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: INTEGRATIONS_ACCENT }} aria-hidden />
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
            <IntegrationHub />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
