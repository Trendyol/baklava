import { assert, fixture, html } from '@open-wc/testing';
import GrIcon from './gr-icon';

describe('gr-icon', () => {
  it('is defined', () => {
    const el = document.createElement('gr-icon');
    assert.instanceOf(el, GrIcon);
  });

  it('renders with default values', async () => {
    const el = await fixture(html`<gr-icon></gr-icon>`);
    assert.shadowDom.equal(
      el,
      `<div
        aria-hidden="true"
        aria-label=""
      >
      </div>
      `
    );
  });
});
