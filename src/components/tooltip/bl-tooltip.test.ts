import { assert, elementUpdated, expect, fixture, html } from '@open-wc/testing';
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
      <div class='hidden tooltip'>  
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
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip><bl-button slot='tooltip-trigger'>Test</bl-button>
    Tooltip Test </bl-tooltip>`);

    //then
    expect(el.shadowRoot?.querySelector('.trigger')).to.exist;
    expect(el.shadowRoot?.querySelector('.arrow')).to.exist;
    expect(el.shadowRoot?.querySelector('.tooltip')).to.exist;
  });


  it('should be rendered with correct placement attribute', async () => {
    //when
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip placement="top-end"><h1 slot='tooltip-trigger'>Test</h1> Test Tooltip</bl-tooltip>`);

    //then
    expect(el.getAttribute('placement')).to.eq('top-end');
  });

  it('should be rendered with correct placement attribute when placement attribute was changed', async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip placement="top-end"><h1 slot='tooltip-trigger'>Test</h1> Test Tooltip</bl-tooltip>`);
    el.setAttribute('placement', 'right-start');

    //when
    await elementUpdated(el);

    //then
    expect(el.getAttribute('placement')).to.eq('right-start');
  });
   
  it('should have `visible` class when mouse over of trigger', async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip placement="top-end"><h1 slot='tooltip-trigger'>Test</h1> Test Tooltip</bl-tooltip>`);
    const tooltip = el.shadowRoot?.querySelector('.tooltip') as HTMLElement;
    const trigger = document.querySelector('h1') as HTMLElement;
    const { x, y } = getMiddleOfElement(trigger);

    //when
    await sendMouse({ type: 'move', position: [x, y] });

    //then
    expect(tooltip).to.have.class('visible');
  });

  it('should have `hidden` class when mouse leave of trigger', async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip placement="left-end"><h1 slot='tooltip-trigger'>Test</h1> Test Tooltip</bl-tooltip>`);
    const tooltip = el.shadowRoot?.querySelector('.tooltip') as HTMLElement;
    const trigger = document.querySelector('h1') as HTMLElement;
    const body = document.querySelector('body') as HTMLElement;

    const { x:triggerX, y:triggerY } = getMiddleOfElement(trigger);
    const { x:bodyX, y:bodyY } = getMiddleOfElement(body);

    //when
    await sendMouse({ type: 'move', position: [triggerX, triggerY] });
    await sendMouse({ type: 'move', position: [bodyX, bodyY] });

    //then
    expect(tooltip).to.have.class('hidden');
  });
});

function getMiddleOfElement(element: Element) {
  const { x, y, width, height } = element.getBoundingClientRect();

  return {
    x: Math.floor(x + window.pageXOffset + width / 2),
    y: Math.floor(y + window.pageYOffset + height / 2),
  };
}
