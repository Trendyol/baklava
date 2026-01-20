<script setup lang="ts"></script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Badges</h4>
      <div class="flex flex-wrap gap-3">
        <bl-badge>Default</bl-badge>
        <bl-badge>Badge Text</bl-badge>
        <bl-badge>Label</bl-badge>
      </div>
    </div>

    <!-- Sizes -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Sizes</h4>
      <div class="flex flex-wrap items-center gap-3">
        <bl-badge size="large">Large</bl-badge>
        <bl-badge size="medium">Medium</bl-badge>
        <bl-badge size="small">Small</bl-badge>
      </div>
    </div>

    <!-- With Icons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Icons</h4>
      <div class="flex flex-wrap gap-3">
        <bl-badge icon="check_fill">Completed</bl-badge>
        <bl-badge icon="info">Info</bl-badge>
        <bl-badge icon="star">Featured</bl-badge>
        <bl-badge icon="clock">Pending</bl-badge>
      </div>
    </div>

    <!-- Custom Colors -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Custom Colors</h4>
      <div class="flex flex-wrap gap-3">
        <bl-badge style="--bl-badge-bg-color: #e7f9ef; --bl-badge-color: #0bc15c">Success</bl-badge>
        <bl-badge style="--bl-badge-bg-color: #ffeeec; --bl-badge-color: #ff5043">Error</bl-badge>
        <bl-badge style="--bl-badge-bg-color: #fff8e6; --bl-badge-color: #ffb600">Warning</bl-badge>
        <bl-badge style="--bl-badge-bg-color: #eef4ff; --bl-badge-color: #5794ff">Info</bl-badge>
      </div>
    </div>

    <!-- Icon Only -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Icon Only</h4>
      <div class="flex flex-wrap gap-3">
        <bl-badge icon="check_fill"></bl-badge>
        <bl-badge icon="close"></bl-badge>
        <bl-badge icon="info"></bl-badge>
        <bl-badge icon="star"></bl-badge>
      </div>
    </div>

    <!-- In Context -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Usage Examples</h4>
      <div class="flex flex-wrap gap-4">
        <div class="flex items-center gap-2">
          <span class="text-neutral-darker dark:text-neutral-light">Status:</span>
          <bl-badge
            icon="check_fill"
            style="--bl-badge-bg-color: #e7f9ef; --bl-badge-color: #0bc15c"
            >Active</bl-badge
          >
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
    </div>
  </div>
</template>
