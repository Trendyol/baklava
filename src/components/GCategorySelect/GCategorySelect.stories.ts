import { storiesOf } from '@storybook/vue';
import GCategorySelect from './GCategorySelect.vue';
var data = require('./data.json');

storiesOf('GCategorySelect', module)
  .add('default', () => ({
    components: { GCategorySelect },
    data () {
      return {
        options: data.Categories,
        value: [],
      };
    },
    template: `
      <GCategorySelect
      class="g-mt-30"
      label="Kategori Seçimi"
      :options="options" v-model="value" />
    `,
  }))
  .add('multiple', () => ({
    components: { GCategorySelect },
    data () {
      return {
        options: data.Categories,
        value: [],
      };
    },
    template: `
      <GCategorySelect :options="options"
        :multiple="true"
        format="{ ...item}"
        v-model="value">
        <template slot="footer">footer</template>
        </GCategorySelect>
    `,
  }))
  .add('multiple SingleSelect', () => ({
    components: { GCategorySelect },
    data () {
      return {
        options: data.Categories,
        value: [],
      };
    },
    template: `
      <GCategorySelect :options="options"
        :multiple="true"
        :singleSelect="true"
        format="{ ...item}"
        v-model="value" />
    `,
  }));
