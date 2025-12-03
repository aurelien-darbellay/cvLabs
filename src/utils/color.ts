import { converter } from "culori";

const toRgb = converter("rgb");

/**
 * Convert an OKLCH color string to an sRGB `rgb(...)` or `rgba(...)` string.
 * Returns null if parsing/conversion fails.
 */
export function oklchToRgbString(value: string): string | null {
  if (!value) return null;

  try {
    const parsed = toRgb(value.trim());
    if (!parsed) return null;

    const { r, g, b, alpha = 1 } = parsed;
    const clamp01 = (c: number) => Math.min(1, Math.max(0, c));
    const to255 = (c: number) => Math.round(clamp01(c) * 255);

    if (alpha < 1) {
      return `rgba(${to255(r)}, ${to255(g)}, ${to255(b)}, ${Number(
        alpha.toFixed(3)
      )})`;
    }

    return `rgb(${to255(r)}, ${to255(g)}, ${to255(b)})`;
  } catch (_err) {
    return null;
  }
}
