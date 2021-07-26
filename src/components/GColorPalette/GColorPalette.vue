<template>
  <GBox
    :mb="30"
    align="items-center"
  >
    <GBox
      flex
      v-if="palette.name"
      class="g-color-palette"
      direction="column"
    >
      <GBox
        flex
        :pb="20"
      >
        <GText
          color="main-grey-500"
          variant="headline-03"
        >
          {{ palette.name }}
        </GText>
      </GBox>
      <GBox flex>
        <GBox
          v-for="(color,index) in palette.colors"
          :key="index"
        >
          <GBox
            :class="`g-bg-${palette.tag}-${index+1}00`"
            class="color-box"
            :mr="8"
          />
          <GBox :mt="10">
            <GText>
              {{ palette.tag }}-{{ index + 1 }}00
            </GText>
            <GText class="color-hex" color="mid-grey-500" variant="caption">
              {{ color }}
            </GText>
          </GBox>
        </GBox>
      </GBox>
    </GBox>
  </GBox>
</template>

<script>

import GBox from '../GBox/GBox.vue';
import GIcon from '../GIcon/GIcon.vue';
import GText from '../GText/GText.vue';

export default {
  name: 'GColorPalette',
  components: {GText, GBox, GIcon },
  props: {
    palette: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss" scoped>
  .g-color-palette {
    width: 100%;
    border-radius: 4px;
    font-size: var(--font-size-12);

    .color{
      &-box{
        height: 70px;
        width: 100px;
      }
      &-hex{
        margin-top: 5px;
      }
    }
  }
</style>
