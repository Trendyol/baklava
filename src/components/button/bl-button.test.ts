import { assert, fixture, html } from '@open-wc/testing';
import BlButton from './bl-button';

describe('bl-button', () => {
  it('is defined', () => {
    const el = document.createElement('bl-button');
    assert.instanceOf(el, BlButton);
  });

  it('renders with default values', async () => {
    const el = await fixture(html`<bl-button></bl-button>`);
    assert.shadowDom.equal(
      el,
      `
      <button type="button" class="button">
        <slot></slot>
      </button>
    `
    );
  });
});
