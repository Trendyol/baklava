import { storiesOf } from '@storybook/vue';
import GBadge from './GBadge.vue';
import GIcon from '../GIcon/GIcon.vue';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

const stories = storiesOf('GBadge', module);
stories.addDecorator(withKnobs);
stories
  .addParameters({ component: GBadge })
  .add('Default', () => ({
    props: {
      border: {
        default: boolean('Border', false),
      },
      inline: {
        default: boolean('Inline', false),
      },
      dot: {
        default: boolean('Dot', false),
      },
      left: {
        default: boolean('Left', false),
      },
      bottom: {
        default: boolean('Bottom', false),
      },
      overlap: {
        default: boolean('Overlap', false),
      },
      backgroundColor: {
        default: text('Background Color', 'orange-100'),
      },
      borderColor: {
        default: text('Border Color', 'mid-grey-100'),
      },
      fontColor: {
        default: text('Font Color', 'white'),
      },
      text: {
        default: text('Text', '2'),
      },
      showBadge: {
        default: boolean('ShowBadge', true),
      },
    },
    components: { GBadge, GIcon },
    template: `
      <div style='padding:30px; display: flex; justify-content: space-between;'>
        <GBadge
          :text="text"
          :border="border"
          :left="left"
          :bottom="bottom"
          :overlap="overlap"
          :dot="dot"
          :inline="inline"
          :background-color="backgroundColor"
          :font-color="fontColor"
          :border-color="borderColor"
          :show-badge="showBadge"
        >
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
        <GBadge text="2" :left="true">
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
        <GBadge text="2" :left="true" :bottom="true">
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
        <GBadge text="2" :bottom="true">
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
        <GBadge text="2" :overlap="true">
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
        <GBadge text="2" :left="true" :overlap="true">
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
        <GBadge text="2" :left="true" :bottom="true" :overlap="true">
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
        <GBadge text="2" :bottom="true" :overlap="true">
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
      </div>`,
  }))
  .add('Dot', () => ({
    components: { GBadge, GIcon },
    template: `
      <div style='padding:30px; display: flex; justify-content: space-between;'>
        <GBadge :dot="true" background-color="orange-100">
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
        <GBadge :dot="true" :left="true" background-color="orange-100">
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
        <GBadge :dot="true" :left="true" :bottom="true" background-color="orange-100">
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
        <GBadge :dot="true" :bottom="true" background-color="orange-100">
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
        <GBadge :dot="true" background-color="orange-100" :overlap="true">
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
        <GBadge :dot="true" :left="true" background-color="orange-100" :overlap="true">
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
        <GBadge :dot="true" :left="true" :bottom="true" background-color="orange-100" :overlap="true">
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
        <GBadge :dot="true" :bottom="true" background-color="orange-100" :overlap="true">
          <template>
            <GIcon name="bell"/>
          </template>
        </GBadge>
      </div>`,
  }));
