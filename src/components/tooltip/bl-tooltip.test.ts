import { assert, elementUpdated, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';
import BlTooltip from './bl-tooltip';
import type typeOfBlTooltip from './bl-tooltip';
import type typeOfBlPopover from "../popover/bl-popover";
import typeOfBlButton from "../button/bl-button";

describe('bl-tooltip', () => {
  it('should be defined tooltip instance', () => {
    //when
    const el = document.createElement('bl-tooltip');

    //then
    assert.instanceOf(el, BlTooltip);
  });

  it('should be rendered with default values', async () => {
    //when
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip></bl-tooltip>`);

    //then
    assert.shadowDom.equal(
      el,
      `
      <slot
       aria-describedby="tooltip"
       class="trigger"
       name="tooltip-trigger">
      </slot>
      <div class='wrapper'>
      <bl-popover class='tooltip' placement='top'>
        <slot
          id="tooltip"
          class="content"
          role="tooltip">
        </slot>
       </bl-popover>
      </div>
      `
    );
  });

  it('should have correct default values', async () => {
    //when
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip>Test</bl-tooltip>`);

    //then
    expect(el.placement).to.equal('top');
  });

  it('should be rendered with slot', async () => {
    //when
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip
      ><button slot="tooltip-trigger">Test</button> Tooltip Test
    </bl-tooltip>`);

    //then
    expect(el.shadowRoot?.querySelector('.trigger')).to.exist;
    expect(el.shadowRoot?.querySelector('.tooltip')).to.exist;
  });

  it('should be rendered with correct placement attribute', async () => {
    //when
    const el = await fixture<typeOfBlTooltip>(
      html`<bl-tooltip placement="top-end"
        ><button slot="tooltip-trigger">Test</button> Test Tooltip</bl-tooltip
      >`
    );

    //then
    expect(el.getAttribute('placement')).to.eq('top-end');
  });

  it('should be rendered with correct placement attribute when placement attribute was changed', async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(
      html`<bl-tooltip placement="top-end"
        ><button slot="tooltip-trigger">Test</button> Test Tooltip</bl-tooltip
      >`
    );
    el.setAttribute('placement', 'right-start');

    //when
    await elementUpdated(el);

    //then
    expect(el.getAttribute('placement')).to.eq('right-start');
  });

  it('should have `visible` class when mouse over of trigger', async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(
      html`<bl-tooltip placement="top-end"
        ><button slot="tooltip-trigger">Test</button> Test Tooltip</bl-tooltip
      >`
    );
    const tooltipPopover = el.shadowRoot?.querySelector('.tooltip') as typeOfBlPopover;
    const trigger = document.querySelector('button') as HTMLElement;
    const { x, y } = getMiddleOfElement(trigger);

    //when
    await sendMouse({ type: 'move', position: [x, y] });

    //then
    expect(tooltipPopover.visible).to.be.true;
    expect(el.visible).to.be.true;
  });

  it('should not have `show` class when mouse leave of trigger', async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(
      html`<bl-tooltip placement="left-end"
        ><button slot="tooltip-trigger">Test</button> Test Tooltip</bl-tooltip
      >`
    );
    const tooltip = el.shadowRoot?.querySelector('.tooltip') as HTMLElement;
    const trigger = document.querySelector('button') as HTMLElement;
    const body = document.querySelector('body') as HTMLElement;

    const { x: triggerX, y: triggerY } = getMiddleOfElement(trigger);
    const { x: bodyX, y: bodyY } = getMiddleOfElement(body);

    //when
    await sendMouse({ type: 'move', position: [triggerX, triggerY] });
    await sendMouse({ type: 'move', position: [bodyX, bodyY] });

    //then
    expect(tooltip).to.not.have.class('show');
  });

  it('should fires bl-tooltip-show on mouse over', async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(
      html`<bl-tooltip placement="top-end"
        ><button slot="tooltip-trigger">Test</button> Test Tooltip</bl-tooltip
      >`
    );
    const trigger = document.querySelector('button') as HTMLElement;
    const { x, y } = getMiddleOfElement(trigger);

    //when
    setTimeout(() => sendMouse({ type: 'move', position: [x, y] }));

    //then
    const ev = await oneEvent(el, 'bl-tooltip-show');
    expect(ev).to.exist;
    expect(ev.detail).to.be.equal('Show event fired!');
  });

  it('should fires bl-tooltip-hide on mouse leave', async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(
      html`<bl-tooltip placement="left-end"
        ><button slot="tooltip-trigger">Test</button> Test Tooltip</bl-tooltip
      >`
    );
    const trigger = document.querySelector('button') as HTMLElement;
    const body = document.querySelector('body') as HTMLElement;
    const { x: triggerX, y: triggerY } = getMiddleOfElement(trigger);
    const { x: bodyX, y: bodyY } = getMiddleOfElement(body);

    //when
    await sendMouse({ type: 'move', position: [triggerX, triggerY] });
    setTimeout(() => {
      sendMouse({ type: 'move', position: [bodyX, bodyY] });
    });

    //then
    const ev = await oneEvent(el, 'bl-tooltip-hide');
    expect(ev).to.exist;
    expect(ev.detail).to.be.equal('Hide event fired!');
  });

  it('should hide with keyboard escape button', async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(
      html`<bl-tooltip> <button slot="tooltip-trigger">Test</button> Test Tooltip </bl-tooltip>`
    );
    const trigger = document.querySelector('button') as HTMLElement;

    //when
    trigger.focus();

    await elementUpdated(el);

    const escEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      cancelable: true,
    });

    setTimeout(() => {
      el?.dispatchEvent(escEvent);
    });

    //then
    const ev = await oneEvent(el, 'bl-tooltip-hide');
    expect(ev).to.exist;
    expect(ev.detail).to.be.equal('Hide event fired!');
    expect(el.visible).to.be.false;
  });
  it('should be triggered successful when target assigned by id', async () => {
    //given
    const body = await fixture<HTMLBodyElement>(html`
      <div style="width: 1500px;height: 1500px;">
        <bl-button id="mybtn">My Button</bl-button>
        <bl-tooltip id="mytooltip" placement="bottom" target="mybtn">
          <span>Tooltip Content</span>
        </bl-tooltip>
      </div>
    `);

    const tooltipEl = body.querySelector('bl-tooltip') as typeOfBlTooltip;
    const btnEl = body.querySelector('#mybtn') as typeOfBlButton;
    tooltipEl.setAttribute('target', 'mybtn');
    await elementUpdated(tooltipEl);
    const { x, y } = getMiddleOfElement(btnEl);


    //when
    await sendMouse({ type: 'move', position: [x, y] });

    //then
    expect(tooltipEl.visible).to.equal(true);
  });
  it('should be triggered successful when target assigned by object', async () => {
    //given
    const body = await fixture<HTMLBodyElement>(html`
      <div style="width: 1500px;height: 1500px;">
        <bl-button id="mybtn">My Button</bl-button>
        <bl-button id="mybtn2">My Button2</bl-button>
        <bl-tooltip id="mytooltip" placement="bottom">
          <span>Tooltip Content</span>
        </bl-tooltip>
      </div>
    `);

    const tooltipEl = body.querySelector('bl-tooltip') as typeOfBlTooltip;
    const btnEl = body.querySelector('#mybtn') as typeOfBlButton;
    tooltipEl.target = btnEl;
    await elementUpdated(tooltipEl);
    const { x, y } = getMiddleOfElement(btnEl);


    //when
    await sendMouse({ type: 'move', position: [200, 200] });

    await sendMouse({ type: 'move', position: [x, y] });

    //then
    expect(tooltipEl.visible).to.equal(true);
  });
  it('should get warning when invalid target type assigned', async () => {
    const body = await fixture<HTMLBodyElement>(html`
      <div style="width: 1500px;height: 1500px;">
        <bl-button id="mybtn">My Button</bl-button>
        <bl-tooltip id="mytooltip"  placement="bottom">
          <span>Tooltip Content</span>
        </bl-tooltip>
      </div>
    `);

    const tooltipEl = body.querySelector('bl-tooltip') as typeOfBlTooltip;
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    tooltipEl.target = 2;
    expect(tooltipEl.target).to.be.undefined;
  });
});

function getMiddleOfElement(element: Element) {
  const { x, y, width, height } = element.getBoundingClientRect();

  return {
    x: Math.floor(x + window.pageXOffset + width / 2),
    y: Math.floor(y + window.pageYOffset + height / 2),
  };
}
