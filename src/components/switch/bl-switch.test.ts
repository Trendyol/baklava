import { elementUpdated, assert, fixture, html, expect, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import BlSwitch from './bl-switch';

describe('bl-switch', () => {
  it('should be defined switch instance', () => {
    const el = document.createElement('bl-switch');
    assert.instanceOf(el, BlSwitch);
  });

  it('should be rendered with default values', async () => {
    const el = await fixture(html`<bl-switch></bl-switch>`);

    assert.shadowDom.equal(
      el,
      `
        <span
          aria-checked="false"
          aria-readonly="false"
          class="switch"
          role="switch"
          tabindex="0"
        >
          <span></span>
        </span>
      `
    );
  });

  describe('attributes', () => {
    it('should have a switch role', async () => {
      const el = await fixture(html`<bl-switch checked></bl-switch>`);
      expect(el.shadowRoot?.querySelector('.switch')?.getAttribute('role')).to.eq('switch');
    });

    it('should render with `aria-checked` attribute as checked value', async () => {
      const el = await fixture(html`<bl-switch checked></bl-switch>`);
      expect(el.shadowRoot?.querySelector('.switch')?.getAttribute('aria-checked')).to.equal('true');
    });

    it('should render with `aria-readonly` attribute as disabled', async () => {
      const el = await fixture(html`<bl-switch disabled></bl-switch>`);
      expect(el.shadowRoot?.querySelector('.switch')?.getAttribute('aria-readonly')).to.equal('true');
    });

    it('should not have tabindex if the switch is disabled', async () => {
      const el = await fixture(html`<bl-switch disabled></bl-switch>`);
      expect(el.shadowRoot?.querySelector('.switch')?.hasAttribute('tabindex')).to.be.false;
    });
  });

  describe('accessibility', () => {
    it('should toggle the state when Enter or Space key is pressed', async() => {
      const el = await fixture<BlSwitch>(html`<bl-switch></bl-switch>`);
      await elementUpdated(el);

      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: 'Enter'
      });
      expect(el.checked).to.be.true;

      await sendKeys({
        press: 'Space'
      });
      expect(el.checked).to.be.false;
    });

    it('should not toggle the state when switch is disabled and Enter or Space key is pressed', async() => {
      const el = await fixture<BlSwitch>(html`<bl-switch disabled></bl-switch>`);
      await elementUpdated(el);

      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: 'Enter'
      });
      expect(el.checked).to.be.false;
    });
  });

  describe('events', () => {
    it('should fire bl-switch-toggle event with detail as true when switch is checked', async () => {
      const el = await fixture<BlSwitch>(html`<bl-switch></bl-switch>`);
      const switchElement = el.shadowRoot?.querySelector<HTMLSpanElement>('.switch');

      setTimeout(() => switchElement?.click());
      const ev = await oneEvent(el, 'bl-switch-toggle');

      expect(el.checked).to.be.true;
      expect(ev).to.exist;
      expect(ev.detail).to.be.true;
    });

    it('should not fire bl-switch-toggle event when the disabled switch is clicked', async() => {
      const el = await fixture<BlSwitch>(html`<bl-switch disabled></bl-switch>`);
      const switchElement = el.shadowRoot?.querySelector<HTMLSpanElement>('.switch');

      setTimeout(() => switchElement?.click());
      expect(el.checked).not.to.be.true;
    });
  });
});
