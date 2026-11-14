"use client";

import { useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";

type GsapTextRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Animate on page load or when scrolled into view */
  trigger?: "load" | "scroll";
  delay?: number;
  stagger?: number;
  /** Split by words or lines (use \\n in text for lines) */
  split?: "words" | "lines";
};

function splitText(text: string, mode: "words" | "lines") {
  if (mode === "lines") {
    return text.split("\n").map((line, i) => ({ key: `line-${i}`, content: line, isSpace: false }));
  }

  return text.split(/(\s+)/).map((part, i) => ({
    key: `word-${i}`,
    content: part,
    isSpace: !part.trim(),
  }));
}

export function GsapTextReveal({
  text,
  className,
  as: Tag = "span",
  trigger = "scroll",
  delay = 0,
  stagger = 0.045,
  split = "words",
}: GsapTextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const parts = useMemo(() => splitText(text, split), [text, split]);

  useGSAP(
    () => {
      registerGsap();
      if (reduce || !ref.current) return;

      const targets = ref.current.querySelectorAll("[data-reveal-part]");
      if (!targets.length) return;

      gsap.set(targets, { y: "110%", opacity: 0 });

      const tween = {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger,
        delay,
        ease: "power3.out",
      };

      if (trigger === "load") {
        gsap.to(targets, tween);
        return;
      }

      gsap.to(targets, {
        ...tween,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref, dependencies: [reduce, text, trigger, delay, stagger, split] },
  );

  if (split === "lines") {
    return (
      <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
        {parts.map((part) => (
          <span key={part.key} className="block overflow-hidden">
            <span data-reveal-part className="block">
              {part.content}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {parts.map((part) =>
        part.isSpace ? (
          <span key={part.key}>{part.content}</span>
        ) : (
          <span key={part.key} className="inline-block overflow-hidden align-bottom">
            <span data-reveal-part className="inline-block">
              {part.content}
            </span>
          </span>
        ),
      )}
    </Tag>
  );
}
