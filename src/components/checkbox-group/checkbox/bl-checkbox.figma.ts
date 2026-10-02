// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=130-7
// component=bl-checkbox
// source=https://github.com/Trendyol/baklava/blob/next/src/components/checkbox-group/checkbox/bl-checkbox.ts
import figma from "figma";

const checked = figma.selectedInstance.getEnum("State", {
  Selected: true,
  Default: false,
  Indeterminate: false,
  Danger: false,
  Hover: false,
});
const indeterminate = figma.selectedInstance.getEnum("State", {
  Indeterminate: true,
  Default: false,
  Selected: false,
  Danger: false,
  Hover: false,
});
const disabled = figma.selectedInstance.getBoolean("Disabled");
const label = figma.selectedInstance.getString("Label text");

export default {
  example: figma.html`<bl-checkbox ${checked ? "checked" : ""} ${
    indeterminate ? "indeterminate" : ""
  } ${disabled ? "disabled" : ""}>${label}</bl-checkbox>`,
  id: "bl-checkbox",
  metadata: { nestable: true },
};
