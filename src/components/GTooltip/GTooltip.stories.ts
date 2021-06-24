import { storiesOf } from '@storybook/vue';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import GTooltip from './GTooltip.vue';
import GText from '../GText/GText.vue';

storiesOf('GTooltip', module)
  .addDecorator(withKnobs)
  .addParameters({ component: GTooltip })
  .add('base', () => ({
    components: { GTooltip, GText },
    template: `
      <div style="text-align: center; margin:100px;">
        <GTooltip text="Tooltip Text">
          <template #tooltip-trigger>
            <GText>Tooltip Trigger Text</GText>
          </template>
        </GTooltip>
        </div>
      `,
  }))
  .add('variant', () => ({
    components: { GTooltip, GText },
    props: {
      variant: {
        default: select("variant", [
          "success",
          "primary",
          "secondary",
          "tertiary",
          "info",
          "warning",
          "danger",
          "light",
          "dark",
        ], "dark"),
      },
      placement: {
        default: select("placement", [
          "top",
          "left",
          "bottom",
          "right",
        ], "right"),
      },
      tooltipText: {
        default: text("tooltipText", "Trendyol Seller Center"),
      },
    },
    template: `
      <div style="text-align: center; margin:100px;">
        <GTooltip :text="tooltipText" :variant="variant" :placement="placement">
          <template #tooltip-trigger>
            <GText>Tooltip Trigger Text</GText>
          </template>
        </GTooltip>
      </div>
    `,
  }))
  .add('slot text', () => ({
    components: { GTooltip, GText },
    template: `
      <div style="text-align: center; margin:100px;">
        <GTooltip>
          <template #tooltip-trigger>
            <GText>Tooltip Trigger Text</GText>
          </template>
          <template #tooltip-text>
            Tooltip Text
          </template>
        </GTooltip>
      </div>
    `,
  }))
