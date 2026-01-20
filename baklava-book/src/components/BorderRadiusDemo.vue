<script setup lang="ts">
const borderRadiusValues = [
  { variable: "--bl-border-radius-xs", value: "0.125rem (2px)", cssValue: "0.125rem" },
  { variable: "--bl-border-radius-s", value: "0.25rem (4px)", cssValue: "0.25rem" },
  { variable: "--bl-border-radius-m", value: "0.375rem (6px)", cssValue: "0.375rem" },
  { variable: "--bl-border-radius-l", value: "0.5rem (8px)", cssValue: "0.5rem" },
  { variable: "--bl-border-radius-pill", value: "62.438rem (999px)", cssValue: "62.438rem" },
  { variable: "--bl-border-radius-circle", value: "50%", cssValue: "50%" },
];

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(`var(${text})`);
};
</script>

<template>
  <div class="border-radius-demo">
    <h1 class="text-3xl font-bold text-neutral-darkest dark:text-white mb-2">Border Radius</h1>
    <p class="text-neutral-dark dark:text-neutral-light mb-8">
      The border-radius property defines the radius of the element's corners. Baklava provides a set
      of predefined border-radius values for consistent rounded corners across your application.
    </p>

    <!-- Table -->
    <div
      class="overflow-x-auto bg-white dark:bg-neutral-darker rounded-xl border border-neutral-lightest dark:border-neutral-dark mb-12"
    >
      <table class="w-full">
        <thead>
          <tr class="border-b border-neutral-lightest dark:border-neutral-dark">
            <th
              class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white"
            >
              Variable
            </th>
            <th
              class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white"
            >
              Value
            </th>
            <th
              class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white"
            >
              Example
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in borderRadiusValues"
            :key="item.variable"
            class="border-b border-neutral-lightest dark:border-neutral-dark last:border-b-0 hover:bg-neutral-lightest dark:hover:bg-neutral-dark transition-colors cursor-pointer"
            :title="`Click to copy: var(${item.variable})`"
            @click="copyToClipboard(item.variable)"
          >
            <td class="py-4 px-6">
              <code class="text-sm text-primary font-mono">{{ item.variable }}</code>
            </td>
            <td class="py-4 px-6">
              <span class="text-sm text-neutral-darker dark:text-neutral-light">{{
                item.value
              }}</span>
            </td>
            <td class="py-4 px-6">
              <div
                class="example-box"
                :style="{
                  width: '5rem',
                  height: '5rem',
                  backgroundColor: 'rgb(217, 224, 232)',
                  borderRadius: item.cssValue,
                }"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Usage Examples -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Usage</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      Use CSS custom properties to apply border-radius in your stylesheets:
    </p>

    <div class="bg-black rounded-xl p-4 overflow-x-auto mb-8">
      <pre class="text-sm text-[#d4d4d4]"><code>/* Standard button */
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
}</code></pre>
    </div>

    <!-- Best Practices -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Best Practices</h2>
    <ul class="text-sm text-neutral-dark dark:text-neutral-light space-y-2 mb-8">
      <li class="flex items-start gap-2">
        <bl-icon name="check_fill" style="color: var(--bl-color-success); margin-top: 2px"></bl-icon>
        <span>Use <code class="text-primary">xs</code> or <code class="text-primary">s</code> for small elements like tags or badges</span>
      </li>
      <li class="flex items-start gap-2">
        <bl-icon name="check_fill" style="color: var(--bl-color-success); margin-top: 2px"></bl-icon>
        <span>Use <code class="text-primary">m</code> (default) for most interactive elements like buttons and inputs</span>
      </li>
      <li class="flex items-start gap-2">
        <bl-icon name="check_fill" style="color: var(--bl-color-success); margin-top: 2px"></bl-icon>
        <span>Use <code class="text-primary">l</code> for cards and larger containers</span>
      </li>
      <li class="flex items-start gap-2">
        <bl-icon name="check_fill" style="color: var(--bl-color-success); margin-top: 2px"></bl-icon>
        <span>Use <code class="text-primary">pill</code> for capsule-shaped buttons or badges</span>
      </li>
      <li class="flex items-start gap-2">
        <bl-icon name="check_fill" style="color: var(--bl-color-success); margin-top: 2px"></bl-icon>
        <span>Use <code class="text-primary">circle</code> for avatars, icons, and perfectly round elements</span>
      </li>
    </ul>

    <!-- Live Examples -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Live Examples</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      See how border-radius values are used in Baklava components:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-6 bg-neutral-lightest dark:bg-neutral-darker rounded-xl">
        <h4 class="text-sm font-medium text-neutral-dark mb-4">Buttons</h4>
        <div class="flex flex-wrap gap-3">
          <bl-button variant="primary">Primary</bl-button>
          <bl-button variant="secondary">Secondary</bl-button>
          <bl-button variant="tertiary">Tertiary</bl-button>
        </div>
      </div>

      <div class="p-6 bg-neutral-lightest dark:bg-neutral-darker rounded-xl">
        <h4 class="text-sm font-medium text-neutral-dark mb-4">Inputs</h4>
        <div class="space-y-3">
          <bl-input placeholder="Text input"></bl-input>
          <bl-select placeholder="Select option"></bl-select>
        </div>
      </div>

      <div class="p-6 bg-neutral-lightest dark:bg-neutral-darker rounded-xl">
        <h4 class="text-sm font-medium text-neutral-dark mb-4">Badges (Pill)</h4>
        <div class="flex flex-wrap gap-2">
          <bl-badge size="medium">Default</bl-badge>
          <bl-badge size="medium" icon="check_fill">Success</bl-badge>
          <bl-badge size="medium" icon="info">Info</bl-badge>
        </div>
      </div>

      <div class="p-6 bg-neutral-lightest dark:bg-neutral-darker rounded-xl">
        <h4 class="text-sm font-medium text-neutral-dark mb-4">Circle (Avatar Style)</h4>
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold"
          >
            AB
          </div>
          <div
            class="w-12 h-12 rounded-full bg-info flex items-center justify-center text-white font-semibold"
          >
            CD
          </div>
          <div
            class="w-12 h-12 rounded-full bg-success flex items-center justify-center text-white font-semibold"
          >
            EF
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.example-box {
  transition: transform 0.2s ease;
}

tr:hover .example-box {
  transform: scale(1.05);
}

code {
  color: var(--bl-color-primary);
}
</style>
