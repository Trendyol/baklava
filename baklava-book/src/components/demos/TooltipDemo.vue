<script setup lang="ts"></script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Tooltip</h4>
      <div class="flex flex-wrap gap-4">
        <bl-tooltip>
          <bl-button slot="tooltip-trigger">Hover me</bl-button>
          This is a tooltip message
        </bl-tooltip>
      </div>
    </div>

    <!-- Placements -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Placements</h4>
      <div class="flex flex-wrap gap-4 py-8">
        <bl-tooltip placement="top">
          <bl-button slot="tooltip-trigger" variant="secondary">Top</bl-button>
          Tooltip on top
        </bl-tooltip>
        <bl-tooltip placement="bottom">
          <bl-button slot="tooltip-trigger" variant="secondary">Bottom</bl-button>
          Tooltip on bottom
        </bl-tooltip>
        <bl-tooltip placement="left">
          <bl-button slot="tooltip-trigger" variant="secondary">Left</bl-button>
          Tooltip on left
        </bl-tooltip>
        <bl-tooltip placement="right">
          <bl-button slot="tooltip-trigger" variant="secondary">Right</bl-button>
          Tooltip on right
        </bl-tooltip>
      </div>
    </div>

    <!-- On Different Elements -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">On Different Elements</h4>
      <div class="flex flex-wrap items-center gap-6">
        <bl-tooltip>
          <bl-button slot="tooltip-trigger" icon="info" label="Info"></bl-button>
          Click for more information
        </bl-tooltip>

        <bl-tooltip>
          <bl-badge slot="tooltip-trigger" icon="star">Featured</bl-badge>
          This item is featured
        </bl-tooltip>

        <bl-tooltip>
          <span slot="tooltip-trigger" class="text-primary cursor-help underline">Help text</span>
          Additional help information
        </bl-tooltip>
      </div>
    </div>

    <!-- With Icons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Icon Buttons with Tooltips</h4>
      <div class="flex flex-wrap gap-2">
        <bl-tooltip placement="bottom">
          <bl-button slot="tooltip-trigger" icon="edit" variant="tertiary" label="Edit"></bl-button>
          Edit item
        </bl-tooltip>
        <bl-tooltip placement="bottom">
          <bl-button slot="tooltip-trigger" icon="copy" variant="tertiary" label="Copy"></bl-button>
          Copy to clipboard
        </bl-tooltip>
        <bl-tooltip placement="bottom">
          <bl-button
            slot="tooltip-trigger"
            icon="delete"
            variant="tertiary"
            kind="danger"
            label="Delete"
          ></bl-button>
          Delete item
        </bl-tooltip>
      </div>
    </div>
  </div>
</template>
