<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    :class="classNames"
  >
    <div :class="contentClassname">
      <GIcon
        :class="slotClassName"
        :size="iconSize"
        class="-leftIcon"
        v-if="leftIcon"
        :name="leftIcon"
        :color="iconColor"
      />
      <slot />
      <GIcon
        v-if="icon"
        :size="iconSize"
        :name="icon"
        :color="iconColor"
      />
      <GIcon
        :class="slotClassName"
        :size="iconSize"
        class="-rightIcon"
        v-if="rightIcon"
        :name="rightIcon"
        :color="iconColor"
      />
    </div>
  </button>
</template>

<script lang="ts">

import GIcon from '../GIcon/GIcon.vue';
import $_ from '../../utils/dashUtil.ts';

const VALID_BUTTON_VARIANT = [
  'passive',
  'primary',
  'primary-darker',
  'secondary',
  'secondary-darker',
  'tertiary',
  'tertiary-darker',
  'success',
  'success-darker',
  'info',
  'info-darker',
  'warning',
  'warning-darker',
  'danger',
  'danger-darker',
  'light',
  'light-darker',
  'dark',
  'dark-darker',
  'gradient-purple',
  'link',
];

export default {
  name: 'GButton',
  components: {
    GIcon,
  },
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: function (value: string) {
        if (!VALID_BUTTON_VARIANT.includes(value)) {
          throw new Error(`Invalid prop. Give of of ${VALID_BUTTON_VARIANT.join(',')}`);
        }

        return true;
      },
    },
    size: {
      type: String,
      default: 'big',
    },
    fluid: {
      type: Boolean,
      default: false,
    },
    leftIcon: {
      type: String,
      default: undefined,
    },
    rightIcon: {
      type: String,
      default: undefined,
    },
    icon: {
      type: String,
      default: undefined,
    },
    iconColor: {
      type: String,
      default: 'white',
    },
    outline: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classNames () {
      return {
        'g-button': true,
        '-fluid': this.fluid,
        '-icon': this.icon || this.leftIcon || this.rightIcon,
        '-onlyIcon': !!this.icon,
        [$_(this.variant)]: true,
        '-outline': this.outline,
      };
    },
    contentClassname () {
      return {
        content: true,
        [$_(this.size)]: true,
      };
    },
    slotClassName () {
      return {
        'g-mr-10': !!this.leftIcon || false,
        'g-ml-10': !!this.rightIcon || false,
      };
    },
    iconSize () {
      return {
        big: 20,
        medium: 16,
        small: 12,
      }[this.size];
    },
  },
};
</script>

<style lang="scss" scoped>
.g-button {
  display: inline-block;
  outline: none;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  padding: 0;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: .65;
    pointer-events: none;
    user-select: none;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-family-base);
    font-size: var(--font-size-14);
    font-weight: 500;
    line-height: 1;
  }

  &.-fluid {
    width: 100%;
    justify-content: center;
  }

  .-big {
    padding: 12px 30px;
  }

  .-medium {
    padding: 8px 20px;
  }

  .-small {
    padding: 5px 15px;
    font-size: var(--font-size-12);
  }

  &.-icon {
    .-big {
      padding: 10px 30px;
    }
    .-medium {
      padding: 8px 20px;
    }
  }

  &.-onlyIcon {
    line-height: 0;
    .-big {
      padding: 10px;
    }
    .-medium {
      padding: 8px;
    }
    .-small {
      padding: 6px;
    }
  }

  &.-passive {
    background-color: white;
    border: 1px solid var(--mid-grey-100);
    color: var(--light-grey-100);
    .-big {
      padding: 11px 29px;
    }
    .-middle {
      padding: 7px 19px;
    }
    .-small {
      padding: 4px 14px;
    }
  }

  &.-primary {
    background-color: var(--orange-500);
    color: var(--white);

    &.-outline {
      background-color: transparent;
      background-image: none;
      border-color: var(--orange-500);
      color: var(--orange-500);

      &:hover {
        color: var(--white);
      }
      &.icon {
        color: var(--orange-500);
      }
    }

    &:hover {
      background-color: var(--orange-400);
    }
    &.icon {
      color: white;
    }
  }

  &.-primary-darker {
    background-color: var(--orange-300);
    color: white;
    &:hover {
      background-color: var(--orange-200);
    }
    &.icon {
      color: white;
    }
  }

  &.-secondary {
    background-color: var(--main-grey-500);
    color: white;

    &.-outline {
      background-color: transparent;
      background-image: none;
      border-color: var(--main-grey-500);
      color: var(--main-grey-500);

      &:hover {
        color: var(--white);
      }
      &.icon {
        color: var(--main-grey-500);
      }
    }

    &:hover {
      background-color: var(--main-grey-400);
    }
    &.icon {
      color: white;
    }
  }

  &.-secondary-darker {
    background-color: var(--main-grey-300);
    color: white;
    &:hover {
      background-color: var(--main-grey-200);
    }
    &.icon {
      color: white;
    }
  }

  &.-tertiary {
    background-color: var(--light-grey-500);
    color: white;

    &.-outline {
      background-color: transparent;
      background-image: none;
      border-color: var(--light-grey-500);
      color: var(--light-grey-500);

      &:hover {
        color: var(--white);
      }
      &.icon {
        color: var(--light-grey-500);
      }
    }

    &:hover {
      background-color: var(--light-grey-400);
    }
    &.icon {
      color: white;
    }
  }

  &.-tertiary-darker {
    background-color: var(--light-grey-300);
    color: white;
    &:hover {
      background-color: var(--light-grey-200);
    }
    &.icon {
      color: white;
    }
  }

  &.-success {
    background-color: var(--green-500);
    color: white;

    &.-outline {
      background-color: transparent;
      background-image: none;
      border-color: var(--green-500);
      color: var(--green-500);

      &:hover {
        color: var(--white);
      }
      &.icon {
        color: var(--green-500);
      }
    }

    &:hover {
      background-color: var(--green-400);
    }
    &.icon {
      color: white;
    }
  }

  &.-success-darker {
    background-color: var(--green-300);
    color: white;
    &:hover {
      background-color: var(--green-200);
    }
    &.icon {
      color: white;
    }
  }

  &.-info {
    background-color: var(--blue-500);
    color: white;

    &.-outline {
      background-color: transparent;
      background-image: none;
      border-color: var(--blue-500);
      color: var(--blue-500);

      &:hover {
        color: var(--white);
      }
      &.icon {
        color: var(--blue-500);
      }
    }

    &:hover {
      background-color: var(--blue-400);
    }
    &.icon {
      color: black;
    }
  }

  &.-info-darker {
    background-color: var(--blue-300);
    color: white;
    &:hover {
      background-color: var(--blue-200);
    }
    &.icon {
      color: white;
    }
  }

  &.-warning {
    background-color: var(--orange-500);
    color: white;

    &.-outline {
      background-color: transparent;
      background-image: none;
      border-color: var(--orange-500);
      color: var(--orange-500);

      &:hover {
        color: var(--white);
      }
      &.icon {
        color: var(--orange-500);
      }
    }

    &:hover {
      background-color: var(--orange-400);
    }
    &.icon {
      color: white;
    }
  }

  &.-warning-darker {
    background-color: var(--orange-300);
    color: white;
    &:hover {
      background-color: var(--orange-200);
    }
    &.icon {
      color: white;
    }
  }

  &.-danger {
    background-color: var(--red-500);
    color: white;

    &.-outline {
      background-color: transparent;
      background-image: none;
      border-color: var(--red-500);
      color: var(--red-500);

      &:hover {
        color: var(--white);
      }
      &.icon {
        color: var(--red-500);
      }
    }

    &:hover {
      background-color: var(--red-400);
    }
    &.icon {
      color: white;
    }
  }

  &.-danger-darker {
    background-color: var(--red-300);
    color: white;
    &:hover {
      background-color: var(--red-200);
    }
    &.icon {
      color: white;
    }
  }

  &.-light {
    background-color: var(--bg-grey-500);
    color: black;
    &:hover {
      background-color: var(--bg-grey-400);
    }
    &.icon {
      color: black;
      path {
        fill: black;
      }
    }
  }

  &.-light-darker {
    background-color: var(--bg-grey-300);
    color: white;
    &:hover {
      background-color: var(--bg-grey-200);
    }
    &.icon {
      color: white;
    }
  }

  &.-dark {
    background-color: var(--main-grey-500);
    color: white;
    &:hover {
      background-color: var(--main-grey-400);
    }
    &.icon {
      color: white;
      path {
        fill: white;
      }
    }
  }

  &.-link {
    background-color: transparent;
    color: var( --main-grey-500);
    text-decoration: underline;

    .content {
      font-weight: 400;
    }

    &:hover {
      text-decoration: underline;
    }
    &.icon {
      color: white;
      path {
        fill: white;
      }
    }
  }

  &.-dark-darker {
    background-color: var(--main-grey-300);
    color: white;
    &:hover {
      background-color: var(--main-grey-200);
    }
    &.icon {
      color: white;
    }
  }

  &.-gradient-purple {
    cursor: pointer;
    line-height: 1;
    display: inline-block;
    border: 1px solid transparent !important;
    padding: 0;
    border-radius: var(--radius-md);
    background-image: linear-gradient(180deg,var(--bg-grey-500),var(--bg-grey-500)),linear-gradient(100deg,var(--purple-500),var(--blue-500));
    background-origin: border-box;
    background-clip: content-box,border-box;
    text-decoration: none !important;
    svg {
      stroke: var(--purple-500);
    }
    .content {
      background-image: linear-gradient(96deg,var(--purple-500),var(--blue-500));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    &:hover {
      background-image: linear-gradient(280deg,var(--blue-500),var(--purple-500));
      .content {
        background-image: none;
        color: white;
        -webkit-text-fill-color: white;
      }
      svg {
        stroke: white;
      }
    }
    &.icon {
      color: white;
      path {
        fill: white;
      }
    }
  }
}
</style>
