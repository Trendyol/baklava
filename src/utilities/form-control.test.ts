import { elementUpdated, expect, fixture, fixtureCleanup } from "@open-wc/testing";
import { html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import {innerInputValidators, textareaLengthValidator} from "./form-control"

@customElement('my-valid-input')
class MyValidInput extends LitElement {
  validationTarget: HTMLInputElement;
}


@customElement('my-invalid-input')
class MyInvalidInput extends LitElement {
  @query('input')
  validationTarget: HTMLInputElement;

  render() {
    return html`<input required>`
  }
}



describe('Form Control Validators', () => {
  describe('innerInputValidators', () => {
    afterEach(fixtureCleanup);

    it('should return true if validationTarget is not present', async () => {

      const el = await fixture<MyValidInput>(html`<my-valid-input></my-valid-input>`);

      expect(innerInputValidators.every(validator => validator.isValid(el))).to.be.true;
    });

    it('should return correct value if validationTarget present', async () => {
      const el = await fixture<MyInvalidInput>(html`<my-invalid-input></my-invalid-input>`);

      await elementUpdated(el);

      expect(innerInputValidators.every(validator => validator.isValid(el))).to.be.false;
      expect(innerInputValidators.find(validator => !validator.isValid(el))?.key).to.eq('valueMissing');

    });
  });

  describe('textareaLengthValidator', () => {
    @customElement('my-valid-textarea')
    class MyValidTextarea extends LitElement {
      validationTarget: HTMLTextAreaElement;
    }


    @customElement('my-invalid-textarea')
    class MyInvalidTextarea extends LitElement {
      @query('textarea')
      validationTarget: HTMLTextAreaElement;

      render() {
        return html`<textarea maxlength=3>more than 3 character</textarea>`
      }
    }

    afterEach(fixtureCleanup);

    it('should return true if validationTarget is not present', async () => {

      const el = await fixture<MyValidTextarea>(html`<my-valid-textarea></my-valid-textarea>`);

      expect(textareaLengthValidator.isValid(el)).to.be.true;
    });

    it('should return true if validationTarget is not present', async () => {

      const el = await fixture<MyInvalidTextarea>(html`<my-invalid-textarea value="more than 3" maxlength="3"></my-invalid-textarea>`);

      expect(textareaLengthValidator.isValid(el)).to.be.false;
    });
  });

});
