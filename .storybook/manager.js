import { addons } from '@storybook/manager-api';
import { lightTheme, darkTheme } from './baklava-theme';

// Inject CSS for sidebar theming
let themeStyleElement = null;

const injectSidebarCSS = (themeName) => {
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

    /* Remove any box-shadows */
    [data-side="left"],
    [data-side="left"] *,
    [data-side="top"],
    [data-side="top"] * {
      box-shadow: none !important;
    }

    /* Remove borders from all children first */
    [data-side="left"] *,
    [data-side="top"] * {
      border: none !important;
    }

    /* Enable scrolling for sidebar */
    .react-draggable,
    .sidebar-container,
    nav.sidebar-container {
      overflow-y: auto !important;
      overflow-x: hidden !important;
    }

    /* Sidebar border - Dark theme (more specific) */
    .react-draggable nav.sidebar-container,
    .react-draggable .sidebar-container,
    nav.sidebar-container.css-t68aeq,
    nav.sidebar-container,
    nav[class*="sidebar-container"],
    .sidebar-container,
    [class*="sidebar-container"],
    .react-draggable {
      border-right: 1px solid #1a1a1a !important;
      border-top: none !important;
      border-bottom: none !important;
      border-left: none !important;
    }

    /* Force border on react-draggable wrapper if it contains sidebar */
    .react-draggable:has(.sidebar-container),
    .react-draggable:has([class*="sidebar"]) {
      border-right: 1px solid #1a1a1a !important;
    }

    /* Top header - Dark theme - Black background */
    .css-13p4azl,
    .css-13p4azl *,
    div[class*="css-"]:not([class*="sidebar"]):first-child,
    div[class*="css-"]:not([class*="sidebar"]):first-child * {
      background: #000000 !important;
      background-color: #000000 !important;
    }

    .css-13p4azl {
      border-bottom: 1px solid #1a1a1a !important;
    }

    /* Top header buttons/icons hover - show theme background */
    .css-13p4azl button:hover,
    .css-13p4azl button:hover *,
    .css-13p4azl a:hover,
    .css-13p4azl a:hover *,
    .css-13p4azl [role="button"]:hover,
    .css-13p4azl [role="button"]:hover * {
      background: #1a1a1a !important;
      background-color: #1a1a1a !important;
      border-radius: 4px !important;
    }

    /* Scrollbar for dark theme - Always visible but styled */
    .react-draggable::-webkit-scrollbar {
      width: 8px !important;
    }

    .react-draggable::-webkit-scrollbar-track {
      background: #000000 !important;
    }

    .react-draggable::-webkit-scrollbar-thumb {
      background: #333333 !important;
      border-radius: 4px !important;
    }

    .react-draggable::-webkit-scrollbar-thumb:hover {
      background: #555555 !important;
    }

    /* OverlayScrollbars - Dark theme */
    .os-scrollbar-vertical {
      background: #333333 !important;
    }

    /* Firefox scrollbar */
    .react-draggable {
      scrollbar-width: thin !important;
      scrollbar-color: #333333 #000000 !important;
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

  `;

  // Create and append style element
  themeStyleElement = document.createElement('style');
  themeStyleElement.id = 'baklava-sidebar-theme';
  themeStyleElement.textContent = css;
  document.head.appendChild(themeStyleElement);
};

// Function to update theme
const updateTheme = (themeName) => {
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
