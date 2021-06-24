<template>
  <nav
    v-if="show"
    class="g-pagination-nav"
    :class="reverse && 'reverse'"
  >
    <div class="pagination">
      <GButton
        :class="{'page-item': true, disabled: isFirst}"
        size="medium"
        variant="light"
        icon="chevrons-left"
        icon-color="main-grey-500"
        @click="!isFirst && previous('page', 1)"
      />
      <GButton
        :class="{'page-item': true, disabled: isFirst, 'prev-item': true}"
        size="medium"
        variant="light"
        icon="chevron-left"
        icon-color="main-grey-500"
        @click="!isFirst && previous('page', currentPage - 1)"
      />
      <GButtonGroup>
        <GButton
          v-for="page in paginationRange"
          :class="{'page-item': true}"
          :key="'page_'+page"
          size="medium"
          :variant="page === currentPage ? 'secondary' : 'light'"
          @click="page !== currentPage && goPage('page', page)"
        >
          {{ page }}
        </GButton>
      </GButtonGroup>
      <GButton
        :class="{'page-item': true, disabled: isLast, 'next-item': true}"
        size="medium"
        variant="light"
        icon="chevron-right"
        icon-color="main-grey-500"
        @click="!isLast && next('page', currentPage)"
      />

      <GButton
        :class="{'page-item': true, disabled: isLast}"
        size="medium"
        variant="light"
        icon="chevrons-right"
        icon-color="main-grey-500"
        @click="!isLast && next('page', pagination.totalPages - 1)"
      />
    </div>
    <div
      v-if="pageSizeVisible"
      class="change-size"
    >
      <GText variant="body">
        Her Sayfada
      </GText>
      <GNativeSelect
        class="g-ml-8"
        :options="pageLimitsWithText"
        v-model="pageSize"
        is-borderless
        @input="changeSize('size')"
      />
    </div>
  </nav>
</template>

<script lang="ts">

import GButton from '../GButton/GButton.vue';
import GButtonGroup from '../GButtonGroup/GButtonGroup.vue';
import GText from '../GText/GText.vue';
import GNativeSelect from '../GNativeSelect/GNativeSelect.vue';

export default {
  name: 'GPagination',
  components: {
    GButton,
    GButtonGroup,
    GText,
    GNativeSelect,
  },
  props: {
    pagination: {
      type: Object,
      default: () => ({}),
    },
    pageSizeText: {
      type: String,
      default: 'Adet',
    },
    pageSizeVisible: {
      type: Boolean,
      default: false,
    },
    pageLimits: {
      type: Array,
      default: () => [
        { value: 10, text: 10 },
        { value: 20, text: 20 },
        { value: 50, text: 50 },
      ],
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      pageRange: [-2, -1, 0, 1, 2],
      paginationLength: 5,
      size: 0,
    };
  },
  computed: {
    pageLimitsWithText (): {[key: string]: number|string}[] {
      return this.pageLimits.map(limit => ({
        value: limit.value,
        text: `${limit.text} ${this.pageSizeText}`,
      }));
    },
    currentPage (): number {
      return this.pagination.page + 1;
    },
    pageSize: {
      get (): { [key: string]: any } {
        return {
          value: this.pagination.size,
          text: this.pagination.size,
        };
      },
      set (newVal: number): void {
        this.size = newVal;
      },
    },
    paginationRange (): number[] {
      const total: number = this.pagination.totalPages;
      const length: number = total < this.paginationLength ? total : this.paginationLength;
      const current: number = this.currentPage;
      let start = current - Math.floor(length / 2);
      start = Math.max(start, 1);
      start = Math.min(start, 1 + total - length);

      return Array.from({ length }, (_, i) => start + i);
    },
    isFirst (): boolean {
      return this.currentPage === 1;
    },
    isLast (): boolean {
      return this.currentPage === this.pagination.totalPages;
    },
    show (): boolean {
      return this.pagination && this.pagination.totalPages > 1;
    },
  },
  methods: {
    goPage (name: string, page: number): void {
      this.$emit(name, page - 1);
    },
    previous (name: string, page: number): void {
      this.$emit(name, page - 1);
    },
    next (name: string, page: number): void {
      this.$emit(name, page);
    },
    changeSize (name: string): void {
      this.$emit(name, this.size);
    },
  },
};
</script>

<style lang="scss" scoped>
  .g-pagination-nav {
    display: flex;
    justify-content: space-between;

    ::v-deep .g-field-wrapper {
      margin-bottom: unset;
    }

    &.reverse {
      flex-direction: row-reverse;
    }

    .pagination {
      display: flex;

      .page-item {
        &.prev-item,
        &.next-item{
          margin: var(--spacing-0) var(--spacing-10);
        }

        &.disabled {
          cursor: not-allowed;
          opacity: 0.5;
          &:hover{
            background-color: var(--bg-grey-500);
          }
        }
      }

      ::v-deep .g-button{
        max-width: 100px;
        min-width: 40px;
        height: 40px;

        .content {
          padding: var(--spacing-8) var(--spacing-10);
        }
      }
    }
  }

  .change-size {
    display: flex;
    align-items: center;
    position: relative;
    z-index: var(--zindex-default);
    margin-right: var(--spacing-20);

    :first-child {
      margin-right: var(--spacing-10);
    }
  }
</style>
