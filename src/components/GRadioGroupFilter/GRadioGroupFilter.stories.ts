import { storiesOf } from '@storybook/vue';
import GBox from '../GBox';
import GRadioGroupFilter from './GRadioGroupFilter.vue';

storiesOf('GRadioGroupFilter', module)
  .addParameters({ component: GRadioGroupFilter })
  .add('Default', () => ({
    components: { GBox, GRadioGroupFilter },
    data () {
      return {
        selectedBrand: 'samsung',
        brands: [{
          name: 'Apple',
          value: 'apple',
        }, {
          name: 'Samsung',
          value: 'samsung',
        }, {
          name: 'Huawei',
          value: 'huawei',
        }],
      };
    },
    template: `
      <GBox flex direction="row" class="g-m-10">
        <GRadioGroupFilter
          v-for="(brand, index) in brands"
          :key="index"
          :val="brand.value"
          name="brands"
          v-model="selectedBrand">
          {{ brand.name }}
        </GRadioGroupFilter>
      </GBox>
    `,
  }));
