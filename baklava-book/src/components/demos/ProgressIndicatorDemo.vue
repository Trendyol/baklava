<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const progress = ref(0);
let interval: number;

onMounted(() => {
  interval = setInterval(() => {
    progress.value = (progress.value + 5) % 105;
  }, 500) as unknown as number;
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Progress</h4>
      <div class="space-y-4 max-w-md">
        <bl-progress-indicator value="25" max="100"></bl-progress-indicator>
        <bl-progress-indicator value="50" max="100"></bl-progress-indicator>
        <bl-progress-indicator value="75" max="100"></bl-progress-indicator>
        <bl-progress-indicator value="100" max="100"></bl-progress-indicator>
      </div>
    </div>

    <!-- Sizes -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Sizes</h4>
      <div class="space-y-4 max-w-md">
        <bl-progress-indicator size="large" value="60" max="100"></bl-progress-indicator>
        <bl-progress-indicator size="medium" value="60" max="100"></bl-progress-indicator>
        <bl-progress-indicator size="small" value="60" max="100"></bl-progress-indicator>
      </div>
    </div>

    <!-- With Max Value -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Custom Max Value</h4>
      <div class="space-y-4 max-w-md">
        <div>
          <p class="text-sm text-neutral-dark mb-1">3 of 10 completed</p>
          <bl-progress-indicator value="3" max="10"></bl-progress-indicator>
        </div>
        <div>
          <p class="text-sm text-neutral-dark mb-1">7 of 10 completed</p>
          <bl-progress-indicator value="7" max="10"></bl-progress-indicator>
        </div>
      </div>
    </div>

    <!-- Animated -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Animated Progress</h4>
      <div class="max-w-md">
        <p class="text-sm text-neutral-dark mb-1">Progress: {{ progress }}%</p>
        <bl-progress-indicator :value="progress" max="100"></bl-progress-indicator>
      </div>
    </div>

    <!-- Use Cases -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Use Cases</h4>
      <div class="space-y-4 max-w-md">
        <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg">
          <div class="flex justify-between text-sm mb-2">
            <span class="text-neutral-darker dark:text-neutral-light">Uploading file.zip</span>
            <span class="text-primary font-medium">68%</span>
          </div>
          <bl-progress-indicator value="68" max="100"></bl-progress-indicator>
        </div>
        <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg">
          <div class="flex justify-between text-sm mb-2">
            <span class="text-neutral-darker dark:text-neutral-light">Storage used</span>
            <span class="text-neutral-dark">15GB / 50GB</span>
          </div>
          <bl-progress-indicator value="30" max="100"></bl-progress-indicator>
        </div>
      </div>
    </div>
  </div>
</template>
