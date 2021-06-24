import { storiesOf } from '@storybook/vue';
import GDataTable from './GDataTable.vue';
import GBox from '../GBox/GBox.vue';
import GIcon from '../GIcon/GIcon.vue';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('GDataTable', module);
stories.addDecorator(withKnobs);
stories
  .addParameters({ component: GDataTable })
  .add('Default', () => ({
    props: {
      beforeEachRow: {
        default: boolean('Enable Before Each Row', false),
      },
      afterEachRow: {
        default: boolean('Enable After Each Row', false),
      },
      enableBeforeTableSlot: {
        default: boolean('Enable Before Table Slot', false),
      },
      beforeNthRow: {
        default: number('Enable Before nth Row', -1),
      },
      afterNthRow: {
        default: number('Enable After nth Row', -1),
      },
      showBeforeHeader: {
        default: boolean('Enable Before Header', false),
      },
      selectable: {
        default: boolean('Enable Select', true),
      },
      isLoading: {
        default: boolean('Enable Loading', false),
      },
      reverse: {
        default: boolean('Reverse Pagination', false),
      },
      stickFirstColumn: {
        default: boolean('Sticky First Column', false),
      },
    },
    data () {
      return {
        items: [
          {
            success: true,
            name: null,
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: 1,
            glutenfree: true,
          },
          {
            error: true,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: 1,
            glutenfree: false,
            selected: true,
          },
          {
            disabled: true,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: 7,
            glutenfree: false,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: 0,
            glutenfree: true,
          },
          {
            rowSpan: [
              {
                calories: 392,
                fat: 0.2,
                carbs: 98,
                iron: 2,
                glutenfree: true,
              },
              {
                calories: 392,
                fat: 0.2,
                carbs: 98,
                iron: 2,
                glutenfree: true,
              },
              {
                calories: 392,
                fat: 0.2,
                carbs: 98,
                iron: 2,
                glutenfree: true,
              },
            ],
            name: 'Row Span',
            protein: 'Protein',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: 2,
            glutenfree: true,
            selected: true,
            customFirstColumn: true,
          },
        ],
        paginationConfig: {
          pagination: {
            size: 20,
            page: 0,
            totalElements: 1000,
            totalPages: 10,
          },
          pageSizeText: 'Adet',
          pageSizeVisible: true,
          pageLimits: undefined,
          reverse: false,
        },
        sortConfig: {
          name: 'fat',
          type: 'asc',
        },
      };
    },
    components: { GDataTable, GBox, GIcon },
    computed: {
      beforeNthRowSlotName () {
        return `before_row_${this.beforeNthRow}`;
      },
      afterNthRowSlotName () {
        return `after_row_${this.afterNthRow}`;
      },
      tableWidth () {
        return this.stickFirstColumn ? '700px' : '';
      },
      headers () {
        return [
          { text: 'Dessert', key: 'name', width: '200px', fixed: this.stickFirstColumn },
          { text: 'Calories', key: 'calories', minWidth: '125px', align: 'right', customHeader: true },
          { text: 'Fat', key: 'fat', sortable: true },
          { text: 'Carbs (g)', key: 'carbs' },
          { text: 'Protein (g)', key: 'protein', sortable: true },
          { text: 'Iron (%)', key: 'iron', formatter: (value: any) => `<span style="font-weight: 700">${value}%</span>` },
          { text: 'Gluten-Free', key: 'glutenfree', bgColor: 'purple-800', align: 'center' },
        ];
      },
    },
    methods: {
      onItemSelect (items, meta) {
        action('Selected Items')(items);
        action('Meta For Selected Items')(meta);
      },
      onPage (page) {
        action('Page')(page);
      },
      onSize (size) {
        action('Size')(size);
      },
      onPaginationChange (paginationConfig) {
        const self: any = this;
        self.paginationConfig = paginationConfig;
        action('Pagination Config')(paginationConfig);
      },
      onSort (sortConfig) {
        const self: any = this;
        self.sortConfig = sortConfig;
        action('Sort Config')(sortConfig);
      },
    },
    watch: {
      reverse () {
        const self: any = this;
        self.paginationConfig.reverse = this.reverse;
      },
    },
    template: `
      <div style='padding:30px; display: flex; justify-content: space-between; flex-direction: column; height: 400px;'
           :style="{width: this.tableWidth}">
      <GDataTable
        :headers="headers"
        :items="items"
        :selectable="selectable"
        :is-loading="isLoading"
        :pagination-config="paginationConfig"
        :sort-config="sortConfig"
        @select="onItemSelect"
        @page="onPage"
        @size="onSize"
        @sort="onSort"
        @paginationChange="onPaginationChange"
      >
        <template v-slot:custom_first_column="row" >
          <GBox
            flex
            align="center"
            justify="center"
          >
            <GIcon name="alert-circle"/>
          </GBox>
        </template>
        <template v-slot:before_table v-if="enableBeforeTableSlot">
          <div style="border: 1px solid black; padding: 10px;">Before Table Slot</div>
        </template>
        <template v-slot:header_fat="{ header }">
          {{ header.text }}
        </template>
        <template v-slot:calories="{ row }">
          <span>{{ row.calories > 350 ? 'You are fat' : 'You are fit' }}</span>
        </template>
        <template v-slot:after_row="{ row }" v-if="afterEachRow">
          <tr>
            <td colspan="7" style="padding: 10px"> After Each Row:{{ row.name }}</td>
          </tr>
        </template>
        <template v-slot:before_row="{ row }" v-if="beforeEachRow">
          <tr>
            <td colspan="7" style="padding: 10px"> Before Each Row:{{ row.name }}</td>
          </tr>
        </template>
        <template v-slot:[beforeNthRowSlotName]="{ row }" v-if="beforeNthRow > -1">
          <tr>
            <td colspan="7" style="padding: 10px"> Before Nth Row:{{ row.name }}</td>
          </tr>
        </template>
        <template v-slot:[afterNthRowSlotName]="props" v-if="afterNthRow > -1">
          <tr>
            <td colspan="7" style="padding: 10px"> After Nth Row:{{ props }}</td>
          </tr>
        </template>
        <template v-slot:before_header="{ headers }" v-if="showBeforeHeader">
          <tr>
            <td style="padding: 20px; background-color: var(--green-600)">Name</td>
            <td colspan="6"
                style="padding: 20px; border-left: 1px solid #dee2e6; text-align: center; background-color: var(--blue-900)">
              Others
            </td>
          </tr>
        </template>
      </GDataTable>
      </div>
      <script>
      import GBox from "./GBox";
      export default {
        components: {GBox}
      }
      </script>`,
  }))
  .add('notFound', () => ({
    props: {
      beforeEachRow: {
        default: boolean('Enable Before Each Row', false),
      },
      afterEachRow: {
        default: boolean('Enable After Each Row', false),
      },
      enableBeforeTableSlot: {
        default: boolean('Enable Before Table Slot', false),
      },
      beforeNthRow: {
        default: number('Enable Before nth Row', -1),
      },
      afterNthRow: {
        default: number('Enable After nth Row', -1),
      },
      showBeforeHeader: {
        default: boolean('Enable Before Header', false),
      },
      selectable: {
        default: boolean('Enable Select', true),
      },
      isLoading: {
        default: boolean('Enable Loading', false),
      },
      reverse: {
        default: boolean('Reverse Pagination', false),
      },
      stickFirstColumn: {
        default: boolean('Sticky First Column', false),
      },
    },
    data () {
      return {
        items: [],
        paginationConfig: {
          pagination: {
            size: 20,
            page: 0,
            totalElements: 1000,
            totalPages: 10,
          },
          pageSizeText: 'Adet',
          pageSizeVisible: true,
          pageLimits: undefined,
          reverse: false,
        },
        sortConfig: {
          name: 'fat',
          type: 'asc',
        },
        isLoading: false,
      };
    },
    components: { GDataTable },
    computed: {
      beforeNthRowSlotName () {
        return `before_row_${this.beforeNthRow}`;
      },
      afterNthRowSlotName () {
        return `after_row_${this.afterNthRow}`;
      },
      tableWidth () {
        return this.stickFirstColumn ? '700px' : '';
      },
      headers () {
        return [
          { text: 'Dessert', key: 'name', width: '200px', fixed: this.stickFirstColumn },
          { text: 'Calories', key: 'calories', minWidth: '125px', align: 'right' },
          { text: 'Fat', key: 'fat', sortable: true },
          { text: 'Carbs (g)', key: 'carbs' },
          { text: 'Protein (g)', key: 'protein', sortable: true },
          { text: 'Iron (%)', key: 'iron', formatter: (value: any) => `<span style="font-weight: 700">${value}%</span>` },
          { text: 'Gluten-Free', key: 'glutenfree', bgColor: 'purple-800', align: 'center' },
        ];
      },
    },
    methods: {
      onItemSelect (items, meta) {
        action('Selected Items')(items);
        action('Meta For Selected Items')(meta);
      },
      onPage (page) {
        action('Page')(page);
      },
      onSize (size) {
        action('Size')(size);
      },
      onPaginationChange (paginationConfig) {
        const self: any = this;
        self.paginationConfig = paginationConfig;
        action('Pagination Config')(paginationConfig);
      },
      onSort (sortConfig) {
        const self: any = this;
        self.sortConfig = sortConfig;
        action('Sort Config')(sortConfig);
      },
    },
    watch: {
      reverse () {
        const self: any = this;
        self.paginationConfig.reverse = this.reverse;
      },
    },
    template: `
      <div style='padding:30px; display: flex; justify-content: space-between; flex-direction: column; height: 400px;'
      :style="{width: this.tableWidth}">
        <GDataTable
          :headers="headers"
          :items="items"
          :selectable="selectable"
          :is-loading="isLoading"
          :pagination-config="paginationConfig"
          :sort-config="sortConfig"
          @select="onItemSelect"
          @page="onPage"
          @size="onSize"
          @sort="onSort"
          @paginationChange="onPaginationChange"
        >
          <template v-slot:before_table v-if="enableBeforeTableSlot">
            <div style="border: 1px solid black; padding: 10px;">Before Table Slot</div>
          </template>
          <template v-slot:header_fat="{ header }">
            {{header.text}}
          </template>
          <template v-slot:calories="{ row }">
            <span>{{ row.calories > 350 ? 'You are fat' : 'You are fit' }}</span>
          </template>
          <template v-slot:after_row="{ row }" v-if="afterEachRow">
            <tr>
              <td colspan="7" style="padding: 10px"> After Each Row:{{ row.name }}</td>
            </tr>
          </template>
          <template v-slot:before_row="{ row }" v-if="beforeEachRow">
            <tr>
              <td colspan="7" style="padding: 10px"> Before Each Row:{{ row.name }}</td>
            </tr>
          </template>
          <template v-slot:[beforeNthRowSlotName]="{ row }" v-if="beforeNthRow > -1">
            <tr>
              <td colspan="7" style="padding: 10px"> Before Nth Row:{{ row.name }}</td>
            </tr>
          </template>
          <template v-slot:[afterNthRowSlotName]="props" v-if="afterNthRow > -1">
            <tr>
              <td colspan="7" style="padding: 10px"> After Nth Row:{{props}}</td>
            </tr>
          </template>
          <template v-slot:before_header="{ headers }" v-if="showBeforeHeader">
            <tr>
              <td style="padding: 20px; background-color: var(--green-600)">Name</td>
              <td colspan="6" style="padding: 20px; border-left: 1px solid #dee2e6; text-align: center; background-color: var(--blue-900)">Others</td>
            </tr>
          </template>
        </GDataTable>
      </div>`,
  }));
