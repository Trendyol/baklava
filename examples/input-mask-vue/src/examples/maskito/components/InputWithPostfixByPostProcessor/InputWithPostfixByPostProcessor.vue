<template>
  <bl-input
    v-maskito="options"
    size="large"
    name="price-postfix"
    label="Price"
    placeholder="Enter price"
    icon="money"
    help-text="$199.00"
  />
</template>

<script>
import { defineComponent } from 'vue';
import { maskito } from '@maskito/vue';
import maskOptions from './mask';
import { elementPredicate } from '../../helpers';

export default defineComponent({
  name: 'InputWithPostfixByPostProcessor',
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
