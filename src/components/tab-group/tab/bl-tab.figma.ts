// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=11061-20745
// component=bl-tab
// source=https://github.com/Trendyol/baklava/blob/next/src/components/tab-group/tab/bl-tab.ts
import figma from "figma";

const selected = figma.selectedInstance.getEnum("Status", {
  Active: true,
  Default: false,
  Disabled: false,
});
const disabled = figma.selectedInstance.getEnum("Status", {
  Disabled: true,
  Default: false,
  Active: false,
});
const notify = figma.selectedInstance.getBoolean("Notification");

export default {
  example: figma.html`<bl-tab ${selected ? "selected" : ""} ${disabled ? "disabled" : ""} ${
    notify ? "notify" : ""
  }></bl-tab>`,
  id: "bl-tab",
  metadata: { nestable: true },
};
