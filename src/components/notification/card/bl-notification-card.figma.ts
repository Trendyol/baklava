// url=https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=13586-45020
// component=bl-notification-card
// source=https://github.com/Trendyol/baklava/blob/next/src/components/notification/card/bl-notification-card.ts
import figma from "figma";

const variant = figma.selectedInstance.getEnum("Type", {
  Informational: "info",
  Success: "success",
  Warning: "warning",
  Error: "error",
});
const icon = figma.selectedInstance.getBoolean("Icon");

export default {
  example: figma.html`<bl-notification-card variant="${variant}" icon="${icon}"></bl-notification-card>`,
  id: "bl-notification-card",
  metadata: { nestable: true },
};
