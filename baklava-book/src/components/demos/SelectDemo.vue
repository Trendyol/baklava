<script setup lang="ts">
import { ref } from "vue";

const selectedValue = ref("");
</script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Select</h4>
      <div class="max-w-xs">
        <bl-select placeholder="Select an option" label="Country">
          <bl-select-option value="tr">Turkey</bl-select-option>
          <bl-select-option value="us">United States</bl-select-option>
          <bl-select-option value="uk">United Kingdom</bl-select-option>
          <bl-select-option value="de">Germany</bl-select-option>
        </bl-select>
      </div>
    </div>

    <!-- With Search -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Searchable</h4>
      <div class="max-w-xs">
        <bl-select placeholder="Search countries..." label="Country" searchable>
          <bl-select-option value="tr">Turkey</bl-select-option>
          <bl-select-option value="us">United States</bl-select-option>
          <bl-select-option value="uk">United Kingdom</bl-select-option>
          <bl-select-option value="de">Germany</bl-select-option>
          <bl-select-option value="fr">France</bl-select-option>
          <bl-select-option value="it">Italy</bl-select-option>
        </bl-select>
      </div>
    </div>

    <!-- Multiple -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Multiple Selection</h4>
      <div class="max-w-xs">
        <bl-select placeholder="Select colors" label="Colors" multiple>
          <bl-select-option value="red">Red</bl-select-option>
          <bl-select-option value="blue">Blue</bl-select-option>
          <bl-select-option value="green">Green</bl-select-option>
          <bl-select-option value="yellow">Yellow</bl-select-option>
        </bl-select>
      </div>
    </div>

    <!-- Sizes -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Sizes</h4>
      <div class="flex flex-wrap items-end gap-4">
        <bl-select size="large" placeholder="Large" label="Large">
          <bl-select-option value="1">Option 1</bl-select-option>
          <bl-select-option value="2">Option 2</bl-select-option>
        </bl-select>
        <bl-select size="medium" placeholder="Medium" label="Medium">
          <bl-select-option value="1">Option 1</bl-select-option>
          <bl-select-option value="2">Option 2</bl-select-option>
        </bl-select>
        <bl-select size="small" placeholder="Small" label="Small">
          <bl-select-option value="1">Option 1</bl-select-option>
          <bl-select-option value="2">Option 2</bl-select-option>
        </bl-select>
      </div>
    </div>

    <!-- States -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">States</h4>
      <div class="flex flex-wrap gap-4">
        <bl-select placeholder="Disabled" label="Disabled" disabled>
          <bl-select-option value="1">Option 1</bl-select-option>
        </bl-select>
        <bl-select
          placeholder="Invalid"
          label="Invalid"
          invalid
          invalid-text="Please select an option"
        >
          <bl-select-option value="1">Option 1</bl-select-option>
        </bl-select>
      </div>
    </div>
  </div>
</template>
