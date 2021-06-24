<template>
  <span>
    <span
      v-for="c in count"
      :key="c"
      class="g-skeleton"
      :style="styles()"
    />
  </span>
</template>

<script lang="ts">


export default {
  name: 'GSkeleton',
  props: {
    count: {
      default: 1,
      type: Number,
    },
    maxWidth: {
      default: 100,
      type: Number,
    },
    minWidth: {
      default: 80,
      type: Number,
    },
    width: {
      default: null,
      type: String,
    },
    height: {
      default: '1em',
      type: String,
    },
    circle: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    styles () {
      return {
        height: this.height,
        width: this.width || this.customWidth(),
        'border-radius': this.circle ? '50%' : '0%',
      };
    },
    customWidth () {
      return `${Math.floor((Math.random() * (this.maxWidth - this.minWidth)) + this.minWidth)}%`;
    },
  },
};
</script>

<style lang="scss" scoped>
.g-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  background-color: var(--bg-grey-200);

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba(#fff, 0) 0,
        rgba(#fff, 0.2) 20%,
        rgba(#fff, 0.5) 60%,
        rgba(#fff, 0)
      );
      animation: shimmer 2s infinite;
      content: '';
    }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
