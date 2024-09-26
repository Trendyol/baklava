type Direction = "ltr" | "rtl" | "null" | "";

/**
 * Gets the computed direction property of the document element.
 *
 * @returns The direction property of the document element, as "ltr", "rtl", or "null".
 */
export function getDirection(): Direction {
  const direction = getComputedStyle(document.documentElement).getPropertyValue("direction");

  return direction as Direction;
}

/**
 * Sets the direction property on the document element based on the computed style.
 */

export function setDirectionProperty(element: Element): void {
  const direction = getDirection();

  element.setAttribute("dir", direction);
}
