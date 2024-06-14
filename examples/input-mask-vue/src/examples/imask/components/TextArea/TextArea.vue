<template>
  <bl-textarea
    ref="blInputRef"
    size="large"
    name="textarea"
    label="Address"
    placeholder="Enter your address"
    spellcheck
  />
</template>

<script>
import { defineComponent } from 'vue';
import { useIMaskWithObserver } from '../../hooks/useIMaskWithObserver';

export default defineComponent({
  name: 'TextArea',
  setup() {
    const { el: blInputRef } = useIMaskWithObserver({
      mask: /^[a-z1-9\s.,/]+$/i,
    });

    return {
      blInputRef,
    };
  },
});
</script>
