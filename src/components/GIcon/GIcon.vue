<template>
  <svg
    v-bind="this.attrs"
    v-on="$listeners"
    :class="classNames"
    :dataName="this.name"
    :dataTags="tags"
    :dataType="this.name"
    v-html="icon.contents"
  />
</template>

<script lang="ts">

import feather from 'feather-icons';

export default {
  name: 'GIcon',
  props: {
    animation: {
      type: String,
      default: undefined,
    },
    animationSpeed: {
      type: String,
      default: undefined,
    },
    fill: {
      type: String,
      default: 'none',
    },
    size: {
      type: [Number, String],
      default: '24px',
    },
    stroke: {
      type: String,
      default: 'currentColor',
    },
    strokeLinecap: {
      type: String,
      default: 'round',
    },
    strokeLinejoin: {
      type: String,
      default: 'round',
    },
    strokeWidth: {
      type: [Number, String],
      default: 2,
    },
    tag: {
      type: String,
      default: 'i',
    },
    name: {
      type: String,
      required: true,
      validator (name) {
        if (!feather.icons[name]) {
          throw new Error(`"${name}" is not an available icon type.`);
        }
        return true;
      },
    },
    color: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    icon () {
      return feather.icons[this.name];
    },
    tags () {
      return feather.icons[this.name] ? feather.icons[this.name].tags : '';
    },
    classNames () {
      const classes = {
        'g-icon': true,
        feather: true,
        [`feather--${this.name}`]: true,
        [`feather--${this.animation}`]: this.animation,
        [`feather--${this.animationSpeed}`]: this.animationSpeed,
      };
      return classes;
    },
    attrs () {
      return {
        ...this.icon.attrs,
        fill: this.fill,
        height: this.size,
        stroke: this.color ? `var(--${this.color})` : this.stroke,
        'stroke-linecap': this.strokeLinecap,
        'stroke-linejoin': this.strokeLinejoin,
        'stroke-width': this.strokeWidth,
        width: this.size,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes feather--spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.feather {
  display: inline-block;
  overflow: hidden;
  &--spin {
    animation: feather--spin 2s linear infinite;
  }
  &--pulse {
    animation: feather--spin 2s infinite steps(8);
  }
  &--slow {
    animation-duration: 3s;
  }
  &--fast {
    animation-duration: 1s;
  }
  &__content {
    display: block;
    height: inherit;
    width: inherit;
  }
}
</style>
