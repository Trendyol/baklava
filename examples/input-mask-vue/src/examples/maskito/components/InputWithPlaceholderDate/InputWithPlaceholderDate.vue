<template>
  <bl-input
    v-maskito="options"
    size="large"
    name="date"
    label="Date"
    label-fixed
  />
</template>

<script>
import {defineComponent} from 'vue';
import {maskito} from '@maskito/vue';
import maskOptions from './mask';
import {elementPredicate} from '../../helpers';

export default defineComponent({
  name: 'InputWithPlaceholderDate',
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



