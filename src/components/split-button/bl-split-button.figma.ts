// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=833-436
// component=bl-split-button
// source=https://github.com/Trendyol/baklava/blob/next/src/components/split-button/bl-split-button.ts
import figma from "figma";

const variant = figma.selectedInstance.getEnum("Variant", {
  Primary: "primary",
  Secondary: "secondary",
});
const kind = figma.selectedInstance.getEnum("Kind", {
  Default: "default",
  Neutral: "neutral",
  Success: "success",
  Danger: "danger",
  Disabled: "default",
});
const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});
const disabled = figma.selectedInstance.getEnum("Kind", {
  Default: false,
  Neutral: false,
  Success: false,
  Danger: false,
  Disabled: true,
});

export default {
  example: figma.html`<bl-split-button variant="${variant}" kind="${kind}" size="${size}" ${
    disabled ? "disabled" : ""
  }></bl-split-button>`,
  id: "bl-split-button",
  metadata: { nestable: true },
};
