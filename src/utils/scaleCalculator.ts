export const MIN_SCALE = 0.6;
export const MAX_SCALE = 1.0;
const A4_HEIGHT = 1122; // 297mm at 96dpi
const SCALE_STEP = 0.001; // Reduce scale by this amount per iteration
const HEIGHT_THRESHOLD = 5; // Consider heights equal if within 5px

import { adjustScale } from "./adjustScale";

export interface ScaleResult {
  scaleFactor: number;
  showWarning: boolean;
}

/**
 * Calculates the optimal scale factor to fit content on a single A4 page.
 * Uses an iterative approach: adjusts scale and checks the resulting height,
 * continuing until content fits optimally within A4_HEIGHT or reaches scale limits.
 *
 * @param currentHeight The current rendered height in pixels
 * @param previousScale The previous scale factor (starting point)
 * @param element The DOM element to measure (optional, for accurate height calculation)
 * @returns Object with new scale factor and warning flag
 */
export function calculateOptimalScale(
  currentHeight: number,
  previousScale: number,
  element?: HTMLElement
): ScaleResult {
  // Determine if we need to scale down (too tall) or scale up (too short)
  const isTooTall = currentHeight > A4_HEIGHT;
  const direction = isTooTall ? -1 : 1;
  const scaleLimit = isTooTall ? MIN_SCALE : MAX_SCALE;

  // Attempt to find optimal scale
  const optimalScale = adjustScale(
    element,
    currentHeight,
    previousScale,
    direction as 1 | -1,
    scaleLimit,
    SCALE_STEP
  );

  if (optimalScale !== undefined) {
    return {
      scaleFactor: optimalScale,
      showWarning: false,
    };
  }

  // No optimal scale found, use the limit
  const showWarning = isTooTall && scaleLimit === MIN_SCALE;

  return {
    scaleFactor: scaleLimit,
    showWarning,
  };
}

/**
 * Format scale factor as percentage for display
 */
export function formatScalePercentage(scale: number): string {
  return `${Math.round(scale * 100)}%`;
}
