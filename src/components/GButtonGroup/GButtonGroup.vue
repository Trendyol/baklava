<template>
  <div :class="classNames">
    <slot />
  </div>
</template>

<script lang="ts">

import $_ from '../../utils/dashUtil.ts';

export default {
  name: 'GButtonGroup',

  props: {
    variant: {
      type: String,
      default: 'light',
    },
  },
  computed: {
    classNames () {
      return {
        'g-button-group': true,
        [$_(this.variant)]: true,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.g-button-group {
  display: flex;
  border-radius: var(--radius-md);
  width: max-content;

  &.-primary {
    background-color: var(--orange-500);
  }

  &.-primary-darker {
    background-color: var(--orange-300);
  }

  &.-secondary {
    background-color: var(--main-grey-500);
  }

  &.-secondary-darker {
    background-color: var(--main-grey-300);
  }

  &.-tertiary {
    background-color: var(--light-grey-500);
  }

  &.-tertiary-darker {
    background-color: var(--light-grey-300);
  }

  &.-success {
    background-color: var(--green-500);
  }

  &.-success-darker {
    background-color: var(--green-300);
  }

  &.-info {
    background-color: var(--blue-500);
  }

  &.-info-darker {
    background-color: var(--blue-300);
  }

  &.-warning {
    background-color: var(--orange-500);
  }

  &.-warning-darker {
    background-color: var(--orange-300);
  }

  &.-danger {
    background-color: var(--red-500);
  }

  &.-danger-darker {
    background-color: var(--red-300);
  }

  &.-light {
    background-color: var(--bg-grey-500);
  }

  &.-light-darker {
    background-color: var(--bg-grey-300);
  }

  &.-dark {
    background-color: var(--main-grey-500);
  }

  &.-dark-darker {
    background-color: var(--main-grey-300);
  }

  &.-gradient-purple {
    background-image: linear-gradient(180deg,white,white),linear-gradient(100deg,var(--purple-500),var(--blue-500));
    background-origin: border-box;
    background-clip: content-box,border-box;
    text-decoration: none !important;
  }

}
</style>
