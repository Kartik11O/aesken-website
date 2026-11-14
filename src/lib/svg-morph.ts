import { interpolate } from "flubber";

export function createMorphInterpolator(from: string, to: string) {
  try {
    return interpolate(from, to, { maxSegmentLength: 2 });
  } catch {
    return (t: number) => (t < 0.5 ? from : to);
  }
}
