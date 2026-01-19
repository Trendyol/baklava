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

/**
 * Dark Theme for Storybook UI
 * Dark backgrounds with Baklava brand colors
 */
export const darkTheme = create({
  base: 'dark',

  // Brand
  brandTitle: 'Baklava Design System',
  brandUrl: 'https://github.com/Trendyol/baklava',
  brandImage: 'https://user-images.githubusercontent.com/127687/230370329-71295041-f5fc-4e12-8bf5-f37e98831efb.svg',

  // Colors
  colorPrimary: '#F27A1A',
  colorSecondary: '#F27A1A',

  // UI - Dark backgrounds
  appBg: '#141414',
  appContentBg: '#1a1a1a',
  appPreviewBg: '#0a0a0a',
  appBorderColor: '#2d2d2d',
  appBorderRadius: 4,

  // Typography
  fontBase: 'RubikVariable, sans-serif',
  fontCode: '"Operator Mono","Fira Code Retina","Fira Code","FiraCode-Retina","Andale Mono","Lucida Console",Consolas,Monaco,monospace',
  textColor: '#E6E9F0',
  textInverseColor: '#273142',
  textMutedColor: '#9a9a9a',

  // Toolbar - Dark background
  barTextColor: '#E6E9F0',
  barSelectedColor: '#F27A1A',
  barBg: '#1a1a1a',
  barHoverColor: '#F27A1A',

  // Form
  inputBg: '#242424',
  inputBorder: '#3d3d3d',
  inputTextColor: '#E6E9F0',
  inputBorderRadius: 4,

  // Button
  buttonBg: '#242424',
  buttonBorder: '#3d3d3d',
});

// Default export light theme for backwards compatibility
export default lightTheme;
