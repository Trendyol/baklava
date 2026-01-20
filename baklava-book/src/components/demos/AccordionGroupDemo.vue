<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";

const basicCode = `<bl-accordion-group>
  <bl-accordion caption="Section 1">
    Content for section 1.
  </bl-accordion>
  <bl-accordion caption="Section 2">
    Content for section 2.
  </bl-accordion>
  <bl-accordion caption="Section 3">
    Content for section 3.
  </bl-accordion>
</bl-accordion-group>`;

const multipleCode = `<!-- Allow multiple accordions to be open at once -->
<bl-accordion-group multiple>
  <bl-accordion caption="Section 1">
    Content for section 1.
  </bl-accordion>
  <bl-accordion caption="Section 2">
    Content for section 2.
  </bl-accordion>
  <bl-accordion caption="Section 3">
    Content for section 3.
  </bl-accordion>
</bl-accordion-group>`;

const iconsCode = `<bl-accordion-group>
  <bl-accordion caption="Account Settings" icon="account">
    Manage your account information.
  </bl-accordion>
  <bl-accordion caption="Notifications" icon="bell">
    Configure your notification preferences.
  </bl-accordion>
  <bl-accordion caption="Privacy" icon="lock">
    Control your privacy settings.
  </bl-accordion>
</bl-accordion-group>`;

const openCode = `<!-- Use the open attribute for default expanded state -->
<bl-accordion-group>
  <bl-accordion caption="Expanded by default" open>
    This accordion is expanded by default.
  </bl-accordion>
  <bl-accordion caption="Collapsed by default">
    This accordion is collapsed by default.
  </bl-accordion>
</bl-accordion-group>`;

const disabledCode = `<bl-accordion-group>
  <bl-accordion caption="Available Section">
    This section is available.
  </bl-accordion>
  <bl-accordion caption="Disabled Section" disabled>
    This section is disabled and cannot be expanded.
  </bl-accordion>
</bl-accordion-group>`;

const nestedContentCode = `<bl-accordion-group>
  <bl-accordion caption="User Profile">
    <div class="space-y-3">
      <bl-input label="Name" placeholder="Enter your name"></bl-input>
      <bl-input label="Email" placeholder="Enter your email"></bl-input>
      <bl-button>Save Changes</bl-button>
    </div>
  </bl-accordion>
  <bl-accordion caption="Preferences">
    <div class="space-y-2">
      <bl-switch>Enable notifications</bl-switch>
      <bl-switch>Dark mode</bl-switch>
    </div>
  </bl-accordion>
</bl-accordion-group>`;

const rtlCode = `<!-- LTR (Left-to-Right) -->
<bl-accordion-group>
  <bl-accordion caption="Section 1" icon="info">
    First section content.
  </bl-accordion>
  <bl-accordion caption="Section 2" icon="star">
    Second section content.
  </bl-accordion>
</bl-accordion-group>

<!-- RTL (Right-to-Left) -->
<div dir="rtl">
  <bl-accordion-group>
    <bl-accordion caption="القسم الأول" icon="info">
      محتوى القسم الأول.
    </bl-accordion>
    <bl-accordion caption="القسم الثاني" icon="star">
      محتوى القسم الثاني.
    </bl-accordion>
  </bl-accordion-group>
</div>`;

const faqCode = `<bl-accordion-group>
  <bl-accordion caption="What is Baklava Design System?">
    Baklava is a design system provided by Trendyol...
  </bl-accordion>
  <bl-accordion caption="How do I install Baklava?">
    You can install Baklava via npm: npm install @trendyol/baklava
  </bl-accordion>
  <bl-accordion caption="Does Baklava support React and Vue?">
    Yes! Baklava works with any framework.
  </bl-accordion>
</bl-accordion-group>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        The Accordion Group component combines accordions and only allows one accordion to be open
        by default. Use the <code>multiple</code> attribute to allow multiple accordions to be open
        at the same time.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Component Structure
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>
          <code>bl-accordion-group</code> - Container that manages accordion behavior
        </li>
        <li>
          <code>bl-accordion</code> - Individual accordion item with caption and content
        </li>
      </ul>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Key Features
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>
          By default, only one accordion can be open at a time (use <code>multiple</code> to
          change)
        </li>
        <li>Add icons to accordions using the <code>icon</code> attribute</li>
        <li>Set initial open state with the <code>open</code> attribute</li>
        <li>Disable individual accordions with the <code>disabled</code> attribute</li>
      </ul>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        By default, only one accordion can be open at a time. Opening a new accordion automatically
        closes the previously opened one.
      </p>
    </div>

    <DemoSection title="Basic Accordion" :code="basicCode">
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
    </DemoSection>

    <!-- Allow Multiple -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Allow Multiple
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Allow multiple accordions to be open at once with the <code>multiple</code> attribute on
        <code>bl-accordion-group</code>.
      </p>
    </div>

    <DemoSection title="Multiple Open" :code="multipleCode">
      <bl-accordion-group multiple>
        <bl-accordion caption="Section 1">
          <p class="text-neutral-darker dark:text-neutral-light">
            You can open multiple sections at the same time when the
            <code>multiple</code> attribute is set.
          </p>
        </bl-accordion>
        <bl-accordion caption="Section 2">
          <p class="text-neutral-darker dark:text-neutral-light">
            Try opening this section without closing Section 1. Both will remain open!
          </p>
        </bl-accordion>
        <bl-accordion caption="Section 3">
          <p class="text-neutral-darker dark:text-neutral-light">
            All three sections can be open simultaneously.
          </p>
        </bl-accordion>
      </bl-accordion-group>
    </DemoSection>

    <!-- With Icons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">With Icons</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Add icons to accordions using the <code>icon</code> attribute for better visual context.
      </p>
    </div>

    <DemoSection title="With Icons" :code="iconsCode">
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
        <bl-accordion caption="Billing" icon="credit_card">
          <p class="text-neutral-darker dark:text-neutral-light">
            Manage your payment methods and billing information.
          </p>
        </bl-accordion>
      </bl-accordion-group>
    </DemoSection>

    <!-- Default Open -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Default Open</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use the <code>open</code> attribute on <code>bl-accordion</code> to make it expanded by
        default.
      </p>
    </div>

    <DemoSection title="Default Open" :code="openCode">
      <bl-accordion-group>
        <bl-accordion caption="Expanded by default" open>
          <p class="text-neutral-darker dark:text-neutral-light">
            This accordion is expanded by default using the <code>open</code> attribute.
          </p>
        </bl-accordion>
        <bl-accordion caption="Collapsed by default">
          <p class="text-neutral-darker dark:text-neutral-light">
            This accordion is collapsed by default.
          </p>
        </bl-accordion>
      </bl-accordion-group>
    </DemoSection>

    <!-- Disabled -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Disabled State
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Disable individual accordions with the <code>disabled</code> attribute. Disabled accordions
        cannot be expanded or collapsed.
      </p>
    </div>

    <DemoSection title="Disabled State" :code="disabledCode">
      <bl-accordion-group>
        <bl-accordion caption="Available Section">
          <p class="text-neutral-darker dark:text-neutral-light">This section is available.</p>
        </bl-accordion>
        <bl-accordion caption="Disabled Section" disabled>
          <p class="text-neutral-darker dark:text-neutral-light">
            This section is disabled and cannot be expanded.
          </p>
        </bl-accordion>
        <bl-accordion caption="Another Available Section">
          <p class="text-neutral-darker dark:text-neutral-light">
            This section is also available.
          </p>
        </bl-accordion>
      </bl-accordion-group>
    </DemoSection>

    <!-- Nested Content -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Nested Content
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Accordions can contain any content including forms, other components, or rich content.
      </p>
    </div>

    <DemoSection title="Nested Content" :code="nestedContentCode">
      <bl-accordion-group>
        <bl-accordion caption="User Profile" icon="account">
          <div class="space-y-4 py-2">
            <bl-input label="Name" placeholder="Enter your name"></bl-input>
            <bl-input label="Email" placeholder="Enter your email" type="email"></bl-input>
            <bl-button variant="primary">Save Changes</bl-button>
          </div>
        </bl-accordion>
        <bl-accordion caption="Preferences" icon="settings">
          <div class="space-y-3 py-2">
            <div class="flex items-center justify-between">
              <span class="text-neutral-darker dark:text-neutral-light">Enable notifications</span>
              <bl-switch></bl-switch>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-neutral-darker dark:text-neutral-light">Dark mode</span>
              <bl-switch></bl-switch>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-neutral-darker dark:text-neutral-light">Email updates</span>
              <bl-switch></bl-switch>
            </div>
          </div>
        </bl-accordion>
      </bl-accordion-group>
    </DemoSection>

    <!-- FAQ Example -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">FAQ Example</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        A common use case for accordions is building FAQ (Frequently Asked Questions) sections.
      </p>
    </div>

    <DemoSection title="FAQ Example" :code="faqCode">
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
            You can install Baklava via npm: <code>npm install @trendyol/baklava</code>. Then import
            the components and styles in your application.
          </p>
        </bl-accordion>
        <bl-accordion caption="Does Baklava support React and Vue?">
          <p class="text-neutral-darker dark:text-neutral-light">
            Yes! Baklava is built with Web Components, which means it works with any framework
            including React, Vue, Angular, and vanilla JavaScript.
          </p>
        </bl-accordion>
        <bl-accordion caption="Is Baklava free to use?">
          <p class="text-neutral-darker dark:text-neutral-light">
            Yes, Baklava is open source and free to use in your projects. Check out the
            <a href="https://github.com/Trendyol/baklava" class="text-primary underline"
              >GitHub repository</a
            >
            for more information.
          </p>
        </bl-accordion>
      </bl-accordion-group>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The accordion group component supports RTL (Right-to-Left) text direction. Icons and expand
        indicators are automatically mirrored in RTL mode.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex flex-col md:flex-row gap-8">
        <div class="flex-1">
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <bl-accordion-group>
            <bl-accordion caption="Section 1" icon="info">
              <p class="text-neutral-darker dark:text-neutral-light">
                First section content. Lorem ipsum dolor sit amet.
              </p>
            </bl-accordion>
            <bl-accordion caption="Section 2" icon="star">
              <p class="text-neutral-darker dark:text-neutral-light">
                Second section content. Consectetur adipisicing elit.
              </p>
            </bl-accordion>
            <bl-accordion caption="Section 3" icon="check">
              <p class="text-neutral-darker dark:text-neutral-light">
                Third section content. Adipisci architecto debitis.
              </p>
            </bl-accordion>
          </bl-accordion-group>
        </div>
        <div class="flex-1" dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <bl-accordion-group>
            <bl-accordion caption="القسم الأول" icon="info">
              <p class="text-neutral-darker dark:text-neutral-light">
                محتوى القسم الأول. هذا مثال للنص العربي.
              </p>
            </bl-accordion>
            <bl-accordion caption="القسم الثاني" icon="star">
              <p class="text-neutral-darker dark:text-neutral-light">
                محتوى القسم الثاني. يمكن إضافة أي محتوى هنا.
              </p>
            </bl-accordion>
            <bl-accordion caption="القسم الثالث" icon="check">
              <p class="text-neutral-darker dark:text-neutral-light">
                محتوى القسم الثالث. مثال على النص العربي.
              </p>
            </bl-accordion>
          </bl-accordion-group>
        </div>
      </div>
    </DemoSection>

    <!-- Sub-Component API -->
    <div class="mt-12 border-t border-neutral-lighter dark:border-neutral-darker pt-8">
      <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-6">
        Sub-Component API Reference
      </h2>

      <!-- bl-accordion API -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
          bl-accordion
        </h3>
        <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
          Individual accordion item within an accordion group.
        </p>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Attribute</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Type</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Default</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <td class="py-3 px-4"><code class="text-primary">caption</code></td>
                <td class="py-3 px-4 text-neutral-dark font-mono text-xs">string</td>
                <td class="py-3 px-4 text-neutral-dark">-</td>
                <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                  The title/header text of the accordion
                </td>
              </tr>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <td class="py-3 px-4"><code class="text-primary">icon</code></td>
                <td class="py-3 px-4 text-neutral-dark font-mono text-xs">BaklavaIcon</td>
                <td class="py-3 px-4 text-neutral-dark">-</td>
                <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                  Icon to display before the caption
                </td>
              </tr>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <td class="py-3 px-4"><code class="text-primary">open</code></td>
                <td class="py-3 px-4 text-neutral-dark font-mono text-xs">boolean</td>
                <td class="py-3 px-4 text-neutral-dark">false</td>
                <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                  Whether the accordion is expanded
                </td>
              </tr>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <td class="py-3 px-4"><code class="text-primary">disabled</code></td>
                <td class="py-3 px-4 text-neutral-dark font-mono text-xs">boolean</td>
                <td class="py-3 px-4 text-neutral-dark">false</td>
                <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                  Whether the accordion is disabled
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
