import { storiesOf } from '@storybook/vue';
import GNativeSelect from './GNativeSelect.vue';

storiesOf('GNativeSelect', module)
  .addParameters({ component: GNativeSelect })
  .add('Default', () => ({
    components: { GNativeSelect },
    props: {
      options: {
        default: [
          {
            value: null,
            text: 'Placeholder',
            disabled: true,
            hidden: true,
          },
          {
            value: 'Value1',
            text: 'Text1',
          },
          {
            value: 'Value2',
            text: 'Text2',
          },
        ],
      },
    },
    data () {
      return {
        selectedItem: {
          value: 'Value2',
          text: 'Text2',
        },
        selectedItemWithPlaceholder: {},
      };
    },
    template: `
    <div style="margin: 40px 200px 200px">
      <GNativeSelect class="g-mb-20" :options="options" v-model="selectedItemWithPlaceholder" label="Email"  />
      <GNativeSelect class="g-mb-20" :options="options" v-model="selectedItem" label="Email"  />
      <GNativeSelect class="g-mb-20" :options="options" v-model="selectedItem" isBorderless label="Email" />
      <GNativeSelect class="g-mb-20" :options="options" v-model="selectedItem" label="Email" feedback="feedback" isOutlineLabel/>
      <GNativeSelect class="g-mb-20" :options="options" v-model="selectedItem" />
      Selected Item: {{ selectedItem.value }}
     </div>`,
  }));
