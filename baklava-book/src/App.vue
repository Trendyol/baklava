<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";

const route = useRoute();
const isDark = ref(false);

// Sidebar sadece component sayfalarında göster
const showComponentSidebar = computed(() => route.name === "component");

// Tema değişikliğini uygula
watch(
  isDark,
  (dark) => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  },
  { immediate: true }
);
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-neutral-darkest">
    <Header v-model:dark="isDark" />

    <div class="flex pt-14">
      <!-- Sidebar (sadece component sayfalarında) -->
      <Sidebar v-if="showComponentSidebar" />

      <!-- Main Content -->
      <main class="flex-1 min-h-[calc(100vh-56px)]" :class="{ 'ml-[260px]': showComponentSidebar }">
        <router-view />
      </main>
    </div>
  </div>
</template>
