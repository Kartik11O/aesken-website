"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import {
  CURSOR_COLORS,
  getDotHoverStyle,
  resolveCursorMode,
  resolveCursorTheme,
  type CursorMode,
  type CursorTheme,
} from "@/lib/cursor";
import { gsap, registerGsap } from "@/lib/gsap";

type CursorContextValue = {
  setOverride: (mode: CursorMode | null) => void;
};

const CursorContext = createContext<CursorContextValue>({
  setOverride: () => {},
});

export function useCursor() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [override, setOverride] = useState<CursorMode | null>(null);

  return (
    <CursorContext.Provider value={{ setOverride }}>
      <CursorDot override={override} />
      {children}
    </CursorContext.Provider>
  );
}

function CursorDot({ override }: { override: CursorMode | null }) {
  const reduce = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const themeRef = useRef<CursorTheme>("light");
  const quickXRef = useRef<gsap.QuickToFunc | null>(null);
  const quickYRef = useRef<gsap.QuickToFunc | null>(null);

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState<CursorTheme>("light");
  const [mode, setMode] = useState<CursorMode>("default");

  const activeMode = override ?? mode;
  const colors = CURSOR_COLORS[theme];
  const dotStyle = useMemo(
    () => getDotHoverStyle(activeMode, colors),
    [activeMode, colors],
  );

  const applyPosition = useCallback(() => {
    if (!dotRef.current) return;
    gsap.set(dotRef.current, {
      x: posRef.current.x,
      y: posRef.current.y,
      xPercent: -50,
      yPercent: -50,
      force3D: true,
    });
  }, []);

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches && !reduce);
  }, [reduce]);

  useGSAP(
    () => {
      if (!enabled) return;
      registerGsap();

      const pos = posRef.current;
      quickXRef.current = gsap.quickTo(pos, "x", {
        duration: 0.58,
        ease: "power2.out",
        onUpdate: applyPosition,
      });
      quickYRef.current = gsap.quickTo(pos, "y", {
        duration: 0.68,
        ease: "power2.out",
        onUpdate: applyPosition,
      });
    },
    { dependencies: [enabled, applyPosition] },
  );

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      setVisible(true);
      quickXRef.current?.(event.clientX);
      quickYRef.current?.(event.clientY);

      const nextTheme = resolveCursorTheme(event.clientX, event.clientY);
      if (nextTheme !== themeRef.current) {
        themeRef.current = nextTheme;
        setTheme(nextTheme);
      }
    };

    const onOver = (event: MouseEvent) => {
      if (override) return;
      setMode(resolveCursorMode(event.target));
    };

    const onLeaveWindow = () => setVisible(false);
    const onEnterWindow = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onLeaveWindow);
    window.addEventListener("mouseenter", onEnterWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onLeaveWindow);
      window.removeEventListener("mouseenter", onEnterWindow);
    };
  }, [enabled, override]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9998] cursor-dot"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s ease" }}
    >
      <motion.span
        className="block box-border"
        initial={false}
        animate={{
          width: dotStyle.width,
          height: dotStyle.height,
          borderRadius: dotStyle.borderRadius,
          borderWidth: dotStyle.borderWidth,
          backgroundColor: dotStyle.backgroundColor,
          borderColor: dotStyle.borderColor,
          opacity: visible ? dotStyle.opacity : 0,
        }}
        transition={{ type: "spring", stiffness: 360, damping: 26 }}
        style={{ borderStyle: "solid" }}
      />
    </div>
  );
}
