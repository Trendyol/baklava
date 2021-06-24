import { storiesOf } from '@storybook/vue';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GBreadcrumb from './';

storiesOf('GBreadcrumb', module)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components: { GBreadcrumb },
    props: {
      divider: {
        default: text('Divider', '>'),
      },
    },
    template: `
      <div style="padding: 30px;">
        <GBreadcrumb :items="items" @click="onClick" :divider="divider">
        </GBreadcrumb>
      </div>`,
    computed: {
      items () {
        return [
          { text: 'Breadcrumb 1', href: '/a/b/c' },
          { text: 'Breadcrumb 2', href: '/a/b/c', disabled: true },
          { text: 'Breadcrumb 3', href: '/a/b/c' },
        ];
      },
    },
    methods: {
      onClick (item) {
        action('Click a link from breadcrumb')(item);
      },
    },
  }));
