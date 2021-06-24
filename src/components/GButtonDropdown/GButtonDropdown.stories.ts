import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import GText from '../GText/GText.vue';
import GButtonDropdown from './GButtonDropdown.vue';

storiesOf('GButtonDropdown', module)
  .addDecorator(withKnobs)
  .addParameters({ component: GButtonDropdown })
  .add('Base', () => ({
    components: { GButtonDropdown, GText },
    template: `
      <GButtonDropdown>
        Base Button
        <template #menu>
          <GText>menu content</GText>
        </template>
      </GButtonDropdown>
    `,
  }))
  .add('Variant', () => ({
    components: { GButtonDropdown, GText },
    props: {
      variant: {
        default: select('variant', [
          'success',
          'primary',
          'secondary',
          'tertiary',
          'info',
          'warning',
          'danger',
          'light',
          'dark',
        ], 'success'),
      },
      size: {
        default: select('size', [
          'big',
          'medium',
          'small'
        ], 'medium'),
      },
      isDisabled: {
        default: boolean('isDisabled', false),
      },
      isButtonDisabled: {
        default: boolean('isButtonDisabled', false),
      },
      isDropdownDisabled: {
        default: boolean('isDropdownDisabled', false),
      },
      tooltip: {
        default: boolean('tooltip', false),
      },
      tooltipText: {
        default: text('tooltipText', 'Trendyol Seller Center'),
      },
      tooltipPlacement: {
        default: select('tooltipPlacement', [
          'top',
          'left',
          'bottom',
          'right',
        ], 'left'),
      },
    },
    data () {
      return {
        isDropdownOpen: false,
      }
    },
    methods: {
      onButtonClick (event) {
        action('onButtonClick')(event);
      },
      onDropdownOpen () {
        action('onDropdownOpen')();
      },
      onDropdownClose () {
        action('onDropdownClose')();
      },
    },
    template: `
      <div style="text-align: center; margin: 100px;">
        <GButtonDropdown
          :variant="variant"
          :size="size"
          :isDisabled="isDisabled"
          :isButtonDisabled="isButtonDisabled"
          :isDropdownDisabled="isDropdownDisabled"
          :tooltip="tooltip"
          :tooltipText="tooltipText"
          :tooltipPlacement="tooltipPlacement"
          @onButtonClick="onButtonClick"
          @onDropdownOpen="onDropdownOpen"
          @onDropdownClose="onDropdownClose"
        >
          Base Button
          <template #menu>
            <GText>menu content</GText>
          </template>
        </GButtonDropdown>
      </div>
    `,
  }));
