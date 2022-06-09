<template>
  <div v-click-outside="onClickOutside" class="g-button-dropdown">
    <div class="buttons g-d-flex">
      <GTooltip
        v-if="(tooltip && isDisabled) || (tooltip && isButtonDisabled)"
        :placement="tooltipPlacement"
      >
        <template #tooltip-trigger>
          <GButton
            v-bind="$attrs"
            :variant="variant"
            :size="size"
            :disabled="isDisabled || isButtonDisabled"
            @click="onButtonClick"
          >
            <slot />
          </GButton>
        </template>
        <template #tooltip-text>
          {{ tooltipText }}
        </template>
      </GTooltip>
      <GButton
        v-else
        v-bind="$attrs"
        :variant="variant"
        :size="size"
        :disabled="isDisabled || isButtonDisabled"
        @click="onButtonClick"
      >
        <slot />
      </GButton>
      <GButton
        v-bind="$attrs"
        :icon="icon"
        :variant="darkVariant"
        :size="size"
        :disabled="isDisabled || isDropdownDisabled"
        class="dropdown-button"
        @click="onDropdownClick"
      />
    </div>
    <div :class="menuClass">
      <slot name="menu" />
    </div>
  </div>
</template>

<script lang="ts">

import GButton from '../GButton/GButton.vue';
import GTooltip from '../GTooltip/GTooltip.vue';
import ClickOutside from '../../directives/ClickOutside';

export default {
  name: 'GButtonDropdown',
  components: {
    GButton,
    GTooltip,
  },
  directives: {
    ClickOutside,
  },
  props: {
    variant: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'big',
    },
    isDropdownOpen: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isButtonDisabled: {
      type: Boolean,
      default: false,
    },
    isDropdownDisabled: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: Boolean,
      default: false,
    },
    tooltipText: {
      type: String,
      default: null,
    },
    tooltipPlacement: {
      type: String,
      default: 'left',
    },
    closeOutside: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      isContentVisible: false,
    };
  },
  computed: {
    icon (): string {
      return this.isContentVisible ? 'chevron-up' : 'chevron-down';
    },
    darkVariant (): string {
      return this.variant + '-darker';
    },
    menuClass (): {} {
      return {
        menu: true,
        'g-d-none': !this.isContentVisible,
      };
    },
  },
  methods: {
    onButtonClick (event: any): void {
      if (!this.isContentVisible && !this.isDropdownDisabled) {
        this.isContentVisible = true;

        this.$emit('onButtonClick', event);
        this.$emit('onDropdownOpen');
      } else if (this.isContentVisible && !this.isDropdownDisabled) {
        this.isContentVisible = false;

        this.$emit('onButtonClick', event);
        this.$emit('onDropdownClose');
      }
    },
    onDropdownClick (): void {
      const prevState = this.isContentVisible;
      this.isContentVisible = !this.isContentVisible;

      (this.isContentVisible && !prevState)
        ? this.$emit('onDropdownOpen')
        : this.$emit('onDropdownClose');
    },
    onClickOutside (): void {
      if(this.closeOutside) {
        this.isContentVisible = false;
        this.$emit('onDropdownClose');
      }
    }
  },
  watch: {
    isDropdownOpen (newValue) {
      this.isContentVisible = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.g-button-dropdown {
  display: inline-block;

  ::v-deep .buttons {
    :first-child {
      border-radius: var(--radius-md) 0 0 var(--radius-md);
    }
    :last-child {
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
    }
  }

  ::v-deep .g-tooltip > span > :last-child {
    border-radius: 4px !important;
  }

  .menu {
    background: white;
    padding: 15px;
    border: 1px solid var(--mid-grey-800);
    border-radius: var(--radius-md);
    margin-top: 5px;
  }
}
</style>
