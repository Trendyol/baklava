<script setup lang="ts"></script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Tooltip</h4>
      <div class="flex flex-wrap gap-4">
        <bl-tooltip>
          <template #tooltip-trigger>
<bl-button >Hover me</bl-button>
</template>
          This is a tooltip message
        </bl-tooltip>
      </div>
    </div>

    <!-- Placements -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Placements</h4>
      <div class="flex flex-wrap gap-4 py-8">
        <bl-tooltip placement="top">
          <template #tooltip-trigger>
<bl-button  variant="secondary">Top</bl-button>
</template>
          Tooltip on top
        </bl-tooltip>
        <bl-tooltip placement="bottom">
          <template #tooltip-trigger>
<bl-button  variant="secondary">Bottom</bl-button>
</template>
          Tooltip on bottom
        </bl-tooltip>
        <bl-tooltip placement="left">
          <template #tooltip-trigger>
<bl-button  variant="secondary">Left</bl-button>
</template>
          Tooltip on left
        </bl-tooltip>
        <bl-tooltip placement="right">
          <template #tooltip-trigger>
<bl-button  variant="secondary">Right</bl-button>
</template>
          Tooltip on right
        </bl-tooltip>
      </div>
    </div>

    <!-- On Different Elements -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">On Different Elements</h4>
      <div class="flex flex-wrap items-center gap-6">
        <bl-tooltip>
          <template #tooltip-trigger>
<bl-button  icon="info" label="Info"></bl-button>
</template>
          Click for more information
        </bl-tooltip>

        <bl-tooltip>
          <template #tooltip-trigger>
<bl-badge  icon="star">Featured</bl-badge>
</template>
          This item is featured
        </bl-tooltip>

        <bl-tooltip>
          <template #tooltip-trigger>
<span  class="text-primary cursor-help underline">Help text</span>
</template>
          Additional help information
        </bl-tooltip>
      </div>
    </div>

    <!-- With Icons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Icon Buttons with Tooltips</h4>
      <div class="flex flex-wrap gap-2">
        <bl-tooltip placement="bottom">
          <template #tooltip-trigger>
<bl-button  icon="edit" variant="tertiary" label="Edit"></bl-button>
</template>
          Edit item
        </bl-tooltip>
        <bl-tooltip placement="bottom">
          <template #tooltip-trigger>
<bl-button  icon="copy" variant="tertiary" label="Copy"></bl-button>
</template>
          Copy to clipboard
        </bl-tooltip>
        <bl-tooltip placement="bottom">
          <template #tooltip-trigger>
<bl-button
            
            icon="delete"
            variant="tertiary"
            kind="danger"
            label="Delete"
          ></bl-button>
</template>
          Delete item
        </bl-tooltip>
      </div>
    </div>
  </div>
</template>
