<template>
  <div :class="classNames">
    <div
      class="tab"
      v-for="tab in tabs"
      :key="tab.type"
      :class="[{ 'active': tab.type === type }, tab.type]"
      @click="tab.type !== type && handleTabClick(tab.type)"
      @mouseenter="onMouseEnter(tab)"
      @mouseleave="onMouseLeave(tab)"
    >
      <slot
        :name="tab.type"
        :tab="{
          ...tab,
          isActive: tab.type === type,
          isHovered: tab.type === hoveredTabKey
        }"
      >
        <div class="tab-title">
          <GText
            class="tab-name g-d-flex g-d-align-center g-d-justify-center"
            variant="subtitle-03"
            :color="titleColor"
          >
            <slot
              :name="`left|${tab.type}`"
              :tab="{
                ...tab,
                isActive: tab.type === type,
                isHovered: tab.type === hoveredTabKey
              }"
            />
            <span :class="{ 'g-ml-4': !!$slots[`left|${tab.type}`] }">
              {{ label(tab.label) }}
            </span>
            <GTooltip
              v-if="tab.tooltipText"
              placement="bottom"
            >
              <template #tooltip-trigger>
                <GIcon
                  class="g-ml-4"
                  name="alert-circle"
                  size="14px"
                />
              </template>
              <template #tooltip-text>
                {{ label(tab.tooltipText) }}
              </template>
            </GTooltip>
            <GText
              v-if="tab.isNew"
              variant="small"
              :color="tab.isNew.color"
              :class="&quot;g-bg-&quot; + tab.isNew.bgColor"
              class="g-rad-sm g-py-4 g-px-10 g-ml-10 is-new"
            >
              {{ tab.isNew.text }}
            </GText>
          </GText>
        </div>
        <slot
          name="sub-title"
          :tab="{
            ...tab,
            isActive: tab.type === type,
            isHovered: tab.type === hoveredTabKey
          }"
        >
          <div
            v-if="showCount && tab.totalElements > -1"
            class="tab-count"
          >
            <GText
              variant="small"
              :color="subTitleColor"
            >
              {{ tab.totalElements | formatted }}
              <slot name="totalElementText">
                BİLDİRİM
              </slot>
            </GText>
          </div>
        </slot>
        <div class="seperator" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">

import GText from '../GText/GText.vue';
import GTooltip from '../GTooltip/GTooltip.vue';
import GIcon from '../GIcon/GIcon.vue';

export default {
  name: 'Tabs',
  components: {
    GTooltip,
    GText,
    GIcon,
  },
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: '',
    },
    showCount: {
      type: Boolean,
      default: false,
    },
    fluid: {
      type: Boolean,
      default: false,
    },
    titleColor: {
      type: String,
      default: () => 'main-grey-500',
    },
    subTitleColor: {
      type: String,
      default: () => 'main-grey-500',
    },
  },
  data () {
    return {
      hoveredTabKey: '',
    };
  },

  filters: {
    formatted (val:any) {
      return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    },
  },
  computed: {
    classNames () {
      return {
        'g-tabs': true,
        '-fluid': this.fluid,
      };
    },
  },
  methods: {
    onMouseEnter (tab: any): void {
      this.hoveredTabKey = tab.type;
    },
    onMouseLeave (tab: any): void {
      this.hoveredTabKey = '';
    },
    handleTabClick (type: string): void {
      this.$emit('handleTabClick', type);
    },
    label (label) {
      return label
        ? label
        : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.g-tabs {
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid var(--bg-grey-500);
  background-color: var(--white);
  border-top-left-radius: var(--radius-md);
  border-top-right-radius: var(--radius-md);

  .tab {
    position: relative;
    text-align: center;
    padding: 16px;
    margin-bottom: -2px;
    cursor: pointer;
    border-bottom: 2px solid var(--bg-grey-500);

    &:last-child {
      .seperator {
        display: none;
      }
    }

    .tab-name{
      height: 20px;
    }

    .seperator {
      height: 16px;
      border-right: 1px solid var(--light-grey-800);;
      position: absolute;
      top: 18px;
      right: 0;
    }

    .tab-count {
      margin-top: 3px;
    }

    &.active {
      border-bottom: 2px solid var(--orange-500);

      .tab-title {
        .tab-name{
          color: var(--orange-500);
        }
      }

      .tab-count {
        .g-text {
          color: var(--main-grey-500);
        }
      }
    }

    &:hover {
      .tab-title {
        .tab-name{
          color: var(--orange-500);
        }
      }

      .tab-count {
        .g-text {
          color: var(--main-grey-500);
        }
      }
    }
    &:first-child{
      padding-left: 24px;
    }
  }

  &.-fluid {
    width: 100%;

    .tab {
      flex: 1;
    }
  }
}
</style>
