import { addons } from '@storybook/manager-api';
import { lightTheme, darkTheme } from './baklava-theme';

// Inject CSS for sidebar theming
let themeStyleElement = null;

const injectSidebarCSS = (themeName) => {
  console.log('Manager: Injecting CSS for', themeName);
  
  // Remove existing style
  if (themeStyleElement) {
    themeStyleElement.remove();
  }
  
  // Create CSS based on theme
  const css = themeName === 'dark' ? `
    /* Dark theme - PURE BLACK sidebar and toolbar */
    body,
    body *,
    #storybook-root,
    #storybook-root *,
    [data-side="left"],
    [data-side="left"] *,
    [data-side="left"] *::before,
    [data-side="left"] *::after,
    [data-side="top"],
    [data-side="top"] *,
    [data-side="top"] *::before,
    [data-side="top"] *::after,
    nav,
    nav *,
    nav *::before,
    nav *::after,
    aside,
    aside *,
    aside *::before,
    aside *::after,
    header,
    header *,
    header *::before,
    header *::after,
    [class*="sidebar"],
    [class*="sidebar"] *,
    [class*="Sidebar"],
    [class*="Sidebar"] *,
    [class*="bar"],
    [class*="bar"] *,
    [role="toolbar"],
    [role="toolbar"] *,
    div[class^="css-"],
    div[class^="css-"] *,
    button,
    button *,
    a,
    a *,
    svg,
    svg *,
    span,
    span * {
      background: #000000 !important;
      background-color: #000000 !important;
      background-image: none !important;
      opacity: 1 !important;
      filter: none !important;
    }
    
    /* Remove any box-shadows or borders that might look like opacity */
    [data-side="left"],
    [data-side="left"] *,
    [data-side="top"],
    [data-side="top"] * {
      box-shadow: none !important;
      border-color: #1a1a1a !important;
    }
    
    /* Text colors for visibility */
    [data-side="left"],
    [data-side="left"] *,
    [data-side="top"],
    [data-side="top"] *,
    nav,
    nav *,
    aside,
    aside *,
    header,
    header *,
    [class*="sidebar"],
    [class*="sidebar"] *,
    [class*="Sidebar"],
    [class*="Sidebar"] *,
    [class*="bar"],
    [class*="bar"] *,
    [role="toolbar"],
    [role="toolbar"] *,
    button,
    button *,
    a,
    a *,
    span {
      color: #E6E9F0 !important;
      fill: #E6E9F0 !important;
    }
    
    /* SVG icons */
    [data-side="left"] svg,
    [data-side="left"] svg *,
    [data-side="top"] svg,
    [data-side="top"] svg * {
      fill: #E6E9F0 !important;
      stroke: #E6E9F0 !important;
      opacity: 1 !important;
    }
    
    /* Hover states */
    [data-side="left"] a:hover,
    [data-side="left"] button:hover,
    [data-side="top"] a:hover,
    [data-side="top"] button:hover,
    nav a:hover,
    nav button:hover,
    header a:hover,
    header button:hover {
      background: #1a1a1a !important;
      opacity: 1 !important;
    }
  ` : `
    /* Light theme - PURE WHITE sidebar and toolbar */
    body,
    body *,
    #storybook-root,
    #storybook-root *,
    [data-side="left"],
    [data-side="left"] *,
    [data-side="left"] *::before,
    [data-side="left"] *::after,
    [data-side="top"],
    [data-side="top"] *,
    [data-side="top"] *::before,
    [data-side="top"] *::after,
    nav,
    nav *,
    nav *::before,
    nav *::after,
    aside,
    aside *,
    aside *::before,
    aside *::after,
    header,
    header *,
    header *::before,
    header *::after,
    [class*="sidebar"],
    [class*="sidebar"] *,
    [class*="Sidebar"],
    [class*="Sidebar"] *,
    [class*="bar"],
    [class*="bar"] *,
    [role="toolbar"],
    [role="toolbar"] *,
    div[class^="css-"],
    div[class^="css-"] *,
    button,
    button *,
    a,
    a *,
    svg,
    svg *,
    span,
    span * {
      background: #ffffff !important;
      background-color: #ffffff !important;
      background-image: none !important;
      opacity: 1 !important;
      filter: none !important;
    }
    
    /* Remove any box-shadows or borders */
    [data-side="left"],
    [data-side="left"] *,
    [data-side="top"],
    [data-side="top"] * {
      box-shadow: none !important;
      border-color: #e6e6e6 !important;
    }
    
    /* Text colors */
    [data-side="left"],
    [data-side="left"] *,
    [data-side="top"],
    [data-side="top"] *,
    nav,
    nav *,
    aside,
    aside *,
    header,
    header *,
    [class*="sidebar"],
    [class*="sidebar"] *,
    [class*="Sidebar"],
    [class*="Sidebar"] *,
    [class*="bar"],
    [class*="bar"] *,
    [role="toolbar"],
    [role="toolbar"] *,
    button,
    button *,
    a,
    a *,
    span {
      color: #273142 !important;
      fill: #273142 !important;
    }
    
    /* SVG icons */
    [data-side="left"] svg,
    [data-side="left"] svg *,
    [data-side="top"] svg,
    [data-side="top"] svg * {
      fill: #273142 !important;
      stroke: #273142 !important;
      opacity: 1 !important;
    }
  `;
  
  // Create and append style element
  themeStyleElement = document.createElement('style');
  themeStyleElement.id = 'baklava-sidebar-theme';
  themeStyleElement.textContent = css;
  document.head.appendChild(themeStyleElement);
  
  console.log('Manager: CSS injected for', themeName);
};

// Function to update theme
const updateTheme = (themeName) => {
  console.log('Manager: Updating theme to', themeName);
  const selectedTheme = themeName === 'dark' ? darkTheme : lightTheme;
  
  addons.setConfig({
    theme: selectedTheme,
    sidebar: {
      showRoots: true,
    },
  });
  
  // Inject sidebar CSS
  injectSidebarCSS(themeName);
};

// Get initial theme from localStorage
let currentTheme = 'light';
try {
  const storedGlobals = localStorage.getItem('storybook-globals');
  if (storedGlobals) {
    const parsed = JSON.parse(storedGlobals);
    currentTheme = parsed.theme || 'light';
  }
} catch (e) {
  // Use default light theme
}

// Set initial config
updateTheme(currentTheme);

// Also inject CSS after a short delay to ensure DOM is ready
setTimeout(() => {
  console.log('Manager: Applying initial theme CSS');
  injectSidebarCSS(currentTheme);
}, 100);

// Re-inject periodically to override any dynamic styles
setInterval(() => {
  const storedTheme = currentTheme;
  injectSidebarCSS(storedTheme);
}, 1000);

// Listen for theme changes via channel
const channel = addons.getChannel();
channel.on('GLOBALS_UPDATED', ({ globals }) => {
  if (globals && globals.theme && globals.theme !== currentTheme) {
    currentTheme = globals.theme;
    updateTheme(globals.theme);
  }
});

// Poll localStorage for theme changes (backup mechanism)
setInterval(() => {
  try {
    const storedGlobals = localStorage.getItem('storybook-globals');
    if (storedGlobals) {
      const parsed = JSON.parse(storedGlobals);
      const newTheme = parsed.theme || 'light';
      if (newTheme !== currentTheme) {
        currentTheme = newTheme;
        updateTheme(newTheme);
      }
    }
  } catch (e) {
    // Ignore errors
  }
}, 300);

// Listen for postMessage from preview iframe
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'STORYBOOK_THEME_CHANGED') {
    const newTheme = event.data.theme;
    if (newTheme && newTheme !== currentTheme) {
      currentTheme = newTheme;
      updateTheme(newTheme);
    }
  }
});
