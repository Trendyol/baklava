<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { getDocBySlug, getDocCategoryBySlug, docCategories } from "@/data/docs";
import ColorPalette from "@/components/ColorPalette.vue";
import BorderRadiusDemo from "@/components/BorderRadiusDemo.vue";
import TypographyDemo from "@/components/TypographyDemo.vue";
import SizingDemo from "@/components/SizingDemo.vue";
import IconographyDemo from "@/components/IconographyDemo.vue";
import ZIndexDemo from "@/components/ZIndexDemo.vue";

const route = useRoute();

const slug = computed(() => route.params.slug as string);
const doc = computed(() => getDocBySlug(slug.value));
const category = computed(() => getDocCategoryBySlug(slug.value));

// MDX dosyasından içerik çekme (basitleştirilmiş versiyon)
const content = ref("");
const loading = ref(true);

// Doküman içerikleri (önceden tanımlı)
const docContents: Record<string, string> = {
  welcome: `
# Welcome to Baklava

Baklava is a design system provided by Trendyol to create a consistent UI/UX for Trendyol applications.

## Features

- 🎨 **27+ Components** - Buttons, Inputs, Dialogs, and more
- 🟢 **Vue Support** - Works seamlessly with Vue 3
- 🔵 **React Support** - React wrappers included
- ⬛ **Next.js Support** - SSR-compatible with App Router
- 🌙 **Dark Mode** - Built-in theme support
- ♿ **Accessible** - WCAG 2.1 compliant
- 📱 **Responsive** - Mobile-first design
- 🌍 **RTL Support** - Right-to-left layout support
- 🌐 **Localization** - Multi-language support
  `,

  "using-baklava-in-vue": `
# Using Baklava in Vue

Vue is mostly compatible with custom elements.

## Installation

### Via NPM

\`\`\`bash
npm install @trendyol/baklava
\`\`\`

### Setup in main.js/main.ts

\`\`\`js
import '@trendyol/baklava/dist/themes/default.css'
import '@trendyol/baklava'
import { setIconPath } from '@trendyol/baklava'

setIconPath('https://cdn.jsdelivr.net/npm/@trendyol/baklava-icons@latest/icons')
\`\`\`

### Vite Configuration

\`\`\`js
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
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

## TypeScript Support

Create a \`components.d.ts\` file in your src directory:

\`\`\`ts
/// <reference types="@trendyol/baklava/dist/baklava-vue.d.ts" />
\`\`\`

## Usage

\`\`\`vue
<template>
  <bl-button variant="primary" @bl-click="handleClick">
    Click me
  </bl-button>
</template>
\`\`\`
  `,

  "using-baklava-in-react": `
# Using Baklava in React

React needs special wrappers to work with Web Components. Baklava provides React components via \`@lit-labs/react\`.

## Installation

\`\`\`bash
npm install @trendyol/baklava
\`\`\`

## Setup in index.js/main.tsx

\`\`\`jsx
import '@trendyol/baklava/dist/themes/default.css'
import '@trendyol/baklava'
import { setIconPath } from '@trendyol/baklava'

setIconPath('https://cdn.jsdelivr.net/npm/@trendyol/baklava-icons@latest/icons')
\`\`\`

## Usage

\`\`\`jsx
import { Suspense } from 'react'
import { BlButton, BlInput } from '@trendyol/baklava/dist/baklava-react'

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlButton variant="primary" onBlClick={() => console.log('Clicked!')}>
        Click me
      </BlButton>
    </Suspense>
  )
}
\`\`\`

## Event Handling

\`\`\`jsx
import { BlInput } from '@trendyol/baklava/dist/baklava-react'

function Form() {
  const [value, setValue] = useState('')
  
  return (
    <BlInput 
      value={value} 
      onBlInput={(e) => setValue(e.target.value)} 
    />
  )
}
\`\`\`
  `,

  "using-baklava-in-next": `
# Using Baklava in Next.js

Next.js is a React framework that requires special configuration for Web Components due to Server-Side Rendering (SSR).

## Installation

\`\`\`bash
npm install @trendyol/baklava
\`\`\`

## Configuration

### next.config.js

\`\`\`js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@trendyol/baklava'],
}

module.exports = nextConfig
\`\`\`

## Client-Side Only Import

Baklava components must be loaded on the client side only. Create a wrapper component:

### components/BaklavaProvider.tsx

\`\`\`tsx
'use client';

import { useEffect, useState } from 'react';

export default function BaklavaProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    import('@trendyol/baklava');
    import('@trendyol/baklava/dist/themes/default.css');
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
}
\`\`\`

## Usage in Layout (App Router)

### app/layout.tsx

\`\`\`tsx
import BaklavaProvider from '@/components/BaklavaProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BaklavaProvider>
          {children}
        <\/BaklavaProvider>
      <\/body>
    <\/html>
  );
}
\`\`\`

## Using Components

### app/page.tsx

\`\`\`tsx
'use client';

import { Suspense } from 'react';
import { BlButton, BlInput } from '@trendyol/baklava/dist/baklava-react';

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <BlButton variant="primary" onBlClick={() => console.log('Clicked!')}>
          Click me
        </BlButton>
        <BlInput placeholder="Enter text..." />
      </Suspense>
    </main>
  );
}
\`\`\`

## Pages Router (Legacy)

For the Pages Router, use dynamic imports with \`ssr: false\` option.

Create a dynamic wrapper in \`pages/_app.tsx\`:
- Use \`dynamic()\` from \`next/dynamic\`
- Set \`{ ssr: false }\` to disable server-side rendering
- Wrap your app with the BaklavaProvider component

## Important Notes

- Always use \`'use client'\` directive for components using Baklava
- Wrap Baklava React components in \`<Suspense>\`
- Load Baklava dynamically to avoid SSR issues
- For Pages Router, use dynamic imports with SSR disabled
  `,

  "customizing-baklava-theme": `
# Customizing Baklava Theme

Baklava uses CSS Custom Properties (CSS Variables) for theming.

## Using Dark Theme

\`\`\`html
<link rel="stylesheet" href="@trendyol/baklava/dist/themes/default.css" />
<link rel="stylesheet" href="@trendyol/baklava/dist/themes/dark.css" />

<html data-theme="dark">
  <!-- Dark theme applied -->
<\/html>
\`\`\`

## Creating Custom Theme

Copy and modify the default theme variables:

\`\`\`css
:root {
  /* Primary Color */
  --bl-color-primary: #f27a1a;
  --bl-color-primary-highlight: #ef6114;
  --bl-color-primary-contrast: #fef2e8;

  /* Typography */
  --bl-font-family: 'Rubik Variable', sans-serif;
  
  /* Spacing */
  --bl-size-m: 1rem;
  --bl-size-l: 1.25rem;
  
  /* Border Radius */
  --bl-border-radius-m: 0.375rem;
}
\`\`\`

## Component-Level Customization

\`\`\`css
bl-button {
  --bl-button-display: block;
  --bl-color-primary: purple;
}
\`\`\`
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

## Display Titles

Display fonts are intended for use at large sizes for headings. Often used on landing pages.

| Variable | Weight | Size | Line Height |
|----------|--------|------|-------------|
| \`--bl-font-display-light\` | 300 (Light) | 48px / 3rem | 56px |
| \`--bl-font-display-regular\` | 400 (Regular) | 48px / 3rem | 56px |
| \`--bl-font-display-medium\` | 500 (Medium) | 48px / 3rem | 56px |
| \`--bl-font-display-semibold\` | 600 (Semibold) | 48px / 3rem | 56px |
| \`--bl-font-display-bold\` | 700 (Bold) | 48px / 3rem | 56px |

## Headings

Heading fonts are used as larger, higher impact text, such as in a title or section header.

### Heading 1
| Variable | Weight | Size | Line Height |
|----------|--------|------|-------------|
| \`--bl-font-heading-1-regular\` | 400 | 32px / 2rem | 36px |
| \`--bl-font-heading-1-medium\` | 500 | 32px / 2rem | 36px |
| \`--bl-font-heading-1-semibold\` | 600 | 32px / 2rem | 36px |
| \`--bl-font-heading-1-bold\` | 700 | 32px / 2rem | 36px |

### Heading 2
| Variable | Weight | Size | Line Height |
|----------|--------|------|-------------|
| \`--bl-font-heading-2-regular\` | 400 | 28px / 1.75rem | 32px |
| \`--bl-font-heading-2-medium\` | 500 | 28px / 1.75rem | 32px |
| \`--bl-font-heading-2-semibold\` | 600 | 28px / 1.75rem | 32px |
| \`--bl-font-heading-2-bold\` | 700 | 28px / 1.75rem | 32px |

### Heading 3
| Variable | Weight | Size | Line Height |
|----------|--------|------|-------------|
| \`--bl-font-heading-3-regular\` | 400 | 24px / 1.5rem | 28px |
| \`--bl-font-heading-3-medium\` | 500 | 24px / 1.5rem | 28px |
| \`--bl-font-heading-3-semibold\` | 600 | 24px / 1.5rem | 28px |
| \`--bl-font-heading-3-bold\` | 700 | 24px / 1.5rem | 28px |

## Sub Titles

Subtitles are smaller than headlines. They are typically reserved for medium-emphasis text.

### Sub Title 1
| Variable | Weight | Size | Line Height |
|----------|--------|------|-------------|
| \`--bl-font-title-1-regular\` | 400 | 20px / 1.25rem | 24px |
| \`--bl-font-title-1-medium\` | 500 | 20px / 1.25rem | 24px |
| \`--bl-font-title-1-semibold\` | 600 | 20px / 1.25rem | 24px |
| \`--bl-font-title-1-bold\` | 700 | 20px / 1.25rem | 24px |

### Sub Title 2
| Variable | Weight | Size | Line Height |
|----------|--------|------|-------------|
| \`--bl-font-title-2-regular\` | 400 | 16px / 1rem | 20px |
| \`--bl-font-title-2-medium\` | 500 | 16px / 1rem | 20px |
| \`--bl-font-title-2-semibold\` | 600 | 16px / 1rem | 20px |
| \`--bl-font-title-2-bold\` | 700 | 16px / 1rem | 20px |

### Sub Title 3
| Variable | Weight | Size | Line Height |
|----------|--------|------|-------------|
| \`--bl-font-title-3-regular\` | 400 | 14px / 0.875rem | 16px |
| \`--bl-font-title-3-medium\` | 500 | 14px / 0.875rem | 16px |
| \`--bl-font-title-3-semibold\` | 600 | 14px / 0.875rem | 16px |
| \`--bl-font-title-3-bold\` | 700 | 14px / 0.875rem | 16px |

### Sub Title 4
| Variable | Weight | Size | Line Height |
|----------|--------|------|-------------|
| \`--bl-font-title-4-regular\` | 400 | 12px / 0.75rem | 14px |
| \`--bl-font-title-4-medium\` | 500 | 12px / 0.75rem | 14px |
| \`--bl-font-title-4-semibold\` | 600 | 12px / 0.75rem | 14px |
| \`--bl-font-title-4-bold\` | 700 | 12px / 0.75rem | 14px |

## Body Texts

Body text is typically used for long-form writing as it works well for small text sizes.

### Body Text 1
| Variable | Weight | Size | Line Height |
|----------|--------|------|-------------|
| \`--bl-font-body-text-1-regular\` | 400 | 16px / 1rem | 18px |
| \`--bl-font-body-text-1-medium\` | 500 | 16px / 1rem | 18px |

### Body Text 2
| Variable | Weight | Size | Line Height |
|----------|--------|------|-------------|
| \`--bl-font-body-text-2-regular\` | 400 | 14px / 0.875rem | 16px |
| \`--bl-font-body-text-2-medium\` | 500 | 14px / 0.875rem | 16px |

### Body Text 3
| Variable | Weight | Size | Line Height |
|----------|--------|------|-------------|
| \`--bl-font-body-text-3-regular\` | 400 | 12px / 0.75rem | 14px |
| \`--bl-font-body-text-3-medium\` | 500 | 12px / 0.75rem | 14px |

## Captions

Caption is the smallest font size. They are mostly used for labels.

| Variable | Weight | Size | Line Height |
|----------|--------|------|-------------|
| \`--bl-font-caption\` | 500 (Medium) | 10px / 0.625rem | 12px |

## Usage Examples

\`\`\`css
/* Using typography variables */
.page-title {
  font: var(--bl-font-heading-1-bold);
}

.section-title {
  font: var(--bl-font-heading-2-semibold);
}

.body-text {
  font: var(--bl-font-body-text-2-regular);
}

.label {
  font: var(--bl-font-caption);
}
\`\`\`
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

/* Using size variables for gaps */
.flex-container {
  gap: var(--bl-size-s);
}

/* Using size variables for dimensions */
.icon-container {
  width: var(--bl-size-2xl);
  height: var(--bl-size-2xl);
}
\`\`\`

## Best Practices

- Use smaller sizes (\`4xs\` to \`xs\`) for fine details like borders and small gaps
- Use medium sizes (\`s\` to \`l\`) for component padding and standard spacing
- Use larger sizes (\`xl\` to \`6xl\`) for section spacing and larger elements
- Maintain consistency by using the same size scale throughout your application
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

## Usage Examples

\`\`\`css
/* Standard button */
.button {
  border-radius: var(--bl-border-radius-m);
}

/* Card with larger radius */
.card {
  border-radius: var(--bl-border-radius-l);
}

/* Pill-shaped badge */
.badge {
  border-radius: var(--bl-border-radius-pill);
}

/* Circular avatar */
.avatar {
  border-radius: var(--bl-border-radius-circle);
}
\`\`\`

## Best Practices

- Use \`xs\` or \`s\` for small elements like tags or badges
- Use \`m\` (default) for most interactive elements like buttons and inputs
- Use \`l\` for cards and larger containers
- Use \`pill\` for capsule-shaped buttons or badges
- Use \`circle\` for avatars, icons, and perfectly round elements
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

## Customizing Icons

### Size

Icon size is controlled via CSS \`font-size\`:

\`\`\`css
bl-icon {
  font-size: 24px;
}

/* Or using Baklava size variables */
bl-icon {
  font-size: var(--bl-font-size-xl);
}
\`\`\`

### Color

Icon color is controlled via CSS \`color\`:

\`\`\`css
bl-icon {
  color: var(--bl-color-primary);
}
\`\`\`

## Common Icons

Here are some commonly used icon names:

**Navigation & Actions**
- home, search, menu, close, arrow_left, arrow_right, arrow_up, arrow_down

**Status & Feedback**
- check_fill, close, info, warning, warning_fill

**Objects**
- account, bell, calendar, cart, email, heart, star, settings

**Actions**
- edit, delete, copy, share, download, upload, refresh

**Misc**
- plus, minus, external_link, location, lock, eye, eye_off

## Icon Documentation

For the complete list of available icons, visit the [Baklava Icons Documentation](https://trendyol.github.io/baklava-icons/).
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

## Usage Examples

\`\`\`css
/* Custom popover */
.my-popover {
  z-index: var(--bl-index-popover);
}

/* Sticky header */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: var(--bl-index-sticky);
}

/* Modal backdrop */
.backdrop {
  z-index: var(--bl-index-overlay);
}

/* Modal content */
.modal {
  z-index: var(--bl-index-dialog);
}

/* Toast notifications */
.toast {
  z-index: var(--bl-index-notification);
}
\`\`\`

## Stacking Order

The z-index values follow a logical stacking order:

1. **Deep (-1)** - Background elements
2. **Base (1)** - Default elevated elements
3. **Popover (100)** - Dropdown menus, popovers
4. **Tooltip (200)** - Tooltips (appear above popovers)
5. **Sticky (300)** - Sticky headers/footers
6. **Overlay (400)** - Backdrops, overlays
7. **Dialog (500)** - Modals, dialogs
8. **Notification (600)** - Toast messages (always on top)

## Best Practices

- Always use Baklava z-index variables instead of arbitrary numbers
- This ensures consistent stacking across your application
- Notifications always appear on top of everything
- Dialogs appear above overlays
- Tooltips appear above popovers
  `,

  requirements: `
# Requirements

Baklava is a [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) based design system. We are using [Lit](https://lit.dev) to simplify the process of creating web components and we create an [ECMAScript module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) (ESM).

It is built on top of web standards and it should work without any issues in all modern browsers, but it's important to note that for older versions of the browsers, the support for web components may be limited or non-existent, this is where polyfills can be used to fill the gaps.

## Key Technologies

Baklava relies on a few key technologies:

- **Custom Elements API**: Allows developers to create custom elements and define their behavior
- **Shadow DOM**: Creates a "shadow" DOM tree for a custom element, separate from the main DOM
- **HTML Templates**: Define a template for a component that can be instantiated and used multiple times
- **JavaScript Runtime**: Requires a JavaScript runtime that supports ES6 or later

## Browser Support

According to **caniuse.com**, Baklava's browser support is more than **95%**. The remaining 5% can be supported by compiling JavaScript in build time and adding polyfills.

### Modern Browser Support

| Browser | Supports ES2019 & web components |
|---------|------|
| Chrome | >= 73 |
| Firefox | >= 63 |
| Safari | >= 12.1 |
| Edge | >= 79 |

### Legacy Browser Support

Supporting older browsers requires some steps:
- Compiling modern JavaScript syntax to ES5
- Transforming ES modules to another module system
- Loading polyfills

## Polyfills

Common polyfills for web components:

- **custom-elements-es5-adapter.js**: Support custom elements in older browsers
- **shadydom & shadycss**: Support Shadow DOM in older browsers
- **template.js**: Support the template element in older browsers
- **core-js**: ECMAScript polyfill
- **SystemJS**: Dynamic module loader for ES modules

\`\`\`js
// Import webcomponents polyfills
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
\`\`\`

### Polyfills in Baklava Core

- **element-internals-polyfill**: Support element internals features (Form Control) in Safari browsers
  `,

  "rtl-support": `
# Right-to-Left (RTL) Support

Baklava components support Right-to-Left (RTL) text direction, which is essential for languages that are written from right to left, such as Arabic, Hebrew, and Persian.

## Enabling RTL

To enable Right-to-Left (RTL), add the \`dir="rtl"\` attribute to your HTML tag:

\`\`\`html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RTL Example<\/title>
  <\/head>
  <body>
    <!-- Your content here -->
  <\/body>
<\/html>
\`\`\`

## CSS Custom Property

Use the \`--bl-text-x-direction\` CSS custom property to determine whether the element is in RTL or LTR:

\`\`\`css
.my-component {
  transform: scaleX(var(--bl-text-x-direction));
  box-shadow: calc(8px * var(--bl-text-x-direction)) 0 16px 0 rgb(39 49 66 / 10%);
}
\`\`\`

## CSS Logical Properties

Use CSS logical properties instead of directional properties:

| Instead of | Use |
|------------|-----|
| \`left\`, \`right\` | \`inline-start\`, \`inline-end\` |
| \`top\`, \`bottom\` | \`block-start\`, \`block-end\` |
| \`margin-left\`, \`margin-right\` | \`margin-inline-start\`, \`margin-inline-end\` |
| \`padding-left\`, \`padding-right\` | \`padding-inline-start\`, \`padding-inline-end\` |
| \`border-left\`, \`border-right\` | \`border-inline-start\`, \`border-inline-end\` |

\`\`\`css
.my-component {
  margin-inline-start: 1rem;
  padding-inline-end: 0.5rem;
  border-inline-start: 1px solid #ccc;
}
\`\`\`

## Positioning with Inset

When using absolute or relative positioning, use the \`inset\` property with logical values:

\`\`\`css
.positioned-element {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
}
\`\`\`

By following these guidelines, you'll ensure that Baklava components work seamlessly in both LTR and RTL layouts.
  `,

  localization: `
# Localization

Baklava comes with built-in support for localization. You can check the full list of supported languages in the [translations folder](https://github.com/Trendyol/baklava/tree/next/translations).

## How It Works

Baklava examines the \`lang\` attribute of the \`html\` element and configures the locale accordingly. In the absence of a specified \`lang\` attribute, it defaults to English.

## Setup

To initialize localization, insert the following script at the head of your HTML file:

\`\`\`html
<html lang="tr">
  <head>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/localization.js"><\/script>
  <\/head>
  <body>
    ...
  <\/body>
<\/html>
\`\`\`

Utilizing a mutation observer, modifications to the \`lang\` attribute will automatically trigger updates across all localized components, seamlessly adapting them to the new language setting.

## Submitting New Translations

If you wish to contribute new translations or enhancements to existing ones, follow these steps:

1. Add the language short code to \`lit-localize.json\`
2. Execute \`npm run localize:extract\` to extract the new language file
3. Update the newly created file in the translations folder
4. Execute \`npm run localize:build\` to generate the new language file
5. Submit a new pull request

## Adding Localized Texts

To include localized texts in components:

- A component should have \`@localized()\` added to its decorator
- The \`msg\` function should have a description in the format: "bl-component: description of the message"
- The \`msg\` function should have a default value in English
- No property should have a default value in English; define it elsewhere in the code
  `,

  "how-to-customize-a-components-style": `
# How to Customize a Component's Style

A design system is a set of design tokens and principles that aims to create consistency in terms of both experience and development. Every component is written with the design language that Baklava provides.

## Shadow DOM & Encapsulation

In Baklava, we create **web components** that work in a Shadow DOM. Components are isolated from the page DOM and their styles are scoped to their DOM. Style rules don't leak out.

To create flexibility in components, we use **CSS custom properties (variables)**. If we need to allow users to customize styling options, we define them as CSS custom variables.

## Customizing Components

To customize a component's style, use the CSS custom properties provided by each component. For example, with the badge component:

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

## Finding Available CSS Custom Properties

Each component's available CSS custom properties are documented in the **API Reference** section of the component's documentation page. Look for the "CSS Custom Properties" table.

## Example: Badge Component

The badge component exposes these CSS variables:

| Variable | Description |
|----------|-------------|
| \`--bl-badge-bg-color\` | Background color of the badge |
| \`--bl-badge-color\` | Text color of the badge |

\`\`\`css
/* Custom badge colors */
bl-badge {
  --bl-badge-bg-color: var(--bl-color-success-contrast);
  --bl-badge-color: var(--bl-color-success);
}
\`\`\`

## Best Practices

- Only use documented CSS custom properties for customization
- Avoid using global CSS selectors that might affect Shadow DOM isolation
- Use theme variables (\`--bl-color-*\`) for consistency with the design system
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

## Component Development

When creating or modifying components:

- Follow the existing component structure
- Write comprehensive tests (100% coverage required)
- Add Storybook documentation
- Update the \`custom-elements.json\` manifest
- Add RTL support where applicable

## Pull Request Guidelines

- Reference any related issues
- Provide a clear description of changes
- Include screenshots for UI changes
- Ensure CI checks pass

## Code Style

- We use ESLint and Prettier for code formatting
- Run \`npm run format\` to fix formatting issues
- Follow conventional commit message format

For more detailed guidelines, see our [CONTRIBUTING.md](https://github.com/Trendyol/baklava/blob/next/CONTRIBUTING.md) file.
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

### Scope (Optional)

The scope can be:
- \`design\`: Changes related to design tokens
- \`storybook\`: Changes related to Storybook
- Component name: \`button\`, \`icon\`, \`select\`, etc.

### Examples

\`\`\`
feat(button): add loading state
fix(select): resolve dropdown positioning issue
docs: update installation guide
\`\`\`

## Using the Commit CLI

You can use the commit prompt to build a commit message:

\`\`\`bash
npm run commit
\`\`\`

This will guide you through building a proper commit message interactively.

## Git Message Template

We provide a git message template file (\`.gitmessage\`). To use it:

\`\`\`bash
git config --local include.path ../.gitconfig
\`\`\`

Then when you run \`git commit\`, you'll see example commit messages.

## Validation

When you commit, your message is validated by commitlint. Invalid messages will be rejected with helpful error messages.
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

## Supported Browsers

Tests run in:
- Chromium
- Firefox
- WebKit

## Writing Tests

Use the @open-wc/testing helpers for writing tests. Example:

\`\`\`js
import { fixture, html, expect } from '@open-wc/testing';
import '../bl-button';

describe('bl-button', () => {
  it('renders with default values', async () => {
    const el = await fixture(html\`<bl-button>Click me</bl-button>\`);
    expect(el).to.exist;
    expect(el.variant).to.equal('primary');
  });

  it('responds to click events', async () => {
    const el = await fixture(html\`<bl-button>Click me</bl-button>\`);
    let clicked = false;
    el.addEventListener('bl-click', () => clicked = true);
    el.click();
    expect(clicked).to.be.true;
  });
});
\`\`\`

For more information, check the [Open Web Components Testing Documentation](https://open-wc.org/docs/testing/helpers/).
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

## Pre-commit Hooks

When you make a git commit, staged files are processed with linters (via [Husky](https://typicode.github.io/husky/)):

- \`eslint\` runs for \`.ts\` and \`.js\` files
- \`stylelint\` runs for \`.css\` files
- \`commitlint\` checks the commit message

If there are any issues, the commit will be interrupted with an error message.

## Running Linters Manually

\`\`\`bash
# Run all linters
npm run lint

# Fix formatting issues automatically
npm run format
\`\`\`

## CI/CD Pipeline

The same lint rules apply in our pipeline flow for every push. The pipeline runs \`npm run lint\` to ensure no push breaks our coding rules.

## Formatting

We use Prettier and ESLint as formatters to automatically fix some issues. However, we don't run this command on every commit automatically to maintain control over what changes are made.
  `,
};

watch(
  slug,
  async (newSlug) => {
    loading.value = true;
    // Önceden tanımlı içerik varsa kullan
    if (docContents[newSlug]) {
      content.value = docContents[newSlug];
    } else {
      content.value = `# ${doc.value?.name || "Document"}\n\nBu doküman henüz eklenmedi.`;
    }
    loading.value = false;
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex">
    <!-- Docs Sidebar -->
    <aside
      class="fixed left-0 top-14 bottom-0 w-[260px] bg-white dark:bg-neutral-darkest border-r border-neutral-lightest dark:border-neutral-darker overflow-y-auto"
    >
      <nav class="p-4">
        <div v-for="cat in docCategories" :key="cat.id" class="mb-6">
          <h3
            class="flex items-center gap-2 text-xs font-semibold text-neutral-dark uppercase tracking-wider mb-2 px-2"
          >
            <span>{{ cat.icon }}</span>
            <span>{{ cat.label }}</span>
          </h3>

          <ul class="space-y-0.5">
            <li v-for="item in cat.items" :key="item.slug">
              <router-link
                :to="`/docs/${item.slug}`"
                class="block px-3 py-1.5 rounded-lg text-sm transition-colors"
                :class="[
                  slug === item.slug
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-neutral-darker dark:text-neutral-light hover:bg-neutral-lightest dark:hover:bg-neutral-darker',
                ]"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Content -->
    <main class="flex-1 ml-[260px] p-8 max-w-4xl">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-neutral-dark mb-6">
        <router-link to="/" class="hover:text-primary">Home</router-link>
        <span>/</span>
        <span v-if="category">{{ category.label }}</span>
        <span v-if="category">/</span>
        <span class="text-neutral-darkest dark:text-white">{{ doc?.name }}</span>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <bl-spinner size="large"></bl-spinner>
      </div>

      <!-- Special Pages -->
      <template v-else-if="slug === 'colors'">
        <ColorPalette />
      </template>

      <template v-else-if="slug === 'border-radius'">
        <BorderRadiusDemo />
      </template>

      <template v-else-if="slug === 'typography'">
        <TypographyDemo />
      </template>

      <template v-else-if="slug === 'sizing'">
        <SizingDemo />
      </template>

      <template v-else-if="slug === 'iconography'">
        <IconographyDemo />
      </template>

      <template v-else-if="slug === 'z-index'">
        <ZIndexDemo />
      </template>

      <!-- Content (Markdown rendered) -->
      <article v-else class="prose prose-neutral dark:prose-invert max-w-none">
        <div v-html="renderMarkdown(content)" />
      </article>
    </main>
  </div>
</template>

<script lang="ts">
// Simple markdown renderer
function renderMarkdown(md: string): string {
  return (
    md
      // Headers
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mt-8 mb-3">$1</h3>'
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mt-10 mb-4">$1</h2>'
      )
      .replace(
        /^# (.*$)/gim,
        '<h1 class="text-3xl font-bold text-neutral-darkest dark:text-white mb-6">$1</h1>'
      )
      // Code blocks
      .replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        '<pre class="bg-neutral-darkest text-neutral-lightest p-4 rounded-lg overflow-x-auto text-sm my-4"><code>$2</code></pre>'
      )
      // Inline code
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-neutral-lightest dark:bg-neutral-darker text-primary px-1.5 py-0.5 rounded text-sm">$1</code>'
      )
      // Bold
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      // Lists
      .replace(
        /^- (.*$)/gim,
        '<li class="ml-4 text-neutral-darker dark:text-neutral-light">$1</li>'
      )
      // Tables
      .replace(
        /\| ([^|]+) \|/g,
        '<td class="border border-neutral-lightest dark:border-neutral-darker px-3 py-2">$1</td>'
      )
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="text-neutral-darker dark:text-neutral-light mb-4">')
      // Wrap in paragraph
      .replace(
        /^([^<].+)$/gim,
        '<p class="text-neutral-darker dark:text-neutral-light mb-4">$1</p>'
      )
  );
}

export default {
  methods: {
    renderMarkdown,
  },
};
</script>
