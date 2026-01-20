<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getDocBySlug, getDocCategoryBySlug, docCategories } from "@/data/docs";

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

  "customizing-baklava-theme": `
# Customizing Baklava Theme

Baklava uses CSS Custom Properties (CSS Variables) for theming.

## Using Dark Theme

\`\`\`html
<link rel="stylesheet" href="@trendyol/baklava/dist/themes/default.css" />
<link rel="stylesheet" href="@trendyol/baklava/dist/themes/dark.css" />

<html data-theme="dark">
  <!-- Dark theme applied -->
</html>
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
# Colors

Baklava provides a comprehensive color palette.

## Primary Colors

| Variable | Value | Usage |
|----------|-------|-------|
| \`--bl-color-primary\` | #f27a1a | Main brand color |
| \`--bl-color-primary-highlight\` | #ef6114 | Hover states |
| \`--bl-color-primary-contrast\` | #fef2e8 | Light backgrounds |

## Semantic Colors

| Variable | Value | Usage |
|----------|-------|-------|
| \`--bl-color-success\` | #0bc15c | Success states |
| \`--bl-color-danger\` | #ff5043 | Error states |
| \`--bl-color-warning\` | #ffb600 | Warning states |
| \`--bl-color-info\` | #5794ff | Info states |

## Neutral Colors

| Variable | Value |
|----------|-------|
| \`--bl-color-neutral-darkest\` | #0f131a |
| \`--bl-color-neutral-darker\` | #273142 |
| \`--bl-color-neutral-dark\` | #6e7787 |
| \`--bl-color-neutral-light\` | #95a1b5 |
| \`--bl-color-neutral-lighter\` | #afbbca |
| \`--bl-color-neutral-lightest\` | #f1f2f7 |
  `,

  typography: `
# Typography

Baklava uses **Rubik** as the default font family.

## Font Weights

| Weight | Value |
|--------|-------|
| Light | 300 |
| Regular | 400 |
| Medium | 500 |
| Semibold | 600 |
| Bold | 700 |

## Font Sizes

| Variable | Size |
|----------|------|
| \`--bl-font-size-xs\` | 10px |
| \`--bl-font-size-s\` | 12px |
| \`--bl-font-size-m\` | 14px |
| \`--bl-font-size-l\` | 16px |
| \`--bl-font-size-xl\` | 20px |
| \`--bl-font-size-2xl\` | 24px |
| \`--bl-font-size-3xl\` | 28px |

## Usage

\`\`\`css
.my-heading {
  font: var(--bl-font-heading-1-bold);
}

.my-text {
  font: var(--bl-font-body-text-2-regular);
}
\`\`\`
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
