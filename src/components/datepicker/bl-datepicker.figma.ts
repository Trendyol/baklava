// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=18070-11159
// component=bl-datepicker
// source=https://github.com/Trendyol/baklava/blob/next/src/components/datepicker/bl-datepicker.ts
import figma from "figma";

const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
  Default: false,
  Focused: false,
  Selecting: false,
  Entered: false,
});

export default {
  example: figma.html`<bl-datepicker ${disabled ? "disabled" : ""}></bl-datepicker>`,
  id: "bl-datepicker",
  metadata: { nestable: true },
};
