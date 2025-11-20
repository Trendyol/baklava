import * as React from 'react';
import { DocsContainer as BaseContainer, DocsContainerProps } from '@storybook/blocks';
import { themes } from '@storybook/theming';

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
    { theme: theme === 'dark' ? themes.dark : themes.light, context },
    children
  );
};

