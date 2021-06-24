import { storiesOf } from '@storybook/vue';
import GButtonGroup from './GButtonGroup.vue';
import GButton from '../GButton/GButton.vue';
import { action } from '@storybook/addon-actions';

storiesOf('GButtonGroup', module)
  .addParameters({ component: GButtonGroup })
  .add('small', () => ({
    components: { GButtonGroup, GButton },
    data () {
      return {
        buttons: [1, 2, 3, 4, 5],
        activeButton: 3,
      };
    },
    methods: {
      buttonClick (page: number): void {
        const self: any = this;
        self.activeButton = page;
        action('Button Click')(page);
      },
    },
    template: `
      <GButtonGroup>
        <GButton
          v-for="button in buttons"
          size="small"
          :variant="activeButton === button ? 'secondary' : 'light'"
          @click="buttonClick(button)"
        >
          {{button}}
        </GButton>
      </GButtonGroup>
    `,
  }))
  .add('medium', () => ({
    components: { GButtonGroup, GButton },
    data () {
      return {
        buttons: [1, 2, 3, 4, 5],
        activeButton: 3,
      };
    },
    methods: {
      buttonClick (page: number): void {
        const self: any = this;
        self.activeButton = page;
        action('Button Click')(page);
      },
    },
    template: `
      <GButtonGroup>
        <GButton
          v-for="button in buttons"
          size="medium"
          :variant="activeButton === button ? 'secondary' : 'light'"
          @click="buttonClick(button)"
        >
          {{button}}
        </GButton>
      </GButtonGroup>
    `,
  }))
  .add('big', () => ({
    components: { GButtonGroup, GButton },
    data () {
      return {
        buttons: [1, 2, 3, 4, 5],
        activeButton: 3,
      };
    },
    methods: {
      buttonClick (page: number): void {
        const self: any = this;
        self.activeButton = page;
        action('Button Click')(page);
      },
    },
    template: `
      <GButtonGroup>
        <GButton
          v-for="button in buttons"
          size="big"
          :variant="activeButton === button ? 'secondary' : 'light'"
          @click="buttonClick(button)"
        >
          {{button}}
        </GButton>
      </GButtonGroup>
    `,
  }))

;
