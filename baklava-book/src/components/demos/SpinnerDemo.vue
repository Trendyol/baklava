<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";

const basicCode = `<bl-spinner></bl-spinner>`;

const sizesCode = `<!-- Preset sizes -->
<bl-spinner size="small"></bl-spinner>
<bl-spinner size="medium"></bl-spinner>
<bl-spinner size="large"></bl-spinner>

<!-- Custom sizes with CSS variables -->
<bl-spinner size="var(--bl-font-size-xs)"></bl-spinner>
<bl-spinner size="var(--bl-font-size-xl)"></bl-spinner>
<bl-spinner size="32px"></bl-spinner>
<bl-spinner size="3rem"></bl-spinner>`;

const colorsCode = `<!-- Using CSS variable -->
<bl-spinner color="var(--bl-color-info-highlight)"></bl-spinner>
<bl-spinner color="var(--bl-color-success)"></bl-spinner>
<bl-spinner color="var(--bl-color-danger)"></bl-spinner>

<!-- Using hex colors -->
<bl-spinner color="#5794ff"></bl-spinner>
<bl-spinner color="#0bc15c"></bl-spinner>
<bl-spinner color="#ff5043"></bl-spinner>`;

const disabledCode = `<bl-spinner disabled></bl-spinner>
<bl-spinner size="large" disabled></bl-spinner>`;

const overlayCode = `<!-- Overlay spinner covers the viewport -->
<bl-spinner overlay></bl-spinner>`;

const relativeOverlayCode = `<div style="position: relative; width: 200px; height: 200px;">
  <bl-spinner overlay size="large"></bl-spinner>
  <p>Content underneath</p>
</div>`;

const textCode = `<div class="flex items-center gap-2">
  <bl-spinner size="small"></bl-spinner>
  <span>Loading...</span>
</div>`;

const buttonsCode = `<bl-button loading>Saving...</bl-button>
<bl-button loading variant="secondary">Processing</bl-button>
<bl-button loading kind="success">Submitting</bl-button>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        The <code>bl-spinner</code> component is used to indicate loading states. It can be
        customized in terms of size, color, disabled state, and overlay mode.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Key Features
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Preset sizes: <code>small</code>, <code>medium</code>, <code>large</code></li>
        <li>Custom sizes with CSS values or variables</li>
        <li>Custom colors using the <code>color</code> attribute</li>
        <li>Disabled state for muted appearance</li>
        <li>Overlay mode to cover parent element</li>
      </ul>
    </div>

    <!-- Basic -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Stand-alone Spinner
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The default spinner with no additional properties.
      </p>
    </div>

    <DemoSection title="Default Spinner" :code="basicCode">
      <bl-spinner></bl-spinner>
    </DemoSection>

    <!-- Sizes -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Spinner Sizes</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The spinner supports preset sizes (<code>small</code>, <code>medium</code>,
        <code>large</code>) or custom size values using CSS units or variables.
      </p>
    </div>

    <DemoSection title="Sizes" :code="sizesCode">
      <div class="flex flex-wrap items-end gap-6">
        <div class="text-center">
          <bl-spinner size="small"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">Small</p>
        </div>
        <div class="text-center">
          <bl-spinner size="medium"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">Medium</p>
        </div>
        <div class="text-center">
          <bl-spinner size="large"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">Large</p>
        </div>
        <div class="text-center">
          <bl-spinner size="var(--bl-font-size-xs)"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">XS</p>
        </div>
        <div class="text-center">
          <bl-spinner size="var(--bl-font-size-xl)"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">XL</p>
        </div>
        <div class="text-center">
          <bl-spinner size="32px"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">32px</p>
        </div>
        <div class="text-center">
          <bl-spinner size="3rem"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">3rem</p>
        </div>
      </div>
    </DemoSection>

    <!-- Colors -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Spinner Colors
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use the <code>color</code> attribute to customize the spinner color. You can use Baklava
        CSS variables or any valid CSS color value.
      </p>
    </div>

    <DemoSection title="Custom Colors" :code="colorsCode">
      <div class="flex flex-wrap items-center gap-6">
        <div class="text-center">
          <bl-spinner color="var(--bl-color-info-highlight)" size="large"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">Info</p>
        </div>
        <div class="text-center">
          <bl-spinner color="var(--bl-color-success)" size="large"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">Success</p>
        </div>
        <div class="text-center">
          <bl-spinner color="var(--bl-color-danger)" size="large"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">Danger</p>
        </div>
        <div class="text-center">
          <bl-spinner color="#5794ff" size="large"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">#5794ff</p>
        </div>
        <div class="text-center">
          <bl-spinner color="#0bc15c" size="large"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">#0bc15c</p>
        </div>
        <div class="text-center">
          <bl-spinner color="#ff5043" size="large"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">#ff5043</p>
        </div>
      </div>
    </DemoSection>

    <!-- Disabled -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Disabled Spinner
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can disable the spinner using the <code>disabled</code> property, which will change its
        color to indicate it is disabled.
      </p>
    </div>

    <DemoSection title="Disabled" :code="disabledCode">
      <div class="flex flex-wrap items-center gap-6">
        <div class="text-center">
          <bl-spinner disabled></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">Default Disabled</p>
        </div>
        <div class="text-center">
          <bl-spinner size="large" disabled></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">Large Disabled</p>
        </div>
      </div>
    </DemoSection>

    <!-- Overlay -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Overlay Spinner
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The spinner can be displayed in overlay mode to indicate a loading state that covers its
        parent element. Use the <code>overlay</code> attribute.
      </p>
    </div>

    <DemoSection title="Overlay Mode" :code="overlayCode">
      <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded">
        <p class="text-sm text-neutral-dark dark:text-neutral-light">
          When <code>overlay</code> is set, the spinner will cover the viewport or its positioned
          parent element with a semi-transparent background.
        </p>
      </div>
    </DemoSection>

    <!-- Relative Overlay -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Relative Overlay
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        When a parent element has <code>position: relative</code>, the overlay spinner will cover
        only that element instead of the entire viewport.
      </p>
    </div>

    <DemoSection title="Relative Overlay" :code="relativeOverlayCode">
      <div
        class="relative bg-neutral-lightest dark:bg-neutral-darker rounded-lg p-8 h-48 flex items-center justify-center"
      >
        <p class="text-neutral-dark dark:text-neutral-light text-center z-0">
          Content underneath the overlay
        </p>
        <bl-spinner overlay size="large"></bl-spinner>
      </div>
    </DemoSection>

    <!-- With Text -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">With Text</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Combine the spinner with text to provide context about what is loading.
      </p>
    </div>

    <DemoSection title="With Text" :code="textCode">
      <div class="flex flex-wrap items-center gap-6">
        <div class="flex items-center gap-2">
          <bl-spinner size="small"></bl-spinner>
          <span class="text-neutral-dark dark:text-neutral-light">Loading...</span>
        </div>
        <div class="flex items-center gap-2">
          <bl-spinner size="small"></bl-spinner>
          <span class="text-neutral-dark dark:text-neutral-light">Please wait</span>
        </div>
        <div class="flex items-center gap-2">
          <bl-spinner size="small"></bl-spinner>
          <span class="text-neutral-dark dark:text-neutral-light">Fetching data</span>
        </div>
      </div>
    </DemoSection>

    <!-- In Buttons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        In Buttons (Loading State)
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Buttons have built-in support for loading state using the <code>loading</code> attribute,
        which displays a spinner inside the button.
      </p>
    </div>

    <DemoSection title="Button Loading State" :code="buttonsCode">
      <div class="flex flex-wrap gap-3">
        <bl-button loading>Saving...</bl-button>
        <bl-button loading variant="secondary">Processing</bl-button>
        <bl-button loading kind="success">Submitting</bl-button>
        <bl-button loading kind="danger">Deleting</bl-button>
      </div>
    </DemoSection>
  </div>
</template>
