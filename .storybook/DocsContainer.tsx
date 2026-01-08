import * as React from 'react';
import { DocsContainer as BaseContainer, DocsContainerProps } from '@storybook/blocks';
import { create, themes } from '@storybook/theming';

// Custom dark theme with custom background color
const customDarkTheme = create({
  ...themes.dark,
  base: 'dark',
  appBg: '#030713',
  appContentBg: '#030713',
  barBg: '#030713',
});

export const DocsContainer: React.FC<React.PropsWithChildren<DocsContainerProps>> = ({ children, context }) => {
  // Get theme from context globals
  const currentTheme = context?.store?.globals?.globals?.theme || 'light';
  const [theme, setTheme] = React.useState(currentTheme);

  React.useEffect(() => {
    // Update theme when context changes
    setTheme(currentTheme);
  }, [currentTheme]);

  return React.createElement(
    BaseContainer,
    { theme: theme === 'dark' ? customDarkTheme : themes.light, context },
    children
  );
};
