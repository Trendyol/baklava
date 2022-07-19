import { playwrightLauncher } from '@web/test-runner-playwright';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';
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
        headless: !!args.headless
      }
    })
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
    litCss({
      include: ['src/components/**/*.css'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    esbuildPlugin({ ts: true, target: 'esnext', define: {'process.env.NODE_ENV': 'production'} }),
  ],

  testRunnerHtml: testFramework =>
    `<html>
      <head><link rel="stylesheet" href="./dist/themes/default.css"></head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
});
