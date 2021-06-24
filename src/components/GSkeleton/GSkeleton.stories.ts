// @ts-nocheck
import { storiesOf } from '@storybook/vue';
import GSkeleton from './GSkeleton.vue';

storiesOf('GSkeleton', module)
  .addParameters({ component: GSkeleton })
  .lokiSkip('custom', () => ({
    components: { GSkeleton },
    template: `<div class="m-20" style="width: 350px">
      <GSkeleton circle width="60px" height="60px" />
      <div class="mt-12">
        <GSkeleton :count="5" />
      </div>
    </div>`,
  }))
  .add('static width/height (image)', () => ({
    components: { GSkeleton },
    template: `<div class="m-20" style="width: 350px">
      <GSkeleton width="180px" height="250px" />
    </div>`,
  }))
