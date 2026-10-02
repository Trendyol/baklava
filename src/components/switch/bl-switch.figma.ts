// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=130-21
// component=bl-switch
// source=https://github.com/Trendyol/baklava/blob/next/src/components/switch/bl-switch.ts
import figma from "figma";

const checked = figma.selectedInstance.getBoolean("Active");
const disabled = figma.selectedInstance.getBoolean("Disabled");

export default {
  example: figma.html`<bl-switch ${checked ? "checked" : ""} ${
    disabled ? "disabled" : ""
  }></bl-switch>`,
  id: "bl-switch",
  metadata: { nestable: true },
};
