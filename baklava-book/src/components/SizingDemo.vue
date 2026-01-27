<script setup lang="ts">
const sizeValues = [
  { variable: "--bl-size-4xs", rem: "0.125rem", px: "2px" },
  { variable: "--bl-size-3xs", rem: "0.25rem", px: "4px" },
  { variable: "--bl-size-2xs", rem: "0.5rem", px: "8px" },
  { variable: "--bl-size-xs", rem: "0.75rem", px: "12px" },
  { variable: "--bl-size-s", rem: "0.875rem", px: "14px" },
  { variable: "--bl-size-m", rem: "1rem", px: "16px" },
  { variable: "--bl-size-l", rem: "1.25rem", px: "20px" },
  { variable: "--bl-size-xl", rem: "1.5rem", px: "24px" },
  { variable: "--bl-size-2xl", rem: "2rem", px: "32px" },
  { variable: "--bl-size-3xl", rem: "2.5rem", px: "40px" },
  { variable: "--bl-size-4xl", rem: "3rem", px: "48px" },
  { variable: "--bl-size-5xl", rem: "4rem", px: "64px" },
  { variable: "--bl-size-6xl", rem: "5rem", px: "80px" },
];

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(`var(${text})`);
};
</script>

<template>
  <div class="sizing-demo">
    <h1 class="text-3xl font-bold text-neutral-darkest dark:text-white mb-2">Size and Spacing</h1>
    <p class="text-neutral-dark dark:text-neutral-light mb-8">
      Baklava uses a list of defined size variables. Using the right sizes will create consistency
      and hierarchy in the user interface. We use <code class="text-primary">rem</code> values for
      better accessibility.
    </p>

    <!-- Size Table -->
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
            v-for="item in sizeValues"
            :key="item.variable"
            class="border-b border-neutral-lightest dark:border-neutral-dark last:border-b-0 hover:bg-neutral-lightest dark:hover:bg-neutral-dark transition-colors cursor-pointer"
            :title="`Click to copy: var(${item.variable})`"
            @click="copyToClipboard(item.variable)"
          >
            <td class="py-4 px-6">
              <code class="text-sm text-primary font-mono">{{ item.variable }}</code>
            </td>
            <td class="py-4 px-6">
              <span class="text-sm text-neutral-darker dark:text-neutral-light">
                {{ item.rem }} ({{ item.px }})
              </span>
            </td>
            <td class="py-4 px-6">
              <div class="flex items-center gap-4">
                <div
                  class="size-example"
                  :style="{
                    width: '5rem',
                    height: item.rem,
                    backgroundColor: 'var(--bl-color-neutral-light)',
                    borderRadius: '2px',
                  }"
                ></div>
                <span class="text-xs text-neutral-dark">{{ item.px }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Usage -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Usage</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      Use CSS custom properties to apply sizing in your stylesheets:
    </p>
    <div class="bg-black rounded-xl p-4 overflow-x-auto mb-8">
      <pre class="text-sm text-[#d4d4d4]"><code>/* Using size variables for padding */
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
}</code></pre>
    </div>

    <!-- Best Practices -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Best Practices</h2>
    <ul class="text-sm text-neutral-dark dark:text-neutral-light space-y-2 mb-8">
      <li class="flex items-start gap-2">
        <bl-icon name="check_fill" style="color: var(--bl-color-success); margin-top: 2px"></bl-icon>
        <span>
          Use smaller sizes (<code class="text-primary">4xs</code> to
          <code class="text-primary">xs</code>) for fine details like borders and small gaps
        </span>
      </li>
      <li class="flex items-start gap-2">
        <bl-icon name="check_fill" style="color: var(--bl-color-success); margin-top: 2px"></bl-icon>
        <span>
          Use medium sizes (<code class="text-primary">s</code> to
          <code class="text-primary">l</code>) for component padding and standard spacing
        </span>
      </li>
      <li class="flex items-start gap-2">
        <bl-icon name="check_fill" style="color: var(--bl-color-success); margin-top: 2px"></bl-icon>
        <span>
          Use larger sizes (<code class="text-primary">xl</code> to
          <code class="text-primary">6xl</code>) for section spacing and larger elements
        </span>
      </li>
      <li class="flex items-start gap-2">
        <bl-icon name="check_fill" style="color: var(--bl-color-success); margin-top: 2px"></bl-icon>
        <span>Maintain consistency by using the same size scale throughout your application</span>
      </li>
    </ul>

    <!-- Visual Scale -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Visual Scale</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      See the full size scale visually:
    </p>
    <div
      class="bg-white dark:bg-neutral-darker rounded-xl border border-neutral-lightest dark:border-neutral-dark p-6"
    >
      <div class="space-y-3">
        <div
          v-for="item in sizeValues"
          :key="item.variable"
          class="flex items-center gap-4"
        >
          <code class="text-xs text-primary font-mono w-32">{{ item.variable.replace('--bl-size-', '') }}</code>
          <div
            :style="{
              width: item.rem,
              height: item.rem,
              backgroundColor: 'var(--bl-color-neutral-light)',
              borderRadius: '2px',
              minWidth: item.rem,
            }"
          ></div>
          <span class="text-xs text-neutral-dark">{{ item.px }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.size-example {
  transition: transform 0.2s ease;
}

tr:hover .size-example {
  transform: scaleX(1.05);
}

code {
  color: var(--bl-color-primary);
}
</style>
