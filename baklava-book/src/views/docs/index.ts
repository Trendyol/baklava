// Documentation page components
export { default as WelcomePage } from "./WelcomePage.vue";
export { default as UsingBaklavaInVue } from "./UsingBaklavaInVue.vue";
export { default as UsingBaklavaInReact } from "./UsingBaklavaInReact.vue";
export { default as UsingBaklavaInNext } from "./UsingBaklavaInNext.vue";
export { default as CustomizingTheme } from "./CustomizingTheme.vue";
export { default as RequirementsPage } from "./RequirementsPage.vue";
export { default as RTLSupportPage } from "./RTLSupportPage.vue";
export { default as LocalizationPage } from "./LocalizationPage.vue";
export { default as HowToCustomizePage } from "./HowToCustomizePage.vue";
export { default as ContributingPage } from "./ContributingPage.vue";
export { default as CommitRulesPage } from "./CommitRulesPage.vue";
export { default as TestingPage } from "./TestingPage.vue";
export { default as LintingPage } from "./LintingPage.vue";

// Map slug to component
import type { Component } from "vue";

import WelcomePage from "./WelcomePage.vue";
import UsingBaklavaInVue from "./UsingBaklavaInVue.vue";
import UsingBaklavaInReact from "./UsingBaklavaInReact.vue";
import UsingBaklavaInNext from "./UsingBaklavaInNext.vue";
import CustomizingTheme from "./CustomizingTheme.vue";
import RequirementsPage from "./RequirementsPage.vue";
import RTLSupportPage from "./RTLSupportPage.vue";
import LocalizationPage from "./LocalizationPage.vue";
import HowToCustomizePage from "./HowToCustomizePage.vue";
import ContributingPage from "./ContributingPage.vue";
import CommitRulesPage from "./CommitRulesPage.vue";
import TestingPage from "./TestingPage.vue";
import LintingPage from "./LintingPage.vue";

export const docComponents: Record<string, Component> = {
  welcome: WelcomePage,
  "using-baklava-in-vue": UsingBaklavaInVue,
  "using-baklava-in-react": UsingBaklavaInReact,
  "using-baklava-in-next": UsingBaklavaInNext,
  "customizing-baklava-theme": CustomizingTheme,
  requirements: RequirementsPage,
  "rtl-support": RTLSupportPage,
  localization: LocalizationPage,
  "how-to-customize-a-components-style": HowToCustomizePage,
  contributing: ContributingPage,
  "commit-rules": CommitRulesPage,
  testing: TestingPage,
  linting: LintingPage,
};
