<script setup lang="ts">
import { ref } from "vue";

const basicDialogOpen = ref(false);
const confirmDialogOpen = ref(false);
const formDialogOpen = ref(false);
</script>

<template>
  <div class="space-y-8">
    <!-- Basic Dialog -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Dialog</h4>
      <bl-button @bl-click="basicDialogOpen = true">Open Dialog</bl-button>

      <bl-dialog
        :open="basicDialogOpen"
        caption="Dialog Title"
        @bl-dialog-close="basicDialogOpen = false"
      >
        <p>
          This is a basic dialog with some content. Dialogs are used to display important
          information or get user input.
        </p>
        <bl-button slot="primary-action" @bl-click="basicDialogOpen = false">OK</bl-button>
      </bl-dialog>
    </div>

    <!-- Confirm Dialog -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Confirmation Dialog</h4>
      <bl-button kind="danger" @bl-click="confirmDialogOpen = true">Delete Item</bl-button>

      <bl-dialog
        :open="confirmDialogOpen"
        caption="Confirm Delete"
        @bl-dialog-close="confirmDialogOpen = false"
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        <bl-button slot="secondary-action" variant="secondary" @bl-click="confirmDialogOpen = false"
          >Cancel</bl-button
        >
        <bl-button slot="primary-action" kind="danger" @bl-click="confirmDialogOpen = false"
          >Delete</bl-button
        >
      </bl-dialog>
    </div>

    <!-- Form Dialog -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Form Dialog</h4>
      <bl-button variant="secondary" @bl-click="formDialogOpen = true">Edit Profile</bl-button>

      <bl-dialog
        :open="formDialogOpen"
        caption="Edit Profile"
        @bl-dialog-close="formDialogOpen = false"
      >
        <div class="space-y-4">
          <bl-input label="Name" placeholder="Enter your name"></bl-input>
          <bl-input label="Email" type="email" placeholder="Enter your email"></bl-input>
          <bl-textarea label="Bio" placeholder="Tell us about yourself"></bl-textarea>
        </div>
        <bl-button slot="secondary-action" variant="secondary" @bl-click="formDialogOpen = false"
          >Cancel</bl-button
        >
        <bl-button slot="primary-action" @bl-click="formDialogOpen = false">Save</bl-button>
      </bl-dialog>
    </div>

    <!-- Dialog Sizes -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Dialog with Custom Width</h4>
      <p class="text-sm text-neutral-dark mb-2">
        Use <code>--bl-dialog-width</code> CSS variable to customize width.
      </p>
      <div class="flex gap-3">
        <bl-button variant="tertiary" size="small">Small Dialog</bl-button>
        <bl-button variant="tertiary" size="small">Large Dialog</bl-button>
      </div>
    </div>
  </div>
</template>
