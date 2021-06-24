


module.exports = async ({ config, mode }) => {
  config.resolve.extensions.push('.ts', '.tsx', '.scss')
  config.module.rules.push({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        },
      }
    ],
  });
  config.module.rules.push({
    test: /\.svg$/,
    use: ['url-loader'],
  })
  /*   config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-inline-loader',
    }); */
  config.module.rules.push({ test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] });
  config.node = { fs: 'empty' };
  return config;
};
