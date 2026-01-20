<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

const basicDialogOpen = ref(false);
const confirmDialogOpen = ref(false);
const formDialogOpen = ref(false);
const stickyDialogOpen = ref(false);

const basicCode = `<bl-button @bl-click="dialogOpen = true">Open Dialog</bl-button>

<bl-dialog
  :open="dialogOpen"
  caption="Dialog Title"
  @bl-dialog-close="dialogOpen = false"
>
  <p>This is a basic dialog with some content.</p>
  <bl-button slot="primary-action" @bl-click="dialogOpen = false">OK</bl-button>
</bl-dialog>`;

const confirmCode = `<bl-button kind="danger" @bl-click="confirmDialogOpen = true">Delete Item</bl-button>

<bl-dialog
  :open="confirmDialogOpen"
  caption="Confirm Delete"
  @bl-dialog-close="confirmDialogOpen = false"
>
  <p>Are you sure you want to delete this item? This action cannot be undone.</p>
  <bl-button slot="secondary-action" variant="secondary" @bl-click="confirmDialogOpen = false">
    Cancel
  </bl-button>
  <bl-button slot="primary-action" kind="danger" @bl-click="confirmDialogOpen = false">
    Delete
  </bl-button>
</bl-dialog>`;

const formCode = `<bl-button variant="secondary" @bl-click="formDialogOpen = true">Edit Profile</bl-button>

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
  <bl-button slot="secondary-action" variant="secondary" @bl-click="formDialogOpen = false">
    Cancel
  </bl-button>
  <bl-button slot="primary-action" @bl-click="formDialogOpen = false">Save</bl-button>
</bl-dialog>`;

const stickyCode = `<bl-dialog caption="Long Content Dialog" sticky-footer>
  <p>Lots of content here...</p>
  <bl-button slot="primary-action">Save</bl-button>
</bl-dialog>`;

const customWidthCode = `<!-- Use CSS variable to customize width -->
<bl-dialog style="--bl-dialog-width: 600px">
  ...
</bl-dialog>`;

const publicFunctionsCode = `// Open a dialog
document.querySelector('bl-dialog').open();

// Close a dialog
document.querySelector('bl-dialog').close();`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Dialog component is used to display important information to users or get their input. It
        creates a modal overlay that focuses user attention on the content.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Usage Guidelines
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Use dialogs sparingly - they interrupt user flow</li>
        <li>Always provide a clear way to close the dialog</li>
        <li>Keep dialog content focused and concise</li>
        <li>Use appropriate action button colors (danger for destructive actions)</li>
        <li>Primary action should be on the right, secondary on the left</li>
      </ul>
    </div>

    <!-- Basic Dialog -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Dialog</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        A simple dialog with a title, content, and single action button.
      </p>
    </div>

    <DemoSection title="Basic Dialog" :code="basicCode">
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
    </DemoSection>

    <!-- Confirm Dialog -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Confirmation Dialog
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use confirmation dialogs for destructive actions. Include both cancel and confirm buttons.
        Use <code>kind="danger"</code> for destructive actions.
      </p>
    </div>

    <DemoSection title="Confirmation Dialog" :code="confirmCode">
      <bl-button kind="danger" @bl-click="confirmDialogOpen = true">Delete Item</bl-button>

      <bl-dialog
        :open="confirmDialogOpen"
        caption="Confirm Delete"
        @bl-dialog-close="confirmDialogOpen = false"
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        <bl-button
          slot="secondary-action"
          variant="secondary"
          @bl-click="confirmDialogOpen = false"
        >
          Cancel
        </bl-button>
        <bl-button slot="primary-action" kind="danger" @bl-click="confirmDialogOpen = false">
          Delete
        </bl-button>
      </bl-dialog>
    </DemoSection>

    <!-- Form Dialog -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Form Dialog</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Dialogs can contain forms for user input. Use <code>slot="primary-action"</code> and
        <code>slot="secondary-action"</code> for action buttons.
      </p>
    </div>

    <DemoSection title="Form Dialog" :code="formCode">
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
        <bl-button slot="secondary-action" variant="secondary" @bl-click="formDialogOpen = false">
          Cancel
        </bl-button>
        <bl-button slot="primary-action" @bl-click="formDialogOpen = false">Save</bl-button>
      </bl-dialog>
    </DemoSection>

    <!-- Sticky Footer -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Sticky Footer
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        For dialogs with long content, use <code>sticky-footer</code> attribute to keep action
        buttons visible while scrolling.
      </p>
    </div>

    <DemoSection title="Sticky Footer" :code="stickyCode">
      <bl-button variant="tertiary" @bl-click="stickyDialogOpen = true">
        Open Long Dialog
      </bl-button>

      <bl-dialog
        :open="stickyDialogOpen"
        caption="Terms and Conditions"
        sticky-footer
        @bl-dialog-close="stickyDialogOpen = false"
      >
        <div class="space-y-4">
          <p v-for="i in 10" :key="i">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris.
          </p>
        </div>
        <bl-button slot="secondary-action" variant="secondary" @bl-click="stickyDialogOpen = false">
          Decline
        </bl-button>
        <bl-button slot="primary-action" @bl-click="stickyDialogOpen = false">Accept</bl-button>
      </bl-dialog>
    </DemoSection>

    <!-- Dialog Sizes -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Custom Width
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use <code>--bl-dialog-width</code> CSS variable to customize dialog width.
      </p>
    </div>

    <DemoSection title="Dialog with Custom Width" :code="customWidthCode">
      <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg">
        <code class="text-sm text-neutral-darkest dark:text-neutral-light">
          &lt;bl-dialog style="--bl-dialog-width: 600px"&gt;...&lt;/bl-dialog&gt;
        </code>
      </div>
    </DemoSection>

    <!-- Public Functions -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Public Functions
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Dialog component provides <code>open()</code> and <code>close()</code> methods to
        programmatically control the dialog.
      </p>
    </div>

    <DemoSection title="Public Functions" :code="publicFunctionsCode">
      <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg">
        <code class="text-sm text-neutral-darkest dark:text-neutral-light">
          document.querySelector('bl-dialog').open();<br />
          document.querySelector('bl-dialog').close();
        </code>
      </div>
    </DemoSection>
  </div>
</template>
