<template>
  <div :class="wrapperClass">
    <GFieldWrapper
      :is-value="!!value"
      :is-outline-label="isOutlineLabel"
      :feedback="feedback"
      :label="label"
      icon="chevron-down"
      :success="success"
      :error="error"
      :disable="disable"
    >
      <select
        :value="value[valueKey] || options[0][valueKey]"
        @input="onInput"
        v-on="listeners"
        v-bind="$attrs"
      >
        <option
          v-for="option in options"
          :value="option[valueKey]"
          :key="option[valueKey]"
          :disabled="option.disabled"
          :hidden="option.hidden"
        >
          {{ option[textKey] }}
        </option>
        <select />
      </select>
    </GFieldWrapper>
  </div>
</template>

<script lang="ts">

import ClickOutside from '../../directives/ClickOutside.ts';
import GFieldWrapper from '../GFieldWrapper/GFieldWrapper.vue';

export default {
  name: 'GNativeSelect',
  components: {
    GFieldWrapper,
  },
  directives: {
    ClickOutside,
  },
  props: {
    type: {
      default: 'text',
      type: String,
    },
    isOutlineLabel: {
      default: false,
      type: Boolean,
    },
    isBorderless: {
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
    valueKey: {
      type: String,
      default: 'value',
    },
    textKey: {
      type: String,
      default: 'text',
    },
    options: {
      required: true,
      type: Array,
    },
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    wrapperClass () {
      return {
        'g-native-select': true,
        '-borderless': this.isBorderless,
      };
    },
    listeners () {
      const { input, ...rest } = this.$listeners;

      return rest;
    },
  },
  methods: {
    onInput (event: any) {
      const selectedItem = this.options.find((item: any) => (item[this.valueKey] || '').toString() === event.target.value);

      if (selectedItem) {
        this.$emit('input', selectedItem);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .g-native-select {
    ::v-deep .g-field-wrapper {
      .content select {
        -webkit-appearance: none;
        z-index: 2;
        color: var(--main-grey-500);
      }

      &.big .content {
        height: 38px;
      }

      &.small .content {
        height: 32px;
      }
    }

    &.-borderless {
      ::v-deep .g-field-wrapper {
        label {
          background: linear-gradient(180deg, white 50%, var(--bg-grey-500) 50%);
        }

        .content {
          border: none;
          background: var(--bg-grey-500);
          color: var(--main-grey-500);
        }
      }
    }
  }
</style>
