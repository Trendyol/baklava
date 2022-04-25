const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  staticDirs: ['./static'],
  stories: ['../docs/**/*.mdx', '../src/components/**/*.stories.@(js|ts|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-a11y',
  ],
  webpackFinal: async config => {
    /**
     * Delete the ProgressPlugin from Storybook to remove log file spam.
     */
    const progressKey = config.plugins.findIndex(
      v => v.constructor.name === 'ProgressPlugin'
    );
    config.plugins.splice(progressKey, 1);

    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('postcss-import'),
                require('postcss-preset-env')({ stage: 1 }),
              ],
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../src/'),
    });

    return config;
  },
};
