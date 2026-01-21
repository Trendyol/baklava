<script setup lang="ts">
import { ref, computed, provide } from "vue";
import { useRoute } from "vue-router";
import { getComponentBySlug, getComponentSourceLinks } from "@/data/components";
import CodeBlock from "@/components/CodeBlock.vue";
import ApiTable from "@/components/ApiTable.vue";

// Demo imports - Form
import ButtonDemo from "@/components/demos/ButtonDemo.vue";
import InputDemo from "@/components/demos/InputDemo.vue";
import TextareaDemo from "@/components/demos/TextareaDemo.vue";
import SelectDemo from "@/components/demos/SelectDemo.vue";
import CheckboxGroupDemo from "@/components/demos/CheckboxGroupDemo.vue";
import RadioGroupDemo from "@/components/demos/RadioGroupDemo.vue";
import SwitchDemo from "@/components/demos/SwitchDemo.vue";
import DatepickerDemo from "@/components/demos/DatepickerDemo.vue";

// Demo imports - Navigation
import LinkDemo from "@/components/demos/LinkDemo.vue";
import TabGroupDemo from "@/components/demos/TabGroupDemo.vue";
import PaginationDemo from "@/components/demos/PaginationDemo.vue";
import StepperDemo from "@/components/demos/StepperDemo.vue";

// Demo imports - Feedback
import AlertDemo from "@/components/demos/AlertDemo.vue";
import BadgeDemo from "@/components/demos/BadgeDemo.vue";
import NotificationDemo from "@/components/demos/NotificationDemo.vue";
import SpinnerDemo from "@/components/demos/SpinnerDemo.vue";
import ProgressIndicatorDemo from "@/components/demos/ProgressIndicatorDemo.vue";
import TooltipDemo from "@/components/demos/TooltipDemo.vue";

// Demo imports - Overlay
import DialogDemo from "@/components/demos/DialogDemo.vue";
import DrawerDemo from "@/components/demos/DrawerDemo.vue";
import PopoverDemo from "@/components/demos/PopoverDemo.vue";
import DropdownDemo from "@/components/demos/DropdownDemo.vue";

// Demo imports - Data Display & Layout
import TableDemo from "@/components/demos/TableDemo.vue";
import TagDemo from "@/components/demos/TagDemo.vue";
import CalendarDemo from "@/components/demos/CalendarDemo.vue";
import IconDemo from "@/components/demos/IconDemo.vue";
import AccordionGroupDemo from "@/components/demos/AccordionGroupDemo.vue";
import SplitButtonDemo from "@/components/demos/SplitButtonDemo.vue";

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
// Baklava otomatik olarak global olarak kayıtlıdır
// Vue 3'te web componentleri doğrudan kullanılabilir
</` + `script>`,
      react: `import { Suspense } from 'react';
import { BlButton } from '@trendyol/baklava/dist/baklava-react';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    <Suspense fallback={<div>Loading...</div>}>
      <BlButton variant="primary">Primary Button</BlButton>
      <BlButton variant="secondary">Secondary Button</BlButton>
      <BlButton variant="tertiary">Tertiary Button</BlButton>
    </Suspense>
  );
}`,
    };
  }

  // Genel şablon
  return {
    vue: `<template>
  <${tagName}>Content</${tagName}>
</template>`,
    react: `import { Suspense } from 'react';
import { ${pascalName} } from '@trendyol/baklava/dist/baklava-react';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <${pascalName}>Content</${pascalName}>
    </Suspense>
  );
}`,
    nextjs: `'use client';

import { Suspense } from 'react';
import { ${pascalName} } from '@trendyol/baklava/dist/baklava-react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
</script>

<template>
  <div class="p-8 max-w-5xl">
    <!-- Başlık -->
    <header class="mb-8">
      <div class="flex items-center gap-3 mb-2">
        <h1 class="text-3xl font-bold text-neutral-darkest dark:text-white">
          {{ component?.name }}
        </h1>
        <bl-badge
          v-if="component?.status === 'stable'"
          icon="check_fill"
          size="small"
          style="--bl-badge-bg-color: #e7f9ef; --bl-badge-color: #0bc15c"
        >
          Stable
        </bl-badge>
        <bl-badge
          v-else-if="component?.status === 'beta'"
          icon="clock"
          size="small"
          style="--bl-badge-bg-color: #fff8e6; --bl-badge-color: #ffb600"
        >
          Beta
        </bl-badge>
        <bl-badge
          v-if="component?.rtlSupported"
          icon="check_fill"
          size="small"
          style="--bl-badge-bg-color: #e6f0ff; --bl-badge-color: #2563eb"
        >
          RTL Supported
        </bl-badge>
      </div>
      <p class="text-neutral-dark dark:text-neutral-light text-lg mb-3">
        {{ component?.description }}
      </p>

      <!-- Doküman Linkleri -->
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <!-- Tag Name -->
        <bl-badge size="medium" style="--bl-badge-bg-color: #fef2e8; --bl-badge-color: #f27a1a">
          {{ component?.tagName }}
        </bl-badge>

        <!-- ADR Link -->
        <a v-if="sourceLinks?.adr" :href="sourceLinks.adr" target="_blank" class="doc-link">
          <bl-badge
            icon="document"
            size="medium"
            style="--bl-badge-bg-color: #e6f0ff; --bl-badge-color: #2563eb"
          >
            ADR
          </bl-badge>
        </a>

        <!-- Story Link -->
        <a v-if="sourceLinks?.story" :href="sourceLinks.story" target="_blank" class="doc-link">
          <bl-badge
            icon="book"
            size="medium"
            style="--bl-badge-bg-color: #f3e8ff; --bl-badge-color: #9333ea"
          >
            Story
          </bl-badge>
        </a>

        <!-- Figma Link -->
        <a v-if="sourceLinks?.figma" :href="sourceLinks.figma" target="_blank" class="doc-link">
          <bl-badge
            icon="image"
            size="medium"
            style="--bl-badge-bg-color: #fce7f3; --bl-badge-color: #db2777"
          >
            Figma
          </bl-badge>
        </a>

        <!-- Source Link -->
        <a v-if="sourceLinks?.source" :href="sourceLinks.source" target="_blank" class="doc-link">
          <bl-badge
            icon="code"
            size="medium"
            style="--bl-badge-bg-color: #f3f4f6; --bl-badge-color: #4b5563"
          >
            Source
          </bl-badge>
        </a>
      </div>
    </header>

    <!-- Framework Seçimi -->
    <div class="flex items-center gap-2 mb-6">
      <bl-button
        :variant="framework === 'vue' ? 'primary' : 'tertiary'"
        size="small"
        icon="code"
        @click="framework = 'vue'"
      >
        Vue
      </bl-button>
      <bl-button
        :variant="framework === 'react' ? 'primary' : 'tertiary'"
        size="small"
        icon="code"
        @click="framework = 'react'"
      >
        React
      </bl-button>
      <bl-button
        :variant="framework === 'nextjs' ? 'primary' : 'tertiary'"
        size="small"
        icon="code"
        @click="framework = 'nextjs'"
      >
        Next.js
      </bl-button>
    </div>

    <!-- Demo Canvas -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Demo</h2>

      <div class="canvas">
        <component :is="currentDemo" v-if="currentDemo" />
        <div v-else class="text-neutral-dark text-center py-12">
          Bu component için demo henüz eklenmedi.
        </div>
      </div>
    </section>

    <!-- Kod Örneği -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Kullanım</h2>

      <CodeBlock
        :key="framework"
        :code="currentCode"
        :language="currentLanguage"
      />

      <!-- Next.js için ek bilgi -->
      <div v-if="framework === 'nextjs'" class="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
        <p class="text-sm text-amber-800 dark:text-amber-200">
          <strong>⚠️ Önemli:</strong> Next.js'te Baklava componentlerini kullanmak için:
        </p>
        <ul class="text-sm text-amber-700 dark:text-amber-300 mt-2 ml-4 list-disc space-y-1">
          <li><code>'use client'</code> direktifini dosyanın başına ekleyin</li>
          <li>Componentleri <code>&lt;Suspense&gt;</code> ile sarın</li>
          <li>Detaylı kurulum için <router-link to="/docs/using-baklava-in-next" class="underline hover:text-amber-900 dark:hover:text-amber-100">Next.js Dokümantasyonu</router-link>'na bakın</li>
        </ul>
      </div>
    </section>

    <!-- API Reference -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">API</h2>

      <ApiTable :tag-name="component?.tagName || ''" />
    </section>
  </div>
</template>

<style scoped>
.doc-link {
  text-decoration: none;
  transition: opacity 0.2s;
}

.doc-link:hover {
  opacity: 0.8;
}

.doc-link bl-badge {
  cursor: pointer;
}
</style>
