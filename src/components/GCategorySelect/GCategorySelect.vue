<template>
  <div
    class="category-tree"
    v-click-outside="clickOutside"
  >
    <div
      class="input-container"
      @click="onClickShowDropdown"
    >
      <div v-if="multiple && !singleSelect">
        <GFieldWrapper
          class="body"
          :is-value="false"
        >
          <ul class="multiselect">
            <li v-if="!getValues.length">
              {{ $attrs.placeholder }}
            </li>
            <li
              v-for="(val, k) in getValues"
              :key="k"
            >
              <span>
                {{ val.Name }}
                <span
                  class="close-icon"
                  @click="onRemoveValue(k)"
                > &times;
                </span>
              </span>
            </li>
          </ul>
        </GFieldWrapper>
      </div>
      <div v-else>
        <label
          v-text="label"
        />
        <g-input
          v-if="!showDropdown"
          v-model="getPathText"
          type="text"
          :placeholder="$attrs.placeholder"
          readonly
        />
        <g-input
          v-else
          v-model="searchValue"
          @input="onSearch"
          type="text"
          ref="search"
        />
      </div>
      <span
        v-if="(getPathText !== '' || (value && value.length > 0))"
        class="right-icon"
        @click="onClear"
      > <GIcon
        name="x"
        color="mid-grey-500"
        size="19"
      />
      </span>
      <span
        v-else
      > <GIcon
        class="right-icon"
        name="chevron-down"
        color="mid-grey-500"
        size="20"
      />
      </span>
    </div>
    <div
      class="node-container"
      v-if="showDropdown && options.length"
    >
      <div class="nodes">
        <template v-for="(item, k) in items">
          <Node
            @onSelect="onSelect"
            @onMouseEnter="onMouseEnter"
            :options="item"
            :ids="selected.ids"
            :index="k"
            :key="k"
            :multiple="multiple"
            :values="getValues"
          />
        </template>
      </div>
      <BreadCrumb
        v-if="!multiple"
        :paths="selected.paths"
        @onRevert="onRevert"
      />
      <slot name="footer" />
    </div>
    <div
      class="node-container node-container-empty"
      v-else-if="showDropdown && !options.length"
    >
      Kategori bilgisi bulunamadı.
    </div>
  </div>
</template>

<script>
import ClickOutside from '../../directives/ClickOutside';
import Node from './Node/Index.vue';
import BreadCrumb from './BreadCrumb/Index.vue';
import GInput from '../GInput/GInput.vue';
import GIcon from '../GIcon/GIcon.vue';
import GFieldWrapper from '../GFieldWrapper/GFieldWrapper.vue';

const flatten = (arr, formatArr, parent) => arr.reduce((flat, toFlatten) => {
  const paths = [
    ...(parent.paths || []),
    ...[toFlatten.Name],
  ];
  const ids = [
    ...(parent.ids || []),
    ...[toFlatten.Id],
  ];

  if (toFlatten.Nodes.length <= 0) {
    formatArr.push({
      value: toFlatten.Id,
      label: toFlatten.Name,
      Id: toFlatten.Id,
      Name: toFlatten.Name,
      path: paths.join(' > '),
      ids: ids,
      paths,
      values: ids,
    });
    return formatArr;
  }

  toFlatten.path = paths.join(' > ');
  toFlatten.paths = paths;
  toFlatten.ids = ids;

  return flatten(toFlatten.Nodes, formatArr, toFlatten);
}, []);
const format = (arr, mapper, parentIds) => arr.reduce((items, item) => {
  // eslint-disable-next-line no-eval
  const formattedItem = eval(`(${mapper})`);
  if (formattedItem) {
    formattedItem.parentIds = parentIds;
    if (formattedItem.Nodes && formattedItem.Nodes.length) {
      formattedItem.Nodes = format(formattedItem.Nodes, mapper, [...parentIds, ...[formattedItem.Id]]);
    }
  }
  items.push(formattedItem);
  return items;
}, []);
export default {
  name: 'CategoryTree',
  components: { GFieldWrapper, GInput, BreadCrumb, Node, GIcon },
  directives: {
    'click-outside': ClickOutside,
  },
  props: {
    value: {
      type: [String, Number, Array, Object],
      default: () => null,
    },
    options: {
      type: [Array],
      default: () => [],
    },
    selected: {
      type: [Object],
      default: () => ({
        paths: [],
        ids: [],
        values: [],
      }),
    },
    label: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: () => false,
    },
    singleSelect: {
      type: Boolean,
      default: () => false,
    },
  },
  data () {
    return {
      searchValue: '',
      items: [],
      flatItems: [],
      showDropdown: false,
    };
  },
  computed: {
    getPathText () {
      if (!this.selected.paths) {
        return '';
      }
      return this.selected.paths.join(' > ');
    },
    getOptions () {
      let options = this.options;
      if (this.getFormat) {
        options = format(options, this.getFormat, []);
      }
      return options;
    },
    getFormat () {
      return this.$attrs.format;
    },
    getValues () {
      return this.value || [];
    },
  },
  methods: {
    onSelect (payload) {
      const { index, item } = payload;
      this.onRevert(index);

      this.selected.paths.push(item.Name);
      this.selected.ids.push(item.Id);

      if (item.Nodes.length && !this.multiple) {
        this.onPush(item);
      } else {
        if (this.multiple) {
          if (this.singleSelect) {
            this.$emit('input', item);
            this.clickOutside();
          } else {
            const currentVal = this.getValues.filter(val => val.parentIds.indexOf(item.Id) < 0);
            this.$emit('input', [
              ...currentVal || [],
              ...[{
                ...item,
              }],
            ]);
          }
        } else {
          this.$emit('input', item.Id);
        }

        this.$emit('onSelectCategory', {
          ...item,
          ...{
            path: this.selected.paths.join(' > '),
            paths: this.selected.paths,
            ids: this.selected.ids,
            values: this.selected.ids,
          },
        });
        if (!this.multiple) {
          this.clickOutside();
        }
      }
    },
    onPush (item) {
      this.items.push(item.Nodes);
    },
    onRevert (index) {
      this.items.splice(index + 1, this.items.length);
      this.selected.paths && this.selected.paths.splice(index, this.selected.paths.length);
      this.selected.ids && this.selected.ids.splice(index, this.selected.ids.length);
    },
    onRestore () {
      this.items.splice(1, this.items.length);
      for (let i = 0; i < this.selected.ids.length; i += 1) {
        const id = this.selected.ids[i];
        const items = this.items[i].filter(item => item.Id === id);
        if (items.length && items[0].Nodes.length) {
          this.onPush(items[0]);
        }
      }
    },
    clickOutside () {
      this.showDropdown = false;
    },
    onClear () {
      this.onRevert(0);
      this.$emit('input', this.multiple ? [] : null);
      this.$emit('onSelectCategory', {
        paths: [],
        ids: [],
        values: [],
      });
      this.$emit('onClear');
    },
    onClickShowDropdown () {
      this.showDropdown = true;
      // this.$nextTick(() => !this.multiple && this.$refs.search.focus());
    },
    onSearch (e) {
      const value = e;
      const searchedItem = this.flatItems.filter(category => category.path.toLowerCase().indexOf(value) > -1);
      if (searchedItem.length) {
        this.$set(this.selected, 'values', searchedItem[0].values);
      }
    },
    onMouseEnter (payload) {
      const { index, item } = payload;
      this.onRevert(index);
      if (item.Nodes.length) {
        this.onPush(item);
      }
    },
    onRemoveValue (index) {
      this.value.splice(index, 1);
      this.$emit('onRemoveValue');
    },
    init () {
      this.items = [this.getOptions];
      if (!this.multiple) {
        this.flatItems = flatten(this.getOptions, [], {});
      }
    },
  },
  created () {
    this.init();
    if (this.selected.ids && this.selected.ids.length) {
      this.onRestore();
    }
  },
  watch: {
    options () {
      this.init();
    },
    'selected.values' () {
      if (this.selected.values && this.selected.values.length) {
        this.selected.ids = this.selected.values;
        this.onRestore();
      }
    },
    'items' () {
      if (this.showDropdown) {
        const contentWidth = document.querySelector('.nodes').offsetWidth;
        document.querySelector('.nodes').scrollLeft = contentWidth;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .category-tree{
    position: relative;

    label {
      top: -5px;
      left: 15px;
      font-weight: 500;
      font-size: var(--font-size-12);
      color: var(--orange-500);
      padding: 0;
      background: white;
      z-index: 2;
      position: absolute;
    }

    .input-container{
      position: relative;
      cursor: pointer;
      .right-icon {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        cursor: pointer;
        font-size: 15px;
      }
      .multiselect {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        height: auto;
        list-style: none;
        margin: 0;
        min-height: 38px;

        li{

          &:nth-child(1) {
            padding-left: 2px;
          }

          padding: 3px 4px;
          font-size: 12px;
          color: #6e7787;
          line-height: normal;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: default;

          & > span {
            padding: 4px 10px;
            background-color: #f27a1a;
            border-radius: 10px;
            font-size: 12px;
            color: #ffffff;
            display: flex;
            align-items: center;
          }
        }
      }
    }
    .node-container{
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 200px;
      // max-width: 650px;
      z-index: 999;
      border-radius: 4px;
      box-shadow: 0 16px 24px -8px rgba(149, 161, 181, 0.25);
      border: solid 1px #f27a1a;
      background-color: #ffffff;
      transition: all .4s ease;
      margin-top: 10px;

      .nodes{
        width: 100%;
        overflow: hidden;
        display: flex;
        overflow-x: auto;
      }

      &-empty {
        padding: 15px;
      }
    }
  }
  .close-icon {
    font-size: 15px;
    margin-left: 5px;
    cursor: pointer;
  }
</style>
