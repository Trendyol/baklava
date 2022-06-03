import { playwrightLauncher } from '@web/test-runner-playwright';
import rollupLitCss from "rollup-plugin-lit-css"
import { fromRollup } from "@web/dev-server-rollup"
import { esbuildPlugin } from "@web/dev-server-esbuild"

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

  browsers: [
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
