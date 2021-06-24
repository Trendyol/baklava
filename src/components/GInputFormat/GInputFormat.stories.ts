import { storiesOf } from '@storybook/vue';
import GInputFormat from './GInputFormat.vue';

storiesOf('GInputFormat', module)
  .addParameters({ component: GInputFormat })
  .add('Default', () => ({
    components: { GInputFormat },
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
        formData: {},
        maskOptions: {
          rightAlign: false,
          mask: '99-9999',
          placeholder: '',
        },
      };
    },
    template: `
    <div style="margin: 40px 200px 200px">
      <GInputFormat label="Email" :mask="maskOptions" v-model="formData.value" />
      <br>
      <GInputFormat label="Email" success :mask="maskOptions" v-model="formData.value1" />
      <br>
      <GInputFormat error :mask="maskOptions" v-model="formData.value2" />
      <br>
      <GInputFormat disabled :mask="maskOptions" />
      {{formData}}
      <hr>
      <a href="https://github.com/RobinHerbots/Inputmask">InputMask</a>
    </div>`,
  }));
