import { assert, fixture, expect, html, elementUpdated } from '@open-wc/testing';
import BlPopover from './bl-popover';
import type typeOfBlPopover from './bl-popover';
import type typeOfBlButton from '../button/bl-button';
import { sendKeys } from '@web/test-runner-commands';

describe('bl-popover', () => {
  it('should be defined popover instance', () => {
    const el = document.createElement('bl-popover');

    assert.instanceOf(el, BlPopover);
  });

  it('should be rendered with default values', async () => {
    const el = await fixture<BlPopover>(html`<bl-popover></bl-popover>`);

    assert.shadowDom.equal(
      el,
      `<div class="popover">
      <slot id="popover" aria-live="off"></slot>
      <div class="arrow" aria-hidden="true"></div>
    </div>`
    );
  });

  it('should have correct default values', async () => {
    const el = await fixture<BlPopover>(html`<bl-popover>Test</bl-popover>`);
    expect(el.placement).to.equal('bottom');
  });

  it('should be rendered with slot', async () => {
    const el = await fixture<BlPopover>(
      html`<bl-popover><span class="test">Popover Content</span></bl-popover>`
    );

    expect(el.shadowRoot?.querySelector('#popover')).to.exist;
  });

  it('should be rendered successful with fit-size', async () => {
    const el = await fixture<BlPopover>(
      html`<bl-popover fit-size>Popover Content</bl-popover>`
    );
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
        <bl-popover id="mypopover" fit-size placement="bottom" offset="5" target="mybtn">
          <span>Popover Content</span>
        </bl-popover>
      </div>
    `);

    const popoverEl = body.querySelector('bl-popover') as typeOfBlPopover;
    const btnEl = body.querySelector('bl-button') as typeOfBlButton;
    popoverEl.setAttribute('target', 'mybtn');
    btnEl.onclick = () => {
      popoverEl.show();
    };
    await btnEl.click();
    await elementUpdated(popoverEl);

    expect(popoverEl.visible).to.equal(true);
  });
  it('should be triggered successful when target assigned by object', async () => {
    const body = await fixture<HTMLBodyElement>(html`
      <div style="width: 1500px;height: 1500px;">
        <bl-button id="mybtn"></bl-button>
        <bl-popover id="mypopover" fit-size placement="bottom" offset="5">
          <span>Popover Content</span>
        </bl-popover>
      </div>
    `);

    const popoverEl = body.querySelector('bl-popover') as typeOfBlPopover;
    const btnEl = body.querySelector('bl-button') as typeOfBlButton;
    popoverEl.target = btnEl;
    btnEl.onclick = () => {
      popoverEl.show();
    };
    await btnEl.click();
    await elementUpdated(popoverEl);
    expect(popoverEl.visible).to.equal(true);
  });
  it('should get warning when invalid target type assigned', async () => {
    const body = await fixture<HTMLBodyElement>(html`
      <div style="width: 1500px;height: 1500px;">
        <bl-button id="mybtn"></bl-button>
        <bl-popover id="mypopover" fit-size placement="bottom" offset="5">
          <span>Popover Content</span>
        </bl-popover>
      </div>
    `);

    const popoverEl = body.querySelector('bl-popover') as typeOfBlPopover;
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    popoverEl.target = 2;
    expect(popoverEl.target).to.be.undefined;
  });
  it('should hide popover when press esc', async () => {
    const body = await fixture<HTMLBodyElement>(html`
      <div style="width: 1500px;height: 1500px;">
        <bl-button id="mybtn"></bl-button>
        <bl-popover id="mypopover" fit-size placement="bottom" offset="5">
          <span>Popover Content</span>
        </bl-popover>
      </div>
    `);

    const popoverEl = body.querySelector('bl-popover') as typeOfBlPopover;
    popoverEl.show();

    await sendKeys({ up: 'Escape' });

    expect(popoverEl.visible).to.equal(false);
  });
  it('should hide popover when click outside', async () => {
    const body = await fixture<HTMLBodyElement>(html`
      <div style="width: 1500px;height: 1500px;">
        <bl-button id="mybtn"></bl-button>
        <bl-popover id="mypopover" fit-size placement="bottom" offset="5" target="mybtn">
          <span>Popover Content</span>
        </bl-popover>
      </div>
    `);

    const popoverEl = body.querySelector('bl-popover') as typeOfBlPopover;
    const btnEl = body.querySelector('bl-button') as typeOfBlButton;
    popoverEl.setAttribute('target', 'mybtn');
    btnEl.onclick = () => {
      popoverEl.show();
    };
    await btnEl.click();

    expect(popoverEl.visible).to.true;

    const outside = <HTMLBodyElement>popoverEl.closest('body');
    outside.click();

    setTimeout(() => {
      expect(popoverEl.visible).to.false;
    });
  });
});
