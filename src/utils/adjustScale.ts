import { testHeight } from "./testHeight";

const A4_HEIGHT = 1122; // 297mm at 96dpi
const HEIGHT_THRESHOLD = 5; // Consider heights equal if within 5px

/**
 * Flexibly adjusts scale in a given direction to fit content on A4 page
 * @param element The DOM element to measure
 * @param currentHeight The current rendered height in pixels
 * @param previousScale The previous scale factor (starting point)
 * @param direction 1 to scale up, -1 to scale down
 * @param scaleLimit The limit to stop at (MIN_SCALE or MAX_SCALE)
 * @param SCALE_STEP The amount to adjust scale per iteration
 * @returns The optimal scale factor, or undefined if not found
 */
export function adjustScale(
  element: HTMLElement | undefined,
  currentHeight: number,
  previousScale: number,
  direction: 1 | -1,
  scaleLimit: number,
  SCALE_STEP: number
): number | undefined {
  let testScale = previousScale;
  let iterations = 0;
  const maxIterations =
    Math.round(Math.abs(scaleLimit - previousScale) / SCALE_STEP) + 5;

  // Iteratively adjust scale and measure actual resulting height
  while (
    (direction === -1 ? testScale >= scaleLimit : testScale <= scaleLimit) &&
    iterations < maxIterations
  ) {
    const measuredHeight = testHeight(element, testScale, currentHeight);

    // Check if this scale achieves the target
    if (direction === -1) {
      // Scaling down: check if content fits
      if (measuredHeight <= A4_HEIGHT + HEIGHT_THRESHOLD) {
        return testScale;
      }
    } else {
      // Scaling up: check if we've reached optimal size
      if (measuredHeight >= A4_HEIGHT - HEIGHT_THRESHOLD) {
        return testScale;
      }
    }

    // Adjust scale further in the direction
    testScale =
      direction === -1
        ? Math.max(scaleLimit, testScale - SCALE_STEP)
        : Math.min(scaleLimit, testScale + SCALE_STEP);
    iterations++;
  }

  return undefined; // No optimal scale found within limits
}
