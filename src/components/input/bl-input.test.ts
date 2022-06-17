import { assert, expect, fixture, elementUpdated, oneEvent, html } from '@open-wc/testing';
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
    })
  });
});
