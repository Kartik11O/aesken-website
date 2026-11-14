"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";

export function HeroPanelGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      if (reduce || !ref.current) return;

      gsap.fromTo(
        ref.current,
        { backgroundPosition: "0px 0px" },
        {
          backgroundPosition: "48px 48px",
          duration: 24,
          ease: "none",
          repeat: -1,
        },
      );
    },
    { scope: ref, dependencies: [reduce] },
  );

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 opacity-[0.08]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(232, 226, 214, 0.55) 1px, transparent 1px),
          linear-gradient(90deg, rgba(232, 226, 214, 0.55) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
    />
  );
}
