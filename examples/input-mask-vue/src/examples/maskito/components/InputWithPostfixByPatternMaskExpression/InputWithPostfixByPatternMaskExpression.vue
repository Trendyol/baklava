<template>
  <bl-input
    v-maskito="options"
    size="large"
    name="amount"
    label="Amount"
    placeholder="Enter amount"
    help-text="example: 99%"
    label-fixed
  />
</template>

<script>
import { defineComponent } from 'vue';
import { maskito } from '@maskito/vue';
import maskOptions from './mask';
import { elementPredicate } from '../../helpers';

export default defineComponent({
  name: 'InputWithPostfixByPatternMaskExpression',
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
