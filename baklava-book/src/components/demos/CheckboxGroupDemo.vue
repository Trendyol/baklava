<script setup lang="ts">
import { ref } from "vue";

const selectedFruits = ref<string[]>([]);
</script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Checkbox Group</h4>
      <bl-checkbox-group label="Select fruits">
        <bl-checkbox value="apple">Apple</bl-checkbox>
        <bl-checkbox value="banana">Banana</bl-checkbox>
        <bl-checkbox value="orange">Orange</bl-checkbox>
      </bl-checkbox-group>
    </div>

    <!-- With Default Selection -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Default Selection</h4>
      <bl-checkbox-group label="Features">
        <bl-checkbox value="dark-mode" checked>Dark Mode</bl-checkbox>
        <bl-checkbox value="notifications" checked>Notifications</bl-checkbox>
        <bl-checkbox value="auto-save">Auto Save</bl-checkbox>
      </bl-checkbox-group>
    </div>

    <!-- Vertical Layout -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Vertical Layout</h4>
      <bl-checkbox-group label="Terms" style="--bl-checkbox-direction: column">
        <bl-checkbox value="terms">I accept the terms and conditions</bl-checkbox>
        <bl-checkbox value="privacy">I accept the privacy policy</bl-checkbox>
        <bl-checkbox value="newsletter">Subscribe to newsletter</bl-checkbox>
      </bl-checkbox-group>
    </div>

    <!-- States -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">States</h4>
      <div class="flex flex-wrap gap-8">
        <bl-checkbox-group label="Disabled Group" disabled>
          <bl-checkbox value="1">Option 1</bl-checkbox>
          <bl-checkbox value="2">Option 2</bl-checkbox>
        </bl-checkbox-group>

        <bl-checkbox-group label="Required" required>
          <bl-checkbox value="agree">I agree</bl-checkbox>
        </bl-checkbox-group>
      </div>
    </div>

    <!-- Indeterminate -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Single Checkbox States</h4>
      <div class="flex flex-wrap gap-4">
        <bl-checkbox>Normal</bl-checkbox>
        <bl-checkbox checked>Checked</bl-checkbox>
        <bl-checkbox indeterminate>Indeterminate</bl-checkbox>
        <bl-checkbox disabled>Disabled</bl-checkbox>
      </div>
    </div>
  </div>
</template>
