<template>
  <label class="g-radio">
    <input
      type="radio"
      v-bind="$attrs"
      v-on="listeners"
      :name="name"
      :value="val"
      :checked="isChecked"
      @click="click"
    >
    <GText
      variant="body"
      :class="{
        '-disabled': $attrs.disabled,
        '-disabled-checked': $attrs.disabled && isChecked,
      }"
    >
      <slot />
    </GText>
  </label>
</template>

<script lang="ts">

import GText from '../GText/GText.vue';

export default {
  name: 'GRadio',
  inheritAttrs: false,
  components: {
    GText,
  },
  props: {
    value: {
      type: [Boolean, String, Number, Object],
      default: '',
    },
    val: {
      type: [Boolean, String, Number, Object],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  methods: {
    click (): void {
      if (!this.$attrs.disabled && this.value !== this.val) {
        this.$emit('input', this.val);
      }
    },
  },
  computed: {
    isChecked (): boolean {
      return this.value === this.val;
    },
    listeners (): {} {
      const { input, ...rest } = this.$listeners;

      return rest;
    },
  },
};
</script>

<style lang="scss" scoped>
  .g-radio {
    cursor: pointer;
    margin-right: var(--spacing-30);

    input[type=radio] {
      display: none;

      &:checked + ::v-deep .g-text::after {
        opacity: 1;
      }

    }

    ::v-deep .g-text {
      display: inline-block;
      position: relative;
      padding-left: 26px;

      &:hover::before {
        border: 1px solid var(--orange-500);
      }

      &::before {
        content: '';
        position: absolute;
        top: var(--spacing-0);
        left: var(--spacing-0);
        width: var(--spacing-16);
        height: var(--spacing-16);
        border-radius: var(--radius-full);
        border: 1px solid var(--mid-grey-800);
        background-color: var(--white);
      }

      &::after {
        content: '';
        padding: var(--spacing-4);
        position: absolute;
        top: var(--spacing-0);
        left: var(--spacing-0);
        width: var(--spacing-10);
        height: var(--spacing-10);
        border: 4px solid var(--orange-500);
        border-radius: var(--radius-full);
        background-color: var(--white);
        opacity: 0;
      }

      &.-disabled {
        &::before {
          background-color: var(--bg-grey-500);
          border: solid 1px var(--mid-grey-800);
        }
      }

      &.-disabled-checked {
        &::after {
          content: '';
          position: absolute;
          top: var(--spacing-4);
          left: var(--spacing-4);
          width: var(--spacing-4);
          height: var(--spacing-4);
          background-color: var(--light-grey-500);
          border: 0 solid transparent;
        }
      }

    }
  }
</style>
