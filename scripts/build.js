const esbuild = require('esbuild');
const { litCssPlugin } = require('esbuild-plugin-lit-css');

(async () => {
  const { globby } = await import('globby');

  try {
    const buildResult = await esbuild.build({
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
      outdir: 'dist',
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
    });

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
        ({ fileName }) => fileName.endsWith('.js') || fileName.endsWith('.css')
      );

    console.table(analyzeResult, ['fileName', 'size']);

    console.info('Build Done!');
  } catch (error) {}
})();
