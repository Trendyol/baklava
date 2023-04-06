import { assert, fixture, html, elementUpdated, expect, oneEvent } from '@open-wc/testing';
import BlCheckbox from './bl-checkbox';

describe('bl-checkbox', () => {
  it('should be defined checkbox instance', () => {
    const el = document.createElement('bl-checkbox');
    assert.instanceOf(el, BlCheckbox);
  });

  it('should be rendered with default values', async () => {
    const el = await fixture(html`<bl-checkbox></bl-checkbox>`);

    assert.shadowDom.equal(
      el,
      `
        <label>
            <input type="checkbox"
              aria-labelledby="label"
              aria-readonly="false"
              aria-required="false" />
            <div class="check-mark"></div>
            <span class="label"><slot></slot></span>
        </label>
      `
    );
  });

  it('should be rendered with correct label attribute', async () => {
    const el = await fixture(html`<bl-checkbox label="test label"></bl-checkbox>`);

    expect(el.shadowRoot?.querySelector('span')).to.exist;
    expect(el.getAttribute('label')).to.eq('test label');
  });

  it('should be rendered with correct label attribute when label attribute was changed', async () => {
    const el = await fixture(html`<bl-checkbox label="test label"></bl-checkbox>`);

    el.setAttribute('label', 'new test label');

    await elementUpdated(el);

    expect(el.getAttribute('label')).to.eq('new test label');
  });

  it('should be rendered with check icon when checkbox checked', async () => {
    const el = await fixture(html`<bl-checkbox checked required></bl-checkbox>`);
    const iconEl = el.shadowRoot?.querySelector('bl-icon');

    expect(iconEl?.getAttribute('name')).to.eq('check');
  });

  it('should render with `checked` attribute as checked value', async () => {
    const el = await fixture(html`<bl-checkbox checked></bl-checkbox>`);
    expect(el.shadowRoot?.querySelector('input')?.checked).to.eq(true);
  });

  describe('attributes', () => {
    it('should render with `disabled` attribute as disabled', async () => {
      const el = await fixture(html`<bl-checkbox disabled></bl-checkbox>`);
      expect(el.shadowRoot?.querySelector('input')?.hasAttribute('disabled')).to.eq(true);
    });

    it('should not render with `indeterminate` attribute as indeterminate', async () => {
      const el = await fixture(html`<bl-checkbox indeterminate></bl-checkbox>`);
      expect(el.shadowRoot?.querySelector('input')?.hasAttribute('indeterminate')).to.eq(false);
    });
  });

  describe('update', () => {
    it('should set checked to false when indeterminate set to true', async () => {
      const el = await fixture(html`<bl-checkbox checked></bl-checkbox>`);

      el.setAttribute('indeterminate', 'true');
      await elementUpdated(el);

      expect(el.hasAttribute('checked')).to.eq(false);
    });
    it('should set checked to false when indeterminate and checked set to true at start', async () => {
      const el = await fixture(html`<bl-checkbox indeterminate checked></bl-checkbox>`);
      expect(el.hasAttribute('checked')).to.eq(false);
    });
  });

  describe('events', () => {
    it('should fire bl-checkbox-change event with detail is true when checkbox is unchecked', async () => {
      const el = await fixture(html`<bl-checkbox></bl-checkbox>`);
      const checkbox = el.shadowRoot?.querySelector('input');

      setTimeout(() => checkbox?.click());
      const ev = await oneEvent(el, 'bl-checkbox-change');

      expect(ev).to.exist;
      expect(ev.detail).to.be.equal(true);
    });

    it('should fire bl-checkbox-change event with detail is false when checkbox is checked', async () => {
      const el = await fixture(html`<bl-checkbox checked></bl-checkbox>`);
      const checkbox = el.shadowRoot?.querySelector('input');

      setTimeout(() => checkbox?.click());
      const ev = await oneEvent(el, 'bl-checkbox-change');

      expect(ev).to.exist;
      expect(ev.detail).to.be.equal(false);
    });
  });
});
