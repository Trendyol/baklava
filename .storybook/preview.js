import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../src/custom-elements.json';
import '../src/themes/default.css';

setCustomElementsManifest(customElements);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewMode: 'docs',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// export const decorators = [(Story) => <fwc-theme>{Story()}</fwc-theme>];
