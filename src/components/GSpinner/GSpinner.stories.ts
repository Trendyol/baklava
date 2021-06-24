// @ts-nocheck
import { storiesOf } from '@storybook/vue';
import GSpinner from './GSpinner.vue';

storiesOf('GSpinner', module)
  .addParameters({ component: GSpinner })
  .lokiSkip('Base', () => ({
    components: { GSpinner },
    template: `<GSpinner/>`,
  }), {
    notes: 'A very simple example of addon notes',
  })
  .lokiSkip('Small', () => ({
    components: { GSpinner },
    template: `<GSpinner variant="small" />`,
  }), {
    notes: 'A very simple example of addon notes',
  })
  .lokiSkip('Extra Small', () => ({
    components: { GSpinner },
    template: `<GSpinner variant="extra-small" />`,
  }), {
    notes: 'A very simple example of addon notes',
  });
