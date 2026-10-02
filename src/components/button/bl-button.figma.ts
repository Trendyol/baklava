// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=125-0
// component=bl-button
// source=https://github.com/Trendyol/baklava/blob/next/src/components/button/bl-button.ts
import figma from "figma";

const variant = figma.selectedInstance.getEnum("Variant", {
  Primary: "primary",
  Secondary: "secondary",
  Tertiary: "tertiary",
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
  XLarge: "large",
});
const disabled = figma.selectedInstance.getEnum("Kind", {
  Default: false,
  Neutral: false,
  Success: false,
  Danger: false,
  Disabled: true,
});
const label = figma.selectedInstance.getString("Text");

export default {
  example: figma.html`<bl-button variant="${variant}" kind="${kind}" size="${size}" ${
    disabled ? "disabled" : ""
  }>${label}</bl-button>`,
  id: "bl-button",
  metadata: { nestable: true },
};
