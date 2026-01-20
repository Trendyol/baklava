<script setup lang="ts">
const fontWeights = [
  { variable: "--bl-font-weight-light", value: "300", label: "Light" },
  { variable: "--bl-font-weight-regular", value: "400", label: "Regular" },
  { variable: "--bl-font-weight-medium", value: "500", label: "Medium" },
  { variable: "--bl-font-weight-semibold", value: "600", label: "Semibold" },
  { variable: "--bl-font-weight-bold", value: "700", label: "Bold" },
];

const fontSizes = [
  { variable: "--bl-font-size-2xs", rem: "0.5rem", px: "8px" },
  { variable: "--bl-font-size-xs", rem: "0.625rem", px: "10px" },
  { variable: "--bl-font-size-s", rem: "0.75rem", px: "12px" },
  { variable: "--bl-font-size-m", rem: "0.875rem", px: "14px" },
  { variable: "--bl-font-size-l", rem: "1rem", px: "16px" },
  { variable: "--bl-font-size-xl", rem: "1.25rem", px: "20px" },
  { variable: "--bl-font-size-2xl", rem: "1.5rem", px: "24px" },
  { variable: "--bl-font-size-3xl", rem: "1.75rem", px: "28px" },
  { variable: "--bl-font-size-4xl", rem: "2rem", px: "32px" },
  { variable: "--bl-font-size-5xl", rem: "3rem", px: "48px" },
  { variable: "--bl-font-size-6xl", rem: "4rem", px: "64px" },
];

const displayFonts = [
  { variable: "--bl-font-display-light", weight: "300", size: "48px", height: "56px" },
  { variable: "--bl-font-display-regular", weight: "400", size: "48px", height: "56px" },
  { variable: "--bl-font-display-medium", weight: "500", size: "48px", height: "56px" },
  { variable: "--bl-font-display-semibold", weight: "600", size: "48px", height: "56px" },
  { variable: "--bl-font-display-bold", weight: "700", size: "48px", height: "56px" },
];

const headings = [
  {
    level: "Heading 1",
    size: "32px",
    variants: [
      { variable: "--bl-font-heading-1-regular", weight: "400" },
      { variable: "--bl-font-heading-1-medium", weight: "500" },
      { variable: "--bl-font-heading-1-semibold", weight: "600" },
      { variable: "--bl-font-heading-1-bold", weight: "700" },
    ],
  },
  {
    level: "Heading 2",
    size: "28px",
    variants: [
      { variable: "--bl-font-heading-2-regular", weight: "400" },
      { variable: "--bl-font-heading-2-medium", weight: "500" },
      { variable: "--bl-font-heading-2-semibold", weight: "600" },
      { variable: "--bl-font-heading-2-bold", weight: "700" },
    ],
  },
  {
    level: "Heading 3",
    size: "24px",
    variants: [
      { variable: "--bl-font-heading-3-regular", weight: "400" },
      { variable: "--bl-font-heading-3-medium", weight: "500" },
      { variable: "--bl-font-heading-3-semibold", weight: "600" },
      { variable: "--bl-font-heading-3-bold", weight: "700" },
    ],
  },
];

const bodyTexts = [
  {
    level: "Body Text 1",
    size: "16px",
    variants: [
      { variable: "--bl-font-body-text-1-regular", weight: "400" },
      { variable: "--bl-font-body-text-1-medium", weight: "500" },
    ],
  },
  {
    level: "Body Text 2",
    size: "14px",
    variants: [
      { variable: "--bl-font-body-text-2-regular", weight: "400" },
      { variable: "--bl-font-body-text-2-medium", weight: "500" },
    ],
  },
  {
    level: "Body Text 3",
    size: "12px",
    variants: [
      { variable: "--bl-font-body-text-3-regular", weight: "400" },
      { variable: "--bl-font-body-text-3-medium", weight: "500" },
    ],
  },
];

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(`var(${text})`);
};
</script>

<template>
  <div class="typography-demo">
    <h1 class="text-3xl font-bold text-neutral-darkest dark:text-white mb-2">
      Baklava Typography
    </h1>
    <p class="text-neutral-dark dark:text-neutral-light mb-8">
      Typography creates purposeful texture, guiding users to read and understand the hierarchy of
      information. The default font is <strong>Rubik</strong> in Baklava Design System.
    </p>

    <!-- Font Family -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Font Family</h2>
    <div
      class="bg-white dark:bg-neutral-darker rounded-xl border border-neutral-lightest dark:border-neutral-dark p-6 mb-8"
    >
      <code class="text-primary">--bl-font-family</code>
      <span class="text-neutral-dark dark:text-neutral-light ml-4">'RubikVariable', sans-serif</span>
    </div>

    <!-- Font Weights -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Font Weights</h2>
    <div
      class="overflow-x-auto bg-white dark:bg-neutral-darker rounded-xl border border-neutral-lightest dark:border-neutral-dark mb-8"
    >
      <table class="w-full">
        <thead>
          <tr class="border-b border-neutral-lightest dark:border-neutral-dark">
            <th class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white">
              Variable
            </th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white">
              Value
            </th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white">
              Example
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in fontWeights"
            :key="item.variable"
            class="border-b border-neutral-lightest dark:border-neutral-dark last:border-b-0 hover:bg-neutral-lightest dark:hover:bg-neutral-dark transition-colors cursor-pointer"
            @click="copyToClipboard(item.variable)"
          >
            <td class="py-4 px-6">
              <code class="text-sm text-primary font-mono">{{ item.variable }}</code>
            </td>
            <td class="py-4 px-6 text-neutral-darker dark:text-neutral-light">
              {{ item.value }}
            </td>
            <td class="py-4 px-6">
              <span
                class="text-xl text-neutral-darkest dark:text-white"
                :style="{ fontWeight: item.value }"
              >
                {{ item.label }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Font Sizes -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Font Sizes</h2>
    <div
      class="overflow-x-auto bg-white dark:bg-neutral-darker rounded-xl border border-neutral-lightest dark:border-neutral-dark mb-8"
    >
      <table class="w-full">
        <thead>
          <tr class="border-b border-neutral-lightest dark:border-neutral-dark">
            <th class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white">
              Variable
            </th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white">
              rem
            </th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white">
              px
            </th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white">
              Example
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in fontSizes"
            :key="item.variable"
            class="border-b border-neutral-lightest dark:border-neutral-dark last:border-b-0 hover:bg-neutral-lightest dark:hover:bg-neutral-dark transition-colors cursor-pointer"
            @click="copyToClipboard(item.variable)"
          >
            <td class="py-4 px-6">
              <code class="text-sm text-primary font-mono">{{ item.variable }}</code>
            </td>
            <td class="py-4 px-6 text-neutral-darker dark:text-neutral-light">
              {{ item.rem }}
            </td>
            <td class="py-4 px-6 text-neutral-darker dark:text-neutral-light">
              {{ item.px }}
            </td>
            <td class="py-4 px-6">
              <span
                class="text-neutral-darkest dark:text-white"
                :style="{ fontSize: item.rem }"
              >
                Aa
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Display Titles -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Display Titles</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      Display fonts are intended for use at large sizes for headings. Often used on landing pages.
    </p>
    <div
      class="overflow-x-auto bg-white dark:bg-neutral-darker rounded-xl border border-neutral-lightest dark:border-neutral-dark mb-8"
    >
      <table class="w-full">
        <thead>
          <tr class="border-b border-neutral-lightest dark:border-neutral-dark">
            <th class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white">
              Variable
            </th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white">
              Weight
            </th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white">
              Size
            </th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white">
              Example
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in displayFonts"
            :key="item.variable"
            class="border-b border-neutral-lightest dark:border-neutral-dark last:border-b-0 hover:bg-neutral-lightest dark:hover:bg-neutral-dark transition-colors cursor-pointer"
            @click="copyToClipboard(item.variable)"
          >
            <td class="py-4 px-6">
              <code class="text-sm text-primary font-mono">{{ item.variable }}</code>
            </td>
            <td class="py-4 px-6 text-neutral-darker dark:text-neutral-light">
              {{ item.weight }}
            </td>
            <td class="py-4 px-6 text-neutral-darker dark:text-neutral-light">
              {{ item.size }}
            </td>
            <td class="py-6 px-6">
              <span
                class="text-neutral-darkest dark:text-white"
                :style="{ font: `var(${item.variable})` }"
              >
                Display
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Headings -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Headings</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      Heading fonts are used as larger, higher impact text, such as in a title or section header.
    </p>
    <div class="space-y-6 mb-8">
      <div
        v-for="heading in headings"
        :key="heading.level"
        class="bg-white dark:bg-neutral-darker rounded-xl border border-neutral-lightest dark:border-neutral-dark overflow-hidden"
      >
        <div class="px-6 py-3 bg-neutral-lightest dark:bg-neutral-dark border-b border-neutral-lightest dark:border-neutral-dark">
          <span class="font-semibold text-neutral-darkest dark:text-white">{{ heading.level }}</span>
          <span class="text-sm text-neutral-dark ml-2">({{ heading.size }})</span>
        </div>
        <table class="w-full">
          <tbody>
            <tr
              v-for="variant in heading.variants"
              :key="variant.variable"
              class="border-b border-neutral-lightest dark:border-neutral-dark last:border-b-0 hover:bg-neutral-lightest dark:hover:bg-neutral-dark transition-colors cursor-pointer"
              @click="copyToClipboard(variant.variable)"
            >
              <td class="py-4 px-6 w-1/2">
                <code class="text-sm text-primary font-mono">{{ variant.variable }}</code>
              </td>
              <td class="py-4 px-6 w-1/4 text-neutral-darker dark:text-neutral-light">
                Weight: {{ variant.weight }}
              </td>
              <td class="py-4 px-6 w-1/4">
                <span
                  class="text-neutral-darkest dark:text-white"
                  :style="{ font: `var(${variant.variable})` }"
                >
                  {{ heading.level }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Body Texts -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Body Texts</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      Body text is typically used for long-form writing as it works well for small text sizes.
    </p>
    <div class="space-y-6 mb-8">
      <div
        v-for="body in bodyTexts"
        :key="body.level"
        class="bg-white dark:bg-neutral-darker rounded-xl border border-neutral-lightest dark:border-neutral-dark overflow-hidden"
      >
        <div class="px-6 py-3 bg-neutral-lightest dark:bg-neutral-dark border-b border-neutral-lightest dark:border-neutral-dark">
          <span class="font-semibold text-neutral-darkest dark:text-white">{{ body.level }}</span>
          <span class="text-sm text-neutral-dark ml-2">({{ body.size }})</span>
        </div>
        <table class="w-full">
          <tbody>
            <tr
              v-for="variant in body.variants"
              :key="variant.variable"
              class="border-b border-neutral-lightest dark:border-neutral-dark last:border-b-0 hover:bg-neutral-lightest dark:hover:bg-neutral-dark transition-colors cursor-pointer"
              @click="copyToClipboard(variant.variable)"
            >
              <td class="py-4 px-6 w-1/2">
                <code class="text-sm text-primary font-mono">{{ variant.variable }}</code>
              </td>
              <td class="py-4 px-6 w-1/4 text-neutral-darker dark:text-neutral-light">
                Weight: {{ variant.weight }}
              </td>
              <td class="py-4 px-6 w-1/4">
                <span
                  class="text-neutral-darkest dark:text-white"
                  :style="{ font: `var(${variant.variable})` }"
                >
                  The quick brown fox
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Caption -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Caption</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      Caption is the smallest font size. They are mostly used for labels.
    </p>
    <div
      class="bg-white dark:bg-neutral-darker rounded-xl border border-neutral-lightest dark:border-neutral-dark p-6 mb-8 cursor-pointer hover:bg-neutral-lightest dark:hover:bg-neutral-dark transition-colors"
      @click="copyToClipboard('--bl-font-caption')"
    >
      <div class="flex items-center justify-between">
        <div>
          <code class="text-primary font-mono">--bl-font-caption</code>
          <span class="text-neutral-dark dark:text-neutral-light ml-4">Weight: 500, Size: 10px</span>
        </div>
        <span class="text-neutral-darkest dark:text-white" style="font: var(--bl-font-caption)">
          Caption Text Example
        </span>
      </div>
    </div>

    <!-- Usage -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Usage</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      Use CSS custom properties to apply typography in your stylesheets:
    </p>
    <div class="bg-black rounded-xl p-4 overflow-x-auto mb-8">
      <pre class="text-sm text-[#d4d4d4]"><code>.page-title {
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

/* Or use individual properties */
.custom-text {
  font-family: var(--bl-font-family);
  font-size: var(--bl-font-size-l);
  font-weight: var(--bl-font-weight-medium);
}</code></pre>
    </div>
  </div>
</template>

<style scoped>
code {
  color: var(--bl-color-primary);
}
</style>
