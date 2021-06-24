<template>
  <GBox
    :class="classes"
    flex
    align="items-center"
  >
    <GIcon
      v-if="showIcon"
      :name="iconType"
      :size="iconSize"
    />
    <GBox class="content">
      <slot />
    </GBox>
  </GBox>
</template>

<script>

import GIcon from '../GIcon/GIcon.vue';
import GBox from '../GBox/GBox.vue';
import $_ from '../../utils/dashUtil.ts';

export default {
  name: 'GAlert',
  components: { GBox, GIcon },
  props: {
    variant: {
      type: String,
      default: 'error',
    },
    icon: {
      type: String,
      default: undefined,
    },
    iconSize: {
      type: [Number, String],
      default: '16px',
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes () {
      return {
        'g-alert': true,
        [$_(this.variant)]: true,
        '-border': this.border,
      };
    },

    iconType () {
      const icons = {
        alert: 'alert-circle',
        warning: 'alert-triangle',
        success: 'check-circle',
        info: 'info',
      };

      return this.icon || icons[this.variant] || 'alert-circle';
    },
  },
};
</script>

<style lang="scss" scoped>
  .g-alert {
    width: 100%;
    padding: 15px;
    border-radius: 4px;
    font-size: var(--font-size-12);

    .content {
      font-weight: 500;
    }

    .g-icon {
      margin-right: 10px;
    }

    &.-success {
      background-color: var(--green-900);
      color: var(--green-500);

      &.-border {
        border: 1px solid var(--green-300)
      }
    }

    &.-info {
      background-color: var(--blue-900);
      color: var(--blue-500);

      &.-border {
        border: 1px solid var(--blue-300)
      }
    }

    &.-warning {
      background-color: var(--orange-900);
      color: var(--orange-500);

      &.-border {
        border: 1px solid var(--orange-300)
      }
    }

    &.-error {
      background-color: var(--red-900);
      color: var(--red-500);

      &.-border {
        border: 1px solid var(--red-300)
      }
    }
  }
</style>
