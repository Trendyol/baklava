<script lang="ts">

import GInput from '../GInput/GInput.vue';
import Inputmask from 'inputmask';

export default {
  name: 'GInputPrice',
  extends: GInput,
  computed: {
    getAttrs () {
      const { suffix = '₺', digits = 2, placeholder, rightAlign = false, allowMinus } = this.$attrs;
      return { suffix, digits, placeholder, rightAlign, allowMinus };
    },
    getValue () {
      return String(this.value).replace(/\./g, ',');
    },
  },
  methods: {
    onInput (e: any) {
      this.$emit('input', e.target.value.toString().replace(',', '.'));
    },
  },
  mounted (): void {
    Inputmask({
      ...this.getAttrs,
      groupSeparator: '.',
      radixPoint: ',',
      alias: 'numeric',
      autoGroup: true,
      digitsOptional: false,
      autoUnmask: true,
    }).mask(this.$refs.input);
  },
};
</script>
