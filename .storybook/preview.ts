import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../dist/custom-elements.json';

setCustomElementsManifest(customElements);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewMode: 'docs',
  docs: {
    transformSource: source =>
      source
        .replace(/<!--\?lit\$[0-9]+\$-->|<!--\??-->/g, '')
        // Clean empty boolean attribute values
        .replace(/=\"\"/g, '')
        // Clean hover hack classes
        .replace(/ class=\"__ONLY_FOR_STORYBOOK_DEMONSTRATION_HOVER__\"/g, ''),
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Documentation', ['Welcome', '*'], 'Frameworks', 'Components', 'Design System'],
      locales: 'en-US',
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  version: {
    name: 'version',
    description: 'Select version Stable/Beta',
    toolbar: {
      icon: 'branch',
      items: [
        { value: 'stable', icon: 'branch', title: 'Stable Version' },
        { value: 'beta', icon: 'branch', title: 'Beta Version' },
      ],
      dynamicTitle: true,
    },
  },
}


export const decorators = [
  (storyFn, context) => {
    if (context.globals.version === 'stable' && window.parent.location.hostname.includes('next')) {
      window.parent.location.assign('https://baklava.design' + window.parent.location.search);
    }
    if (context.globals.version === 'beta' && !window.parent.location.hostname.includes('next')) {
      window.parent.location.assign('https://next.baklava.design' + window.parent.location.search);
    }
    return storyFn();
  }
];
