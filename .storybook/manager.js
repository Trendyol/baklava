import { addons } from "@storybook/manager-api";
import { lightTheme } from "./baklava-theme";

// Set static light theme for Storybook UI
// Dark mode only affects the iframe preview, not the sidebar/toolbar
addons.setConfig({
  theme: lightTheme,
  sidebar: {
    showRoots: true,
  },
});
