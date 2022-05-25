const path = require('path');

module.exports = {
  logLevel: 'debug',
  stories: ['../*.md', '../docs/**/*.stories.mdx', '../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
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
