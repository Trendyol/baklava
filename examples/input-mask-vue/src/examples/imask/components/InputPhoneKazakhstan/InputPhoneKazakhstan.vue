<template>
  <bl-input
    ref="blInputRef"
    size="large"
    icon="phone"
    label="Phone Number"
    placeholder="Enter phone number"
    name="phone-kazakhstan"
    label-fixed
  />
</template>

<script>
import { defineComponent } from 'vue';
import { useIMaskWithObserver } from '../../hooks/useIMaskWithObserver';

export default defineComponent({
  name: 'InputPhoneKazakhstan',
  setup() {
    const { el: blInputRef } = useIMaskWithObserver({
      mask: '+7 (000) 000-00-00',
    });

    return {
      blInputRef,
    };
  },
});
</script>
