import { assert, elementUpdated, expect, fixture, html,oneEvent } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';
import BlTooltip from './bl-tooltip';
import type typeOfBlTooltip from './bl-tooltip';


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
       class="trigger" 
       name="tooltip-trigger">
      </slot>
      <div class='tooltip'>  
        <slot></slot>
        <div class="arrow"></div>
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
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip><button slot='tooltip-trigger'>Test</button>
    Tooltip Test </bl-tooltip>`);

    //then
    expect(el.shadowRoot?.querySelector('.trigger')).to.exist;
    expect(el.shadowRoot?.querySelector('.arrow')).to.exist;
    expect(el.shadowRoot?.querySelector('.tooltip')).to.exist;
  });


  it('should be rendered with correct placement attribute', async () => {
    //when
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip placement="top-end"><button slot='tooltip-trigger'>Test</button> Test Tooltip</bl-tooltip>`);

    //then
    expect(el.getAttribute('placement')).to.eq('top-end');
  });

  it('should be rendered with correct placement attribute when placement attribute was changed', async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip placement="top-end"><button slot='tooltip-trigger'>Test</button> Test Tooltip</bl-tooltip>`);
    el.setAttribute('placement', 'right-start');

    //when
    await elementUpdated(el);

    //then
    expect(el.getAttribute('placement')).to.eq('right-start');
  });
   
  it('should have `visible` class when mouse over of trigger', async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip placement="top-end"><button slot='tooltip-trigger'>Test</button> Test Tooltip</bl-tooltip>`);
    const tooltip = el.shadowRoot?.querySelector('.tooltip') as HTMLElement;
    const trigger = document.querySelector('button') as HTMLElement;
    const { x, y } = getMiddleOfElement(trigger);

    //when
    await sendMouse({ type: 'move', position: [x, y] });

    //then
    expect(tooltip).to.have.class('visible');
  });

  it('should not have `show` class when mouse leave of trigger', async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip placement="left-end"><button slot='tooltip-trigger'>Test</button> Test Tooltip</bl-tooltip>`);
    const tooltip = el.shadowRoot?.querySelector('.tooltip') as HTMLElement;
    const trigger = document.querySelector('button') as HTMLElement;
    const body = document.querySelector('body') as HTMLElement;

    const { x:triggerX, y:triggerY } = getMiddleOfElement(trigger);
    const { x:bodyX, y:bodyY } = getMiddleOfElement(body);

    //when
    await sendMouse({ type: 'move', position: [triggerX, triggerY] });
    await sendMouse({ type: 'move', position: [bodyX, bodyY] });

    //then
    expect(tooltip).to.not.have.class('show');
  });

  it('should fires bl-tooltip-show on mouse over', async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip placement="top-end"><button slot='tooltip-trigger'>Test</button> Test Tooltip</bl-tooltip>`);
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
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip placement="left-end"><button slot='tooltip-trigger'>Test</button> Test Tooltip</bl-tooltip>`);
    const trigger = document.querySelector('button') as HTMLElement;
    const body = document.querySelector('body') as HTMLElement;
    const { x:triggerX, y:triggerY } = getMiddleOfElement(trigger);
    const { x:bodyX, y:bodyY } = getMiddleOfElement(body);

    //when
    await sendMouse({ type: 'move', position: [triggerX, triggerY]});
    setTimeout(() =>  {
      sendMouse({ type: 'move', position: [bodyX, bodyY]})
    });

    //then
    const ev = await oneEvent(el, 'bl-tooltip-hide');
    expect(ev).to.exist;
    expect(ev.detail).to.be.equal('Hide event fired!');
  });
});

function getMiddleOfElement(element: Element) {
  const { x, y, width, height } = element.getBoundingClientRect();

  return {
    x: Math.floor(x + window.pageXOffset + width / 2),
    y: Math.floor(y + window.pageYOffset + height / 2),
  };
}
