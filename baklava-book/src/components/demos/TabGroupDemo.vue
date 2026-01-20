<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";

const basicCode = `<bl-tab-group>
  <bl-tab slot="tabs" name="tab1" caption="Tab 1" selected></bl-tab>
  <bl-tab slot="tabs" name="tab2" caption="Tab 2"></bl-tab>
  <bl-tab slot="tabs" name="tab3" caption="Tab 3"></bl-tab>

  <bl-tab-panel tab="tab1">Content for Tab 1</bl-tab-panel>
  <bl-tab-panel tab="tab2">Content for Tab 2</bl-tab-panel>
  <bl-tab-panel tab="tab3">Content for Tab 3</bl-tab-panel>
</bl-tab-group>`;

const iconsCode = `<bl-tab-group>
  <bl-tab slot="tabs" name="home" caption="Home" icon="home" selected></bl-tab>
  <bl-tab slot="tabs" name="settings" caption="Settings" icon="settings"></bl-tab>
  <bl-tab slot="tabs" name="profile" caption="Profile" icon="account"></bl-tab>

  <bl-tab-panel tab="home">Home content</bl-tab-panel>
  <bl-tab-panel tab="settings">Settings content</bl-tab-panel>
  <bl-tab-panel tab="profile">Profile content</bl-tab-panel>
</bl-tab-group>`;

const badgesCode = `<bl-tab-group>
  <bl-tab slot="tabs" name="inbox" caption="Inbox" badge="5" selected></bl-tab>
  <bl-tab slot="tabs" name="sent" caption="Sent" badge="12"></bl-tab>
  <bl-tab slot="tabs" name="drafts" caption="Drafts" badge="3"></bl-tab>

  <bl-tab-panel tab="inbox">Inbox messages</bl-tab-panel>
  <bl-tab-panel tab="sent">Sent messages</bl-tab-panel>
  <bl-tab-panel tab="drafts">Draft messages</bl-tab-panel>
</bl-tab-group>`;

const disabledCode = `<bl-tab-group>
  <bl-tab slot="tabs" name="active" caption="Active" selected></bl-tab>
  <bl-tab slot="tabs" name="disabled" caption="Disabled" disabled></bl-tab>
  <bl-tab slot="tabs" name="other" caption="Other"></bl-tab>

  <bl-tab-panel tab="active">Active tab content</bl-tab-panel>
  <bl-tab-panel tab="other">Other tab content</bl-tab-panel>
</bl-tab-group>`;

const eventCode = `<bl-tab-group @bl-tab-change="handleTabChange">
  ...
</bl-tab-group>

<script>
function handleTabChange(event) {
  console.log('Selected tab:', event.detail);
}
<\/script>`;

const rtlCode = `<!-- LTR (Left-to-Right) -->
<bl-tab-group>
  <bl-tab slot="tabs" name="home" caption="Home" selected></bl-tab>
  <bl-tab slot="tabs" name="settings" caption="Settings"></bl-tab>
  <bl-tab-panel tab="home">Home content</bl-tab-panel>
  <bl-tab-panel tab="settings">Settings content</bl-tab-panel>
</bl-tab-group>

<!-- RTL (Right-to-Left) -->
<div dir="rtl">
  <bl-tab-group>
    <bl-tab slot="tabs" name="home" caption="الرئيسية" selected></bl-tab>
    <bl-tab slot="tabs" name="settings" caption="الإعدادات"></bl-tab>
    <bl-tab-panel tab="home">محتوى الرئيسية</bl-tab-panel>
    <bl-tab-panel tab="settings">محتوى الإعدادات</bl-tab-panel>
  </bl-tab-group>
</div>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Tab group component organizes content into separate views where only one view is visible at
        a time. Users can switch between tabs without leaving the page.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Structure
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>
          <code>bl-tab-group</code> - Container for tabs and panels
        </li>
        <li>
          <code>bl-tab</code> with <code>slot="tabs"</code> - Individual tab buttons
        </li>
        <li>
          <code>bl-tab-panel</code> - Content panels associated with each tab
        </li>
        <li>
          Connect tabs to panels using <code>name</code> and <code>tab</code> attributes
        </li>
      </ul>
    </div>

    <!-- Basic -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Tabs</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        A simple tab group with multiple tabs. Use <code>selected</code> attribute to set the
        default active tab.
      </p>
    </div>

    <DemoSection title="Basic Tabs" :code="basicCode">
      <bl-tab-group>
        <bl-tab slot="tabs" name="tab1" caption="Tab 1" selected></bl-tab>
        <bl-tab slot="tabs" name="tab2" caption="Tab 2"></bl-tab>
        <bl-tab slot="tabs" name="tab3" caption="Tab 3"></bl-tab>

        <bl-tab-panel tab="tab1">Content for Tab 1</bl-tab-panel>
        <bl-tab-panel tab="tab2">Content for Tab 2</bl-tab-panel>
        <bl-tab-panel tab="tab3">Content for Tab 3</bl-tab-panel>
      </bl-tab-group>
    </DemoSection>

    <!-- With Icons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">With Icons</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Add <code>icon</code> attribute to tabs for better visual recognition.
      </p>
    </div>

    <DemoSection title="With Icons" :code="iconsCode">
      <bl-tab-group>
        <bl-tab slot="tabs" name="home" caption="Home" icon="home" selected></bl-tab>
        <bl-tab slot="tabs" name="settings" caption="Settings" icon="settings"></bl-tab>
        <bl-tab slot="tabs" name="profile" caption="Profile" icon="account"></bl-tab>

        <bl-tab-panel tab="home">Home content</bl-tab-panel>
        <bl-tab-panel tab="settings">Settings content</bl-tab-panel>
        <bl-tab-panel tab="profile">Profile content</bl-tab-panel>
      </bl-tab-group>
    </DemoSection>

    <!-- With Badges -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">With Badges</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Add <code>badge</code> attribute to display a notification badge on tabs.
      </p>
    </div>

    <DemoSection title="With Badges" :code="badgesCode">
      <bl-tab-group>
        <bl-tab slot="tabs" name="inbox" caption="Inbox" badge="5" selected></bl-tab>
        <bl-tab slot="tabs" name="sent" caption="Sent" badge="12"></bl-tab>
        <bl-tab slot="tabs" name="drafts" caption="Drafts" badge="3"></bl-tab>

        <bl-tab-panel tab="inbox">Inbox messages</bl-tab-panel>
        <bl-tab-panel tab="sent">Sent messages</bl-tab-panel>
        <bl-tab-panel tab="drafts">Draft messages</bl-tab-panel>
      </bl-tab-group>
    </DemoSection>

    <!-- Disabled Tab -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Disabled Tab</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Add <code>disabled</code> attribute to make a tab unclickable.
      </p>
    </div>

    <DemoSection title="Disabled Tab" :code="disabledCode">
      <bl-tab-group>
        <bl-tab slot="tabs" name="active" caption="Active" selected></bl-tab>
        <bl-tab slot="tabs" name="disabled" caption="Disabled" disabled></bl-tab>
        <bl-tab slot="tabs" name="other" caption="Other"></bl-tab>

        <bl-tab-panel tab="active">Active tab content</bl-tab-panel>
        <bl-tab-panel tab="other">Other tab content</bl-tab-panel>
      </bl-tab-group>
    </DemoSection>

    <!-- Tab Change Event -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Tab Change Event
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Listen to <code>bl-tab-change</code> event to handle tab changes programmatically.
      </p>
    </div>

    <DemoSection title="Tab Change Event" :code="eventCode">
      <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg">
        <code class="text-sm text-neutral-darkest dark:text-neutral-light">
          &lt;bl-tab-group @bl-tab-change="handleTabChange"&gt;...&lt;/bl-tab-group&gt;
        </code>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The tab group component supports RTL (Right-to-Left) text direction. Tabs are automatically
        aligned from right to left in RTL mode.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="space-y-6">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <bl-tab-group>
            <bl-tab slot="tabs" name="homeLTR" caption="Home" selected></bl-tab>
            <bl-tab slot="tabs" name="settingsLTR" caption="Settings"></bl-tab>
            <bl-tab slot="tabs" name="profileLTR" caption="Profile"></bl-tab>
            <bl-tab-panel tab="homeLTR">Home content</bl-tab-panel>
            <bl-tab-panel tab="settingsLTR">Settings content</bl-tab-panel>
            <bl-tab-panel tab="profileLTR">Profile content</bl-tab-panel>
          </bl-tab-group>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <bl-tab-group>
            <bl-tab slot="tabs" name="homeRTL" caption="الرئيسية" selected></bl-tab>
            <bl-tab slot="tabs" name="settingsRTL" caption="الإعدادات"></bl-tab>
            <bl-tab slot="tabs" name="profileRTL" caption="الملف الشخصي"></bl-tab>
            <bl-tab-panel tab="homeRTL">محتوى الرئيسية</bl-tab-panel>
            <bl-tab-panel tab="settingsRTL">محتوى الإعدادات</bl-tab-panel>
            <bl-tab-panel tab="profileRTL">محتوى الملف الشخصي</bl-tab-panel>
          </bl-tab-group>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
