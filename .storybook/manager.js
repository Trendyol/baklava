import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'Grace Design System',
  brandUrl: 'https://github.com/Trendyol/grace',
  colorPrimary: '#F27A1A',
  colorSecondary: '#F27A1A',
  fontBase: 'Equinor, sans-serif',
  fontCode:
    '"Operator Mono","Fira Code Retina","Fira Code","FiraCode-Retina","Andale Mono","Lucida Console",Consolas,Monaco,monospace',
});

addons.setConfig({ theme });
