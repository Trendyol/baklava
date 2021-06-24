<template>
  <div class="g-tooltip">
    <slot name="tooltip-trigger" />
    <span
      class="text"
      :class="placementClass"
    >
      <i class="arrow" />
      <span>
        {{ text }}
        <slot name="tooltip-text" />
      </span>
    </span>
  </div>
</template>

<script>

import $_ from '../../utils/dashUtil.ts';

export default {
  name: 'GTooltip',
  props: {
    text: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'dark',
    },
    placement: {
      type: String,
      default: 'right',
    },
  },
  computed: {
    tooltipClass () {
      return {
        [$_(this.variant)]: true,
      };
    },
    placementClass () {
      return {
        [$_(this.placement)]: true,
        [$_(this.variant)]: true,
      };
    },
    borderColorVars () {
      if (this.variant) {
        switch (this.variant) {
          case 'primary':
            return { '--border-color': 'var(--orange-500)' };
          case 'secondary':
            return { '--border-color': 'var(--main-grey-500)' };
          case 'tertiary':
            return { '--border-color': 'var(--light-grey-500)' };
          case 'success':
            return { '--border-color': 'var(--green-500)' };
          case 'info':
            return { '--border-color': 'var(--blue-500)' };
          case 'danger':
            return { '--border-color': 'var(--red-500)' };
          case 'dark':
            return { '--border-color': 'var(--main-grey-500)' };
          default:
            return { '--border-color': 'var(--main-grey-500)' };
        }
      }
      return this.variant && { '--border-color': 'var(--orange-500)' };
    },
  },
};
</script>

<style lang="scss" scoped>
.g-tooltip {
  position: relative;
  display: inline-block;

  .text {
    position: absolute;
    font-family: var(--font-family-base);
    z-index: var(--zindex-tooltip);
    top: 50%;
    transform: translateY(-50%);
    left: 100%;
    max-width: 200px;
    max-height: 200px;
    text-align: left;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.4s ease;

    & > i.arrow {
      position: absolute;
      top: 50%;
      left: -2px;
      display: inline-block;
      transform: translateY(-50%);

      &.light {
        &:before {
          border: solid #fff;
        }
      }

      &:before {
        position: relative;
        content: '';
        border-style: solid;
        display: inline-block;
        padding: 3px;
      }
    }

    & > span {
      display: inline-block;
      color: #f1f1f1;
      border-radius: 4px;
      padding: 8px 12px;
      margin-top: 5px;
    }

    &.-success {
      i:before {
          border-color: var(--green-500);
      }
      & > span {
        background: var(--green-500);
      }
    }

    &.-primary {
      i:before {
          border-color: var(--orange-500);
      }
      & > span {
        background: var(--orange-500);
      }
    }

    &.-secondary {
      i:before {
          border-color: var(--main-grey-500);
      }
      & > span {
        background: var(--main-grey-500);
      }
    }

    &.-tertiary {
      i:before {
          border-color: var(--light-grey-500);
      }
      & > span {
        background: var(--light-grey-500);
      }
    }

    &.-info {
      i:before {
          border-color: var(--blue-500);
      }
      & > span {
        background: var(--blue-500);
      }
    }

    &.-warning {
      i:before {
          border-color: var(--orange-500);
      }
      & > span {
        background: var(--orange-500);
      }
    }

    &.-danger {
      i:before {
          border-color: var(--red-500);
      }
      & > span {
        background: var(--red-500);
      }
    }

    &.-light {
      i:before {
          border-color: var(--bg-grey-500);
      }
      & > span {
        background: var(--bg-grey-500);
        color: var(--main-grey-500);
      }
    }

    &.-dark {
      i:before {
          border-color: var(--main-grey-500);
      }
      & > span {
        background: var(--main-grey-500);
      }
    }

    &.-right {
      margin-left: 10px;

      & > i.arrow:before {
        border-width: 3px 0 0 3px;
        transform: rotate(-45deg);
      }

      &.start {
        top: 0;
        transform: translateY(0);
        & > i.arrow {
          top: 0;
          transform: translateY(0);
        }
      }

      &.end {
        top: initial;
        bottom: 0;
        transform: translateY(0);
        & > i.arrow {
          top: initial;
          bottom: 0;
          transform: translateY(0);
        }
      }
    }

    &.-left {
      margin-right: 10px;
      left: initial;
      right: 100%;

      & > i.arrow {
        left: initial;
        right: -2px;

        &:before {
          border-width: 3px 3px 0 0;
          transform: rotate(45deg);
        }
      }

      &.start {
        top: 0;
        transform: translateY(0);
        & > i.arrow {
          top: 0;
          transform: translateY(0);
        }
      }

      &.end {
        top: initial;
        bottom: 0;
        transform: translateY(0);
        & > i.arrow {
          top: initial;
          bottom: 0;
          transform: translateY(0);
        }
      }
    }

    &.-top {
      margin-bottom: 10px;
      top: initial;
      bottom: 100%;
      left: 50%;
      width: auto;
      transform: translate(-50%, 0);

      & > i.arrow {
        top: initial;
        left: 50%;
        bottom: -5px;
        transform: translate(-50%, 0);
        &:before {
          border-width: 0 3px 3px 0;
          transform: rotate(45deg);
        }
      }

      &.start {
        & > i.arrow {
          left: 5px;
          transform: translateX(0);
        }
      }

      &.end {
        & > i.arrow {
          left: initial;
          right: 5px;
          transform: translateX(0);
        }
      }
    }

    &.-bottom {
      margin-top: 6px;
      top: 100%;
      left: 50%;
      width: auto;
      transform: translate(-50%, 0);

      & > i.arrow {
        top: -1px;
        left: 50%;
        transform: translate(-50%, 0);
        &:before {
          border-width: 3px 3px 0 0;
          transform: rotate(-45deg);
        }
      }

      &.start {
        left: 0;
        transform: translate(0, 0);

        & > i.arrow {
          left: 5px;
          transform: translateX(0);
        }
      }

      &.end {
        right: 0;
        transform: translate(0, 0);
        & > i.arrow {
          left: initial;
          right: 5px;
          transform: translateX(0);
        }
      }
    }
  }

  &:hover {
    .text {
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>
