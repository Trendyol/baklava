<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

const textValue = ref("");
const expandValue = ref("Line 1\nLine 2\nLine 3");

const basicCode = `<bl-textarea placeholder="Type something..."></bl-textarea>
<bl-textarea label="Message" value="Some dummy text"></bl-textarea>
<bl-textarea placeholder="Disabled..." disabled></bl-textarea>`;

const sizesCode = `<bl-textarea size="small" label="Small" value="Small textarea"></bl-textarea>
<bl-textarea size="medium" label="Medium" value="Medium textarea"></bl-textarea>
<bl-textarea size="large" label="Large" value="Large textarea"></bl-textarea>`;

const labelCode = `<!-- Floating label (default) -->
<bl-textarea label="Your Label"></bl-textarea>

<!-- Fixed label -->
<bl-textarea label="Fixed Label" label-fixed value="Content here"></bl-textarea>

<!-- Without label -->
<bl-textarea placeholder="No label, just placeholder"></bl-textarea>`;

const rowsCode = `<bl-textarea rows="2" label="2 Rows"></bl-textarea>
<bl-textarea rows="5" label="5 Rows"></bl-textarea>`;

const expandCode = `<!-- Auto expand based on content -->
<bl-textarea expand rows="2" value="Line 1\nLine 2\nLine 3"></bl-textarea>

<!-- With max-rows limit -->
<bl-textarea expand rows="2" max-rows="4" value="Expands up to 4 rows"></bl-textarea>`;

const helpTextCode = `<bl-textarea
  placeholder="Write a description..."
  label="Description"
  help-text="Maximum 500 characters"
></bl-textarea>`;

const characterCounterCode = `<bl-textarea
  placeholder="Type something..."
  character-counter
></bl-textarea>
<bl-textarea
  placeholder="Max 50 chars..."
  character-counter
  maxlength="50"
></bl-textarea>`;

const validationCode = `<bl-textarea
  placeholder="Min 5 characters"
  label="Required Field"
  minlength="5"
  maxlength="100"
  character-counter
  required
></bl-textarea>`;

const statesCode = `<bl-textarea placeholder="Disabled" label="Disabled" disabled></bl-textarea>
<bl-textarea
  placeholder="Invalid"
  label="Invalid"
  error="This field has an error"
></bl-textarea>`;

const rtlCode = `<!-- LTR (Left-to-Right) -->
<bl-textarea label="Message" placeholder="Enter your message"></bl-textarea>

<!-- RTL (Right-to-Left) -->
<div dir="rtl">
  <bl-textarea label="الرسالة" placeholder="أدخل رسالتك"></bl-textarea>
</div>`;

const interactiveCode = `<script setup>
import { ref } from "vue";
const textValue = ref("");
<\/script>

<template>
  <bl-textarea
    :value="textValue"
    placeholder="Type something..."
    label="Message"
    character-counter
    maxlength="100"
    @bl-input="textValue = $event.target.value"
  ></bl-textarea>
</template>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Textarea component is the component to take multi-line text input from user.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Key Features
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Supports floating and fixed labels</li>
        <li>Auto-expand based on content</li>
        <li>Character counter with optional max length</li>
        <li>Native HTML validation (required, minlength, maxlength)</li>
        <li>Form integration with ElementInternals</li>
      </ul>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Textarea supports using <code>label</code> and <code>placeholder</code>. You can set an
        initial <code>value</code> and set it <code>disabled</code> if you need.
      </p>
    </div>

    <DemoSection title="Basic Textarea" :code="basicCode">
      <div class="flex flex-wrap gap-4">
        <bl-textarea placeholder="Type something..."></bl-textarea>
        <bl-textarea label="Message" value="Some dummy text"></bl-textarea>
        <bl-textarea placeholder="Disabled..." disabled></bl-textarea>
      </div>
    </DemoSection>

    <!-- Sizes -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Textarea Sizes
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Textarea has 3 size options: <strong>small</strong>, <strong>medium</strong> and
        <strong>large</strong>. Size is <code>medium</code> by default.
      </p>
    </div>

    <DemoSection title="Sizes" :code="sizesCode">
      <div class="flex flex-wrap gap-4">
        <bl-textarea size="small" label="Small" value="Small textarea"></bl-textarea>
        <bl-textarea size="medium" label="Medium" value="Medium textarea"></bl-textarea>
        <bl-textarea size="large" label="Large" value="Large textarea"></bl-textarea>
      </div>
    </DemoSection>

    <!-- Labels -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Textarea Labels
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Textarea optionally can have a label. If the label is set, it will be a floating label by
        default. If you want to use always it on top of the textarea, then you can use
        <code>label-fixed</code> attribute.
      </p>
    </div>

    <DemoSection title="Label Variants" :code="labelCode">
      <div class="flex flex-wrap gap-4">
        <bl-textarea label="Floating Label" placeholder="Focus to see label float"></bl-textarea>
        <bl-textarea
          label="Fixed Label"
          label-fixed
          value="Fixed label always on top"
        ></bl-textarea>
        <bl-textarea placeholder="No label, just placeholder"></bl-textarea>
      </div>
    </DemoSection>

    <!-- Rows -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Custom Rows</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can set minimum <code>rows</code> of textarea to set vertical area.
      </p>
    </div>

    <DemoSection title="Custom Rows" :code="rowsCode">
      <div class="flex flex-wrap gap-4">
        <bl-textarea rows="2" label="2 Rows" placeholder="2 rows textarea"></bl-textarea>
        <bl-textarea rows="5" label="5 Rows" placeholder="5 rows textarea"></bl-textarea>
      </div>
    </DemoSection>

    <!-- Expand -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Textarea Expand
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Textarea can be used as auto expanding by content. You can enable this feature by adding
        <code>expand</code> attribute. Also you can limit expanding with
        <code>max-rows</code> attribute.
      </p>
    </div>

    <DemoSection title="Auto Expand" :code="expandCode">
      <div class="flex flex-wrap gap-4">
        <bl-textarea
          expand
          rows="2"
          label="Auto Expand"
          :value="expandValue"
          @bl-input="expandValue = ($event.target as HTMLTextAreaElement).value"
        ></bl-textarea>
        <bl-textarea
          expand
          rows="2"
          max-rows="4"
          label="Max 4 Rows"
          value="Expands up to 4 rows only"
        ></bl-textarea>
      </div>
    </DemoSection>

    <!-- Help Text -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Textarea Help Text
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can give extra information to user with <code>help-text</code> attribute.
      </p>
    </div>

    <DemoSection title="With Help Text" :code="helpTextCode">
      <div class="max-w-md">
        <bl-textarea
          placeholder="Write a description..."
          label="Description"
          help-text="Maximum 500 characters"
        ></bl-textarea>
      </div>
    </DemoSection>

    <!-- Character Counter -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Character Counter
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can display character counter by setting <code>character-counter</code> attribute. If
        you use it together with <code>maxlength</code> attribute user can have immediate attention
        if they exceed allowed text length.
      </p>
    </div>

    <DemoSection title="Character Counter" :code="characterCounterCode">
      <div class="flex flex-wrap gap-4">
        <bl-textarea
          placeholder="Type something..."
          label="Unlimited"
          character-counter
        ></bl-textarea>
        <bl-textarea
          placeholder="Max 50 chars..."
          label="With Max Length"
          character-counter
          maxlength="50"
        ></bl-textarea>
      </div>
    </DemoSection>

    <!-- Validation -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Textarea Validation
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Textarea supports native HTML validation rules like <code>required</code>,
        <code>minlength</code>, <code>maxlength</code>. Validation feedback becomes active after
        user finishes entering text (by leaving textarea).
      </p>
    </div>

    <DemoSection title="Validation" :code="validationCode">
      <div class="max-w-md">
        <bl-textarea
          placeholder="Min 5 characters"
          label="Required Field"
          minlength="5"
          maxlength="100"
          character-counter
          required
        ></bl-textarea>
      </div>
    </DemoSection>

    <!-- States -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Textarea States
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Textarea can be <code>disabled</code> or in error state using <code>error</code> attribute
        for custom validation messages.
      </p>
    </div>

    <DemoSection title="States" :code="statesCode">
      <div class="flex flex-wrap gap-4">
        <bl-textarea placeholder="Disabled" label="Disabled" disabled></bl-textarea>
        <bl-textarea
          placeholder="Invalid"
          label="With Error"
          error="This field has an error"
        ></bl-textarea>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The textarea component supports RTL (Right-to-Left) text direction. You can enable RTL mode
        by setting the <code>dir</code> attribute on a parent element or the <code>html</code> tag.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex gap-8">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <bl-textarea
            label="Message"
            placeholder="Enter your message"
            help-text="Please provide detailed information"
          ></bl-textarea>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <bl-textarea
            label="الرسالة"
            placeholder="أدخل رسالتك"
            help-text="يرجى تقديم معلومات مفصلة"
          ></bl-textarea>
        </div>
      </div>
    </DemoSection>

    <!-- Interactive Demo -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Interactive Demo
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Test textarea events with this interactive example.
      </p>
    </div>

    <DemoSection title="Interactive" :code="interactiveCode">
      <div class="max-w-md">
        <bl-textarea
          :value="textValue"
          placeholder="Type something..."
          label="Message"
          character-counter
          maxlength="100"
          @bl-input="textValue = ($event.target as HTMLTextAreaElement).value"
        ></bl-textarea>
        <p class="text-sm text-neutral-dark mt-2">
          Current length: <strong class="text-primary">{{ textValue.length }}/100</strong>
        </p>
      </div>
    </DemoSection>
  </div>
</template>
