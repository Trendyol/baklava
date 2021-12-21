import { storiesOf } from '@storybook/vue';
import GDrawer from './GDrawer.vue';
import GButton from '../GButton';

storiesOf('GDrawer', module)
  .addParameters({ component: GDrawer })
  .add('Base', () => ({
    components: { GDrawer, GButton },
    data: () => ({
      show: false,
    }),
    methods: {
      onShow: function () {
        this.show = true;
      },
      onClose () {
        this.show = false;
      }
    },
    template: `
      <div class="g-p-10">
        <GDrawer
          url="https://m.wikipedia.org"
          title="Help"
          :show="show"
          @close="onClose"
          top=0
        >
        </GDrawer>
        <GButton @click="onShow" variant="primary">Open Drawer</GButton>
      </div>
    `,
  }))
