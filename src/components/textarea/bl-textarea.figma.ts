// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=13455-44085
// component=bl-textarea
// source=https://github.com/Trendyol/baklava/blob/next/src/components/textarea/bl-textarea.ts
import figma from "figma";

const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});
const expand = figma.selectedInstance.getBoolean("Resize_Indicator");
const characterCounter = figma.selectedInstance.getBoolean("Character Counter");
const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
  Default: false,
  Focused: false,
  Typing: false,
  Entered: false,
  Danger: false,
});

export default {
  example: figma.html`<bl-textarea size="${size}" ${expand ? "expand" : ""} ${
    characterCounter ? "character-counter" : ""
  } ${disabled ? "disabled" : ""}></bl-textarea>`,
  id: "bl-textarea",
  metadata: { nestable: true },
};
