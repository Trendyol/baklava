import {
  assert,
  expect,
  fixture,
  elementUpdated,
  oneEvent,
  html,
} from '@open-wc/testing';
import GrButton from './gr-button';
import type typeOfGrButton from './gr-button';

const variants = ['primary', 'secondary', 'tertiary', 'success', 'error'];

describe('gr-button', () => {
  it('is defined', () => {
    const el = document.createElement('gr-button');
    assert.instanceOf(el, GrButton);
  });

  it('renders with default values', async () => {
    const el = await fixture<typeOfGrButton>(html`<gr-button></gr-button>`);
    assert.shadowDom.equal(
      el,
      `
      <button aria-disabled="false" class="button">
        <slot name="icon"></slot>
        <slot></slot>
      </button>
    `
    );
  });
  it('check default values', async () => {
    const el = await fixture<typeOfGrButton>(
      html`<gr-button>Button</gr-button> `
    );
    expect(el.size).to.equal('medium');
    expect(el.disabled).to.equal(false);
    expect(el.target).to.equal('_self');
  });
  describe('Accessibility tests', () => {
    variants.forEach(variant => {
      it(`should be accessible when attribute is "${variant}"`, async () => {
        const el = await fixture<typeOfGrButton>(
          html` <gr-button ${variant}>Button</gr-button> `
        );
        await expect(el).to.be.accessible();
      });
    });
  });

  describe('Attributes', () => {
    it('is renders with `label` attribute as `aria-label', async () => {
      const el = await fixture<typeOfGrButton>(
        html`<gr-button label="simple-button"></gr-button>`
      );
      expect(
        el.shadowRoot?.querySelector('button')?.getAttribute('aria-label')
      ).to.eq('simple-button');
    });
    it('is bound to `disabled` attribute', async () => {
      const el = await fixture<typeOfGrButton>(
        html`<gr-button disabled></gr-button>`
      );
      expect(
        el.shadowRoot?.querySelector('button')?.hasAttribute('disabled')
      ).to.eq(true);
    });
    it('is bound to `size` attribute', async () => {
      const el = await fixture<typeOfGrButton>(
        html`<gr-button size=${'large'}>Test</gr-button>`
      );
      expect(el.getAttribute('size')).to.eq('large');

      el.setAttribute('size', 'medium');
      await elementUpdated(el);

      expect(el.getAttribute('size')).to.eq('medium');
    });

    it('is bound to `href` attribute', async () => {
      const el = await fixture<typeOfGrButton>(
        html`<gr-button href=${'https://trendyol.com'}>Test</gr-button>`
      );
      expect(el.getAttribute('href')).to.eq('https://trendyol.com');

      el.setAttribute('href', 'https://trendyol.github.io');
      await elementUpdated(el);

      expect(el.getAttribute('href')).to.eq('https://trendyol.github.io');
    });

    it('is bound to `target` attribute', async () => {
      const el = await fixture<typeOfGrButton>(
        html`<gr-button target=${'_blank'}>Test</gr-button>`
      );
      expect(el.getAttribute('target')).to.eq('_blank');

      el.setAttribute('target', '_self');
      await elementUpdated(el);

      expect(el.getAttribute('target')).to.eq('_self');
    });
  });
  describe('Slot', () => {
    it('renders default slot with element', async () => {
      const el = await fixture<typeOfGrButton>(
        html` <gr-button><strong>https://trendyol.com</strong></gr-button> `
      );
      expect(el.shadowRoot?.querySelector('button')).to.exist;
    });
  });
  describe('Link button', () => {
    it('renders element with anchor tag', async () => {
      const el = await fixture<typeOfGrButton>(
        html` <gr-button href="https://trendyol.com"></gr-button> `
      );
      expect(el.shadowRoot?.querySelector('a')).to.exist;
      expect(el.shadowRoot?.querySelector('button')).not.to.exist;
    });
  });
  describe('Icon only button', () => {
    it('renders with slotted icon content', async () => {
      const el = await fixture<typeOfGrButton>(
        html`<gr-button label="icon-only-button"
          ><gr-icon name="info" slot="icon"></gr-icon
        ></gr-button>`
      );
      expect(el).lightDom.to.equal(
        `<gr-icon name="info" slot="icon"></gr-icon>`
      );
    });
    it('has icon-only class', async () => {
      const el = await fixture<typeOfGrButton>(
        html`<gr-button label="icon-only-button"
          ><gr-icon name="info" slot="icon"></gr-icon
        ></gr-button>`
      );
      expect(
        el.shadowRoot?.querySelector('button')?.classList.contains('icon-only')
      ).to.eq(true);
    });
  });
  describe('Events', () => {
    it('fires bl-click event on click', async () => {
      const el = await fixture<typeOfGrButton>(
        html`<gr-button>button</gr-button>`
      );
      const button = el.shadowRoot?.querySelector('button');

      setTimeout(() => button?.click());
      const ev = await oneEvent(el, 'bl-click');
      expect(ev).to.exist;
      expect(ev.detail).to.be.equal('Click event fired!');
    });
  });
});
