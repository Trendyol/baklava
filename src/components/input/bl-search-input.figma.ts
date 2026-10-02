// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=2043-4078
// component=bl-input
// source=https://github.com/Trendyol/baklava/blob/next/src/components/input/bl-input.ts
import figma from "figma";

const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});
const loading = figma.selectedInstance.getEnum("State", {
  Loading: true,
  Default: false,
  Focused: false,
  Typing: false,
  Searched: false,
});

export default {
  example: figma.html`<bl-input type="search" size="${size}" ${
    loading ? "loading" : ""
  }></bl-input>`,
  id: "bl-input",
  metadata: { nestable: true },
};
