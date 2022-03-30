import { storiesOf } from '@storybook/vue';
import GInput from './GInput.vue';
import GButton from '../GButton';
import GNativeSelect from '../GNativeSelect';

storiesOf('GInput', module)
  .addParameters({ component: GInput })
  .add('Default', () => ({
    components: { GInput, GButton, GNativeSelect },
    props: {
      options: {
        default: [
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
        value: '',
      };
    },
    template: `
    <div style="margin: 40px 200px 200px">
      <GInput class="g-mb-20" label="Email" v-model="value"/>
      <GInput class="g-mb-20" label="Email" :disable="true"/>
      <GInput class="g-mb-20" label="Email" icon="info" />
      <GInput class="g-mb-20" size="small" label="Email" icon="info" />
      <GInput class="g-mb-20" label="Email" feedback="feedback" />
      <GInput class="g-mb-20" label="Email" feedback="feedback" isOutlineLabel/>
      <GInput class="g-mb-20" label="Email" icon="info" icon-position="icon-left" />
      <GInput class="g-mb-20" label="Email">
        <template #right-addon> <GInput label="Email"  />  </template>
      </GInput>
      <GInput class="g-mb-20" label="Email">
        <template #right-addon> <GButton>Test</GButton>  </template>
      </GInput>
      <GInput class="g-mb-20" label="Email">
        <template #right-addon> <GNativeSelect defaultValue="Value1" :options="options">Test</GNativeSelect>  </template>
      </GInput>
      <GInput class="g-mb-20" label="Email">
        <template #left-addon> <GInput label="Email"  />  </template>
      </GInput>
      <GInput class="g-mb-20" label="Email">
        <template #left-addon> <GButton>Test</GButton>  </template>
      </GInput>
      <GInput class="g-mb-20" label="Email">
        <template #left-addon> <GNativeSelect defaultValue="Value1" :options="options">Test</GNativeSelect>  </template>
      </GInput>

     </div>`,
  }))
  .add('States', () => ({
    components: { GInput },
    data () {
      return {
        text: '',
        trimText: '',
      };
    },
    template: `
    <div style="margin: 40px 200px 200px">
    <GInput label="Email" disable  feedback="feedback" isOutlineLabel/>
    <GInput label="Email" disable icon="info"/>
    <GInput label="Email" error  feedback="feedback" isOutlineLabel/>
    <GInput label="Email" error icon="info"/>
    <GInput label="Email" success  feedback="feedback" isOutlineLabel/>
    <GInput label="Email" v-model="text" success icon="info"/>
    <GInput label="Trim Prop" v-model="trimText" trim style="margin: 20px 0"/>
    </div>`,
  }));
