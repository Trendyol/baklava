const esbuild = require('esbuild');
const parseArgs = require('minimist');
const del = require('del');
const { litCssPlugin } = require('esbuild-plugin-lit-css');

const args = parseArgs(process.argv.slice(2), {
  boolean: true,
});

(async () => {
  const { globby } = await import('globby');
  const destinationPath = 'dist';
  const isProduction = process.env.NODE_ENV === 'production';

  try {
    const buildOptions = {
      entryPoints: [
        'src/baklava.ts',
        'src/baklava-react.ts',
        ...(await globby([
          'src/components/**/!(*.(test|d)).ts',
          'src/themes/*.css',
          'src/components/**/*.svg',
        ])),
      ],
      loader: {
        '.woff': 'file',
        '.woff2': 'file',
        '.svg': 'file',
      },
      outdir: args.serve ? undefined : destinationPath,
      assetNames: 'assets/[name]',
      bundle: true,
      sourcemap: true,
      format: 'esm',
      target: ['es2020', 'chrome73', 'edge79', 'firefox63', 'safari12'],
      splitting: true,
      metafile: true,
      minify: true,
      external: ['react'],
      plugins: [
        litCssPlugin({
          uglify: true,
          filter: /components\/.*\.css$/,
          // Match line containing ':hover'
          transform: (content) => isProduction ? content : content.replace(/.*:hover[^{]*/g, matched => {
            // Replace :hover with special class. (There will be additional classes for focus, etc. Should be implemented in here.)
            const replacedWithNewClass = matched.replace(/:hover/, '.__ONLY_FOR_STORYBOOK_DEMONSTRATION_HOVER__')
            // Concat strings
            return matched.concat(', ', replacedWithNewClass)
          })
        }),
      ],
    };

    if (args.serve) {
      const { host, port } = await esbuild.serve(
        {
          servedir: 'playground',
          host: 'localhost',
        },
        buildOptions
      );

      console.log(`Playground is served on http://${host}:${port}`);

      return;
    }

    const buildResult = await esbuild.build(buildOptions);

    if (buildResult.errors.length > 0) {
      console.table(buildResult.errors);
      console.error('Build Failed!');
      return;
    }

    if (buildResult.warnings.length > 0) {
      console.warn('Warnings:');
      console.table(buildResult.warnings);
    }

    const analyzeResult = Object.entries(buildResult.metafile.outputs)
      .map(([fileName, data]) => ({
        fileName,
        size: `${(data.bytes / 1024).toFixed(2)} KB`,
      }))
      .filter(
        ({ fileName }) =>
          !/icon\/icons\/.*\.js/.test(fileName) &&
          (fileName.endsWith('.js') || fileName.endsWith('.css'))
      );

    del(`${destinationPath}/components/icon/icons`);

    console.table(analyzeResult, ['fileName', 'size']);

    console.info('Build Done!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
