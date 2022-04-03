/* eslint-disable @typescript-eslint/camelcase */
import { playwrightLauncher } from '@web/test-runner-playwright';
import { legacyPlugin } from '@web/dev-server-legacy';
import { browserstackLauncher as createBrowserstackLauncher } from '@web/test-runner-browserstack';
import dotenv from 'dotenv';
dotenv.config();

// prettier-ignore
const browserstackEnabled = () => {
  return (
    (process.env.BROWSER_STACK_USERNAME &&
    process.env.BROWSER_STACK_ACCESS_KEY)
    ? true
    : false
  )
};

const browserstackLauncher = config => {
  return createBrowserstackLauncher({
    capabilities: {
      'browserstack.user': process.env.BROWSER_STACK_USERNAME,
      'browserstack.key': process.env.BROWSER_STACK_ACCESS_KEY,
      'project': 'Grace',
      'name': 'Unit Tests',
      'build': `Untitled Build`,
      ...config,
    },
  });
};

const playwrightBrowsers = {
  // local browser testing via playwright
  chromium: playwrightLauncher({ product: 'chromium' }),
  firefox: playwrightLauncher({ product: 'firefox' }),
  webkit: playwrightLauncher({ product: 'webkit' }),
};

const browserstackBrowsers = browserstackEnabled()
  ? {
      // browser testing via browserstack
      chromiumBS: browserstackLauncher({
        browserName: 'Chrome',
        os: 'Windows',
        os_version: '10',
      }),
      firefoxBS: browserstackLauncher({
        browserName: 'Firefox',
        os: 'Windows',
        os_version: '10',
      }),
      edge: browserstackLauncher({
        browserName: 'MicrosoftEdge',
        os: 'Windows',
        os_version: '10',
      }),
      ie11: browserstackLauncher({
        browserName: 'IE',
        browser_version: '11.0',
        os: 'Windows',
        os_version: '10',
      }),
      safari: browserstackLauncher({
        browserName: 'Safari',
        browser_version: '14.0',
        os: 'OS X',
        os_version: 'Big Sur',
      }),
    }
  : {};

const browsers = Object.assign({}, playwrightBrowsers, browserstackBrowsers);

// Prepend BROWSERS=x,y to `yarn run test` to run a subset of browsers
// e.g. `BROWSERS=chromium,firefox yarn run test`
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

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto',

  /** Configure bare import resolve plugin */
  // nodeResolve: {
  //   exportConditions: ['browser', 'development']
  // },

  /** Amount of browsers to run concurrently */
  //concurrentBrowsers: 1,

  /** Amount of test files per browser to test concurrently */
  // concurrency: 1,

  // See documentation for all available options
});
