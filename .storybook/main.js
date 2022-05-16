const path = require('path');

module.exports = {
  logLevel: 'debug',
  stories: [
    '../*.md',
    '../docs/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  features: {
    postcss: false,
    interactionsDebugger: true,
    buildStoriesJson: true,
  },
  framework: '@storybook/web-components',
  webpackFinal: async config => {
    const gracePath = path.join(__dirname, '..', 'dist');
    config.resolve.alias['@trendyol-js/grace'] = path.resolve(
      gracePath,
      'grace.js'
    );
    return config;
  },
};
