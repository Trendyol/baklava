<template>
  <div
    class="breadcrumb"
    v-if="paths.length"
  >
    <ul class="">
      <li>
        Seçilen:
      </li>
      <li
        v-for="(path, k) in paths"
        :key="k"
        @click="onRevert(k)"
      >
        <span>
          {{ path }}
        </span>
        <GIcon
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
  name: 'BreadCrumb',
  components: {
    GIcon,
  },
  props: {
    paths: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onRevert (index) {
      this.$emit('onRevert', index);
    },
  },
};
</script>

<style lang="scss" scoped>
  .breadcrumb{
    padding: 10px;
    background: var(--bg-grey-700);
    margin-bottom: 0;
    border-radius: 0 0 5px 5px;
    ul{
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      align-items: center;

      li {
        font-size: 12px;
        color: #6e7787;
        padding-left: 5px;
        padding-right: 10px;
        position: relative;

        &:first-child {
          color: #273142;
          font-weight: 500;
        }
        &:last-child {
          .icon-chevron-right{
            display: none;
          }
        }

        span {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          &:hover{
            text-decoration: underline;
          }
        }
        .icon-chevron-right {
          position: absolute;
          top: 50%;
          right: -5px;
          transform: translateY(-50%);
          width: 15px;
        }
      }
    }
  }
</style>
