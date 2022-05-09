import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../src/custom-elements.json';
import '../src/themes/default.css';

setCustomElementsManifest(customElements);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewMode: 'docs',
  docs: {
    transformSource: (source) => source
      // Clean Lit Expression Comments
      .replace(/<!--\?lit\$[0-9]+\$-->|<!--\??-->/g, '')
      // Clean empty boolean attribute values
      .replace(/=\"\"/g, ''),
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
