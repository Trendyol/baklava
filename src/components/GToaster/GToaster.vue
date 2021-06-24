<template>
  <div class="toaster-wrapper">
    <transition-group name="fade">
      <div
        v-for="item in reversedItems"
        :key="item.id"
        :class="[item.variantObject.className]"
        class="toaster"
        @click="!item.closeOnClick || onClose(item)"
      >
        <div :class="[`${item.variantObject.className}_header`, 'header']">
          <div
            class="title"
            v-if="item.title"
          >
            <GText :color="item.textColor">
              {{ item.title }}
            </GText>
          </div>
          <div
            class="close"
            @click.self="onClose(item)"
          >
            ×
          </div>
        </div>
        <component
          :is="item.message"
          v-if="typeof item.message === 'object'"
          v-bind="item.props"
          class="content"
        />
        <div
          v-else
          class="content"
        >
          <GText :color="item.textColor">
            {{ item.message }}
          </GText>
        </div>
        <div
          v-if="item.durationObject.autoClose"
          class="duration-wrapper"
        >
          <div
            class="duration"
            :class="item.durationObject.classes"
            :style="item.durationObject.style"
          />
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { CallbackType, GToasterData, GToasterItem, GToasterOptions } from './types.ts';

import GText from '../GText/GText.vue';

export default {
  name: 'GToaster',

  components: {
    GText,
  },

  data (): GToasterData {
    const items: GToasterItem[] = [];

    return {
      items,
      id: 0,
      config: {
        title: '',
        group: 'default',
        duration: 2000,
        autoClose: false,
        variants: {
          error: {
            className: 'error',
          },
          success: {
            className: 'success',
          },
          warning: {
            className: 'warning',
          },
          info: {
            className: 'info',
          },
        },
      },
    };
  },

  computed: {
    reversedItems (): GToasterItem[] {
      return this.items.slice().reverse();
    },
  },

  beforeDestroy () {
    this.items.forEach((item: GToasterItem) => {
      if (item.durationObject && item.durationObject.onCloseId) {
        clearTimeout(item.durationObject.onCloseId);
      }
    });
  },

  methods: {
    toast (message: string, config: GToasterOptions = {}) {
      const { variants }: { variants: any } = this.config;
      const variant = variants[config.variant || ''] || variants.success;
      const title = config.title || this.config.title || variant.title;
      const id = config.id || this.id++;
      const { unique } = config || this.config;
      const group = config.group || this.config.group;
      const duration = config.duration || this.config.duration;
      const textColor = config.textColor || 'text-white';
      const autoClose = config.autoClose || this.config.autoClose ||
        config.duration !== undefined || this.config.duration !== 2000 || false;
      const closeOnClick = config.closeOnClick !== false;
      const props = config.props || null;
      const onCloseCallback = config.onCloseCallback;
      const onShowCallback = config.onShowCallback;

      if (unique && this.items.some(item => group !== 'default' && item.group === group)) {
        return;
      }

      const item: GToasterItem = {
        id,
        message,
        title,
        variantObject: variant,
        unique,
        group,
        textColor,
        durationObject: {
          seconds: duration,
          autoClose,
        },
        closeOnClick,
        props,
        onCloseCallback,
        onShowCallback,
        closed: false,
      };

      this.items.push(item);

      this.executeCallback(item, 'onShowCallback');

      if (autoClose) {
        const lastIndex = this.items.length - 1;
        item.durationObject.onCloseId = setTimeout(() => {
          this.onClose(item);
        }, duration);

        item.durationObject.style = {
          transition: `width ${duration / 1000}s`,
        };

        setTimeout(() => {
          item.durationObject.classes = ['hide'];

          this.$set(this.items, lastIndex, item);
        });
      }
    },

    onClose (closedItem: GToasterItem) {
      this.items = this.items.filter(item => item.id !== closedItem.id);

      this.executeCallback(closedItem, 'onCloseCallback');
    },

    hideAll () {
      this.items.forEach(item => {
        this.executeCallback(item, 'onCloseCallback');
      });
      this.items = [];
    },

    executeCallback (item: GToasterItem, type: CallbackType) {
      if (type === 'onCloseCallback' && item.closed) {
        return;
      }

      const defaultCallback = () => {};
      const callbackFn: (data: any) => void = item[type] || defaultCallback;

      const {
        onShowCallback,
        textColor,
        durationObject,
        variantObject,
        onCloseCallback,
        ...rest
      } = item;

      if (type === 'onCloseCallback') {
        item.closed = true;
      }

      callbackFn({ ...rest, closed: item.closed });
    },
  },
};

</script>

<style lang="scss" scoped>
  .toaster-wrapper {
    position: fixed;
    right: 10px;
    top: 10px;
    z-index: 999999999;

    .toaster {
      width: 325px;
      opacity: 0.9;
      border-radius: 2px;
      color: white;
      margin-top: 10px;
      position: relative;

      .header {
        font-weight: bold;
        padding-right: 25px;
        font-size: 15px;
        .title{
          display: block;
          padding: 5px 13px 0;
        }

        .close {
          cursor: pointer;
          position: absolute;
          top: 5px;
          right: 5px;
          font-size: 19px;
          color: white;
        }
      }

      .content {
        padding: 20px;
      }

      .text-color {
        color: var(--white);
      }

      &.error {
        background-color: var(--red-500);
        border-bottom: 1px solid var(--red-400);

        .duration-wrapper .duration {
          border-bottom: 3px solid var(--red-800);
        }
      }

      &.success {
        background-color: var(--green-500);
        border-bottom: 1px solid var(--green-400);
        .duration-wrapper .duration {
          border-bottom: 3px solid var(--green-800);
        }
      }

      &.warning {
        background-color: var(--orange-500);
        border-bottom: 1px solid var(--orange-400);
        .duration-wrapper .duration {
          border-bottom: 3px solid var(--orange-800);
        }
      }

      &.info {
        background-color: var(--blue-500);
        border-bottom: 1px solid var(--blue-400);
        color: #fff;
        .duration-wrapper .duration {
          border-bottom: 3px solid var(--blue-800);
        }
      }

      .duration-wrapper {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        .duration {
          width: 100%;

          &.hide {
            width: 0;
          }
        }
      }

    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
</style>
