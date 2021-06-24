import { storiesOf } from '@storybook/vue';
import GAlert from './GAlert.vue';
import GText from '../GText/GText.vue';
import GBox from '../GBox/GBox.vue';
import GIcon from '../GIcon/GIcon.vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

const stories = storiesOf('GAlert', module);
stories.addDecorator(withKnobs);
stories
  .addParameters({ component: GAlert })
  .add('Default', () => ({
    props: {
      text: {
        default: text('Text', '2'),
      },
      border: {
        default: boolean('Border', false),
      },
    },
    components: { GAlert, GIcon, GText, GBox },
    template: `
      <div style='padding:30px; display: flex; justify-content: space-between; flex-direction: column; height: 400px'>
        <GAlert variant="error" :border="border">
          Error
        </GAlert>
        <GAlert variant="warning" :border="border">
          Warning
        </GAlert>
        <GAlert variant="success" :border="border">
          Success
        </GAlert>
        <GAlert variant="info" :border="border">
          Info
        </GAlert>
        <GAlert variant="info" icon-size="24px">
          <GBox> Line 1 </GBox>
          <GBox> Line 2 </GBox>
          <GBox> Line 3 </GBox>
        </GAlert>
        <GAlert variant="info" :show-icon="false">
          <GBox> Without Icon </GBox>
        </GAlert>
      </div>`,
  }));
