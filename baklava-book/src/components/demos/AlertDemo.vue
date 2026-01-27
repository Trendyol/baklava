<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";

const variantsCode = `<bl-alert variant="info">Info alert message</bl-alert>
<bl-alert variant="warning">Warning alert message</bl-alert>
<bl-alert variant="success">Success alert message</bl-alert>
<bl-alert variant="danger">Danger alert message</bl-alert>`;

const iconsCode = `<bl-alert variant="info" icon>Info alert with icon</bl-alert>
<bl-alert variant="warning" icon>Warning alert with icon</bl-alert>
<bl-alert variant="success" icon>Success alert with icon</bl-alert>
<bl-alert variant="danger" icon>Danger alert with icon</bl-alert>`;

const captionCode = `<bl-alert variant="info" caption="Information" icon>
  This is a detailed information message with additional context.
</bl-alert>
<bl-alert variant="success" caption="Success!" icon>
  Your changes have been saved successfully.
</bl-alert>`;

const captionlessCode = `<bl-alert variant="info" icon>Informational Text</bl-alert>
<bl-alert variant="warning">Warning Text</bl-alert>
<bl-alert variant="success" icon closable>Success Text</bl-alert>
<bl-alert variant="danger">Danger Text</bl-alert>`;

const closableCode = `<bl-alert variant="info" icon closable>
  This alert can be closed by clicking the X button.
</bl-alert>
<bl-alert variant="warning" caption="Warning" icon closable>
  This captioned alert can also be closed.
</bl-alert>`;

const actionCode = `<bl-alert variant="info" caption="New Update Available" icon>
  A new version is available. Click to update now.
  <bl-button slot="action">Update</bl-button>
</bl-alert>
<bl-alert variant="danger" caption="Session Expired" icon closable>
  Your session has expired. Please log in again.
  <bl-button slot="action">Login</bl-button>
</bl-alert>`;

const publicFunctionsCode = `// Open a closed alert
document.querySelector('bl-alert').open();

// Close an alert
document.querySelector('bl-alert').close();`;

const rtlCode = `<!-- LTR (Left-to-Right) -->
<bl-alert variant="info" caption="Information Alert" icon>
  This is an example of a left-to-right alert.
  <bl-button slot="action">Action</bl-button>
</bl-alert>

<!-- RTL (Right-to-Left) -->
<div dir="rtl">
  <bl-alert variant="info" caption="تنبيه معلومات" icon>
    هذا مثال على تنبيه من اليمين إلى اليسار.
    <bl-button slot="action">إجراء</bl-button>
  </bl-alert>
</div>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Alert component displays an informational message to users with additional features if
        desired.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Usage Guidelines
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>
          Explain how to resolve the issue by including any troubleshooting actions or next steps.
        </li>
        <li>
          You can include links within the notification body that redirect the user to next steps by
          using an actionable notification.
        </li>
        <li>Alerts can be closable, use the icon button for closing action on the right.</li>
        <li>Default alert is Captionless Informational Alert without icon.</li>
        <li>
          We have default icons that we recommend in our icon alert variants but these icons can be
          changed from the icon list.
        </li>
      </ul>
    </div>

    <!-- Alert Variants -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Alert Variants
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        We have 4 variants for each alert: <strong>Info</strong>, <strong>Warning</strong>,
        <strong>Success</strong> and <strong>Danger</strong>.
      </p>
    </div>

    <DemoSection title="Variants" :code="variantsCode">
      <div class="space-y-3">
        <bl-alert variant="info">Info alert message</bl-alert>
        <bl-alert variant="warning">Warning alert message</bl-alert>
        <bl-alert variant="success">Success alert message</bl-alert>
        <bl-alert variant="danger">Danger alert message</bl-alert>
      </div>
    </DemoSection>

    <!-- With Icons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Alerts with Icons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Add the <code>icon</code> attribute to display the default icon for each variant.
      </p>
    </div>

    <DemoSection title="With Icons" :code="iconsCode">
      <div class="space-y-3">
        <bl-alert variant="info" icon>Info alert with icon</bl-alert>
        <bl-alert variant="warning" icon>Warning alert with icon</bl-alert>
        <bl-alert variant="success" icon>Success alert with icon</bl-alert>
        <bl-alert variant="danger" icon>Danger alert with icon</bl-alert>
      </div>
    </DemoSection>

    <!-- Captioned Alerts -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Captioned Alerts
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The caption should be one line, short and descriptive. In detailed description be concise
        and avoid repeating or paraphrasing the caption.
      </p>
    </div>

    <DemoSection title="With Caption" :code="captionCode">
      <div class="space-y-3">
        <bl-alert variant="info" caption="Information" icon>
          This is a detailed information message with additional context.
        </bl-alert>
        <bl-alert variant="success" caption="Success!" icon>
          Your changes have been saved successfully.
        </bl-alert>
        <bl-alert variant="warning" caption="Warning" icon>
          Please review your changes before continuing.
        </bl-alert>
        <bl-alert variant="danger" caption="Error" icon>
          Something went wrong. Please try again later.
        </bl-alert>
      </div>
    </DemoSection>

    <!-- Captionless Alerts -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Captionless Alerts
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Alerts don't always have to have a caption, you can use plain text to explain the
        situation.
      </p>
    </div>

    <DemoSection title="Captionless" :code="captionlessCode">
      <div class="space-y-3">
        <bl-alert variant="info" icon>Informational Text</bl-alert>
        <bl-alert variant="warning">Warning Text</bl-alert>
        <bl-alert variant="success" icon closable>Success Text</bl-alert>
        <bl-alert variant="danger">Danger Text</bl-alert>
      </div>
    </DemoSection>

    <!-- Closable -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Closable Alerts
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Add the <code>closable</code> attribute to show a close button on the right side.
      </p>
    </div>

    <DemoSection title="Closable" :code="closableCode">
      <div class="space-y-3">
        <bl-alert variant="info" icon closable>
          This alert can be closed by clicking the X button.
        </bl-alert>
        <bl-alert variant="warning" caption="Warning" icon closable>
          This captioned alert can also be closed.
        </bl-alert>
      </div>
    </DemoSection>

    <!-- With Action -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Alerts with Action Buttons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use the <code>action</code> slot to add action buttons to the alert.
      </p>
    </div>

    <DemoSection title="With Action Button" :code="actionCode">
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
    </DemoSection>

    <!-- Public Functions -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Public Functions
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Alert component provides <code>open()</code> and <code>close()</code> methods to
        programmatically control the alert.
      </p>
    </div>

    <DemoSection title="Public Functions" :code="publicFunctionsCode">
      <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg">
        <code class="text-sm text-neutral-darkest dark:text-neutral-light">
          document.querySelector('bl-alert').open();<br />
          document.querySelector('bl-alert').close();
        </code>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The alert component supports RTL (Right-to-Left) text direction. You can enable RTL mode by
        setting the <code>dir</code> attribute on a parent element or the <code>html</code> tag.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="space-y-6">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <bl-alert variant="info" caption="Information Alert" icon>
            This is an example of a left-to-right alert with an action button.
            <bl-button slot="action">Action</bl-button>
          </bl-alert>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <bl-alert variant="info" caption="تنبيه معلومات" icon>
            هذا مثال على تنبيه من اليمين إلى اليسار مع زر إجراء.
            <bl-button slot="action">إجراء</bl-button>
          </bl-alert>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
