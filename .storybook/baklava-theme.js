import { create } from '@storybook/theming';

/**
 * Light Theme for Storybook UI
 * Colors based on Storybook's default light theme and Baklava brand colors
 */
export const lightTheme = create({
  base: 'light',

  // Brand
  brandTitle: 'Baklava Design System',
  brandUrl: 'https://github.com/Trendyol/baklava',
  brandImage: 'https://user-images.githubusercontent.com/127687/230370329-71295041-f5fc-4e12-8bf5-f37e98831efb.svg',

  // Colors
  colorPrimary: '#F27A1A',
  colorSecondary: '#273142',

  // UI
  appBg: '#F6F9FC',
  appContentBg: '#F6F9FC',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e6e6e6',
  appBorderRadius: 4,

  // Typography
  fontBase: 'RubikVariable, sans-serif',
  fontCode: '"Operator Mono","Fira Code Retina","Fira Code","FiraCode-Retina","Andale Mono","Lucida Console",Consolas,Monaco,monospace',
  textColor: '#273142',
  textInverseColor: '#ffffff',
  textMutedColor: '#666666',

  // Toolbar
  barTextColor: '#273142',
  barSelectedColor: '#F27A1A',
  barBg: '#ffffff',
  barHoverColor: '#F27A1A',

  // Form
  inputBg: '#ffffff',
  inputBorder: '#e6e6e6',
  inputTextColor: '#273142',
  inputBorderRadius: 4,

  // Button
  buttonBg: '#F6F9FC',
  buttonBorder: '#D9E8F2',
});

export default lightTheme;
