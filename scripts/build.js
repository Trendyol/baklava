const esbuild = require('esbuild');
const parseArgs = require('minimist');
const CleanCSS = require('clean-css');
const del = require('del');
const { litCssPlugin } = require('esbuild-plugin-lit-css');

const args = parseArgs(process.argv.slice(2), {
  boolean: true,
});

(async () => {
  const { globby } = await import('globby');
  const destinationPath = 'dist';
  const isRelease = process.env.RELEASE || false;

  /* This is for using inside Storybook for demonstration purposes. */
  const cssHoverClassAdder = (content) => content.replace(/.*:hover[^{]*/g, matched => {
    // Replace :hover with special class. (There will be additional classes for focus, etc. Should be implemented in here.)
    const replacedWithNewClass = matched.replace(/:hover/, '.__ONLY_FOR_STORYBOOK_DEMONSTRATION_HOVER__')
    // Concat strings
    return matched.concat(', ', replacedWithNewClass)
  });

  const cssCleaner = (content) => new CleanCSS({ level: 1 }).minify(content).styles;

  const cssTransformers = [cssCleaner];

  if (!isRelease) {
    // Add hover class for demonstration purposes, only if it's not a release build.
    cssTransformers.push(cssHoverClassAdder);
  }

  const cssPluginOptions = {
    filter: /components\/.*\.css$/,
    transform: (content) => cssTransformers.reduce((result, transformer) => transformer(result), content)
  };

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
      outdir: destinationPath,
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
        litCssPlugin(cssPluginOptions),
      ],
    };


    if (args.serve) {
      const servedir = 'playground';

      let ctx = await esbuild.context({
        ...buildOptions,
        outdir: `${servedir}/dist`
      });

      const { host, port } = await ctx.serve(
        {
          servedir,
          host: 'localhost',
        }
      );

      console.log(`Playground is served on http://${host}:${port}`);

      return;
    }

    const { errors, warnings, metafile } = await esbuild.build(buildOptions);

    if (errors.length > 0) {
      console.table(errors);
      console.error('Build Failed!');
      return;
    }

    if (warnings.length > 0) {
      console.warn('Warnings:');
      console.table(warnings);
    }

    const analyzeResult = Object.entries(metafile.outputs)
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
