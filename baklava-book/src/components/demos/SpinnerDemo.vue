<script setup lang="ts"></script>

<template>
  <div class="space-y-8">
    <!-- Sizes -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Sizes</h4>
      <div class="flex flex-wrap items-center gap-6">
        <div class="text-center">
          <bl-spinner size="large"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">Large</p>
        </div>
        <div class="text-center">
          <bl-spinner size="medium"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">Medium</p>
        </div>
        <div class="text-center">
          <bl-spinner size="small"></bl-spinner>
          <p class="text-xs text-neutral-dark mt-2">Small</p>
        </div>
      </div>
    </div>

    <!-- Custom Colors -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Custom Colors</h4>
      <div class="flex flex-wrap items-center gap-6">
        <bl-spinner style="--bl-spinner-color: #0bc15c"></bl-spinner>
        <bl-spinner style="--bl-spinner-color: #ff5043"></bl-spinner>
        <bl-spinner style="--bl-spinner-color: #5794ff"></bl-spinner>
        <bl-spinner style="--bl-spinner-color: #273142"></bl-spinner>
      </div>
    </div>

    <!-- With Text -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Text</h4>
      <div class="flex flex-wrap items-center gap-6">
        <div class="flex items-center gap-2">
          <bl-spinner size="small"></bl-spinner>
          <span class="text-neutral-dark">Loading...</span>
        </div>
        <div class="flex items-center gap-2">
          <bl-spinner size="small"></bl-spinner>
          <span class="text-neutral-dark">Please wait</span>
        </div>
      </div>
    </div>

    <!-- In Buttons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">In Buttons (Loading State)</h4>
      <div class="flex flex-wrap gap-3">
        <bl-button loading>Saving...</bl-button>
        <bl-button loading variant="secondary">Processing</bl-button>
        <bl-button loading kind="success">Submitting</bl-button>
      </div>
    </div>

    <!-- Overlay Example -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Overlay Loading</h4>
      <div class="relative bg-neutral-lightest dark:bg-neutral-darker rounded-lg p-8 h-32">
        <p class="text-neutral-dark text-center">Content area</p>
        <div
          class="absolute inset-0 bg-white/80 dark:bg-neutral-darkest/80 flex items-center justify-center rounded-lg"
        >
          <bl-spinner size="large"></bl-spinner>
        </div>
      </div>
    </div>
  </div>
</template>
