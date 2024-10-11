<template>
  <bl-input
    ref="blInputRef"
    size="large"
    name="price"
    label="Price"
    placeholder="Enter price"
    icon="money"
  />
</template>

<script>
import { defineComponent } from 'vue';
import { useIMaskWithObserver } from '../../hooks/useIMaskWithObserver';

export default defineComponent({
  name: 'InputPricePrefix',
  setup() {
    const { el: blInputRef } = useIMaskWithObserver({
      mask: '$num',
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
