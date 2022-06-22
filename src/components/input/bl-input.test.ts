import { assert, expect, fixture, oneEvent, html } from '@open-wc/testing';
import BlInput from './bl-input';

describe('bl-input', () => {
  const oldFetch = window.fetch;

  before(() => {
    window.fetch = async (url: RequestInfo) => {
      if (/.svg$/.test(url.toString())) {
        return new Response('<svg></svg>');
      }
      return new Response('', { status: 404 });
    };
  });

  after(() => {
    window.fetch = oldFetch;
  });

  it('is defined', () => {
    const el = document.createElement('bl-input');
    assert.instanceOf(el, BlInput);
  });

  it('renders with default values', async () => {
    const el = await fixture<BlInput>(html`<bl-input></bl-input>`);
    assert.shadowDom.equal(
      el,
      `
      <input
        placeholder=""
        type="text"
        value=""
      >
      <bl-icon
        class="error-icon"
        name="alert"
      >
      </bl-icon>
    `
    );
  });


  it('should set type number', async () => {
    const el = await fixture<BlInput>(html`<bl-input type="number"></bl-input>`);
    expect(el.type).to.equal('number');
    expect(el.shadowRoot?.querySelector('input')?.getAttribute('type')).to.equal(
      'number'
    );
  });

  it('should set label', async () => {
    const labelText = 'Some Label';
    const el = await fixture<BlInput>(html`<bl-input label="${labelText}"></bl-input>`);
    const label = el.shadowRoot?.querySelector('label');
    expect(label).to.exist;
    expect(label?.innerText).to.equal(labelText);
  });

  it('should set help text', async () => {
    const helpText = 'Some help text';
    const el = await fixture<BlInput>(html`<bl-input help-text="${helpText}"></bl-input>`);
    const helpMessage = <HTMLParagraphElement>el.shadowRoot?.querySelector('.help-text');
    expect(helpMessage).to.exist;
    expect(helpMessage?.innerText).to.equal(helpText);
  });

  describe('input with icon', () => {
    it('should show custom icon', async () => {
      const el = await fixture<BlInput>(html`<bl-input icon="info"></bl-input>`);
      const customIcon = el.shadowRoot?.querySelector('bl-icon.custom-icon');
      expect(customIcon).to.exist;
      expect(customIcon?.getAttribute('name')).to.equal('info');
    });
  });

  describe('validation', () => {
    it('should be valid by default', async () => {
      const el = await fixture<BlInput>(html`<bl-input></bl-input>`);

      expect(el.validity.valid).to.be.true;
    });

    it('should be invalid with required attribute', async () => {
      const el = await fixture<BlInput>(html`<bl-input required></bl-input>`);

      expect(el.validity.valid).to.be.false;
    });

    it('should set invalid text', async () => {
      const errorMessage = "This field is mandatory";
      const el = await fixture<BlInput>(html`<bl-input required invalid-text="${errorMessage}"></bl-input>`);
      const errorMessageElement = <HTMLParagraphElement>el.shadowRoot?.querySelector('.invalid-text');

      expect(el.validity.valid).to.be.false;

      expect(errorMessageElement).to.exist;
      expect(errorMessageElement?.innerText).to.equal(errorMessage);
    });
  });

  describe('events', () => {
    it('should fire bl-input event when user enters a value',async () => {
      const el = await fixture<BlInput>(html`<bl-input></bl-input>`);
      el.input.value = 'some value';

      setTimeout(() => el.input.dispatchEvent(new Event("input")));

      const ev = await oneEvent(el, 'bl-input');
      expect(ev).to.exist;
      expect(ev.detail).to.be.equal('some value');

    });

    it('should fire bl-input event when input value changes',async () => {
      const el = await fixture<BlInput>(html`<bl-input></bl-input>`);
      el.input.value = 'some value';

      setTimeout(() => el.input.dispatchEvent(new Event("change")));

      const ev = await oneEvent(el, 'bl-change');
      expect(ev).to.exist;
      expect(ev.detail).to.be.equal('some value');

    });
  });
});
