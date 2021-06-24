<template>
  <GBox
    flex
    justify="space-between"
    :my="32"
  >
    <GBox
      flex
      direction="row"
    >
      <slot name="title-before" />
      <GBox
        flex
        direction="column"
        :mr="30"
      >
        <GText variant="headline-03">
          {{ title }}
        </GText>
        <slot name="breadcrumb" />
      </GBox>
      <slot name="left-area" />
    </GBox>
    <GBox box>
      <slot name="right-area" />
    </GBox>
  </GBox>
</template>

<script lang="ts">

import GBox from '../GBox/GBox.vue';
import GText from '../GText/GText.vue';

export default {
  name: 'GHeader',
  components: {
    GBox,
    GText,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
  },
};
</script>
