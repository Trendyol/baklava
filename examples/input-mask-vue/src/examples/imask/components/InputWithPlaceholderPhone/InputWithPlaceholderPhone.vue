<template>
  <bl-input ref="blInputRef" size="large" icon="phone" label="Phone Number" />
</template>

<script>
import { defineComponent } from 'vue';
import { useIMaskWithObserver } from '../../hooks/useIMaskWithObserver';

export default defineComponent({
  name: 'InputWithPlaceholderPhone',
  setup() {
    const { el: blInputRef } = useIMaskWithObserver({
      mask: '+{1} (num) 000-0000',
      blocks: {
        num: {
          mask: '000',
          placeholderChar: ' ',
        },
      },
      lazy: false,
    });

    return {
      blInputRef,
    };
  },
});
</script>
