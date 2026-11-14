"use client";

import { useCallback, useRef, useState } from "react";
import { animated, config, useSpring } from "@react-spring/web";
import { useReducedMotion } from "framer-motion";

type InteractiveCardSurfaceProps = {
  glow: string;
  children: React.ReactNode;
  className?: string;
};

const DEFAULT_X = 75;
const DEFAULT_Y = 15;

type SpringState = {
  x: number;
  y: number;
  gridOpacity: number;
  glowOpacity: number;
  blurOpacity: number;
};

const IDLE: SpringState = {
  x: DEFAULT_X,
  y: DEFAULT_Y,
  gridOpacity: 0.05,
  glowOpacity: 0.28,
  blurOpacity: 0.12,
};

const ACTIVE: Pick<SpringState, "gridOpacity" | "glowOpacity" | "blurOpacity"> = {
  gridOpacity: 0.14,
  glowOpacity: 0.6,
  blurOpacity: 0.45,
};

/** Slow glide when entering or leaving a card */
const enterSpring = { mass: 1.45, tension: 48, friction: 20 };
/** Soft follow while the cursor moves inside the card */
const followSpring = { mass: 0.85, tension: 90, friction: 28 };
/** Gentle settle back to the resting corner */
const exitSpring = { mass: 1.35, tension: 55, friction: 22 };

type PointerPoint = { x: number; y: number };

function getLocalPointer(
  event: React.MouseEvent<HTMLDivElement>,
  card: HTMLDivElement,
): PointerPoint {
  const rect = card.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100,
  };
}

export function InteractiveCardSurface({
  glow,
  children,
  className = "",
}: InteractiveCardSurfaceProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  const [springs, api] = useSpring<SpringState>(() => ({
    ...IDLE,
    config: config.molasses,
  }));

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      setHovered(true);
      const target = getLocalPointer(event, cardRef.current);

      if (reduce) {
        api.set({ x: target.x, y: target.y, ...ACTIVE });
        return;
      }

      api.set({ x: DEFAULT_X, y: DEFAULT_Y });

      api.start({
        x: target.x,
        y: target.y,
        ...ACTIVE,
        config: enterSpring,
      });
    },
    [api, reduce],
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(false);

    if (reduce) {
      api.set({ ...IDLE });
      return;
    }

    api.start({
      ...IDLE,
      config: exitSpring,
    });
  }, [api, reduce]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || reduce) return;

      const { x, y } = getLocalPointer(event, cardRef.current);

      api.start({
        x,
        y,
        config: followSpring,
      });
    },
    [api, reduce],
  );

  return (
    <animated.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={
        {
          "--mouse-x": springs.x.to((value) => `${value}%`),
          "--mouse-y": springs.y.to((value) => `${value}%`),
          "--glow-color": glow,
        } as React.CSSProperties
      }
    >
      <animated.div
        className={`pointer-events-none absolute inset-0 ${hovered && !reduce ? "card-grid-drift" : ""}`}
        style={{
          opacity: springs.gridOpacity,
          backgroundImage: `
            linear-gradient(rgba(232, 226, 214, 0.45) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232, 226, 214, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <animated.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: springs.glowOpacity,
          background: `radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), color-mix(in srgb, var(--glow-color) 48%, transparent) 0%, transparent 72%)`,
        }}
      />

      <animated.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: springs.blurOpacity,
          background: `radial-gradient(circle 140px at var(--mouse-x) var(--mouse-y), var(--glow-color) 0%, transparent 100%)`,
          filter: "blur(48px)",
        }}
      />

      {children}
    </animated.div>
  );
}
