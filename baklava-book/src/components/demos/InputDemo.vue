<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

const inputValue = ref("");

const basicCode = `<bl-input placeholder="Enter text..." label="Label"></bl-input>
<bl-input
  placeholder="With help text"
  label="Email"
  help-text="We'll never share your email"
></bl-input>`;

const typesCode = `<bl-input type="text" placeholder="Text input" label="Text"></bl-input>
<bl-input type="email" placeholder="email@example.com" label="Email"></bl-input>
<bl-input type="password" placeholder="••••••••" label="Password"></bl-input>
<bl-input type="number" placeholder="0" label="Number"></bl-input>`;

const labelCode = `<!-- Floating label (default) -->
<bl-input label="User Name" placeholder="Enter Your Name"></bl-input>

<!-- Fixed label -->
<bl-input label="User Name" label-fixed placeholder="Enter Your Name"></bl-input>

<!-- Without label -->
<bl-input placeholder="Enter Your Name"></bl-input>`;

const helpTextCode = `<bl-input
  type="text"
  placeholder="Enter Name"
  help-text="Your username should include only letters."
></bl-input>`;

const sizesCode = `<bl-input size="large" placeholder="Large" label="Large"></bl-input>
<bl-input size="medium" placeholder="Medium" label="Medium"></bl-input>
<bl-input size="small" placeholder="Small" label="Small"></bl-input>`;

const statesCode = `<bl-input placeholder="Disabled" label="Disabled" disabled></bl-input>
<bl-input
  placeholder="Read only"
  label="Read Only"
  readonly
  value="Read only value"
></bl-input>
<bl-input
  placeholder="Invalid"
  label="Invalid"
  invalid
  invalid-text="This field is required"
></bl-input>`;

const iconsCode = `<bl-input placeholder="Search..." label="Search" icon="search"></bl-input>
<bl-input placeholder="Enter email" label="Email" icon="email"></bl-input>
<bl-input type="password" placeholder="Password" label="Password" icon="lock"></bl-input>`;

const validationCode = `<bl-input
  type="text"
  label="User Name"
  minlength="5"
  maxlength="20"
  required
></bl-input>
<bl-input
  type="number"
  label="Age"
  min="18"
  required
></bl-input>`;

const searchCode = `<bl-input type="search" placeholder="Search..." value="some input"></bl-input>`;

const interactiveCode = `<script setup>
import { ref } from "vue";
const inputValue = ref("");
<\/script>

<template>
  <bl-input
    :value="inputValue"
    placeholder="Type something..."
    label="Live Input"
    @bl-input="inputValue = $event.target.value"
  ></bl-input>
  <span>Value: {{ inputValue || "(empty)" }}</span>
</template>`;

const rtlCode = `<!-- LTR (Left-to-Right) -->
<bl-input label="Username" placeholder="Enter username" icon="profile"></bl-input>

<!-- RTL (Right-to-Left) -->
<div dir="rtl">
  <bl-input label="اسم المستخدم" placeholder="أدخل اسم المستخدم" icon="profile"></bl-input>
</div>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Input component is the component for taking text input from user.
      </p>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Currently, input component supports <code>text</code>, <code>number</code>,
        <code>password</code>, <code>email</code>, <code>date</code>, <code>time</code> and more
        types. Default is <code>text</code>.
      </p>
    </div>

    <DemoSection title="Basic Input" :code="basicCode">
      <div class="flex flex-wrap gap-4">
        <bl-input placeholder="Enter text..." label="Label"></bl-input>
        <bl-input
          placeholder="With help text"
          label="Email"
          help-text="We'll never share your email"
        ></bl-input>
      </div>
    </DemoSection>

    <!-- Input Types -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Input Types</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Input supports various HTML5 input types for different use cases.
      </p>
    </div>

    <DemoSection title="Input Types" :code="typesCode">
      <div class="flex flex-wrap gap-4">
        <bl-input type="text" placeholder="Text input" label="Text"></bl-input>
        <bl-input type="email" placeholder="email@example.com" label="Email"></bl-input>
        <bl-input type="password" placeholder="••••••••" label="Password"></bl-input>
        <bl-input type="number" placeholder="0" label="Number"></bl-input>
      </div>
    </DemoSection>

    <!-- Input Labels -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Input Labels</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Input optionally can have a <code>label</code>. If the label is set, it will be a floating
        label by default. If you want to use always it on top of the input, then you can use
        <code>label-fixed</code> attribute.
      </p>
    </div>

    <DemoSection title="Label Variants" :code="labelCode">
      <div class="flex flex-wrap gap-4">
        <bl-input label="Floating Label" placeholder="Enter Your Name"></bl-input>
        <bl-input label="Fixed Label" label-fixed placeholder="Enter Your Name"></bl-input>
        <bl-input placeholder="No Label (placeholder only)"></bl-input>
      </div>
    </DemoSection>

    <!-- Help Text -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Input Help Text
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can give extra information to user with <code>help-text</code> attribute.
      </p>
    </div>

    <DemoSection title="Help Text" :code="helpTextCode">
      <div class="max-w-xs">
        <bl-input
          type="text"
          placeholder="Enter Name"
          help-text="Your username should include only letters."
        ></bl-input>
      </div>
    </DemoSection>

    <!-- Sizes -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Input Sizes</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Inputs have 3 size options: <strong>large</strong>, <strong>medium</strong> and
        <strong>small</strong>. <code>medium</code> size is default.
      </p>
    </div>

    <DemoSection title="Sizes" :code="sizesCode">
      <div class="flex flex-wrap items-end gap-4">
        <bl-input size="large" placeholder="Large" label="Large"></bl-input>
        <bl-input size="medium" placeholder="Medium" label="Medium"></bl-input>
        <bl-input size="small" placeholder="Small" label="Small"></bl-input>
      </div>
    </DemoSection>

    <!-- With Icons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Input With Icon
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Input can have an icon. This icon is showed with <code>bl-icon</code> component internally
        and its color synced with the state of input.
      </p>
    </div>

    <DemoSection title="With Icons" :code="iconsCode">
      <div class="flex flex-wrap gap-4">
        <bl-input placeholder="Search..." label="Search" icon="search"></bl-input>
        <bl-input placeholder="Enter email" label="Email" icon="email"></bl-input>
        <bl-input type="password" placeholder="Password" label="Password" icon="lock"></bl-input>
      </div>
    </DemoSection>

    <!-- States -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Input States</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Input can be <code>disabled</code>, <code>readonly</code>, or in <code>invalid</code> state.
      </p>
    </div>

    <DemoSection title="States" :code="statesCode">
      <div class="flex flex-wrap gap-4">
        <bl-input placeholder="Disabled" label="Disabled" disabled></bl-input>
        <bl-input
          placeholder="Read only"
          label="Read Only"
          readonly
          value="Read only value"
        ></bl-input>
        <bl-input
          placeholder="Invalid"
          label="Invalid"
          invalid
          invalid-text="This field is required"
        ></bl-input>
      </div>
    </DemoSection>

    <!-- Validation -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Input Validation
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Input supports native HTML validation rules like <code>required</code>,
        <code>minlength</code>, <code>maxlength</code>, <code>min</code> and <code>max</code>. Input
        validation will run after user enters a value and goes out from the input.
      </p>
    </div>

    <DemoSection title="Validation" :code="validationCode">
      <div class="flex flex-wrap gap-4">
        <bl-input type="text" label="User Name" minlength="5" maxlength="20" required></bl-input>
        <bl-input type="number" label="Age" min="18" required></bl-input>
      </div>
    </DemoSection>

    <!-- Search Input -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Search Input with Clear Button
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Input with type <code>search</code> has a clear button by default. This button will be shown
        when input has a value. You can clear the input by clicking this button.
      </p>
    </div>

    <DemoSection title="Search Input" :code="searchCode">
      <div class="max-w-xs">
        <bl-input type="search" placeholder="Search..." value="some input"></bl-input>
      </div>
    </DemoSection>

    <!-- Interactive -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Interactive Demo
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Test input events with this interactive example.
      </p>
    </div>

    <DemoSection title="Interactive Demo" :code="interactiveCode">
      <div class="flex items-center gap-4">
        <bl-input
          :value="inputValue"
          placeholder="Type something..."
          label="Live Input"
          @bl-input="inputValue = ($event.target as HTMLInputElement).value"
        ></bl-input>
        <span class="text-neutral-dark">
          Value: <strong class="text-primary">{{ inputValue || "(empty)" }}</strong>
        </span>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The input component supports RTL (Right-to-Left) text direction. You can enable RTL mode by
        setting the <code>dir</code> attribute on a parent element or the <code>html</code> tag.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex gap-8">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <bl-input label="Username" placeholder="Enter username" icon="profile"></bl-input>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <bl-input label="اسم المستخدم" placeholder="أدخل اسم المستخدم" icon="profile"></bl-input>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
