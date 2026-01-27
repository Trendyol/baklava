<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

const isEnabled = ref(false);
const notificationsEnabled = ref(true);

const basicCode = `<bl-switch>Enable notifications</bl-switch>
<bl-switch checked>Dark mode</bl-switch>`;

const withLabelCode = `<bl-switch aria-label="Notification Settings">
  Enable Email Notifications
</bl-switch>`;

const checkedCode = `<bl-switch>Off (default)</bl-switch>
<bl-switch checked>On</bl-switch>`;

const disabledCode = `<bl-switch disabled>Disabled Off</bl-switch>
<bl-switch disabled checked>Disabled On</bl-switch>`;

const customColorsCode = `<!-- Using Baklava theme colors -->
<bl-switch checked style="--bl-switch-color-on: var(--bl-color-success)">
  Success
</bl-switch>
<bl-switch checked style="--bl-switch-color-on: var(--bl-color-danger)">
  Danger
</bl-switch>
<bl-switch checked style="--bl-switch-color-on: var(--bl-color-info)">
  Info
</bl-switch>

<!-- With off color -->
<bl-switch style="--bl-switch-color-on: var(--bl-color-success); --bl-switch-color-off: var(--bl-color-danger)">
  Toggle
</bl-switch>`;

const rtlCode = `<!-- LTR -->
<bl-switch checked>Enable notifications</bl-switch>

<!-- RTL -->
<div dir="rtl">
  <bl-switch checked>تفعيل الإشعارات</bl-switch>
  <bl-switch>الوضع الداكن</bl-switch>
</div>`;

const interactiveCode = `<script setup>
import { ref } from "vue";
const isEnabled = ref(false);
<\/script>

<template>
  <bl-switch
    :checked="isEnabled"
    @bl-switch-toggle="isEnabled = $event.detail"
  >
    Feature Toggle
  </bl-switch>
  <span>Status: {{ isEnabled ? "Enabled" : "Disabled" }}</span>
</template>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Switch component can be used to toggle On or Off states of any single item.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">Usage</h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>
          Clicking on switch triggers the action immediately, it shouldn't require users to click
          an extra button to apply or save the settings.
        </li>
        <li>
          You can use your own label outside of this component, but please set
          <code>aria-label</code> attribute whenever you do so.
        </li>
        <li>Switch doesn't have an indeterminate state.</li>
        <li>
          Switch should not be used as an input field. For boolean inputs, use
          <strong>checkbox</strong> instead.
        </li>
      </ul>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Switch is <em>Off</em> by default. Add content inside to display a label.
      </p>
    </div>

    <DemoSection title="Basic Switch" :code="basicCode">
      <div class="flex flex-wrap gap-6">
        <bl-switch>Enable notifications</bl-switch>
        <bl-switch checked>Dark mode</bl-switch>
      </div>
    </DemoSection>

    <!-- With Label -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Switch with Label</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Add label as slot content. Always set <code>aria-label</code> for accessibility.
      </p>
    </div>

    <DemoSection title="With Label" :code="withLabelCode">
      <bl-switch aria-label="Notification Settings">Enable Email Notifications</bl-switch>
    </DemoSection>

    <!-- Checked State -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Checked State</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        <em>On</em> state can be set via <code>checked</code> attribute.
      </p>
    </div>

    <DemoSection title="Checked" :code="checkedCode">
      <div class="flex flex-wrap gap-6">
        <bl-switch>Off (default)</bl-switch>
        <bl-switch checked>On</bl-switch>
      </div>
    </DemoSection>

    <!-- Disabled State -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Disabled State
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Disabled state can be set via <code>disabled</code> attribute. A switch can be
        <code>disabled</code> and <code>checked</code> at the same time.
      </p>
    </div>

    <DemoSection title="Disabled" :code="disabledCode">
      <div class="flex flex-wrap gap-6">
        <bl-switch disabled>Disabled Off</bl-switch>
        <bl-switch disabled checked>Disabled On</bl-switch>
      </div>
    </DemoSection>

    <!-- Custom Colors -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Customization
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        To customize colors for the switch component, you can utilize CSS properties
        <code>--bl-switch-color-on</code> and <code>--bl-switch-color-off</code>. We strongly
        advise against customizing switch with any colors other than success (indicating
        <em>on</em>) and danger (indicating <em>off</em>) colors.
      </p>
    </div>

    <DemoSection title="Custom Colors" :code="customColorsCode">
      <div class="flex flex-wrap gap-6">
        <bl-switch checked style="--bl-switch-color-on: var(--bl-color-success)">Success</bl-switch>
        <bl-switch checked style="--bl-switch-color-on: var(--bl-color-danger)">Danger</bl-switch>
        <bl-switch checked style="--bl-switch-color-on: var(--bl-color-info)">Info</bl-switch>
        <bl-switch
          :checked="notificationsEnabled"
          style="
            --bl-switch-color-on: var(--bl-color-success);
            --bl-switch-color-off: var(--bl-color-danger);
          "
          @bl-switch-toggle="notificationsEnabled = ($event as CustomEvent).detail"
        >
          Toggle ({{ notificationsEnabled ? "On" : "Off" }})
        </bl-switch>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The switch component supports RTL (Right-to-Left) text direction. You can enable RTL mode
        by setting the <code>dir</code> attribute on a parent element or the <code>html</code> tag.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex gap-8">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <div class="flex flex-col gap-2">
            <bl-switch checked>Enable notifications</bl-switch>
            <bl-switch>Dark mode</bl-switch>
          </div>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <div class="flex flex-col gap-2">
            <bl-switch checked>تفعيل الإشعارات</bl-switch>
            <bl-switch>الوضع الداكن</bl-switch>
          </div>
        </div>
      </div>
    </DemoSection>

    <!-- Interactive -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Interactive Demo
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Test the <code>bl-switch-toggle</code> event with this interactive example.
      </p>
    </div>

    <DemoSection title="Interactive" :code="interactiveCode">
      <div class="flex items-center gap-4">
        <bl-switch
          :checked="isEnabled"
          @bl-switch-toggle="isEnabled = ($event as CustomEvent).detail"
        >
          Feature Toggle
        </bl-switch>
        <span class="text-neutral-dark">
          Status:
          <strong :class="isEnabled ? 'text-green-600' : 'text-red-500'">
            {{ isEnabled ? "Enabled" : "Disabled" }}
          </strong>
        </span>
      </div>
    </DemoSection>
  </div>
</template>
