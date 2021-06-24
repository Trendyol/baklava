import { storiesOf } from '@storybook/vue';
import GBox from './GBox.vue';

storiesOf('GBox', module)
  .addParameters({ component: GBox })
  .add('GBox', () => ({
    components: { GBox },
    template: '<GBox flex :mx="10" :mt="10" :p="10" align="center" justify="end"> <GBox>A</GBox> </GBox>',
  }));
