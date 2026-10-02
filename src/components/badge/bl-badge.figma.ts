// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=1623-2036
// component=bl-badge
// source=https://github.com/Trendyol/baklava/blob/next/src/components/badge/bl-badge.ts
import figma from "figma";

const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});

export default {
  example: figma.html`<bl-badge size="${size}"></bl-badge>`,
  id: "bl-badge",
  metadata: { nestable: true },
};
