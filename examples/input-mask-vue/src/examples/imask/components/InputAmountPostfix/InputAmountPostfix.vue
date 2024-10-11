<template>
  <bl-input
    ref="blInputRef"
    size="large"
    name="amount"
    label="Amount"
    placeholder="Enter amount"
    help-text="example: 99%"
    label-fixed
  />
</template>

<script>
import { defineComponent } from 'vue';
import { useIMaskWithObserver } from '../../hooks/useIMaskWithObserver';

export default defineComponent({
  name: 'InputAmountPostfix',
  setup() {
    const { el: blInputRef } = useIMaskWithObserver({
      mask: 'num%',
      lazy: false,
      blocks: {
        num: {
          mask: Number,
        },
      },
    });

    return {
      blInputRef,
    };
  },
});
</script>
