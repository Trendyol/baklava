<template>
  <bl-input
    v-maskito="options"
    size="large"
    name="price"
    label="Price"
    placeholder="Enter price"
    icon="money"
  />
</template>

<script>
import { defineComponent } from 'vue';
import { maskito } from '@maskito/vue';
import maskOptions from './mask';
import { elementPredicate } from '../../helpers';

export default defineComponent({
  name: 'InputWithPrefixByPatternMaskExpression',
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
