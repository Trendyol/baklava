<template>
  <GBox class="g-table-wrapper">
    <div
      class="before-table-wrapper"
      v-if="hasBeforeTableSlot"
    >
      <slot
        name="before_table"
        :data="{ headers, items }"
      />
    </div>
    <GBox
      :class="classes"
    >
      <table>
        <colgroup>
          <col v-if="selectable">
          <col
            v-for="(header, headerIndex) in headers"
            :key="'col-'+headerIndex"
            :style="{ backgroundColor: header.bgColor }"
            :width="header.width"
          >
        </colgroup>
        <thead
          :class="{ 'sticky-header': tableOptions.stickyHeaderEnabled }"
        >
          <slot
            name="before_header"
            :headers="headers"
          />
          <tr>
            <th
              v-if="selectable"
              :class="selectClass()"
            >
              <GCheckbox
                :model-value="isAllSelected"
                @change="selectAllItems"
              />
            </th>
            <th
              v-for="(header, headerIndex) in headers"
              :key="'header-'+headerIndex"
              :style="headerStyle(header)"
              :class="headerClass(header)"
            >
              <Sortable
                v-if="header.sortable"
                :name="header.key"
                :sort-name="sortConfig.name"
                :sort-type="sortConfig.type"
                @sort="onSort"
              >
                <template>
                  <slot
                    :name="`header_${header.key}`"
                    :header="header"
                    :headerIndex="headerIndex"
                  >
                    {{ header.text }}
                  </slot>
                </template>
              </Sortable>
              <template v-else>
                <slot
                  :name="`header_${header.key}`"
                  :header="header"
                  :headerIndex="headerIndex"
                >
                  {{ header.text }}
                </slot>
              </template>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(row, rowIndex) in items">
            <slot :row="row">
              <slot
                :name="`before_row_${rowIndex}`"
                :row="row"
                :rowIndex="rowIndex"
              />
              <slot
                :name="`before_row`"
                :row="row"
                :rowIndex="rowIndex"
              />

              <tr
                v-for="(subRow, subRowIndex) in row.rowSpan || [row]"
                :key="'row-'+rowIndex+'-'+subRowIndex"
                :class="rowClass(row)"
              >
                <td
                  :key="`checkbox-subRowIndex-${isSelected(row)}`"
                  v-if="selectable && subRowIndex===0 && !row.customFirstColumn"
                  :rowspan="Array.isArray(row.rowSpan) ? row.rowSpan.length: undefined"
                  :class="bodyClass(row)"
                >
                  <GCheckbox
                    :disabled="row.disabled"
                    v-model="selectedItems"
                    @change="onItemSelect(row)"
                    :value="row"
                  />
                </td>
                <template v-if="row.customFirstColumn">
                  <td>
                    <slot
                      :row="row"
                      name="custom_first_column"
                    />
                  </td>
                </template>
                <template v-for="(col, colIndex) in headers">
                  <td
                    :key="`cell-${rowIndex}_${colIndex}`"
                    v-if="col.key in subRow || subRowIndex === 0"
                    :class="bodyClass(row, col)"
                    :rowspan="rowSpan(col, row, subRow, subRowIndex)"
                  >
                    <slot
                      :name="col.key"
                      :row="row"
                      :rowIndex="rowIndex"
                      :colIndex="colIndex"
                      :subRow="subRow"
                    >
                      <div v-html="formatData(col.key in subRow ? subRow : row, col)" />
                    </slot>
                  </td>
                </template>
              </tr>
              <slot
                :name="`after_row_${rowIndex}`"
                :row="row"
                :rowIndex="rowIndex"
              />
              <slot
                :name="`after_row`"
                :row="row"
                :rowIndex="rowIndex"
              />
            </slot>
          </template>
          <template v-if="!isLoading && items.length <= 0">
            <tr>
              <td :colspan="selectable ? headers.length + 1 : headers.length">
                <slot name="not_found">
                  <div class="not_found">
                    <GText>Kayıt Bulunamadı.</GText>
                  </div>
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <template v-if="isLoading">
        <slot name="loading">
          <div class="table-loading">
            <GSpinner class="table-spinner" />
          </div>
        </slot>
      </template>
    </GBox>
    <GPagination
      class="g-table-pagination"
      v-bind="paginationConfig"
      @page="onPage"
      @size="onSize"
    />
  </GBox>
</template>

<script>

import GBox from '../GBox/GBox.vue';
import GCheckbox from '../GCheckbox/GCheckbox.vue';
import GPagination from '../GPagination/GPagination.vue';
import Sortable from './Sortable.vue';
import GSpinner from '../GSpinner/GSpinner.vue';
import GText from '../GText/GText.vue';
export const getTableWrapper = () => {
  return document.querySelector('.g-table-wrapper');
};
export const getTable = () => {
  return getTableWrapper()?.querySelector('table');
};
const getThead = () => {
  return getTable()?.querySelector('thead');
};
function setStickyHeader ({ stickyHeaderEnabled }) {
  if (!stickyHeaderEnabled) {
    return false;
  }
  document.addEventListener('scroll', (e) => {
    const offsetTop = getTableWrapper().offsetTop;
    const { scrollTop } = e.target.scrollingElement;
    if (scrollTop > offsetTop) {
      const top = scrollTop - offsetTop;
      getThead().style.top = `${top}px`;
    } else {
      getThead().style.top = 0;
    }
  });
  window.addEventListener('resize', () => {
    document.dispatchEvent(new Event('scroll'));
  });
}

export default {
  name: 'GDataTable',
  components: {
    GBox,
    GCheckbox,
    GPagination,
    Sortable,
    GText,
    GSpinner,
  },
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    sortConfig: {
      type: Object,
      default: () => ({ name: '', type: '' }),
    },
    paginationConfig: {
      type: Object,
      default: () => ({
        pagination: {
          size: undefined,
          page: undefined,
          totalElements: undefined,
          totalPages: undefined,
        },
        pageSizeText: 'Adet',
        pageSizeVisible: false,
        pageLimits: undefined,
        reverse: false,
      }),
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    tableOptions: {
      type: Object,
      default: () => ({
        stickyHeaderEnabled: false,
      }),
    },
  },
  data () {
    return {
      selectedItems: [],
    };
  },
  methods: {
    isSelected (row) {
      return this.selectedItems.some(item => row === item);
    },
    formatData (row, col) {
      if (!(col.key in row)) {
        return '';
      }
      if (typeof col.formatter === 'function') {
        return col.formatter(row[col.key], row, col);
      }
      if (typeof row[col.key] === 'object') {
        return row[col.key]?.value;
      }

      return row[col.key];
    },
    selectAllItems () {
      const enabledItems = this.items.filter(item => !item.disabled);
      const actionType = this.isAllSelected
        ? 'UNSELECT_ALL'
        : 'SELECT_ALL';

      this.selectedItems = this.isAllSelected ? [] : enabledItems;
      this.$emit(
        'select',
        this.selectedItems,
        {
          actionType,
          items: enabledItems,
        },
      );
    },
    async onItemSelect (item) {
      await this.$nextTick();
      const isSelected = this.selectedItems.some(selectedItem => item === selectedItem);

      const actionType = isSelected
        ? 'SELECT'
        : 'UNSELECT';

      this.$emit(
        'select',
        this.selectedItems,
        {
          item,
          actionType,
        },
      );
    },
    onPage (page) {
      this.$emit('page', page);
      this.$emit('paginationChange', {
        ...this.paginationConfig,
        pagination: {
          ...this.paginationConfig.pagination,
          page,
        },
      });
    },
    onSize (size) {
      this.$emit('size', size);
      this.$emit('paginationChange', {
        ...this.paginationConfig,
        pagination: {
          ...this.paginationConfig.pagination,
          page: 0,
          size: size.value,
        },
      });
    },
    onSort (sortConfig) {
      this.$emit('sort', sortConfig);
    },
    headerStyle (header) {
      return {
        minWidth: header.minWidth || header.width,
        maxWidth: header.maxWidth || header.width,
      };
    },
    headerClass (header) {
      return {
        'fixed-column': header.fixed,
        selectable: this.selectable,
        'header-custom': header.customHeader,
      };
    },
    selectClass () {
      return {
        'fixed-column': this.hasFixedCol,
        'select-column': true,
      };
    },
    rowClass (row) {
      return {
        disabled: row.disabled,
        selected: this.selectedItems.includes(row),
        success: row.success,
        error: row.error,
      };
    },
    bodyClass (row, col) {
      return {
        'fixed-select': !col && this.hasFixedCol,
        'fixed-column': col && col.fixed,
        selectable: this.selectable,
        'align-center': col && col.align === 'center',
        'align-right': col && col.align === 'right',
        [`g-bg-${col ? col.bgColor : ''}`]: col && col.bgColor,
        [`g-bg-${(!col || !col.bgColor) ? 'white' : ''}`]: !col || !col.bgColor,
      };
    },
    rowSpan (col, row, subRow, subRowIndex) {
      return (Array.isArray(row.rowSpan) && subRowIndex === 0 && !(col.key in subRow)) ? row.rowSpan.length : undefined;
    },
  },
  computed: {
    hasBeforeTableSlot () {
      return typeof this.$slots.before_table !== 'undefined';
    },
    classes () {
      return {
        'g-table': true,
        'g-table--loading': this.isLoading,
      };
    },
    isAllSelected () {
      return this.items.filter(item => !item.disabled).length === this.selectedItems.filter(item => !item.disabled).length;
    },
    hasFixedCol () {
      return this.headers.some(h => h.fixed);
    },
  },
  created () {
    setStickyHeader(this.tableOptions);
  },
  watch: {
    items: {
      handler () {
        if (this.selectable) {
          this.selectedItems = this.items.filter(item => item.selected);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .g-table-wrapper {
    .before-table-wrapper {
      margin-bottom: var(--spacing-30);
    }

    .g-table {
      border: 1px solid #dee2e6;
      border-radius: 6px;
      font-family: var(--font-family-base);
      overflow: auto;

      &--loading {
        position: relative;
        min-height: 300px;
      }

      & table {
        border-style: hidden;
        margin-bottom: 0;
        width: 100%;
        thead.sticky-header {
          position: relative;
          top: 0;
          left: 0;
          right: 0;
          z-index: 11;
          transition: top .05s ease;
          tr th {
            border-bottom: 0;
          }
          &:after {
            content: '';
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: #dee2e6;
          }
        }

        .fixed-select{
          position: sticky;
          left: 0;
          z-index: 99;
          box-shadow: 1px 0 0 0 #dee2e6;
        }

        .fixed-column{
          position: sticky;
          left: 0;
          z-index: 99;
          box-shadow: 1px 0 0 0 #dee2e6;
          &.selectable {
            left: 56px;
          }
          &:last-child{
            box-shadow: 3px 0 0 0 #dee2e6;
          }
        }

        & thead {
          & tr {
            & th {
              vertical-align: middle;
              text-align: left;
              border: 1px solid #dee2e6;
              background-color: #f7f8fa;
              font-size: 14px;
              font-stretch: normal;
              font-style: normal;
              line-height: normal;
              letter-spacing: normal;
              color: #273142;
              padding: 20px;
              font-weight: 500;

              &:first-child {
                border-top-left-radius: 5px;
              }

              &:last-child {
                border-top-right-radius: 5px;
              }
            }
          }
        }

        & tbody {
          & tr {
            & td {
              border: 1px solid #dee2e6;
              padding: 20px;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: normal;
              letter-spacing: normal;
              color: #273142;
              vertical-align: middle;

              &.align-center{
                text-align: center;
              }
              &.align-right{
                text-align: right;
              }
            }

            &:last-child td {
              &:first-child {
                border-bottom-left-radius: 5px;
              }

              &:last-child {
                border-bottom-right-radius: 5px;
              }
            }

            &.error{
              & td {
                background-color: #FFF3F2;
              }
            }
            &.success{
              & td {
                background-color: #EEFBF4;
              }
            }
            &.selected{
              & td {
                background-color: #FEF6EF;
              }
            }
            &.disabled{
              & td {
                background-color: var(--bg-grey-700);
                color: var(--mid-grey-500);
              }
            }
          }
        }

        .select-column {
          width: 16px;
        }

        .not_found {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
        }
      }

      .table-loading {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: hsla(0, 0%, 100%, 0.5);

        .table-spinner {
          left: 50%;
          top: 50%;
        }
      }
    }

    .g-table-pagination {
      margin-top: var(--spacing-30);
    }

    ::v-deep .change-size {
      margin-right: unset;

      .g-field-wrapper .content {
        width: unset;
      }

      :first-child {
        margin-right: unset;
      }
    }
  }
</style>
