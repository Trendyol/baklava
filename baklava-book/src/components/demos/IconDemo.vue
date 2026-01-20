<script setup lang="ts">
const commonIcons = [
  "home",
  "search",
  "settings",
  "account",
  "bell",
  "email",
  "calendar",
  "clock",
  "location",
  "star",
  "heart",
  "bookmark",
  "edit",
  "delete",
  "copy",
  "share",
  "download",
  "upload",
  "check_fill",
  "close",
  "info",
  "warning",
  "arrow_right",
  "arrow_left",
  "arrow_up",
  "arrow_down",
  "plus",
  "minus",
  "external_link",
  "refresh",
];
</script>

<template>
  <div class="space-y-8">
    <!-- Basic Icons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Icons</h4>
      <div class="flex flex-wrap gap-4">
        <bl-icon name="home"></bl-icon>
        <bl-icon name="search"></bl-icon>
        <bl-icon name="settings"></bl-icon>
        <bl-icon name="account"></bl-icon>
        <bl-icon name="bell"></bl-icon>
      </div>
    </div>

    <!-- Sizes -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Sizes (via font-size)</h4>
      <div class="flex flex-wrap items-center gap-6">
        <bl-icon name="star" style="font-size: 16px"></bl-icon>
        <bl-icon name="star" style="font-size: 24px"></bl-icon>
        <bl-icon name="star" style="font-size: 32px"></bl-icon>
        <bl-icon name="star" style="font-size: 48px"></bl-icon>
      </div>
    </div>

    <!-- Colors -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Colors</h4>
      <div class="flex flex-wrap items-center gap-4" style="font-size: 24px">
        <bl-icon name="heart" style="color: #f27a1a"></bl-icon>
        <bl-icon name="check_fill" style="color: #0bc15c"></bl-icon>
        <bl-icon name="warning" style="color: #ffb600"></bl-icon>
        <bl-icon name="close" style="color: #ff5043"></bl-icon>
        <bl-icon name="info" style="color: #5794ff"></bl-icon>
      </div>
    </div>

    <!-- Common Icons Grid -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Common Icons</h4>
      <div class="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-4">
        <div
          v-for="icon in commonIcons"
          :key="icon"
          class="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-neutral-lightest dark:hover:bg-neutral-darker"
        >
          <bl-icon :name="icon" style="font-size: 24px"></bl-icon>
          <span class="text-xs text-neutral-dark truncate">{{ icon }}</span>
        </div>
      </div>
    </div>

    <!-- Usage Example -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">In Context</h4>
      <div class="flex flex-wrap gap-4">
        <div class="flex items-center gap-2 text-neutral-darker dark:text-neutral-light">
          <bl-icon name="location" style="color: #f27a1a"></bl-icon>
          <span>Istanbul, Turkey</span>
        </div>
        <div class="flex items-center gap-2 text-neutral-darker dark:text-neutral-light">
          <bl-icon name="email" style="color: #5794ff"></bl-icon>
          <span>contact@example.com</span>
        </div>
        <div class="flex items-center gap-2 text-neutral-darker dark:text-neutral-light">
          <bl-icon name="calendar" style="color: #0bc15c"></bl-icon>
          <span>January 20, 2026</span>
        </div>
      </div>
    </div>
  </div>
</template>
