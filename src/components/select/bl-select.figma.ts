// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=981-557
// component=bl-select
// source=https://github.com/Trendyol/baklava/blob/next/src/components/select/bl-select.ts
import figma from "figma";

const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});
const label = figma.selectedInstance.getString("Label Text");
const helpText = figma.selectedInstance.getString("Helper Text");
const required = figma.selectedInstance.getBoolean("Asterix");
const clearable = figma.selectedInstance.getBoolean("Clear Button");
const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
  Default: false,
  Focused: false,
  Selected: false,
  "Selected Focused": false,
  Danger: false,
  Success: false,
  "Search Focused": false,
  "Search Typing": false,
});

export default {
  example: figma.html`<bl-select size="${size}" label="${label}" help-text="${helpText}" ${
    required ? "required" : ""
  } ${clearable ? "clearable" : ""} ${disabled ? "disabled" : ""}></bl-select>`,
  id: "bl-select",
  metadata: { nestable: true },
};
