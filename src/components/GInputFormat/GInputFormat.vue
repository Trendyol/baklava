<script lang="ts">

import GInput from '../GInput/GInput.vue';
import Inputmask from 'inputmask';

export default {
  name: 'GInputFormat',
  extends: GInput,
  props: {
    mask: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    getAttrs (): any {
      return {
        ...{ autoUnmask: true },
        ...this.$attrs,
        ...this.mask,
      };
    },
  },
  mounted (): void {
    Inputmask({
      ...this.getAttrs,
    }).mask(this.$refs.input);
  },
};
</script>
