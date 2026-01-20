<script setup lang="ts"></script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Tabs</h4>
      <bl-tab-group>
        <bl-tab slot="tabs" name="tab1" caption="Tab 1" selected></bl-tab>
        <bl-tab slot="tabs" name="tab2" caption="Tab 2"></bl-tab>
        <bl-tab slot="tabs" name="tab3" caption="Tab 3"></bl-tab>

        <bl-tab-panel tab="tab1">Content for Tab 1</bl-tab-panel>
        <bl-tab-panel tab="tab2">Content for Tab 2</bl-tab-panel>
        <bl-tab-panel tab="tab3">Content for Tab 3</bl-tab-panel>
      </bl-tab-group>
    </div>

    <!-- With Icons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Icons</h4>
      <bl-tab-group>
        <bl-tab slot="tabs" name="home" caption="Home" icon="home" selected></bl-tab>
        <bl-tab slot="tabs" name="settings" caption="Settings" icon="settings"></bl-tab>
        <bl-tab slot="tabs" name="profile" caption="Profile" icon="account"></bl-tab>

        <bl-tab-panel tab="home">Home content</bl-tab-panel>
        <bl-tab-panel tab="settings">Settings content</bl-tab-panel>
        <bl-tab-panel tab="profile">Profile content</bl-tab-panel>
      </bl-tab-group>
    </div>

    <!-- With Badges -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Badges</h4>
      <bl-tab-group>
        <bl-tab slot="tabs" name="inbox" caption="Inbox" badge="5" selected></bl-tab>
        <bl-tab slot="tabs" name="sent" caption="Sent" badge="12"></bl-tab>
        <bl-tab slot="tabs" name="drafts" caption="Drafts" badge="3"></bl-tab>

        <bl-tab-panel tab="inbox">Inbox messages</bl-tab-panel>
        <bl-tab-panel tab="sent">Sent messages</bl-tab-panel>
        <bl-tab-panel tab="drafts">Draft messages</bl-tab-panel>
      </bl-tab-group>
    </div>

    <!-- Disabled Tab -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Disabled Tab</h4>
      <bl-tab-group>
        <bl-tab slot="tabs" name="active" caption="Active" selected></bl-tab>
        <bl-tab slot="tabs" name="disabled" caption="Disabled" disabled></bl-tab>
        <bl-tab slot="tabs" name="other" caption="Other"></bl-tab>

        <bl-tab-panel tab="active">Active tab content</bl-tab-panel>
        <bl-tab-panel tab="other">Other tab content</bl-tab-panel>
      </bl-tab-group>
    </div>
  </div>
</template>
