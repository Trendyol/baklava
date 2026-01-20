<script setup lang="ts"></script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Split Button</h4>
      <bl-split-button label="Save">
        <bl-dropdown-item>Save as Draft</bl-dropdown-item>
        <bl-dropdown-item>Save and Close</bl-dropdown-item>
        <bl-dropdown-item>Save and New</bl-dropdown-item>
      </bl-split-button>
    </div>

    <!-- Variants -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Variants</h4>
      <div class="flex flex-wrap gap-4">
        <bl-split-button label="Primary" variant="primary">
          <bl-dropdown-item>Option 1</bl-dropdown-item>
          <bl-dropdown-item>Option 2</bl-dropdown-item>
        </bl-split-button>
        <bl-split-button label="Secondary" variant="secondary">
          <bl-dropdown-item>Option 1</bl-dropdown-item>
          <bl-dropdown-item>Option 2</bl-dropdown-item>
        </bl-split-button>
        <bl-split-button label="Tertiary" variant="tertiary">
          <bl-dropdown-item>Option 1</bl-dropdown-item>
          <bl-dropdown-item>Option 2</bl-dropdown-item>
        </bl-split-button>
      </div>
    </div>

    <!-- Kinds -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Kinds</h4>
      <div class="flex flex-wrap gap-4">
        <bl-split-button label="Default" kind="default">
          <bl-dropdown-item>Action 1</bl-dropdown-item>
          <bl-dropdown-item>Action 2</bl-dropdown-item>
        </bl-split-button>
        <bl-split-button label="Success" kind="success">
          <bl-dropdown-item>Approve</bl-dropdown-item>
          <bl-dropdown-item>Approve All</bl-dropdown-item>
        </bl-split-button>
        <bl-split-button label="Danger" kind="danger">
          <bl-dropdown-item>Delete</bl-dropdown-item>
          <bl-dropdown-item>Delete All</bl-dropdown-item>
        </bl-split-button>
      </div>
    </div>

    <!-- Sizes -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Sizes</h4>
      <div class="flex flex-wrap items-center gap-4">
        <bl-split-button label="Large" size="large">
          <bl-dropdown-item>Option</bl-dropdown-item>
        </bl-split-button>
        <bl-split-button label="Medium" size="medium">
          <bl-dropdown-item>Option</bl-dropdown-item>
        </bl-split-button>
        <bl-split-button label="Small" size="small">
          <bl-dropdown-item>Option</bl-dropdown-item>
        </bl-split-button>
      </div>
    </div>

    <!-- With Icons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Icon</h4>
      <bl-split-button label="Download" icon="download">
        <bl-dropdown-item icon="download">Download as PDF</bl-dropdown-item>
        <bl-dropdown-item icon="download">Download as Excel</bl-dropdown-item>
        <bl-dropdown-item icon="download">Download as CSV</bl-dropdown-item>
      </bl-split-button>
    </div>

    <!-- Disabled -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Disabled</h4>
      <bl-split-button label="Disabled" disabled>
        <bl-dropdown-item>Option</bl-dropdown-item>
      </bl-split-button>
    </div>
  </div>
</template>
