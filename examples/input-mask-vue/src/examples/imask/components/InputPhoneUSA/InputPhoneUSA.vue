<template>
  <bl-input
    ref="blInputRef"
    size="large"
    icon="phone"
    label="Phone Number"
    placeholder="Enter phone number"
    name="phone-usa"
    autofocus
  />
</template>

<script>
import { defineComponent } from 'vue';
import { useIMaskWithObserver } from '../../hooks/useIMaskWithObserver';

export default defineComponent({
  name: 'InputPhoneUSA',
  setup() {
    const { el: blInputRef } = useIMaskWithObserver({
      mask: '+1 (000) 000-0000',
    });

    return {
      blInputRef,
    };
  },
});
</script>
