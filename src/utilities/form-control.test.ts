import { elementUpdated, expect, fixture, fixtureCleanup } from "@open-wc/testing";
import { html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import { innerInputValidators } from "./form-control"

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
