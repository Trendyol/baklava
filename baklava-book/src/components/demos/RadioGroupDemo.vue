<script setup lang="ts">
import { ref } from "vue";

const selectedSize = ref("medium");
</script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Radio Group</h4>
      <bl-radio-group label="Select size" name="size">
        <bl-radio value="small">Small</bl-radio>
        <bl-radio value="medium">Medium</bl-radio>
        <bl-radio value="large">Large</bl-radio>
      </bl-radio-group>
    </div>

    <!-- With Default Selection -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Default Selection</h4>
      <bl-radio-group label="Payment method" name="payment" value="credit">
        <bl-radio value="credit">Credit Card</bl-radio>
        <bl-radio value="debit">Debit Card</bl-radio>
        <bl-radio value="paypal">PayPal</bl-radio>
      </bl-radio-group>
    </div>

    <!-- Vertical Layout -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Vertical Layout</h4>
      <bl-radio-group label="Shipping speed" name="shipping" style="--bl-radio-direction: column">
        <bl-radio value="standard">Standard (5-7 days)</bl-radio>
        <bl-radio value="express">Express (2-3 days)</bl-radio>
        <bl-radio value="overnight">Overnight (1 day)</bl-radio>
      </bl-radio-group>
    </div>

    <!-- States -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">States</h4>
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
    </div>

    <!-- Single Radio States -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Single Radio States</h4>
      <div class="flex flex-wrap gap-4">
        <bl-radio name="states" value="normal">Normal</bl-radio>
        <bl-radio name="states" value="checked" checked>Checked</bl-radio>
        <bl-radio name="states" value="disabled" disabled>Disabled</bl-radio>
      </div>
    </div>
  </div>
</template>
