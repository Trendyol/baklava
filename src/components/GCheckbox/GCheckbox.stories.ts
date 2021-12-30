import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GCheckbox from './';
import GBox from '../GBox';
import GText from '../GText';

storiesOf('GCheckbox', module)
  .addDecorator(withKnobs)
  .addParameters({ component: GCheckbox })
  .add('Single Select', () => ({
    components: { GCheckbox, GText },
    template: `
      <GCheckbox
        :value="{ id: 1 }"
        v-model="isChecked"
        @change="onChange"
        :disabled="disabled"
        :indeterminate="indeterminate"
      >
        <GText variant="body"> Is Selected: {{ isChecked }} </GText>
      </GCheckbox>
    `,
    props: {
      disabled: {
        default: boolean('Disabled', false),
      },
      indeterminate: {
        default: boolean('Indeterminate', false),
      },
    },
    data () {
      return {
        isChecked: false,
      };
    },
    methods: {
      onChange (event) {
        action('Change')(event);
      },
    },
  }))
  .add('Multi Select with object values', () => ({
    components: { GCheckbox, GBox, GText },
    template: `
      <GBox>
        <GBox flex direction="row" :mb="10">
          <GCheckbox :value="value" v-model="selectedItems" :disabled="disabled"></GCheckbox>
          <GCheckbox :value="{ id: 2 }" v-model="selectedItems" :disabled="disabled"></GCheckbox>
          <GCheckbox :value="{ id: 3 }" v-model="selectedItems" :disabled="disabled"></GCheckbox>
        </GBox>
        <GText variant="body">Selected Items:</GText>
        <ul>
            <li v-for="selected in selectedItems"> {{ selected }} </li>
        </ul>
      </GBox>
    `,
    data () {
      const value = { id: 1 };
      return {
        value,
        selectedItems: [value],
      };
    },
    props: {
      disabled: {
        default: boolean('Disabled', false),
      },
    },
  }))
  .add('Multi Select with string values', () => ({
    components: { GCheckbox, GBox, GText },
    template: `
      <GBox>
        <GBox flex direction="row" :mb="10">
          <GCheckbox :value="'value1'" v-model="selectedItems" :disabled="disabled"></GCheckbox>
          <GCheckbox :value="'value2'" v-model="selectedItems" :disabled="disabled"></GCheckbox>
          <GCheckbox :value="'value3'" v-model="selectedItems" :disabled="disabled"></GCheckbox>
        </GBox>
        <GText variant="body">Selected Items:</GText>
        <ul>
            <li v-for="selected in selectedItems"> {{ selected }} </li>
        </ul>
      </GBox>
    `,
    data () {
      return {
        selectedItems: ['value2'],
      };
    },
    props: {
      disabled: {
        default: boolean('Disabled', false),
      },
    },
  }))
  .add('Props', () => ({
    components: { GCheckbox, GText },
    template: `
      <GCheckbox
        :value="{ id: 1 }"
        v-model="isChecked"
        @change="onChange"
        :disabled="disabled"
        :isInvalid="isInvalid"
        color="turquoise-500"
      >
        <GText variant="body"> Is Selected: {{ isChecked }} </GText>
      </GCheckbox>`,
    props: {
      disabled: {
        default: boolean('Disabled', false),
      },
      isInvalid: {
        default: boolean('Invalid', false),
      },
    },
    data () {
      return {
        isChecked: false,
      };
    },
    methods: {
      onChange (event) {
        action('Change')(event);
      },
    },
  }))
  .add('Events', () => ({
    components: { GCheckbox },
    template: '<GCheckbox :value="{ id: 1 }" @change="onChange" @click="onClick" />',
    methods: {
      onChange (event) {
        action('Changed')(event);
      },
      onClick (event) {
        action('Clicked')(event);
      },
    },
  }));
