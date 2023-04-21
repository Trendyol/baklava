import { html, TemplateResult } from 'lit';
import isChromatic from 'chromatic/isChromatic';
import { PartialStoryFn } from '@storybook/types';

const chromaticDecorator = (story: PartialStoryFn, addition: TemplateResult) => html`
      ${isChromatic() ?  addition : html``}

      <div class="custom-wrapper">
        ${ story() }
      </div>
    `;

export const withNoAnimation = (story: PartialStoryFn) => chromaticDecorator(story, html`<style>
.custom-wrapper {
  --bl-drawer-animation-duration: 0;
}
</style>`);


export const extraPadding = (story: PartialStoryFn) => chromaticDecorator(story, html`<style>
.chromatic-wrapper {
  display: inline-block;
  padding: 25px;
}
</style>`);

export const centeredLayout = (story: PartialStoryFn) => chromaticDecorator(story, html`<style>
  .sb-main-fullscreen #root-inner {
    width: 1000px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>`);

export const fullscreenLayout = (story: PartialStoryFn) => chromaticDecorator(story, html`<style>
  .sb-main-fullscreen #root-inner {
    height: 600px;
  }
</style>`);
