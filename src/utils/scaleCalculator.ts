export const MIN_SCALE = 0.6;
export const MAX_SCALE = 1.0;
const A4_HEIGHT = 1122; // 297mm at 96dpi
const SCALE_STEP = 0.01; // Reduce scale by this amount per iteration
const HEIGHT_THRESHOLD = 5; // Consider heights equal if within 5px

export interface ScaleResult {
  scaleFactor: number;
  showWarning: boolean;
}

/**
 * Calculates the optimal scale factor to fit content on a single A4 page.
 * Uses an iterative approach: reduces scale by 0.01 increments and checks
 * the resulting height, continuing until content fits within A4_HEIGHT or
 * reaches MIN_SCALE.
 *
 * @param currentHeight The current rendered height in pixels
 * @param previousScale The previous scale factor (starting point)
 * @param element The DOM element to measure (optional, for future virtual height calculation)
 * @returns Object with new scale factor and warning flag
 */
export function calculateOptimalScale(
  currentHeight: number,
  previousScale: number,
  element?: HTMLElement
): ScaleResult {
  // If content already fits on one page, no scaling needed
  if (currentHeight <= A4_HEIGHT) {
    return {
      scaleFactor: previousScale,
      showWarning: false,
    };
  }

  // Start from previous scale and iteratively reduce until content fits
  let testScale = previousScale;
  let iterations = 0;
  const maxIterations =
    Math.round((previousScale - MIN_SCALE) / SCALE_STEP) + 5;

  // Iteratively reduce scale and measure actual resulting height
  while (testScale >= MIN_SCALE && iterations < maxIterations) {
    // Apply the scale factor via CSS variable and measure actual rendered height
    if (element) {
      // Store original style
      const originalStyle = element.getAttribute("style");

      // Apply scale via CSS variable
      element.style.setProperty("--scale-factor", testScale.toString());

      // Measure the actual height with this scale applied
      const measuredHeight = element.scrollHeight;

      // Restore original style
      if (originalStyle) {
        element.setAttribute("style", originalStyle);
      } else {
        element.removeAttribute("style");
      }

      // Check if this scale would fit the content on A4
      if (measuredHeight <= A4_HEIGHT + HEIGHT_THRESHOLD) {
        return {
          scaleFactor: testScale,
          showWarning: false,
        };
      }
    } else {
      // Fallback to linear estimation if element not provided
      const estimatedHeight = currentHeight * testScale;
      if (estimatedHeight <= A4_HEIGHT + HEIGHT_THRESHOLD) {
        return {
          scaleFactor: testScale,
          showWarning: false,
        };
      }
    }

    // Not fit yet, reduce scale further
    testScale = Math.max(MIN_SCALE, testScale - SCALE_STEP);
    iterations++;
  }

  // Reached minimum scale without fitting
  const showWarning = testScale === MIN_SCALE;

  return {
    scaleFactor: MIN_SCALE,
    showWarning,
  };
}

/**
 * Format scale factor as percentage for display
 */
export function formatScalePercentage(scale: number): string {
  return `${Math.round(scale * 100)}%`;
}
