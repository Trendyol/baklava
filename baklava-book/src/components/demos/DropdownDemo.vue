<script setup lang="ts"></script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Dropdown</h4>
      <bl-dropdown>
        <bl-button slot="dropdown-trigger">Actions</bl-button>
        <bl-dropdown-item>Edit</bl-dropdown-item>
        <bl-dropdown-item>Duplicate</bl-dropdown-item>
        <bl-dropdown-item>Archive</bl-dropdown-item>
        <bl-dropdown-item>Delete</bl-dropdown-item>
      </bl-dropdown>
    </div>

    <!-- With Icons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Icons</h4>
      <bl-dropdown>
        <bl-button slot="dropdown-trigger" icon="settings">Settings</bl-button>
        <bl-dropdown-item icon="account">Profile</bl-dropdown-item>
        <bl-dropdown-item icon="settings">Preferences</bl-dropdown-item>
        <bl-dropdown-item icon="bell">Notifications</bl-dropdown-item>
        <bl-dropdown-item icon="logout">Logout</bl-dropdown-item>
      </bl-dropdown>
    </div>

    <!-- With Groups -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Groups</h4>
      <bl-dropdown>
        <bl-button slot="dropdown-trigger" variant="secondary">Organize</bl-button>
        <bl-dropdown-group caption="Actions">
          <bl-dropdown-item icon="edit">Edit</bl-dropdown-item>
          <bl-dropdown-item icon="copy">Duplicate</bl-dropdown-item>
        </bl-dropdown-group>
        <bl-dropdown-group caption="Danger Zone">
          <bl-dropdown-item icon="archive">Archive</bl-dropdown-item>
          <bl-dropdown-item icon="delete">Delete</bl-dropdown-item>
        </bl-dropdown-group>
      </bl-dropdown>
    </div>

    <!-- Disabled Items -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Disabled Items</h4>
      <bl-dropdown>
        <bl-button slot="dropdown-trigger" variant="tertiary">More Options</bl-button>
        <bl-dropdown-item>Available Action</bl-dropdown-item>
        <bl-dropdown-item disabled>Disabled Action</bl-dropdown-item>
        <bl-dropdown-item>Another Action</bl-dropdown-item>
      </bl-dropdown>
    </div>

    <!-- Different Triggers -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Icon Button Trigger</h4>
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
    </div>
  </div>
</template>
