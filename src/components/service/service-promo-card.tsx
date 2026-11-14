"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Tilt3DCard } from "@/components/service/tilt-3d-card";
import type { promoCards } from "@/lib/service-data";

type PromoCardData = (typeof promoCards)[number];

function PromoFloatingShape({ variant }: { variant: PromoCardData["variant"] }) {
  const reduce = useReducedMotion();

  if (variant === "seo") {
    return (
      <div
        className="promo-shape-3d pointer-events-none absolute right-8 top-10 md:right-14 md:top-14"
        aria-hidden
      >
        <div className={reduce ? "" : "promo-shape-spin-slow"}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-90">
            <ellipse cx="60" cy="60" rx="48" ry="48" stroke="white" strokeOpacity="0.35" strokeWidth="1" />
            <ellipse cx="60" cy="60" rx="32" ry="32" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
            <rect x="38" y="72" width="8" height="22" rx="2" fill="white" fillOpacity="0.5" />
            <rect x="52" y="58" width="8" height="36" rx="2" fill="white" fillOpacity="0.65" />
            <rect x="66" y="48" width="8" height="46" rx="2" fill="white" fillOpacity="0.8" />
            <path
              d="M34 88h52"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      className="promo-shape-3d pointer-events-none absolute right-8 top-10 md:right-14 md:top-14"
      aria-hidden
    >
      <div className={reduce ? "" : "promo-shape-spin-reverse"}>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-90">
          <polygon
            points="60,18 98,42 98,78 60,102 22,78 22,42"
            stroke="white"
            strokeOpacity="0.35"
            strokeWidth="1"
            fill="none"
          />
          <polygon
            points="60,34 82,48 82,72 60,86 38,72 38,48"
            stroke="white"
            strokeOpacity="0.25"
            strokeWidth="1"
            fill="white"
            fillOpacity="0.08"
          />
          <circle cx="60" cy="60" r="6" fill="white" fillOpacity="0.55" />
        </svg>
      </div>
    </div>
  );
}

type ServicePromoCardProps = {
  card: PromoCardData;
  className?: string;
};

export function ServicePromoCard({ card, className = "" }: ServicePromoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(30);
  const glowOpacity = useMotionValue(0.22);
  const smoothGlowX = useSpring(glowX, { stiffness: 120, damping: 20 });
  const smoothGlowY = useSpring(glowY, { stiffness: 120, damping: 20 });
  const smoothGlowOpacity = useSpring(glowOpacity, { stiffness: 80, damping: 22 });
  const glowLeft = useTransform(smoothGlowX, (v) => `${v}%`);
  const glowTop = useTransform(smoothGlowY, (v) => `${v}%`);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduce || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      glowX.set(((event.clientX - rect.left) / rect.width) * 100);
      glowY.set(((event.clientY - rect.top) / rect.height) * 100);
      glowOpacity.set(0.42);
    },
    [glowOpacity, glowX, glowY, reduce],
  );

  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    glowX.set(50);
    glowY.set(30);
    glowOpacity.set(0.22);
  }, [glowOpacity, glowX, glowY]);

  const contentVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + i * 0.08,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <Tilt3DCard enableFloat={false} tiltStrength={8} className="h-full">
      <article
        ref={cardRef}
        onPointerEnter={() => setHovered(true)}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`group/promo relative flex min-h-[420px] flex-col justify-end overflow-hidden p-8 md:min-h-[564px] md:p-[60px] ${className}`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`}
          aria-hidden
        />
        <div
          className={`promo-gradient-shift absolute inset-0 opacity-60 mix-blend-soft-light ${reduce ? "" : ""}`}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute size-72 rounded-full bg-white/35 blur-3xl"
          style={{
            left: glowLeft,
            top: glowTop,
            x: "-50%",
            y: "-50%",
            opacity: smoothGlowOpacity,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          aria-hidden
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
          }}
        />

        <PromoFloatingShape variant={card.variant} />

        <div className="relative z-[1]">
          <motion.p
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={contentVariants}
            className="text-sm font-medium text-white/85"
          >
            {card.label}
          </motion.p>
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={contentVariants}
            className="my-4 h-0.5 w-32 origin-left bg-white/45 transition-transform duration-500 group-hover/promo:scale-x-110"
          />
          <motion.h3
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={contentVariants}
            className="max-w-md font-[family-name:var(--font-instrument)] text-2xl font-medium leading-snug tracking-[-0.02em] text-white md:text-[2rem]"
          >
            {card.title}
          </motion.h3>
          <motion.p
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={contentVariants}
            className="mt-4 max-w-md text-sm leading-relaxed text-white/78"
          >
            {card.desc}
          </motion.p>
          <motion.div
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={contentVariants}
          >
            <Link
              href="#"
              data-cursor="link"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white"
            >
              <span className="transition-opacity group-hover/promo:opacity-90">{card.cta}</span>
              <motion.span
                animate={hovered && !reduce ? { x: 3, y: -3 } : { x: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="text-base"
              >
                ↗
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </article>
    </Tilt3DCard>
  );
}
