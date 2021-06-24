import { storiesOf } from '@storybook/vue';
import GHeader from './';
import GButton from '../GButton';
import GText from '../GText';
import GIcon from '../GIcon';
import GBreadcrumb from '../GBreadcrumb';
import { action } from '@storybook/addon-actions';

storiesOf('GHeader', module)
  .addParameters({ component: GHeader })
  .add('base', () => ({
    components: { GHeader },
    template: '<GHeader title="Kampanyalarım"></GHeader>',
  }))
  .add('with right button', () => ({
    components: { GHeader, GButton },
    template: `
      <GHeader title="Kampanyalarım">
        <template #right-area>
          <GButton variant="gradient-purple" leftIcon="play-circle">
            RIGHT BUTTON
          </GButton>
        </template>
      </GHeader>
    `,
  }))
  .add('with left button', () => ({
    components: { GHeader, GButton },
    template: `
      <GHeader title="Kampanyalarım">
        <template #left-area>
          <GButton variant="gradient-purple" leftIcon="play-circle">
            LEFT BUTTON
          </GButton>
        </template>
      </GHeader>
    `,
  }))
  .add('with title before slot', () => ({
    components: { GHeader, GIcon },
    template: `
      <GHeader title="Kampanyalarım">
        <template #title-before>
          <GIcon name="arrow-left" size="32px"/>
        </template>
      </GHeader>
    `,
  }))
  .add('with both side buttons', () => ({
    components: { GHeader, GButton },
    template: `
      <GHeader title="Kampanyalarım">
        <template #left-area>
          <GButton variant="gradient-purple" leftIcon="play-circle">
            LEFT BUTTON
          </GButton>
        </template>
        <template #right-area>
          <GButton variant="gradient-purple" leftIcon="play-circle">
            RIGHT BUTTON
          </GButton>
        </template>
      </GHeader>
    `,
  }))
  .add('with breadcrumb and no buttons', () => ({
    components: { GHeader, GButton, GText, GBreadcrumb },
    template: `
      <GHeader title="Kampanyalarım">
        <template #breadcrumb>
          <GBreadcrumb :items="items" @click="onClick"></GBreadcrumb>
        </template>
      </GHeader>
    `,
    computed: {
      items () {
        return [
          { text: 'Anasayfa', href: '/' },
          { text: 'Page', href: '/a' },
        ];
      },
    },
    methods: {
      onClick (item) {
        action('Click a link from breadcrumb')(item);
      },
    },
  }))
  .add('with breadcrumb and right button', () => ({
    components: { GHeader, GButton, GText, GBreadcrumb },
    template: `
      <GHeader title="Kampanyalarım">
        <template #breadcrumb>
          <GBreadcrumb :items="items" @click="onClick"></GBreadcrumb>
        </template>
        <template #right-area>
          <GButton variant="gradient-purple" leftIcon="play-circle">
            RIGHT BUTTON
          </GButton>
        </template>
      </GHeader>
    `,
    computed: {
      items () {
        return [
          { text: 'Anasayfa', href: '/' },
          { text: 'Page', href: '/a' },
        ];
      },
    },
    methods: {
      onClick (item) {
        action('Click a link from breadcrumb')(item);
      },
    },
  }));
