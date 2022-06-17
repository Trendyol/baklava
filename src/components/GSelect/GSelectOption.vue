<template>
  <div v-on="$listeners">
    <slot v-if="isOptionVisible" />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    initIntersectionObserver: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      observer: null,
      options: {
        root: this.rootEl,
        rootMargin: '50px 0px',
        threshold: 1.0,
      },
      isIntersecting: false,
    };
  },
  mounted () {
    if (!this.initIntersectionObserver) return;
    this.observer = new IntersectionObserver(this.intersectionObserverCallback, { options: this.options });
    this.observer.observe(this.rootEl);
  },
  methods: {
    intersectionObserverCallback (entries) {
      const [entry] = entries;
      if (entry && entry.isIntersecting) {
        this.isIntersecting = entry.isIntersecting;
        this.observer.unobserve(this.rootEl);
        this.observer.disconnect();
      }
    },
  },
  computed: {
    isOptionVisible () {
      if (!this.initIntersectionObserver) return true;
      return this.isIntersecting;
    },
    rootEl () {
      return this.$el;
    },
  },
};
</script>
