import { html, TemplateResult } from "lit";
import { PartialStoryFn } from "@storybook/types";
import isChromatic from "chromatic/isChromatic";

const chromaticDecorator = (story: PartialStoryFn, addition: TemplateResult) =>
  isChromatic()
    ? html`${addition}
        <div class="chromatic-wrapper">${story()}</div>`
    : html`${story()}`;

export const withNoAnimation = (story: PartialStoryFn) =>
  chromaticDecorator(
    story,
    html`<style>
      .chromatic-wrapper {
        --bl-drawer-animation-duration: 0;
      }
    </style>`
  );

export const extraPadding = (story: PartialStoryFn) =>
  chromaticDecorator(
    story,
    html`<style>
      .chromatic-wrapper {
        display: inline-block;
        padding: 25px;
      }
    </style>`
  );

export const centeredLayout = (story: PartialStoryFn) =>
  chromaticDecorator(
    story,
    html`<style>
      #root-inner {
        width: 1000px;
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .chromatic-wrapper {
        display: flex;
      }
    </style>`
  );

export const fullscreenLayout = (story: PartialStoryFn) =>
  chromaticDecorator(
    story,
    html`<style>
      #root-inner {
        height: 600px;
      }
    </style>`
  );
