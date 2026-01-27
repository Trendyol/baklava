<script setup lang="ts">
import ApiTable from "@/components/ApiTable.vue";
import CodeBlock from "@/components/CodeBlock.vue";
import { getComponentBySlug, getComponentSourceLinks } from "@/data/components";
import { computed, provide, ref } from "vue";
import { useRoute } from "vue-router";

// Demo imports - Form
import ButtonDemo from "@/components/demos/ButtonDemo.vue";
import CheckboxGroupDemo from "@/components/demos/CheckboxGroupDemo.vue";
import DatepickerDemo from "@/components/demos/DatepickerDemo.vue";
import InputDemo from "@/components/demos/InputDemo.vue";
import RadioGroupDemo from "@/components/demos/RadioGroupDemo.vue";
import SelectDemo from "@/components/demos/SelectDemo.vue";
import SwitchDemo from "@/components/demos/SwitchDemo.vue";
import TextareaDemo from "@/components/demos/TextareaDemo.vue";

// Demo imports - Navigation
import LinkDemo from "@/components/demos/LinkDemo.vue";
import PaginationDemo from "@/components/demos/PaginationDemo.vue";
import StepperDemo from "@/components/demos/StepperDemo.vue";
import TabGroupDemo from "@/components/demos/TabGroupDemo.vue";

// Demo imports - Feedback
import AlertDemo from "@/components/demos/AlertDemo.vue";
import BadgeDemo from "@/components/demos/BadgeDemo.vue";
import NotificationDemo from "@/components/demos/NotificationDemo.vue";
import ProgressIndicatorDemo from "@/components/demos/ProgressIndicatorDemo.vue";
import SpinnerDemo from "@/components/demos/SpinnerDemo.vue";
import TooltipDemo from "@/components/demos/TooltipDemo.vue";

// Demo imports - Overlay
import DialogDemo from "@/components/demos/DialogDemo.vue";
import DrawerDemo from "@/components/demos/DrawerDemo.vue";
import DropdownDemo from "@/components/demos/DropdownDemo.vue";
import PopoverDemo from "@/components/demos/PopoverDemo.vue";

// Demo imports - Data Display & Layout
import AccordionGroupDemo from "@/components/demos/AccordionGroupDemo.vue";
import CalendarDemo from "@/components/demos/CalendarDemo.vue";
import IconDemo from "@/components/demos/IconDemo.vue";
import SplitButtonDemo from "@/components/demos/SplitButtonDemo.vue";
import TableDemo from "@/components/demos/TableDemo.vue";
import TagDemo from "@/components/demos/TagDemo.vue";

const route = useRoute();
const framework = ref<"vue" | "react" | "nextjs">("vue");

// Framework seçimini child component'lara provide et
provide("framework", framework);

const slug = computed(() => route.params.slug as string);
const component = computed(() => getComponentBySlug(slug.value));
const sourceLinks = computed(() => getComponentSourceLinks(slug.value));

// Demo bileşenlerini slug'a göre eşleştir
const demoComponents: Record<string, any> = {
  // Form
  button: ButtonDemo,
  input: InputDemo,
  textarea: TextareaDemo,
  select: SelectDemo,
  "checkbox-group": CheckboxGroupDemo,
  "radio-group": RadioGroupDemo,
  switch: SwitchDemo,
  datepicker: DatepickerDemo,

  // Navigation
  link: LinkDemo,
  "tab-group": TabGroupDemo,
  pagination: PaginationDemo,
  stepper: StepperDemo,

  // Feedback
  alert: AlertDemo,
  badge: BadgeDemo,
  notification: NotificationDemo,
  spinner: SpinnerDemo,
  "progress-indicator": ProgressIndicatorDemo,
  tooltip: TooltipDemo,

  // Overlay
  dialog: DialogDemo,
  drawer: DrawerDemo,
  popover: PopoverDemo,
  dropdown: DropdownDemo,

  // Data Display & Layout
  table: TableDemo,
  tag: TagDemo,
  calendar: CalendarDemo,
  icon: IconDemo,
  "accordion-group": AccordionGroupDemo,
  "split-button": SplitButtonDemo,
};

const currentDemo = computed(() => demoComponents[slug.value]);

// Kod örnekleri
const codeExamples = computed(() => {
  const tagName = component.value?.tagName || "bl-component";
  const pascalName = toPascalCase(tagName);

  if (slug.value === "button") {
    return {
      vue: `<template>
  <bl-button variant="primary">Primary Button</bl-button>
  <bl-button variant="secondary">Secondary Button</bl-button>
  <bl-button variant="tertiary">Tertiary Button</bl-button>
</template>

<script setup>
// Baklava is automatically registered globally
// Web components can be used directly in Vue 3
</` + `script>`,
      react: `import { Suspense } from 'react';
import { BlButton } from '@trendyol/baklava/dist/baklava-react';

function App() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <BlButton variant="primary">Primary Button</BlButton>
      <BlButton variant="secondary">Secondary Button</BlButton>
      <BlButton variant="tertiary">Tertiary Button</BlButton>
    </Suspense>
  );
}`,
      nextjs: `'use client';

import { Suspense } from 'react';
import { BlButton } from '@trendyol/baklava/dist/baklava-react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <BlButton variant="primary">Primary Button</BlButton>
      <BlButton variant="secondary">Secondary Button</BlButton>
      <BlButton variant="tertiary">Tertiary Button</BlButton>
    </Suspense>
  );
}`,
    };
  }

  // General template
  return {
    vue: `<template>
  <${tagName}>Content</${tagName}>
</template>`,
    react: `import { Suspense } from 'react';
import { ${pascalName} } from '@trendyol/baklava/dist/baklava-react';

function App() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <${pascalName}>Content</${pascalName}>
    </Suspense>
  );
}`,
    nextjs: `'use client';

import { Suspense } from 'react';
import { ${pascalName} } from '@trendyol/baklava/dist/baklava-react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <${pascalName}>Content</${pascalName}>
    </Suspense>
  );
}`,
  };
});

function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

// Framework'e göre aktif kod
const currentCode = computed(() => {
  const examples = codeExamples.value;
  switch (framework.value) {
    case "react":
      return examples.react;
    case "nextjs":
      return examples.nextjs;
    default:
      return examples.vue;
  }
});

const currentLanguage = computed(() => {
  return framework.value === "vue" ? "vue" : "tsx";
});

// Handle tab change event from bl-tab-group
function handleTabChange(event: CustomEvent) {
  const selectedTab = event.detail as string;
  if (selectedTab === "vue" || selectedTab === "react" || selectedTab === "nextjs") {
    framework.value = selectedTab;
  }
}
</script>

<template>
  <div class="p-8 max-w-full">
    <!-- Component Header -->
    <header class="mb-8">
      <div class="flex items-center gap-3 mb-2">
        <h1 id="overview" class="text-3xl font-bold text-neutral-darkest dark:text-white">
          {{ component?.name }}
        </h1>
        <bl-badge
          v-if="component?.status === 'stable'"
          icon="check_fill"
          size="small"
          class="badge-success"
        >
          Stable
        </bl-badge>
        <bl-badge
          v-else-if="component?.status === 'beta'"
          icon="clock"
          size="small"
          class="badge-warning"
        >
          Beta
        </bl-badge>
        <bl-badge
          v-if="component?.rtlSupported"
          icon="check_fill"
          size="small"
          class="badge-info"
        >
          RTL Supported
        </bl-badge>
      </div>
      <p class="text-neutral-dark dark:text-neutral-light text-lg mb-3">
        {{ component?.description }}
      </p>

      <!-- Document Links -->
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <!-- ADR Link -->
        <a v-if="sourceLinks?.adr" :href="sourceLinks.adr" target="_blank" class="doc-link">
          <bl-badge icon="document" size="medium" class="badge-adr">
            ADR
          </bl-badge>
        </a>

        <!-- Story Link -->
        <a v-if="sourceLinks?.story" :href="sourceLinks.story" target="_blank" class="doc-link">
          <bl-badge icon="book" size="medium" class="badge-story">
            Story
          </bl-badge>
        </a>

        <!-- Figma Link -->
        <a v-if="sourceLinks?.figma" :href="sourceLinks.figma" target="_blank" class="doc-link">
          <bl-badge icon="image" size="medium" class="badge-figma">
            Figma
          </bl-badge>
        </a>

        <!-- Source Link -->
        <a v-if="sourceLinks?.source" :href="sourceLinks.source" target="_blank" class="doc-link">
          <bl-badge icon="code" size="medium" class="badge-source">
            Source
          </bl-badge>
        </a>
      </div>
    </header>

    <!-- Framework Selection -->
    <bl-tab-group class="mb-6" @bl-tab-selected="handleTabChange">
      <bl-tab slot="tabs" name="vue" :selected="framework === 'vue'">Vue</bl-tab>
      <bl-tab slot="tabs" name="react" :selected="framework === 'react'">React</bl-tab>
      <bl-tab slot="tabs" name="nextjs" :selected="framework === 'nextjs'">Next.js</bl-tab>
    </bl-tab-group>

    <!-- Demo Canvas -->
    <section class="mb-10">
      <div class="py-6">
        <component :is="currentDemo" v-if="currentDemo" />
        <div v-else class="text-neutral-dark text-center py-12">
          Demo not yet added for this component.
        </div>
      </div>
    </section>

    <!-- Usage -->
    <section class="mb-10" aria-labelledby="usage">
      <h2 id="usage" class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Usage</h2>

      <CodeBlock
        :code="currentCode"
        :language="currentLanguage"
      />

      <!-- Next.js info -->
      <bl-alert v-if="framework === 'nextjs'" variant="warning" icon class="mt-4">
        <strong>Important:</strong> To use Baklava components in Next.js:
        <ul class="mt-2 ml-4 list-disc space-y-1">
          <li>Add the <code>'use client'</code> directive at the top of the file</li>
          <li>Wrap components with <code>&lt;Suspense&gt;</code></li>
          <li>For detailed setup, see the <router-link to="/docs/using-baklava-in-next" class="underline hover:opacity-80">Next.js Documentation</router-link></li>
        </ul>
      </bl-alert>
    </section>

    <!-- API Reference -->
    <section class="mb-10" aria-labelledby="api">
      <h2 id="api" class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">API</h2>

      <ApiTable :tag-name="component?.tagName || ''" />
    </section>
  </div>
</template>

<style scoped>
.doc-link {
  text-decoration: none;
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
  border-radius: 0.5rem;
}

.doc-link:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.doc-link:focus-visible {
  outline: 2px solid #f27a1a;
  outline-offset: 2px;
}

.doc-link bl-badge {
  cursor: pointer;
}

</style>

<style>
/* Badge color variants - Light mode */
.badge-success {
  --bl-badge-bg-color: #dcfce7;
  --bl-badge-color: #166534;
}

.badge-warning {
  --bl-badge-bg-color: #fef3c7;
  --bl-badge-color: #92400e;
}

.badge-info {
  --bl-badge-bg-color: #dbeafe;
  --bl-badge-color: #1e40af;
}

.badge-adr {
  --bl-badge-bg-color: #fce7f3;
  --bl-badge-color: #9d174d;
}

.badge-story {
  --bl-badge-bg-color: #e0e7ff;
  --bl-badge-color: #3730a3;
}

.badge-figma {
  --bl-badge-bg-color: #fef3c7;
  --bl-badge-color: #92400e;
}

.badge-source {
  --bl-badge-bg-color: #f3e8ff;
  --bl-badge-color: #6b21a8;
}

/* Badge color variants - Dark mode */
html.dark .badge-success {
  --bl-badge-bg-color: #166534;
  --bl-badge-color: #bbf7d0;
}

html.dark .badge-warning {
  --bl-badge-bg-color: #78350f;
  --bl-badge-color: #fde68a;
}

html.dark .badge-info {
  --bl-badge-bg-color: #1e3a8a;
  --bl-badge-color: #bfdbfe;
}

html.dark .badge-adr {
  --bl-badge-bg-color: #831843;
  --bl-badge-color: #fbcfe8;
}

html.dark .badge-story {
  --bl-badge-bg-color: #312e81;
  --bl-badge-color: #c7d2fe;
}

html.dark .badge-figma {
  --bl-badge-bg-color: #78350f;
  --bl-badge-color: #fde68a;
}

html.dark .badge-source {
  --bl-badge-bg-color: #581c87;
  --bl-badge-color: #e9d5ff;
}
</style>
