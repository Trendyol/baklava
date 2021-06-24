<template>
  <div
    :class="classNames"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'GBox',
  props: {
    p: Number,
    pt: Number,
    pr: Number,
    pb: Number,
    pl: Number,
    px: Number,
    py: Number,
    m: Number,
    mt: Number,
    mr: Number,
    mb: Number,
    ml: Number,
    mx: Number,
    my: Number,

    sm: Number,
    md: Number,
    lg: Number,

    flex: {
      type: Boolean,
      default: false,
    },
    align: String,
    justify: String,
    direction: String,
    order: Number,
  },
  computed: {
    classNames: function () {
      let sizeClassObj = {};
      ['sm', 'md', 'lg'].forEach((size: String) => {
        let sizeProps: any = {};
        const propSize = this[size];
        if (typeof propSize === 'number') {
          sizeProps.span = propSize;
        } else if (typeof propSize === 'object') {
          sizeProps = propSize || {};
        }

        sizeClassObj = {
          ...sizeClassObj,
          [`g-col-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
          [`g-col-${size}-shift-${sizeProps.shift}`]: sizeProps.shift || sizeProps.shift === 0,
        };
      });

      ['align', 'justify', 'direction', 'order'].forEach((key: String) => {
        const value = this[key];
        sizeClassObj = {
          ...sizeClassObj,
          [`g-d-${key}-${value}`]: value !== undefined,
        };
      });

      ['p',
        'pt',
        'pr',
        'pb',
        'pl',
        'px',
        'py',
        'm',
        'mt',
        'mr',
        'mb',
        'ml',
        'mx',
        'my'].forEach((key: String) => {
        const value = this[key];
        sizeClassObj = {
          ...sizeClassObj,
          [`g-${key}-${value}`]: value !== undefined,
        };
      });

      const classes = {
        'g-d-flex': this.flex,
        ...sizeClassObj,
      };
      return classes;
    },
  },
};
</script>

<style lang="scss" scoped></style>
