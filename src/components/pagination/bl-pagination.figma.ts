// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=21089-5031
// component=bl-pagination
// source=https://github.com/Trendyol/baklava/blob/next/src/components/pagination/bl-pagination.ts
import figma from "figma";

const hasJumper = figma.selectedInstance.getBoolean("Jumper");
const hasSelect = figma.selectedInstance.getBoolean("Items Per Page");

export default {
  example: figma.html`<bl-pagination ${hasJumper ? "has-jumper" : ""} ${
    hasSelect ? "has-select" : ""
  }></bl-pagination>`,
  id: "bl-pagination",
  metadata: { nestable: true },
};
