export const styleToPixelConverter = (styleValue: string): number | null => {
  const match = styleValue.match(/^(\d+(\.\d+)?)(.*)$/);

  if (!match) return null;

  const value = parseFloat(match[1]);
  const unit = match[3];

  let styleInPixel: number | null;

  switch (unit) {
    case "px":
      styleInPixel = value;
      break;
    case "vw":
      styleInPixel = (value * window.innerWidth) / 100;
      break;
    case "%":
      styleInPixel = (value * window.innerWidth) / 100;
      break;
    default:
      styleInPixel = null;
      break;
  }
  return styleInPixel;
};
