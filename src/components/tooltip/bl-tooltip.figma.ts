// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=1906-3105
// component=bl-tooltip
// source=https://github.com/Trendyol/baklava/blob/next/src/components/tooltip/bl-tooltip.ts
import figma from "figma";

const placement = figma.selectedInstance.getEnum("Position", {
  Top: "top",
  "Top Left": "top-start",
  "Top Right": "top-end",
  Bottom: "bottom",
  "Bottom Left": "bottom-start",
  "Bottom Right": "bottom-end",
  Left: "left",
  "Left Top": "left-start",
  "Left Bottom": "left-end",
  Right: "right",
  "Right Top": "right-start",
  "Right Bottom": "right-end",
});

export default {
  example: figma.html`<bl-tooltip placement="${placement}"></bl-tooltip>`,
  id: "bl-tooltip",
  metadata: { nestable: true },
};
