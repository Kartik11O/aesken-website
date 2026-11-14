/** Process timeline design tokens — single source for spacing, color, type */
export const processTokens = {
  teal: "#00A38D",
  tealMuted: "rgba(0, 163, 141, 0.12)",
  tealGlow: "rgba(0, 163, 141, 0.35)",
  slate: "#64748b",
  slateLight: "#94a3b8",
  ink: "#0f172a",
  body: "#475569",
  muted: "#64748b",
  border: "#e8ecf0",
  surface: "#ffffff",
  canvas: "#ffffff",
  gridLine: "rgba(15, 23, 42, 0.04)",
  dotInactive: "#cbd5e1",
  shadowCard: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)",
  shadowHover: "0 4px 8px rgba(15,23,42,0.06), 0 20px 40px rgba(15,23,42,0.1)",
  radiusCard: "20px",
  radiusMockup: "14px",
} as const;

/** 5 equal grid columns → node/line positions sit exactly on column centers */
export const TIMELINE = {
  leftPct: 10,
  stepPct: 20,
  trackHeight: 64,
} as const;
