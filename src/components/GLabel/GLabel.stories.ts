import { storiesOf } from '@storybook/vue';
import { withKnobs, text } from '@storybook/addon-knobs';
import GLabel from './GLabel.vue';

const stories = storiesOf('GLabel', module);
stories.addDecorator(withKnobs);

stories
  .addParameters({ component: GLabel })
  .add('base', () => ({
    components: { GLabel },
    props: {
      iconName: {
        default: text('Icon Name', 'alert-circle'),
      },
    },
    template: `<GLabel :iconName="iconName" variant="base">Base Label</GLabel>`,
  }))
  .add('success', () => ({
    components: { GLabel },
    props: {
      iconName: {
        default: text('Icon Name', 'alert-circle'),
      },
    },
    template: `<GLabel :iconName="iconName" variant="success">Success Label</GLabel>`,
  }))
  .add('warning', () => ({
    components: { GLabel },
    props: {
      iconName: {
        default: text('Icon Name', 'alert-circle'),
      },
    },
    template: `<GLabel :iconName="iconName" variant="warning">Warning Label</GLabel>`,
  }))
  .add('error', () => ({
    components: { GLabel },
    props: {
      iconName: {
        default: text('Icon Name', 'alert-circle'),
      },
    },
    template: `<GLabel :iconName="iconName" variant="error">Error Label</GLabel>`,
  }))
