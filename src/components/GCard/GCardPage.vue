<template>
  <div v-show="active">
    <slot />
  </div>
</template>

<script lang="ts">

export default {
  name: 'GCardPage',

  props: {
    page: {
      type: Number,
      default: 1,
    },
  },

  data (): Object {
    return {
      active: false,
    };
  },

  mounted (): void {
  },
};
</script>

<style lang="scss" scoped>

</style>
