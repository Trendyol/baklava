<script setup lang="ts">
import { ref } from "vue";

const isEnabled = ref(false);
</script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Switch</h4>
      <div class="flex flex-wrap gap-6">
        <bl-switch>Enable notifications</bl-switch>
        <bl-switch checked>Dark mode</bl-switch>
      </div>
    </div>

    <!-- Sizes (via custom styling) -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">States</h4>
      <div class="flex flex-wrap gap-6">
        <bl-switch>Unchecked</bl-switch>
        <bl-switch checked>Checked</bl-switch>
        <bl-switch disabled>Disabled</bl-switch>
        <bl-switch disabled checked>Disabled Checked</bl-switch>
      </div>
    </div>

    <!-- Custom Colors -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Custom Colors</h4>
      <div class="flex flex-wrap gap-6">
        <bl-switch checked style="--bl-switch-color-on: #0bc15c">Success</bl-switch>
        <bl-switch checked style="--bl-switch-color-on: #ff5043">Danger</bl-switch>
        <bl-switch checked style="--bl-switch-color-on: #5794ff">Info</bl-switch>
      </div>
    </div>

    <!-- Interactive -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Interactive Demo</h4>
      <div class="flex items-center gap-4">
        <bl-switch :checked="isEnabled" @bl-switch-toggle="isEnabled = $event.detail">
          Feature Toggle
        </bl-switch>
        <span class="text-neutral-dark">
          Status:
          <strong :class="isEnabled ? 'text-green-600' : 'text-red-500'">
            {{ isEnabled ? "Enabled" : "Disabled" }}
          </strong>
        </span>
      </div>
    </div>
  </div>
</template>
