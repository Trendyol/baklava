<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

const selectedAnimals = ref<string[]>([]);

const basicCode = `<bl-checkbox-group label="Favorite animals" name="favoriteAnimals">
  <bl-checkbox value="cat">Cat</bl-checkbox>
  <bl-checkbox value="dog">Dog</bl-checkbox>
  <bl-checkbox value="bird">Bird</bl-checkbox>
</bl-checkbox-group>`;

const preselectedCode = `<bl-checkbox-group label="Favorite animals" name="favoriteAnimals" value='["dog","bird"]'>
  <bl-checkbox value="cat">Cat</bl-checkbox>
  <bl-checkbox value="dog">Dog</bl-checkbox>
  <bl-checkbox value="bird">Bird</bl-checkbox>
</bl-checkbox-group>`;

const horizontalCode = `<style>
  .horizontal-group {
    --bl-checkbox-direction: row;
  }
</style>

<bl-checkbox-group class="horizontal-group" label="Select options">
  <bl-checkbox value="option1">Option 1</bl-checkbox>
  <bl-checkbox value="option2">Option 2</bl-checkbox>
  <bl-checkbox value="option3">Option 3</bl-checkbox>
</bl-checkbox-group>`;

const validationCode = `<bl-checkbox-group label="Terms" required>
  <bl-checkbox value="terms">I accept the terms and conditions</bl-checkbox>
</bl-checkbox-group>`;

const customInvalidCode = `<bl-checkbox-group
  label="Preferences"
  required
  invalid-text="Please select at least 1 option"
>
  <bl-checkbox value="email">Email notifications</bl-checkbox>
  <bl-checkbox value="sms">SMS notifications</bl-checkbox>
</bl-checkbox-group>`;

const formCode = `<form novalidate>
  <bl-checkbox-group label="Favorite Animals" name="favoriteAnimals" required>
    <bl-checkbox value="cat">Cat</bl-checkbox>
    <bl-checkbox value="dog">Dog</bl-checkbox>
  </bl-checkbox-group>
  <bl-button type="submit">Submit</bl-button>
</form>`;

const interactiveCode = `<script setup>
import { ref } from "vue";
const selectedAnimals = ref([]);
<\/script>

<template>
  <bl-checkbox-group
    label="Favorite animals"
    @bl-checkbox-group-change="selectedAnimals = $event.detail"
  >
    <bl-checkbox value="cat">Cat</bl-checkbox>
    <bl-checkbox value="dog">Dog</bl-checkbox>
    <bl-checkbox value="bird">Bird</bl-checkbox>
  </bl-checkbox-group>
  <span>Selected: {{ selectedAnimals.join(", ") || "(none)" }}</span>
</template>`;

const rtlCode = `<!-- LTR (Left-to-Right) -->
<bl-checkbox-group label="Select your interests">
  <bl-checkbox value="sports">Sports</bl-checkbox>
  <bl-checkbox value="music">Music</bl-checkbox>
  <bl-checkbox value="reading">Reading</bl-checkbox>
</bl-checkbox-group>

<!-- RTL (Right-to-Left) -->
<div dir="rtl">
  <bl-checkbox-group label="اختر اهتماماتك">
    <bl-checkbox value="sports">الرياضة</bl-checkbox>
    <bl-checkbox value="music">الموسيقى</bl-checkbox>
    <bl-checkbox value="reading">القراءة</bl-checkbox>
  </bl-checkbox-group>
</div>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Checkbox group component can be used to group multiple checkboxes. It handles keyboard
        navigation and highlights active checkbox option while navigating with keyboard.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Keyboard Navigation
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>First <code>Tab</code> focuses on first available option</li>
        <li>Navigate with arrow keys or <code>Tab</code>, <code>Shift+Tab</code> within options</li>
        <li><code>Space</code> key for selecting an option</li>
      </ul>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        A simple checkbox group with multiple options.
      </p>
    </div>

    <DemoSection title="Basic Checkbox Group" :code="basicCode">
      <bl-checkbox-group label="Favorite animals" name="favoriteAnimals">
        <bl-checkbox value="cat">Cat</bl-checkbox>
        <bl-checkbox value="dog">Dog</bl-checkbox>
        <bl-checkbox value="bird">Bird</bl-checkbox>
      </bl-checkbox-group>
    </DemoSection>

    <!-- Preselected Values -->
    <DemoSection title="With Preselected Values" :code="preselectedCode">
      <bl-checkbox-group label="Favorite animals" name="favoriteAnimals2" value='["dog","bird"]'>
        <bl-checkbox value="cat">Cat</bl-checkbox>
        <bl-checkbox value="dog">Dog</bl-checkbox>
        <bl-checkbox value="bird">Bird</bl-checkbox>
      </bl-checkbox-group>
    </DemoSection>

    <!-- Horizontal Layout -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Horizontal Layout
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        By default checkbox options are listed in vertical stack. You can change this by setting
        <code>--bl-checkbox-direction</code> CSS variable as <code>row</code>.
      </p>
    </div>

    <DemoSection title="Horizontal Stack" :code="horizontalCode">
      <bl-checkbox-group
        label="Select options"
        name="horizontalOptions"
        style="--bl-checkbox-direction: row"
      >
        <bl-checkbox value="option1">Option 1</bl-checkbox>
        <bl-checkbox value="option2">Option 2</bl-checkbox>
        <bl-checkbox value="option3">Option 3</bl-checkbox>
      </bl-checkbox-group>
    </DemoSection>

    <!-- Validation -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Checkbox Group Validation
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Checkbox Group component has 'required' validation rule. If there is no selected checkbox in
        checkbox group with 'required' attribute, component will not be validated.
      </p>
    </div>

    <DemoSection title="Required Validation" :code="validationCode">
      <bl-checkbox-group label="Terms" required name="terms">
        <bl-checkbox value="terms">I accept the terms and conditions</bl-checkbox>
      </bl-checkbox-group>
    </DemoSection>

    <!-- Custom Invalid Text -->
    <DemoSection title="Custom Invalid Text" :code="customInvalidCode">
      <bl-checkbox-group
        label="Preferences"
        required
        invalid-text="Please select at least 1 option"
        name="preferences"
      >
        <bl-checkbox value="email">Email notifications</bl-checkbox>
        <bl-checkbox value="sms">SMS notifications</bl-checkbox>
      </bl-checkbox-group>
    </DemoSection>

    <!-- Form Usage -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Using within a Form
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Checkbox group can be used inside HTML forms with form validation.
      </p>
    </div>

    <DemoSection title="Form Usage" :code="formCode">
      <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg">
        <p class="text-sm text-neutral-dark mb-2">Example form structure:</p>
        <code class="text-xs text-primary"
          >&lt;bl-checkbox-group name="..." required&gt;...&lt;/bl-checkbox-group&gt;</code
        >
      </div>
    </DemoSection>

    <!-- Interactive Demo -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Interactive Demo
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Test checkbox group change events with this interactive example.
      </p>
    </div>

    <DemoSection title="Interactive Demo" :code="interactiveCode">
      <div class="flex items-start gap-8">
        <bl-checkbox-group
          label="Favorite animals"
          name="favoriteAnimalsInteractive"
          @bl-checkbox-group-change="selectedAnimals = ($event as CustomEvent).detail"
        >
          <bl-checkbox value="cat">Cat</bl-checkbox>
          <bl-checkbox value="dog">Dog</bl-checkbox>
          <bl-checkbox value="bird">Bird</bl-checkbox>
          <bl-checkbox value="fish">Fish</bl-checkbox>
        </bl-checkbox-group>
        <div class="text-neutral-dark">
          Selected:
          <strong class="text-primary">{{ selectedAnimals.join(", ") || "(none)" }}</strong>
        </div>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The checkbox group component supports RTL (Right-to-Left) text direction. You can enable RTL
        mode by setting the <code>dir</code> attribute on a parent element or the
        <code>html</code> tag.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex gap-8">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <bl-checkbox-group label="Select your interests" name="interestsLTR">
            <bl-checkbox value="sports">Sports</bl-checkbox>
            <bl-checkbox value="music">Music</bl-checkbox>
            <bl-checkbox value="reading">Reading</bl-checkbox>
          </bl-checkbox-group>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <bl-checkbox-group label="اختر اهتماماتك" name="interestsRTL">
            <bl-checkbox value="sports">الرياضة</bl-checkbox>
            <bl-checkbox value="music">الموسيقى</bl-checkbox>
            <bl-checkbox value="reading">القراءة</bl-checkbox>
          </bl-checkbox-group>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
