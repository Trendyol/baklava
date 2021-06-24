<template>
  <GBox
    :flex="true"
    align="items-center"
    class="g-mini-pageable-wrapper"
  >
    <GIcon
      name="chevron-left"
      class="cursor-pointer navigator prev"
      @click="onPage('prev')"
    />
    <GText
      variant="subtitle-03"
      color="orange-500"
      class="current-page"
    >
      {{ currentPage }}
    </GText>
    <GText
      variant="subtitle-03"
      class="separator"
    >
      /
    </GText>
    <GText
      variant="subtitle-03"
      class="total-pages"
    >
      {{ totalPages }}
    </GText>
    <GIcon
      name="chevron-right"
      class="cursor-pointer navigator next"
      @click="onPage('next')"
    />
  </GBox>
</template>

<script lang="ts">

import GIcon from '../GIcon/GIcon.vue';
import GText from '../GText/GText.vue';
import GBox from '../GBox/GBox.vue';

export default {
  name: 'GMiniPagination',

  components: {
    GIcon,
    GText,
    GBox,
  },

  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      default: null,
    },
  },

  data () {
    return {
      currentPage: 1,
    };
  },

  methods: {
    onPage (direction: String) {
      const { totalPages, value, currentPage } = this;
      let newPage = value || currentPage;

      if (direction === 'prev' && newPage > 1) {
        newPage = newPage - 1;
      } else if (direction === 'next' && newPage < totalPages) {
        newPage = newPage + 1;
      }

      if (newPage !== currentPage) {
        this.currentPage = newPage;

        this.$emit('input', newPage);
        this.$emit('page', { totalPages, page: newPage, direction });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .g-mini-pageable-wrapper {
    .navigator {
      cursor: pointer;
    }
    .current-page {
      user-select: none;
      margin-right: 3px;
    }
    .separator {
      user-select: none;
    }
    .total-pages {
      user-select: none;
      margin-left: 3px;
    }
  }
</style>
