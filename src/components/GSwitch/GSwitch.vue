<template>
  <label :class="classNames">
    <input
      ref="checkbox"
      type="checkbox"
      @change.prevent="handleChange"
      :disabled="disabled"
    >
    <span :class="contentClassname" />
  </label>
</template>

<script lang="ts">

import $_ from '../../utils/dashUtil.ts';

export default {
  name: 'GSwitch',
  props: {
    value: {
      type: [Boolean, Object],
      default: () => false,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    size: {
      default: 'big',
      type: String,
    },
  },
  computed: {
    classNames () {
      return {
        'g-switch': true,
        disabled: this.disabled,
      };
    },
    contentClassname () {
      return {
        [$_(this.size)]: true,
      };
    },
  },
  methods: {
    handleChange () {
      this.$emit('input', !this.value);
      this.$emit('changeToggle');
    },
  },
  watch: {
    value () {
      this.$refs.checkbox.checked = this.value;
    },
  },
  mounted () {
    this.$refs.checkbox.checked = this.value;
  },
};
</script>

<style lang="scss" scoped>
  .g-switch {
    cursor: pointer;
    position: relative;
    display: inline-flex;
    margin: 0;

    &.disabled {
      cursor: not-allowed;
    }
    &.disabled span {
      background-color: var(--bg-grey-500);
    }
    &.disabled input:checked + span {
      background-color: var(--green-900);
    }

    input {
      display:none;
    }

    input:checked + span {
      background-color: var(--green-500);
    }

    span {
      background-color: var(--mid-grey-800);
      position: relative;
      display: inline-block;
      transition: background-color .4s ease;
    }

    span:before{
      position: absolute;
      content: "";
      top: 2px;
      left: 2px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }

    span.-big{
      width: 76px;
      height: 40px;
      border-radius: 20px;
    }

    span.-big:before {
      height: 36px;
      width: 36px;
      border-radius: 18px;
    }

    input:checked + span.-big:before {
      transform: translateX(36px);
    }

    span.-medium{
      width: 60px;
      height: 32px;
      border-radius: 16px
    }

    span.-medium:before {
      height: 28px;
      width: 28px;
      border-radius: 14px;
    }

    input:checked + span.-medium:before {
      transform: translateX(28px);
    }

    span.-small{
      width: 44px;
      height: 24px;
      border-radius: 12px
    }

    span.-small:before {
      height: 20px;
      width: 20px;
      border-radius: 11px;
    }

    input:checked + span.-small:before {
      transform: translateX(20px);
    }
  }
</style>
