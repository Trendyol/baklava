import { assert, elementUpdated, expect, fixture, html } from '@open-wc/testing';
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

//   it('should have `show` class when mouse over', async () => {
//     //given
//     const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip placement="top-end"><bl-button slot='tooltip-trigger'>Test</bl-button> Test Tooltip</bl-tooltip>`);
//     const button = document.querySelector('bl-button');
//     const mouseoverEvent = new Event('mouseover');

//     setTimeout(() => {
//         //when
//         button?.dispatchEvent(mouseoverEvent);

//         //then
//         expect(el.shadowRoot?.querySelector('.show')).to.exist;
//     },100)
//   });


//   it('should have `hidden` class when mouse leave', async () => {
//     //given
//     const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip placement="top-end"><bl-button slot='tooltip-trigger'>Test</bl-button> Test Tooltip</bl-tooltip>`);
//     const button = document.querySelector('bl-button');
//     const mouseoverEvent = new Event('mouseover');
//     const mouseleaveEvent = new Event('mouseleave');

//     setTimeout(() => {
//         //when
//         button?.dispatchEvent(mouseoverEvent);
//         button?.dispatchEvent(mouseleaveEvent);

//         //then
//         expect(el.shadowRoot?.querySelector('.hidden')).to.exist;
//     },100)
//   });
});
