<template>
  <div
    v-bind="$attrs"
    v-on="$listeners"
    :class="classNames"
    :style="{ top: top + 'px', height: 'calc(100% - ' + top + 'px)' }"
    v-if="show"
  >
    <div
      class="g-drawer-content"
    >
      <div class="g-drawer-header">
        <div class="g-drawer-title">
          {{ title }}
        </div>
        <div
          @click="close"
          class="g-drawer-close-button"
        >
          <GIcon name="x" />
        </div>
      </div>
      <div class="g-drawer-body">
        <iframe
          :src="url"
          height="100%"
          width="100%"
          :title="title"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import GIcon from '../GIcon';

export default {
  name: 'GDrawer',
  components: {
    GIcon,
  },
  props: {
    url: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Number,
      default: 100,
    },
  },
  methods: {
    close () {
      this.$emit('close');
    },
  },
  computed: {
    classNames () {
      return {
        'g-drawer': true,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.g-drawer {
  position: fixed;
  right: 0;
  // top: 100px;
  // height: calc(100% - 100px);
  width: 424px;
  z-index: 100;

  .g-drawer-content {
    width: 100%;
    height: 100%;
    padding: 16px;
    box-shadow: 0px 8px 16px rgba(39, 49, 66, 0.2);

    .g-drawer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      .g-drawer-title {
        font-size: 18px;
        line-height: 21px;
        font-weight: 500;
      }

      .g-drawer-close-button {
        cursor: pointer;
      }
    }

    .g-drawer-body {
      width: 100%;
      height: 100%;
      iframe {
        border-width: 0;
      }
    }
  }
}
</style>
