<script setup lang="ts">
const zIndexValues = [
  {
    variable: "--bl-index-deep",
    value: "-1",
    description: "Deep z-index can be used to move an element behind everything else",
  },
  {
    variable: "--bl-index-base",
    value: "1",
    description: "Base z-index for just leveling up an element in z-stack",
  },
  {
    variable: "--bl-index-popover",
    value: "100",
    description: "Z-index value for popover items like dropdowns and menus",
  },
  {
    variable: "--bl-index-tooltip",
    value: "200",
    description: "Tooltip-like elements can be used on top of popovers",
  },
  {
    variable: "--bl-index-sticky",
    value: "300",
    description: "Z-index for sticky elements like headers and footers",
  },
  {
    variable: "--bl-index-overlay",
    value: "400",
    description: "Z-index for overlay elements like backdrops and masks",
  },
  {
    variable: "--bl-index-dialog",
    value: "500",
    description: "Z-index for dialogs, modals, and drawers",
  },
  {
    variable: "--bl-index-notification",
    value: "600",
    description: "Top z-index for showing toast or notification elements",
  },
];

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(`var(${text})`);
};
</script>

<template>
  <div class="z-index-demo">
    <h1 class="text-3xl font-bold text-neutral-darkest dark:text-white mb-2">Z-index</h1>
    <p class="text-neutral-dark dark:text-neutral-light mb-8">
      Z-index values define a set of variables to control the stacking order (z-order) of elements.
      Using consistent z-index values prevents layering conflicts and ensures proper element
      ordering.
    </p>

    <!-- Z-index Table -->
    <div
      class="overflow-x-auto bg-white dark:bg-neutral-darker rounded-xl border border-neutral-lightest dark:border-neutral-dark mb-12"
    >
      <table class="w-full">
        <thead>
          <tr class="border-b border-neutral-lightest dark:border-neutral-dark">
            <th
              class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white"
            >
              Variable
            </th>
            <th
              class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white"
            >
              Value
            </th>
            <th
              class="text-left py-4 px-6 text-sm font-semibold text-neutral-darkest dark:text-white"
            >
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in zIndexValues"
            :key="item.variable"
            class="border-b border-neutral-lightest dark:border-neutral-dark last:border-b-0 hover:bg-neutral-lightest dark:hover:bg-neutral-dark transition-colors cursor-pointer"
            :title="`Click to copy: var(${item.variable})`"
            @click="copyToClipboard(item.variable)"
          >
            <td class="py-4 px-6">
              <code class="text-sm text-primary font-mono">{{ item.variable }}</code>
            </td>
            <td class="py-4 px-6">
              <span class="text-sm font-mono text-neutral-darker dark:text-neutral-light">
                {{ item.value }}
              </span>
            </td>
            <td class="py-4 px-6">
              <span class="text-sm text-neutral-darker dark:text-neutral-light">
                {{ item.description }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Stacking Order Visual -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Stacking Order</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      The z-index values follow a logical stacking order:
    </p>
    <div
      class="bg-white dark:bg-neutral-darker rounded-xl border border-neutral-lightest dark:border-neutral-dark p-6 mb-8"
    >
      <div class="flex flex-col gap-2">
        <div
          v-for="(item, index) in [...zIndexValues].reverse()"
          :key="item.variable"
          class="flex items-center gap-4 p-3 rounded-lg"
          :style="{
            backgroundColor: `rgba(242, 122, 26, ${0.1 + index * 0.1})`,
          }"
        >
          <span class="w-16 text-sm font-mono font-bold text-primary">{{ item.value }}</span>
          <span class="text-sm text-neutral-darkest dark:text-white font-medium">
            {{ item.variable.replace("--bl-index-", "").toUpperCase() }}
          </span>
          <span class="text-xs text-neutral-dark ml-auto">{{ item.description }}</span>
        </div>
      </div>
    </div>

    <!-- Usage -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Usage</h2>
    <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
      Use CSS custom properties to apply z-index in your stylesheets:
    </p>
    <div class="bg-black rounded-xl p-4 overflow-x-auto mb-8">
      <pre class="text-sm text-[#d4d4d4]"><code>/* Custom popover */
.my-popover {
  z-index: var(--bl-index-popover);
}

/* Sticky header */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: var(--bl-index-sticky);
}

/* Modal backdrop */
.backdrop {
  z-index: var(--bl-index-overlay);
}

/* Modal content */
.modal {
  z-index: var(--bl-index-dialog);
}

/* Toast notifications */
.toast {
  z-index: var(--bl-index-notification);
}</code></pre>
    </div>

    <!-- Best Practices -->
    <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-4">Best Practices</h2>
    <ul class="text-sm text-neutral-dark dark:text-neutral-light space-y-2">
      <li class="flex items-start gap-2">
        <bl-icon name="check_fill" style="color: var(--bl-color-success); margin-top: 2px"></bl-icon>
        <span>Always use Baklava z-index variables instead of arbitrary numbers</span>
      </li>
      <li class="flex items-start gap-2">
        <bl-icon name="check_fill" style="color: var(--bl-color-success); margin-top: 2px"></bl-icon>
        <span>This ensures consistent stacking across your application</span>
      </li>
      <li class="flex items-start gap-2">
        <bl-icon name="check_fill" style="color: var(--bl-color-success); margin-top: 2px"></bl-icon>
        <span>Notifications always appear on top of everything</span>
      </li>
      <li class="flex items-start gap-2">
        <bl-icon name="check_fill" style="color: var(--bl-color-success); margin-top: 2px"></bl-icon>
        <span>Dialogs appear above overlays</span>
      </li>
      <li class="flex items-start gap-2">
        <bl-icon name="check_fill" style="color: var(--bl-color-success); margin-top: 2px"></bl-icon>
        <span>Tooltips appear above popovers</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
code {
  color: var(--bl-color-primary);
}
</style>
