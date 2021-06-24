import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { GCard, GCardPage } from './';
import GText from '../GText/';
import GBox from '../GBox/GBox.vue';

const stories = storiesOf('GCard', module);
stories.addDecorator(withKnobs);

stories
  .addParameters({ component: GCard })
  .add('base', () => ({
    components: { GCard, GBox },
    props: {
      title: {
        default: text('Title', 'Title'),
      },
    },
    template: `
      <div style="background-color: #f1f2f7; height: 50vh; padding: 50px">
        <GCard :title="title">
          <GBox>Content</GBox>
        </GCard>
      </div>
    `,
    methods: {
      onPage (data) {
        action('Page')(data);
      },
    },
  })).add('pageable', () => ({
    components: { GCard, GCardPage, GText },
    props: {
      pageable: {
        default: boolean('Pageable', true),
      },
    },
    template: `
      <div style="background-color: #f1f2f7; height: 50vh; padding: 50px">
        <GCard :pageable="pageable" @page="onPage">
          <template #header-left>
            <GText variant="headline-03">Slot Left Template</GText>
          </template>
          <GCardPage :page="1">
            <span>Page Content 1</span>
          </GCardPage>
          <GCardPage :page="2">
            <span>Page Content 2</span>
          </GCardPage>
          <GCardPage :page="3">
            <span>Page Content 3</span>
          </GCardPage>
          <GCardPage :page="4">
            <span>Page Content 4</span>
          </GCardPage>
          <template #header-right>
            <GText variant="headline-03">Slot Right Template</GText>
          </template>
        </GCard>
      </div>
    `,
    methods: {
      onPage (data) {
        action('Page')(data);
      },
    },
  })).add('error', () => ({
    components: { GCard, GText },
    props: {
      showMessage: {
        default: boolean('Show Message', true),
      },
      title: {
        default: text('Title', 'Title'),
      },
      message: {
        default: text('Message', 'An Error Occurred'),
      },
    },
    template: `
    <div style="background-color: #f1f2f7; height: 50vh; padding: 50px">
      <GCard :showMessage="showMessage" :title="title" :message="message">
        <span>Page content</span>
      </GCard>
    </div>
  `,
    methods: {
      onPage (data) {
        action('Page')(data);
      },
    },
  })).add('error message with slot', () => ({
    components: { GCard, GText },
    props: {
      showMessage: {
        default: boolean('Show Message', true),
      },
      title: {
        default: text('Title', 'Title'),
      },
    },
    template: `
    <div style="background-color: #f1f2f7; height: 50vh; padding: 50px">
      <GCard :showMessage="showMessage" :title="title" iconSize="50px">
        <template #message>
          Slot Error
        </template>
      </GCard>
    </div>
  `,
    methods: {
      onPage (data) {
        action('Page')(data);
      },
    },
  }));
