import { create } from '@storybook/theming';

export const lightTheme = create({
  base: 'light',
  brandTitle: 'Baklava Design System',
  brandUrl: 'https://github.com/Trendyol/baklava',
  brandImage: 'https://user-images.githubusercontent.com/127687/230370329-71295041-f5fc-4e12-8bf5-f37e98831efb.svg',
  colorPrimary: '#F27A1A',
  colorSecondary: '#273142',

  // UI
  appBg: '#F6F9FC',
  appContentBg: '#F6F9FC',
  appBorderColor: '#e6e6e6',
  appBorderRadius: 4,

  // Typography
  fontBase: 'RubikVariable, sans-serif',
  fontCode:
    '"Operator Mono","Fira Code Retina","Fira Code","FiraCode-Retina","Andale Mono","Lucida Console",Consolas,Monaco,monospace',
  textColor: '#273142',
  textInverseColor: '#ffffff',
  textMutedColor: '#666666',

  // Toolbar default and active colors
  barTextColor: '#273142',
  barSelectedColor: '#F27A1A',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#cccccc',
  inputTextColor: '#273142',
  inputBorderRadius: 4,
});

export const darkTheme = create({
  base: 'dark',
  brandTitle: 'Baklava Design System',
  brandUrl: 'https://github.com/Trendyol/baklava',
  brandImage: 'https://user-images.githubusercontent.com/127687/230370329-71295041-f5fc-4e12-8bf5-f37e98831efb.svg',
  colorPrimary: '#F27A1A',
  colorSecondary: '#E6E9F0',

  // UI - Siyah arka plan
  appBg: '#000000',
  appContentBg: '#0a0a0a',
  appBorderColor: '#1a1a1a',
  appBorderRadius: 4,

  // Typography
  fontBase: 'RubikVariable, sans-serif',
  fontCode:
    '"Operator Mono","Fira Code Retina","Fira Code","FiraCode-Retina","Andale Mono","Lucida Console",Consolas,Monaco,monospace',
  textColor: '#E6E9F0',
  textInverseColor: '#273142',
  textMutedColor: '#999999',

  // Toolbar default and active colors - Siyah arka plan
  barTextColor: '#E6E9F0',
  barSelectedColor: '#F27A1A',
  barBg: '#000000',

  // Form colors
  inputBg: '#1a1a1a',
  inputBorder: '#333333',
  inputTextColor: '#E6E9F0',
  inputBorderRadius: 4,
});

// Default export light theme for backwards compatibility
export default lightTheme;
