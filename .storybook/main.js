module.exports = {
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
  staticDirs: ['../dist'],
};
