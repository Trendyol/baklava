// Doküman içerikleri - ayrı dosyada tutuyoruz ki Vue parser HTML taglerini yanlış yorumlamasın

export const docContents: Record<string, string> = {
  welcome: `
# Baklava Design System

Baklava is a design system provided by [Trendyol](https://github.com/trendyol) to create a consistent UI/UX for app users.

Web implementation of the design system is created as native web components so it can be used within every type of web frameworks including Vue, React or Angular. Our target is providing a UI library that has neatly designed and developed for providing best possible user experience for the users of applications that uses Baklava DS.

## How to use

Preferred way of using Baklava is using it via CDN. Just import library JS and CSS files to your main document like below:

\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/default.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/baklava.js"></script>
\`\`\`

We highly recommend using the manual version of the Baklava library:

\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@trendyol/baklava@x.x.x/dist/themes/default.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@trendyol/baklava@x.x.x/dist/baklava.js"></script>
\`\`\`

This way library will be served from a very high performant CDN and all of the Baklava web components will be ready to use inside your web project.

\`\`\`html
<bl-button>Baklava works!</bl-button>
\`\`\`

## How to contribute

Baklava Design System is always open for direct contributions. Contributions can be in the form of design suggestions, documentation improvements, new component suggestions, code improvements, adding new features or fixing problems. For more information please check our [Contribution Guideline document](https://github.com/Trendyol/baklava/blob/next/CONTRIBUTING.md).

## Useful Links

- [Storybook Documentation](https://baklava.design/)
- [Figma Design Document](https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide)
- [Project Board](https://github.com/orgs/Trendyol/projects/4)
- [Discussion Board](https://github.com/Trendyol/baklava/discussions)
- [Mobile (React-Native) Implementation](https://github.com/Trendyol/baklava-react-native)
- [Icons Library](https://github.com/Trendyol/baklava-icons)
  `,

  "using-baklava-in-vue": `
# Using Baklava in Vue

Vue is mostly [compatible](https://custom-elements-everywhere.com/#vue) with custom elements.

## Installation

To add Baklava in your app, you can either import it via CDN or npm package. But one way or another, you should tell Vue to ignore custom elements.

To make the rule more generic, easiest way is ignoring the elements start with \`bl-\` tag. Thanks to that, every baklava element will be ignored by the Vue.

### Via CDN

To be able to use Baklava via CDN, you should add our default.css and baklava.js at head tag in your index.html file.

\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/default.css"/>
<script type="module" src="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/baklava.js"></script>
\`\`\`

### Via NPM

To be able to use Baklava via npm, run \`npm install @trendyol/baklava\` then:

\`\`\`js
import "@trendyol/baklava/dist/themes/default.css";
import { setIconPath } from '@trendyol/baklava'
setIconPath('https://cdn.jsdelivr.net/npm/@trendyol/baklava-icons@latest/icons')
\`\`\`

### Vue2

If you use Vue2, you should add \`Vue.config.ignoredElements = [/^bl-/]\` in your main.js.

### Vue3

If you use Vue3, you can add this in your main.js before Vue mounts the app:

\`\`\`js
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('bl-');
\`\`\`

Also, you can add ignore rule as compiler options to your webpack or vite.

\`\`\`js
isCustomElement: tag => tag.startsWith('bl-')
\`\`\`

**For Vite:**

\`\`\`js
{
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('bl-')
        }
      }
    })
  ]
}
\`\`\`

**For Webpack with vue-loader:**

\`\`\`js
{
  test: /\\.vue$/,
  use: {
    loader: "vue-loader",
    options: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('bl-')
      }
    }
  }
}
\`\`\`

### TypeScript

Baklava offers TypeScript support for Vue versions 2.7 and higher. To enable this support, you should create a file named \`components.d.ts\` within the "src" directory and include the following line:

\`\`\`ts
/// <reference types="@trendyol/baklava/dist/baklava-vue.d.ts" />
\`\`\`

### ESLint Configuration

Baklava components are developed with \`kebab case\`. Eslint uses \`pascal case\` by default. If you are using eslint in your project, it will automatically convert the baklava components to \`pascal case\`. To prevent this, you need to turn off the \`pascal case\` rule in your project.

To do this, give the following rule in your eslint config file:

\`\`\`js
rules: {
  "vue/component-name-in-template-casing": "off",
},
\`\`\`
  `,

  "using-baklava-in-react": `
# Using Baklava in React

React is not [compatible](https://custom-elements-everywhere.com/#react) with most of the web component features. React passes all props as string to Custom Components so object and array props don't pass in correct way. Also, since React uses its own synthetic event system, it can't listen events that dispatches from Custom Elements. For this reasons, we used [@lit-labs/react](https://www.npmjs.com/package/@lit-labs/react) package to convert Custom Elements to React components.

## Using with CDN

Install the NPM package to your project.

\`\`\`bash
npm install @trendyol/baklava
\`\`\`

Include Baklava library from CDN to your project's \`index.html\` file's \`<head>\` section.

\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/default.css"/>
<script type="module" src="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/baklava.js"></script>
\`\`\`

Then you can use Baklava React components in your project by importing them from \`@trendyol/baklava/dist/baklava-react\` in your code.

**Important:** Please make sure you are using same version on CDN imports and NPM package. Otherwise there can be inconsistencies between React components and their related web components.

\`\`\`jsx
import { BlTooltip, BlButton } from "@trendyol/baklava/dist/baklava-react";

function App() {
  return (
    <BlTooltip>
      <BlButton slot="tooltip-trigger" icon="info" label="Show Info" />
      Some extra information.
    </BlTooltip>
  );
}

export default App;
\`\`\`

By using via CDN, you'll have a very thin React wrapper package in your project bundle, and you'll be able to use Baklava React components in your project with a very fast and optimized CDN. In this way you don't need to do any special thing for including assets.

## Using with NPM

If you want to include Baklava to your project bundle, you can import it via NPM.

Install the NPM package to your project.

\`\`\`bash
npm install @trendyol/baklava
\`\`\`

Then import Baklava library and styles in a central place of your app. Like \`main.jsx\` file. You need to use provided \`setIconPath\` function to set icon location via CDN. Or you can download those icons to your project's asset folder and set the path manually.

\`\`\`jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "@trendyol/baklava";
import { setIconPath } from "@trendyol/baklava";
import "@trendyol/baklava/dist/themes/default.css";
setIconPath("https://cdn.jsdelivr.net/npm/@trendyol/baklava-icons@latest/icons");

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
\`\`\`

Now you are able to use Baklava React components in your project by importing them from \`@trendyol/baklava/dist/baklava-react\` in your code.

\`\`\`jsx
import { BlTooltip, BlButton } from "@trendyol/baklava/dist/baklava-react";

function App() {
  return (
    <BlTooltip>
      <BlButton slot="tooltip-trigger" icon="info" text label="Show Info" />
      Some extra information.
    </BlTooltip>
  );
}

export default App;
\`\`\`

## Event Handling

Baklava components emit [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent). For example, the input component emits the \`bl-input\` event when it receives input. In React, you can listen for the event using \`onInput\`.

Example:

\`\`\`jsx
import { useState } from 'react';
import { BlInput } from '@trendyol/baklava/dist/baklava-react';

function MyComponent() {
  const [value, setValue] = useState('');

  return <BlInput value={value} onInput={event => setValue(event.target.value)} />;
}

export default MyComponent;
\`\`\`

## Styling Components

You can customize components with css variables or general theme variables.

### Inline CSS

\`\`\`jsx
import { BlButton } from "@trendyol/baklava/dist/baklava-react";

function MyComponent() {
  const buttonStyle = {
    "--bl-color-primary": "purple",
    "--bl-color-primary-highlight": "rebeccapurple",
  }

  return (
    <BlButton style={buttonStyle}>button</BlButton>
  );
}

export default MyComponent;
\`\`\`

### Styled Components

\`\`\`jsx
import { BlTooltip, BlButton } from "@trendyol/baklava/dist/baklava-react";
import styled from "styled-components"

const Wrapper = styled.div\`
   .button-class {
     --bl-color-primary: purple;
   }

   .tooltip-class {
     --bl-tooltip-position: fixed;
   }
\`;

function MyComponent() {
  return (
    <Wrapper>
      <BlTooltip className="tooltip-class">
        <BlButton className="button-class" slot="tooltip-trigger" icon="info" text label="Show Info" />
        Some extra information.
      </BlTooltip>
    </Wrapper>
  );
}

export default MyComponent;
\`\`\`

## Testing with Vitest

Baklava uses ES modules. We will explain how to install Vitest due to its ES Modules support. If you are using Jest, your version should be greater than 26.5.0, and you should add "@trendyol/baklava" to the [transformIgnorePatterns](https://jestjs.io/docs/tutorial-react-native#transformignorepatterns-customization).

\`\`\`bash
npm install -D vitest vitest-dom jsdom
\`\`\`

After downloading Vitest with this command, you should provide a file path to the setupFiles section in your Vitest config file. We used './src/setupTest.ts'.

\`\`\`js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTest.ts"]
  }
});
\`\`\`

Afterward, we should edit our setupTest.ts file just like setting up baklava.

\`\`\`js
import "vitest-dom/extend-expect";
import "@trendyol/baklava";
import { setIconPath } from "@trendyol/baklava";
import "@trendyol/baklava/dist/themes/default.css";
setIconPath("https://cdn.jsdelivr.net/npm/@trendyol/baklava-icons@latest/icons");
\`\`\`

We are ready to write tests.

\`\`\`tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { BlButton } from "@trendyol/baklava/dist/baklava-react";
import React from "react";

test("should trigger click event", async () => {
  const onClickFn = vi.fn();
  render(
    <React.Suspense fallback={null}>
      <BlButton onBlClick={onClickFn}>Button</BlButton>
    </React.Suspense>
  );

  const blButton = await screen.findByText("Button");
  const button = blButton.shadowRoot.querySelector("button");
  fireEvent.click(button);

  expect(onClickFn).toBeCalled();
});
\`\`\`
  `,

  "using-baklava-in-next": `
# Using Baklava With Next

Because Baklava uses static CDN and Next uses SSR, they are not compatible by default. We have 2 options. We can wait for the CDN to load before rendering the page, or we can force baklava to use Client Side Rendering.

## Preparation

Install the NPM package to your project.

\`\`\`bash
npm install @trendyol/baklava
\`\`\`

Include Baklava library from CDN to your project's \`<head>\` section (in \`layout.tsx\` or \`app.tsx\`).

\`\`\`html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/default.css"
/>

<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/baklava.js"
/>
\`\`\`

## Using without SSR

Create a custom component for the baklava component you will use

\`\`\`jsx
"use client"; // This is a client-side component

import { BlButton } from "@trendyol/baklava/dist/baklava-react"; // Import the component from the library

// Create a new component that uses the library component
const Button = (props) => (
  <BlButton {...props}>Click me!</BlButton>
);

export default Button;
\`\`\`

In the page, import the component using \`dynamic\` with ssr off.

\`\`\`jsx
const Button = dynamic(() => import("@/components/Button"), { ssr: false });
\`\`\`

Or you can export the component as dynamic to avoid type errors.

\`\`\`jsx
"use client";

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import { BlButton } from "@trendyol/baklava/dist/baklava-react";

type ButtonProps = ComponentProps<typeof BlButton>;

const Button = (props: ButtonProps) => (
  <BlButton {...props}>Click me!</BlButton>
);

const DynamicButton = dynamic<ButtonProps>(() =>
  Promise.resolve(Button)
);

export default DynamicButton;
\`\`\`

[Here is the demo repository](https://github.com/trendyol/baklava/tree/next/examples/next-app-router-ssr). You can also preview it live with [StackBlitz](https://stackblitz.com/github/trendyol/baklava/tree/next/examples/next-app-router-ssr).

## Using with SSR

We will use a workaround in order to wait for CDN to be loaded. In \`_app.tsx\`, add a 0ms latency for the \`<Component />\`.

\`\`\`jsx
export default function MyApp({ Component, pageProps }) {
  const [isLoaded, setIsLoaded] = useState(false);

  setTimeout(() => {
    setIsLoaded(true);
  }, 0);

  return isLoaded && <Component {...pageProps} />
}
\`\`\`

Then import components just like regular react.

\`\`\`jsx
import { BlButton } from '@trendyol/baklava/dist/baklava-react';

function Button() {
  return <BlButton>Click Me</BlButton>
}
\`\`\`

## Testing with Jest

If you are using Server Side Rendering, you can mock Baklava components as JSX components in Jest.

\`\`\`js
jest.mock('@trendyol/baklava/dist/baklava-react', () => ({
  ...jest.requireActual('@trendyol/baklava/dist/baklava-react'),
  BlPagination: (props) => <div data-testId="current-page-mock">{props['current-page']}</div>,
}));
\`\`\`
  `,

  "customizing-baklava-theme": `
# Customizing Baklava Theme

Baklava Design System provides a set of well defined components with some UX decisions. Baklava is not a generic UI library, so it doesn't intend to provide a list of component that you can customize every part of it. Instead Baklava aims to provide a good and consistent UX for the applications uses it.

But there are still many customization options in Baklava, those doesn't effect UX result of the components a lot. These are design tokens and a set of design token definitions are named as a "theme". Baklava comes with a default theme that you can import from \`themes/default.css\` file and also provides a dark theme from \`themes/dark.css\` file. You can also create your own theme or extend/override some part of the default theme in your applications.

## Creating your own theme

You can simply copy our \`themes/default.css\` file to your codebase, change any of the CSS variables inside the file and put that CSS file on your document instead of \`themes/default.css\` file. Like:

\`\`\`html
<link rel="stylesheet" href="/styles/my-baklava-theme.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/baklava.js"></script>
\`\`\`

With this opportunity you can use all of the Baklava components with your own branding colors, own selection of Font or different sizing values.

## Extending default theme

If you want to change a small set of the design tokens, you may consider to extend default theme.

\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/default.css" />
<link rel="stylesheet" href="/styles/my-baklava-theme.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/baklava.js"></script>
\`\`\`

With this, you can -for example- only override color palette for your app and continue to use typography or spacing rules from the default theme.

## Using Dark Theme

Baklava provides a built-in dark theme that you can use in your application. To enable dark mode:

\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/default.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/dark.css" />

<html data-theme="dark">
  <!-- All components will use dark theme -->
  <bl-button>Click Me</bl-button>
</html>
\`\`\`

Or you can toggle dark mode dynamically with JavaScript:

\`\`\`html
<script>
  function toggleDarkMode(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  // Listen to system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  toggleDarkMode(prefersDark);
</script>
\`\`\`

## Using themes in a smaller scope

Our theme files are setting CSS variables on \`:root\` level. That means they are being set on document level. But since we are only talking about classic CSS styling here, in some cases, it's perfectly fine to set a design token for a part of your document.

\`\`\`html
<div class="hero">
   <bl-button>Get Started</bl-button>
</div>

<style>
.hero {
  --bl-primary-color: purple;
}
</style>
\`\`\`

In this example we are an exceptional part in our document that we want to make a primary button that is different then our theme colors. So we set \`--bl-primary-color\` variable on \`.hero\` element and make primary button inside this element in a different color.

But you need to be careful about setting a design token in a scope, because in the example below, if I put a \`bl-badge\` component inside \`.hero\` element, that will also use same color we set instead of our theme color. But of course you can easily address that kind of issues, like:

\`\`\`css
.hero bl-button {
  --bl-primary-color: purple;
}
\`\`\`

This opportunity gives a big power for handling esceptional use cases like:

- Using dark theme in a part of your document (like header or footer)
- Having more color or spacing options inside your app.

For example, you can use dark theme only in header:

\`\`\`html
<link rel="stylesheet" href="path/to/themes/default.css" />
<link rel="stylesheet" href="path/to/themes/dark.css" />

<header class="dark-theme">
  <!-- Dark mode components -->
  <bl-button>Menu</bl-button>
</header>

<main>
  <!-- Light mode components -->
  <bl-button>Content</bl-button>
</main>
\`\`\`

## Changing default styles of components

In addition to setting design tokens, some of our components has their own CSS custom properties to make customisation on their style. And if you want you can use those custom properties in your theme definition to make all of those components in a desired style troughout your app.

For example, our badge component has \`--bl-badge-color\` property and by default it uses \`--bl-color-primary\`. If you want you can use a different default color for all of the badges on your app by just adding:

\`\`\`css
:root {
  --bl-badge-color: purple;
}
\`\`\`

Using design tokens here is of course also possible:

\`\`\`css
:root {
  --bl-badge-color: var(--bl-color-success);
}
\`\`\`

## Customizing Typography Styles

Baklava Design System provides many design tokens for typography. You can customize font styles in different levels according to your needs. For example:

\`\`\`css
.my-header {
  font: var(--bl-font-display-light);
}
\`\`\`

In the example above we are using "Display Light" font for an element. In your own theme, you can override this font definition like below:

\`\`\`css
:root {
  --bl-font-display-light: 400 40px/48px Helvetica;
}
\`\`\`

On the other hand, this variable uses multiple other variables behind the scene. Let's check how it's defined in our default theme:

\`\`\`css
:root {
  --bl-font-display-font-size: var(--bl-font-size-5xl);
  --bl-font-display-line-height: calc(var(--bl-font-display-font-size) + var(--bl-size-2xs));
  --bl-font-display-size: var(--bl-font-display-font-size)/var(--bl-font-display-line-height);
  --bl-font-display: var(--bl-font-display-size) var(--bl-font-family);
  --bl-font-display-light: var(--bl-font-weight-light) var(--bl-font-display);
}
\`\`\`

As you can see \`--bl-font-display-light\` is extending \`--bl-font-display\` by just setting font-weight with another variable we provide in design tokens named \`--bl-font-weight-light\`. It's also possible to override \`--bl-font-display\` to change font and size definitions of all of the "display" fonts without touching their font-weights:

\`\`\`css
:root {
  --bl-font-display: 40px/48px Helvetica;
}
\`\`\`

Same applies for other variables. Let's check how can we set custom line-heights.

In Baklava typography line-height values are "font size + a value from the sizing list". For display font, \`--bl-font-display-font-size\` is set by \`--bl-font-size-5xl\` and this value is summed with \`--bl-size-2xs\` while setting \`--bl-font-display-line-height\`. You are able customize this logic in any level you want.

\`\`\`css
:root {
  --bl-font-display-line-height: 68px;
}
\`\`\`

Or an element level like:

\`\`\`css
.my-header {
  font: var(--bl-font-display-light);
  --bl-font-display-line-height: 68px;
}
\`\`\`

Or you can set just font size:

\`\`\`css
.my-header {
  font: var(--bl-font-display-light);
  --bl-font-display-font-size: 60px;
}
\`\`\`

In this case line-height of my-header will be set as 60px + value of \`--bl-size-2xs\`. Line-height is still calculated automatically.
  `,

  colors: `
# Baklava Color Palette

Baklava uses a list of defined colors with some default values. All colors are available as CSS Custom Properties (variables) that can be used throughout your application.

## Primary Colors

The primary color is the main brand color used for primary actions and key UI elements.

| Variable | Description | Default Value |
|----------|-------------|---------------|
| \`--bl-color-primary\` | Main primary color | #f27a1a |
| \`--bl-color-primary-highlight\` | Darker shade for hover/active states | #ef6114 |
| \`--bl-color-primary-contrast\` | Light background for primary elements | #fef2e8 |

## Semantic Colors

Semantic colors communicate meaning and status to users.

### Success Colors
| Variable | Description | Default Value |
|----------|-------------|---------------|
| \`--bl-color-success\` | Success state color | #0bc15c |
| \`--bl-color-success-highlight\` | Darker shade for hover/active | #0aae53 |
| \`--bl-color-success-contrast\` | Light background for success | #e7f9ef |

### Danger Colors
| Variable | Description | Default Value |
|----------|-------------|---------------|
| \`--bl-color-danger\` | Error/danger state color | #ff5043 |
| \`--bl-color-danger-highlight\` | Darker shade for hover/active | #e6483c |
| \`--bl-color-danger-contrast\` | Light background for danger | #ffedec |

### Warning Colors
| Variable | Description | Default Value |
|----------|-------------|---------------|
| \`--bl-color-warning\` | Warning state color | #ffb600 |
| \`--bl-color-warning-highlight\` | Darker shade for hover/active | #e6a400 |
| \`--bl-color-warning-contrast\` | Light background for warning | #fff8e6 |

### Info Colors
| Variable | Description | Default Value |
|----------|-------------|---------------|
| \`--bl-color-info\` | Informational state color | #5794ff |
| \`--bl-color-info-highlight\` | Darker shade for hover/active | #4e85e6 |
| \`--bl-color-info-contrast\` | Light background for info | #eef4ff |

## Neutral Colors

Neutral colors are used for text, backgrounds, borders, and other UI elements.

| Variable | Description | Default Value |
|----------|-------------|---------------|
| \`--bl-color-neutral-none\` | Transparent | transparent |
| \`--bl-color-neutral-darkest\` | Darkest neutral (text) | #0f131a |
| \`--bl-color-neutral-darker\` | Darker neutral | #273142 |
| \`--bl-color-neutral-dark\` | Dark neutral | #6e7787 |
| \`--bl-color-neutral-light\` | Light neutral | #95a1b5 |
| \`--bl-color-neutral-lighter\` | Lighter neutral | #afbbca |
| \`--bl-color-neutral-lightest\` | Lightest neutral (backgrounds) | #f1f2f7 |
| \`--bl-color-neutral-full\` | Full neutral (white) | #ffffff |

## Usage Examples

\`\`\`css
/* Using color variables in your CSS */
.my-element {
  color: var(--bl-color-neutral-darkest);
  background-color: var(--bl-color-neutral-lightest);
  border-color: var(--bl-color-neutral-lighter);
}

.my-button {
  background-color: var(--bl-color-primary);
}

.my-button:hover {
  background-color: var(--bl-color-primary-highlight);
}

.success-message {
  color: var(--bl-color-success);
  background-color: var(--bl-color-success-contrast);
}
\`\`\`
  `,

  typography: `
# Baklava Typography

Typography creates purposeful texture, guiding users to read and understand the hierarchy of information.

The default font is **Rubik** in Baklava Design System. You can use any typography variable in your code like this:

\`\`\`css
.my-header {
  font: var(--bl-font-display-light);
}
\`\`\`

## Font Family

| Variable | Value |
|----------|-------|
| \`--bl-font-family\` | 'RubikVariable', sans-serif |

## Font Weights

| Variable | Value | Description |
|----------|-------|-------------|
| \`--bl-font-weight-light\` | 300 | Light weight |
| \`--bl-font-weight-regular\` | 400 | Regular weight |
| \`--bl-font-weight-medium\` | 500 | Medium weight |
| \`--bl-font-weight-semibold\` | 600 | Semibold weight |
| \`--bl-font-weight-bold\` | 700 | Bold weight |

## Font Sizes

| Variable | rem | px |
|----------|-----|-----|
| \`--bl-font-size-2xs\` | 0.5rem | 8px |
| \`--bl-font-size-xs\` | 0.625rem | 10px |
| \`--bl-font-size-s\` | 0.75rem | 12px |
| \`--bl-font-size-m\` | 0.875rem | 14px |
| \`--bl-font-size-l\` | 1rem | 16px |
| \`--bl-font-size-xl\` | 1.25rem | 20px |
| \`--bl-font-size-2xl\` | 1.5rem | 24px |
| \`--bl-font-size-3xl\` | 1.75rem | 28px |
| \`--bl-font-size-4xl\` | 2rem | 32px |
| \`--bl-font-size-5xl\` | 3rem | 48px |
| \`--bl-font-size-6xl\` | 4rem | 64px |
  `,

  sizing: `
# Size and Spacing

Baklava uses a list of defined size variables. Using the right sizes will create consistency and hierarchy in the user interface.

In our provided themes, we are using \`rem\` values for the sizing variables to provide better accessibility. You can see pixel equivalents in the table below, with default browser sizing (1rem = 16px).

## Size Variables

| Variable | rem Value | px Equivalent |
|----------|-----------|---------------|
| \`--bl-size-4xs\` | 0.125rem | 2px |
| \`--bl-size-3xs\` | 0.25rem | 4px |
| \`--bl-size-2xs\` | 0.5rem | 8px |
| \`--bl-size-xs\` | 0.75rem | 12px |
| \`--bl-size-s\` | 0.875rem | 14px |
| \`--bl-size-m\` | 1rem | 16px |
| \`--bl-size-l\` | 1.25rem | 20px |
| \`--bl-size-xl\` | 1.5rem | 24px |
| \`--bl-size-2xl\` | 2rem | 32px |
| \`--bl-size-3xl\` | 2.5rem | 40px |
| \`--bl-size-4xl\` | 3rem | 48px |
| \`--bl-size-5xl\` | 4rem | 64px |
| \`--bl-size-6xl\` | 5rem | 80px |

## Usage Examples

\`\`\`css
/* Using size variables for padding */
.card {
  padding: var(--bl-size-m);
}

/* Using size variables for margin */
.section {
  margin-bottom: var(--bl-size-xl);
}
\`\`\`
  `,

  "border-radius": `
# Border Radius

The border-radius property defines the radius of the element's corners. Baklava provides a set of predefined border-radius values for consistent rounded corners across your application.

## Border Radius Variables

| Variable | Value | Description |
|----------|-------|-------------|
| \`--bl-border-radius-xs\` | 0.125rem (2px) | Extra small radius for subtle rounding |
| \`--bl-border-radius-s\` | 0.25rem (4px) | Small radius for minor rounding |
| \`--bl-border-radius-m\` | 0.375rem (6px) | Medium radius (default) |
| \`--bl-border-radius-l\` | 0.5rem (8px) | Large radius for more visible rounding |
| \`--bl-border-radius-pill\` | 62.438rem (999px) | Creates pill-shaped elements |
| \`--bl-border-radius-circle\` | 50% | Creates perfect circles |
  `,

  iconography: `
# Baklava Icons

Baklava Design System uses the \`@trendyol/baklava-icons\` package for custom-made icons.

## Installation

Icons are included with the main Baklava package. Set the icon path during initialization:

\`\`\`js
import { setIconPath } from '@trendyol/baklava'

setIconPath('https://cdn.jsdelivr.net/npm/@trendyol/baklava-icons@latest/icons')
\`\`\`

## Using Icons

Use the \`bl-icon\` component to display icons:

\`\`\`html
<bl-icon name="home"></bl-icon>
<bl-icon name="search"></bl-icon>
<bl-icon name="settings"></bl-icon>
\`\`\`
  `,

  "z-index": `
# Z-index

Z-index values define a set of variables to control the stacking order (z-order) of elements. Using consistent z-index values prevents layering conflicts and ensures proper element ordering.

## Z-index Variables

| Variable | Value | Description |
|----------|-------|-------------|
| \`--bl-index-deep\` | -1 | Move an element behind everything else |
| \`--bl-index-base\` | 1 | Base z-index for leveling up an element in z-stack |
| \`--bl-index-popover\` | 100 | Z-index value for popover items |
| \`--bl-index-tooltip\` | 200 | Tooltip-like elements (on top of popovers) |
| \`--bl-index-sticky\` | 300 | Z-index for sticky elements |
| \`--bl-index-overlay\` | 400 | Z-index for overlay elements like backdrops |
| \`--bl-index-dialog\` | 500 | Z-index for dialogs and modals |
| \`--bl-index-notification\` | 600 | Top z-index for toast or notification elements |
  `,

  requirements: `
# Requirements

Baklava is a [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) based design system. We are using [Lit](https://lit.dev) to simplify the process of creating web components and we create an [ECMAScript module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) (ESM).

It is built on top of web standards and it should work without any issues in all modern browsers, but it's important to note that for older versions of the browsers, the support for web components may be limited or non-existent, this is where polyfills can be used to fill the gaps.

Therefore, it relies on a few key technologies:

- [Custom Elements API](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements): This API allows developers to create custom elements and define their behavior.
- [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM): This API allows developers to create a "shadow" DOM tree for a custom element, which is separate from the main DOM. This allows the component to have its own style and layout without affecting the rest of the page.
- [HTML Templates](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots): This feature allows developers to define a template for a component that can be instantiated and used multiple times.
- [Javascript Runtime](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm): It requires a JavaScript runtime that supports ES6 or later.

It's also important to consider that as web components are becoming more and more standardized. The need for polyfills will be reduced. However, if you are working with a large application that needs to support older browsers, you may need to use polyfills to ensure that Baklava work correctly.

## Browser Support

In Baklava -written with Lit-, browser support is grouped into two main categories:

- [Modern Browsers](https://lit.dev/docs/tools/requirements/#building-for-modern-browsers)
- [Legacy Browsers](https://lit.dev/docs/tools/requirements/#building-for-legacy-browsers)

According to **caniuse.com**, Baklava's browser support is more than **95%**. ([web components](https://caniuse.com/?search=web%20components), [esm](https://caniuse.com/?search=esm)). The remaining 5% can be supported by compiling javascript in build time and adding polyfills.

### Modern Browser Support

| Browser | Supports ES2019 & web components |
|---------|------|
| Chrome | >= 73 |
| Firefox | >= 12.1 |
| Safari | >= 63 |
| Edge | >= 79 |

### Legacy Browser Support

Supporting older browsers requires some steps described by the Lit documentation:

- Compiling modern JavaScript syntax to ES5.
- Transforming ES modules to another module system.
- Loading polyfills.

For compiling and transforming, you can install Baklava as an npm package and transpile it during the build time by using Webpack and Babel. [Here](https://medium.com/@sivaraj-v/basic-webpack-4-and-es5-to-es6-transpiler-using-babel-dc66e72c86c6) you can find an example about this.

| Browser | Compile JS | Compile JS & load polyfills |
|---------|------|-----|
| Chrome | 67-79 | <67 |
| Firefox | 10-12 | <10 |
| Safari | 63-71 | <63 |
| Edge | 79 | - |
| Edge Classic | - | <=18 |
| Internet Explorer | - | 11 |

## Polyfills

Polyfills are a piece of code that allows web developers to use features that are not yet supported by some browsers. There is a [polyfills package](https://github.com/webcomponents/polyfills) created and maintained by [Web Components Organization](webcomponents.org) where you can find almost all necessary polyfills.

Some common examples of polyfills for web components are:

- **Custom Elements API**: The [custom-elements-es5-adapter.js](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#custom-elements-es5-adapterjs) polyfill can be used to support custom elements in older browsers.
- **Shadow DOM**: The [shadydom](https://github.com/webcomponents/polyfills/tree/master/packages/shadydom) and [shadycss](https://github.com/webcomponents/polyfills/tree/master/packages/shadycss) polyfills can be used to support the Shadow DOM in older browsers.
- **HTML Templates**: The [template.js](https://github.com/webcomponents/polyfills/tree/master/packages/template) polyfill can be used to support the template element in older browsers.
- **JS Runtime Polyfill**: You can use [core-js](https://github.com/zloirock/core-js).
- **SystemJS**: This is a dynamic module loader that can be used to load ES modules in older browsers.
- **Dynamic Imports**: One example is [dynamic-import-polyfill](https://www.npmjs.com/package/dynamic-import-polyfill).

\`\`\`js
// import the webcomponents polyfills
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
\`\`\`

### Polyfills in Baklava Core

- [element-internals-polyfill](https://www.npmjs.com/package/element-internals-polyfill): We add this polyfill to support [element internals features](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals) (Form Control) in Safari browsers.
  `,

  "rtl-support": `
# Right-to-Left (RTL)

Baklava components support Right-to-Left (RTL) text direction, which is essential for languages that are written from right to left, such as Arabic, Hebrew, and Persian. To enable RTL support in your application using Baklava components, you need to set the \`dir\` attribute on the \`<html>\` tag in your project.

## Enabling Right-to-Left (RTL)

To enable Right-to-Left (RTL), add the \`dir="rtl"\` attribute to your HTML tag. Here's how you can do it:

1. In your HTML file, locate the opening \`<html>\` tag.
2. Add the \`dir="rtl"\` attribute to the tag.

\`\`\`html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RTL Example</title>
  </head>
  <body>
    <!-- Your content here -->
  </body>
</html>
\`\`\`

## Guidelines for Contributors

When developing or modifying Baklava components, it's crucial to ensure proper RTL support. This includes being aware of RTL text and its implications on layout and styling. For a comprehensive guide on building RTL-aware web applications and websites, refer to [this article](https://hacks.mozilla.org/2015/09/building-rtl-aware-web-apps-and-websites-part-1/).

### 1. Use the --bl-text-x-direction CSS custom property

This property helps determine whether the element is in RTL or LTR. You can use it in your CSS like this:

\`\`\`css
.my-component {
  transform: scaleX(var(--bl-text-x-direction));
  box-shadow: calc(8px * var(--bl-text-x-direction)) 0 16px 0 rgb(39 49 66 / 10%);
}
\`\`\`

### 2. Utilize CSS logical properties

Instead of using directional properties like \`left\`, \`right\`, \`margin-left\`, etc., use their logical counterparts. This ensures that your components adapt correctly to both LTR and RTL layouts. Here are some examples:

- Use \`inline-start\` and \`inline-end\` instead of \`left\` and \`right\`
- Use \`block-start\` and \`block-end\` instead of \`top\` and \`bottom\`
- Use \`margin-inline-start\` and \`margin-inline-end\` instead of \`margin-left\` and \`margin-right\`
- Use \`padding-inline-start\` and \`padding-inline-end\` instead of \`padding-left\` and \`padding-right\`
- Use \`border-inline-start\` and \`border-inline-end\` instead of \`border-left\` and \`border-right\`

\`\`\`css
.my-component {
  margin-inline-start: 1rem;
  padding-inline-end: 0.5rem;
  border-inline-start: 1px solid #ccc;
}
\`\`\`

For more information on CSS logical properties and values, please refer to the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values).

### 3. Use inset for positioning

When using absolute or relative positioning, use the \`inset\` property with logical values:

\`\`\`css
.positioned-element {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
}
\`\`\`

By following these guidelines, you'll ensure that Baklava components work seamlessly in both LTR and RTL layouts, providing a consistent user experience across different language settings.
  `,

  localization: `
# Localization

Baklava comes with built-in support for localization. You can check the full list of supported languages [here](https://github.com/Trendyol/baklava/tree/next/translations). It essentially examines the \`lang\` attribute of the \`html\` element and configures the locale accordingly. In the absence of a specified \`lang\` attribute, it defaults to English.

To initialize localization, insert the following script at the head of your HTML file:

\`\`\`html
<html lang="tr">
  <head>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/localization.js"></script>
  </head>
  <body>
    ...
  </body>
</html>
\`\`\`

Utilizing a mutation observer, modifications to the \`lang\` attribute will automatically trigger updates across all localized components, seamlessly adapting them to the new language setting.

## Submitting New Translations or Improvements

If you wish to contribute new translations or enhancements to existing ones, kindly submit a pull request on GitHub. The translations can be found in the [translations](https://github.com/Trendyol/baklava/tree/next/translations) folder.

To add a new translation, follow these steps:

1. Add the language short code to \`lit-localize.json\`.
2. Execute \`npm run localize:extract\` to extract the new language file.
3. Update the newly created file in the translations folder.
4. Execute \`npm run localize:build\` to generate the new language file.

Submit a new pull request with the aforementioned changes.

## Adding New Localized Texts

To include localized texts, adhere to the following guidelines:

- A component should have \`@localized()\` added to its decorator.
- The \`msg\` function should possess a description in the format: *"bl-component: description of the message"*.
- The \`msg\` function should feature a default value in English.
- No property should have a default value in English; instead, it should be defined elsewhere in the code, preferably in the render section.
  `,

  "how-to-customize-a-components-style": `
# How to customize a component's style?

> You can look at our [discussion](https://github.com/Trendyol/baklava/discussions/164) to know more about our decision process.

A design system is a set of design tokens and principles that aims to create consistency in terms of both experience and development. Also, it represents branding in terms of design. Every component is written with the design language that Baklava provides. It has intentionally limited flexibility. To prevent the loss of standards and experience, we don't want and let users change directly component's style. However, we allow users to create their theme and use it for Baklava.

In Baklava, we create **web components**. Our components work in a Shadow DOM. Therefore, components are isolated from the page DOM and their styles are scoped to their DOM. Thanks to this, style rules don't leak out and we can decide whether this rule can change or not by the user while developing the component. To create flexibility in components, we use CSS custom properties. If we need to allow users to customize styling options, we define them as CSS custom variables.

## For Contributors

All **private** CSS variables should be defined under a wrapping element (For example: \`.badge\` for the badge component) **inside** the component.

By doing this, we apply a **safer** approach. We prevented developers to style components **unintentionally**. Thanks to this, we don't need to specify variables with prefixes in every component. Therefore, should be no prefixes in local variables. Because those are only used inside a component.

However, if we want to add some flexibility, customizability, we define variables with components prefix like \`--bl-badge-bg-color\`.

### Example

Let's take a badge component as an example:

\`\`\`css
/* bl-badge.css */
:host {
  display: inline-block;
  max-width: 100%;
}

.badge {
  /* Variable definition start */
  --bg-color: var(--bl-badge-bg-color, var(--bl-color-primary-contrast));
  --color: var(--bl-badge-color, var(--bl-color-primary));
  --font: var(--bl-font-title-4-medium);
  --padding-vertical: var(--bl-size-3xs);
  --padding-horizontal: var(--bl-size-3xs);
  --margin-icon: var(--bl-size-3xs);
  --icon-size: var(--bl-size-s);
  --height: var(--bl-size-xl);
  /* Variable definition stop */

  /* Using variables start */
  gap: var(--margin-icon);
  border-radius: var(--bl-size-4xs);
  padding: var(--padding-vertical) var(--padding-horizontal);
  background-color: var(--bg-color);
  color: var(--color, white);
  font: var(--font);
  height: var(--height);
  /* Using variables end */
}
\`\`\`

By the **nature** of this component, we let users to change background color and color. To accomplish this, we define a default variables \`--bl-badge-bg-color\` and \`--bl-badge-color\` and fill it with our default definitions like this:

\`\`\`css
--bg-color: var(--bl-badge-bg-color, var(--bl-color-primary-contrast));
--color: var(--bl-badge-color, var(--bl-color-primary));
\`\`\`

Therefore, if users want to change its background color and/or color, they should change \`--bl-badge-bg-color\` and/or \`--bl-badge-color\`.

\`\`\`css
.wrapper {
  --bl-badge-bg-color: red;
  --bl-badge-color: white;
}
\`\`\`

\`\`\`html
<div class="wrapper">
  <bl-badge>badge component</bl-badge>
</div>
\`\`\`

We **must** define public variables in the component's CSS Custom Properties documentation so users can discover and use them for customization.
  `,

  contributing: `
# Contributing to Baklava

Thank you for your interest in contributing to Baklava! We welcome contributions from the community.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Install dependencies**: \`npm install\`
4. **Create a branch** for your changes

## Development Workflow

1. Make your changes in a feature branch
2. Write tests for your changes
3. Ensure all tests pass: \`npm run test\`
4. Ensure linting passes: \`npm run lint\`
5. Commit your changes using conventional commits
6. Push to your fork and open a Pull Request
  `,

  "commit-rules": `
# Baklava Commit Rules

While developing Baklava we use [conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0/).

## Why Conventional Commits?

Because we automatically generate library versions and release notes from commit messages, it's critical to write commit messages properly.

## Commit Format

\`\`\`
<type>(<scope>): <subject>
\`\`\`

### Types

- \`feat\`: A new feature
- \`fix\`: A bug fix
- \`docs\`: Documentation changes
- \`style\`: Code style changes (formatting, etc.)
- \`refactor\`: Code refactoring
- \`test\`: Adding or updating tests
- \`chore\`: Maintenance tasks
  `,

  testing: `
# Baklava Testing

This guide will help contributors understand how to test Baklava.

## Overview

- Our coverage percentage for tests is **100%**
- We use [@open-wc/testing](https://www.npmjs.com/package/@open-wc/testing) for writing tests
- We use [Playwright](https://playwright.dev/) with [@web/test-runner](https://modern-web.dev/docs/test-runner/overview/) to run tests

## Running Tests

\`\`\`bash
npm run test
\`\`\`
  `,

  linting: `
# Linters & Formatters

To keep a consistent codebase, we use several linters in Baklava.

## Linters Used

| Linter | Purpose |
|--------|---------|
| [ESLint](https://eslint.org) | JavaScript/TypeScript linting |
| [Stylelint](https://stylelint.io) | CSS linting |
| [Commitlint](https://commitlint.js.org) | Commit message linting |
| [Prettier](https://prettier.io) | Code formatting |

## Running Linters Manually

\`\`\`bash
# Run all linters
npm run lint

# Fix formatting issues automatically
npm run format
\`\`\`
  `,
};
