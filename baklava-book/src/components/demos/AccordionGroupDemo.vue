<script setup lang="ts"></script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Accordion</h4>
      <bl-accordion-group>
        <bl-accordion caption="Section 1">
          <p class="text-neutral-darker dark:text-neutral-light">
            This is the content for section 1. Accordions are useful for organizing content into
            collapsible sections.
          </p>
        </bl-accordion>
        <bl-accordion caption="Section 2">
          <p class="text-neutral-darker dark:text-neutral-light">
            This is the content for section 2. Each section can be expanded or collapsed
            independently.
          </p>
        </bl-accordion>
        <bl-accordion caption="Section 3">
          <p class="text-neutral-darker dark:text-neutral-light">
            This is the content for section 3. You can put any content here including forms, images,
            or other components.
          </p>
        </bl-accordion>
      </bl-accordion-group>
    </div>

    <!-- With Icons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Icons</h4>
      <bl-accordion-group>
        <bl-accordion caption="Account Settings" icon="account">
          <p class="text-neutral-darker dark:text-neutral-light">
            Manage your account information, password, and security settings.
          </p>
        </bl-accordion>
        <bl-accordion caption="Notifications" icon="bell">
          <p class="text-neutral-darker dark:text-neutral-light">
            Configure your notification preferences for email, push, and SMS.
          </p>
        </bl-accordion>
        <bl-accordion caption="Privacy" icon="lock">
          <p class="text-neutral-darker dark:text-neutral-light">
            Control your privacy settings and data sharing preferences.
          </p>
        </bl-accordion>
      </bl-accordion-group>
    </div>

    <!-- Default Open -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Default Open</h4>
      <bl-accordion-group>
        <bl-accordion caption="Expanded by default" open>
          <p class="text-neutral-darker dark:text-neutral-light">
            This accordion is expanded by default using the `open` attribute.
          </p>
        </bl-accordion>
        <bl-accordion caption="Collapsed by default">
          <p class="text-neutral-darker dark:text-neutral-light">
            This accordion is collapsed by default.
          </p>
        </bl-accordion>
      </bl-accordion-group>
    </div>

    <!-- Disabled -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Disabled State</h4>
      <bl-accordion-group>
        <bl-accordion caption="Available Section">
          <p class="text-neutral-darker dark:text-neutral-light">This section is available.</p>
        </bl-accordion>
        <bl-accordion caption="Disabled Section" disabled>
          <p class="text-neutral-darker dark:text-neutral-light">This section is disabled.</p>
        </bl-accordion>
      </bl-accordion-group>
    </div>

    <!-- FAQ Example -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">FAQ Example</h4>
      <bl-accordion-group>
        <bl-accordion caption="What is Baklava Design System?">
          <p class="text-neutral-darker dark:text-neutral-light">
            Baklava is a design system provided by Trendyol to create a consistent UI/UX for
            Trendyol applications. It includes a set of reusable components, design tokens, and
            guidelines.
          </p>
        </bl-accordion>
        <bl-accordion caption="How do I install Baklava?">
          <p class="text-neutral-darker dark:text-neutral-light">
            You can install Baklava via npm: <code>npm install @trendyol/baklava</code>
          </p>
        </bl-accordion>
        <bl-accordion caption="Does Baklava support React and Vue?">
          <p class="text-neutral-darker dark:text-neutral-light">
            Yes! Baklava is built with Web Components, which means it works with any framework
            including React, Vue, Angular, and vanilla JavaScript.
          </p>
        </bl-accordion>
      </bl-accordion-group>
    </div>
  </div>
</template>
