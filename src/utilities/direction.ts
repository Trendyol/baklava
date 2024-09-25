/**
 * Sets the direction property on the document element based on the computed style.
 */
export function setDirectionProperty(element: Element): void {
  const direction = getComputedStyle(document.documentElement).getPropertyValue("direction") as
    | "ltr"
    | "rtl";

  element.setAttribute("dir", direction);
}
