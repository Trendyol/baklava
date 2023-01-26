import { setCustomElementsManifest } from '@storybook/web-components';
import { makeDecorator } from "@storybook/addons";
import { html } from 'lit';
import isChromatic from 'chromatic/isChromatic';

import customElements from '../dist/custom-elements.json';

setCustomElementsManifest(customElements);

const withNoAnimationOnChromaticLayout = makeDecorator({
  name: 'withNoAnimationOnChromaticLayout',
  parameterName: 'noAnimationOnChromaticLayout',
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context) => {
    const story = getStory(context);
    const decoratedStory = html`
      ${isChromatic() ?  html`<style>
        .custom-wrapper {
          --bl-drawer-animation-duration: 0;
        }
      </style>` : html``}

      <div class="custom-wrapper">
        ${ story }
      </div>
    `;

    // return the modified story
    return decoratedStory;
  }
});


const extraPaddingForChromatic = makeDecorator({
  name: 'extraPaddingForChromatic',
  parameterName: 'extraPaddingForChromatic',
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context) => {
    const story = getStory(context);
    const decoratedStory = html`
      ${isChromatic() ?  html`<style>
        .chromatic-wrapper {
          padding: 25px;
        }
      </style>` : html``}

      <div class="chromatic-wrapper">
        ${ story }
      </div>
    `;

    // return the modified story
    return decoratedStory;
  }
});

export const decorators = [
  withNoAnimationOnChromaticLayout,
  extraPaddingForChromatic
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewMode: 'docs',
  docs: {
    transformSource: source =>
      source
        .replace(/<!--\?lit\$[0-9]+\$-->|<!--\??-->/g, '')
        // Clean empty boolean attribute values
        .replace(/=\"\"/g, ''),
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Documentation', ['Welcome', '*'], 'Frameworks', 'Components', 'Design System'],
      locales: 'en-US',
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
