/**
 * Tests the height of an element at a given scale factor
 * @param element The DOM element to measure
 * @param testScale The scale factor to test
 * @param currentHeight The original height as fallback
 * @returns The measured height at the given scale
 */
export function testHeight(
  element: HTMLElement | undefined,
  testScale: number,
  currentHeight: number
): number {
  if (!element) {
    // Fallback to linear estimation if element not provided
    return currentHeight * testScale;
  }

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

  return measuredHeight;
}
