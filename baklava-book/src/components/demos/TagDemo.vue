<script setup lang="ts">
import { ref } from "vue";

const selectedTag = ref("");
</script>

<template>
  <div class="space-y-8">
    <!-- Basic Tags -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Tags</h4>
      <div class="flex flex-wrap gap-2">
        <bl-tag>Default</bl-tag>
        <bl-tag>Tag 1</bl-tag>
        <bl-tag>Tag 2</bl-tag>
        <bl-tag>Tag 3</bl-tag>
      </div>
    </div>

    <!-- Sizes -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Sizes</h4>
      <div class="flex flex-wrap items-center gap-2">
        <bl-tag size="large">Large</bl-tag>
        <bl-tag size="medium">Medium</bl-tag>
        <bl-tag size="small">Small</bl-tag>
      </div>
    </div>

    <!-- With Icons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Icons</h4>
      <div class="flex flex-wrap gap-2">
        <bl-tag icon="check_fill">Completed</bl-tag>
        <bl-tag icon="clock">Pending</bl-tag>
        <bl-tag icon="star">Featured</bl-tag>
        <bl-tag icon="location">Local</bl-tag>
      </div>
    </div>

    <!-- Removable -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Removable Tags</h4>
      <div class="flex flex-wrap gap-2">
        <bl-tag removable>JavaScript</bl-tag>
        <bl-tag removable>TypeScript</bl-tag>
        <bl-tag removable>Vue.js</bl-tag>
        <bl-tag removable>React</bl-tag>
      </div>
    </div>

    <!-- Selectable -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Selectable Tags</h4>
      <div class="flex flex-wrap gap-2">
        <bl-tag
          value="electronics"
          :selected="selectedTag === 'electronics'"
          @bl-tag-click="selectedTag = selectedTag === 'electronics' ? '' : 'electronics'"
        >
          Electronics
        </bl-tag>
        <bl-tag
          value="clothing"
          :selected="selectedTag === 'clothing'"
          @bl-tag-click="selectedTag = selectedTag === 'clothing' ? '' : 'clothing'"
        >
          Clothing
        </bl-tag>
        <bl-tag
          value="books"
          :selected="selectedTag === 'books'"
          @bl-tag-click="selectedTag = selectedTag === 'books' ? '' : 'books'"
        >
          Books
        </bl-tag>
      </div>
      <p class="text-sm text-neutral-dark mt-2">
        Selected: <strong class="text-primary">{{ selectedTag || "None" }}</strong>
      </p>
    </div>

    <!-- Disabled -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Disabled</h4>
      <div class="flex flex-wrap gap-2">
        <bl-tag disabled>Disabled Tag</bl-tag>
        <bl-tag disabled removable>Can't Remove</bl-tag>
      </div>
    </div>
  </div>
</template>
