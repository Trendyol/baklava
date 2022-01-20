<template>
  <transition name="modal-fade">
    <GBox
      class="g-modal"
      v-show="value"
    >
      <GBox
        class="g-modal-mask"
        @click="close"
      />
      <GBox
        :class="classNames"
        class="g-modal-wrapper"
      >
        <GBox
          :p="30"
          class="g-modal-container g-d-flex g-d-direction-column"
        >
          <GBox
            flex
            justify="space-between"
            class="g-modal-header"
          >
            <GText variant="headline-04">
              {{ title }}
            </GText>
            <GIcon
              name="x"
              color="light-grey-500"
              @click="close"
            />
          </GBox>

          <GBox
            :class="hasFooterSlot ? 'g-my-30' : 'g-mt-30'"
            class="g-modal-body"
          >
            <slot name="body" />
          </GBox>

          <GBox class="g-modal-footer">
            <slot name="footer" />
          </GBox>
        </GBox>
      </GBox>
    </GBox>
  </transition>
</template>

<script lang="ts">
import GBox from '../GBox/GBox.vue';
import GText from '../GText/GText.vue';
import GIcon from '../GIcon/GIcon.vue';

export default {
  name: 'GModal',
  components: { GBox, GText, GIcon },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classNames () {
      return {
        '-large': this.large,
        '-small': this.small,
        '-scrollable': this.scrollable,
      };
    },
    hasFooterSlot () {
      return !!this.$slots.footer;
    },
  },
  methods: {
    close (): void {
      this.$emit('input', !this.value);
      this.$emit('close');
    },
  },

  beforeDestroy () {
    document.body.classList.remove('g-no-scroll');
  },

  watch: {
    value: {
      handler (newValue: boolean) {
        if (newValue) {
          document.body.classList.add('g-no-scroll');
        } else {
          document.body.classList.remove('g-no-scroll');
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.g-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  outline: 0;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0,0,0,.45);
}

.g-modal-wrapper {
  left: 0;
  right: 0;
  top: 30%;
  width: 100%;
  z-index: 1051;
  margin: 0 auto;
  max-width: 636px;
  position: fixed;
  pointer-events: none;

  &.-large {
    max-width: 858px;
  }

  &.-small {
    max-width: 414px;
  }

  &.-scrollable {
    max-height: calc(100% - 3.5rem);

    .g-modal-container {
      max-height: calc(50vh);
    }

    .g-modal-body {
      overflow-y: auto;
    }
  }

  .g-modal-container {
    position: relative;
    width: 100%;
    pointer-events: auto;
    background-clip: padding-box;
    outline: 0;
    border-radius: 6px;
    box-shadow: 0 30px 30px -20px rgba(39, 49, 66, 0.5);
    background-color: var(--white);

    .g-modal-header {
      svg {
        cursor: pointer;
      }
    }
  }
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease
}
</style>
