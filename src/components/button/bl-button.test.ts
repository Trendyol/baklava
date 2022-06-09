import {
  assert,
  expect,
  fixture,
  elementUpdated,
  oneEvent,
  html,
} from '@open-wc/testing';
import BlButton from './bl-button';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import type typeOfBlButton from './bl-button';

const variants = ['primary', 'secondary', 'tertiary', 'success', 'danger'];

describe('bl-button', () => {
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
    const el = document.createElement('bl-button');
    assert.instanceOf(el, BlButton);
  });

  it('renders with default values', async () => {
    const el = await fixture<typeOfBlButton>(html`<bl-button></bl-button>`);
    assert.shadowDom.equal(
      el,
      `
      <button aria-disabled="false" class="button">
        <slot name="icon"></slot>
        <span class="label"><slot></slot></span>
      </button>
    `
    );
  });
  it('check default values', async () => {
    const el = await fixture<typeOfBlButton>(
      html`<bl-button>Button</bl-button> `
    );
    expect(el.size).to.equal('medium');
    expect(el.disabled).to.equal(false);
    expect(el.target).to.equal('_self');
  });
  describe('Accessibility tests', () => {
    variants.forEach(variant => {
      it(`should be accessible when attribute is "${variant}"`, async () => {
        const htmlStr = `<bl-button ${variant}>Button</bl-button>`;
        const el = await fixture<typeOfBlButton>(
          html`${unsafeHTML(htmlStr)}`
        );
        await expect(el).to.be.accessible();
      });
    });
  });

  describe('Attributes', () => {
    it('is renders with `label` attribute as `aria-label', async () => {
      const el = await fixture<typeOfBlButton>(
        html`<bl-button label="simple-button"></bl-button>`
      );
      expect(
        el.shadowRoot?.querySelector('button')?.getAttribute('aria-label')
      ).to.eq('simple-button');
    });
    it('is bound to `disabled` attribute', async () => {
      const el = await fixture<typeOfBlButton>(
        html`<bl-button disabled></bl-button>`
      );
      expect(
        el.shadowRoot?.querySelector('button')?.hasAttribute('disabled')
      ).to.eq(true);
    });
    it('is bound to `size` attribute', async () => {
      const el = await fixture<typeOfBlButton>(
        html`<bl-button size=${'large'}>Test</bl-button>`
      );
      expect(el.getAttribute('size')).to.eq('large');

      el.setAttribute('size', 'medium');
      await elementUpdated(el);

      expect(el.getAttribute('size')).to.eq('medium');
    });

    it('is bound to `href` attribute', async () => {
      const el = await fixture<typeOfBlButton>(
        html`<bl-button href=${'https://trendyol.com'}>Test</bl-button>`
      );
      expect(el.getAttribute('href')).to.eq('https://trendyol.com');

      el.setAttribute('href', 'https://trendyol.github.io');
      await elementUpdated(el);

      expect(el.getAttribute('href')).to.eq('https://trendyol.github.io');
    });

    it('is bound to `target` attribute', async () => {
      const el = await fixture<typeOfBlButton>(
        html`<bl-button target=${'_blank'}>Test</bl-button>`
      );
      expect(el.getAttribute('target')).to.eq('_blank');

      el.setAttribute('target', '_self');
      await elementUpdated(el);

      expect(el.getAttribute('target')).to.eq('_self');
    });
  });
  describe('Slot', () => {
    it('renders default slot with element', async () => {
      const el = await fixture<typeOfBlButton>(
        html` <bl-button><strong>https://trendyol.com</strong></bl-button> `
      );
      expect(el.shadowRoot?.querySelector('button')).to.exist;
    });
  });
  describe('Link button', () => {
    it('renders element with anchor tag', async () => {
      const el = await fixture<typeOfBlButton>(
        html` <bl-button href="https://trendyol.com"></bl-button> `
      );
      expect(el.shadowRoot?.querySelector('a')).to.exist;
      expect(el.shadowRoot?.querySelector('button')).not.to.exist;
    });
  });
  describe('Icon only button', () => {
    it('renders with slotted icon content', async () => {
      const el = await fixture<typeOfBlButton>(
        html`<bl-button label="icon-only-button" icon="info"></bl-button>`
      );
      expect(el.shadowRoot?.querySelector('bl-icon')).to.exist;
    });
    it('has icon-only class', async () => {
      const el = await fixture<typeOfBlButton>(
        html`<bl-button label="icon-only-button"
          ><bl-icon name="info" slot="icon"></bl-icon
        ></bl-button>`
      );
      expect(
        el.shadowRoot?.querySelector('button')?.classList.contains('icon-only')
      ).to.eq(true);
    });
  });
  describe('Events', () => {
    it('fires bl-click event on click', async () => {
      const el = await fixture<typeOfBlButton>(
        html`<bl-button>button</bl-button>`
      );
      const button = el.shadowRoot?.querySelector('button');

      setTimeout(() => button?.click());
      const ev = await oneEvent(el, 'bl-click');
      expect(ev).to.exist;
      expect(ev.detail).to.be.equal('Click event fired!');
    });
  });
});
