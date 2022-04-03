import customTheme from './CustomTheme';
import { addParameters } from '@storybook/web-components';
import './storybook-styles.css';

addParameters({
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  controls: {
    expanded: true,
  },
  options: {
    storySort: {
      order: [
        'Getting Started',
        'Documentation',
        'Design Tokens',
        'Media',
        'Navigation',
        'Content',
        'Templates',
        'Pages',
        'Code Examples',
        'Utility Components',
      ],
    },
  },
  docs: {
    theme: customTheme,
  },
});
