<template>
  <GFieldWrapper
    :is-value="!!value"
    :is-outline-label="isOutlineLabel"
    :feedback="feedback"
    :label="label"
    :icon="icon"
    :success="success"
    :error="error"
    :disable="disable"
  >
    <textarea
      :value="getValue"
      @input="onInput"
      v-on="listeners"
      v-bind="$attrs"
    />
    <template
      #bottom_right
      v-if="showProgress"
    >
      <GBox flex>
        <GText
          variant="caption"
          :color="isFinishWritingLimit ? 'red-500' : 'green-500'"
        >
          {{ progress.current }}
        </GText>
        <GText variant="caption">
          /
        </GText>
        <GText
          variant="caption"
        >
          {{ progress.max || '∞' }}
        </GText>
      </GBox>
    </template>
  </GFieldWrapper>
</template>

<script lang="ts">

import ClickOutside from '../../directives/ClickOutside.ts';
import GFieldWrapper from '../GFieldWrapper/GFieldWrapper.vue';
import GText from '../../components/GText';
import GBox from '../../components/GBox';

export default {
  name: 'GTextarea',
  components: {
    GBox,
    GText,
    GFieldWrapper,
  },
  directives: {
    ClickOutside,
  },
  props: {
    value: {
      type: String,
      default: () => null,
    },
    type: {
      default: 'text',
      type: String,
    },
    isOutlineLabel: {
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
    feedback: {
      default: '',
      type: String,
    },
    icon: {
      default: '',
      type: String,
    },
    showProgress: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    getValue () {
      return this.value;
    },

    listeners () {
      const { input, ...rest } = this.$listeners;

      return rest;
    },

    progress (): { current: number, max: string } {
      const { maxlength } = this.$attrs;
      const length = (this.getValue || '').length;

      return {
        current: length,
        max: maxlength,
      };
    },
    isFinishWritingLimit (): boolean {
      const { current, max } = this.progress;

      return max && current >= parseInt(max, 10);
    },
  },

  methods: {
    onInput (e: any) {
      this.$emit('input', e.target.value);
    },
  },

  watch: {
    isFinishWritingLimit: {
      handler (newValue): void {
        if (newValue) {
          this.$emit('reachMaxLength', this.$attrs.maxlength);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  textarea {
    min-height: 32px;
  }
</style>
