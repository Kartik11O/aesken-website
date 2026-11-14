"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCursor } from "@/components/cursor-provider";
import type { NetworkPointer } from "@/components/network-scene-3d";

const NetworkScene3D = dynamic(
  () => import("@/components/network-scene-3d").then((m) => m.NetworkScene3D),
  { ssr: false, loading: () => null },
);

type NetworkVisualizationProps = {
  pointer: NetworkPointer;
  onPointerChange?: (pointer: NetworkPointer) => void;
};

export function NetworkVisualization({ pointer, onPointerChange }: NetworkVisualizationProps) {
  const reduce = useReducedMotion();
  const { setOverride } = useCursor();
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    if (isDragging) setShowHint(false);
  }, [isDragging]);

  useEffect(() => {
    setOverride(isDragging ? "grab" : null);
    return () => setOverride(null);
  }, [isDragging, setOverride]);

  const handleCanvasPointer = useCallback(
    (coords: { x: number; y: number; active: boolean } | null) => {
      if (isDragging) return;
      if (coords?.active) setShowHint(false);
      onPointerChange?.(coords ?? { x: 0, y: 0, active: false });
    },
    [isDragging, onPointerChange],
  );

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-none absolute size-72 rounded-full bg-[#1a2a3b]/40 blur-[64px]" />
        <div
          className="pointer-events-auto relative h-[min(420px,78vw)] w-[min(420px,78vw)] sm:h-[min(380px,52vw)] sm:w-[min(380px,52vw)]"
          data-cursor="scene"
        >
          <NetworkScene3D
            pointer={pointer}
            reduced={!!reduce}
            onDraggingChange={setIsDragging}
            onCanvasPointer={onPointerChange ? handleCanvasPointer : undefined}
          />

          <AnimatePresence>
            {showHint && !reduce && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[10px] uppercase tracking-[0.28em] text-white/35"
              >
                Drag nodes to reshape · Double-click to reset
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
