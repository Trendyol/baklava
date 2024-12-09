import { elementUpdated, expect, fixture, fixtureCleanup } from "@open-wc/testing";
import { html, LitElement } from "lit";
import { customElement, query, property } from "lit/decorators.js";
import { innerInputValidators, textareaLengthValidator } from "./form-control";

@customElement("my-valid-input")
class MyValidInput extends LitElement {
  validationTarget: HTMLInputElement;
}

@customElement("my-invalid-input")
class MyInvalidInput extends LitElement {
  @query("input")
  validationTarget: HTMLInputElement;

  @property({ reflect: true, type: String })
  error: string = "";

  render() {
    return html`<input required />`;
  }
}

@customElement("my-custom-error-input")
class MyCustomErrorInput extends LitElement {
  @query("input")
  validationTarget: HTMLInputElement;

  @property({ reflect: true, type: String })
  error: string = "";

  render() {
    return html`<input />`;
  }
}

describe("Form Control Validators", () => {
  describe("innerInputValidators", () => {
    afterEach(fixtureCleanup);

    it("should return true if validationTarget is not present", async () => {
      const el = await fixture<MyValidInput>(html`<my-valid-input></my-valid-input>`);

      expect(innerInputValidators.every(validator => validator.isValid(el, ""))).to.be.true;
    });

    it("should return correct value if validationTarget present", async () => {
      const el = await fixture<MyInvalidInput>(html`<my-invalid-input></my-invalid-input>`);

      await elementUpdated(el);

      expect(innerInputValidators.every(validator => validator.isValid(el, el.validationTarget.value))).to.be.false;
      expect(innerInputValidators.find(validator => !validator.isValid(el, el.validationTarget.value))?.key).to.eq(
        "valueMissing"
      );
    });

    it("should return false when has custom error", async () => {
      const el = await fixture<MyCustomErrorInput>(html`<my-custom-error-input error="sa"></my-custom-error-input>`);

      await elementUpdated(el);

      expect(innerInputValidators.every(validator => validator.isValid(el, el.validationTarget.value))).to.be.false;
      expect(innerInputValidators.find(validator => !validator.isValid(el, el.validationTarget.value))?.key).to.eq(
        "customError"
      );
    });
  });

  describe("textareaLengthValidator", () => {
    @customElement("my-valid-textarea")
    class MyValidTextarea extends LitElement {
      validationTarget: HTMLTextAreaElement;
    }

    @customElement("my-invalid-textarea")
    class MyInvalidTextarea extends LitElement {
      @query("textarea")
      validationTarget: HTMLTextAreaElement;

      render() {
        return html`<textarea maxlength="3">more than 3 character</textarea>`;
      }
    }

    afterEach(fixtureCleanup);

    it("should return true if validationTarget is not present", async () => {
      const el = await fixture<MyValidTextarea>(html`<my-valid-textarea></my-valid-textarea>`);

      expect(textareaLengthValidator.isValid(el)).to.be.true;
    });

    it("should return true if validationTarget is not present", async () => {
      const el = await fixture<MyInvalidTextarea>(
        html`<my-invalid-textarea value="more than 3" maxlength="3"></my-invalid-textarea>`
      );

      expect(textareaLengthValidator.isValid(el)).to.be.false;
    });
  });
});
