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
    // {
    //   name: '@storybook/addon-docs',
    //   options: {
    //     sourceLoaderOptions: {
    //       injectStoryParameters: false,
    //     },
    //   },
    // },
  ],
  features: {
    postcss: false,
    interactionsDebugger: true,
    buildStoriesJson: true,
  },
  framework: '@storybook/web-components',
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.stories\.mdx?$/,
      use: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: { parser: 'js' },
        },
      ],
      enforce: 'pre',
    });

    // config.module.rules.push({
    //   test: /\.css|\.s(c|a)ss$/,
    //   use: [{
    //     loader: 'lit-css-loader',
    //   }],
    // });

    return config;
  },
};
