import { playwrightLauncher } from '@web/test-runner-playwright';
import { chromeLauncher } from '@web/test-runner';
import rollupLitCss from 'rollup-plugin-lit-css';
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
    chromeLauncher({ launchOptions: { args: ['--no-sandbox'], headless: false } })
  ];
}

const litCss = fromRollup(rollupLitCss);

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

    esbuildPlugin({ ts: true, target: 'esnext' }),
  ],

  testRunnerHtml: testFramework =>
    `<html>
      <head><link rel="stylesheet" href="./dist/themes/default.css"></script></head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
});
