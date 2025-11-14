import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../dist/custom-elements.json';
import '../src/themes/default.css';
import '../src/themes/dark.css';

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
  // Theme decorator - apply dark/light mode
  (storyFn, context) => {
    const theme = context.globals.theme || 'light';
    
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', theme);
    
    // Apply theme to preview body
    const previewBody = document.body;
    previewBody.setAttribute('data-theme', theme);
    
    // Set body styles
    previewBody.style.backgroundColor = 'var(--bl-color-neutral-full)';
    previewBody.style.color = 'var(--bl-color-neutral-darkest)';
    
    return storyFn();
  },
  // Version decorator - redirect based on version
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
