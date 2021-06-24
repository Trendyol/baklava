import { storiesOf } from '@storybook/vue';
import GSwitch from './GSwitch.vue';
import { boolean, withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('GSwitch', module);
stories.addDecorator(withKnobs);

stories
  .addParameters({ component: GSwitch })
  .add('Default', () => ({
    props: {
      disabled: {
        default: boolean('Disabled', false),
      },
    },
    components: { GSwitch },
    data () {
      return {
        checked: true,
      };
    },
    template: '<div style=\'margin:100px;\'>' +
        '<div><GSwitch v-model="checked" :disabled="disabled"/></div>' +
        '<div><GSwitch v-model="checked" :size="\'medium\'"></div>' +
        '<div><GSwitch v-model="checked" :size="\'small\'"></div>' +
        '</div>',
  }));
