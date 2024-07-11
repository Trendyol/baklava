<template>
  <bl-input
    ref="blInputRef"
    size="large"
    name="price-postfix"
    label="Price"
    placeholder="Enter price"
    icon="money"
    help-text="$199.00"
  />
</template>

<script>
import { defineComponent } from 'vue';
import { useIMaskWithObserver } from '../../hooks/useIMaskWithObserver';

export default defineComponent({
  name: 'InputPricePrefixDecimals',
  setup() {
    const { el: blInputRef } = useIMaskWithObserver({
      mask: '$num',
      blocks: {
        num: {
          mask: Number,
          scale: 2,
          radix: '.',
        },
      },
    });

    return {
      blInputRef,
    };
  },
});
</script>
