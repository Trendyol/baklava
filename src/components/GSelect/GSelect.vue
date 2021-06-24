<template>
  <div :class="wrapperClass">
    <GFieldWrapper
      :is-active-content.sync="isOptionsVisible"
      :is-value="Array.isArray(value)? !!value.length: !!value"
      :is-outline-label="isOutlineLabel"
      :feedback="feedback"
      :label="label"
      :icon="icon"
      :success="success"
      :error="error"
      :disable="disable"
    >
      <p
        class="valueText"
        v-text="getLabel"
      />
      <div :class="contentClass">
        <GBox
          :mb="15"
          v-if="isSearch"
        >
          <GInput
            :placeholder="searchPlaceholder"
            icon="search"
            @click.stop
            @input="onSearchChange"
            size="small"
            v-model="searchText"
          />
        </GBox>
        <GBox
          flex
          align="start"
          class="item"
          v-for="item in filteredOptions"
          :key="item.value"
          @click.stop="clickItem(item.value)"
        >
          <GCheckbox
            v-if="isCheckbox"
            :value="{ id: 1 }"
            :model-value="isSelected(item)"
            class="g-mr-4"
          />
          <span
            class="text"
            v-text="item.text"
          />
        </GBox>
      </div>
    </GFieldWrapper>
  </div>
</template>

<script lang="ts">

import GFieldWrapper from '../GFieldWrapper/GFieldWrapper.vue';
import GInput from '../GInput/GInput.vue';
import GCheckbox from '../GCheckbox/GCheckbox.vue';
import GBox from '../GBox/GBox.vue';

export default {
  name: 'GSelect',
  components: {
    GFieldWrapper,
    GInput,
    GCheckbox,
    GBox,
  },
  props: {
    isOutlineLabel: {
      default: false,
      type: Boolean,
    },
    isBorderless: {
      default: false,
      type: Boolean,
    },
    isCheckbox: {
      default: false,
      type: Boolean,
    },
    isSearch: {
      default: false,
      type: Boolean,
    },
    success: {
      default: false,
      type: Boolean,
    },
    error: {
      default: false,
      type: Boolean,
    },
    disable: {
      default: false,
      type: Boolean,
    },
    label: {
      default: '',
      type: String,
    },
    placeholder: {
      default: '',
      type: String,
    },
    searchPlaceholder: {
      default: 'Arama',
      type: String,
    },
    feedback: {
      default: '',
      type: String,
    },
    value: {
      default: '',
      type: [String, Array],
    },
    options: {
      required: true,
      type: Array,
    },
    size: {
      /* small, middle, big */
      default: 'big',
      type: String,
    },
  },
  data () {
    return {
      isOptionsVisible: false,
      searchText: '',
    };
  },
  methods: {
    isSelected (item): Boolean {
      if (Array.isArray(this.value)) {
        return this.value.includes(item.value);
      }
      return this.value === item.value;
    },
    onSearchChange (text: string | number) {
      this.$emit('onSearchChange', text);
    },
    clickItem (item: string | number) {
      if (this.isCheckbox) {
        return this.clickCheckbox(item);
      }
      this.isOptionsVisible = false;
      this.$emit('input', item);
      this.$emit('onChange', item);
    },
    clickCheckbox (item: string | number) {
      const array = this.value.slice();
      const i = array.findIndex(x => x === item);
      if (i >= 0) {
        array.splice(i, 1);
      } else {
        array.push(String(item));
      }
      this.$emit('onChange', array);
      this.$emit('input', array);
    },
  },
  computed: {
    filteredOptions () {
      return this.options.filter(opt =>
        (opt.text || '').toLocaleLowerCase('TR')
          .includes((this.searchText || '').toLocaleLowerCase('TR')));
    },
    icon  () {
      return this.isOptionsVisible ? 'chevron-up' : 'chevron-down';
    },
    getValue () {
      return this.value;
    },
    getLabel () {
      const selectedOptions = this.options.filter(opt => {
        if (Array.isArray(this.value)) {
          return this.value.includes(opt.value);
        }
        return opt.value === this.value;
      });
      if (!selectedOptions.length) {
        return (this.isOutlineLabel || this.isBorderless) ? this.placeholder : '';
      }

      return selectedOptions.map(opt => opt.text).join(', ');
    },
    wrapperClass () {
      return {
        'g-select': true,
        [this.size]: true,
        '-borderless': this.isBorderless,
      };
    },
    contentClass () {
      return {
        's-content': true,
        'g-d-none': !this.isOptionsVisible,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.g-select {
  ::v-deep .g-field-wrapper {
    &.-active {
     .content {
        border-bottom: none;
        border-radius: 0;
        border-top-left-radius: var(--radius-md);
        border-top-right-radius: var(--radius-md);
        border-color: var(--orange-500);
      }
    }
    .content {
      select {
        -webkit-appearance: none;
        z-index: 2;
        color: var(--main-grey-500);
      }
    }
    &.big .content{
      height: 38px;
    }
    &.small .content{
      height: 32px;
    }
    .g-field-wrapper .content {
      background:var(--bg-grey-500);
      border: 1px solid var(--mid-grey-500);
      border-radius: var(--radius-md);
    }
  }
  .item{
    padding-bottom: 10px;
    border-bottom: 1px solid #d5d9e1;
    margin-bottom: 10px;
    line-height: 1.4;
  }
  .item:last-child {
    border: none;
    padding: 0;
    margin: 0;
  }
  &.-borderless {
    ::v-deep .g-field-wrapper {
      background: var(--bg-grey-500);
      border-radius: var(--radius-md);
      .content {
        border: none;
        color: var(--main-grey-500);
        .s-content {
          border: 1px solid var(--orange-500);
          border-radius: var(--radius-md);
          margin-top: 15px;
          .text{
            margin-left: 12px;
          }
        }
      }
    }
  }
  .s-content {
    width: -webkit-fill-available;
    background: white;
    padding: 15px;
    border: 1px solid var(--mid-grey-800);
    border-radius: var(--radius-md);
    position: absolute;
    top: 34px;
    z-index: 3;
    margin: -1px;
    &:not(.d-none) {
      border-top: none;
      border-radius: 0;
      border-bottom-left-radius: var(--radius-md);
      border-bottom-right-radius: var(--radius-md);
      border-color: var(--orange-500);
    }
  }
  .text {
    font-family: var(--font-family-base);
    font-size: var(--font-size-14);
    color: var(--dark-grey-500);
    width: 100%;
    &:hover {
      color: var(--main-grey-500);
      cursor: pointer;
    }
  }
  .valueText {
    font-family: var(--font-family-base);
    font-size: var(--font-size-14);
    color: var(--main-grey-500);
    padding: 13px 30px 13px 13px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &.small {
    ::v-deep .g-field-wrapper {
      label {
        font-size: 8px;
      }
      .content {
        height: 24px;
        .valueText {
          font-size: 12px;
          padding: 6px;
        }
      }
      .g-icon {
        margin-top: 0px;
      }
    }
    .s-content {
      top: 25px;
      padding: 8px;
    }
    .item{
      margin-bottom: 5px;
      padding-bottom: 5px;
      &:last-child {
        margin: 0;
        padding: 0;
      }
    }
  }
  &.middle {
    ::v-deep .g-field-wrapper {
      label {
        font-size: 12px;
      }
      .content {
        height: 32px;
        .valueText {
          font-size: 14px;
          padding: 10px;
        }
      }
    }
    .s-content {
      top: 30px;
      padding: 10px;
    }
    .item{
      margin-bottom: 10px;
      padding-bottom: 10px;
      &:last-child {
        margin: 0;
        padding: 0;
      }
    }
  }
  .s-content{
    max-height: 200px;
    overflow: auto;
  }
}
</style>
