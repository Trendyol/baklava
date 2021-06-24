<template>
  <GBox
    class="g-breadcrumb"
    flex
    align="items-center"
  >
    <GBox
      flex
      align="items-center"
      class="item-wrapper"
      v-for="(item, index) in items"
      :key="index"
    >
      <a
        :href="item.href"
        v-if="!isLastItem(index)"
        @click.prevent="onClick(item)"
        :class="{ disabled: item.disabled, item: true }"
      >
        <GText
          color="dark-grey-500"
          variant="menu-item"
        >
          {{ item.text }}
        </GText>
      </a>
      <GText
        v-else
        class="item"
        color="light-grey-500"
        variant="menu-item"
      >
        {{ item.text }}
      </GText>
      <GText
        v-if="!isLastItem(index)"
        class="divider"
        color="dark-grey-500"
        v-html="divider"
      />
    </GBox>
  </GBox>
</template>

<script lang="ts">

import GBox from '../GBox/GBox.vue';
import GText from '../GText/GText.vue';

type BreadcrumbOptions = {
  text: string;
  href: string;
  disabled: boolean;
}

export default {
  name: 'GBreadcrumb',
  components: {
    GBox,
    GText,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    divider: {
      type: String,
      default: '>',
    },
  },
  computed: {

  },
  methods: {
    onClick (item: BreadcrumbOptions) {
      if (item.disabled) {
        return;
      }

      this.$emit('click', item);
    },

    isLastItem (itemIndex: number) {
      return this.items.length - 1 === itemIndex;
    },
  },
};
</script>

<style lang="scss" scoped>
  .g-breadcrumb {
    .item-wrapper:not(:last-child) .item {
      color: var(--dark-grey-500);
    }

    .item-wrapper .item.disabled {
      cursor: default;
      pointer-events: none;
      text-decoration: none;
    }

    .divider {
      margin: 0 12px;
    }
  }

</style>
