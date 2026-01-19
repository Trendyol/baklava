import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../dist/custom-elements.json';
import '../src/themes/dark.css';
import '../src/themes/default.css';
import { DocsContainer } from './DocsContainer';

setCustomElementsManifest(customElements);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewMode: 'docs',
  docs: {
    container: DocsContainer,
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
  theme: {
    name: 'theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'sun', title: 'Light Mode' },
        { value: 'dark', icon: 'moon', title: 'Dark Mode' },
      ],
      dynamicTitle: true,
    },
  },
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
    const theme = context.globals.theme || 'light';

    document.documentElement.setAttribute('data-theme', theme);

    const previewBody = document.body;
    previewBody.setAttribute('data-theme', theme);

    previewBody.style.backgroundColor = 'var(--bl-color-neutral-full)';
    previewBody.style.color = 'var(--bl-color-neutral-darkest)';

    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'STORYBOOK_THEME_CHANGED', theme }, '*');
      }
    } catch (e) {
    }

    return storyFn();
  },
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

