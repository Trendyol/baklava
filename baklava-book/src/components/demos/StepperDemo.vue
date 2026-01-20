<script setup lang="ts">
import { ref } from "vue";

const currentStep = ref(2);
</script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Stepper</h4>
      <bl-stepper>
        <bl-stepper-item status="completed">Cart</bl-stepper-item>
        <bl-stepper-item status="active">Shipping</bl-stepper-item>
        <bl-stepper-item>Payment</bl-stepper-item>
        <bl-stepper-item>Confirmation</bl-stepper-item>
      </bl-stepper>
    </div>

    <!-- With Icons -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Icons</h4>
      <bl-stepper>
        <bl-stepper-item status="completed" icon="shopping_bag">Cart</bl-stepper-item>
        <bl-stepper-item status="completed" icon="location">Address</bl-stepper-item>
        <bl-stepper-item status="active" icon="credit_card">Payment</bl-stepper-item>
        <bl-stepper-item icon="check_fill">Done</bl-stepper-item>
      </bl-stepper>
    </div>

    <!-- Vertical -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Vertical Stepper</h4>
      <bl-stepper vertical>
        <bl-stepper-item status="completed">Step 1: Create account</bl-stepper-item>
        <bl-stepper-item status="active">Step 2: Verify email</bl-stepper-item>
        <bl-stepper-item>Step 3: Set up profile</bl-stepper-item>
      </bl-stepper>
    </div>

    <!-- All States -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Step States</h4>
      <bl-stepper>
        <bl-stepper-item status="completed">Completed</bl-stepper-item>
        <bl-stepper-item status="active">Active</bl-stepper-item>
        <bl-stepper-item status="error">Error</bl-stepper-item>
        <bl-stepper-item>Pending</bl-stepper-item>
      </bl-stepper>
    </div>
  </div>
</template>
