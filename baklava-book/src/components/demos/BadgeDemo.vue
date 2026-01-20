<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";

const basicCode = `<bl-badge>Default</bl-badge>
<bl-badge>Badge Text</bl-badge>
<bl-badge>Label</bl-badge>`;

const sizesCode = `<bl-badge size="large">Large</bl-badge>
<bl-badge size="medium">Medium</bl-badge>
<bl-badge size="small">Small</bl-badge>`;

const iconsCode = `<bl-badge icon="check_fill">Completed</bl-badge>
<bl-badge icon="info">Info</bl-badge>
<bl-badge icon="star">Featured</bl-badge>
<bl-badge icon="clock">Pending</bl-badge>`;

const colorsCode = `<bl-badge style="--bl-badge-bg-color: #e7f9ef; --bl-badge-color: #0bc15c">Success</bl-badge>
<bl-badge style="--bl-badge-bg-color: #ffeeec; --bl-badge-color: #ff5043">Error</bl-badge>
<bl-badge style="--bl-badge-bg-color: #fff8e6; --bl-badge-color: #ffb600">Warning</bl-badge>
<bl-badge style="--bl-badge-bg-color: #eef4ff; --bl-badge-color: #5794ff">Info</bl-badge>`;

const iconOnlyCode = `<bl-badge icon="check_fill"></bl-badge>
<bl-badge icon="close"></bl-badge>
<bl-badge icon="info"></bl-badge>
<bl-badge icon="star"></bl-badge>`;

const usageCode = `<div class="flex items-center gap-2">
  <span>Status:</span>
  <bl-badge icon="check_fill" style="--bl-badge-bg-color: #e7f9ef; --bl-badge-color: #0bc15c">
    Active
  </bl-badge>
</div>
<div class="flex items-center gap-2">
  <span>Version:</span>
  <bl-badge>v1.0.0</bl-badge>
</div>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Badge component is used to display status, labels, or categories. It helps users quickly
        identify and categorize information.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Usage Guidelines
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Use badges to highlight status or category information</li>
        <li>Keep badge text short and descriptive</li>
        <li>Use consistent colors for similar statuses across your app</li>
        <li>Add icons to improve visual recognition</li>
        <li>Use appropriate sizes based on context</li>
      </ul>
    </div>

    <!-- Basic -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Badges</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Simple text badges for labels and categories.
      </p>
    </div>

    <DemoSection title="Basic Badges" :code="basicCode">
      <div class="flex flex-wrap gap-3">
        <bl-badge>Default</bl-badge>
        <bl-badge>Badge Text</bl-badge>
        <bl-badge>Label</bl-badge>
      </div>
    </DemoSection>

    <!-- Sizes -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Badge Sizes</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Badges come in 3 sizes: <strong>large</strong>, <strong>medium</strong> (default), and
        <strong>small</strong>.
      </p>
    </div>

    <DemoSection title="Sizes" :code="sizesCode">
      <div class="flex flex-wrap items-center gap-3">
        <bl-badge size="large">Large</bl-badge>
        <bl-badge size="medium">Medium</bl-badge>
        <bl-badge size="small">Small</bl-badge>
      </div>
    </DemoSection>

    <!-- With Icons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">With Icons</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Add <code>icon</code> attribute to display an icon before the badge text.
      </p>
    </div>

    <DemoSection title="With Icons" :code="iconsCode">
      <div class="flex flex-wrap gap-3">
        <bl-badge icon="check_fill">Completed</bl-badge>
        <bl-badge icon="info">Info</bl-badge>
        <bl-badge icon="star">Featured</bl-badge>
        <bl-badge icon="clock">Pending</bl-badge>
      </div>
    </DemoSection>

    <!-- Custom Colors -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Custom Colors
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use CSS variables <code>--bl-badge-bg-color</code> and <code>--bl-badge-color</code> to
        customize badge colors for different statuses.
      </p>
    </div>

    <DemoSection title="Custom Colors" :code="colorsCode">
      <div class="flex flex-wrap gap-3">
        <bl-badge style="--bl-badge-bg-color: #e7f9ef; --bl-badge-color: #0bc15c">Success</bl-badge>
        <bl-badge style="--bl-badge-bg-color: #ffeeec; --bl-badge-color: #ff5043">Error</bl-badge>
        <bl-badge style="--bl-badge-bg-color: #fff8e6; --bl-badge-color: #ffb600">Warning</bl-badge>
        <bl-badge style="--bl-badge-bg-color: #eef4ff; --bl-badge-color: #5794ff">Info</bl-badge>
      </div>
    </DemoSection>

    <!-- Icon Only -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Icon Only Badges
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Badges can display just an icon without text for compact representations.
      </p>
    </div>

    <DemoSection title="Icon Only" :code="iconOnlyCode">
      <div class="flex flex-wrap gap-3">
        <bl-badge icon="check_fill"></bl-badge>
        <bl-badge icon="close"></bl-badge>
        <bl-badge icon="info"></bl-badge>
        <bl-badge icon="star"></bl-badge>
      </div>
    </DemoSection>

    <!-- In Context -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Usage Examples
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Badges are commonly used alongside text to show status or version information.
      </p>
    </div>

    <DemoSection title="Usage Examples" :code="usageCode">
      <div class="flex flex-wrap gap-4">
        <div class="flex items-center gap-2">
          <span class="text-neutral-darker dark:text-neutral-light">Status:</span>
          <bl-badge
            icon="check_fill"
            style="--bl-badge-bg-color: #e7f9ef; --bl-badge-color: #0bc15c"
          >
            Active
          </bl-badge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-neutral-darker dark:text-neutral-light">Version:</span>
          <bl-badge>v1.0.0</bl-badge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-neutral-darker dark:text-neutral-light">Category:</span>
          <bl-badge icon="puzzle">Component</bl-badge>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
