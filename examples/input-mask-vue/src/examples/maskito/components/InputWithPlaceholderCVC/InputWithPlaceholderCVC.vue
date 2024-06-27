<template>
  <bl-input
    v-maskito="options"
    size="large"
    icon="wallet"
    label="CVC"
    placeholder="xxx"
  />
</template>

<script>
import {defineComponent} from 'vue';
import {maskito} from '@maskito/vue';
import maskOptions from './mask';
import {elementPredicate} from '../../helpers';

export default defineComponent({
  name: 'InputWithPlaceholderCVC',
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


