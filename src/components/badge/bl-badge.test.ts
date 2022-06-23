import { assert, elementUpdated, expect, fixture, html } from '@open-wc/testing';
import BlBadge from './bl-badge';
import type typeOfBlBadge from './bl-badge';

describe('bl-badge', () => {
  const oldFetch = window.fetch;

  before(() => {
    window.fetch = async (url: RequestInfo) => {
      if (/info\.svg$/.test(url.toString())) {
        return new Response('<svg></svg>');
      }
      return new Response('', { status: 404 });
    };
  });

  after(() => {
    window.fetch = oldFetch;
  });

  it('is defined', () => {
    const el = document.createElement('bl-badge');
    assert.instanceOf(el, BlBadge);
  });

  it('renders with default values', async () => {
    const el = await fixture<typeOfBlBadge>(html`<bl-badge></bl-badge>`);

    assert.shadowDom.equal(
      el,
      `
        <span class="badge">
          <slot name="badge-icon"></slot>
          <slot></slot>
        </span>
      `
    );
  });

  it('check default values', async () => {
    const el = await fixture<typeOfBlBadge>(html`<bl-badge>Test</bl-badge>`);

    expect(el.size).to.equal('medium');
  });

  describe('Attributes', () => {
    it('is bound to `size` attribute', async () => {
      const el = await fixture<typeOfBlBadge>(html`<bl-badge size=${'large'}>Test</bl-badge>`);
      expect(el.getAttribute('size')).to.eq('large');

      el.setAttribute('size', 'medium');
      await elementUpdated(el);

      expect(el.getAttribute('size')).to.eq('medium');
    });
  });

  describe('Slot', () => {
    it('renders default slot with element', async () => {
      const el = await fixture<typeOfBlBadge>(
        html` <bl-badge><strong>test badge</strong></bl-badge> `
      );
      expect(el.shadowRoot?.querySelector('span')).to.exist;
    });
  });

  describe('With icon badge', () => {
    it('renders with slotted icon content', async () => {
      const el = await fixture<typeOfBlBadge>(html`<bl-badge icon="info"></bl-badge>`);
      expect(el.shadowRoot?.querySelector('bl-icon')).to.exist;
    });
    it('should not have icon when badge size is small', async () => {
      const el = await fixture<typeOfBlBadge>(
        html`<bl-button icon="info" size="small"></bl-button>`
      );
      expect(el.shadowRoot?.querySelector('bl-icon')).not.to.exist;
    });
  });
});
