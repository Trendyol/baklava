import { storiesOf } from '@storybook/vue';
import { withKnobs, text } from '@storybook/addon-knobs';
import GTag from './GTag.vue';

const stories = storiesOf('GTag', module);
stories.addDecorator(withKnobs);

stories
  .addParameters({ component: GTag })
  .add('base', () => ({
    components: { GTag },
    template: `<GTag variant="base">Base Tag</GTag>`,
  }))
  .add('dark', () => ({
    components: { GTag },
    template: `<GTag variant="dark">Dark Tag</GTag>`,
  }))
  .add('success', () => ({
    components: { GTag },
    template: `<GTag variant="success">Success Tag</GTag>`,
  }))
  .add('warning', () => ({
    components: { GTag },
    template: `<GTag variant="warning">Warning Tag</GTag>`,
  }))
  .add('info', () => ({
    components: { GTag },
    template: `<GTag variant="info">Info Tag</GTag>`,
  }))
  .add('error', () => ({
    components: { GTag },
    template: `<GTag variant="error">Error Tag</GTag>`,
  }))
