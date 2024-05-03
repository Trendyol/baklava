<template>
  <bl-input
    ref="blInputRef"
    size="large"
    name="date"
    label="Date"
    label-fixed
  />
</template>

<script>
import { defineComponent } from 'vue';
import { IMask } from 'vue-imask';
import { useIMaskWithObserver } from '../../hooks/useIMaskWithObserver';

export default defineComponent({
  name: 'InputWithPlaceholderDate',
  setup() {
    const { el: blInputRef } = useIMaskWithObserver({
      mask: 'd/m/Y',
      lazy: false,
      overwrite: true,
      autofix: true,
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          placeholderChar: 'd',
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: IMask.MaskedRange,
          placeholderChar: 'm',
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: IMask.MaskedRange,
          placeholderChar: 'Y',
          from: 1900,
          to: 2999,
          maxLength: 4,
        },
      },
    });

    return {
      blInputRef,
    };
  },
});
</script>
