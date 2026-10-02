// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=20722-2553
// component=bl-link
// source=https://github.com/Trendyol/baklava/blob/next/src/components/link/bl-link.ts
import figma from "figma";

const kind = figma.selectedInstance.getEnum("State", {
  Primary: "primary",
  Neutral: "neutral",
});
const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});

export default {
  example: figma.html`<bl-link kind="${kind}" size="${size}"></bl-link>`,
  id: "bl-link",
  metadata: { nestable: true },
};
