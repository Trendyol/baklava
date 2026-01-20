<script setup lang="ts"></script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Links</h4>
      <div class="flex flex-wrap gap-4">
        <bl-link href="#">Default Link</bl-link>
        <bl-link href="#" target="_blank">External Link</bl-link>
      </div>
    </div>

    <!-- Sizes -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Sizes</h4>
      <div class="flex flex-wrap items-center gap-4">
        <bl-link href="#" size="large">Large Link</bl-link>
        <bl-link href="#" size="medium">Medium Link</bl-link>
        <bl-link href="#" size="small">Small Link</bl-link>
      </div>
    </div>

    <!-- With Icons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Icons</h4>
      <div class="flex flex-wrap gap-4">
        <bl-link href="#" icon="arrow_right">Go to page</bl-link>
        <bl-link href="#" icon="external_link" target="_blank">Open external</bl-link>
        <bl-link href="#" icon="download">Download file</bl-link>
      </div>
    </div>

    <!-- Standalone -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Standalone</h4>
      <div class="flex flex-wrap gap-4">
        <bl-link href="#" standalone>Standalone Link</bl-link>
        <bl-link href="#" standalone icon="arrow_right">With Icon</bl-link>
      </div>
    </div>

    <!-- In Text -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Inline Usage</h4>
      <p class="text-neutral-darker dark:text-neutral-light">
        This is a paragraph with an <bl-link href="#">inline link</bl-link> inside the text content.
        You can also read our <bl-link href="#">terms of service</bl-link> and
        <bl-link href="#">privacy policy</bl-link>.
      </p>
    </div>
  </div>
</template>
