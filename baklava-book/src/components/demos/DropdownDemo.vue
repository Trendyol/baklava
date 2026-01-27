<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";

const basicCode = `<!-- Using label attribute -->
<bl-dropdown label="Dropdown Button">
  <bl-dropdown-item>Action 1</bl-dropdown-item>
  <bl-dropdown-item>Action 2</bl-dropdown-item>
  <bl-dropdown-item>Action 3</bl-dropdown-item>
</bl-dropdown>

<!-- Using slot for custom trigger -->
<bl-dropdown>
  <bl-button slot="dropdown-trigger">Custom Trigger</bl-button>
  <bl-dropdown-item>Action 1</bl-dropdown-item>
  <bl-dropdown-item>Action 2</bl-dropdown-item>
</bl-dropdown>`;

const variantsCode = `<!-- Primary (default) -->
<bl-dropdown label="Primary" variant="primary">
  <bl-dropdown-item>Action 1</bl-dropdown-item>
  <bl-dropdown-item>Action 2</bl-dropdown-item>
</bl-dropdown>

<!-- Secondary -->
<bl-dropdown label="Secondary" variant="secondary">
  <bl-dropdown-item>Action 1</bl-dropdown-item>
  <bl-dropdown-item>Action 2</bl-dropdown-item>
</bl-dropdown>

<!-- Tertiary -->
<bl-dropdown label="Tertiary" variant="tertiary">
  <bl-dropdown-item>Action 1</bl-dropdown-item>
  <bl-dropdown-item>Action 2</bl-dropdown-item>
</bl-dropdown>`;

const kindsCode = `<!-- Default -->
<bl-dropdown label="Default" kind="default">...</bl-dropdown>

<!-- Neutral -->
<bl-dropdown label="Neutral" kind="neutral">...</bl-dropdown>

<!-- Success -->
<bl-dropdown label="Success" kind="success">...</bl-dropdown>

<!-- Danger -->
<bl-dropdown label="Danger" kind="danger">...</bl-dropdown>`;

const sizesCode = `<!-- Large -->
<bl-dropdown label="Large" size="large">...</bl-dropdown>

<!-- Medium (default) -->
<bl-dropdown label="Medium" size="medium">...</bl-dropdown>

<!-- Small -->
<bl-dropdown label="Small" size="small">...</bl-dropdown>`;

const iconsCode = `<!-- With icon attribute -->
<bl-dropdown label="Settings" icon="settings">
  <bl-dropdown-item icon="account">Profile</bl-dropdown-item>
  <bl-dropdown-item icon="settings">Preferences</bl-dropdown-item>
  <bl-dropdown-item icon="logout">Logout</bl-dropdown-item>
</bl-dropdown>

<!-- Different icons -->
<bl-dropdown label="Add Item" icon="plus_fill" variant="secondary">
  <bl-dropdown-item icon="document">Document</bl-dropdown-item>
  <bl-dropdown-item icon="folder">Folder</bl-dropdown-item>
</bl-dropdown>`;

const groupsCode = `<bl-dropdown label="Organize">
  <bl-dropdown-group caption="Actions">
    <bl-dropdown-item icon="edit">Edit</bl-dropdown-item>
    <bl-dropdown-item icon="copy">Duplicate</bl-dropdown-item>
  </bl-dropdown-group>
  <bl-dropdown-item icon="info">Action 3</bl-dropdown-item>
  <bl-dropdown-item>Action 4</bl-dropdown-item>
  <bl-dropdown-group caption="Danger Zone">
    <bl-dropdown-item icon="heart">Favorites</bl-dropdown-item>
    <bl-dropdown-item icon="archive">Archive</bl-dropdown-item>
  </bl-dropdown-group>
</bl-dropdown>`;

const disabledDropdownCode = `<!-- Disabled Primary & Secondary -->
<bl-dropdown label="Disabled" disabled>
  <bl-dropdown-item>Action 1</bl-dropdown-item>
</bl-dropdown>

<bl-dropdown label="Disabled" variant="secondary" disabled>
  <bl-dropdown-item>Action 1</bl-dropdown-item>
</bl-dropdown>

<!-- Disabled Tertiary (keeps transparent background) -->
<bl-dropdown label="Disabled" variant="tertiary" disabled>
  <bl-dropdown-item>Action 1</bl-dropdown-item>
</bl-dropdown>`;

const disabledItemsCode = `<bl-dropdown label="Options">
  <bl-dropdown-group caption="Available">
    <bl-dropdown-item disabled>Disabled Item</bl-dropdown-item>
    <bl-dropdown-item>Active Item</bl-dropdown-item>
  </bl-dropdown-group>
  <bl-dropdown-item icon="info" disabled>Disabled with Icon</bl-dropdown-item>
  <bl-dropdown-item>Another Active</bl-dropdown-item>
</bl-dropdown>`;

const longTextCode = `<!-- Popover auto-widens for long text -->
<bl-dropdown label="Dropdown Button">
  <bl-dropdown-group caption="Actions">
    <bl-dropdown-item>Action with very long text that doesn't fit</bl-dropdown-item>
    <bl-dropdown-item>Short</bl-dropdown-item>
  </bl-dropdown-group>
</bl-dropdown>`;

const iconTriggerCode = `<!-- Icon-only trigger -->
<bl-dropdown>
  <bl-button
    slot="dropdown-trigger"
    icon="more_vertical"
    variant="tertiary"
    label="More"
  ></bl-button>
  <bl-dropdown-item icon="edit">Edit</bl-dropdown-item>
  <bl-dropdown-item icon="share">Share</bl-dropdown-item>
  <bl-dropdown-item icon="delete">Delete</bl-dropdown-item>
</bl-dropdown>`;

const placementCode = `<bl-dropdown label="Bottom Start" placement="bottom-start">
  <bl-dropdown-item>Option 1</bl-dropdown-item>
  <bl-dropdown-item>Option 2</bl-dropdown-item>
</bl-dropdown>

<bl-dropdown label="Bottom End" placement="bottom-end">
  <bl-dropdown-item>Option 1</bl-dropdown-item>
  <bl-dropdown-item>Option 2</bl-dropdown-item>
</bl-dropdown>

<bl-dropdown label="Top Start" placement="top-start">
  <bl-dropdown-item>Option 1</bl-dropdown-item>
</bl-dropdown>`;

const rtlCode = `<!-- LTR (Left-to-Right) -->
<bl-dropdown label="Settings">
  <bl-dropdown-group caption="Account">
    <bl-dropdown-item icon="account">Profile</bl-dropdown-item>
    <bl-dropdown-item icon="settings">Preferences</bl-dropdown-item>
  </bl-dropdown-group>
  <bl-dropdown-item>Logout</bl-dropdown-item>
</bl-dropdown>

<!-- RTL (Right-to-Left) -->
<div dir="rtl">
  <bl-dropdown label="الإعدادات">
    <bl-dropdown-group caption="الحساب">
      <bl-dropdown-item icon="account">الملف الشخصي</bl-dropdown-item>
      <bl-dropdown-item icon="settings">التفضيلات</bl-dropdown-item>
    </bl-dropdown-group>
    <bl-dropdown-item>تسجيل الخروج</bl-dropdown-item>
  </bl-dropdown>
</div>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Dropdown Button is used to display a list of actions. When clicked, it reveals a menu of
        options organized in groups or as individual items.
      </p>

      <bl-alert variant="warning" icon class="my-4">
        Inline styles in examples are only for <strong>demo purposes</strong>. Use regular CSS
        classes or tag selectors to set styles.
      </bl-alert>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Usage Guidelines
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Use dropdowns for a list of actions or navigation options</li>
        <li>Group related items together using <code>bl-dropdown-group</code></li>
        <li>Add icons to items for better visual recognition</li>
        <li>Keep the number of items reasonable (5-10 items max)</li>
        <li>
          Use <code>label</code> attribute for simple trigger buttons, or
          <code>slot="dropdown-trigger"</code> for custom triggers
        </li>
      </ul>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use the <code>label</code> attribute for a quick setup, or use
        <code>slot="dropdown-trigger"</code> for custom trigger elements.
      </p>
    </div>

    <DemoSection title="Basic Dropdown" :code="basicCode">
      <div class="flex flex-wrap gap-4">
        <bl-dropdown label="Dropdown Button">
          <bl-dropdown-item>Action 1</bl-dropdown-item>
          <bl-dropdown-item>Action 2</bl-dropdown-item>
          <bl-dropdown-item>Action 3</bl-dropdown-item>
        </bl-dropdown>

        <bl-dropdown>
          <bl-button slot="dropdown-trigger" variant="secondary">Custom Trigger</bl-button>
          <bl-dropdown-item>Action 1</bl-dropdown-item>
          <bl-dropdown-item>Action 2</bl-dropdown-item>
        </bl-dropdown>
      </div>
    </DemoSection>

    <!-- Variants -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Dropdown Button Variants
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Dropdown Button has the same variants as Button:
        <strong>Primary</strong>, <strong>Secondary</strong>, and <strong>Tertiary</strong>. Every
        variant represents the importance of the actions inside it.
      </p>
    </div>

    <DemoSection title="Variants" :code="variantsCode">
      <div class="flex flex-wrap gap-4">
        <bl-dropdown label="Primary" variant="primary">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
          </bl-dropdown-group>
          <bl-dropdown-item>Action 3</bl-dropdown-item>
        </bl-dropdown>

        <bl-dropdown label="Secondary" variant="secondary">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
          </bl-dropdown-group>
          <bl-dropdown-item>Action 3</bl-dropdown-item>
        </bl-dropdown>

        <bl-dropdown label="Tertiary" variant="tertiary">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
          </bl-dropdown-group>
          <bl-dropdown-item>Action 3</bl-dropdown-item>
        </bl-dropdown>
      </div>
    </DemoSection>

    <!-- Kinds -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Dropdown Button Kinds
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Dropdown Button has the same kinds as Button. Every kind indicates a state of the dropdown
        button: <code>default</code>, <code>neutral</code>, <code>success</code>, and
        <code>danger</code>.
      </p>
    </div>

    <DemoSection title="Kinds" :code="kindsCode">
      <div class="flex flex-wrap gap-4">
        <bl-dropdown label="Default" kind="default">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
          </bl-dropdown-group>
        </bl-dropdown>

        <bl-dropdown label="Neutral" kind="neutral">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
          </bl-dropdown-group>
        </bl-dropdown>

        <bl-dropdown label="Success" kind="success">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
          </bl-dropdown-group>
        </bl-dropdown>

        <bl-dropdown label="Danger" kind="danger">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
          </bl-dropdown-group>
        </bl-dropdown>
      </div>
    </DemoSection>

    <!-- Sizes -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Dropdown Button Sizes
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        We have 3 sizes of dropdown buttons: <strong>Large</strong>, <strong>Medium</strong>, and
        <strong>Small</strong>. Default size is <strong>Medium</strong>.
      </p>
    </div>

    <DemoSection title="Sizes" :code="sizesCode">
      <div class="flex flex-wrap items-center gap-4">
        <bl-dropdown label="Large" size="large">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
          </bl-dropdown-group>
        </bl-dropdown>

        <bl-dropdown label="Medium" size="medium">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
          </bl-dropdown-group>
        </bl-dropdown>

        <bl-dropdown label="Small" size="small">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
          </bl-dropdown-group>
        </bl-dropdown>
      </div>
    </DemoSection>

    <!-- With Icons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Dropdown Button Icons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can add icons to your dropdown buttons using the <code>icon</code> attribute. The icon
        will be displayed on the left side of the button label.
      </p>
    </div>

    <DemoSection title="With Icons" :code="iconsCode">
      <div class="flex flex-wrap gap-4">
        <bl-dropdown label="Settings" icon="settings" variant="primary">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item icon="account">Profile</bl-dropdown-item>
            <bl-dropdown-item icon="settings">Preferences</bl-dropdown-item>
          </bl-dropdown-group>
          <bl-dropdown-item icon="logout">Logout</bl-dropdown-item>
        </bl-dropdown>

        <bl-dropdown label="Settings" icon="settings" variant="secondary">
          <bl-dropdown-group caption="Caption">
            <bl-dropdown-item icon="account">Profile</bl-dropdown-item>
            <bl-dropdown-item icon="settings">Preferences</bl-dropdown-item>
          </bl-dropdown-group>
          <bl-dropdown-item icon="logout">Logout</bl-dropdown-item>
        </bl-dropdown>

        <bl-dropdown label="Add Item" icon="plus_fill" variant="tertiary">
          <bl-dropdown-item icon="document">Document</bl-dropdown-item>
          <bl-dropdown-item icon="folder">Folder</bl-dropdown-item>
          <bl-dropdown-item icon="image">Image</bl-dropdown-item>
        </bl-dropdown>
      </div>
    </DemoSection>

    <!-- With Groups -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Dropdown Groups
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use <code>bl-dropdown-group</code> to organize related items. Add a <code>caption</code> to
        label each group. You can mix grouped and ungrouped items.
      </p>
    </div>

    <DemoSection title="With Groups" :code="groupsCode">
      <bl-dropdown label="Organize">
        <bl-dropdown-group caption="Actions">
          <bl-dropdown-item icon="edit">Edit</bl-dropdown-item>
          <bl-dropdown-item icon="copy">Duplicate</bl-dropdown-item>
        </bl-dropdown-group>
        <bl-dropdown-item icon="info">Info</bl-dropdown-item>
        <bl-dropdown-item>Action 4</bl-dropdown-item>
        <bl-dropdown-group caption="Danger Zone">
          <bl-dropdown-item icon="heart">Favorites</bl-dropdown-item>
          <bl-dropdown-item icon="archive">Archive</bl-dropdown-item>
        </bl-dropdown-group>
      </bl-dropdown>
    </DemoSection>

    <!-- Disabling Dropdown Buttons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Disabling Dropdown Buttons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        We have 2 types of disabled dropdown buttons: Disable version of Primary and Secondary
        buttons is the same. Whereas Tertiary buttons keep their transparent backgrounds.
      </p>
    </div>

    <DemoSection title="Disabled Dropdown Buttons" :code="disabledDropdownCode">
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-4">
          <bl-dropdown label="Large Disabled" size="large" disabled>
            <bl-dropdown-item>Action 1</bl-dropdown-item>
          </bl-dropdown>
          <bl-dropdown label="Medium Disabled" size="medium" disabled>
            <bl-dropdown-item>Action 1</bl-dropdown-item>
          </bl-dropdown>
          <bl-dropdown label="Small Disabled" size="small" disabled>
            <bl-dropdown-item>Action 1</bl-dropdown-item>
          </bl-dropdown>
        </div>

        <p class="text-sm text-neutral-dark mt-4">
          Tertiary buttons keep their transparent backgrounds when disabled:
        </p>

        <div class="flex flex-wrap items-center gap-4">
          <bl-dropdown label="Large Disabled" variant="tertiary" size="large" disabled>
            <bl-dropdown-item>Action 1</bl-dropdown-item>
          </bl-dropdown>
          <bl-dropdown label="Medium Disabled" variant="tertiary" size="medium" disabled>
            <bl-dropdown-item>Action 1</bl-dropdown-item>
          </bl-dropdown>
          <bl-dropdown label="Small Disabled" variant="tertiary" size="small" disabled>
            <bl-dropdown-item>Action 1</bl-dropdown-item>
          </bl-dropdown>
        </div>
      </div>
    </DemoSection>

    <!-- Disabling Dropdown Items -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Disabling Dropdown Items
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can disable dropdown items by setting the <code>disabled</code> attribute on the
        <code>bl-dropdown-item</code> element.
      </p>
    </div>

    <DemoSection title="Disabled Items" :code="disabledItemsCode">
      <bl-dropdown label="Options">
        <bl-dropdown-group caption="Available">
          <bl-dropdown-item disabled>Disabled Item</bl-dropdown-item>
          <bl-dropdown-item>Active Item</bl-dropdown-item>
        </bl-dropdown-group>
        <bl-dropdown-item icon="info" disabled>Disabled with Icon</bl-dropdown-item>
        <bl-dropdown-item>Another Active</bl-dropdown-item>
      </bl-dropdown>
    </DemoSection>

    <!-- Automatic Left Align -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Automatic Width
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        If dropdown button has an action with a long text that can not fit in a single line, popover
        will be automatically widened to accommodate the content.
      </p>
    </div>

    <DemoSection title="Long Text" :code="longTextCode">
      <bl-dropdown label="Dropdown Button">
        <bl-dropdown-group caption="Actions">
          <bl-dropdown-item>Action with very long text that doesn't fit</bl-dropdown-item>
          <bl-dropdown-item>Short</bl-dropdown-item>
        </bl-dropdown-group>
        <bl-dropdown-item icon="info">Info</bl-dropdown-item>
      </bl-dropdown>
    </DemoSection>

    <!-- Icon Button Trigger -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Icon Button Trigger
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use an icon-only button as the dropdown trigger for compact layouts. Use
        <code>slot="dropdown-trigger"</code> with a custom button.
      </p>
    </div>

    <DemoSection title="Icon Button Trigger" :code="iconTriggerCode">
      <div class="flex gap-4">
        <bl-dropdown>
          <bl-button
            slot="dropdown-trigger"
            icon="more_vertical"
            variant="tertiary"
            label="More"
          ></bl-button>
          <bl-dropdown-item icon="edit">Edit</bl-dropdown-item>
          <bl-dropdown-item icon="share">Share</bl-dropdown-item>
          <bl-dropdown-item icon="delete">Delete</bl-dropdown-item>
        </bl-dropdown>

        <bl-dropdown>
          <bl-button
            slot="dropdown-trigger"
            icon="more_horizontal"
            variant="secondary"
            label="More"
          ></bl-button>
          <bl-dropdown-item icon="edit">Edit</bl-dropdown-item>
          <bl-dropdown-item icon="share">Share</bl-dropdown-item>
        </bl-dropdown>
      </div>
    </DemoSection>

    <!-- Placement -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Placement</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Control the dropdown menu position with the <code>placement</code> attribute. Available
        values: <code>bottom-start</code>, <code>bottom-end</code>, <code>top-start</code>,
        <code>top-end</code>.
      </p>
    </div>

    <DemoSection title="Placement" :code="placementCode">
      <div class="flex flex-wrap gap-4 py-8">
        <bl-dropdown label="Bottom Start" placement="bottom-start" variant="secondary">
          <bl-dropdown-item>Option 1</bl-dropdown-item>
          <bl-dropdown-item>Option 2</bl-dropdown-item>
        </bl-dropdown>
        <bl-dropdown label="Bottom End" placement="bottom-end" variant="secondary">
          <bl-dropdown-item>Option 1</bl-dropdown-item>
          <bl-dropdown-item>Option 2</bl-dropdown-item>
        </bl-dropdown>
        <bl-dropdown label="Top Start" placement="top-start" variant="secondary">
          <bl-dropdown-item>Option 1</bl-dropdown-item>
          <bl-dropdown-item>Option 2</bl-dropdown-item>
        </bl-dropdown>
        <bl-dropdown label="Top End" placement="top-end" variant="secondary">
          <bl-dropdown-item>Option 1</bl-dropdown-item>
          <bl-dropdown-item>Option 2</bl-dropdown-item>
        </bl-dropdown>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The dropdown component supports RTL (Right-to-Left) text direction. You can enable RTL mode
        by setting the <code>dir</code> attribute on a parent element or the <code>html</code> tag.
        When in RTL mode, the dropdown menu will align from the right side and icons will be
        mirrored.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex gap-8">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <bl-dropdown label="Settings">
            <bl-dropdown-group caption="Account">
              <bl-dropdown-item icon="account">Profile</bl-dropdown-item>
              <bl-dropdown-item icon="settings">Preferences</bl-dropdown-item>
            </bl-dropdown-group>
            <bl-dropdown-item icon="logout">Logout</bl-dropdown-item>
          </bl-dropdown>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <bl-dropdown label="الإعدادات">
            <bl-dropdown-group caption="الحساب">
              <bl-dropdown-item icon="account">الملف الشخصي</bl-dropdown-item>
              <bl-dropdown-item icon="settings">التفضيلات</bl-dropdown-item>
            </bl-dropdown-group>
            <bl-dropdown-item icon="logout">تسجيل الخروج</bl-dropdown-item>
          </bl-dropdown>
        </div>
      </div>
    </DemoSection>

    <!-- Sub-Component API References -->
    <div class="mt-12 border-t border-neutral-lighter dark:border-neutral-darker pt-8">
      <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-6">
        Sub-Component API Reference
      </h2>

      <!-- bl-dropdown-group API -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
          bl-dropdown-group
        </h3>
        <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
          Used to group related dropdown items together with an optional caption.
        </p>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Attribute</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Type</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Default</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <td class="py-3 px-4">
                  <code class="text-primary">caption</code>
                </td>
                <td class="py-3 px-4 text-neutral-dark dark:text-neutral-light font-mono text-xs">
                  string
                </td>
                <td class="py-3 px-4 text-neutral-dark dark:text-neutral-light">-</td>
                <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                  Sets the group caption/title displayed above the items
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4">
          <h4 class="text-sm font-medium text-neutral-dark mb-2">Slots</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                  <th class="text-left py-3 px-4 font-medium text-neutral-dark">Slot</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                  <td class="py-3 px-4">
                    <code class="text-primary">default</code>
                  </td>
                  <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                    Place <code>bl-dropdown-item</code> elements here
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- bl-dropdown-item API -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
          bl-dropdown-item
        </h3>
        <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
          Represents a single action item within a dropdown menu.
        </p>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Attribute</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Type</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Default</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <td class="py-3 px-4">
                  <code class="text-primary">icon</code>
                </td>
                <td class="py-3 px-4 text-neutral-dark dark:text-neutral-light font-mono text-xs">
                  BaklavaIcon
                </td>
                <td class="py-3 px-4 text-neutral-dark dark:text-neutral-light">-</td>
                <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                  Sets the icon name. Shows icon with bl-icon component
                </td>
              </tr>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <td class="py-3 px-4">
                  <code class="text-primary">disabled</code>
                </td>
                <td class="py-3 px-4 text-neutral-dark dark:text-neutral-light font-mono text-xs">
                  boolean
                </td>
                <td class="py-3 px-4 text-neutral-dark dark:text-neutral-light">false</td>
                <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                  Sets the item as disabled, preventing interaction
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4">
          <h4 class="text-sm font-medium text-neutral-dark mb-2">Events</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                  <th class="text-left py-3 px-4 font-medium text-neutral-dark">Event</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-dark">Detail</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                  <td class="py-3 px-4">
                    <code class="text-primary">bl-dropdown-item-click</code>
                  </td>
                  <td class="py-3 px-4 text-neutral-dark dark:text-neutral-light font-mono text-xs">
                    CustomEvent&lt;string&gt;
                  </td>
                  <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                    Fired when the dropdown item is clicked
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="mt-4">
          <h4 class="text-sm font-medium text-neutral-dark mb-2">Slots</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                  <th class="text-left py-3 px-4 font-medium text-neutral-dark">Slot</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                  <td class="py-3 px-4">
                    <code class="text-primary">default</code>
                  </td>
                  <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                    The text content/label of the dropdown item
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="mt-4">
          <h4 class="text-sm font-medium text-neutral-dark mb-2">Methods</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                  <th class="text-left py-3 px-4 font-medium text-neutral-dark">Method</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                  <td class="py-3 px-4">
                    <code class="text-primary">focus()</code>
                  </td>
                  <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                    Focuses this action item programmatically
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
