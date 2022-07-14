import { playwrightLauncher } from '@web/test-runner-playwright';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';
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
    {
      name: 'mock-icon-component',
      async transformImport({ source }) {
        if (source.endsWith('bl-icon.ts')) {
          return `${source}?_=${Date.now()}`;
        }
      },
      serve(context) {
        if (context.headers.referer) {
          const ref = new URL(context.headers.referer);

          if (
            context.path === '/src/components/icon/bl-icon.ts' &&
            ref.pathname !== '/' &&
            // Use actual component in bl-icon test
            !ref.pathname.includes('bl-icon.test.ts')
          ) {
            return `export default customElements.define('bl-icon', class extends HTMLElement {});`;
          }
        }
      },
    },
    
    litCss({
      include: ['src/components/**/*.css'],
    }),

    esbuildPlugin({ ts: true, target: 'esnext' }),
  ],

  testRunnerHtml: testFramework =>
    `<html>
      <head><link rel="stylesheet" href="./dist/themes/default.css"></head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
});
