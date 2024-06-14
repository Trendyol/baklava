<template>
  <bl-input
    ref="blInputRef"
    size="large"
    icon="wallet"
    label="CVC"
    placeholder="xxx"
  />
</template>

<script>
import { defineComponent } from 'vue';
import { IMask } from 'vue-imask';
import { useIMaskWithObserver } from '../../hooks/useIMaskWithObserver';

export default defineComponent({
  name: 'InputWithPlaceholderCVC',
  setup() {
    const { el: blInputRef } = useIMaskWithObserver({
      mask: IMask.MaskedRange,
      from: 0,
      to: 999,
      maxLength: 3,
      placeholderChar: 'x',
      lazy: false,
    });

    return {
      blInputRef,
    };
  },
});
</script>
