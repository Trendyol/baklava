const TITLE = 'Baklava Design System';
const configureWebpack = async (config, {
  configType
}) => {
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
  stories: ['../src/**/*.stories.mdx'],
  addons: ['@storybook/addon-links', {
    name: '@storybook/addon-docs',
    options: {
      transcludeMarkdown: true
    }
  }, '@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/addon-interactions', '@storybook/addon-viewport', '@storybook/addon-mdx-gfm'],
  features: {
    postcss: false,
    interactionsDebugger: true,
    buildStoriesJson: true
  },
  framework: {
    name: '@storybook/web-components-webpack5',
    options: {}
  },
  staticDirs: ['../dist', {
    from: './assets',
    to: '/assets'
  }],
  webpackFinal: configureWebpack,
  managerWebpack: configureWebpack,
  docs: {
    autodocs: true
  }
};
