<template>
  <GFieldWrapper
    :is-value="!!value"
    :is-outline-label="isOutlineLabel"
    :feedback="feedback"
    :label="label"
    :icon="icon"
    :success="success"
    :error="error"
    :disable="disable"
  >
    <textarea
      :value="getValue"
      @input="onInput"
      v-on="listeners"
      v-bind="$attrs"
    />
  </GFieldWrapper>
</template>

<script lang="ts">

import ClickOutside from '../../directives/ClickOutside.ts';
import GFieldWrapper from '../GFieldWrapper/GFieldWrapper.vue';

export default {
  name: 'GTextarea',
  components: {
    GFieldWrapper,
  },
  directives: {
    ClickOutside,
  },
  props: {
    value: {
      type: String,
      default: () => null,
    },
    type: {
      default: 'text',
      type: String,
    },
    isOutlineLabel: {
      default: false,
      type: Boolean,
    },
    success: {
      default: false,
      type: Boolean,
    },
    error: {
      default: false,
      type: Boolean,
    },
    disable: {
      default: false,
      type: Boolean,
    },
    label: {
      default: '',
      type: String,
    },
    feedback: {
      default: '',
      type: String,
    },
    icon: {
      default: '',
      type: String,
    },
  },

  computed: {
    getValue () {
      return this.value;
    },

    listeners () {
      const { input, ...rest } = this.$listeners;

      return rest;
    },
  },

  methods: {
    onInput (e: any) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
  textarea {
    min-height: 32px;
  }
</style>
