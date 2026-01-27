<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { navigation } from "@/data/navigation";

const route = useRoute();

// Current active path
const currentPath = computed(() => route.path);
</script>

<template>
  <aside
    class="sidebar-container hidden lg:block fixed left-0 top-14 bottom-0 w-[17.5rem] bg-white dark:bg-neutral-darkest border-r border-neutral-lightest dark:border-neutral-darker overflow-y-auto"
    role="navigation"
    aria-label="Main navigation"
  >
    <nav class="py-4">
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
              class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              :class="[
                currentPath === item.path
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-neutral-darker dark:text-neutral-light hover:bg-neutral-lightest dark:hover:bg-neutral-darker',
              ]"
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
  </aside>
</template>
