// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=21160-8194
// component=bl-input
// source=https://github.com/Trendyol/baklava/blob/next/src/components/input/bl-input.ts
import figma from "figma";

const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});
const label = figma.selectedInstance.getString("Label Text");
const value = figma.selectedInstance.getString("Input Text");
const helpText = figma.selectedInstance.getString("Helper Text");
const required = figma.selectedInstance.getBoolean("Asterix");
const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
  Default: false,
  Typing: false,
  Entered: false,
  Danger: false,
  Success: false,
});

export default {
  example: figma.html`<bl-input size="${size}" label="${label}" value="${value}" help-text="${helpText}" ${
    required ? "required" : ""
  } ${disabled ? "disabled" : ""}></bl-input>`,
  id: "bl-input",
  metadata: { nestable: true },
};
