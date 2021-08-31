<template>
  <div>
    <div
      :class="wrapperClass"
      v-click-outside="clickOutside"
      @click="clickWrapper"
    >
      <label
        v-if="hasLabel"
        v-text="label"
      />
      <div class="content">
        <slot />
        <GIcon
          :class="iconPosition"
          v-if="icon"
          :name="icon"
          :color="iconColor"
        />
      </div>
      <span
        v-if="feedback"
        class="sub-label"
        v-text="feedback"
      />
    </div>
  </div>
</template>

<script lang="ts">

import ClickOutside from '../../directives/ClickOutside';
import GIcon from '../GIcon/GIcon.vue';

export default {
  name: 'GFieldWrapper',
  components: {
    GIcon,
  },
  directives: {
    ClickOutside,
  },
  props: {
    isActiveContent: {
      default: false,
      type: Boolean,
    },
    isOutlineLabel: {
      default: false,
      type: Boolean,
    },
    isValue: {
      required: true,
      type: Boolean,
    },
    success: {
      default: false,
      type: Boolean,
    },
    error: {
      default: false,
      type: Boolean,
    },
    disable: {
      default: false,
      type: Boolean,
    },
    label: {
      default: '',
      type: String,
    },
    size: {
      default: 'big',
      type: String,
    },
    feedback: {
      default: '',
      type: String,
    },
    icon: {
      default: '',
      type: String,
    },
    iconPosition: {
      default: '',
      type: String,
    },
    onClick: {
      default: () => {},
      type: Function,
    },
    onOutlineClick: {
      default: () => {},
      type: Function,
    },
  },
  data () {
    return {
      isActive: false,
    };
  },
  watch: {
    isActiveContent (newValue) {
      this.isActive = newValue;
    },
  },
  computed: {
    wrapperClass () {
      return {
        'g-field-wrapper': true,
        '-outline': this.isOutlineLabel,
        '-borderline': !this.isOutlineLabel,
        '-top': this.isLabelTop,
        '-active': this.isActive,
        '-error': this.error,
        '-valid': this.success,
        '-disable': this.disable,
        'icon-left': this.iconPosition,
        [this.size]: true,
      };
    },
    iconColor () {
      const color = this.error
        ? 'red-500'
        : this.disable
          ? 'mid-grey-500'
          : this.success
            ? 'green-500'
            : 'light-grey-500';
      return color;
    },
    isLabelTop: {
      get () {
        return this.isValue || false;
      },
    },
    hasLabel (): Boolean {
      return !!this.label.length;
    },
  },
  methods: {
    clickWrapper () {
      this.isActive = !this.isActive;
      this.$emit('update:isActiveContent', this.isActive);
      this.onClick();
    },
    clickOutside () {
      this.isActive = false;
      this.$emit('update:isActiveContent', this.isActive);
      this.onOutlineClick();
    },
  },
};
</script>

<style lang="scss" scoped>
.g-field-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;

  label {
    z-index: 2;
    color: var(--dark-grey-500);
  }

  &.-outline {
    label {
      font-family: var(--font-family-base);
      font-size: var(--font-size-14);
      font-weight: 500;
      pointer-events: none;
      transition: 300ms ease all;
      margin-bottom: 5px;
      padding-left: 15px;
    }
  }

  &.-borderline {
    label {
      font-family: var(--font-family-base);
      font-size: var(--font-size-14);
      font-weight: 500;
      position: absolute;
      pointer-events: none;
      left: 15px;
      transition: 300ms ease all;
    }

    &.-top {
      label {
        top: -5px;
        font-size: var(--font-size-12);
        color: var(--orange-500);
        padding: 0;
        background: white;
        z-index: 2;
      }
    }
  }
  .sub-label {
    font-family: var(--font-family-base);
    font-size: var(--font-size-12);
    font-weight: normal;
    margin-top: 5px;
    margin-left: 15px;
    color: var(--dark-grey-500);
  }

  &.-disable {
    &.-borderline label {
      background: var(--bg-grey-500);
    }
  }

  /* Variants */

  &.-error {
    .content {
      border-color: var(--red-500) !important;
    }
    label,
    .sub-label {
      color: var(--red-500);
    }
  }
  &.-valid {
    .content {
      border-color: var(--green-500) !important;
    }
    label,
    .sub-label {
      color: var(--green-500);
    }
  }
  &.-disable {
    .content {
      border-color: var(--mid-grey-800) !important;
      input,
      textarea,
      select {
        background: var(--bg-grey-500);
        color: var(--main-grey-500);
      }
    }
    label,
    .sub-label {
      color: var(--dark-grey-500);
    }
  }

  .content {
    position: relative;
    border-radius: var(--radius-md);
    border-width: 1px;
    border-style: solid;
    border-color: var(--mid-grey-800);
    display: flex;
    width: 100%;

    input,
    textarea,
    select {
      font-family: var(--font-family-base);
      font-size: var(--font-size-14);
      width: 100%;
      display: block;
      padding: 11px 40px 11px 15px;
      background: none;
      border: none;
      border-radius: 5px;
      &:focus {
        outline: none;
      }
    }

    input[type='password'] {
      letter-spacing: 0.3em;
    }
    .g-icon {
      margin: 7px 10px 0;
      position: absolute;
      right: 0;

      &.icon-left{
        left: 0;
        margin-left: 15px;
      }
    }
  }
  &.big {
    .content {
      input,
      textarea,
      select {
        padding: 11px 40px 11px 15px;
      }
    }
    label {
      top: 13px;
    }
  }
  &.small {
    .content {
      input,
      textarea,
      select {
        padding: 7px 40px 7px 15px;
      }
    }
    label {
      top: 10px;
      font-size: var(--font-size-12);
    }
    .g-icon {
      width: 20px;
      margin-top: 3px;
    }
  }

  &.icon-left{
   .content{
     input,
     textarea,
     select {
       padding-left: 50px;
     }
   }
    label{
      left: 50px;
    }
  }
}
</style>
