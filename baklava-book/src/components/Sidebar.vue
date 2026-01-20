<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { components, categories, getComponentsByCategory } from "@/data/components";

const route = useRoute();

const currentSlug = computed(() => route.params.slug as string);
</script>

<template>
  <aside
    class="fixed left-0 top-14 bottom-0 w-[260px] bg-white dark:bg-neutral-darkest border-r border-neutral-lightest dark:border-neutral-darker overflow-y-auto"
  >
    <nav class="p-4">
      <!-- Kategoriler -->
      <div v-for="category in categories" :key="category.id" class="mb-6">
        <h3
          class="flex items-center gap-2 text-xs font-semibold text-neutral-dark uppercase tracking-wider mb-2 px-2"
        >
          <span>{{ category.icon }}</span>
          <span>{{ category.label }}</span>
        </h3>

        <ul class="space-y-0.5">
          <li v-for="comp in getComponentsByCategory(category.id)" :key="comp.slug">
            <router-link
              :to="`/components/${comp.slug}`"
              class="block px-3 py-1.5 rounded-lg text-sm transition-colors"
              :class="[
                currentSlug === comp.slug
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-neutral-darker dark:text-neutral-light hover:bg-neutral-lightest dark:hover:bg-neutral-darker',
              ]"
            >
              {{ comp.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>
