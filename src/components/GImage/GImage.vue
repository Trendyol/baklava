<template>
  <div class="g-image">
    <img
      lazy
      :src="isSrcUrl ? src : require(src)"
      :width="width"
      :maxWidth="maxWidth"
      :height="height"
      :maxHeight="maxHeight"
      v-bind="getAttrs"
      v-on="getListeners"
      @error="errImage"
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
    defaultImage: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    isSrcUrl () {
      return isUrl(this.src);
    },
    getAttrs () {
      const { src, defaultImage, width, height, maxWidth, maxHeight, ...etc } = this.$attrs;
      return etc;
    },
    getListeners () {
      return this.$listeners;
    },
  },
  methods: {
    errImage (el) {
      el.target.src = this.defaultImage;
    },
    lazyLoadImage () {
      const { src, $el, defaultImage } = this;
      $el.src = defaultImage;

      if (!('IntersectionObserver' in window) ||
                !('IntersectionObserverEntry' in window) ||
                !('intersectionRatio' in window.IntersectionObserverEntry.prototype)) {
        $el.src = src;
      }

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          $el.src = src;
          observer.disconnect();
        }
      });
      observer.observe($el);

      this.$once('hook:beforeDestroy', () => {
        observer.disconnect();
      });
    },
  },
  mounted () {
    this.lazyLoadImage();
  },
  watch: {
    src () {
      this.lazyLoadImage();
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
