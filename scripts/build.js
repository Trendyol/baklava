const esbuild = require('esbuild');
const parseArgs = require('minimist');
const { litCssPlugin } = require('esbuild-plugin-lit-css');

const args = parseArgs(process.argv.slice(2), {
  boolean: true,
});

(async () => {
  const { globby } = await import('globby');

  const buildOptions = {
    entryPoints: [
      'src/grace.ts',
      ...(await globby([
        'src/components/**/!(*.(test|d)).ts',
        'src/themes/*.css',
      ])),
    ],
    loader: {
      '.woff': 'file',
      '.woff2': 'file',
    },
    outdir: args.serve ? undefined : 'dist',
    bundle: true,
    sourcemap: true,
    format: 'esm',
    target: 'es2017',
    splitting: true,
    metafile: true,
    minify: true,
    plugins: [
      litCssPlugin({
        filter: /components\/.*\.css$/,
      }),
    ],
  };

  try {
    if (args.serve) {
      console.log(`serving...`);
      const { host, port } = await esbuild.serve(
        {
          servedir: 'playground',
        },
        buildOptions
      );

      console.log(`Playground is ready on ${host}:${port}`);
    } else {
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
            fileName.endsWith('.js') || fileName.endsWith('.css')
        );

      console.table(analyzeResult, ['fileName', 'size']);

      console.info('Build Done!');
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
