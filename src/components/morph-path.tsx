"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { createMorphInterpolator } from "@/lib/svg-morph";

type MorphPathProps = {
  from: string;
  to: string;
  active: boolean;
  reduce: boolean | null;
  duration?: number;
};

export function MorphPath({
  from,
  to,
  active,
  reduce,
  duration = 0.55,
}: MorphPathProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef({ t: 0 });

  const morph = useMemo(() => createMorphInterpolator(from, to), [from, to]);

  useEffect(() => {
    registerGsap();
    const path = pathRef.current;
    if (!path) return;

    if (reduce) {
      gsap.killTweensOf(progressRef.current);
      progressRef.current.t = active ? 1 : 0;
      path.setAttribute("d", morph(progressRef.current.t));
      return;
    }

    gsap.killTweensOf(progressRef.current);
    gsap.to(progressRef.current, {
      t: active ? 1 : 0,
      duration,
      ease: "power2.inOut",
      onUpdate: () => {
        path.setAttribute("d", morph(progressRef.current.t));
      },
    });
  }, [active, reduce, morph, duration]);

  return (
    <path
      ref={pathRef}
      d={from}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}
