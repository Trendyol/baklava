import { fromRollup } from "@web/dev-server-rollup"
import { esbuildPlugin } from "@web/dev-server-esbuild"
import rollupLitCss from "rollup-plugin-lit-css"

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

  plugins: [
    litCss({
      include: ["src/**/*.css"],
    }),

    esbuildPlugin({ ts: true, target: "esnext" }),
  ],
});
