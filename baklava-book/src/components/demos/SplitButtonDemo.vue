<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";

const basicCode = `<bl-split-button label="Save">
  <bl-dropdown-item>Save as Draft</bl-dropdown-item>
  <bl-dropdown-item>Save and Close</bl-dropdown-item>
  <bl-dropdown-item>Save and New</bl-dropdown-item>
</bl-split-button>`;

const variantsCode = `<!-- Primary (default) -->
<bl-split-button label="Primary" variant="primary">
  <bl-dropdown-item>Option 1</bl-dropdown-item>
  <bl-dropdown-item>Option 2</bl-dropdown-item>
</bl-split-button>

<!-- Secondary -->
<bl-split-button label="Secondary" variant="secondary">
  <bl-dropdown-item>Option 1</bl-dropdown-item>
  <bl-dropdown-item>Option 2</bl-dropdown-item>
</bl-split-button>`;

const kindsCode = `<bl-split-button label="Default" kind="default">...</bl-split-button>
<bl-split-button label="Neutral" kind="neutral">...</bl-split-button>
<bl-split-button label="Success" kind="success">...</bl-split-button>
<bl-split-button label="Danger" kind="danger">...</bl-split-button>`;

const sizesCode = `<bl-split-button label="Large" size="large">...</bl-split-button>
<bl-split-button label="Medium" size="medium">...</bl-split-button>
<bl-split-button label="Small" size="small">...</bl-split-button>`;

const iconCode = `<bl-split-button label="Download" icon="download">
  <bl-dropdown-item icon="document">Download as PDF</bl-dropdown-item>
  <bl-dropdown-item icon="file">Download as Excel</bl-dropdown-item>
  <bl-dropdown-item icon="code">Download as CSV</bl-dropdown-item>
</bl-split-button>`;

const groupsCode = `<bl-split-button label="Share">
  <bl-dropdown-group caption="Share via">
    <bl-dropdown-item icon="email">Email</bl-dropdown-item>
    <bl-dropdown-item icon="link">Copy Link</bl-dropdown-item>
  </bl-dropdown-group>
  <bl-dropdown-item icon="download">Download</bl-dropdown-item>
</bl-split-button>`;

const disabledCode = `<!-- Both buttons disabled -->
<bl-split-button label="Fully Disabled" disabled dropdown-disabled>
  <bl-dropdown-item>Option</bl-dropdown-item>
</bl-split-button>`;

const disabledMainCode = `<!-- Only main button disabled -->
<bl-split-button label="Main Disabled" disabled>
  <bl-dropdown-item>Option 1</bl-dropdown-item>
  <bl-dropdown-item>Option 2</bl-dropdown-item>
</bl-split-button>`;

const disabledDropdownCode = `<!-- Only dropdown disabled -->
<bl-split-button label="Dropdown Disabled" dropdown-disabled>
  <bl-dropdown-item>Option 1</bl-dropdown-item>
</bl-split-button>`;

const blockLevelCode = `<!-- Split button stretches to fill container -->
<bl-split-button label="Block Level" icon="info" style="width: 100%">
  <bl-dropdown-item>Option 1</bl-dropdown-item>
  <bl-dropdown-item>Option 2</bl-dropdown-item>
</bl-split-button>`;

const rtlCode = `<div dir="rtl">
  <bl-split-button label="مشاركة">
    <bl-dropdown-group caption="خيارات المشاركة">
      <bl-dropdown-item icon="email">مشاركة عبر البريد</bl-dropdown-item>
      <bl-dropdown-item icon="link">نسخ الرابط</bl-dropdown-item>
    </bl-dropdown-group>
    <bl-dropdown-item icon="download">تحميل</bl-dropdown-item>
  </bl-split-button>
</div>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Split Button component is very similar to Dropdown Component with a key difference: Split
        Button is a Dropdown that one action is put forward as the main action. The main button
        executes the primary action, while the dropdown arrow reveals additional options.
      </p>

      <bl-alert variant="warning" icon class="my-4">
        Inline styles in examples are only for <strong>demo purposes</strong>. Use regular CSS
        classes or tag selectors to set styles.
      </bl-alert>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Key Features
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Main button for primary action + dropdown for additional options</li>
        <li>Same variants and kinds as regular buttons</li>
        <li>Supports icons on the main button</li>
        <li>
          Can disable main button and dropdown separately (<code>disabled</code>,
          <code>dropdown-disabled</code>)
        </li>
        <li>Auto-stretches to fill available width when needed</li>
      </ul>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use the <code>label</code> attribute for the main button text. Add
        <code>bl-dropdown-item</code> elements for dropdown options.
      </p>
    </div>

    <DemoSection title="Basic Split Button" :code="basicCode">
      <bl-split-button label="Save">
        <bl-dropdown-item>Save as Draft</bl-dropdown-item>
        <bl-dropdown-item>Save and Close</bl-dropdown-item>
        <bl-dropdown-item>Save and New</bl-dropdown-item>
      </bl-split-button>
    </DemoSection>

    <!-- Variants -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Split Button Variants
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Split Button has the same variants as Button: <code>primary</code> (default) and
        <code>secondary</code>. Every variant represents the importance of the actions inside it.
      </p>
    </div>

    <DemoSection title="Variants" :code="variantsCode">
      <div class="flex flex-wrap gap-4">
        <bl-split-button label="Primary" variant="primary">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
          </bl-dropdown-group>
          <bl-dropdown-item>Action 3</bl-dropdown-item>
        </bl-split-button>
        <bl-split-button label="Secondary" variant="secondary">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
          </bl-dropdown-group>
          <bl-dropdown-item>Action 3</bl-dropdown-item>
        </bl-split-button>
      </div>
    </DemoSection>

    <!-- Kinds -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Split Button Kinds
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Split Button has the same kinds as Button: <code>default</code>, <code>neutral</code>,
        <code>success</code>, and <code>danger</code>. Every kind indicates a state of the split
        buttons.
      </p>
    </div>

    <DemoSection title="Kinds" :code="kindsCode">
      <div class="flex flex-wrap gap-4">
        <bl-split-button label="Default" kind="default">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
          </bl-dropdown-group>
        </bl-split-button>
        <bl-split-button label="Neutral" kind="neutral">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
          </bl-dropdown-group>
        </bl-split-button>
        <bl-split-button label="Success" kind="success">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Approve</bl-dropdown-item>
            <bl-dropdown-item>Approve All</bl-dropdown-item>
          </bl-dropdown-group>
        </bl-split-button>
        <bl-split-button label="Danger" kind="danger">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Delete</bl-dropdown-item>
            <bl-dropdown-item>Delete All</bl-dropdown-item>
          </bl-dropdown-group>
        </bl-split-button>
      </div>
    </DemoSection>

    <!-- Sizes -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Split Button Sizes
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        We have 3 sizes of split buttons: <strong>Large</strong>, <strong>Medium</strong>, and
        <strong>Small</strong>. Default size is <strong>Medium</strong>.
      </p>
    </div>

    <DemoSection title="Sizes" :code="sizesCode">
      <div class="flex flex-wrap items-center gap-4">
        <bl-split-button label="Large" size="large">
          <bl-dropdown-item>Option 1</bl-dropdown-item>
          <bl-dropdown-item>Option 2</bl-dropdown-item>
        </bl-split-button>
        <bl-split-button label="Medium" size="medium">
          <bl-dropdown-item>Option 1</bl-dropdown-item>
          <bl-dropdown-item>Option 2</bl-dropdown-item>
        </bl-split-button>
        <bl-split-button label="Small" size="small">
          <bl-dropdown-item>Option 1</bl-dropdown-item>
          <bl-dropdown-item>Option 2</bl-dropdown-item>
        </bl-split-button>
      </div>
    </DemoSection>

    <!-- With Icon -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Split Button Icons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You might want to add icons to your button. You can add icons to the main button of split
        button using the <code>icon</code> attribute.
      </p>
    </div>

    <DemoSection title="With Icons" :code="iconCode">
      <div class="flex flex-wrap gap-4">
        <bl-split-button label="Download" icon="download">
          <bl-dropdown-item icon="document">Download as PDF</bl-dropdown-item>
          <bl-dropdown-item icon="file">Download as Excel</bl-dropdown-item>
          <bl-dropdown-item icon="code">Download as CSV</bl-dropdown-item>
        </bl-split-button>
        <bl-split-button label="Share" icon="share" variant="secondary">
          <bl-dropdown-item icon="email">Email</bl-dropdown-item>
          <bl-dropdown-item icon="link">Copy Link</bl-dropdown-item>
        </bl-split-button>
        <bl-split-button label="Save" icon="save" kind="success">
          <bl-dropdown-item>Save as Draft</bl-dropdown-item>
          <bl-dropdown-item>Publish</bl-dropdown-item>
        </bl-split-button>
      </div>
    </DemoSection>

    <!-- With Groups -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Dropdown Groups
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use <code>bl-dropdown-group</code> to organize related items in the dropdown menu.
      </p>
    </div>

    <DemoSection title="With Groups" :code="groupsCode">
      <bl-split-button label="Share" icon="share">
        <bl-dropdown-group caption="Share via">
          <bl-dropdown-item icon="email">Email</bl-dropdown-item>
          <bl-dropdown-item icon="link">Copy Link</bl-dropdown-item>
        </bl-dropdown-group>
        <bl-dropdown-item icon="download">Download</bl-dropdown-item>
        <bl-dropdown-group caption="Social Media">
          <bl-dropdown-item icon="twitter">Twitter</bl-dropdown-item>
          <bl-dropdown-item icon="facebook">Facebook</bl-dropdown-item>
        </bl-dropdown-group>
      </bl-split-button>
    </DemoSection>

    <!-- Disabling -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Disabling Split Buttons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can disable the entire split button, or disable just the main button or just the
        dropdown separately.
      </p>
    </div>

    <DemoSection title="Fully Disabled" :code="disabledCode">
      <div class="flex flex-wrap gap-4">
        <bl-split-button label="Fully Disabled" disabled dropdown-disabled>
          <bl-dropdown-item>Option</bl-dropdown-item>
        </bl-split-button>
        <bl-split-button label="Fully Disabled" variant="secondary" disabled dropdown-disabled>
          <bl-dropdown-item>Option</bl-dropdown-item>
        </bl-split-button>
      </div>
    </DemoSection>

    <DemoSection title="Main Button Disabled" :code="disabledMainCode">
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Only the main button is disabled. The dropdown is still accessible.
      </p>
      <div class="flex flex-wrap gap-4">
        <bl-split-button label="Main Disabled" disabled>
          <bl-dropdown-item>Option 1</bl-dropdown-item>
          <bl-dropdown-item>Option 2</bl-dropdown-item>
        </bl-split-button>
        <bl-split-button label="Main Disabled" variant="secondary" disabled>
          <bl-dropdown-item>Option 1</bl-dropdown-item>
          <bl-dropdown-item>Option 2</bl-dropdown-item>
        </bl-split-button>
      </div>
    </DemoSection>

    <DemoSection title="Dropdown Disabled" :code="disabledDropdownCode">
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Only the dropdown is disabled. The main button is still clickable.
      </p>
      <div class="flex flex-wrap gap-4">
        <bl-split-button label="Dropdown Disabled" dropdown-disabled>
          <bl-dropdown-item>Option 1</bl-dropdown-item>
        </bl-split-button>
        <bl-split-button label="Dropdown Disabled" variant="secondary" dropdown-disabled>
          <bl-dropdown-item>Option 1</bl-dropdown-item>
        </bl-split-button>
      </div>
    </DemoSection>

    <!-- Block Level -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Block Level Buttons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The split button is designed to automatically adjust its size to fit the space it's given.
        If there's enough space, the main button will stretch out to use that space.
      </p>
    </div>

    <DemoSection title="Block Level" :code="blockLevelCode">
      <div class="w-full max-w-md">
        <bl-split-button label="Block Level Button" icon="info" style="width: 100%">
          <bl-dropdown-item>Option 1</bl-dropdown-item>
          <bl-dropdown-item>Option 2</bl-dropdown-item>
          <bl-dropdown-item>Option 3</bl-dropdown-item>
        </bl-split-button>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The split button component supports RTL (Right-to-Left) text direction. Icons and dropdown
        are automatically mirrored in RTL mode.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex flex-col md:flex-row gap-8">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <div class="flex flex-wrap gap-4">
            <bl-split-button label="Share" icon="share">
              <bl-dropdown-group caption="Share via">
                <bl-dropdown-item icon="email">Email</bl-dropdown-item>
                <bl-dropdown-item icon="link">Copy Link</bl-dropdown-item>
              </bl-dropdown-group>
              <bl-dropdown-item icon="download">Download</bl-dropdown-item>
            </bl-split-button>
            <bl-split-button label="Download" icon="download" variant="secondary">
              <bl-dropdown-item icon="document">PDF</bl-dropdown-item>
              <bl-dropdown-item icon="file">Excel</bl-dropdown-item>
            </bl-split-button>
          </div>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <div class="flex flex-wrap gap-4">
            <bl-split-button label="مشاركة" icon="share">
              <bl-dropdown-group caption="خيارات المشاركة">
                <bl-dropdown-item icon="email">مشاركة عبر البريد</bl-dropdown-item>
                <bl-dropdown-item icon="link">نسخ الرابط</bl-dropdown-item>
              </bl-dropdown-group>
              <bl-dropdown-item icon="download">تحميل</bl-dropdown-item>
            </bl-split-button>
            <bl-split-button label="تحميل" icon="download" variant="secondary">
              <bl-dropdown-item icon="document">PDF</bl-dropdown-item>
              <bl-dropdown-item icon="file">Excel</bl-dropdown-item>
            </bl-split-button>
          </div>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
