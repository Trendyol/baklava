<script setup lang="ts">
import { ref } from "vue";

const clickCount = ref(0);

function handleClick() {
  clickCount.value++;
}
</script>

<template>
  <div class="space-y-8">
    <!-- Variants -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Variants</h4>
      <div class="flex flex-wrap gap-3">
        <bl-button variant="primary">Primary</bl-button>
        <bl-button variant="secondary">Secondary</bl-button>
        <bl-button variant="tertiary">Tertiary</bl-button>
      </div>
    </div>

    <!-- Kinds -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Kinds</h4>
      <div class="flex flex-wrap gap-3">
        <bl-button kind="default">Default</bl-button>
        <bl-button kind="neutral">Neutral</bl-button>
        <bl-button kind="success">Success</bl-button>
        <bl-button kind="danger">Danger</bl-button>
      </div>
    </div>

    <!-- Sizes -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Sizes</h4>
      <div class="flex flex-wrap items-center gap-3">
        <bl-button size="large">Large</bl-button>
        <bl-button size="medium">Medium</bl-button>
        <bl-button size="small">Small</bl-button>
      </div>
    </div>

    <!-- With Icons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Icons</h4>
      <div class="flex flex-wrap gap-3">
        <bl-button icon="plus">Add Item</bl-button>
        <bl-button variant="secondary" icon="settings">Settings</bl-button>
        <bl-button variant="tertiary" icon="info">Info</bl-button>
      </div>
    </div>

    <!-- States -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">States</h4>
      <div class="flex flex-wrap gap-3">
        <bl-button disabled>Disabled</bl-button>
        <bl-button loading>Loading</bl-button>
        <bl-button loading loading-label="Saving...">Save</bl-button>
      </div>
    </div>

    <!-- Interactive -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Interactive Demo</h4>
      <div class="flex items-center gap-4">
        <bl-button @bl-click="handleClick"> Click me! </bl-button>
        <span class="text-neutral-dark">
          Clicked: <strong class="text-primary">{{ clickCount }}</strong> times
        </span>
      </div>
    </div>
  </div>
</template>
