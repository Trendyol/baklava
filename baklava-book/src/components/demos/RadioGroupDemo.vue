<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

const selectedPayment = ref("");

const basicCode = `<bl-radio-group label="Payment Type" name="paymentType">
  <bl-radio value="cc">Credit Card</bl-radio>
  <bl-radio value="ideal">iDeal</bl-radio>
  <bl-radio value="paypal">PayPal</bl-radio>
</bl-radio-group>`;

const valueCode = `<bl-radio-group label="Payment Type" name="payment" value="ideal">
  <bl-radio value="cc">Credit Card</bl-radio>
  <bl-radio value="ideal">iDeal</bl-radio>
</bl-radio-group>`;

const horizontalCode = `<style>
  .horizontal-group {
    --bl-radio-direction: row;
  }
</style>

<bl-radio-group class="horizontal-group" label="Size" name="size">
  <bl-radio value="small">Small</bl-radio>
  <bl-radio value="medium">Medium</bl-radio>
  <bl-radio value="large">Large</bl-radio>
</bl-radio-group>`;

const verticalCode = `<bl-radio-group label="Shipping speed" name="shipping">
  <bl-radio value="standard">Standard (5-7 days)</bl-radio>
  <bl-radio value="express">Express (2-3 days)</bl-radio>
  <bl-radio value="overnight">Overnight (1 day)</bl-radio>
</bl-radio-group>`;

const statesCode = `<bl-radio-group label="Disabled Group" name="disabled-group" disabled>
  <bl-radio value="1">Option 1</bl-radio>
  <bl-radio value="2">Option 2</bl-radio>
</bl-radio-group>

<bl-radio-group label="Required" name="required-group" required>
  <bl-radio value="yes">Yes</bl-radio>
  <bl-radio value="no">No</bl-radio>
</bl-radio-group>`;

const singleCode = `<bl-radio name="states" value="normal">Normal</bl-radio>
<bl-radio name="states" value="checked" checked>Checked</bl-radio>
<bl-radio name="states" value="disabled" disabled>Disabled</bl-radio>`;

const rtlCode = `<!-- LTR (Left-to-Right) -->
<bl-radio-group label="Select Payment Method" name="payment">
  <bl-radio value="credit">Credit Card</bl-radio>
  <bl-radio value="debit">Debit Card</bl-radio>
  <bl-radio value="cash">Cash</bl-radio>
</bl-radio-group>

<!-- RTL (Right-to-Left) -->
<div dir="rtl">
  <bl-radio-group label="اختر طريقة الدفع" name="payment-rtl">
    <bl-radio value="credit">بطاقة ائتمان</bl-radio>
    <bl-radio value="debit">بطاقة خصم</bl-radio>
    <bl-radio value="cash">نقدي</bl-radio>
  </bl-radio-group>
</div>`;

const interactiveCode = `<script setup>
import { ref } from "vue";
const selectedPayment = ref("");
<\/script>

<template>
  <bl-radio-group
    label="Payment Method"
    name="interactive-payment"
    :value="selectedPayment"
    @bl-radio-change="selectedPayment = $event.target.value"
  >
    <bl-radio value="credit">Credit Card</bl-radio>
    <bl-radio value="debit">Debit Card</bl-radio>
    <bl-radio value="paypal">PayPal</bl-radio>
  </bl-radio-group>
  <p>Selected: {{ selectedPayment || 'None' }}</p>
</template>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Radio Group component is a form field component to take a selection from user with a list
        of options. It needs to be used with <code>bl-radio</code> component.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Key Features
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Keyboard navigation with Arrow keys and Space to select</li>
        <li>Horizontal and vertical layouts via CSS variable</li>
        <li>Support for disabled and required states</li>
        <li>Form integration with ElementInternals</li>
      </ul>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        By default radio options are listed in vertical stack. Use <code>label</code> to add a
        group label and <code>name</code> for form submission.
      </p>
    </div>

    <DemoSection title="Basic Radio Group" :code="basicCode">
      <bl-radio-group label="Payment Type" name="paymentType">
        <bl-radio value="cc">Credit Card</bl-radio>
        <bl-radio value="ideal">iDeal</bl-radio>
        <bl-radio value="paypal">PayPal</bl-radio>
      </bl-radio-group>
    </DemoSection>

    <!-- Default Value -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Default Value</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        If you set a <code>value</code>, the option with that value will be selected.
      </p>
    </div>

    <DemoSection title="With Default Selection" :code="valueCode">
      <bl-radio-group label="Payment Type" name="payment" value="ideal">
        <bl-radio value="cc">Credit Card</bl-radio>
        <bl-radio value="ideal">iDeal</bl-radio>
      </bl-radio-group>
    </DemoSection>

    <!-- Horizontal Layout -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Horizontal Layout
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can change the layout by setting <code>--bl-radio-direction</code> CSS variable as
        <code>row</code>.
      </p>
    </div>

    <DemoSection title="Horizontal Stack" :code="horizontalCode">
      <bl-radio-group label="Size" name="size" style="--bl-radio-direction: row">
        <bl-radio value="small">Small</bl-radio>
        <bl-radio value="medium">Medium</bl-radio>
        <bl-radio value="large">Large</bl-radio>
      </bl-radio-group>
    </DemoSection>

    <!-- Vertical Layout -->
    <DemoSection title="Vertical Stack (Default)" :code="verticalCode">
      <bl-radio-group label="Shipping speed" name="shipping">
        <bl-radio value="standard">Standard (5-7 days)</bl-radio>
        <bl-radio value="express">Express (2-3 days)</bl-radio>
        <bl-radio value="overnight">Overnight (1 day)</bl-radio>
      </bl-radio-group>
    </DemoSection>

    <!-- States -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Group States</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Radio groups can be <code>disabled</code> to prevent selection or <code>required</code> for
        form validation.
      </p>
    </div>

    <DemoSection title="States" :code="statesCode">
      <div class="flex flex-wrap gap-8">
        <bl-radio-group label="Disabled Group" name="disabled-group" disabled>
          <bl-radio value="1">Option 1</bl-radio>
          <bl-radio value="2">Option 2</bl-radio>
        </bl-radio-group>

        <bl-radio-group label="Required" name="required-group" required>
          <bl-radio value="yes">Yes</bl-radio>
          <bl-radio value="no">No</bl-radio>
        </bl-radio-group>
      </div>
    </DemoSection>

    <!-- Single Radio States -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Single Radio States
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Individual <code>bl-radio</code> elements can have their own states.
      </p>
    </div>

    <DemoSection title="Single Radio States" :code="singleCode">
      <div class="flex flex-wrap gap-4">
        <bl-radio name="states" value="normal">Normal</bl-radio>
        <bl-radio name="states" value="checked" checked>Checked</bl-radio>
        <bl-radio name="states" value="disabled" disabled>Disabled</bl-radio>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The radio group component supports RTL (Right-to-Left) text direction. You can enable RTL
        mode by setting the <code>dir</code> attribute on a parent element.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex gap-8">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <bl-radio-group label="Select Payment Method" name="payment-ltr">
            <bl-radio value="credit">Credit Card</bl-radio>
            <bl-radio value="debit">Debit Card</bl-radio>
            <bl-radio value="cash">Cash</bl-radio>
          </bl-radio-group>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <bl-radio-group label="اختر طريقة الدفع" name="payment-rtl">
            <bl-radio value="credit">بطاقة ائتمان</bl-radio>
            <bl-radio value="debit">بطاقة خصم</bl-radio>
            <bl-radio value="cash">نقدي</bl-radio>
          </bl-radio-group>
        </div>
      </div>
    </DemoSection>

    <!-- Interactive -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Interactive Demo
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Test the <code>bl-radio-change</code> event with this interactive example.
      </p>
    </div>

    <DemoSection title="Interactive" :code="interactiveCode">
      <bl-radio-group
        label="Payment Method"
        name="interactive-payment"
        :value="selectedPayment"
        @bl-radio-change="selectedPayment = ($event.target as HTMLInputElement).value"
      >
        <bl-radio value="credit">Credit Card</bl-radio>
        <bl-radio value="debit">Debit Card</bl-radio>
        <bl-radio value="paypal">PayPal</bl-radio>
      </bl-radio-group>
      <p class="text-sm text-neutral-dark mt-2">
        Selected: <strong class="text-primary">{{ selectedPayment || "None" }}</strong>
      </p>
    </DemoSection>
  </div>
</template>
