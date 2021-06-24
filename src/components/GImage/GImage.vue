<template>
  <div class="g-image">
    <img
      lazy
      :src="isSrcUrl ? src : require(src)"
      :width="width"
      :maxWidth="maxWidth"
      :height="height"
      :maxHeight="maxHeight"
    >
  </div>
</template>

<script lang="ts">

import { isUrl } from '../../utils/regex.ts';

export default {
  name: 'GImage',
  props: {
    src: {
      type: String,
      default: 'https://cdn.dsmcdn.com/shared/images/trendyol.jpeg',
    },
    width: {
      type: [String, Number],
      default: null,
    },
    height: {
      type: [String, Number],
      default: null,
    },
    maxWidth: {
      type: [String, Number],
      default: null,
    },
    maxHeight: {
      type: [String, Number],
      default: null,
    },
  },
  computed: {
    isSrcUrl () {
      return isUrl(this.src);
    },
  },
};
</script>

<style lang="scss" scoped>
  .g-image {
    display: flex;
    align-items: center;
    overflow: hidden;
  }
</style>
