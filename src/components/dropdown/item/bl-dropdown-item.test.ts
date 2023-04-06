import BlDropdownItem from './bl-dropdown-item';
import { assert, fixture, html, oneEvent, expect } from '@open-wc/testing';

import type typeOfBlDropdownItem from './bl-dropdown-item';

describe('bl-dropdown-item', () => {
  it('is defined', () => {
    const el = document.createElement('bl-dropdown-item');
    assert.instanceOf(el, BlDropdownItem);
  });

  it('should render with the default values', async () => {
    const el = await fixture<typeOfBlDropdownItem>(html`<bl-dropdown-item></bl-dropdown-item>`);
    assert.shadowDom.equal(
      el,
      `
        <bl-button
          kind="neutral"
          size="medium"
          variant="tertiary"
          role="menuitem"
        >
          <slot>
          </slot>
        </bl-button>
    `
    );
  });
  it('should render with icon', async () => {
    const el = await fixture<typeOfBlDropdownItem>(
      html`<bl-dropdown-item icon="info"></bl-dropdown-item>`
    );
    assert.shadowDom.equal(
      el,
      `
        <bl-button
          icon="info"
          kind="neutral"
          size="medium"
          role="menuitem"
          variant="tertiary"
        >
          <slot>
          </slot>
        </bl-button>
    `
    );
  });
  it('should fire event when click dropdown-item', async () => {
    const el = await fixture<BlDropdownItem>(
      html`<bl-dropdown-item>dropdown-item</bl-dropdown-item>`
    );
    const button = el.shadowRoot?.querySelector('bl-button');

    setTimeout(() => button?.click());
    const event = await oneEvent(el, 'bl-dropdown-item-click');

    expect(el).to.exist;
    expect(event).to.exist;
    expect(event.detail).to.be.equal('Action clicked!');
  });
});
