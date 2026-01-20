<script setup lang="ts"></script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Dropdown</h4>
      <bl-dropdown>
        <template #dropdown-trigger>
<bl-button >Actions</bl-button>
</template>
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
        <template #dropdown-trigger>
<bl-button  icon="settings">Settings</bl-button>
</template>
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
        <template #dropdown-trigger>
<bl-button  variant="secondary">Organize</bl-button>
</template>
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
        <template #dropdown-trigger>
<bl-button  variant="tertiary">More Options</bl-button>
</template>
        <bl-dropdown-item>Available Action</bl-dropdown-item>
        <bl-dropdown-item disabled>Disabled Action</bl-dropdown-item>
        <bl-dropdown-item>Another Action</bl-dropdown-item>
      </bl-dropdown>
    </div>

    <!-- Different Triggers -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Icon Button Trigger</h4>
      <bl-dropdown>
        <template #dropdown-trigger>
<bl-button
          
          icon="more_vertical"
          variant="tertiary"
          label="More"
        ></bl-button>
</template>
        <bl-dropdown-item icon="edit">Edit</bl-dropdown-item>
        <bl-dropdown-item icon="share">Share</bl-dropdown-item>
        <bl-dropdown-item icon="delete">Delete</bl-dropdown-item>
      </bl-dropdown>
    </div>
  </div>
</template>
