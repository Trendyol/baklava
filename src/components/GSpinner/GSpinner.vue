<template>
  <div :class="classNames">
    <div />
    <div />
    <div />
    <div />
  </div>
</template>

<script lang="ts">

import $_ from '../../utils/dashUtil.ts';

export default {
  name: 'Spinner',
  props: {
    variant: {
      type: String,
      default: 'medium',
    },
  },
  computed: {
    classNames () {
      return {
        'g-spinner': true,
        [$_(this.variant)]: true,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.g-spinner {
  display: inline-block;
  position: relative;

  &.-medium {
    width: 24px;
    height: 24px;

    div {
      width: 24px;
      height: 24px;
    }
  }

  &.-small {
    width: 16px;
    height: 16px;

    div {
      width: 16px;
      height: 16px;
      margin: 3px;
    }
  }

  &.-extra-small {
    width: 10px;
    height: 10px;

    div {
      width: 10px;
      height: 10px;
    }
  }
}

.g-spinner div {
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  margin: 3px;
  border: 2px solid #f27a1a;
  border-radius: 50%;
  animation: g-spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #f27a1a transparent transparent transparent;
}

.g-spinner div:nth-child(1) {
  animation-delay: -0.45s;
}

.g-spinner div:nth-child(2) {
  animation-delay: -0.3s;
}

.g-spinner div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes g-spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
