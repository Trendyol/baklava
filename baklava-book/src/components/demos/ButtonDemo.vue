<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

const clickCount = ref(0);

function handleClick() {
  clickCount.value++;
}

// Code examples for each section
const variantsCode = `<bl-button variant="primary">Primary Button</bl-button>
<bl-button variant="secondary">Secondary Button</bl-button>
<bl-button variant="tertiary">Tertiary Button</bl-button>`;

const primaryKindsCode = `<bl-button variant="primary" kind="default">Default</bl-button>
<bl-button variant="primary" kind="neutral">Neutral</bl-button>
<bl-button variant="primary" kind="success">Success</bl-button>
<bl-button variant="primary" kind="danger">Danger</bl-button>`;

const secondaryKindsCode = `<bl-button variant="secondary" kind="default">Default</bl-button>
<bl-button variant="secondary" kind="neutral">Neutral</bl-button>
<bl-button variant="secondary" kind="success">Success</bl-button>
<bl-button variant="secondary" kind="danger">Danger</bl-button>`;

const tertiaryKindsCode = `<bl-button variant="tertiary" kind="default">Default</bl-button>
<bl-button variant="tertiary" kind="neutral">Neutral</bl-button>
<bl-button variant="tertiary" kind="success">Success</bl-button>
<bl-button variant="tertiary" kind="danger">Danger</bl-button>`;

const sizesCode = `<bl-button size="large">Large</bl-button>
<bl-button size="medium">Medium</bl-button>
<bl-button size="small">Small</bl-button>`;

const iconsCode = `<bl-button icon="plus">Add Item</bl-button>
<bl-button variant="secondary" icon="settings">Settings</bl-button>
<bl-button variant="tertiary" icon="info">Info</bl-button>`;

const iconOnlyCode = `<bl-button icon="heart" label="Favorite"></bl-button>
<bl-button icon="edit" label="Edit" variant="secondary"></bl-button>
<bl-button icon="delete" label="Delete" variant="tertiary" kind="danger"></bl-button>`;

const blockLevelCode = `<bl-button style="--bl-button-display: block">Block Level Button</bl-button>`;

const loadingCode = `<bl-button loading>Loading</bl-button>
<bl-button loading loading-label="Saving...">Save</bl-button>
<bl-button loading variant="secondary">Processing</bl-button>`;

const disabledCode = `<bl-button disabled>Disabled Primary</bl-button>
<bl-button disabled variant="secondary">Disabled Secondary</bl-button>
<bl-button disabled variant="tertiary">Disabled Tertiary</bl-button>`;

const formCode = `<form action="/form/message" method="POST">
  <bl-textarea name="message" placeholder="Your message"></bl-textarea>
  <bl-button type="submit">Send</bl-button>
</form>`;

const interactiveCode = `<script setup>
import { ref } from "vue";

const clickCount = ref(0);

function handleClick() {
  clickCount.value++;
}
<\/script>

<template>
  <bl-button @bl-click="handleClick">Click me!</bl-button>
  <span>Clicked: {{ clickCount }} times</span>
</template>`;

const rtlCode = `<!-- LTR (Left-to-Right) -->
<div>
  <bl-button icon="arrow_right">Next</bl-button>
  <bl-button icon="settings">Settings</bl-button>
</div>

<!-- RTL (Right-to-Left) -->
<div dir="rtl">
  <bl-button icon="arrow_left">التالي</bl-button>
  <bl-button icon="settings">الإعدادات</bl-button>
</div>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Buttons allow users to take actions, and make choices with a single tap.
      </p>

      <bl-alert variant="warning" icon class="my-4">
        Inline styles in examples are only for <strong>demo purposes</strong>. Use regular CSS
        classes or tag selectors to set styles.
      </bl-alert>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Usage Guidelines
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>A button should contain at least one text, icon or both (text + icon).</li>
        <li>The first letter of the word on the buttons is capitalized and the rest is lowercase.</li>
        <li>The icons on the buttons are left aligned.</li>
        <li>Button texts are limited to one line.</li>
      </ul>
    </div>

    <!-- Button Variants -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Button Variants
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        We have 3 variants for each button: <strong>Primary</strong>, <strong>Secondary</strong> and
        <strong>Tertiary</strong>.
      </p>
    </div>

    <DemoSection title="Variants" :code="variantsCode">
      <div class="flex flex-wrap gap-3">
        <bl-button variant="primary">Primary Button</bl-button>
        <bl-button variant="secondary">Secondary Button</bl-button>
        <bl-button variant="tertiary">Tertiary Button</bl-button>
      </div>
    </DemoSection>

    <!-- Primary Buttons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Primary Buttons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Primary buttons are used for main actions of the screens. Like a submit button in a form or
        main button of a dialog. It can have 4 different "kinds":
        <code>default</code>, <code>neutral</code>, <code>success</code> and <code>danger</code>.
      </p>
    </div>

    <DemoSection title="Primary Button Kinds" :code="primaryKindsCode">
      <div class="flex flex-wrap gap-3">
        <bl-button variant="primary" kind="default">Default</bl-button>
        <bl-button variant="primary" kind="neutral">Neutral</bl-button>
        <bl-button variant="primary" kind="success">Success</bl-button>
        <bl-button variant="primary" kind="danger">Danger</bl-button>
      </div>
    </DemoSection>

    <!-- Secondary Buttons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Secondary Buttons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Secondary buttons represent the important actions in the app. But not the primary ones. They
        work with all the kinds.
      </p>
    </div>

    <DemoSection title="Secondary Button Kinds" :code="secondaryKindsCode">
      <div class="flex flex-wrap gap-3">
        <bl-button variant="secondary" kind="default">Default</bl-button>
        <bl-button variant="secondary" kind="neutral">Neutral</bl-button>
        <bl-button variant="secondary" kind="success">Success</bl-button>
        <bl-button variant="secondary" kind="danger">Danger</bl-button>
      </div>
    </DemoSection>

    <!-- Tertiary Buttons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Tertiary Buttons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Tertiary buttons are typically used for less important actions which also have all the
        kinds.
      </p>
    </div>

    <DemoSection title="Tertiary Button Kinds" :code="tertiaryKindsCode">
      <div class="flex flex-wrap gap-3">
        <bl-button variant="tertiary" kind="default">Default</bl-button>
        <bl-button variant="tertiary" kind="neutral">Neutral</bl-button>
        <bl-button variant="tertiary" kind="success">Success</bl-button>
        <bl-button variant="tertiary" kind="danger">Danger</bl-button>
      </div>
    </DemoSection>

    <!-- Button Sizes -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Button Sizes</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        We have 3 sizes of buttons: <strong>Large</strong>, <strong>Medium</strong>,
        <strong>Small</strong>. Default size is <strong>Medium</strong>.
      </p>
    </div>

    <DemoSection title="Sizes" :code="sizesCode">
      <div class="flex flex-wrap items-center gap-3">
        <bl-button size="large">Large</bl-button>
        <bl-button size="medium">Medium</bl-button>
        <bl-button size="small">Small</bl-button>
      </div>
    </DemoSection>

    <!-- Icon Buttons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Icon Buttons</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        To boost UX, you might want to add icons to your button. Because human brain recognize icons
        more easily than text. Our icons are defined to be left of the default slot. To be able to
        use icon with button, you should give the name of icon to <code>icon</code> attribute.
      </p>
    </div>

    <DemoSection title="With Icons" :code="iconsCode">
      <div class="flex flex-wrap gap-3">
        <bl-button icon="plus">Add Item</bl-button>
        <bl-button variant="secondary" icon="settings">Settings</bl-button>
        <bl-button variant="tertiary" icon="info">Info</bl-button>
      </div>
    </DemoSection>

    <!-- Icon Only Buttons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Icon Only Buttons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Icon Only Buttons commonly used for toggle actions. (Ex.: add item to your favorites.) Use
        the <code>label</code> attribute for accessibility.
      </p>
    </div>

    <DemoSection title="Icon Only" :code="iconOnlyCode">
      <div class="flex flex-wrap gap-3">
        <bl-button icon="heart" label="Favorite"></bl-button>
        <bl-button icon="edit" label="Edit" variant="secondary"></bl-button>
        <bl-button icon="delete" label="Delete" variant="tertiary" kind="danger"></bl-button>
        <bl-button icon="copy" label="Copy" variant="tertiary"></bl-button>
        <bl-button icon="share" label="Share" variant="tertiary"></bl-button>
      </div>
    </DemoSection>

    <!-- Block Level Buttons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Block Level Buttons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        By default our buttons are <code>inline-block</code>. If you want to make it a block level
        button that will fill its container, you need to set
        <code>--bl-button-display</code> property to <code>block</code>.
      </p>
    </div>

    <DemoSection title="Block Level" :code="blockLevelCode">
      <div class="max-w-md">
        <bl-button style="--bl-button-display: block" icon="check_fill">
          Block Level Button
        </bl-button>
      </div>
    </DemoSection>

    <!-- Loading Buttons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Loading Buttons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Button can be set in loading state. In this state button becomes disabled with a loading
        indicator. You can set this state by setting <code>loading</code> attribute. Additionally,
        button icons are overridden by the bl-spinner during the loading state. A custom loading
        text can be also set with <code>loading-label</code> attribute.
      </p>
    </div>

    <DemoSection title="Loading States" :code="loadingCode">
      <div class="flex flex-wrap gap-3">
        <bl-button loading>Loading</bl-button>
        <bl-button loading loading-label="Saving...">Save</bl-button>
        <bl-button loading variant="secondary">Processing</bl-button>
        <bl-button loading size="small">Small Loading</bl-button>
      </div>
    </DemoSection>

    <!-- Disabled Buttons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Disabled Buttons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Buttons can be disabled by adding the <code>disabled</code> attribute. Primary and Secondary
        disabled buttons share the same style, while Tertiary buttons keep their transparent
        backgrounds.
      </p>
    </div>

    <DemoSection title="Disabled States" :code="disabledCode">
      <div class="flex flex-wrap gap-3">
        <bl-button disabled>Disabled Primary</bl-button>
        <bl-button disabled variant="secondary">Disabled Secondary</bl-button>
        <bl-button disabled variant="tertiary">Disabled Tertiary</bl-button>
      </div>
    </DemoSection>

    <!-- Using with Forms -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Using Button with Forms
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Button can be used as the submit button of an HTML form. To use it as a submit button, you
        need to set <code>type</code> attribute to <code>submit</code>. The button automatically
        finds its wrapping form and submits it when clicked.
      </p>
    </div>

    <DemoSection title="Form Submit" :code="formCode">
      <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg">
        <p class="text-sm text-neutral-dark mb-2">Example form structure:</p>
        <code class="text-xs text-primary">&lt;bl-button type="submit"&gt;Send&lt;/bl-button&gt;</code>
      </div>
    </DemoSection>

    <!-- Interactive Demo -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Interactive Demo
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Test button click events with this interactive example.
      </p>
    </div>

    <DemoSection title="Interactive" :code="interactiveCode">
      <div class="flex items-center gap-4">
        <bl-button @bl-click="handleClick">Click me!</bl-button>
        <span class="text-neutral-dark">
          Clicked: <strong class="text-primary">{{ clickCount }}</strong> times
        </span>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The button component supports RTL (Right-to-Left) text direction. You can enable RTL mode by
        setting the <code>dir</code> attribute on a parent element or the <code>html</code> tag.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex gap-8">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <div class="flex gap-2">
            <bl-button icon="arrow_right">Next</bl-button>
            <bl-button icon="settings">Settings</bl-button>
          </div>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <div class="flex gap-2">
            <bl-button icon="arrow_left">التالي</bl-button>
            <bl-button icon="settings">الإعدادات</bl-button>
          </div>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
