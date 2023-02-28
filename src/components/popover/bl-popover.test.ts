import {assert, fixture, expect, html, elementUpdated} from "@open-wc/testing";
import BlPopover from "./bl-popover";
import type typeOfBlPopover from './bl-popover';
import type typeOfBlButton from '../button/bl-button';
import {query} from "lit/decorators.js";

describe('bl-popover',()=>{
  it('should be defined popover instance', () => {
    const el = document.createElement('bl-popover');

    assert.instanceOf(el, BlPopover);
  });

  it('should be rendered with default values', async () => {
    const el = await fixture<BlPopover>(html`<bl-popover></bl-popover>`);

    assert.shadowDom.equal(
      el,
      `<div class="popover">
      <slot id="popover" role="popover" aria-live="off"></slot>
      <div class="arrow" aria-hidden="true"></div>
    </div>`
    )
  });

  it('should have correct default values', async () => {
    const el = await fixture<BlPopover>(html`<bl-popover>Test</bl-popover>`);
    expect(el.placement).to.equal('top');
  });

  it('should be rendered with slot', async () => {
    const el = await fixture<BlPopover>(html`<bl-popover><span class="test">Popover Content</span></bl-popover>`);

    expect(el.shadowRoot?.querySelector('#popover')).to.exist;
  });

  it('should be rendered with correct placement attribute value', async () => {
    const el = await fixture<BlPopover>(html`<bl-popover placement="bottom">Popover Content</bl-popover>`);
    await el.show();
    expect(el.getAttribute('placement')).to.eq('bottom');
  });

  it('should be rendered successful with fit-size', async () => {
    const el = await fixture<BlPopover>(html`<bl-popover fit-size shift>Popover Content</bl-popover>`);
    el.show();
    expect(el).to.exist;
  });

  it('should be visible when show function triggered', async () => {
    const el = await fixture<BlPopover>(html`<bl-popover>Popover Content</bl-popover>`);

    await el.show();
    expect(el.visible).to.be.true;
  });
  it('should not be visible when hide function triggered', async () => {
    const el = await fixture<BlPopover>(html`<bl-popover>Popover Content</bl-popover>`);

    await el.show();
    expect(el.visible).to.be.true;

    await el.hide();
    expect(el.visible).to.be.false;
  });

  it('should be triggered successful when target assigned by id', async () => {
    const body = await fixture<HTMLBodyElement>(html`
        <div style="width: 1500px;height: 1500px;">
          <bl-button id="mybtn"></bl-button>
          <bl-popover id="mypopover" fit-size placement="bottom" shift offset="5" target="mybtn">
            <span>Popover Content</span>
          </bl-popover>
        </div>
    `);


    const popoverEl = body.querySelector('bl-popover') as typeOfBlPopover;
    const btnEl = body.querySelector('bl-button') as typeOfBlButton;
    popoverEl.setAttribute('target','mybtn');
    btnEl.onclick = () => { popoverEl.show(); };
    await btnEl.click();
    await elementUpdated(popoverEl);

    expect(popoverEl.visible).to.equal(true);
  });
  it('should be triggered successful when target assigned by object', async () => {
    const body = await fixture<HTMLBodyElement>(html`
        <div style="width: 1500px;height: 1500px;">
          <bl-button id="mybtn"></bl-button>
          <bl-popover id="mypopover" fit-size placement="bottom" shift offset="5" .target=${query('bl-button')}>
            <span>Popover Content</span>
          </bl-popover>
        </div>
    `);


    const popoverEl = body.querySelector('bl-popover') as typeOfBlPopover;
    const btnEl = body.querySelector('bl-button') as typeOfBlButton;
    btnEl.onclick = () => { popoverEl.show(); };
    await btnEl.click();
    await elementUpdated(popoverEl);

    expect(popoverEl.visible).to.equal(true);
  });

});
