<template>
  <div
    class="step-content"
    v-if="getActiveStep"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Step',
  props: {
    slug: {
      type: String,
      default: () => '',
    },
    title: {
      type: String,
      default: () => '',
    },
    validation: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    getActiveStep () {
      return this.slug === this.$parent.currentStep;
    },
  },
};
</script>
