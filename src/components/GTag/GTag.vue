<template>
  <GBox :class="tagColor">
    <GText
      color="white"
      variant="menu-item"
    >
      <slot />
    </GText>
  </GBox>
</template>

<script lang="ts">

import GBox from '../GBox/GBox.vue';
import GText from '../GText/GText.vue';
import $_ from '../../utils/dashUtil.ts';

export default {
  name: 'GTag',
  components: {
    GBox,
    GText,
  },
  props: {
    variant: {
      type: String,
      default: 'base',
    },
  },
  computed: {
    tagColor () {
      return {
        'g-tag': true,
        [$_(this.variant)]: true,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.g-tag {
  display:inline-block;
  padding: 3px 10px;
  border-radius: var(--radius-lg);
  line-height: normal;
  background-color: var(--mid-grey-500);

  &.-base {
    background-color: var(--mid-grey-500);
  }

  &.-dark {
    background-color: var(--main-grey-500);
  }

  &.-success {
    background-color: var(--green-500);
  }

  &.-info {
    background-color: var(--blue-500);
  }

  &.-warning {
    background-color: var(--orange-500);
  }

  &.-error {
    background-color: var(--red-500);
  }
}
</style>
