// @ts-nocheck
import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, array, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GPagination from './';

storiesOf('GPagination', module)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components: { GPagination },
    props: {
      pagination: {
        default: object('pagination', {
          totalPages: 10,
          size: 10,
          page: 0,
        }),
      },
      pageSizeText: {
        default: text('pageSizeText', 'Adet'),
      },
      pageLabelText: {
        default: text('pageLabelText', 'Her Sayfada'),
      },
      pageSizeVisible: {
        default: boolean('pageSizeVisible', true),
      },
      pageLimits: {
        default: object('pageLimits', [
          { value: 10, text: 10 },
          { value: 20, text: 20 },
          { value: 50, text: 50 },
        ]),
      },
      reverse: {
        default: boolean('reverse', false),
      },
    },
    template: `
      <GPagination
        @page="page"
        @changePageSize="changePageSize"
        :pagination="pagination"
        :pageSizeVisible="pageSizeVisible"
        :pageLimits="pageLimits"
        :pageSizeText="pageSizeText"
        :pageLabelText="pageLabelText"
        :reverse="reverse">
      </GPagination>
    `,
    methods: {
      page (p) {
        action('emitted page')(p);
        this.pagination.page = p;
      },
      changePageSize (p) {
        action('emitted changePageSize')(p);
      },
    },
  }));
