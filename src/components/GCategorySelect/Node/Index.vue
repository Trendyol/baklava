<template>
  <div class="node">
    <div class="search-container">
      <input
        type="text"
        class="search"
        v-model="search"
        placeholder="Anahtar Kelime"
      >
      <span class="icon-search" />
    </div>
    <ul class="items">
      <li
        v-if="getOptions.length <= 0"
        class="no-result"
      >
        Sonuç Bulunamadı.
      </li>
      <li
        v-for="item in getOptions"
        :key="item.Id"
        :class="{'active': isActive(item.Id)}"
        @click="onSelect(item)"
        @mouseenter="onMouseEnter(item)"
      >
        {{ item.Name }}
        <GIcon
          v-if="hasNodes(item)"
          class="icon-chevron-right"
          name="chevron-right"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import GIcon from '../../GIcon/GIcon.vue';

export default {
  name: 'Node',
  components: {
    GIcon,
  },
  props: {
    options: {
      type: [Array],
      default: () => null,
    },
    index: {
      type: [Number],
      default: () => 0,
    },
    ids: {
      type: [Array],
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: () => false,
    },
    values: {
      type: [Array, Object, Number],
      default: () => [],
    },
  },
  data () {
    return {
      search: '',
    };
  },
  computed: {
    getOptions () {
      return this.options.filter(cat => {
        return cat.Name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    getValues () {
      try {
        return this.values.map(val => val.Id);
      } catch {
        return [this.values.id || this.values];
      }
    },
  },
  methods: {
    isActive (id) {
      if (!this.multiple) {
        return this.ids.indexOf(id) > -1;
      }
      return this.getValues.indexOf(id) > -1;
    },
    hasNodes (item) {
      if (!this.multiple) {
        return item.Nodes.length;
      }
      return item.Nodes.length && this.getValues.indexOf(item.Id) < 0;
    },
    onSelect (item) {
      if (!this.isActive(item.id)) {
        this.$emit('onSelect', {
          item,
          index: this.index,
        });
      }
    },
    onMouseEnter (item) {
      if (this.multiple && this.getValues.indexOf(item.Id) < 0) {
        this.$emit('onMouseEnter', {
          item,
          index: this.index,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .node {
    padding: 15px;
    font-size: 14px;
    color: #273142;
    border-right: 1px solid #d5d9e1;
    overflow: hidden;
    overflow-x: auto;
    max-width: 250px;
    min-width: 250px;
    .search-container {
      position: relative;
      border-radius: 6px;
      background-color: #f1f2f7;
      margin-bottom: 5px;
      input{
        border: 0;
        border-radius: 5px;
        padding: 8px 35px 7px 15px;
        width: 100%;
        background-color: transparent;
        &:focus{
          outline: none;
        }
      }
      span{
        position: absolute;
        top: 50%;
        right: 10px;
        font-size: 16px;
        transform: translateY(-50%);
      }
    }
    .items{
      margin: 0;
      padding: 0;
      max-height: 170px;
      overflow:hidden;
      overflow-y: auto;
      max-width: 250px;

      li{
        cursor: pointer;
        padding: 10px 0;
        border-bottom: 1px solid #f1f2f7;
        position: relative;
        .icon-chevron-right{
          position: absolute;
          top: 50%;
          right: 7px;
          font-size: 12px;
          transform: translateY(-50%);
        }
        &.no-result {
          &, &:hover {
            text-align: center;
            color: #9398a0;
            border-bottom: 0;
          }
        }

        &:hover {
          color: #f27a1a;
        }

        &.active {
          pointer-events: none;
          color: #f27a1a;
        }
      }
    }
  }
</style>
