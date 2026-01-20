<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";

function addNotification(options: {
  caption: string;
  description: string;
  variant?: string;
  icon?: boolean;
  permanent?: boolean;
  duration?: number;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}) {
  const notification = document.querySelector("bl-notification") as any;

  if (notification) {
    return notification.addNotification(options);
  }
}

function showVariant(variant: string) {
  addNotification({
    caption: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Notification`,
    description: `This is a ${variant} notification message.`,
    variant: variant,
    icon: true,
  });
}

function showPermanent() {
  addNotification({
    caption: "Permanent Notification",
    description: "This notification will not auto-dismiss. Click the close button to remove it.",
    variant: "info",
    icon: true,
    permanent: true,
  });
}

function showWithPrimaryAction() {
  const notification = addNotification({
    caption: "New Update Available",
    description: "A new version is ready to install.",
    variant: "info",
    icon: true,
    permanent: true,
    primaryAction: {
      label: "Update Now",
      onClick: () => {
        alert("Update started!");
        notification?.remove();
      },
    },
  });
}

function showWithBothActions() {
  const notification = addNotification({
    caption: "Confirm Action",
    description: "Are you sure you want to proceed with this action?",
    variant: "warning",
    icon: true,
    permanent: true,
    primaryAction: {
      label: "Confirm",
      onClick: () => {
        alert("Action confirmed!");
        notification?.remove();
      },
    },
    secondaryAction: {
      label: "Cancel",
      onClick: () => {
        notification?.remove();
      },
    },
  });
}

function showCustomDuration() {
  addNotification({
    caption: "Quick Message",
    description: "This notification will disappear in 3 seconds.",
    variant: "success",
    icon: true,
    duration: 3,
  });
}

const basicCode = `<bl-notification></bl-notification>

<script>
const notification = document.querySelector("bl-notification");

notification.addNotification({
  caption: "Notification Title",
  description: "This is a notification message.",
  variant: "info",
  icon: true,
});
<\/script>`;

const variantsCode = `// Info variant
notification.addNotification({
  caption: "Information",
  description: "This is an info notification.",
  variant: "info",
  icon: true,
});

// Success variant
notification.addNotification({
  caption: "Success",
  description: "Operation completed successfully.",
  variant: "success",
  icon: true,
});

// Warning variant
notification.addNotification({
  caption: "Warning",
  description: "Please review before continuing.",
  variant: "warning",
  icon: true,
});

// Error variant
notification.addNotification({
  caption: "Error",
  description: "Something went wrong.",
  variant: "error",
  icon: true,
});`;

const permanentCode = `notification.addNotification({
  caption: "Permanent Notification",
  description: "This notification will not auto-dismiss.",
  variant: "info",
  icon: true,
  permanent: true, // Will not auto-dismiss
});`;

const primaryActionCode = `const notification = notificationElement.addNotification({
  caption: "New Update Available",
  description: "A new version is ready to install.",
  variant: "info",
  permanent: true,
  primaryAction: {
    label: "Update Now",
    onClick: () => {
      alert("Update started!");
      notification.remove(); // Remove notification after action
    },
  },
});`;

const bothActionsCode = `const notification = notificationElement.addNotification({
  caption: "Confirm Action",
  description: "Are you sure you want to proceed?",
  variant: "warning",
  permanent: true,
  primaryAction: {
    label: "Confirm",
    onClick: (notification) => {
      alert("Confirmed!");
      notification.remove();
    },
  },
  secondaryAction: {
    label: "Cancel",
    onClick: (notification) => {
      notification.remove();
    },
  },
});`;

const durationCode = `notification.addNotification({
  caption: "Quick Message",
  description: "This notification will disappear in 3 seconds.",
  variant: "success",
  icon: true,
  duration: 3, // Duration in seconds
});`;

const removeCode = `// Add a notification and store the reference
const notification = notificationElement.addNotification({
  caption: "Removable Notification",
  description: "Click the button to remove this notification.",
  permanent: true,
});

// Remove by calling remove method
notification.remove();

// Or remove by id
notificationElement.removeNotification(notification.id);

// Await removal animation
await notification.remove();
console.log("Notification removed!");`;

const cardsCode = `<!-- Static notification cards for preview -->
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
</bl-notification-card>`;

const rtlCode = `<div dir="rtl">
  <bl-notification></bl-notification>
</div>

<script>
const notification = document.querySelector("bl-notification");

notification.addNotification({
  caption: "رسالة ترحيب",
  description: "مرحباً بك في تطبيقنا!",
  variant: "info",
  icon: true,
  primaryAction: {
    label: "ابدأ الآن",
    onClick: () => {},
  },
});
<\/script>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Notification Container (required) -->
    <bl-notification></bl-notification>

    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Notifications are messages that communicate information to the user. They can be temporary
        or permanent, and support multiple variants and actions.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Design Rules
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Notification has <strong>fixed width (396px)</strong> by default</li>
        <li>Notifications are <strong>temporary</strong> by default but can be set permanent</li>
        <li>
          Temporary notifications are <strong>dismissed automatically</strong> after a certain
          period of time
        </li>
        <li>Temporary notifications remaining time will stop when hovered</li>
        <li>It can be dismissed by swiping up on mobile</li>
        <li>
          Notification takes position on top on small screens, and on top right on large screens
        </li>
        <li>
          Multiple notifications would be visible with a vertical stack. New notifications will
          come to top on large screens, and will come to bottom on small screens
        </li>
      </ul>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The <code>bl-notification</code> component exposes two public methods:
        <code>addNotification</code> and <code>removeNotification</code>. Call
        <code>addNotification</code> with a notification object to display a notification.
      </p>
    </div>

    <DemoSection title="Trigger Notifications" :code="basicCode">
      <div class="flex flex-wrap gap-3">
        <bl-button @bl-click="showVariant('info')">Show Info</bl-button>
        <bl-button kind="success" @bl-click="showVariant('success')">Show Success</bl-button>
        <bl-button kind="danger" @bl-click="showVariant('error')">Show Error</bl-button>
        <bl-button variant="secondary" @bl-click="showVariant('warning')">Show Warning</bl-button>
      </div>
    </DemoSection>

    <!-- Variants -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Variants</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        A notification can have one of the following variants: <code>info</code>,
        <code>success</code>, <code>warning</code>, <code>error</code>. The variant changes the
        color and default icon of the notification.
      </p>
    </div>

    <DemoSection title="Notification Variants (Preview)" :code="cardsCode">
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
    </DemoSection>

    <!-- Permanent -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Permanent Notifications
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        A notification can be permanent by setting <code>permanent: true</code>. Permanent
        notifications are not dismissed automatically. They can only be dismissed by clicking the
        close button or programmatically.
      </p>
    </div>

    <DemoSection title="Permanent" :code="permanentCode">
      <bl-button @bl-click="showPermanent()">Show Permanent Notification</bl-button>
    </DemoSection>

    <!-- Primary Action -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Primary Action
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        A notification can have a primary action button. Use <code>primaryAction</code> with
        <code>label</code> and <code>onClick</code> properties.
      </p>
    </div>

    <DemoSection title="With Primary Action" :code="primaryActionCode">
      <bl-button @bl-click="showWithPrimaryAction()">Show with Primary Action</bl-button>
    </DemoSection>

    <!-- Both Actions -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Primary & Secondary Actions
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        A notification can have both primary and secondary actions. The
        <code>onClick</code> callback receives the notification object, allowing you to call
        <code>notification.remove()</code> to dismiss it after an action.
      </p>
    </div>

    <DemoSection title="With Both Actions" :code="bothActionsCode">
      <bl-button @bl-click="showWithBothActions()">Show with Both Actions</bl-button>
    </DemoSection>

    <!-- Custom Duration -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Custom Duration
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Set the <code>duration</code> property to control how long the notification is visible
        (in seconds). Default is 7 seconds.
      </p>
    </div>

    <DemoSection title="Custom Duration" :code="durationCode">
      <bl-button @bl-click="showCustomDuration()">Show 3-second Notification</bl-button>
    </DemoSection>

    <!-- Removing Notifications -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Removing Notifications
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The <code>addNotification</code> method returns a notification object with a
        <code>remove()</code> method. You can also use
        <code>removeNotification(id)</code> on the notification container. The remove method
        returns a Promise that resolves when the removal animation is complete.
      </p>
    </div>

    <DemoSection title="Remove API" :code="removeCode">
      <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded">
        <pre class="text-sm text-neutral-dark dark:text-neutral-light overflow-x-auto">
// notification.remove() - Removes the notification
// await notification.remove() - Wait for removal animation
// notificationElement.removeNotification(id) - Remove by ID</pre
        >
      </div>
    </DemoSection>

    <!-- Notification Object Reference -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Notification Object
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The notification object passed to <code>addNotification</code> has the following
        properties:
      </p>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
            <th class="text-left py-3 px-4 font-medium text-neutral-dark">Property</th>
            <th class="text-left py-3 px-4 font-medium text-neutral-dark">Type</th>
            <th class="text-left py-3 px-4 font-medium text-neutral-dark">Default</th>
            <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
            <td class="py-3 px-4"><code class="text-primary">caption</code></td>
            <td class="py-3 px-4 font-mono text-xs">string</td>
            <td class="py-3 px-4">-</td>
            <td class="py-3 px-4">The title/caption of the notification</td>
          </tr>
          <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
            <td class="py-3 px-4"><code class="text-primary">description</code></td>
            <td class="py-3 px-4 font-mono text-xs">string</td>
            <td class="py-3 px-4">-</td>
            <td class="py-3 px-4">The message body of the notification</td>
          </tr>
          <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
            <td class="py-3 px-4"><code class="text-primary">variant</code></td>
            <td class="py-3 px-4 font-mono text-xs">"info" | "success" | "warning" | "error"</td>
            <td class="py-3 px-4">"info"</td>
            <td class="py-3 px-4">The visual variant of the notification</td>
          </tr>
          <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
            <td class="py-3 px-4"><code class="text-primary">icon</code></td>
            <td class="py-3 px-4 font-mono text-xs">boolean | BaklavaIcon</td>
            <td class="py-3 px-4">true</td>
            <td class="py-3 px-4">Show default icon or custom icon name</td>
          </tr>
          <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
            <td class="py-3 px-4"><code class="text-primary">duration</code></td>
            <td class="py-3 px-4 font-mono text-xs">number</td>
            <td class="py-3 px-4">7</td>
            <td class="py-3 px-4">Duration in seconds before auto-dismiss</td>
          </tr>
          <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
            <td class="py-3 px-4"><code class="text-primary">permanent</code></td>
            <td class="py-3 px-4 font-mono text-xs">boolean</td>
            <td class="py-3 px-4">false</td>
            <td class="py-3 px-4">If true, notification won't auto-dismiss</td>
          </tr>
          <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
            <td class="py-3 px-4"><code class="text-primary">primaryAction</code></td>
            <td class="py-3 px-4 font-mono text-xs">{ label: string, onClick: () => void }</td>
            <td class="py-3 px-4">-</td>
            <td class="py-3 px-4">Primary action button</td>
          </tr>
          <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
            <td class="py-3 px-4"><code class="text-primary">secondaryAction</code></td>
            <td class="py-3 px-4 font-mono text-xs">{ label: string, onClick: () => void }</td>
            <td class="py-3 px-4">-</td>
            <td class="py-3 px-4">Secondary action button</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The notification component supports RTL (Right-to-Left) text direction. You can enable RTL
        mode by setting the <code>dir</code> attribute on a parent element or the
        <code>html</code> tag.
      </p>
    </div>

    <DemoSection title="RTL Example" :code="rtlCode">
      <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded">
        <p class="text-sm text-neutral-dark dark:text-neutral-light">
          Set <code>dir="rtl"</code> on a parent element to enable RTL mode. The notification will
          appear on the left side of the screen and text will be right-aligned.
        </p>
      </div>
    </DemoSection>
  </div>
</template>
