"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";

type Tilt3DCardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  baseRotate?: number;
  tiltStrength?: number;
  floatDelay?: number;
  enableFloat?: boolean;
  style?: React.CSSProperties;
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
};

export function Tilt3DCard({
  children,
  className = "",
  innerClassName = "",
  baseRotate = 0,
  tiltStrength = 14,
  floatDelay = 0,
  enableFloat = true,
  style,
  parallaxX,
  parallaxY,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const lift = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 260, damping: 22 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 260, damping: 22 });
  const smoothLift = useSpring(lift, { stiffness: 320, damping: 24 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    rotateY.set(px * tiltStrength);
    rotateX.set(-py * tiltStrength);
    lift.set(12);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{
        x: parallaxX,
        y: parallaxY,
        ...style,
      }}
    >
      <motion.div
        animate={
          reduce || !enableFloat
            ? undefined
            : { y: [0, floatDelay % 2 === 0 ? -10 : 10, 0] }
        }
        transition={{ duration: 5 + floatDelay, repeat: Infinity, ease: "easeInOut" }}
        className="[perspective:900px]"
      >
        <motion.div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          data-cursor="card"
          style={{
            rotateX: reduce ? 0 : smoothRotateX,
            rotateY: reduce ? 0 : smoothRotateY,
            z: reduce ? 0 : smoothLift,
            rotate: baseRotate,
            transformStyle: "preserve-3d",
          }}
          className={innerClassName}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
