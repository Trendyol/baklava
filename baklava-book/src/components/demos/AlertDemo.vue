<script setup lang="ts"></script>

<template>
  <div class="space-y-8">
    <!-- Variants -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Variants</h4>
      <div class="space-y-3">
        <bl-alert variant="info">Info alert message</bl-alert>
        <bl-alert variant="warning">Warning alert message</bl-alert>
        <bl-alert variant="success">Success alert message</bl-alert>
        <bl-alert variant="danger">Danger alert message</bl-alert>
      </div>
    </div>

    <!-- With Icons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Icons</h4>
      <div class="space-y-3">
        <bl-alert variant="info" icon>Info alert with icon</bl-alert>
        <bl-alert variant="warning" icon>Warning alert with icon</bl-alert>
        <bl-alert variant="success" icon>Success alert with icon</bl-alert>
        <bl-alert variant="danger" icon>Danger alert with icon</bl-alert>
      </div>
    </div>

    <!-- With Caption -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Caption</h4>
      <div class="space-y-3">
        <bl-alert variant="info" caption="Information" icon>
          This is a detailed information message with additional context.
        </bl-alert>
        <bl-alert variant="success" caption="Success!" icon>
          Your changes have been saved successfully.
        </bl-alert>
      </div>
    </div>

    <!-- Closable -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Closable</h4>
      <div class="space-y-3">
        <bl-alert variant="info" icon closable>
          This alert can be closed by clicking the X button.
        </bl-alert>
        <bl-alert variant="warning" caption="Warning" icon closable>
          This captioned alert can also be closed.
        </bl-alert>
      </div>
    </div>

    <!-- With Action -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Action Button</h4>
      <div class="space-y-3">
        <bl-alert variant="info" caption="New Update Available" icon>
          A new version is available. Click to update now.
          <bl-button slot="action">Update</bl-button>
        </bl-alert>
        <bl-alert variant="danger" caption="Session Expired" icon closable>
          Your session has expired. Please log in again.
          <bl-button slot="action">Login</bl-button>
        </bl-alert>
      </div>
    </div>
  </div>
</template>
