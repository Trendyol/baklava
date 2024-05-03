<template>
  <bl-input
    v-maskito="options"
    size="large"
    icon="phone"
    label="Phone Number"
    placeholder="Enter phone number"
    name="phone-kazakhstan"
    label-fixed
  />
</template>

<script>
  import {defineComponent} from 'vue';
  import {maskito} from '@maskito/vue';
  import maskOptions from './mask';
  import {elementPredicate} from '../../helpers';

  export default defineComponent({
  name: 'InputPhoneKazakhstan',
  directives: {
    maskito,
  },
  setup() {
    const options = {
      ...maskOptions,
      elementPredicate,
    };

    return {
      options,
    };
  },
});
</script>

