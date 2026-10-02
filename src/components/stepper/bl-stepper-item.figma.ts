// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=22272-9989
// component=bl-stepper-item
// source=https://github.com/Trendyol/baklava/blob/next/src/components/stepper/bl-stepper-item.ts
import figma from "figma";

const variant = figma.selectedInstance.getEnum("Status", {
  Default: "default",
  Active: "active",
  Success: "success",
  Error: "error",
  Hover: "default",
});
const description = figma.selectedInstance.getString("Description of step");

export default {
  example: figma.html`<bl-stepper-item variant="${variant}" description="${description}"></bl-stepper-item>`,
  id: "bl-stepper-item",
  metadata: { nestable: true },
};
