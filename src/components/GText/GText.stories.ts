import { storiesOf } from '@storybook/vue';
import GText from './GText.vue';

storiesOf('GText', module)
  .addParameters({ component: GText })
  .add('Headline-01', () => ({
    components: { GText },
    template: `
      <GText variant="headline-01" color="orange-500"> Rubik Bold, 64px</GText>`,
  }))
  .add('Headline-02', () => ({
    components: { GText },
    template: `
      <GText variant="headline-02"> Rubik Light, 48px</GText>`,
  }))
  .add('Headline-03', () => ({
    components: { GText },
    template: `
      <GText variant="headline-03"> Rubik Light, 30px</GText>`,
  }))
  .add('Headline-04', () => ({
    components: { GText },
    template: `
      <GText variant="headline-04"> Rubik Medium, 24px</GText>`,
  }))
  .add('subtitle-01', () => ({
    components: { GText },
    template: `
      <GText variant="subtitle-01"> Rubik Medium, 20px</GText>`,
  }))
  .add('subtitle-02', () => ({
    components: { GText },
    template: `
      <GText variant="subtitle-02"> Rubik Medium, 16px</GText>`,
  }))
  .add('subtitle-03', () => ({
    components: { GText },
    template: `
      <GText variant="subtitle-03"> Rubik Medium, 14px</GText>`,
  }))
  .add('body', () => ({
    components: { GText },
    template: `
      <GText variant="body"> Rubik Regular, 14px</GText>`,
  }))
  .add('caption', () => ({
    components: { GText },
    template: `
      <div>
        <GText variant="caption"> Rubik Regular, 12px</GText>
        <GText variant="caption" inline> Rubik Regular, 12px Inline</GText>
      </div>
    `,
  }))
  .add('menu-item', () => ({
    components: { GText },
    template: `
      <GText variant="menu-item"> Rubik Medium, 12px</GText>`,
  }))
  .add('small', () => ({
    components: { GText },
    template: `
      <GText variant="small"> Rubik Regular, 10px</GText>`,
  }))
  .add('with text align', () => ({
    components: { GText },
    template: `
    <div :style="{ width: '300px' }">
      <GText align="right" variant="body"> Rubik Regular, 14px</GText>
      <GText align="center" variant="body"> Rubik Regular, 14px</GText>
      <GText align="left" variant="body"> Rubik Regular, 14px</GText>
    </div>`,
  }));
