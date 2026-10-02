// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=22273-5434
// component=bl-stepper
// source=https://github.com/Trendyol/baklava/blob/next/src/components/stepper/bl-stepper.ts
import figma from "figma";

const type = figma.selectedInstance.getEnum("Type", {
  Dot: "dot",
  Icon: "icon",
  Number: "number",
});
const direction = figma.selectedInstance.getEnum("Direction", {
  Horizontal: "horizontal",
  Vertical: "vertical",
});

export default {
  example: figma.html`<bl-stepper type="${type}" direction="${direction}"></bl-stepper>`,
  id: "bl-stepper",
  metadata: { nestable: true },
};
