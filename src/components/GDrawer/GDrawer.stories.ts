import { storiesOf } from '@storybook/vue';
import GDrawer from './GDrawer.vue';
import GButton from '../GButton';
import GSpinner from '../GSpinner';

storiesOf('GDrawer', module)
  .addParameters({ component: GDrawer })
  .add('Base', () => ({
    components: { GDrawer, GButton },
    data: () => ({
      show: false,
    }),
    methods: {
      onShow: function () {
        // @ts-ignore
        this.show = true;
      },
      onClose () {
        // @ts-ignore
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
  .add('With Slot', () => ({
    components: { GDrawer, GButton, GSpinner },
    data: () => ({
      show: false,
    }),
    methods: {
      onShow: function () {
        // @ts-ignore
        this.show = true;
      },
      onClose () {
        // @ts-ignore
        this.show = false;
      }
    },
    template: `
      <div class="g-p-10">
      <GDrawer
        title="Help"
        :show="show"
        @close="onClose"
        top=0
      >
        <GSpinner/>
      </GDrawer>
      <GButton @click="onShow" variant="primary">Open Drawer</GButton>
      </div>
    `,
  }))
