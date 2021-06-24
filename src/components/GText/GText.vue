<template>
  <div :class="classNames">
    <slot />
  </div>
</template>

<script lang="ts">

import $_ from '../../utils/dashUtil.ts';

export default {
  name: 'GText',
  props: {
    variant: {
      type: String,
      default: 'body',
    },
    color: {
      type: String,
      default: 'main-grey-500',
    },
    inline: {
      type: Boolean,
      default: false,
    },
    align: {
      type: String,
      default: null,
    },
  },
  computed: {
    classNames () {
      return {
        [`g-text-${this.color}`]: true,
        [`g-text-align-${this.align}`]: this.align != null,
        [$_(this.variant)]: true,
        '-inline': this.inline,
        'g-text': true,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.g-text {
  font-family: var(--font-family-base);
  line-height: normal;

  &.-headline-01 {
    font-size: var(--font-size-64);
    font-weight: bold;
    letter-spacing: -2px;
  }

  &.-headline-02 {
    font-size: var(--font-size-48);
    font-weight: normal;
    letter-spacing: normal;
  }

  &.-headline-03 {
    font-size: var(--font-size-30);
    font-weight: 300;
    letter-spacing: normal;
  }

  &.-headline-04 {
    font-size: var(--font-size-24);
    font-weight: 500;
    letter-spacing: normal;
  }

  &.-subtitle-01 {
    font-size: var(--font-size-20);
    font-weight: 500;
    letter-spacing: normal;
  }

  &.-subtitle-02 {
    font-size: var(--font-size-16);
    font-weight: 500;
    letter-spacing: normal;
  }

  &.-subtitle-03 {
    font-size: var(--font-size-14);
    font-weight: 500;
    letter-spacing: normal;
  }

  &.-body {
    font-size: var(--font-size-14);
    letter-spacing: normal;
  }

  &.-caption {
    font-size: var(--font-size-12);
    letter-spacing: normal;
  }

  &.-menu-item {
    font-size: var(--font-size-12);
    font-weight: 500;
    letter-spacing: normal;
  }

  &.-small {
    font-size: var(--font-size-10);
    letter-spacing: normal;
  }

  &.-inline {
    display: inline;
  }
}
</style>
