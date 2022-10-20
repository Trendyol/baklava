import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import BlRadioGroup from './bl-radio-group';

describe('bl-radio-group', () => {
  it('should be defined radio group instance', () => {
    //when
    const el = document.createElement('bl-radio-group');

    //then
    expect(el).instanceOf(BlRadioGroup);
  });

  it('should be rendered with default values', async () => {
    //when
    const el = await fixture<BlRadioGroup>(
      html`<bl-radio-group label="Payment Type" name="pt">
        <bl-radio value="cc">Credit Card</bl-radio>
        <bl-radio value="ch">Cash</bl-radio>
      </bl-radio-group>`
    );

    //then
    expect(el).shadowDom.equal(
      `<fieldset
        aria-labelledby="label"
        aria-required="false"
        role="radiogroup"
        tabindex="0"
       >
        <legend>Payment Type</legend>
        <div class="options">
          <slot></slot>
        </div>
      </fieldset>`
    );
  });

  it('should set correct option selected with a value', async () => {
    //when
    const el = await fixture<BlRadioGroup>(
      html`<bl-radio-group label="Payment Type" name="pt" value="cc">
        <bl-radio value="cc">Credit Card</bl-radio>
        <bl-radio value="ch">Cash</bl-radio>
      </bl-radio-group>`
    );

    //then
    expect(el.options[0].checked).to.be.true;
    expect(el.options[1].checked).to.be.false;
  });

  describe('keyboard navigation', () => {
    it('should focus next option with right arrow key', async () => {
      //when
      const el = await fixture<BlRadioGroup>(
        html`<bl-radio-group label="Payment Type" name="pt" value="cc">
          <bl-radio value="cc">Credit Card</bl-radio>
          <bl-radio value="ch">Cash</bl-radio>
        </bl-radio-group>`
      );

      await elementUpdated(el);

      //given
      el.focus();

      console.log(document.activeElement);

      await sendKeys({
        press: 'Tab',
      });

      console.log(document.activeElement);

      //then
      expect(document.activeElement).to.equal(el.options[0]);
    });
  });

});
