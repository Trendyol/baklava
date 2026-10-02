// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=21618-4276
// component=bl-tag
// source=https://github.com/Trendyol/baklava/blob/next/src/components/tag/bl-tag.ts
import figma from "figma";

const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});
const variant = figma.selectedInstance.getEnum("Type", {
  Selectable: "selectable",
  Removable: "removable",
});
const selected = figma.selectedInstance.getEnum("State", {
  Selected: true,
  Default: false,
  Hover: false,
  Disabled: false,
});
const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
  Default: false,
  Hover: false,
  Selected: false,
});

export default {
  example: figma.html`<bl-tag size="${size}" variant="${variant}" ${selected ? "selected" : ""} ${
    disabled ? "disabled" : ""
  }></bl-tag>`,
  id: "bl-tag",
  metadata: { nestable: true },
};
