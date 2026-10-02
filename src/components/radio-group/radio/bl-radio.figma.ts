// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=130-401
// component=bl-radio
// source=https://github.com/Trendyol/baklava/blob/next/src/components/radio-group/radio/bl-radio.ts
import figma from "figma";

const disabled = figma.selectedInstance.getBoolean("Disabled");
const label = figma.selectedInstance.getString("Label Text");

export default {
  example: figma.html`<bl-radio ${disabled ? "disabled" : ""}>${label}</bl-radio>`,
  id: "bl-radio",
  metadata: { nestable: true },
};
