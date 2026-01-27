<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { navigation } from "@/data/navigation";

const route = useRoute();

const emit = defineEmits<{
  (e: "navigate"): void;
}>();

// Current active path
const currentPath = computed(() => route.path);

function handleNavigation() {
  emit("navigate");
}
</script>

<template>
  <nav class="py-4" aria-label="Mobile navigation">
    <div
      v-for="section in navigation.sections"
      :key="section.id"
      class="mb-4"
    >
      <!-- Section Header -->
      <h3
        class="px-4 py-1 text-xs font-semibold text-neutral-darker dark:text-neutral-lighter uppercase tracking-wider"
      >
        {{ section.title }}
      </h3>

      <!-- Section Items -->
      <ul
        class="mt-1 space-y-0.5 px-2"
        role="list"
      >
        <li v-for="item in section.items" :key="item.path">
          <router-link
            :to="item.path"
            class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            :class="[
              currentPath === item.path
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-neutral-darker dark:text-neutral-light hover:bg-neutral-lightest dark:hover:bg-neutral-darker',
            ]"
            @click="handleNavigation"
          >
            <span>{{ item.title }}</span>
            <span
              v-if="item.tags?.length"
              class="inline-flex items-center px-1.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded"
            >
              {{ item.tags[0] }}
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
