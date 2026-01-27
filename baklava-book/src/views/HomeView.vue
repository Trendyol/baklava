<script setup lang="ts">
import CodeBlock from "@/components/CodeBlock.vue";
import { categories, components, getComponentsByCategory } from "@/data/components";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function navigateToAccordionGroup() {
  router.push("/components/accordion-group");
}

function navigateToDocs() {
  router.push("/docs/welcome");
}

// Demo states
const selectedVariant = ref("primary");
const inputValue = ref("");
const switchValue = ref(true);
const selectedTab = ref("vue");

// Code examples
const vueExample = `// Install: npm install @trendyol/baklava
<script setup>
  import '@trendyol/baklava';
<\/script>

<template>
  // In your Vue template:
  <bl-button variant="primary" @bl-click="handleClick">
    Click me
  </bl-button>

  <bl-input
    label="Email"
    placeholder="Enter your email"
    v-model="email"
  />

  <bl-select label="Country">
    <bl-select-option value="tr">Turkey</bl-select-option>
    <bl-select-option value="us">United States</bl-select-option>
    <bl-select-option value="uk">United Kingdom</bl-select-option>
  </bl-select>
</template>`;

const reactExample = `import { BlButton, BlInput, BlSelect } from '@trendyol/baklava/dist/baklava-react';

function App() {
  const [email, setEmail] = useState('');

  return (
    <>
      <BlButton variant="primary" onBlClick={handleClick}>
        Click me
      </BlButton>

      <BlInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onBlInput={(e) => setEmail(e.target.value)}
      />

      <BlSelect label="Country">
        <BlSelectOption value="tr">Turkey</BlSelectOption>
        <BlSelectOption value="us">United States</BlSelectOption>
        <BlSelectOption value="uk">United Kingdom</BlSelectOption>
      </BlSelect>
    </>
  );
}`;

const nextjsExample = `'use client';

import { Suspense } from 'react';
import { BlButton, BlInput, BlSelect } from '@trendyol/baklava/dist/baklava-react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlButton variant="primary">
        Click me
      </BlButton>

      <BlInput
        label="Email"
        placeholder="Enter your email"
      />

      <BlSelect label="Country">
        <BlSelectOption value="tr">Turkey</BlSelectOption>
        <BlSelectOption value="us">United States</BlSelectOption>
      </BlSelect>
    </Suspense>
  );
}`;

const installExample = `# Install via npm
npm install @trendyol/baklava

# Or use CDN
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/default.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/baklava.js"><\/script>`;

const themingExample = `:root {
  /* Customize primary color */
  --bl-color-primary: #6366f1;
  --bl-color-primary-highlight: #4f46e5;
  --bl-color-primary-contrast: #eef2ff;

  /* Customize typography */
  --bl-font-family: 'Inter', sans-serif;

  /* Customize border radius */
  --bl-border-radius-m: 0.5rem;
}`;

const currentCode = ref(vueExample);
const currentLanguage = ref("vue");

function setFramework(framework: string) {
  selectedTab.value = framework;
  if (framework === "vue") {
    currentCode.value = vueExample;
    currentLanguage.value = "vue";
  } else if (framework === "react") {
    currentCode.value = reactExample;
    currentLanguage.value = "tsx";
  } else {
    currentCode.value = nextjsExample;
    currentLanguage.value = "tsx";
  }
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 lg:py-32 px-6 hero-gradient overflow-hidden">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left: Text Content -->
          <div class="text-center lg:text-left">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-darkest dark:text-white mb-6 leading-tight">
              Build beautiful apps with
              <span class="text-primary">Baklava</span>
            </h1>

            <p class="text-lg md:text-xl text-neutral-dark dark:text-neutral-light mb-8 max-w-xl">
              A comprehensive web component library with {{ components.length }}+ accessible, customizable components.
              Works seamlessly with Vue, React, and any framework.
            </p>

            <div class="flex flex-wrap justify-center lg:justify-start gap-4">
              <bl-button variant="primary" size="large" icon="arrow_right" @bl-click="navigateToDocs">
                Get Started
              </bl-button>

              <bl-button
                variant="secondary"
                kind="neutral"
                size="large"
                icon="external_link"
                href="https://github.com/Trendyol/baklava"
                target="_blank"
              >
                GitHub
              </bl-button>
            </div>
          </div>

          <!-- Right: Live Demo -->
          <div class="hidden lg:block">
            <div class="rounded-2xl p-8 shadow-xl dark:shadow-none border border-neutral-lightest dark:border-neutral-dark" style="background-color: var(--bl-color-neutral-full);">
              <div class="space-y-6">
                <!-- Button Demo -->
                <div class="space-y-3">
                  <label class="text-sm font-medium text-neutral-dark dark:text-neutral-light">Buttons</label>
                  <div class="flex flex-wrap gap-3">
                    <bl-button variant="primary">Primary</bl-button>
                    <bl-button variant="secondary">Secondary</bl-button>
                    <bl-button variant="tertiary">Tertiary</bl-button>
                  </div>
                </div>

                <!-- Input Demo -->
                <div>
                  <bl-input
                    label="Email Address"
                    placeholder="you@example.com"
                    icon="mail"
                  />
                </div>

                <!-- Switch Demo -->
                <div class="flex items-center justify-between">
                  <span class="text-sm text-neutral-dark dark:text-neutral-light">Enable notifications</span>
                  <bl-switch checked />
                </div>

                <!-- Badge Demo -->
                <div class="flex flex-wrap gap-2">
                  <bl-badge icon="check_fill" class="badge-success">Stable</bl-badge>
                  <bl-badge icon="info" class="badge-info">RTL Support</bl-badge>
                  <bl-badge icon="heart" class="badge-danger">Accessible</bl-badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-6 bg-white dark:bg-neutral-darkest">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-darkest dark:text-white mb-4">
            Why Baklava?
          </h2>
          <p class="text-lg text-neutral-dark dark:text-neutral-light max-w-2xl mx-auto">
            Built with modern web standards, designed for developer experience, and optimized for accessibility.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature: Web Components -->
          <div class="p-6 rounded-xl bg-white dark:bg-neutral-darker border border-neutral-lightest dark:border-neutral-dark">
            <h3 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-2">Web Components</h3>
            <p class="text-neutral-dark dark:text-neutral-light">
              Built on web standards using Lit. Works with any framework - Vue, React, Angular, or vanilla JavaScript.
            </p>
          </div>

          <!-- Feature: Accessible -->
          <div class="p-6 rounded-xl bg-white dark:bg-neutral-darker border border-neutral-lightest dark:border-neutral-dark">
            <h3 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-2">Fully Accessible</h3>
            <p class="text-neutral-dark dark:text-neutral-light">
              WCAG 2.1 compliant with full keyboard navigation, screen reader support, and focus management.
            </p>
          </div>

          <!-- Feature: Customizable -->
          <div class="p-6 rounded-xl bg-white dark:bg-neutral-darker border border-neutral-lightest dark:border-neutral-dark">
            <h3 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-2">Fully Customizable</h3>
            <p class="text-neutral-dark dark:text-neutral-light">
              CSS custom properties for theming. Create your own theme or extend the default with your brand colors.
            </p>
          </div>

          <!-- Feature: RTL -->
          <div class="p-6 rounded-xl bg-white dark:bg-neutral-darker border border-neutral-lightest dark:border-neutral-dark">
            <h3 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
            <p class="text-neutral-dark dark:text-neutral-light">
              Full right-to-left language support with CSS logical properties and automatic layout mirroring.
            </p>
          </div>

          <!-- Feature: Dark Mode -->
          <div class="p-6 rounded-xl bg-white dark:bg-neutral-darker border border-neutral-lightest dark:border-neutral-dark">
            <h3 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-2">Dark Mode Ready</h3>
            <p class="text-neutral-dark dark:text-neutral-light">
              Built-in dark theme support. Components automatically adapt to light and dark color schemes.
            </p>
          </div>

          <!-- Feature: TypeScript -->
          <div class="p-6 rounded-xl bg-white dark:bg-neutral-darker border border-neutral-lightest dark:border-neutral-dark">
            <h3 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-2">TypeScript First</h3>
            <p class="text-neutral-dark dark:text-neutral-light">
              Full TypeScript support with comprehensive type definitions for Vue and React integrations.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Code Examples Section -->
    <section class="py-20 px-6 bg-neutral-lightest dark:bg-neutral-darker">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-darkest dark:text-white mb-4">
            Works with your stack
          </h2>
          <p class="text-lg text-neutral-dark dark:text-neutral-light max-w-2xl mx-auto">
            Use Baklava components in Vue, React, Next.js, or any other framework. Same components, same API.
          </p>
        </div>

        <div class="bg-white dark:bg-neutral-darkest rounded-2xl overflow-hidden border border-neutral-lightest dark:border-neutral-dark">
          <!-- Framework Tabs -->
          <div class="flex border-b border-neutral-lightest dark:border-neutral-dark">
            <button
              v-for="fw in ['vue', 'react', 'nextjs']"
              :key="fw"
              :class="[
                'px-6 py-4 text-sm font-medium transition-colors',
                selectedTab === fw
                  ? 'text-primary border-b-2 border-primary bg-primary-contrast dark:bg-neutral-darker'
                  : 'text-neutral-dark dark:text-neutral-light hover:text-neutral-darkest dark:hover:text-white'
              ]"
              @click="setFramework(fw)"
            >
              {{ fw === 'nextjs' ? 'Next.js' : fw.charAt(0).toUpperCase() + fw.slice(1) }}
            </button>
          </div>

          <!-- Code Block -->
          <div class="p-0">
            <CodeBlock :code="currentCode" :language="currentLanguage" />
          </div>
        </div>
      </div>
    </section>

    <!-- Theming Section -->
    <section class="py-20 px-6 bg-white dark:bg-neutral-darkest">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-neutral-darkest dark:text-white mb-4">
              Easy to customize
            </h2>
            <p class="text-lg text-neutral-dark dark:text-neutral-light mb-6">
              Baklava uses CSS custom properties for theming. Override the default variables to match your brand,
              or create entirely new themes. No build step required.
            </p>

            <ul class="space-y-3 mb-8">
              <li class="flex items-start gap-3">
                <bl-icon name="check_fill" class="check-icon mt-1" />
                <span class="text-neutral-dark dark:text-neutral-light">Change colors, typography, and spacing</span>
              </li>
              <li class="flex items-start gap-3">
                <bl-icon name="check_fill" class="check-icon mt-1" />
                <span class="text-neutral-dark dark:text-neutral-light">Component-level customization with CSS variables</span>
              </li>
              <li class="flex items-start gap-3">
                <bl-icon name="check_fill" class="check-icon mt-1" />
                <span class="text-neutral-dark dark:text-neutral-light">Built-in light and dark themes</span>
              </li>
              <li class="flex items-start gap-3">
                <bl-icon name="check_fill" class="check-icon mt-1" />
                <span class="text-neutral-dark dark:text-neutral-light">Scoped theming for different sections</span>
              </li>
            </ul>

            <bl-button variant="secondary" @bl-click="router.push('/docs/customizing-baklava-theme')">
              Learn about theming
            </bl-button>
          </div>

          <div>
            <CodeBlock :code="themingExample" language="css" />
          </div>
        </div>
      </div>
    </section>

    <!-- Component Overview -->
    <section class="py-20 px-6 bg-neutral-lightest dark:bg-neutral-darker">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-darkest dark:text-white mb-4">
            {{ components.length }} Components
          </h2>
          <p class="text-lg text-neutral-dark dark:text-neutral-light max-w-2xl mx-auto">
            From form inputs to complex data tables. Everything you need to build modern web applications.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="category in categories"
            :key="category.id"
            class="bg-white dark:bg-neutral-darkest rounded-xl p-6 border border-neutral-lightest dark:border-neutral-dark"
          >
            <div class="text-3xl mb-3" aria-hidden="true">{{ category.icon }}</div>
            <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-3">
              {{ category.label }}
            </h3>
            <ul class="space-y-2">
              <li v-for="comp in getComponentsByCategory(category.id)" :key="comp.slug">
                <router-link
                  :to="`/components/${comp.slug}`"
                  class="text-sm text-neutral-dark dark:text-neutral-light hover:text-primary transition-colors"
                >
                  {{ comp.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Installation Section -->
    <section class="py-20 px-6 bg-white dark:bg-neutral-darkest">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-darkest dark:text-white mb-4">
            Get started in seconds
          </h2>
          <p class="text-lg text-neutral-dark dark:text-neutral-light">
            Install via npm or use our CDN. No complex setup required.
          </p>
        </div>

        <CodeBlock :code="installExample" language="bash" />

        <div class="text-center mt-8">
          <bl-button variant="primary" size="large" @bl-click="navigateToDocs">
            Read the documentation
          </bl-button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-6 bg-primary">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to build something amazing?
        </h2>
        <p class="text-lg text-primary-contrast mb-8 max-w-2xl mx-auto">
          Join thousands of developers using Baklava to create beautiful, accessible web applications.
        </p>

        <div class="flex flex-wrap justify-center gap-4">
          <bl-button
            variant="secondary"
            kind="neutral"
            size="large"
            @bl-click="navigateToAccordionGroup"
          >
            Explore Components
          </bl-button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-6 bg-neutral-darkest text-white">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <!-- Brand -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-2 mb-4">
              <svg class="h-8 w-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.0677 14.351C19.1315 13.7264 20.8683 13.7264 21.932 14.351L34.0424 21.4613C35.0782 22.0694 35.0916 23.0461 34.0727 23.6638L21.9623 31.0053C20.8923 31.654 19.1074 31.654 18.0374 31.0053L5.92706 23.6638C4.90816 23.0461 4.92161 22.0694 5.95739 21.4613L18.0677 14.351Z" fill="url(#paint0_linear_footer)"/>
                <path d="M18.0778 11.3675C19.1409 10.7458 20.8723 10.746 21.935 11.368L34.0031 18.4306C35.0549 19.0461 35.0549 20.0393 34.0031 20.6548L21.935 27.7174C20.8723 28.3394 19.1409 28.3396 18.0778 27.7179L5.99912 20.6553C4.9462 20.0396 4.9462 19.0458 5.99912 18.4301L18.0778 11.3675Z" fill="url(#paint1_linear_footer)"/>
                <path d="M18.2205 6.66917C19.2418 6.15536 20.7579 6.15536 21.7792 6.66917L31.9479 11.7848C33.7554 12.6941 34.7939 14.0146 34.7939 15.4035C34.7939 16.1692 34.2674 16.9033 33.3315 17.4426L21.914 24.0216C20.8544 24.6322 19.1454 24.6322 18.0857 24.0216L6.66825 17.4426C5.73232 16.9033 5.20588 16.1692 5.20588 15.4035C5.20588 14.0146 6.24437 12.6941 8.05183 11.7848L18.2205 6.66917Z" fill="#EF6114"/>
                <defs>
                  <linearGradient id="paint0_linear_footer" x1="33.943" y1="30.4833" x2="21.2188" y2="15.5132" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7AF76"/>
                    <stop offset="1" stop-color="#F59548"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_footer" x1="34.1435" y1="30.9086" x2="18.7058" y2="12.746" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F59548"/>
                    <stop offset="1" stop-color="#F27A1A"/>
                  </linearGradient>
                </defs>
              </svg>
              <span class="text-xl font-bold">Baklava</span>
            </div>
            <p class="text-neutral-light text-sm max-w-md">
              Baklava Design System. Building consistent, accessible, and beautiful user interfaces.
            </p>
          </div>

          <!-- Resources -->
          <div>
            <h4 class="font-semibold mb-4">Resources</h4>
            <ul class="space-y-2 text-sm text-neutral-light">
              <li><router-link to="/docs/welcome" class="hover:text-white">Documentation</router-link></li>
              <li><router-link to="/components/button" class="hover:text-white">Components</router-link></li>
              <li><a href="https://baklava.design" target="_blank" class="hover:text-white">Storybook</a></li>
            </ul>
          </div>

          <!-- Community -->
          <div>
            <h4 class="font-semibold mb-4">Community</h4>
            <ul class="space-y-2 text-sm text-neutral-light">
              <li><a href="https://github.com/Trendyol/baklava" target="_blank" class="hover:text-white">GitHub</a></li>
              <li><a href="https://github.com/Trendyol/baklava/discussions" target="_blank" class="hover:text-white">Discussions</a></li>
              <li><router-link to="/docs/contributing" class="hover:text-white">Contributing</router-link></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-neutral-darker pt-8 text-center text-sm text-neutral-light">
          <p>&copy; {{ new Date().getFullYear() }} Baklava Design System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.hero-gradient {
  background: linear-gradient(to bottom, var(--bl-color-primary-contrast), white);
}

/* Badge colors for light mode */
.badge-success {
  --bl-badge-bg-color: #dcfce7;
  --bl-badge-color: #166534;
}

.badge-info {
  --bl-badge-bg-color: #dbeafe;
  --bl-badge-color: #1e40af;
}

.badge-danger {
  --bl-badge-bg-color: #fce7f3;
  --bl-badge-color: #9d174d;
}

/* Check icon for lists */
.check-icon {
  color: var(--bl-color-success);
}
</style>

<style>
html.dark .hero-gradient {
  background: linear-gradient(to bottom, #3d2010, #0f131a);
}

/* Badge colors for dark mode */
html.dark .badge-success {
  --bl-badge-bg-color: #166534;
  --bl-badge-color: #dcfce7;
}

html.dark .badge-info {
  --bl-badge-bg-color: #1e40af;
  --bl-badge-color: #dbeafe;
}

html.dark .badge-danger {
  --bl-badge-bg-color: #9d174d;
  --bl-badge-color: #fce7f3;
}

/* Check icon for lists - dark mode */
html.dark .check-icon {
  color: #4ade80;
}
</style>
