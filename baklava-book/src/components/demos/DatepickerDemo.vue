<script setup lang="ts">
import { ref } from "vue";
</script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Datepicker</h4>
      <div class="max-w-xs">
        <bl-datepicker label="Select Date" placeholder="Choose a date"></bl-datepicker>
      </div>
    </div>

    <!-- With Help Text -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Help Text</h4>
      <div class="max-w-xs">
        <bl-datepicker
          label="Birth Date"
          placeholder="DD/MM/YYYY"
          help-text="Enter your birth date"
        ></bl-datepicker>
      </div>
    </div>

    <!-- Date Range -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Date Range</h4>
      <div class="max-w-md">
        <bl-datepicker label="Select Period" placeholder="Start - End" type="range"></bl-datepicker>
      </div>
    </div>

    <!-- Sizes -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Sizes</h4>
      <div class="flex flex-wrap items-end gap-4">
        <bl-datepicker size="large" label="Large" placeholder="Large"></bl-datepicker>
        <bl-datepicker size="medium" label="Medium" placeholder="Medium"></bl-datepicker>
        <bl-datepicker size="small" label="Small" placeholder="Small"></bl-datepicker>
      </div>
    </div>

    <!-- States -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">States</h4>
      <div class="flex flex-wrap gap-4">
        <bl-datepicker label="Disabled" placeholder="Disabled" disabled></bl-datepicker>
        <bl-datepicker
          label="Invalid"
          placeholder="Invalid"
          invalid
          invalid-text="Please select a valid date"
        ></bl-datepicker>
      </div>
    </div>
  </div>
</template>
