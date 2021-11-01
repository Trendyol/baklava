<template>
  <div class="g-image">
    <img
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
      $el.children[0].src = defaultImage;

      if (!('IntersectionObserver' in window) ||
        !('IntersectionObserverEntry' in window) ||
        !('intersectionRatio' in window.IntersectionObserverEntry.prototype)) {
        $el.children[0].src = src;
      }

      try {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            $el.children[0].src = src;
            observer.disconnect();
          }
        });
        observer.observe($el);

        this.$once('hook:beforeDestroy', () => {
          observer.disconnect();
        });
      } catch {
        $el.children[0].src = src;
      }
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
