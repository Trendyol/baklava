import { storiesOf } from '@storybook/vue';
import GButton from './GButton.vue';

storiesOf('GButton', module)
  .addParameters({ component: GButton })
  .add('Base', () => ({
    components: { GButton },
    template: `
      <div class="g-p-10">
        <GButton size="big">Base Button</GButton>
        <GButton size="medium">Base Button</GButton>
        <GButton size="small">Base Button</GButton>
        <GButton outline>Base Button</GButton>
      </div>
    `,
  }))
  .add('secondary', () => ({
    components: { GButton },
    template: `
      <div class="g-p-10">
        <GButton variant="secondary">Base Button</GButton>
        <GButton variant="secondary" outline>Base Button</GButton>
      </div>
    `,
  }))
  .add('tertiary', () => ({
    components: { GButton },
    template: `
      <div class="g-p-10">
        <GButton variant="tertiary">Base Button</GButton>
        <GButton variant="tertiary" outline>Base Button</GButton>
      </div>
    `,
  }))
  .add('light', () => ({
    components: { GButton },
    template: `
      <div class="g-p-10">
        <GButton variant="light">Base Button</GButton>
      </div>
    `,
  }))
  .add('passive', () => ({
    components: { GButton },
    template: `
      <div class="g-p-10">
        <GButton variant="passive">Base Button</GButton>
      </div>
    `,
  }))
  .add('success', () => ({
    components: { GButton },
    template: `
      <div class="g-p-10">
      <GButton variant="success">Base Button</GButton>
      <GButton variant="success" outline>Base Button</GButton>
      </div>
    `,
  }))
  .add('warning', () => ({
    components: { GButton },
    template: `
      <div class="g-p-10">
      <GButton variant="warning">Base Button</GButton>
      <GButton variant="warning" outline>Base Button</GButton>
      </div>
    `,
  }))
  .add('danger', () => ({
    components: { GButton },
    template: `
      <div class="g-p-10">
      <GButton variant="danger">Base Button</GButton>
      <GButton variant="danger" outline>Base Button</GButton>
      </div>
    `,
  }))
  .add('info', () => ({
    components: { GButton },
    template: `
      <div class="g-p-10">
      <GButton variant="info">Base Button</GButton>
      <GButton variant="info" outline>Base Button</GButton>
      </div>
    `,
  }))
  .add('rightIcon', () => ({
    components: { GButton },
    template: '<GButton variant="primary" rightIcon="info">Base Button</GButton>',
  }))
  .add('leftIcon', () => ({
    components: { GButton },
    template: `
      <div>
        <GButton size="big" leftIcon="info">Left Icon</GButton>
        <GButton size="medium" leftIcon="info">Left Icon</GButton>
        <GButton size="small" leftIcon="info">Left Icon</GButton>
      </div>
    `,
  }))
  .add('with Icon', () => ({
    components: { GButton },
    template: `
      <div>
        <GButton size="big" icon="info"></GButton>
        <GButton size="medium" icon="info"></GButton>
        <GButton size="small" icon="info"></GButton>
      </div>
    `,
  }))
  .add('disabled', () => ({
    components: { GButton },
    template: `
      <GButton disabled>Disabled Button</GButton>
    `,
  }))
  .add('fluid', () => ({
    components: { GButton },
    template: `
      <GButton variant="primary" fluid leftIcon="info">Deneme</GButton>
    `,
  }))
  .add('gradient', () => ({
    components: { GButton },
    template: `
      <GButton variant="gradient-purple" leftIcon="play-circle">TUTORIAL TYPE</GButton>
    `,
  })).add('link', () => ({
    components: { GButton },
    template: `
    <GButton variant="link">Link</GButton>
  `,
  }));
