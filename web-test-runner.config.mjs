import { playwrightLauncher } from '@web/test-runner-playwright';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';
import { importMapsPlugin } from '@web/dev-server-import-maps';
import rollupLitCss from 'rollup-plugin-lit-css';
import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import parseArgs from 'minimist';

const args = parseArgs(process.argv.slice(2), {
  boolean: true,
});

let browsers = [
  playwrightLauncher({ product: 'chromium' }),
  playwrightLauncher({ product: 'firefox', concurrency: 1 }),
  playwrightLauncher({ product: 'webkit' }),
];

if (args.debug) {
  browsers = [
    puppeteerLauncher({
      launchOptions: {
        args: ['--no-sandbox'],
        devtools: true,
        headless: !!args.headless,
      },
    }),
  ];
}

const litCss = fromRollup(rollupLitCss);
const replace = fromRollup(rollupReplace);

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  files: 'src/**/*.test.ts',
  rootDir: './',
  nodeResolve: true,
  port: 8765,
  coverageConfig: {
    include: ['src/**/*.ts'],
    threshold: {
      branches: 100,
      statements: 100,
      functions: 100,
      lines: 100,
    },
  },

  mimeTypes: {
    'src/components/**/*.css': 'js',
  },

  browsers,

  plugins: [
    /* Use mock icon file in tests except bl-icon.test itself. */
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            '/src/components/icon/bl-icon': './src/utilities/icon-mock.ts'
          },
          scopes: {
            '/src/components/icon/': {
              '/src/components/icon/bl-icon': './src/components/icon/bl-icon.ts'
            }
          }
        },
      },
    }),
    litCss({
      include: ['src/components/**/*.css'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    esbuildPlugin({ ts: true, target: 'esnext'}),
  ],

  testRunnerHtml: testFramework => {
    return `<html>
      <head><link rel="stylesheet" href="./dist/themes/default.css"></head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`;
  },
});
