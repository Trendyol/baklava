<template>
  <label
    class="g-radio-group-filter"
    :class="{
      '-disabled': $attrs.disabled,
      '-checked': isChecked
    }"
  >
    <input
      type="radio"
      v-bind="$attrs"
      v-on="listeners"
      :name="name"
      :value="val"
      :checked="isChecked"
      @click="click"
    >
    <span>
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
export default {
  name: 'GRadioGroupFilter',
  components: {},
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
.g-radio-group-filter {
  cursor: pointer;
  border-radius: 16px;
  border: solid 1px var(--mid-grey-500);
  background-color: var(--white);
  padding: 8px 20px;
  font-size: var(--font-size-14);
  color: var(--mid-grey-500);

  input[type=radio] {
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }

  span {
    line-height: normal;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }

  &.-checked {
    background-color: var(--main-grey-500);
    border: none !important;
    color: var(--white);
  }
}
</style>
