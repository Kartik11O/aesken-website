"use client";

import Link from "next/link";
import { useRef, useCallback } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useGSAP } from "@gsap/react";
import { GsapTextReveal } from "@/components/gsap/text-reveal";
import { ServicePillButton } from "@/components/service/service-pill-button";
import { Tilt3DCard } from "@/components/service/tilt-3d-card";
import { heroBadges, heroGridBlocks } from "@/lib/service-data";
import { gsap, registerGsap } from "@/lib/gsap";

const SPRING = { stiffness: 70, damping: 22, mass: 0.6 };

const GRID_CELL = 80;
const BASE_GRID_LINES = `
  linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
`;
const HOVER_GRID_LINES = `
  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
`;
const PULSE_H = `linear-gradient(90deg, transparent 0%, transparent 38%, rgba(40,32,56,0.22) 50%, transparent 62%, transparent 100%)`;
const PULSE_V = `linear-gradient(0deg, transparent 0%, transparent 38%, rgba(40,32,56,0.22) 50%, transparent 62%, transparent 100%)`;
const LINE_MASK = `
  linear-gradient(#000 1px, transparent 1px),
  linear-gradient(90deg, #000 1px, transparent 1px)
`;
const GRID_MASK = "radial-gradient(ellipse 78% 68% at 50% 42%, black 12%, transparent 80%)";
const PULSE_TRAVEL = GRID_CELL * 4;

function HeroBadge({
  icon,
  text,
  depth,
  rotate,
  mouseX,
  mouseY,
  floatDelay,
}: {
  icon: string;
  text: string;
  depth: number;
  rotate: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  floatDelay: number;
}) {
  const parallaxX = useTransform(mouseX, [-1, 1], [-18 * depth, 18 * depth]);
  const parallaxY = useTransform(mouseY, [-1, 1], [-14 * depth, 14 * depth]);

  return (
    <Link href="#projekte" data-cursor="link" aria-label={`${text} — Lösungen ansehen`}>
      <Tilt3DCard
        baseRotate={rotate}
        floatDelay={floatDelay}
        tiltStrength={16}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        className="cursor-pointer"
        innerClassName="group"
      >
        <div className="relative flex max-w-[210px] items-center gap-3 overflow-hidden rounded-2xl border border-black/[0.07] bg-white/92 p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 group-hover:border-black/12 group-hover:shadow-[0_24px_56px_rgba(0,0,0,0.14)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, transparent 42%, transparent 100%)",
            transform: "translateZ(1px)",
          }}
        />
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.04] text-black/70 transition-colors duration-300 group-hover:bg-black group-hover:text-white">
          {icon === "search" ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M20 20L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 18L8 10L12 14L16 8L20 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <p className="relative text-[13px] leading-snug text-black/72 transition-colors group-hover:text-black/90">
          {text}
        </p>
        </div>
      </Tilt3DCard>
    </Link>
  );
}

function HeroGridLayer({
  mouseX,
  mouseY,
  hoverStrength,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  hoverStrength: MotionValue<number>;
}) {
  const baseRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useTransform(mouseX, [-1, 1], [-24, 24]);
  const y = useTransform(mouseY, [-1, 1], [-18, 18]);
  const darkOpacity = useTransform(hoverStrength, [0, 1], [0, 0.55]);

  useGSAP(
    () => {
      registerGsap();
      if (reduce || !pulseRef.current) return;

      gsap.fromTo(
        pulseRef.current,
        { backgroundPosition: "0px 0px, 0px 0px" },
        {
          backgroundPosition: `${PULSE_TRAVEL}px 0px, 0px ${PULSE_TRAVEL}px`,
          duration: 20,
          ease: "none",
          repeat: -1,
        },
      );
    },
    { dependencies: [reduce] },
  );

  const gridStyle = {
    backgroundSize: `${GRID_CELL}px ${GRID_CELL}px`,
    maskImage: GRID_MASK,
    WebkitMaskImage: GRID_MASK,
  };

  const pulseStyle = {
    backgroundImage: `${PULSE_H}, ${PULSE_V}`,
    backgroundSize: `${PULSE_TRAVEL}px ${GRID_CELL}px, ${GRID_CELL}px ${PULSE_TRAVEL}px`,
    backgroundRepeat: "repeat",
    maskImage: LINE_MASK,
    WebkitMaskImage: LINE_MASK,
    maskSize: `${GRID_CELL}px ${GRID_CELL}px`,
    WebkitMaskSize: `${GRID_CELL}px ${GRID_CELL}px`,
  };

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <motion.div
        ref={baseRef}
        className="absolute inset-0"
        style={{
          ...gridStyle,
          x,
          y,
          backgroundImage: BASE_GRID_LINES,
        }}
      />
      {!reduce && (
        <motion.div
          className="absolute inset-0"
          style={{
            x,
            y,
            maskImage: GRID_MASK,
            WebkitMaskImage: GRID_MASK,
          }}
        >
          <div ref={pulseRef} className="absolute inset-0 opacity-75" style={pulseStyle} />
        </motion.div>
      )}
      {!reduce && (
        <motion.div
          ref={darkRef}
          className="absolute inset-0"
          style={{
            ...gridStyle,
            x,
            y,
            backgroundImage: HOVER_GRID_LINES,
            opacity: darkOpacity,
          }}
        />
      )}
    </div>
  );
}

function HeroGridBlock({
  block,
  mouseX,
  mouseY,
}: {
  block: (typeof heroGridBlocks)[number];
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const parallaxX = useTransform(mouseX, [-1, 1], [-12 * block.depth, 12 * block.depth]);
  const parallaxY = useTransform(mouseY, [-1, 1], [-10 * block.depth, 10 * block.depth]);

  return (
    <Tilt3DCard
      parallaxX={parallaxX}
      parallaxY={parallaxY}
      floatDelay={block.delay * 10}
      tiltStrength={12}
      className={`absolute hidden lg:block ${block.col} ${block.row}`}
      style={{ width: block.size, height: block.size }}
      innerClassName="size-full"
    >
      <motion.div
        className="size-full rounded-xl border border-black/[0.06] bg-white/55 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5 + block.delay, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
    </Tilt3DCard>
  );
}

function SocialProofPill({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.div
      className="group mx-auto mt-9 inline-flex items-center gap-3 rounded-full border border-black/[0.07] bg-white/80 px-4 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.05)] backdrop-blur-sm"
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        transition: { type: "spring", stiffness: 400, damping: 24 },
      }}
      data-cursor="card"
    >
      <div className="flex -space-x-2.5 transition-all duration-300 group-hover:-space-x-1.5">
        {[
          "from-neutral-400 to-neutral-500",
          "from-neutral-300 to-neutral-400",
          "from-neutral-500 to-neutral-600",
        ].map((gradient, i) => (
          <motion.div
            key={gradient}
            className={`size-7 rounded-full border-2 border-white bg-gradient-to-br ${gradient}`}
            whileHover={{ scale: 1.12, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            style={{ zIndex: 3 - i }}
          />
        ))}
      </div>
      <span className="text-sm text-black/65 transition-colors group-hover:text-black/80">
        Über 40 zufriedene Kunden in Deutschland
      </span>
    </motion.div>
  );
}

export function ServiceHero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const hoverStrength = useMotionValue(0);
  const smoothX = useSpring(mouseX, SPRING);
  const smoothY = useSpring(mouseY, SPRING);
  const smoothHover = useSpring(hoverStrength, { stiffness: 120, damping: 24 });

  const contentX = useTransform(smoothX, [-1, 1], [8, -8]);
  const contentY = useTransform(smoothY, [-1, 1], [6, -6]);

  const handlePointerEnter = useCallback(() => {
    if (!reduce) hoverStrength.set(1);
  }, [hoverStrength, reduce]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduce) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;

      hoverStrength.set(1);
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    },
    [mouseX, mouseY, hoverStrength, reduce],
  );

  const handlePointerLeave = useCallback(() => {
    hoverStrength.set(0);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY, hoverStrength]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[720px] overflow-hidden bg-white pb-20 pt-12 md:min-h-[780px] md:pb-28 md:pt-16"
      data-cursor-bg="light"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <HeroGridLayer mouseX={smoothX} mouseY={smoothY} hoverStrength={smoothHover} />

      {!reduce &&
        heroGridBlocks.map((block) => (
          <HeroGridBlock key={`${block.col}-${block.row}`} block={block} mouseX={smoothX} mouseY={smoothY} />
        ))}

      <div className="relative mx-auto max-w-[1240px] px-6 md:px-10">
        {!reduce &&
          heroBadges.map((badge, i) => (
            <div key={badge.text} className={`absolute z-10 hidden lg:block ${badge.position}`}>
              <HeroBadge
                icon={badge.icon}
                text={badge.text}
                depth={badge.depth}
                rotate={badge.rotate}
                mouseX={smoothX}
                mouseY={smoothY}
                floatDelay={i}
              />
            </div>
          ))}

        <motion.div
          className="relative mx-auto max-w-[930px] text-center"
          style={reduce ? undefined : { x: contentX, y: contentY }}
        >
          <GsapTextReveal
            as="h1"
            trigger="load"
            delay={0.12}
            stagger={0.09}
            split="lines"
            text={
              "Aesken All-in-One-Webdienste.\nSchnell starten, besser ranken,\nmehr Besucher gewinnen."
            }
            className="font-[family-name:var(--font-instrument)] text-[clamp(2.1rem,5.2vw,3.65rem)] font-medium leading-[1.12] tracking-[-0.025em] text-black"
          />

          <motion.p
            className="mx-auto mt-7 max-w-[680px] text-base leading-[1.65] text-black/52 md:text-[1.0625rem]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            Wir entwerfen und erstellen komplette Websites für Unternehmen – von der Domain bis zum
            Start und der rechtlichen Einrichtung, wir kümmern uns um alles.
          </motion.p>

          <SocialProofPill reduce={reduce} />
        </motion.div>

        <motion.div
          className="relative mt-14 flex flex-col items-center gap-4"
          style={reduce ? undefined : { x: contentX, y: contentY }}
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <ServicePillButton href="#contact" size="lg">
            Senden Sie Ihre Anforderungen
          </ServicePillButton>
          <p className="max-w-md text-center text-sm leading-relaxed text-black/42">
            Sagen Sie uns, wonach Sie suchen – wir melden uns so schnell wie möglich bei Ihnen
          </p>
        </motion.div>
      </div>
    </section>
  );
}
