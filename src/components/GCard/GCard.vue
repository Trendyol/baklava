<template>
  <GBox
    :flex="true"
    direction="column"
    class="g-card"
  >
    <GBox
      :flex="true"
      align="items-center"
      justify="space-between"
    >
      <GBox>
        <slot name="header-left">
          <GText
            variant="headline-04"
            color="main-grey-500"
          >
            {{ title }}
          </GText>
        </slot>
      </GBox>
      <GBox flex>
        <slot name="header-right" />
        <GMiniPagination
          v-if="pageable"
          :total-pages="this.pages.length"
          @page="onPage"
        />
      </GBox>
    </GBox>
    <GBox
      class="body g-mt-15"
      v-if="showMessage"
      :flex="true"
      align="items-center"
      direction="column"
    >
      <GIcon
        :name="icon"
        color="red-300"
        class="g-mb-15"
        :size="iconSize"
      />
      <slot name="message">
        <GText
          variant="body"
          color="red-200"
        >
          {{ message }}
        </GText>
      </slot>
    </GBox>
    <GBox
      class="body g-mt-15"
      v-else
    >
      <slot />
    </GBox>
  </GBox>
</template>

<script lang="ts">

import GMiniPagination from '../GMiniPagination/GMiniPagination.vue';
import GBox from '../GBox/GBox.vue';
import GText from '../GText/GText.vue';
import GIcon from '../GIcon/GIcon.vue';
import { VNode } from 'vue/types/umd';

export default {
  name: 'GCard',

  components: {
    GMiniPagination,
    GBox,
    GText,
    GIcon,
  },

  props: {
    pageable: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: '',
    },

    icon: {
      type: String,
      default: 'alert-circle',
    },

    iconSize: {
      type: [String, Number],
      default: undefined,
    },

    showMessage: {
      type: Boolean,
      default: false,
    },

    message: {
      type: String,
      default: '',
    },
  },

  data (): any {
    return {
      pages: [],
      currentPage: 1,
    };
  },

  methods: {
    onPage (options: any) {
      this.currentPage = options.page;

      this.decideCurrentPage();
      this.$emit('page', options);
    },

    decideCurrentPage () {
      this.pages = this.defaultSlot
        .filter((vNode: VNode) => vNode.componentInstance)
        .map((vNode: VNode) => {
          const componentInstance = vNode.componentInstance || {};

          componentInstance.active = this.currentPage === componentInstance.page;

          return vNode;
        });
    },
  },

  computed: {
    defaultSlot () {
      return (this.$slots.default || []);
    },
  },

  mounted (): void {
    this.decideCurrentPage();
  },
};
</script>

<style lang="scss" scoped>
  .g-card {
    .body {
      background-color: var(--white);
      border-radius: var(--radius-md);
      padding: var(--spacing-20);
    }
  }
</style>
