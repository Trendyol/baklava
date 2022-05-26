import { fromRollup } from "@web/dev-server-rollup"
import { esbuildPlugin } from "@web/dev-server-esbuild"
import { playwrightLauncher } from '@web/test-runner-playwright';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';
import parseArgs from 'minimist';
import rollupLitCss from "rollup-plugin-lit-css"

const args = parseArgs(process.argv.slice(2), {
  boolean: true,
});

const litCss = fromRollup(rollupLitCss)

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  files: "src/**/*.test.ts",
  nodeResolve: true,

  coverageConfig: {
    include: ["src/**/*.ts"],
    threshold: {
      branches: 100,
      statements: 100,
      functions: 100,
      lines: 100,
    },
  },

  mimeTypes: {
    "src/**/*.css": "js",
  },

  browsers: args.dev ? [
    puppeteerLauncher()
  ] : [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox', concurrency: 1 }),
    playwrightLauncher({ product: 'webkit' })
  ],

  plugins: [
    litCss({
      include: ["src/**/*.css"],
    }),

    esbuildPlugin({ ts: true, target: 'esnext' }),
  ],
});
