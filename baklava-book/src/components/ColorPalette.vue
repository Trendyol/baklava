<script setup lang="ts">
interface ColorGroup {
  name: string;
  description: string;
  colors: {
    variable: string;
    label: string;
    value: string;
  }[];
}

const colorGroups: ColorGroup[] = [
  {
    name: "Primary",
    description: "Main brand color used for primary actions and key UI elements.",
    colors: [
      { variable: "--bl-color-primary", label: "Primary", value: "#f27a1a" },
      { variable: "--bl-color-primary-highlight", label: "Highlight", value: "#ef6114" },
      { variable: "--bl-color-primary-contrast", label: "Contrast", value: "#fef2e8" },
    ],
  },
  {
    name: "Success",
    description: "Indicates successful actions and positive states.",
    colors: [
      { variable: "--bl-color-success", label: "Success", value: "#0bc15c" },
      { variable: "--bl-color-success-highlight", label: "Highlight", value: "#0aae53" },
      { variable: "--bl-color-success-contrast", label: "Contrast", value: "#e7f9ef" },
    ],
  },
  {
    name: "Danger",
    description: "Indicates errors, destructive actions, or critical states.",
    colors: [
      { variable: "--bl-color-danger", label: "Danger", value: "#ff5043" },
      { variable: "--bl-color-danger-highlight", label: "Highlight", value: "#e6483c" },
      { variable: "--bl-color-danger-contrast", label: "Contrast", value: "#ffedec" },
    ],
  },
  {
    name: "Warning",
    description: "Indicates warnings or actions that need attention.",
    colors: [
      { variable: "--bl-color-warning", label: "Warning", value: "#ffb600" },
      { variable: "--bl-color-warning-highlight", label: "Highlight", value: "#e6a400" },
      { variable: "--bl-color-warning-contrast", label: "Contrast", value: "#fff8e6" },
    ],
  },
  {
    name: "Info",
    description: "Indicates informational content and neutral notifications.",
    colors: [
      { variable: "--bl-color-info", label: "Info", value: "#5794ff" },
      { variable: "--bl-color-info-highlight", label: "Highlight", value: "#4e85e6" },
      { variable: "--bl-color-info-contrast", label: "Contrast", value: "#eef4ff" },
    ],
  },
];

const neutralColors = [
  { variable: "--bl-color-neutral-darkest", label: "Darkest", value: "#0f131a" },
  { variable: "--bl-color-neutral-darker", label: "Darker", value: "#273142" },
  { variable: "--bl-color-neutral-dark", label: "Dark", value: "#6e7787" },
  { variable: "--bl-color-neutral-light", label: "Light", value: "#95a1b5" },
  { variable: "--bl-color-neutral-lighter", label: "Lighter", value: "#afbbca" },
  { variable: "--bl-color-neutral-lightest", label: "Lightest", value: "#f1f2f7" },
  { variable: "--bl-color-neutral-full", label: "Full", value: "#ffffff" },
];

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const getContrastColor = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
};
</script>

<template>
  <div class="color-palette">
    <h1 class="text-3xl font-bold text-neutral-darkest dark:text-white mb-2">
      Baklava Color Palette
    </h1>
    <p class="text-neutral-dark dark:text-neutral-light mb-8">
      Baklava uses a carefully crafted color palette. Click on any color to copy its CSS variable.
    </p>

    <!-- Semantic Colors -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Semantic Colors</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-6">
      Semantic colors communicate meaning and status to users.
    </p>

    <div class="space-y-8 mb-12">
      <div
        v-for="group in colorGroups"
        :key="group.name"
        class="color-group bg-white dark:bg-neutral-darker rounded-xl overflow-hidden shadow-sm border border-neutral-lightest dark:border-neutral-dark"
      >
        <!-- Gradient Header -->
        <div class="flex">
          <div
            v-for="color in group.colors"
            :key="color.variable"
            class="flex-1 h-16 cursor-pointer transition-opacity hover:opacity-80 first:rounded-tl-xl last:rounded-tr-xl"
            :style="{ backgroundColor: color.value }"
            :title="`Click to copy: var(${color.variable})`"
            @click="copyToClipboard(`var(${color.variable})`)"
          ></div>
        </div>

        <!-- Color Info -->
        <div class="p-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white">
              {{ group.name }}
            </h3>
            <p class="text-xs text-neutral-dark dark:text-neutral-light">
              {{ group.description }}
            </p>
          </div>

          <!-- Color List -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div
              v-for="color in group.colors"
              :key="color.variable"
              class="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-lightest dark:hover:bg-neutral-dark cursor-pointer transition-colors border border-neutral-lightest dark:border-neutral-dark"
              :title="`Click to copy: var(${color.variable})`"
              @click="copyToClipboard(`var(${color.variable})`)"
            >
              <div
                class="w-10 h-10 rounded-lg shadow-inner border border-neutral-lighter dark:border-neutral-darker flex-shrink-0"
                :style="{ backgroundColor: color.value }"
              ></div>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-neutral-darkest dark:text-white">
                  {{ color.label }}
                </p>
                <code class="text-xs text-neutral-dark dark:text-neutral-light block truncate">
                  {{ color.variable }}
                </code>
                <code class="text-xs text-neutral-dark font-mono">{{ color.value }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Neutral Colors -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Neutral Colors</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-6">
      Neutral colors are used for text, backgrounds, borders, and other UI elements.
    </p>

    <div
      class="neutral-palette bg-white dark:bg-neutral-darker rounded-xl overflow-hidden shadow-sm border border-neutral-lightest dark:border-neutral-dark mb-12"
    >
      <!-- Gradient Header -->
      <div class="h-20 flex">
        <div
          v-for="color in neutralColors"
          :key="color.variable"
          class="flex-1 cursor-pointer transition-opacity hover:opacity-80"
          :style="{ backgroundColor: color.value }"
          :title="`Click to copy: var(${color.variable})`"
          @click="copyToClipboard(`var(${color.variable})`)"
        ></div>
      </div>

      <!-- Color List -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-5">
        <div
          v-for="color in neutralColors"
          :key="color.variable"
          class="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-lightest dark:hover:bg-neutral-dark cursor-pointer transition-colors"
          :title="`Click to copy: var(${color.variable})`"
          @click="copyToClipboard(`var(${color.variable})`)"
        >
          <div
            class="w-10 h-10 rounded-lg shadow-inner border border-neutral-lighter dark:border-neutral-dark flex-shrink-0"
            :style="{ backgroundColor: color.value }"
          ></div>
          <div class="min-w-0">
            <p class="text-sm font-medium text-neutral-darkest dark:text-white">{{ color.label }}</p>
            <code class="text-xs text-neutral-dark dark:text-neutral-light block truncate">
              {{ color.value }}
            </code>
          </div>
        </div>
      </div>
    </div>

    <!-- Usage Section -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Usage</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      Use CSS custom properties to apply colors in your stylesheets:
    </p>

    <div class="bg-black rounded-xl p-4 overflow-x-auto mb-8">
      <pre class="text-sm text-[#d4d4d4]"><code>.my-element {
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
}</code></pre>
    </div>

    <!-- Live Examples -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Live Examples</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      See how semantic colors are used in Baklava components:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-xl">
        <h4 class="text-sm font-medium text-neutral-dark mb-3">Buttons</h4>
        <div class="flex flex-wrap gap-2">
          <bl-button variant="primary">Primary</bl-button>
          <bl-button variant="secondary">Secondary</bl-button>
          <bl-button kind="success">Success</bl-button>
          <bl-button kind="danger">Danger</bl-button>
        </div>
      </div>

      <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-xl">
        <h4 class="text-sm font-medium text-neutral-dark mb-3">Alerts</h4>
        <div class="space-y-2">
          <bl-alert variant="info" icon>Info message</bl-alert>
          <bl-alert variant="success" icon>Success message</bl-alert>
          <bl-alert variant="warning" icon>Warning message</bl-alert>
          <bl-alert variant="danger" icon>Danger message</bl-alert>
        </div>
      </div>

      <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-xl">
        <h4 class="text-sm font-medium text-neutral-dark mb-3">Badges</h4>
        <div class="flex flex-wrap gap-2">
          <bl-badge size="medium">Default</bl-badge>
          <bl-badge size="medium" icon="check_fill">Success</bl-badge>
          <bl-badge size="medium" icon="warning">Warning</bl-badge>
          <bl-badge size="medium" icon="info">Info</bl-badge>
        </div>
      </div>

      <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-xl">
        <h4 class="text-sm font-medium text-neutral-dark mb-3">Progress Indicator</h4>
        <div class="space-y-4">
          <div class="mb-4">
            <bl-progress-indicator value="75" max="100"></bl-progress-indicator>
          </div>
          <div class="mb-4">
            <bl-progress-indicator value="50" max="100" status="success"></bl-progress-indicator>
          </div>
          <div>
            <bl-progress-indicator value="25" max="100" status="failed"></bl-progress-indicator>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.color-palette {
  max-width: 100%;
}

.color-group:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

:root.dark .color-group:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>
