export type CursorTheme = "light" | "dark";

/** `light` = light page background → dark cursor. `dark` = dark background → light cursor. */
export const CURSOR_COLORS: Record<
  CursorTheme,
  { stroke: string; fill: string; label: string; dot: string }
> = {
  light: {
    stroke: "#0a0908",
    fill: "rgba(10, 9, 8, 0.08)",
    label: "#0a0908",
    dot: "#0a0908",
  },
  dark: {
    stroke: "#ffffff",
    fill: "rgba(232, 226, 214, 0.14)",
    label: "#ffffff",
    dot: "#ffffff",
  },
};

function parseRgb(color: string): [number, number, number] | null {
  const match = color.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function luminance(r: number, g: number, b: number) {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

export function resolveCursorTheme(x: number, y: number): CursorTheme {
  const hit = document.elementFromPoint(x, y);
  if (!hit) return "light";

  let node: Element | null = hit;
  while (node) {
    const bgTheme = node.getAttribute("data-cursor-bg");
    if (bgTheme === "light" || bgTheme === "dark") {
      return bgTheme;
    }
    node = node.parentElement;
  }

  node = hit;
  while (node && node !== document.documentElement) {
    const { backgroundColor } = window.getComputedStyle(node);
    if (
      backgroundColor &&
      backgroundColor !== "transparent" &&
      backgroundColor !== "rgba(0, 0, 0, 0)"
    ) {
      const rgb = parseRgb(backgroundColor);
      if (rgb) {
        return luminance(...rgb) > 0.58 ? "light" : "dark";
      }
    }
    node = node.parentElement;
  }

  return "light";
}

export type CursorMode =
  | "default"
  | "link"
  | "button"
  | "card"
  | "scene"
  | "grab"
  | "hidden";

/** Normalized paths in a 24×24 viewBox — morphed with Flubber */
export const CURSOR_SHAPES: Record<CursorMode, string> = {
  default:
    "M12 6 A6 6 0 1 1 11.99 6 Z",
  link:
    "M12 4 A8 8 0 1 1 11.99 4 Z",
  button:
    "M5 10 H19 Q21 10 21 12 V12 Q21 14 19 14 H5 Q3 14 3 12 V12 Q3 10 5 10 Z",
  card:
    "M12 2 A10 10 0 1 1 11.99 2 Z",
  scene:
    "M7.5 7.5 H16.5 V16.5 H7.5 Z",
  grab:
    "M12 7 A5 5 0 1 1 11.99 7 Z",
  hidden:
    "M12 6 A6 6 0 1 1 11.99 6 Z",
};

export const CURSOR_MODE_CONFIG: Record<
  CursorMode,
  {
    size: number;
    filled: boolean;
    label?: string;
    dot: boolean;
    blend: boolean;
  }
> = {
  default: { size: 18, filled: false, dot: true, blend: true },
  link: { size: 38, filled: false, dot: false, blend: true },
  button: { size: 52, filled: true, label: "→", dot: false, blend: false },
  card: { size: 76, filled: false, dot: false, blend: true },
  scene: { size: 44, filled: false, dot: false, blend: true },
  grab: { size: 24, filled: true, dot: false, blend: true },
  hidden: { size: 0, filled: false, dot: false, blend: true },
};

export function resolveCursorMode(target: EventTarget | null): CursorMode {
  if (!(target instanceof Element)) return "default";

  const explicit = target.closest("[data-cursor]")?.getAttribute("data-cursor");
  if (explicit && explicit in CURSOR_SHAPES) {
    return explicit as CursorMode;
  }

  if (target.closest("[data-cursor-hidden]")) return "hidden";
  if (target.closest("a[href]")) return "link";
  if (target.closest("button")) return "button";

  return "default";
}

export type DotHoverStyle = {
  width: number;
  height: number;
  borderRadius: number | string;
  borderWidth: number;
  backgroundColor: string;
  borderColor: string;
  opacity: number;
};

export function getDotHoverStyle(
  mode: CursorMode,
  colors: (typeof CURSOR_COLORS)[CursorTheme],
): DotHoverStyle {
  switch (mode) {
    case "link":
      return {
        width: 34,
        height: 34,
        borderRadius: 999,
        borderWidth: 1.5,
        backgroundColor: "transparent",
        borderColor: colors.dot,
        opacity: 1,
      };
    case "button":
      return {
        width: 46,
        height: 46,
        borderRadius: 999,
        borderWidth: 1.5,
        backgroundColor: colors.fill,
        borderColor: colors.dot,
        opacity: 1,
      };
    case "card":
      return {
        width: 58,
        height: 58,
        borderRadius: 999,
        borderWidth: 1.5,
        backgroundColor: "transparent",
        borderColor: colors.dot,
        opacity: 0.85,
      };
    case "scene":
      return {
        width: 28,
        height: 28,
        borderRadius: 6,
        borderWidth: 1.5,
        backgroundColor: "transparent",
        borderColor: colors.dot,
        opacity: 1,
      };
    case "grab":
      return {
        width: 12,
        height: 12,
        borderRadius: 999,
        borderWidth: 0,
        backgroundColor: colors.dot,
        borderColor: "transparent",
        opacity: 1,
      };
    case "hidden":
      return {
        width: 0,
        height: 0,
        borderRadius: 999,
        borderWidth: 0,
        backgroundColor: "transparent",
        borderColor: "transparent",
        opacity: 0,
      };
    default:
      return {
        width: 7,
        height: 7,
        borderRadius: 999,
        borderWidth: 0,
        backgroundColor: colors.dot,
        borderColor: "transparent",
        opacity: 1,
      };
  }
}
