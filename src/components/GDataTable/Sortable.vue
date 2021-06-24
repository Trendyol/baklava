<template>
  <GBox
    class="g-sortable-wrapper"
    :flex="true"
    @click="onClick"
  >
    <slot />
    <div class="sort-icon">
      <GIcon
        class="up"
        name="triangle"
        size="6px"
        :fill="upArrowColor"
      />
      <GIcon
        class="down rotate180"
        name="triangle"
        size="6px"
        :fill="downArrowColor"
      />
    </div>
  </GBox>
</template>

<script>
import GBox from '../GBox/GBox.vue';
import GIcon from '../GIcon/GIcon.vue';

export default {
  name: 'Sortable',
  components: {
    GBox,
    GIcon,
  },
  props: {
    sortName: {
      type: String,
      default: '',
    },
    sortType: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  computed: {
    upArrowColor () {
      if (this.name === this.sortName && this.sortType === 'asc') {
        return 'var(--main-grey-500)';
      }
      return 'var(--mid-grey-500)';
    },
    downArrowColor () {
      if (this.name === this.sortName && this.sortType === 'desc') {
        return 'var(--main-grey-500)';
      }
      return 'var(--mid-grey-500)';
    },
  },
  methods: {
    onClick () {
      if (this.sortName === this.name && this.sortType === 'asc') {
        return this.$emit('sort', { name: this.name, type: 'desc' });
      }

      return this.$emit('sort', { name: this.name, type: 'asc' });
    },
  },
};
</script>

<style lang="scss" scoped>
  .g-sortable-wrapper {
    cursor: pointer;
    .sort-icon {
      display: flex;
      flex-direction: column;
      margin-left: 5px;

      .rotate180{
        transform: rotate(180deg);
        margin-top: 3px;
      }
    }
  }
</style>
