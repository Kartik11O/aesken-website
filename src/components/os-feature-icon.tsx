"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { MorphPath } from "@/components/morph-path";
import { gsap, registerGsap } from "@/lib/gsap";

type IconProps = {
  active: boolean;
  reduce: boolean | null;
};

const spring = { type: "spring" as const, stiffness: 260, damping: 20 };

function IconWrap({
  active,
  reduce,
  children,
  rotate = -5,
}: IconProps & { children: React.ReactNode; rotate?: number }) {
  return (
    <motion.div
      className="inline-flex text-accent-cream/80 transition-colors group-hover:text-accent-cream"
      initial={false}
      animate={
        reduce
          ? { y: 0, scale: 1, rotate: 0 }
          : {
              y: active ? -5 : 0,
              scale: active ? 1.1 : 1,
              rotate: active ? rotate : 0,
            }
      }
      transition={reduce ? { duration: 0 } : spring}
    >
      {children}
    </motion.div>
  );
}

const ICON_PATHS = {
  spark: {
    from: "M12 2 13.5 7.5 19 9 13.5 10.5 12 16 10.5 10.5 5 9 10.5 7.5 12 2z",
    to: "M12 0.5 14.2 7.2 21 9 14.2 10.8 12 18 9.8 10.8 3 9 9.8 7.2 12 0.5z",
  },
  leaf: {
    from: "M12 20c-4-3-6-7-6-11a6 6 0 0 1 12 0c0 4-2 8-6 11z",
    to: "M12 19.5c-3.2-2.4-5.8-6.2-5.8-10.2a5.8 5.8 0 0 1 11.6 0c0 4-2.6 7.8-5.8 10.2z",
  },
} as const;

function SparkIcon({ active, reduce }: IconProps) {
  return (
    <IconWrap active={active} reduce={reduce} rotate={18}>
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
        <MorphPath
          from={ICON_PATHS.spark.from}
          to={ICON_PATHS.spark.to}
          active={active}
          reduce={reduce}
          duration={0.6}
        />
      </svg>
    </IconWrap>
  );
}

function FlowIcon({ active, reduce }: IconProps) {
  const boxes = [
    { id: "top-left", x: 4, y: 4, hoverX: 3.2, hoverY: 3.2 },
    { id: "top-right", x: 14, y: 4, hoverX: 14.8, hoverY: 3.2 },
    { id: "bottom", x: 9, y: 16, hoverX: 9, hoverY: 17.2 },
  ];

  return (
    <IconWrap active={active} reduce={reduce} rotate={-4}>
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
        {boxes.map((box, index) => (
          <motion.rect
            key={box.id}
            width={6}
            height={4}
            rx={0.5}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            initial={false}
            animate={{
              x: active && !reduce ? box.hoverX : box.x,
              y: active && !reduce ? box.hoverY : box.y,
            }}
            transition={reduce ? { duration: 0 } : { ...spring, delay: index * 0.04 }}
          />
        ))}
        <motion.path
          d="M7 8v3h5M17 8v3h-5"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
          initial={false}
          animate={{ opacity: active && !reduce ? 1 : 0.75 }}
          transition={reduce ? { duration: 0 } : spring}
        />
      </svg>
    </IconWrap>
  );
}

function GaugeIcon({ active, reduce }: IconProps) {
  const needleRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!needleRef.current) return;

      gsap.to(needleRef.current, {
        attr: { transform: `rotate(${active && !reduce ? -34 : 0} 12 14)` },
        duration: reduce ? 0 : 0.55,
        ease: "power2.inOut",
      });
    },
    { dependencies: [active, reduce] },
  );

  return (
    <IconWrap active={active} reduce={reduce} rotate={0}>
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
        <path
          d="M4 14a8 8 0 0 1 16 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <g ref={needleRef} transform="rotate(0 12 14)">
          <path
            d="M12 14 15 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </IconWrap>
  );
}

function LayersIcon({ active, reduce }: IconProps) {
  const layers = [
    { d: "M12 4 4 8 12 12 20 8 12 4z", y: 0, hoverY: -3.5, opacity: 0.85 },
    { d: "M4 12 12 16 20 12", y: 0, hoverY: -1.8, opacity: 0.92 },
    { d: "M4 16 12 20 20 16", y: 0, hoverY: 0, opacity: 1 },
  ];

  return (
    <IconWrap active={active} reduce={reduce}>
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
        {layers.map((layer, index) => (
          <motion.g
            key={layer.d}
            initial={false}
            animate={{ y: active && !reduce ? layer.hoverY : layer.y }}
            transition={reduce ? { duration: 0 } : { ...spring, delay: index * 0.05 }}
          >
            <path
              d={layer.d}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
              opacity={active && !reduce ? 1 : layer.opacity}
            />
          </motion.g>
        ))}
      </svg>
    </IconWrap>
  );
}

function LeafIcon({ active, reduce }: IconProps) {
  return (
    <IconWrap active={active} reduce={reduce} rotate={10}>
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
        <MorphPath
          from={ICON_PATHS.leaf.from}
          to={ICON_PATHS.leaf.to}
          active={active}
          reduce={reduce}
          duration={0.6}
        />
      </svg>
    </IconWrap>
  );
}

function ShieldIcon({ active, reduce }: IconProps) {
  return (
    <IconWrap active={active} reduce={reduce} rotate={0}>
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
        <path
          d="M12 3 19 6v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <motion.path
          d="M9 12 11 14 15 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          initial={false}
          animate={{
            pathLength: active && !reduce ? 1 : 0.85,
            opacity: active && !reduce ? 1 : 0.85,
          }}
          transition={reduce ? { duration: 0 } : spring}
        />
      </svg>
    </IconWrap>
  );
}

const iconMap = {
  spark: SparkIcon,
  flow: FlowIcon,
  gauge: GaugeIcon,
  layers: LayersIcon,
  leaf: LeafIcon,
  shield: ShieldIcon,
} as const;

export function OsFeatureIcon({ type, active }: { type: string; active: boolean }) {
  const reduce = useReducedMotion();
  const Icon = iconMap[type as keyof typeof iconMap] ?? SparkIcon;

  return <Icon active={active} reduce={reduce} />;
}
