<script setup lang="ts">
import { ref } from "vue";

const selectedDate = ref<Date | null>(null);
</script>

<template>
  <div class="space-y-8">
    <!-- Basic Calendar -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Calendar</h4>
      <bl-calendar></bl-calendar>
    </div>

    <!-- Range Selection -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Range Selection</h4>
      <bl-calendar type="range"></bl-calendar>
    </div>

    <!-- Multiple Selection -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Multiple Selection</h4>
      <bl-calendar type="multiple"></bl-calendar>
    </div>

    <!-- With Min/Max Dates -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Date Constraints</h4>
      <p class="text-sm text-neutral-dark mb-2">
        Some dates can be disabled using min-date and max-date attributes.
      </p>
      <bl-calendar></bl-calendar>
    </div>

    <!-- Interactive -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Interactive Demo</h4>
      <div class="flex flex-col md:flex-row gap-6">
        <bl-calendar @bl-calendar-change="selectedDate = $event.detail[0]"></bl-calendar>
        <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg">
          <p class="text-sm text-neutral-dark mb-1">Selected Date:</p>
          <p class="text-lg font-medium text-primary">
            {{ selectedDate ? selectedDate.toLocaleDateString() : "None selected" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
