import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'Baklava Design System',
  brandUrl: 'https://github.com/Trendyol/baklava',
  colorPrimary: '#F27A1A',
  colorSecondary: '#273142',
  fontBase: 'RubikVariable, sans-serif',
  fontCode:
    '"Operator Mono","Fira Code Retina","Fira Code","FiraCode-Retina","Andale Mono","Lucida Console",Consolas,Monaco,monospace',
});

addons.setConfig({ theme });
