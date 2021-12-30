<template>
  <GBox
    flex
    direction="row"
    align="center"
  >
    <label class="g-checkbox">
      <input
        type="checkbox"
        class="-input"
        v-bind="$attrs"
        v-on="listeners"
        :value="value"
        :checked="isChecked"
        @change="toggleInput"
      >
      <span
        class="-inner"
        :class="{
          '-disabled': $attrs.disabled,
          '-invalid': isInvalid,
          '-checked': isChecked,
          [`g-bg-${color}`]:isChecked,
          [`g-bg-white`]:!isChecked
        }"
      >
        <GIcon
          size="16px"
          :name="$attrs.indeterminate ? 'minus' : 'check'"
          :stroke="strokeColor"
        />
      </span>
    </label>
    <GBox
      :ml="10"
      v-if="hasSlot"
    >
      <slot />
    </GBox>
  </GBox>
</template>

<script lang="ts">

import GBox from '../GBox/GBox.vue';
import GIcon from '../GIcon/GIcon.vue';

export default {
  name: 'ScCheckbox',
  model: {
    prop: 'modelValue',
    event: 'input',
  },
  components: {
    GBox,
    GIcon,
  },

  props: {
    value: {
      // type: Object | String,
      default: null,
    },
    modelValue: {
      // type: Array | Boolean,
      default: null,
    },
    isInvalid: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'orange-500',
    },
  },

  data () {
    return {
      isChecked: false,
    };
  },

  computed: {
    hasSlot () {
      return typeof this.$slots.default !== 'undefined';
    },
    listeners () {
      const { change, input, ...restListeners } = this.$listeners;

      return restListeners;
    },
    strokeColor () {
      if (this.$attrs.disabled && this.isChecked) {
        return 'var(--light-grey-500)';
      } else if (this.$attrs.disabled && !this.isChecked) {
        return 'var(--bg-grey-500)';
      } else {
        return 'var(--white)';
      }
    },
    hasSlot () {
      return typeof this.$slots.default !== 'undefined';
    },
  },

  methods: {
    toggleInput (event) {
      this.isChecked = event.target.checked;
      let value;

      if (Array.isArray(this.modelValue)) {
        value = [...this.modelValue];

        if (this.isChecked) {
          value.push(this.value);
        } else {
          value = value
            .filter(val => val.id
              ? val.id !== this.value.id
              : val !== this.value);
        }
      } else {
        value = this.isChecked;
      }

      this.$emit('change', { event, value: this.value, checked: this.isChecked });
      this.$emit('input', value);
    },
  },

  watch: {
    modelValue: {
      handler (newModelValue) {
        if (Array.isArray(newModelValue)) {
          if (newModelValue.indexOf(this.value) !== -1) {
            this.isChecked = true;
          } else if (newModelValue.length === 0) {
            this.isChecked = false;
          }
        } else {
          this.isChecked = newModelValue;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .g-checkbox {
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: var(--spacing-16);
    height: var(--spacing-16);

    .-input {
      cursor: pointer;
      position: absolute;
      opacity: 0;
      top: var(--spacing-0);
      left: var(--spacing-0);
      width: var(--spacing-16);
      height: var(--spacing-16);
    }

    .-inner {
      text-align: center;
      width: var(--size-full);
      height: var(--size-full);
      border-radius: var(--radius-sm);
      display: flex;

      &.-checked {
        border: solid 1px transparent !important;
      }

      &.-disabled {
        background-color: var(--bg-grey-500);
        border: solid 1px var(--mid-grey-800) !important;
      }

      &.-invalid {
        border: solid 1px var(--red-500) !important;
      }

      &:not(.-invalid) {
        border: solid 1px var(--mid-grey-800);
      }
    }
  }
</style>
