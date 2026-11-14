"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
  y?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  as = "div",
  y = 32,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const Tag = as;

  useGSAP(
    () => {
      registerGsap();
      if (reduce || !ref.current) return;

      gsap.set(ref.current, { opacity: 0, y });

      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref, dependencies: [reduce, delay, y] },
  );

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  );
}
