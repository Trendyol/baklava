import {assert, elementUpdated, expect, fixture, html, oneEvent} from '@open-wc/testing';
import BlDrawer from "./bl-drawer";
import type typeOfBlDrawer from './bl-drawer';

describe('bl-drawer',() => {
  it('is defined', () => {
      const el = document.createElement('bl-drawer');
      assert.instanceOf(el, BlDrawer);
    });

  describe('render tests',()=>{
    it('renders without caption and external link', async ()=>{
      const el = await fixture<typeOfBlDrawer>(html`<bl-drawer></bl-drawer>`);
      assert.shadowDom.equal(
        el,
        `
      <div class="drawer">
        <div class="container">
        <header>
            <div>
              <bl-button
                icon="close"
                variant="tertiary"
                size="medium"
                kind="neutral"
              ></bl-button>
            </div>
        </header>
        <section class="content">
            <slot></slot>
        </section>
        </div>
      </div>
      `
      );
    });
    it('renders with caption and without external link', async ()=>{
      const el = await fixture<typeOfBlDrawer>(html`<bl-drawer caption="Example Caption"></bl-drawer>`);
      assert.shadowDom.equal(
        el,
        `
      <div class="drawer">
        <div class="container">
        <header>
            <h2 id="drawer-caption">Example Caption</h2>
            <div>
              <bl-button
                icon="close"
                variant="tertiary"
                size="medium"
                kind="neutral"
              ></bl-button>
            </div>
        </header>
        <section class="content">
            <slot></slot>
        </section>
        </div>
      </div>
      `
      );
    });
    it('renders without caption and with external link', async ()=>{
      const el = await fixture<typeOfBlDrawer>(html`<bl-drawer external_link="some-url"></bl-drawer>`);
      assert.shadowDom.equal(
        el,
        `
      <div class="drawer">
        <div class="container">
        <header>
            <div>
            <bl-button
              href="some-url"
              icon="external_link"
              variant="tertiary"
              kind="neutral"
              size="medium"
              target="_blank"
            ></bl-button>
              <bl-button
                icon="close"
                variant="tertiary"
                size="medium"
                kind="neutral"
              ></bl-button>
            </div>
        </header>
        <section class="content">
            <slot></slot>
        </section>
        </div>
      </div>
      `
      );
    });
    it('should open the drawer when change open attribute as true', async () => {
      const el = await fixture<typeOfBlDrawer>(html`<bl-drawer caption="Drawer Title">
      <div>Drawer Content</div>
    </bl-drawer>`);

      expect(el.open).to.equal(false);

      el.open = true;
      await elementUpdated(el);

      setTimeout(() => {
        expect(el.open).to.equal(true);
      });
    });
    it('should close the drawer when change click close button', async () => {
      const el = await fixture<typeOfBlDrawer>(html`<bl-drawer open caption="Drawer Title">
      <div>Drawer Content</div>
    </bl-drawer>`);

      const closeBtn = el?.shadowRoot?.querySelector('bl-button');

      expect(closeBtn).to.exist;
      expect(el.open).to.equal(true);
      closeBtn?.click();

      setTimeout(()=>{
        expect(el.open).to.equal(false);
        expect(el.offsetWidth).to.equal(0);
      });
    });
  });
  describe('event tests',()=>{
    it('should fire bl-drawer-open when dialog opens',async ()=>{
      const el = await fixture<typeOfBlDrawer>(html`<bl-drawer caption="My Drawer"></bl-drawer>`)

      setTimeout(async () => {
        const openEvent = await oneEvent(el,'bl-drawer-open');
        expect(openEvent).to.exist;
        expect(openEvent.detail.isOpen).to.equal(true);
      });
    });
    it('should fire bl-drawer-close when dialog closes',async ()=>{
      const el = await fixture<typeOfBlDrawer>(html`<bl-drawer open caption="My Drawer"></bl-drawer>`)

      const closeBtn = el?.shadowRoot?.querySelector('bl-button');

      setTimeout(async () => {
        closeBtn?.click();
        const openEvent = await oneEvent(el,'bl-drawer-close');
        expect(openEvent).to.exist;
        expect(openEvent.detail.isOpen).to.equal(false);
      });
    });
  })
});
