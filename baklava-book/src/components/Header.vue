<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { docCategories } from "@/data/docs";

const route = useRoute();
const dark = defineModel<boolean>("dark", { default: false });

const activeDropdown = ref<string | null>(null);

function toggleDropdown(id: string) {
  activeDropdown.value = activeDropdown.value === id ? null : id;
}

function closeDropdowns() {
  activeDropdown.value = null;
}

// Navbar menü yapısı
const navItems = computed(() => [
  {
    id: "docs",
    label: "Docs",
    hasDropdown: true,
    categories: docCategories.filter((c) => ["getting-started", "customization"].includes(c.id)),
  },
  {
    id: "frameworks",
    label: "Frameworks",
    hasDropdown: true,
    categories: docCategories.filter((c) => c.id === "frameworks"),
  },
  {
    id: "design-system",
    label: "Design System",
    hasDropdown: true,
    categories: docCategories.filter((c) => c.id === "design-system"),
  },
  {
    id: "components",
    label: "Components",
    to: "/components/button",
    hasDropdown: false,
  },
]);
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-neutral-darkest border-b border-neutral-lightest dark:border-neutral-darker z-50"
  >
    <div class="flex items-center justify-between h-full px-6">
      <!-- Logo -->
      <div class="flex items-center gap-8">
        <router-link to="/" class="flex items-center gap-3">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">B</span>
          </div>
          <span class="font-semibold text-lg text-neutral-darkest dark:text-white"> Baklava </span>
        </router-link>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <template v-for="item in navItems" :key="item.id">
            <!-- Dropdown items -->
            <div v-if="item.hasDropdown" class="relative">
              <button
                class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-darker dark:text-neutral-light hover:text-primary transition-colors rounded-lg hover:bg-neutral-lightest dark:hover:bg-neutral-darker"
                @click="toggleDropdown(item.id)"
              >
                {{ item.label }}
                <svg
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-180': activeDropdown === item.id }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="activeDropdown === item.id"
                  class="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-neutral-darker rounded-xl shadow-lg border border-neutral-lightest dark:border-neutral-dark py-2 z-50"
                  @mouseleave="closeDropdowns"
                >
                  <template v-for="category in item.categories" :key="category.id">
                    <div class="px-3 py-2">
                      <div
                        class="flex items-center gap-2 text-xs font-semibold text-neutral-dark uppercase tracking-wider mb-1"
                      >
                        <span>{{ category.icon }}</span>
                        <span>{{ category.label }}</span>
                      </div>
                      <ul class="space-y-0.5">
                        <li v-for="doc in category.items" :key="doc.slug">
                          <router-link
                            :to="`/docs/${doc.slug}`"
                            class="block px-2 py-1.5 text-sm text-neutral-darker dark:text-neutral-light hover:bg-neutral-lightest dark:hover:bg-neutral-dark rounded-lg transition-colors"
                            @click="closeDropdowns"
                          >
                            {{ doc.name }}
                          </router-link>
                        </li>
                      </ul>
                    </div>
                    <div
                      v-if="
                        item.categories &&
                        item.categories.indexOf(category) < item.categories.length - 1
                      "
                      class="border-t border-neutral-lightest dark:border-neutral-dark my-1"
                    />
                  </template>
                </div>
              </Transition>
            </div>

            <!-- Regular link -->
            <router-link
              v-else
              :to="item.to!"
              class="px-3 py-2 text-sm font-medium text-neutral-darker dark:text-neutral-light hover:text-primary transition-colors rounded-lg hover:bg-neutral-lightest dark:hover:bg-neutral-darker"
            >
              {{ item.label }}
            </router-link>
          </template>
        </nav>
      </div>

      <!-- Right Side -->
      <div class="flex items-center gap-2">
        <!-- Search -->
        <bl-button variant="tertiary" kind="neutral" size="small" icon="search">
          Search ⌘K
        </bl-button>

        <!-- Theme Toggle -->
        <bl-button
          variant="tertiary"
          kind="neutral"
          size="small"
          @bl-click="dark = !dark"
        >{{!dark ? 'Dark Mode' : 'Light Mode'}}</bl-button>

        <!-- GitHub -->
        <bl-button
          variant="tertiary"
          kind="neutral"
          size="small"
          icon="external_link"
          href="https://github.com/Trendyol/baklava"
          target="_blank"
        >
          GitHub
        </bl-button>
      </div>
    </div>

    <!-- Mobile overlay to close dropdowns -->
    <div v-if="activeDropdown" class="fixed inset-0 z-40" @click="closeDropdowns" />
  </header>
</template>
