import { assert, fixture, html } from '@open-wc/testing';
import GrButton from './gr-button';

describe('gr-button', () => {
  it('is defined', () => {
    const el = document.createElement('gr-button');
    assert.instanceOf(el, GrButton);
  });

  it('renders with default values', async () => {
    const el = await fixture(html`<gr-button></gr-button>`);
    assert.shadowDom.equal(
      el,
      `
      <button aria-disabled="false" type="button" class="button">
        <slot></slot>
      </button>
    `
    );
  });
  // querySelector testing
  describe('attributes', () => {
    it('is bound to `disabled` attribute', async () => {
      const el = await fixture(html`<gr-button disabled></gr-button>`);
      assert.shadowDom.equal(
        el,
        `
        <button aria-disabled="true" type="button" class="button">
          <slot></slot>
        </button>
      `
      );
    });
  });
});
