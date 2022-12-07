import BlDropdown from './bl-dropdown';
import { assert, fixture, html, oneEvent, expect } from '@open-wc/testing';

import type typeOfBlDropdown from './bl-dropdown';
import BlButton from '../button/bl-button';

describe('bl-dropdown', () => {
  it('is defined', () => {
    const el = document.createElement('bl-dropdown');
    assert.instanceOf(el, BlDropdown);
  });

  it('should render with the default values', async () => {
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown></bl-dropdown>`);
    assert.shadowDom.equal(
      el,
      `
      <bl-button
        dropdown=""
        kind="default"
        size="medium"
        variant="primary"
      >
        Dropdown Button
      </bl-button>
      <div class="popover"><slot></slot></div>
    `
    );
  });

  it('should open dropdown', async () => {
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown></bl-dropdown>`);

    const buttonHost = <BlButton>el.shadowRoot?.querySelector('bl-button');
    const button = buttonHost.shadowRoot?.querySelector('.button') as HTMLElement | null;

    button?.click();

    expect(el.opened).to.true;
  });

  it('should close dropdown', async () => {
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown></bl-dropdown>`);

    const buttonHost = <BlButton>el.shadowRoot?.querySelector('bl-button');
    const button = buttonHost.shadowRoot?.querySelector('.button') as HTMLElement | null;

    button?.click();
    expect(el.opened).to.true;

    button?.click();
    expect(el.opened).to.false;
  });

  it('should close dropdown when click outside', async () => {
    const el = await fixture<typeOfBlDropdown>(html`<body>
      <bl-dropdown></bl-dropdown>
    </body>`);

    const buttonHost = <BlButton>el.shadowRoot?.querySelector('bl-button');
    const button = buttonHost.shadowRoot?.querySelector('.button') as HTMLElement | null;

    button?.click();
    expect(el.opened).to.true;

    const body = <HTMLBodyElement>el.closest('body');
    body.click();

    setTimeout(() => {
      expect(el.opened).to.false;
    });
  });

  it('should fire event when dropdown opened', async () => {
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown></bl-dropdown>`);

    const buttonHost = <BlButton>el.shadowRoot?.querySelector('bl-button');
    const button = buttonHost.shadowRoot?.querySelector('.button') as HTMLElement | null;

    setTimeout(() => button?.click());
    const event = await oneEvent(el, 'bl-dropdown-open');

    expect(el).to.exist;
    expect(event).to.exist;
    expect(event.detail).to.be.equal('Dropdown opened!');

    expect(el.opened).to.true;
  });

  it('should fire event when dropdown closed', async () => {
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown></bl-dropdown>`);

    const buttonHost = <BlButton>el.shadowRoot?.querySelector('bl-button');
    const button = buttonHost.shadowRoot?.querySelector('.button') as HTMLElement | null;

    button?.click();

    setTimeout(() => button?.click());
    const event = await oneEvent(el, 'bl-dropdown-close');

    expect(el).to.exist;
    expect(event).to.exist;
    expect(event.detail).to.be.equal('Dropdown closed!');
  });
});
