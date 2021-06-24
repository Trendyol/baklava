import 'loki/configure-vue';
import '../css/root.css';
import '../css/system.css';

import {configure, addDecorator, addParameters} from '@storybook/vue'
import {withA11y} from '@storybook/addon-a11y';

const req = require.context('../src', true, /.stories.(j|t)s$/);

const cssReq = require.context('!!raw-loader!../design-system', true, /.\.css$/);
const cssTokenFiles = cssReq
  .keys()
  .map(filename => ({ filename, content: cssReq(filename).default }));

addDecorator(withA11y);
addParameters({
  designToken: {
    files: {
      css: cssTokenFiles,
    }
  }
});
addParameters({
  options: {
    hierarchyRootSeparator: /\|/,
  },
  docs: {
    inlineStories: true,
  },
} as any);

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module);
