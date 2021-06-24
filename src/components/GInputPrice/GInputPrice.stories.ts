import { storiesOf } from '@storybook/vue';
import GInputPrice from './GInputPrice.vue';
import GIcon from '../GIcon';
import GNativeSelect from '../GNativeSelect';

storiesOf('GInputPrice', module)
  .addParameters({ component: GInputPrice })
  .add('Default', () => ({
    components: { GInputPrice, GIcon, GNativeSelect },
    data () {
      return {
        price: '0',
      };
    },
    template: `
    <div style="margin: 40px 200px 200px">
        <GInputPrice isOutlineLabel v-model="price">
        </GInputPrice>
        {{price}}
     </div>`,
  }));
