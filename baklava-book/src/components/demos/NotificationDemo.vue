<script setup lang="ts">
function showNotification(variant: string) {
  const notification = document.querySelector("bl-notification") as any;
  if (notification) {
    notification.addNotification({
      caption: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Notification`,
      description: `This is a ${variant} notification message.`,
      variant: variant,
      icon: true,
    });
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Notification Container (required) -->
    <bl-notification></bl-notification>

    <!-- Trigger Buttons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Trigger Notifications</h4>
      <div class="flex flex-wrap gap-3">
        <bl-button @bl-click="showNotification('info')">Show Info</bl-button>
        <bl-button kind="success" @bl-click="showNotification('success')">Show Success</bl-button>
        <bl-button kind="danger" @bl-click="showNotification('error')">Show Error</bl-button>
        <bl-button variant="secondary" @bl-click="showNotification('warning')"
          >Show Warning</bl-button
        >
      </div>
    </div>

    <!-- Notification Cards (Static Preview) -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Notification Variants (Preview)</h4>
      <div class="space-y-3 max-w-md">
        <bl-notification-card variant="info" caption="Information" icon>
          This is an info notification.
        </bl-notification-card>
        <bl-notification-card variant="success" caption="Success" icon>
          Operation completed successfully.
        </bl-notification-card>
        <bl-notification-card variant="warning" caption="Warning" icon>
          Please review before continuing.
        </bl-notification-card>
        <bl-notification-card variant="error" caption="Error" icon>
          Something went wrong.
        </bl-notification-card>
      </div>
    </div>

    <!-- With Actions -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Actions</h4>
      <div class="max-w-md">
        <bl-notification-card variant="info" caption="New Message" icon>
          You have a new message from John.
          <template #action>
<bl-button  variant="secondary" size="small">View</bl-button>
</template>
        </bl-notification-card>
      </div>
    </div>
  </div>
</template>
