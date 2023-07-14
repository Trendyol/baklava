import { StorybookConfig } from '@storybook/web-components-vite';

export const title = 'Baklava Design System';

const config: StorybookConfig = {
  stories: ['../docs/**/*.mdx', '../src/**/*.mdx', '../src/**/*.stories.ts'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-viewport',
    '@storybook/addon-mdx-gfm',
  ],
  features: {
    buildStoriesJson: true,
  },
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  staticDirs: [
    '../dist',
    {
      from: './assets',
      to: '/assets',
    },
  ],
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },
};

export default config;
