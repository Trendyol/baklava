<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

const defaultDrawerOpen = ref(false);
const captionDrawerOpen = ref(false);
const externalLinkDrawerOpen = ref(false);
const customWidthDrawerOpen = ref(false);
const rtlDrawerOpen = ref(false);

const basicCode = `<bl-button @bl-click="drawerOpen = true">Open Drawer</bl-button>

<bl-drawer
  :open="drawerOpen"
  @bl-drawer-close="drawerOpen = false"
>
  <div class="p-4">
    <p>Drawer content goes here.</p>
  </div>
</bl-drawer>`;

const captionCode = `<bl-drawer
  :open="drawerOpen"
  caption="Settings"
  @bl-drawer-close="drawerOpen = false"
>
  <div class="p-4">
    <p>Drawer with caption.</p>
  </div>
</bl-drawer>`;

const externalLinkCode = `<bl-drawer
  :open="drawerOpen"
  caption="Product Details"
  external-link="https://example.com"
  @bl-drawer-close="drawerOpen = false"
>
  <div class="p-4">
    <p>Drawer with external link in header.</p>
  </div>
</bl-drawer>`;

const customWidthCode = `<bl-drawer
  :open="drawerOpen"
  caption="Wide Drawer"
  width="800px"
  @bl-drawer-close="drawerOpen = false"
>
  <div class="p-4">
    <p>This drawer has a custom width of 800px.</p>
  </div>
</bl-drawer>`;

const rtlCode = `<!-- LTR - Drawer slides from right -->
<bl-drawer :open="ltrDrawerOpen" caption="Settings">
  <div class="p-4"><p>LTR drawer content.</p></div>
</bl-drawer>

<!-- RTL - Drawer slides from left -->
<div dir="rtl">
  <bl-drawer :open="rtlDrawerOpen" caption="الإعدادات">
    <div class="p-4"><p>RTL drawer content.</p></div>
  </bl-drawer>
</div>`;

const formCode = `<bl-drawer :open="formDrawerOpen" caption="Edit Profile">
  <div class="p-4 space-y-4">
    <bl-input label="Name" placeholder="Enter name"></bl-input>
    <bl-input label="Email" placeholder="Enter email"></bl-input>
    <bl-textarea label="Bio" placeholder="Tell us about yourself"></bl-textarea>
    <div class="flex gap-2 pt-4">
      <bl-button>Save</bl-button>
      <bl-button variant="secondary">Cancel</bl-button>
    </div>
  </div>
</bl-drawer>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        A drawer presents context-specific information and/or actions without leaving the current
        page. It slides in from the side of the screen.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Design Rules
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Title and external link are displayed on header section. Both are optional.</li>
        <li>Close button always displayed on header section.</li>
        <li>By default, Drawer cannot be closed by clicking outside.</li>
        <li>Drawer appears on the right side with full height expanded.</li>
        <li>Title can be multiline automatically if it does not fit one line.</li>
        <li>When drawer does not fit in its fixed size, it switches to mobile view.</li>
        <li>Only one drawer can display at the same time.</li>
        <li>RTL mode: drawer slides from the left instead of right.</li>
      </ul>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The drawer component requires an <code>open</code> attribute to control visibility. Listen
        to <code>bl-drawer-close</code> event to handle closing.
      </p>
    </div>

    <DemoSection title="Default Drawer" :code="basicCode">
      <bl-button @bl-click="defaultDrawerOpen = true">Open Drawer</bl-button>

      <bl-drawer :open="defaultDrawerOpen" @bl-drawer-close="defaultDrawerOpen = false">
        <div class="p-4">
          <p class="text-neutral-darker dark:text-neutral-light mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s.
          </p>
          <p class="text-neutral-darker dark:text-neutral-light mb-4">
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem
            Ipsum passages, and more recently with desktop publishing software.
          </p>
          <bl-button @bl-click="defaultDrawerOpen = false">Close</bl-button>
        </div>
      </bl-drawer>
    </DemoSection>

    <!-- With Caption -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">With Caption</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use the <code>caption</code> attribute to add a title to the drawer header.
      </p>
    </div>

    <DemoSection title="With Caption" :code="captionCode">
      <bl-button @bl-click="captionDrawerOpen = true">Open With Caption</bl-button>

      <bl-drawer
        :open="captionDrawerOpen"
        caption="Settings"
        @bl-drawer-close="captionDrawerOpen = false"
      >
        <div class="p-4">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-neutral-darker dark:text-neutral-light">Dark Mode</span>
              <bl-switch></bl-switch>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-neutral-darker dark:text-neutral-light">Notifications</span>
              <bl-switch checked></bl-switch>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-neutral-darker dark:text-neutral-light">Auto-save</span>
              <bl-switch checked></bl-switch>
            </div>
          </div>
        </div>
      </bl-drawer>
    </DemoSection>

    <!-- With External Link -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        With External Link
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use the <code>external-link</code> attribute to add an external link icon in the header
        that opens a new tab.
      </p>
    </div>

    <DemoSection title="With External Link" :code="externalLinkCode">
      <bl-button @bl-click="externalLinkDrawerOpen = true">Open With External Link</bl-button>

      <bl-drawer
        :open="externalLinkDrawerOpen"
        caption="Product Details"
        external-link="https://example.com"
        @bl-drawer-close="externalLinkDrawerOpen = false"
      >
        <div class="p-4">
          <h4 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
            Product Name
          </h4>
          <p class="text-neutral-dark dark:text-neutral-light mb-4">
            Click the external link icon in the header to open in a new tab.
          </p>
          <bl-badge>$99.99</bl-badge>
        </div>
      </bl-drawer>
    </DemoSection>

    <!-- Custom Width -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Custom Width</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use the <code>width</code> attribute to set a custom drawer width.
      </p>
    </div>

    <DemoSection title="Custom Width" :code="customWidthCode">
      <bl-button @bl-click="customWidthDrawerOpen = true">Open Wide Drawer (800px)</bl-button>

      <bl-drawer
        :open="customWidthDrawerOpen"
        caption="Wide Drawer"
        width="800px"
        @bl-drawer-close="customWidthDrawerOpen = false"
      >
        <div class="p-4">
          <p class="text-neutral-darker dark:text-neutral-light mb-4">
            This drawer has a custom width of 800px, which is wider than the default.
          </p>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded">Column 1</div>
            <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded">Column 2</div>
          </div>
        </div>
      </bl-drawer>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The drawer component supports RTL (Right-to-Left) text direction. When in RTL mode, the
        drawer will slide in from the <strong>left</strong> side instead of the right.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex gap-4" dir="rtl">
        <bl-button @bl-click="rtlDrawerOpen = true">فتح القائمة (RTL)</bl-button>

        <bl-drawer
          :open="rtlDrawerOpen"
          caption="الإعدادات"
          @bl-drawer-close="rtlDrawerOpen = false"
        >
          <div class="p-4">
            <h4 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
              لوحة الإعدادات
            </h4>
            <p class="text-neutral-dark dark:text-neutral-light mb-4">
              هذا مثال لمحتوى القائمة في وضع RTL. القائمة تظهر من الجهة اليسرى.
            </p>
            <bl-button @bl-click="rtlDrawerOpen = false">إغلاق</bl-button>
          </div>
        </bl-drawer>
      </div>
    </DemoSection>

    <!-- With Form -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Drawer with Form
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Drawers are ideal for containing forms for creating or editing content without leaving the
        current page.
      </p>
    </div>

    <DemoSection title="Form Example" :code="formCode">
      <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded">
        <p class="text-sm text-neutral-dark dark:text-neutral-light">
          Drawers can contain forms with inputs, textareas, and action buttons. This is useful for
          editing profiles, adding new items, or configuring settings.
        </p>
      </div>
    </DemoSection>
  </div>
</template>
