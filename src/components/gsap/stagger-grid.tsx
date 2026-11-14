"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";

type GsapStaggerGridProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  start?: string;
};

export function GsapStaggerGrid({
  children,
  className,
  stagger = 0.08,
  y = 24,
  start = "top 85%",
}: GsapStaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      if (reduce || !ref.current) return;

      const items = ref.current.children;
      if (!items.length) return;

      gsap.from(items, {
        opacity: 0,
        y,
        duration: 0.55,
        stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref, dependencies: [reduce, stagger, y, start] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
