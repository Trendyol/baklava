import { storiesOf } from '@storybook/vue';
import { withKnobs, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GMiniPagination from './GMiniPagination.vue';

const stories = storiesOf('GMiniPagination', module);
stories.addDecorator(withKnobs);

stories
  .addParameters({ component: GMiniPagination })
  .add('base', () => ({
    components: { GMiniPagination },
    props: {
      totalPages: {
        default: number('Total Pages', 3),
      },
    },
    template: `
      <div style="padding: 2rem;">
        <GMiniPagination :totalPages="totalPages" @page="onPage" v-model="currentPage"/>
        <span>Current Page: {{currentPage}}</span>
      </div>
    `,
    data () {
      return {
        currentPage: 1,
      };
    },
    methods: {
      onPage (data) {
        action('Page')(data);
      },
    },
  }));
