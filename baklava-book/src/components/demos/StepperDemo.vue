<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

const currentStep = ref(1);

const basicCode = `<bl-stepper>
  <bl-stepper-item title="Step 1" description="First step description" variant="success"></bl-stepper-item>
  <bl-stepper-item title="Step 2" description="Second step description" variant="active"></bl-stepper-item>
  <bl-stepper-item title="Step 3" description="Third step description" variant="default"></bl-stepper-item>
  <bl-stepper-item title="Step 4" description="Fourth step description" variant="default"></bl-stepper-item>
</bl-stepper>`;

const dotTypeCode = `<bl-stepper type="dot">
  <bl-stepper-item title="Cart" description="Review your items" variant="success"></bl-stepper-item>
  <bl-stepper-item title="Shipping" description="Choose delivery" variant="active"></bl-stepper-item>
  <bl-stepper-item title="Payment" description="Enter payment info" variant="default"></bl-stepper-item>
  <bl-stepper-item title="Confirm" description="Place order" variant="default"></bl-stepper-item>
</bl-stepper>`;

const numberTypeCode = `<bl-stepper type="number">
  <bl-stepper-item title="Account Setup" description="Create your account" variant="success"></bl-stepper-item>
  <bl-stepper-item title="Profile" description="Add your details" variant="active"></bl-stepper-item>
  <bl-stepper-item title="Preferences" description="Set preferences" variant="default"></bl-stepper-item>
  <bl-stepper-item title="Complete" description="Review and confirm" variant="default"></bl-stepper-item>
</bl-stepper>`;

const iconTypeCode = `<bl-stepper type="icon">
  <bl-stepper-item title="Step 1" description="First step" variant="success" icon="check"></bl-stepper-item>
  <bl-stepper-item title="Step 2" description="Second step" variant="active" icon="settings"></bl-stepper-item>
  <bl-stepper-item title="Step 3" description="Third step" variant="default" icon="clock"></bl-stepper-item>
  <bl-stepper-item title="Step 4" description="Fourth step" variant="default" icon="lock"></bl-stepper-item>
</bl-stepper>`;

const verticalCode = `<bl-stepper type="number" direction="vertical">
  <bl-stepper-item title="Create Account" description="Set up your credentials" variant="success"></bl-stepper-item>
  <bl-stepper-item title="Verify Email" description="Confirm your email address" variant="active"></bl-stepper-item>
  <bl-stepper-item title="Set Up Profile" description="Add your personal information" variant="default"></bl-stepper-item>
</bl-stepper>`;

const nonClickableCode = `<!-- Non-clickable mode - users can only navigate via buttons -->
<bl-stepper type="dot" usage="non-clickable">
  <bl-stepper-item title="Account Setup" description="Create your account" variant="success"></bl-stepper-item>
  <bl-stepper-item title="Profile" description="Add your details" variant="active"></bl-stepper-item>
  <bl-stepper-item title="Preferences" description="Set preferences" variant="default"></bl-stepper-item>
</bl-stepper>`;

const statesCode = `<bl-stepper type="number">
  <bl-stepper-item title="Completed" description="This step is done" variant="success"></bl-stepper-item>
  <bl-stepper-item title="Active" description="Currently on this step" variant="active"></bl-stepper-item>
  <bl-stepper-item title="Error" description="Something went wrong" variant="error"></bl-stepper-item>
  <bl-stepper-item title="Pending" description="Not started yet" variant="default"></bl-stepper-item>
</bl-stepper>`;

const disabledCode = `<bl-stepper type="dot">
  <bl-stepper-item title="Step 1" description="Completed" variant="success"></bl-stepper-item>
  <bl-stepper-item title="Step 2" description="Current step" variant="active"></bl-stepper-item>
  <bl-stepper-item title="Step 3" description="Locked" variant="default" disabled></bl-stepper-item>
  <bl-stepper-item title="Step 4" description="Locked" variant="default" disabled></bl-stepper-item>
</bl-stepper>`;

const withoutDescCode = `<bl-stepper type="number">
  <bl-stepper-item title="Step 1" variant="success"></bl-stepper-item>
  <bl-stepper-item title="Step 2" variant="active"></bl-stepper-item>
  <bl-stepper-item title="Step 3" variant="default"></bl-stepper-item>
  <bl-stepper-item title="Step 4" variant="default"></bl-stepper-item>
</bl-stepper>`;

const rtlCode = `<!-- LTR -->
<bl-stepper type="number">
  <bl-stepper-item title="Cart" description="Review items" variant="success"></bl-stepper-item>
  <bl-stepper-item title="Shipping" description="Choose delivery" variant="active"></bl-stepper-item>
  <bl-stepper-item title="Payment" description="Pay now" variant="default"></bl-stepper-item>
</bl-stepper>

<!-- RTL -->
<div dir="rtl">
  <bl-stepper type="number">
    <bl-stepper-item title="السلة" description="مراجعة العناصر" variant="success"></bl-stepper-item>
    <bl-stepper-item title="الشحن" description="اختر التوصيل" variant="active"></bl-stepper-item>
    <bl-stepper-item title="الدفع" description="ادفع الآن" variant="default"></bl-stepper-item>
  </bl-stepper>
</div>`;

const interactiveCode = `<script setup>
import { ref } from "vue";
const currentStep = ref(1);

const getVariant = (step) => {
  if (step < currentStep.value) return "success";
  if (step === currentStep.value) return "active";
  return "default";
};
const nextStep = () => { if (currentStep.value < 4) currentStep.value++; };
const prevStep = () => { if (currentStep.value > 1) currentStep.value--; };
<\/script>

<template>
  <bl-stepper type="number">
    <bl-stepper-item title="Cart" description="Review items" :variant="getVariant(1)"></bl-stepper-item>
    <bl-stepper-item title="Shipping" description="Choose delivery" :variant="getVariant(2)"></bl-stepper-item>
    <bl-stepper-item title="Payment" description="Enter payment" :variant="getVariant(3)"></bl-stepper-item>
    <bl-stepper-item title="Confirm" description="Place order" :variant="getVariant(4)"></bl-stepper-item>
  </bl-stepper>
  <div class="flex gap-4 mt-4">
    <bl-button variant="secondary" @bl-click="prevStep" :disabled="currentStep === 1">Previous</bl-button>
    <bl-button @bl-click="nextStep" :disabled="currentStep === 4">Next</bl-button>
  </div>
</template>`;

const getVariant = (step: number): string => {
  if (step < currentStep.value) return "success";
  if (step === currentStep.value) return "active";
  return "default";
};

const nextStep = () => {
  if (currentStep.value < 4) currentStep.value++;
};
const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        The Stepper component displays progress through a sequence of steps. It helps users
        understand where they are in a multi-step process and what steps remain.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Key Features
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Three visual styles: <strong>dot</strong>, <strong>number</strong>, <strong>icon</strong></li>
        <li>Two directions: <strong>horizontal</strong>, <strong>vertical</strong></li>
        <li>Two usage modes: <strong>clickable</strong>, <strong>non-clickable</strong></li>
        <li>Four step variants: <code>success</code>, <code>active</code>, <code>error</code>, <code>default</code></li>
        <li>Support for <code>title</code> and <code>description</code> per step</li>
        <li>Maximum 9 items allowed</li>
      </ul>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        A basic stepper can be created by combining <code>bl-stepper</code> with
        <code>bl-stepper-item</code> components. Each item has a <code>title</code> and optional
        <code>description</code>.
      </p>
    </div>

    <DemoSection title="Basic Stepper" :code="basicCode">
      <bl-stepper>
        <bl-stepper-item
          title="Step 1"
          description="First step description"
          variant="success"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Step 2"
          description="Second step description"
          variant="active"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Step 3"
          description="Third step description"
          variant="default"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Step 4"
          description="Fourth step description"
          variant="default"
        ></bl-stepper-item>
      </bl-stepper>
    </DemoSection>

    <!-- Stepper Types -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Stepper Types</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Stepper supports three visual types: <code>dot</code> (default), <code>number</code>, and
        <code>icon</code>.
      </p>
    </div>

    <!-- Dot Type -->
    <DemoSection title="Dot Type (Default)" :code="dotTypeCode">
      <bl-stepper type="dot">
        <bl-stepper-item
          title="Cart"
          description="Review your items"
          variant="success"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Shipping"
          description="Choose delivery"
          variant="active"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Payment"
          description="Enter payment info"
          variant="default"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Confirm"
          description="Place order"
          variant="default"
        ></bl-stepper-item>
      </bl-stepper>
    </DemoSection>

    <!-- Number Type -->
    <DemoSection title="Number Type" :code="numberTypeCode">
      <bl-stepper type="number">
        <bl-stepper-item
          title="Account Setup"
          description="Create your account"
          variant="success"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Profile"
          description="Add your details"
          variant="active"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Preferences"
          description="Set preferences"
          variant="default"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Complete"
          description="Review and confirm"
          variant="default"
        ></bl-stepper-item>
      </bl-stepper>
    </DemoSection>

    <!-- Icon Type -->
    <DemoSection title="Icon Type" :code="iconTypeCode">
      <bl-stepper type="icon">
        <bl-stepper-item
          title="Step 1"
          description="First step"
          variant="success"
          icon="check"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Step 2"
          description="Second step"
          variant="active"
          icon="settings"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Step 3"
          description="Third step"
          variant="default"
          icon="clock"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Step 4"
          description="Fourth step"
          variant="default"
          icon="lock"
        ></bl-stepper-item>
      </bl-stepper>
    </DemoSection>

    <!-- Vertical Direction -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Vertical Direction
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Vertical steppers work well for mobile layouts and when you have more vertical space
        available. Use <code>direction="vertical"</code>.
      </p>
    </div>

    <DemoSection title="Vertical Stepper" :code="verticalCode">
      <bl-stepper type="number" direction="vertical">
        <bl-stepper-item
          title="Create Account"
          description="Set up your credentials"
          variant="success"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Verify Email"
          description="Confirm your email address"
          variant="active"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Set Up Profile"
          description="Add your personal information"
          variant="default"
        ></bl-stepper-item>
      </bl-stepper>
    </DemoSection>

    <!-- Non-Clickable Mode -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Non-Clickable Mode
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        In non-clickable mode, the stepper is read-only and users cannot interact with individual
        steps. Use <code>usage="non-clickable"</code>.
      </p>
    </div>

    <DemoSection title="Non-Clickable" :code="nonClickableCode">
      <bl-stepper type="dot" usage="non-clickable">
        <bl-stepper-item
          title="Account Setup"
          description="Create your account"
          variant="success"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Profile"
          description="Add your details"
          variant="active"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Preferences"
          description="Set preferences"
          variant="default"
        ></bl-stepper-item>
      </bl-stepper>
    </DemoSection>

    <!-- Step States -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Step States</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Each step can have one of four variants: <code>success</code> (completed),
        <code>active</code> (current), <code>error</code> (problem), or <code>default</code> (pending).
      </p>
    </div>

    <DemoSection title="All States" :code="statesCode">
      <bl-stepper type="number">
        <bl-stepper-item
          title="Completed"
          description="This step is done"
          variant="success"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Active"
          description="Currently on this step"
          variant="active"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Error"
          description="Something went wrong"
          variant="error"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Pending"
          description="Not started yet"
          variant="default"
        ></bl-stepper-item>
      </bl-stepper>
    </DemoSection>

    <!-- Disabled Steps -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Disabled Steps
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Individual steps can be disabled to prevent interaction using the
        <code>disabled</code> attribute.
      </p>
    </div>

    <DemoSection title="Disabled Steps" :code="disabledCode">
      <bl-stepper type="dot">
        <bl-stepper-item
          title="Step 1"
          description="Completed"
          variant="success"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Step 2"
          description="Current step"
          variant="active"
        ></bl-stepper-item>
        <bl-stepper-item
          title="Step 3"
          description="Locked"
          variant="default"
          disabled
        ></bl-stepper-item>
        <bl-stepper-item
          title="Step 4"
          description="Locked"
          variant="default"
          disabled
        ></bl-stepper-item>
      </bl-stepper>
    </DemoSection>

    <!-- Without Descriptions -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Without Descriptions
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Descriptions are optional. You can use only titles for a more compact stepper.
      </p>
    </div>

    <DemoSection title="Title Only" :code="withoutDescCode">
      <bl-stepper type="number">
        <bl-stepper-item title="Step 1" variant="success"></bl-stepper-item>
        <bl-stepper-item title="Step 2" variant="active"></bl-stepper-item>
        <bl-stepper-item title="Step 3" variant="default"></bl-stepper-item>
        <bl-stepper-item title="Step 4" variant="default"></bl-stepper-item>
      </bl-stepper>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The stepper component supports RTL (Right-to-Left) text direction. The step order and
        connector lines are automatically reversed.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex flex-col gap-8">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <bl-stepper type="number">
            <bl-stepper-item
              title="Cart"
              description="Review items"
              variant="success"
            ></bl-stepper-item>
            <bl-stepper-item
              title="Shipping"
              description="Choose delivery"
              variant="active"
            ></bl-stepper-item>
            <bl-stepper-item
              title="Payment"
              description="Pay now"
              variant="default"
            ></bl-stepper-item>
          </bl-stepper>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <bl-stepper type="number">
            <bl-stepper-item
              title="السلة"
              description="مراجعة العناصر"
              variant="success"
            ></bl-stepper-item>
            <bl-stepper-item
              title="الشحن"
              description="اختر التوصيل"
              variant="active"
            ></bl-stepper-item>
            <bl-stepper-item
              title="الدفع"
              description="ادفع الآن"
              variant="default"
            ></bl-stepper-item>
          </bl-stepper>
        </div>
      </div>
    </DemoSection>

    <!-- Interactive -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Interactive Demo
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Navigate through steps with Previous/Next buttons. The stepper emits
        <code>bl-stepper-change</code> event when state changes.
      </p>
    </div>

    <DemoSection title="Interactive" :code="interactiveCode">
      <div class="space-y-4">
        <bl-stepper type="number">
          <bl-stepper-item
            title="Cart"
            description="Review items"
            :variant="getVariant(1)"
          ></bl-stepper-item>
          <bl-stepper-item
            title="Shipping"
            description="Choose delivery"
            :variant="getVariant(2)"
          ></bl-stepper-item>
          <bl-stepper-item
            title="Payment"
            description="Enter payment"
            :variant="getVariant(3)"
          ></bl-stepper-item>
          <bl-stepper-item
            title="Confirm"
            description="Place order"
            :variant="getVariant(4)"
          ></bl-stepper-item>
        </bl-stepper>
        <div class="flex gap-4">
          <bl-button variant="secondary" @bl-click="prevStep" :disabled="currentStep === 1">
            Previous
          </bl-button>
          <bl-button @bl-click="nextStep" :disabled="currentStep === 4"> Next </bl-button>
        </div>
        <p class="text-neutral-dark">
          Current step: <strong class="text-primary">{{ currentStep }} / 4</strong>
        </p>
      </div>
    </DemoSection>
  </div>
</template>
