import { storiesOf } from '@storybook/vue';
import GModal from '../GModal';
import GButton from '../GButton';
import GBox from '../GBox';
import GText from '../GText';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

const stories = storiesOf('GModal', module);
stories.addDecorator(withKnobs);

stories
  .addParameters({ component: GModal })
  .add('Default', () => ({
    props: {
      closeClickOutside: {
        default: boolean('Close click outside', true),
      },
    },
    components: { GBox, GModal, GButton, GText },
    template: `
      <GBox style="height: 1000px">
        <GButton @click="showModal = true">Open Modal</GButton>
        <GModal :title="'Custom Title Here'" v-model="showModal" :closeClickOutside="closeClickOutside">
          <template #body>
            <GText variant="body">Cras mattis consectetur purus sit amet fermentum.</GText>
          </template>
          <template #footer>
            <GButton variant="danger" @click="showModal = false">Close</GButton>
          </template>
        </GModal>
      </GBox>
    `,
    data () {
      return {
        showModal: true,
      };
    },
  })).add('With Size', () => ({
    components: { GBox, GModal, GButton, GText },
    template: `
    <GBox>
    <GButton @click="showModal = true">Open Modal</GButton>
    <GModal large :title="'Custom Title Here'" v-model="showModal">
      <template #body>
        <GText variant="body">Cras mattis consectetur purus sit amet fermentum.</GText>
      </template>
      <template #footer>
        <GButton variant="danger" @click="showModal = false">Close</GButton>
      </template>
    </GModal>
    </GBox>
  `,
    data () {
      return {
        showModal: false,
      };
    },
  })).add('With Scrollable', () => ({
    components: { GBox, GModal, GButton, GText },
    template: `
    <GBox>
    <GButton @click="showModal = true">Open Modal</GButton>
    <GModal scrollable :title="'Custom Title Here'" v-model="showModal">
      <template #body>
        <GText variant="body">Cras mattis consectetur purus sit amet fermentum.</GText>
        <GText v-for="(_, index) in Array(15)" :key="index" class="g-mt-32" variant="body">Cras mattis consectetur purus sit amet fermentum.</GText>
      </template>
      <template #footer>
        <GButton variant="danger" @click="showModal = false">Close</GButton>
      </template>
    </GModal>
    </GBox>
  `,
    data () {
      return {
        showModal: false,
      };
    },
  }));
