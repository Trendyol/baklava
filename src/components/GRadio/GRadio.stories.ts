import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GRadio from './';
import GBox from '../GBox';
import GText from '../GText';

storiesOf('GRadio', module)
  .addDecorator(withKnobs)
  .addParameters({ component: GRadio })
  .add('Default', () => ({
    components: {
      GRadio,
      GBox,
      GText,
    },
    template: `
      <GBox>
        <GBox flex direction="row">
          <GRadio
            val="male"
            name="gender"
            v-model="selectedGender"
            :disabled="disabled"
          >
            Male
          </GRadio>
          <GRadio
            val="female"
            name="gender"
            v-model="selectedGender"
            :disabled="disabled"
          >
            Female
          </GRadio>
        </GBox>
        <GText>Selected: {{ selectedGender }}</GText>
      </GBox>
    `,
    props: {
      disabled: {
        default: boolean('Disabled', false),
      },
    },
    data () {
      return {
        selectedGender: 'female',
      };
    },
  }))
  .add('Disabled', () => ({
    components: {
      GRadio,
      GBox,
      GText,
    },
    template: `
      <GBox>
        <GBox flex direction="row">
          <GRadio
            val="male"
            name="gender"
            v-model="selectedGender"
            :disabled="disabled"
          >
            Male
          </GRadio>
          <GRadio
            val="female"
            name="gender"
            v-model="selectedGender"
            :disabled="disabled"
          >
            Female
          </GRadio>
        </GBox>
        <GText>Selected: {{ selectedGender }}</GText>
      </GBox>
    `,
    props: {
      disabled: {
        default: boolean('Disabled', true),
      },
    },
    data () {
      return {
        selectedGender: 'male',
      };
    },
  }))
  .add('Events', () => ({
    components: {
      GRadio,
      GBox,
      GText,
    },
    template: `
      <GBox>
        <GBox flex direction="row">
          <GRadio
            val="male"
            name="gender"
            @change="onMaleChange"
            v-model="selectedGender"
            :disabled="disabled"
          >
            Male
          </GRadio>
          <GRadio
            val="female"
            name="gender"
            @click="onFemaleClick"
            v-model="selectedGender"
            :disabled="disabled"
          >
            Female
          </GRadio>
        </GBox>
        <GText>Selected: {{ selectedGender }}</GText>
      </GBox>
    `,
    props: {
      disabled: {
        default: boolean('Disabled', false),
      },
    },
    methods: {
      onMaleChange (event) {
        action('onMaleChange')(event);
      },
      onFemaleClick (event) {
        action('onFemaleClick')(event);
      },
    },
    data () {
      return {
        selectedGender: '',
      };
    },
  }));
