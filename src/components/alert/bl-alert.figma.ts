// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=13637-46191
// component=bl-alert
// source=https://github.com/Trendyol/baklava/blob/next/src/components/alert/bl-alert.ts
import figma from "figma";

const variant = figma.selectedInstance.getEnum("Variant", {
  Informational: "info",
  Success: "success",
  Warning: "warning",
  Error: "danger",
});
const closable = figma.selectedInstance.getBoolean("Close");

export default {
  example: figma.html`<bl-alert variant="${variant}" ${closable ? "closable" : ""}></bl-alert>`,
  id: "bl-alert",
  metadata: { nestable: true },
};
