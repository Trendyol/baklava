// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=17211-8926
// component=bl-accordion
// source=https://github.com/Trendyol/baklava/blob/next/src/components/accordion-group/accordion/bl-accordion.ts
import figma from "figma";

const open = figma.selectedInstance.getBoolean("Open");
const disabled = figma.selectedInstance.getBoolean("Disabled");

export default {
  example: figma.html`<bl-accordion ${open ? "open" : ""} ${
    disabled ? "disabled" : ""
  }></bl-accordion>`,
  id: "bl-accordion",
  metadata: { nestable: true },
};
