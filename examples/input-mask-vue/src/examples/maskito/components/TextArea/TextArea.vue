<template>
  <bl-textarea
    v-maskito="options"
    size="large"
    name="textarea"
    label="Address"
    placeholder="Enter your address"
    spellcheck
  />
</template>

<script>
import { defineComponent } from 'vue';
import { maskito } from '@maskito/vue';
import maskOptions from './mask';
import { elementPredicate } from '../../helpers';

export default defineComponent({
  name: 'TextArea',
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

