<script setup lang="ts">
import { ref } from "vue";

const textValue = ref("");
</script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Textarea</h4>
      <div class="max-w-md">
        <bl-textarea placeholder="Enter your message..." label="Message"></bl-textarea>
      </div>
    </div>

    <!-- With Help Text -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Help Text</h4>
      <div class="max-w-md">
        <bl-textarea
          placeholder="Write a description..."
          label="Description"
          help-text="Maximum 500 characters"
        ></bl-textarea>
      </div>
    </div>

    <!-- Rows -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Custom Rows</h4>
      <div class="flex flex-wrap gap-4">
        <bl-textarea rows="2" placeholder="2 rows" label="Small"></bl-textarea>
        <bl-textarea rows="5" placeholder="5 rows" label="Medium"></bl-textarea>
      </div>
    </div>

    <!-- States -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">States</h4>
      <div class="flex flex-wrap gap-4">
        <bl-textarea placeholder="Disabled" label="Disabled" disabled></bl-textarea>
        <bl-textarea
          placeholder="Invalid"
          label="Invalid"
          invalid
          invalid-text="This field is required"
        ></bl-textarea>
      </div>
    </div>

    <!-- Character Count -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Max Length</h4>
      <div class="max-w-md">
        <bl-textarea
          placeholder="Limited to 100 characters..."
          label="Bio"
          maxlength="100"
          :value="textValue"
          @bl-input="textValue = $event.target.value"
        ></bl-textarea>
        <p class="text-sm text-neutral-dark mt-1">{{ textValue.length }}/100</p>
      </div>
    </div>
  </div>
</template>
