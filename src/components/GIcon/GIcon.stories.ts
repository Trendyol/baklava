import { storiesOf } from '@storybook/vue';
import GIcon from './GIcon.vue';

storiesOf('GIcon', module)
  .addParameters({ component: GIcon })
  .add('Example', () => ({
    components: { GIcon },
    template: `<div> <GIcon name="alert-circle" strokeWidth='2px' /> <GIcon stroke="black" size="44px" fill="var(--orange-100)" name="star" /> </div>`,
  }))