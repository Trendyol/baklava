<script setup lang="ts">
import { ref } from "vue";

const inputValue = ref("");
const passwordVisible = ref(false);
</script>

<template>
  <div class="space-y-8">
    <!-- Basic Input -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Input</h4>
      <div class="flex flex-wrap gap-4">
        <bl-input placeholder="Enter text..." label="Label"></bl-input>
        <bl-input
          placeholder="With help text"
          label="Email"
          help-text="We'll never share your email"
        ></bl-input>
      </div>
    </div>

    <!-- Input Types -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Input Types</h4>
      <div class="flex flex-wrap gap-4">
        <bl-input type="text" placeholder="Text input" label="Text"></bl-input>
        <bl-input type="email" placeholder="email@example.com" label="Email"></bl-input>
        <bl-input type="password" placeholder="••••••••" label="Password"></bl-input>
        <bl-input type="number" placeholder="0" label="Number"></bl-input>
      </div>
    </div>

    <!-- Sizes -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Sizes</h4>
      <div class="flex flex-wrap items-end gap-4">
        <bl-input size="large" placeholder="Large" label="Large"></bl-input>
        <bl-input size="medium" placeholder="Medium" label="Medium"></bl-input>
        <bl-input size="small" placeholder="Small" label="Small"></bl-input>
      </div>
    </div>

    <!-- States -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">States</h4>
      <div class="flex flex-wrap gap-4">
        <bl-input placeholder="Disabled" label="Disabled" disabled></bl-input>
        <bl-input
          placeholder="Read only"
          label="Read Only"
          readonly
          value="Read only value"
        ></bl-input>
        <bl-input
          placeholder="Invalid"
          label="Invalid"
          invalid
          invalid-text="This field is required"
        ></bl-input>
      </div>
    </div>

    <!-- With Icons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Icons</h4>
      <div class="flex flex-wrap gap-4">
        <bl-input placeholder="Search..." label="Search" icon="search"></bl-input>
        <bl-input placeholder="Enter email" label="Email" icon="email"></bl-input>
      </div>
    </div>

    <!-- Interactive -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Interactive Demo</h4>
      <div class="flex items-center gap-4">
        <bl-input
          :value="inputValue"
          placeholder="Type something..."
          label="Live Input"
          @bl-input="inputValue = $event.target.value"
        ></bl-input>
        <span class="text-neutral-dark">
          Value: <strong class="text-primary">{{ inputValue || "(empty)" }}</strong>
        </span>
      </div>
    </div>
  </div>
</template>
