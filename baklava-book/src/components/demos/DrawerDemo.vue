<script setup lang="ts">
import { ref } from "vue";

const rightDrawerOpen = ref(false);
const leftDrawerOpen = ref(false);
</script>

<template>
  <div class="space-y-8">
    <!-- Right Drawer -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Right Drawer (Default)</h4>
      <bl-button @bl-click="rightDrawerOpen = true">Open Right Drawer</bl-button>

      <bl-drawer
        :open="rightDrawerOpen"
        caption="Drawer Title"
        @bl-drawer-close="rightDrawerOpen = false"
      >
        <div class="p-4">
          <p class="text-neutral-darker dark:text-neutral-light mb-4">
            This is a drawer panel that slides in from the right side of the screen.
          </p>
          <p class="text-neutral-darker dark:text-neutral-light mb-4">
            Drawers are useful for displaying additional content or forms without navigating away
            from the current page.
          </p>
          <bl-button @bl-click="rightDrawerOpen = false">Close</bl-button>
        </div>
      </bl-drawer>
    </div>

    <!-- Left Drawer -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Left Drawer</h4>
      <bl-button variant="secondary" @bl-click="leftDrawerOpen = true">Open Left Drawer</bl-button>

      <bl-drawer
        :open="leftDrawerOpen"
        caption="Navigation"
        external-open
        @bl-drawer-close="leftDrawerOpen = false"
      >
        <div class="p-4">
          <nav class="space-y-2">
            <a href="#" class="block px-3 py-2 rounded-lg hover:bg-neutral-lightest">Home</a>
            <a href="#" class="block px-3 py-2 rounded-lg hover:bg-neutral-lightest">Products</a>
            <a href="#" class="block px-3 py-2 rounded-lg hover:bg-neutral-lightest">About</a>
            <a href="#" class="block px-3 py-2 rounded-lg hover:bg-neutral-lightest">Contact</a>
          </nav>
        </div>
      </bl-drawer>
    </div>

    <!-- With Form -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Drawer with Form</h4>
      <p class="text-sm text-neutral-dark">
        Drawers can contain forms for creating or editing content.
      </p>
    </div>

    <!-- Note -->
    <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <p class="text-sm text-blue-700 dark:text-blue-300">
        💡 <strong>Tip:</strong> Use drawers for secondary actions, filters, or detailed views that
        don't require full page navigation.
      </p>
    </div>
  </div>
</template>
