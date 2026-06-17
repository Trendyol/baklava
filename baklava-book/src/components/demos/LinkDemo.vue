<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";

const basicCode = `<bl-link href="#">Default Link</bl-link>
<bl-link href="#" target="_blank">External Link</bl-link>`;

const sizesCode = `<bl-link href="#" size="large">Large Link</bl-link>
<bl-link href="#" size="medium">Medium Link</bl-link>
<bl-link href="#" size="small">Small Link</bl-link>`;

const iconsCode = `<bl-link href="#" icon="arrow_right">Go to page</bl-link>
<bl-link href="#" icon="external_link" target="_blank">Open external</bl-link>
<bl-link href="#" icon="download">Download file</bl-link>`;

const standaloneCode = `<!-- Standalone links have different styling -->
<bl-link href="#" standalone>Standalone Link</bl-link>
<bl-link href="#" standalone icon="arrow_right">With Icon</bl-link>`;

const inlineCode = `<p>
  This is a paragraph with an <bl-link href="#">inline link</bl-link> inside the text content.
  You can also read our <bl-link href="#">terms of service</bl-link> and
  <bl-link href="#">privacy policy</bl-link>.
</p>`;

const disabledCode = `<bl-link href="#" disabled>Disabled Link</bl-link>
<bl-link href="#" disabled icon="arrow_right">Disabled with Icon</bl-link>`;

const rtlCode = `<!-- LTR (Left-to-Right) -->
<bl-link href="#" icon="arrow_right">Go to page</bl-link>

<!-- RTL (Right-to-Left) -->
<div dir="rtl">
  <bl-link href="#" icon="arrow_left">انتقل إلى الصفحة</bl-link>
</div>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Link component is used for navigation between pages or sections. It can be used standalone
        or inline within text content.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Key Features
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Three size options: small, medium, and large</li>
        <li>Support for icons to enhance visual feedback</li>
        <li>Standalone mode for prominent links</li>
        <li>Inline usage within paragraphs</li>
        <li>Accessible with proper focus states</li>
      </ul>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Links require an <code>href</code> attribute. Use <code>target="_blank"</code> for external
        links that should open in a new tab.
      </p>
    </div>

    <DemoSection title="Basic Links" :code="basicCode">
      <div class="flex flex-wrap gap-4">
        <bl-link href="#">Default Link</bl-link>
        <bl-link href="#" target="_blank">External Link</bl-link>
      </div>
    </DemoSection>

    <!-- Sizes -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Link Sizes</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Link has 3 size options: <strong>small</strong>, <strong>medium</strong>, and
        <strong>large</strong>. Size is <code>medium</code> by default.
      </p>
    </div>

    <DemoSection title="Sizes" :code="sizesCode">
      <div class="flex flex-wrap items-center gap-4">
        <bl-link href="#" variant="standalone" size="large">Large Link</bl-link>
        <bl-link href="#" variant="standalone" size="medium">Medium Link</bl-link>
        <bl-link href="#" variant="standalone" size="small">Small Link</bl-link>
      </div>
    </DemoSection>

    <!-- With Icons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Links with Icons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use the <code>icon</code> attribute to add an icon to the link. Icons help users understand
        the action or destination.
      </p>
    </div>

    <DemoSection title="With Icons" :code="iconsCode">
      <div class="flex flex-wrap gap-4">
        <bl-link href="#" icon="arrow_right">Go to page</bl-link>
        <bl-link href="#" icon="external_link" target="_blank">Open external</bl-link>
        <bl-link href="#" icon="download">Download file</bl-link>
      </div>
    </DemoSection>

    <!-- Standalone -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Standalone Links
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Standalone links have different styling and are meant to be used as prominent call-to-action
        elements, not within inline text.
      </p>
    </div>

    <DemoSection title="Standalone" :code="standaloneCode">
      <div class="flex flex-wrap gap-4">
        <bl-link href="#" standalone>Standalone Link</bl-link>
        <bl-link href="#" standalone icon="arrow_right">With Icon</bl-link>
      </div>
    </DemoSection>

    <!-- Inline Usage -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Inline Usage
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Links can be used inline within paragraphs and other text content. They will inherit the
        surrounding text size and flow naturally.
      </p>
    </div>

    <DemoSection title="Inline Usage" :code="inlineCode">
      <p class="text-neutral-darker dark:text-neutral-light">
        This is a paragraph with an <bl-link href="#">inline link</bl-link> inside the text content.
        You can also read our <bl-link href="#">terms of service</bl-link> and
        <bl-link href="#">privacy policy</bl-link>.
      </p>
    </DemoSection>

    <!-- Disabled -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Disabled State
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Links can be disabled using the <code>disabled</code> attribute. Disabled links are not
        clickable and have reduced opacity.
      </p>
    </div>

    <DemoSection title="Disabled" :code="disabledCode">
      <div class="flex flex-wrap gap-4">
        <bl-link href="#" disabled>Disabled Link</bl-link>
        <bl-link href="#" disabled icon="arrow_right">Disabled with Icon</bl-link>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The link component supports RTL (Right-to-Left) text direction. Icon positions are
        automatically adjusted in RTL mode.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex gap-8">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <bl-link href="#" icon="arrow_right">Go to page</bl-link>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <bl-link href="#" icon="arrow_left">انتقل إلى الصفحة</bl-link>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
