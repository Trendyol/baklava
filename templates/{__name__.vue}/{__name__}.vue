<template>
  <div>{{ msg }}</div>
</template>

<script lang="ts">

export default {
  name: 'Name',
  props: {
    /**
       * The size of the button allows only some values
       * @value small, medium, large
    */
    msg: {
      required: true,
      default: '1',
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
