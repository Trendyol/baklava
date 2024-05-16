export function getMiddleOfElement(element: Element) {
  const { x, y, width, height } = element.getBoundingClientRect();

  return {
    x: Math.floor(x + window.pageXOffset + width / 2),
    y: Math.floor(y + window.pageYOffset + height / 2),
  };
}

export function getTarget(value: string | Element): Element | null {
  if (typeof value === "string") {
    return document.getElementById(value) as Element;
  } else if (value instanceof Element) {
    return value;
  }

  return null;
}
