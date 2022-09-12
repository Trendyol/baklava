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

module.exports = {
  stories: ['../*.md', '../docs/**/*.stories.mdx', '../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-docs',
      options: { transcludeMarkdown: true },
    },
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-viewport',
  ],
  features: {
    postcss: false,
    interactionsDebugger: true,
    buildStoriesJson: true,
  },
  framework: '@storybook/web-components',
  staticDirs: ['../dist'],
  webpackFinal: configureWebpack,
  managerWebpack: configureWebpack,
};
