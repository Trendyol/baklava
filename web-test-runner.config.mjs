/* eslint-disable @typescript-eslint/camelcase */
import { playwrightLauncher } from '@web/test-runner-playwright';
import { legacyPlugin } from '@web/dev-server-legacy';
import dotenv from 'dotenv';
dotenv.config();

const playwrightBrowsers = {
  // local browser testing via playwright
  chromium: playwrightLauncher({ product: 'chromium' }),
  firefox: playwrightLauncher({ product: 'firefox' }),
  webkit: playwrightLauncher({ product: 'webkit' }),
};

const browsers = Object.assign({}, playwrightBrowsers);

// Prepend BROWSERS=x,y to `npm run test` to run a subset of browsers
// e.g. `BROWSERS=chromium,firefox npm run test`
const noBrowser = b => {
  throw new Error(`No browser configured named '${b}'; using defaults`);
};
let commandLineBrowsers;
try {
  commandLineBrowsers = process.env.BROWSERS?.split(',').map(
    b => browsers[b] ?? noBrowser(b)
  );
} catch (e) {
  console.warn(e);
}

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  files: ['dist/components/**/**/*.test.js'],
  nodeResolve: true,
  browsers: commandLineBrowsers ?? Object.values(browsers),
  plugins: [
    // Detect browsers without modules (e.g. IE11) and transform to SystemJS
    // (https://modern-web.dev/docs/dev-server/plugins/legacy/).
    legacyPlugin({
      polyfills: {
        webcomponents: true,
        // Inject lit's polyfill-support module into test files, which is required
        // for interfacing with the webcomponents polyfills
        custom: [
          {
            name: 'lit-polyfill-support',
            path: 'node_modules/lit/polyfill-support.js',
            test: "!('attachShadow' in Element.prototype) || !('getRootNode' in Element.prototype) || window.ShadyDOM && window.ShadyDOM.force",
            module: false,
          },
        ],
      },
    }),
  ],
  coverage: true,
  coverageConfig: {
    threshold: {
      branches: 100,
      statements: 100,
      functions: 100,
      lines: 100,
    },
  },
});
