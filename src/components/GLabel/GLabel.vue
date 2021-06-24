<template>
  <span class="g-label">
    <GIcon
      class="g-mr-10"
      size="20px"
      :name="iconName"
      :color="textColor"
    />
    <GText
      variant="subtitle-03"
      :color="textColor"
    >
      <slot />
    </GText>
  </span>
</template>

<script lang="ts">

import GIcon from '../GIcon/GIcon.vue';
import GText from '../GText/GText.vue';

export default {
  name: 'GLabel',
  components: {
    GIcon,
    GText,
  },
  props: {
    iconName: {
      type: String,
      default: 'alert-circle',
    },
    variant: {
      type: String,
      default: 'base',
    },
  },
  computed: {
    textColor () {
      return {
        base: 'dark-grey-500',
        success: 'green-500',
        warning: 'orange-500',
        error: 'red-500',
      }[this.variant];
    },
  },
};
</script>

<style lang="scss" scoped>
.g-label {
  display: flex;
  align-items: center;
  font-family: var(--font-family-base);
  line-height: normal;
}
</style>
