module.exports = {
  stories: [
    '../*.md',
    '../docs/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  features: {
    postcss: false,
  },
  framework: '@storybook/web-components'
}
