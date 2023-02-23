<template>
  <div :class="wrapperClass">
    <GFieldWrapper
      :is-active-content.sync="isOptionsVisible"
      :is-value="hasValue"
      :is-outline-label="isOutlineLabel"
      :feedback="feedback"
      :label="label"
      :icon="icon"
      :success="success"
      :error="error"
      :disable="disable"
      @icon-clicked="handleIconClick"
    >
      <p
        class="valueText"
        v-text="getLabel"
      />
      <div
        v-if="showOptionsInDOM"
        :class="contentClass"
      >
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
        <GSelectOption
          class="item"
          :class="{ disabled: isDisabled(item) }"
          v-for="(item, index) in filteredOptions"
          :key="`item_wrapper_${getItemValue(item)}_${index}`"
          @click.stop="clickItem(item)"
          :init-intersection-observer="removeOptionsFromDom"
        >
          <GCheckbox
            v-if="isCheckbox"
            :value="{ id: 1 }"
            :model-value="isSelected(item)"
            :disabled="isDisabled(item)"
            class="g-mr-4"
          />
          <span
            class="text"
            :class="{ disabled: isDisabled(item) }"
            v-text="getItemText(item)"
          />
        </GSelectOption>
      </div>
    </GFieldWrapper>
  </div>
</template>

<script lang="ts">
import GFieldWrapper from '../GFieldWrapper/GFieldWrapper.vue';
import GInput from '../GInput/GInput.vue';
import GCheckbox from '../GCheckbox/GCheckbox.vue';
import GBox from '../GBox/GBox.vue';
import GSelectOption from './GSelectOption.vue';
import { isEqualObject, isEmptyObject } from '../../utils/object';
const isEqualValue = (compare: any, to: any) => {
  if (typeof to === 'object') {
    return isEqualObject(compare, to);
  }

  return compare === to;
};

export default {
  name: 'GSelect',
  components: {
    GFieldWrapper,
    GInput,
    GCheckbox,
    GBox,
    GSelectOption,
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
      type: null,
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
    valueKey: {
      default: 'value',
      type: String,
    },
    textKey: {
      default: 'text',
      type: String,
    },
    reduceValue: {
      default (item) {
        return item[this.valueKey];
      },
      type: Function,
    },
    showClearButton: {
      default: false,
      type: Boolean,
    },
    removeOptionsFromDom: {
      type: Boolean,
      default: false,
    },
    enhancedSearch: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      isOptionsVisible: false,
      searchText: '',
    };
  },
  methods: {
    getItemValue (item) {
      return this.reduceValue(item);
    },
    getItemText (item) {
      return item[this.textKey];
    },
    isSelected (item): Boolean {
      const itemValue = this.getItemValue(item);

      if (Array.isArray(this.value)) {
        return this.value.some(val => {
          return isEqualValue(val, itemValue);
        });
      }

      return isEqualValue(this.value, itemValue);
    },
    isDisabled (item): Boolean {
      return !this.isSelected(item) && item.disabled;
    },
    onSearchChange (text: string | number) {
      this.$emit('onSearchChange', text);
    },
    clickItem (item) {
      const itemValue = this.getItemValue(item);

      if (this.isDisabled(item)) {
        return;
      }
      if (this.isCheckbox) {
        return this.clickCheckbox(itemValue);
      }
      this.isOptionsVisible = false;
      this.emitSelection(itemValue);
    },
    clickCheckbox (itemValue: any) {
      const array = this.value ? this.value.slice() : [];
      const i = array.findIndex((x) => {
        return isEqualValue(x, itemValue);
      });
      if (i >= 0) {
        array.splice(i, 1);
      } else {
        array.push(itemValue);
      }
      this.emitSelection(array);
    },
    handleIconClick (e: PointerEvent) {
      if (this.isClearIconDisplayed) {
        e.stopPropagation();
        this.$emit('clear');
        this.emitSelection(this.isCheckbox ? [] : null);
      }
    },
    emitSelection (selection) {
      this.$emit('input', selection);
      this.$emit('onChange', selection);
    },
    enhancedSearchHandler () {
      const filteredOptions = this.options.filter(({ text }) => {
        const regex = new RegExp(`^${this.searchText.toLowerCase()}`, 'i');
        const splittedText = text.trim().split(' ');
        return splittedText.some((str) => regex.test(str.toLowerCase()));
      });
      filteredOptions.sort((a, b) => {
        const bgnA = a.text.substr(0, this.searchText.length).toLowerCase();
        const bgnB = b.text.substr(0, this.searchText.length).toLowerCase();

        if (bgnA == this.searchText.toLowerCase()) {
          if (bgnB != this.searchText.toLowerCase()) return -1;
        } else if (bgnB == this.searchText.toLowerCase()) return 1;
        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
      });
      return filteredOptions;
    },
  },
  computed: {
    showOptionsInDOM () {
      return this.removeOptionsFromDom ? this.isOptionsVisible : true;
    },
    filteredOptions () {
      if (this.enhancedSearch) {
        return this.enhancedSearchHandler();
      }
      return this.options.filter((opt) =>
        (this.getItemText(opt) || '')
          .toLocaleLowerCase('TR')
          .includes((this.searchText || '').toLocaleLowerCase('TR')),
      );
    },
    icon () {
      if (this.isClearIconDisplayed) {
        return 'x';
      }

      return this.isOptionsVisible ? 'chevron-up' : 'chevron-down';
    },
    getValue () {
      return this.value;
    },
    hasValue () {
      if (Array.isArray(this.value)) {
        return Boolean(this.value.length);
      }

      if (typeof this.value === 'object') {
        return !isEmptyObject(this.value);
      }

      return Boolean(this.value);
    },
    getLabel () {
      const selectedOptions = this.options.filter(opt => {
        return this.isSelected(opt);
      });
      if (!selectedOptions.length) {
        return this.isOutlineLabel || this.isBorderless ? this.placeholder : '';
      }

      return selectedOptions.map(opt => this.getItemText(opt)).join(', ');
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
    isClearIconDisplayed () {
      return this.showClearButton && !this.disable && this.hasValue;
    },
  },
  watch: {
    isOptionsVisible (newValue: boolean) {
      if (this.disable) {
        this.isOptionsVisible = false;
        return;
      }
      if (!newValue) {
        this.$emit('blur');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.g-select {
  &.small {
    ::v-deep .-borderline {
      label {
        top: -3px;
      }
    }
  }

  ::v-deep .g-field-wrapper {
    .content .s-content ~ .g-icon {
      margin: 0 10px 0 0;
    }

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
      display: flex;
      align-items: center;
      select {
        -webkit-appearance: none;
        z-index: 2;
        color: var(--main-grey-500);
      }
    }

    &.big .content {
      height: 38px;
    }

    &.small .content {
      height: 32px;
    }

    .g-field-wrapper .content {
      background: var(--bg-grey-500);
      border: 1px solid var(--mid-grey-500);
      border-radius: var(--radius-md);
    }
  }

  .item {
    display: flex;
    align-items: flex-start;
    padding-bottom: 10px;
    border-bottom: 1px solid #d5d9e1;
    margin-bottom: 10px;
    line-height: 1.4;

    &.disabled {
      ::v-deep * {
        cursor: not-allowed !important;
      }
    }
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

          .text {
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

    &:not(.disabled):hover {
      color: var(--main-grey-500);
      cursor: pointer;
    }
  }

  .valueText {
    font-family: var(--font-family-base);
    font-size: var(--font-size-14);
    color: var(--main-grey-500);
    padding: 0 30px 0 13px;
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
        margin: 0;
        width: 14px;
      }
    }

    .s-content {
      top: 25px;
      padding: 8px;
    }

    .item {
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

      .g-icon {
        margin: 0;
        width: 18px;
      }
    }

    .s-content {
      top: 30px;
      padding: 10px;
    }

    .item {
      margin-bottom: 10px;
      padding-bottom: 10px;

      &:last-child {
        margin: 0;
        padding: 0;
      }
    }
  }

  .s-content {
    max-height: 200px;
    overflow: auto;
  }
}
</style>
