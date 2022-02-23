<template>
  <div :class="wrapperClass">
    <slot name="left-addon" />
    <GFieldWrapper
      class="body"
      :is-value="!!value"
      :icon-position="iconPosition"
      :is-outline-label="isOutlineLabel"
      :feedback="feedback"
      :label="label"
      :icon="icon"
      :success="success"
      :error="error"
      :disable="disable"
      :size="size"
      @icon-clicked="$emit('icon-clicked', $event)"
    >
      <!--
      @slot You can put select, button and box in this field
      -->
      <input
        :type="type"
        @input="onInput"
        v-on="getListeners"
        v-bind="getAttrs"
        ref="input"
        :disabled="disable"
        :class="labelClass"
        :value="getValue"
      >
      <!--
      @slot You can put select, button and box in this field
      -->
    </GFieldWrapper>
    <slot name="right-addon" />
  </div>
</template>

<script lang="ts">

import ClickOutside from '../../directives/ClickOutside';
import GFieldWrapper from '../GFieldWrapper/GFieldWrapper.vue';

export default {
  name: 'GInput',
  components: {
    GFieldWrapper,
  },
  directives: {
    ClickOutside,
  },
  props: {
    value: {
      type: [String, Number, Date],
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
    iconPosition: {
      default: '',
      type: String,
    },
    size: {
      default: 'big',
      type: String,
    },
  },
  computed: {
    getAttrs () {
      const { value, ...rest } = this.$attrs;
      return rest;
    },
    getListeners () {
      const { input, ...rest } = this.$listeners;
      return rest;
    },
    wrapperClass () {
      return {
        'g-input': true,
        'left-addon': !!this.$slots['left-addon'],
        'right-addon': !!this.$slots['right-addon'],
      };
    },
    labelClass () {
      let classValue;
      if (this.error) return 'g-text-red-500';
      if (this.success) return 'g-text-green-500';
      if (this.disable) return 'g-text-dark-grey-500';
      return classValue;
    },
    getValue () {
      return this.value;
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
.g-input {
  &.right-addon {
    display: flex;
    > .body {
      width: 100%;
      ::v-deep .g-field-wrapper {
        .content {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    }
    ::v-deep > .g-input {
      .g-field-wrapper .content {
        border-left: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: var(--radius-md);
        border-bottom-right-radius: var(--radius-md);
      }
    }
    ::v-deep > .g-button {
      z-index: 2;
      margin-left: -1px;
      height: fit-content;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    ::v-deep > .g-native-select {
      min-width: 20%;
      .g-field-wrapper .content {
        border-left: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: var(--radius-md);
        border-bottom-right-radius: var(--radius-md);
      }
    }
  }
  &.left-addon {
    display: flex;
    > .body {
      width: 100%;
      ::v-deep .g-field-wrapper {
        .content {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }
    ::v-deep > .g-input {
      .g-field-wrapper .content {
        border-right: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: var(--radius-md);
        border-bottom-left-radius: var(--radius-md);
      }
    }
    ::v-deep > .g-button {
      height: fit-content;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    ::v-deep > .g-native-select {
      min-width: 20%;
      .g-field-wrapper .content {
        border-right: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: var(--radius-md);
        border-bottom-left-radius: var(--radius-md);
      }
    }
  }
}
</style>
