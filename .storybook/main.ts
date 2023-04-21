import { StorybookConfig } from '@storybook/web-components-vite';
import remarkGfm from 'remark-gfm';

const TITLE = 'Baklava Design System';
const configureWebpack = async (config, { configType }) => {
  if (configType === 'PRODUCTION') {
    for (const plugin of config.plugins) {
      if (plugin.__proto__.constructor.name === 'HtmlWebpackPlugin') {
        plugin.options.title = TITLE;
      }
    }
  }
  return config;
};
const config: StorybookConfig = {
  stories: ['../docs/**/*.mdx', '../src/**/*.mdx', '../src/**/*.stories.ts'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-docs',
      // options: {
      //   mdxPluginOptions: {
      //     mdxCompileOptions: {
      //       remarkPlugins: [remarkGfm],
      //     },
      //   },
      // },
    },
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
