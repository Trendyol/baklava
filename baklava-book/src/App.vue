<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import AppSidebar from "./components/AppSidebar.vue";
import Header from "./components/Header.vue";
import MobileSidebar from "./components/MobileSidebar.vue";
import TableOfContents from "./components/TableOfContents.vue";

const route = useRoute();

// Initialize from the value set in main.ts (prevents flash)
const initialDarkValue = (window as any).__INITIAL_DARK_MODE__;
const isDark = ref(initialDarkValue ?? false);

// Mobile menu state
const mobileMenuOpen = ref(false);

// Theme colors for light and dark modes
const THEME_COLORS = {
  light: "#ffffff",
  dark: "#0f131a",
} as const;

// Show sidebar and TOC on docs and component pages (not on home)
const showSidebar = computed(() => route.name === "component" || route.name === "docs");
const showToc = computed(() => route.name === "component" || route.name === "docs");

// Close mobile menu when route changes
watch(
  () => route.path,
  () => {
    mobileMenuOpen.value = false;
  }
);

// Apply theme changes (only when isDark changes, not on initial load)
watch(
  isDark,
  (dark) => {
    // Toggle dark class on html element
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");

    // Update color-scheme for native elements (scrollbars, inputs, etc.)
    document.documentElement.style.colorScheme = dark ? "dark" : "light";

    // Update theme-color meta tag for browser chrome
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", dark ? THEME_COLORS.dark : THEME_COLORS.light);
    }

    // Save preference to localStorage
    localStorage.setItem("baklava-theme", dark ? "dark" : "light");
  }
);

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}
</script>

<template>
  <div class="min-h-screen" style="background-color: var(--bl-color-neutral-full);">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg">
      Skip to main content
    </a>

    <Header v-model:dark="isDark" @toggle-menu="toggleMobileMenu" />

    <!-- Mobile Navigation Panel -->
    <Teleport to="body">
      <!-- Backdrop -->
      <Transition name="fade">
        <div
          v-if="mobileMenuOpen"
          class="mobile-backdrop fixed inset-0 bg-black/50 z-[60] lg:hidden"
          @click="mobileMenuOpen = false"
        />
      </Transition>

      <!-- Sidebar Panel -->
      <Transition name="slide-left">
        <aside
          v-if="mobileMenuOpen"
          class="mobile-sidebar fixed left-0 top-0 bottom-0 w-[17.5rem] bg-white dark:bg-neutral-darkest border-r border-neutral-lightest dark:border-neutral-darker z-[70] overflow-y-auto lg:hidden"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <!-- Header with close button -->
          <div class="flex items-center justify-between h-14 px-4 border-b border-neutral-lightest dark:border-neutral-darker">
            <span class="text-sm font-semibold text-neutral-darker dark:text-neutral-lighter">Navigation</span>
            <bl-button
              variant="tertiary"
              kind="neutral"
              size="small"
              icon="close"
              aria-label="Close navigation menu"
              @bl-click="mobileMenuOpen = false"
            />
          </div>

          <MobileSidebar @navigate="mobileMenuOpen = false" />
        </aside>
      </Transition>
    </Teleport>

    <div class="flex pt-14">
      <!-- Left Sidebar - Navigation (Desktop only) -->
      <AppSidebar v-if="showSidebar" />

      <!-- Main Content -->
      <main
        id="main-content"
        class="flex-1 min-h-[calc(100vh-56px)]"
        :class="{
          'lg:ml-[17.5rem]': showSidebar,
          'xl:mr-[17.5rem]': showToc
        }"
        role="main"
        style="background-color: var(--bl-color-neutral-full);"
      >
        <router-view />
      </main>

      <!-- Right Sidebar - Table of Contents -->
      <TableOfContents v-if="showToc" />
    </div>
  </div>
</template>

<style scoped>
/* Fade transition for backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide from left transition for sidebar */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.25s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

/* Mobile sidebar scrollbar styling */
.mobile-sidebar {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.mobile-sidebar:hover {
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}
</style>

<style>
html.dark .mobile-sidebar:hover {
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
</style>
