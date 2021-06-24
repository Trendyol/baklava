<template>
  <div
    :class="badgeContainerClass"
  >
    <div
      v-if="dot"
      :class="badgeClass"
    />
    <div
      v-else
      :class="badgeClass"
    >
      <GText
        v-if="text"
        variant="caption"
        :color="textColor"
      >
        {{ text }}
      </GText>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>

import GText from '../GText/GText.vue';
export default {
  name: 'GBadge',
  components: { GText },
  props: {
    border: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    dot: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: false,
    },
    overlap: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: 'orange-100',
    },
    borderColor: {
      type: String,
      default: 'mid-grey-100',
    },
    textColor: {
      type: String,
      default: 'white',
    },
    text: {
      type: String,
      default: '0',
    },
  },
  computed: {
    badgeClass () {
      return {
        badge: true,
        overlap: this.overlap,
        bottom: this.bottom,
        left: this.left,
        dot: this.dot,
        inline: this.inline,
        border: this.border && !this.dot,
        [`g-border-${this.borderColor}`]: true,
        [`g-bg-${this.backgroundColor}`]: true,
      };
    },
    badgeContainerClass () {
      return {
        'g-badge': true,
        inline: this.inline,
        left: this.left,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  .g-badge{
    position: relative;
    display: inline-block;
    line-height: 1;
    &.inline{
      display: inline-flex;
      align-items: center;
      flex-direction: row-reverse;
      &.left{
        flex-direction: row;
      }
    }
    & .badge{
      position: absolute;
      text-align: center;
      min-width: 20px;
      height: 20px;
      padding: 3px 0;
      border-radius: 10px;
      bottom: calc(100% - 6px);
      left: calc(100% - 6px);
      right: auto;
      top: auto;

      &.left{
        right: calc(100% - 6px);
        left: auto;
      }
      &.bottom{
        top: calc(100% - 6px);
        bottom: auto;
      }
      &.border{
        border: 2px solid;
        padding: 1px 0;
      }
      &.overlap {
        bottom: calc(100% - 10px);
        left: calc(100% - 10px);
        right: auto;
        top: auto;
        &.left{
          right: calc(100% - 10px);;
          left: auto;
        }
        &.bottom{
          top: calc(100% - 10px);;
          bottom: auto;
        }
      }
      &.dot{
        min-width: 8px;
        width: 8px;
        height: 8px;
        padding: 0;
        &:not(.overlap){
          top: -6px;
          right: -6px;
          left: auto;
          bottom: auto;
          &.left{
            right: auto;
            left: -6px;
          }
          &.bottom{
            top: auto;
            bottom: -6px;
          }
        }
        &.overlap{
          top: -2px;
          right: -2px;
          left: auto;
          bottom: auto;
          &.left{
            right: auto;
            left: -2px;
          }
          &.bottom{
            top: auto;
            bottom: -2px;
          }
        }
      }
      &.inline{
        position: relative;
        margin: 0 4px;
        top: auto;
        left: auto;
        right: auto;
        bottom: auto;

      }
    }
  }
</style>
