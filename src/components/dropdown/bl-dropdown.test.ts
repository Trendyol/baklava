import BlDropdown from './bl-dropdown';
import {
  assert,
  fixture,
  html,
  oneEvent,
  expect,
  elementUpdated,
  waitUntil,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

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
        aria-label="Dropdown Button"
      >
        Dropdown Button
      </bl-button>
      <div class="popover" aria-expanded="false" role="menu"><slot></slot></div>
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

  describe('keyboard navigation', () => {
    it('should focus next action with down arrow key', async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" /><bl-dropdown>
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
            <bl-dropdown-item>Action 3</bl-dropdown-item>
          </bl-dropdown>
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>('#previnput')?.focus();

      await waitUntil(() => el.querySelector('bl-dropdown'), 'Element did not render children');

      const dropdown = el.querySelector('bl-dropdown');

      const tabKey =
        navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('HeadlessChrome')
          ? 'Alt+Tab'
          : 'Tab';

      //given
      await sendKeys({
        press: tabKey,
      });
      await sendKeys({
        press: 'Enter',
      });
      await sendKeys({
        press: 'ArrowDown',
      });

      //then
      expect(document.activeElement).to.equal(dropdown?.options[0]);
    });

    it('should focus previous action with up arrow key', async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" /><bl-dropdown>
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
            <bl-dropdown-item>Action 3</bl-dropdown-item>
          </bl-dropdown>
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>('#previnput')?.focus();

      await waitUntil(() => el.querySelector('bl-dropdown'), 'Element did not render children');

      const dropdown = el.querySelector('bl-dropdown');

      const tabKey =
        navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('HeadlessChrome')
          ? 'Alt+Tab'
          : 'Tab';

      //given
      await sendKeys({
        press: tabKey,
      });

      await sendKeys({
        press: 'Enter',
      });

      await sendKeys({
        press: 'ArrowDown',
      });

      await sendKeys({
        press: 'ArrowDown',
      });

      await sendKeys({
        down: 'ArrowUp',
      });

      //then
      expect(document.activeElement).to.equal(dropdown?.options[0]);
    });

    it('should close dropdown with escape key', async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" /><bl-dropdown>
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
            <bl-dropdown-item>Action 3</bl-dropdown-item>
          </bl-dropdown>
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>('#previnput')?.focus();

      await waitUntil(() => el.querySelector('bl-dropdown'), 'Element did not render children');

      const dropdown = el.querySelector('bl-dropdown');

      const tabKey =
        navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('HeadlessChrome')
          ? 'Alt+Tab'
          : 'Tab';

      //given
      await sendKeys({
        press: tabKey,
      });
      await sendKeys({
        press: 'Enter',
      });

      //then
      expect(dropdown?.opened).to.equal(true);

      //given
      await sendKeys({
        press: 'Escape',
      });

      //then
      expect(dropdown?.opened).to.equal(false);
    });
  });
});
