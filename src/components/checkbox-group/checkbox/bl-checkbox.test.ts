import { assert, fixture, html, elementUpdated, expect, oneEvent } from "@open-wc/testing";
import BlCheckbox from "./bl-checkbox";

describe("bl-checkbox", () => {
  it("should be defined checkbox instance", () => {
    const el = document.createElement("bl-checkbox");

    assert.instanceOf(el, BlCheckbox);
  });

  it("should be rendered with default values", async () => {
    const el = await fixture(html`<bl-checkbox></bl-checkbox>`);

    assert.shadowDom.equal(
      el,
      `
        <div class="checkbox-container">
          <label>
              <input type="checkbox"
                aria-readonly="false"
                aria-required="false" />
              <div class="check-mark"></div>
              <slot class="label"></slot>
          </label>
          <div class="hint"></div>
        </div>
      `
    );
  });

  it("should be rendered with correct label", async () => {
    const labelText = "test label";
    const el = await fixture(html`<bl-checkbox>${labelText}</bl-checkbox>`);

    expect(el.shadowRoot?.querySelector("slot")).to.exist;
    expect(el.textContent).to.eq(labelText);
  });

  it("should be rendered with correct label when label was changed", async () => {
    const el = await fixture(html`<bl-checkbox>test label</bl-checkbox>`);
    const newLabelText = "new test label";

    el.textContent = newLabelText;

    await elementUpdated(el);

    expect(el.textContent).to.eq("new test label");
  });

  it("should be rendered with check icon when checkbox checked", async () => {
    const el = await fixture(html`<bl-checkbox checked required></bl-checkbox>`);
    const iconEl = el.shadowRoot?.querySelector("bl-icon");

    expect(iconEl?.getAttribute("name")).to.eq("check");
  });

  it("should render with `checked` attribute as checked value", async () => {
    const el = await fixture(html`<bl-checkbox checked></bl-checkbox>`);

    expect(el.shadowRoot?.querySelector("input")?.checked).to.eq(true);
  });

  describe("attributes", () => {
    it("should render with `disabled` attribute as disabled", async () => {
      const el = await fixture(html`<bl-checkbox disabled></bl-checkbox>`);

      expect(el.shadowRoot?.querySelector("input")?.hasAttribute("disabled")).to.eq(true);
    });

    it("should not render with `indeterminate` attribute as indeterminate", async () => {
      const el = await fixture(html`<bl-checkbox indeterminate></bl-checkbox>`);

      expect(el.shadowRoot?.querySelector("input")?.hasAttribute("indeterminate")).to.eq(false);
    });
  });

  describe("update", () => {
    it("should set checked to false when indeterminate set to true", async () => {
      const el = await fixture(html`<bl-checkbox checked></bl-checkbox>`);

      el.setAttribute("indeterminate", "true");
      await elementUpdated(el);

      expect(el.hasAttribute("checked")).to.eq(false);
    });
    it("should set checked to false when indeterminate and checked set to true at start", async () => {
      const el = await fixture(html`<bl-checkbox indeterminate checked></bl-checkbox>`);

      expect(el.hasAttribute("checked")).to.eq(false);
    });
  });

  describe("events", () => {
    it("should fire bl-checkbox-change event with detail is true when checkbox is unchecked", async () => {
      const el = await fixture(html`<bl-checkbox></bl-checkbox>`);
      const checkbox = el.shadowRoot?.querySelector("input");

      setTimeout(() => checkbox?.click());
      const ev = await oneEvent(el, "bl-checkbox-change");

      expect(ev).to.exist;
      expect(ev.detail).to.be.equal(true);
    });

    it("should fire bl-checkbox-change event with detail is false when checkbox is checked", async () => {
      const el = await fixture(html`<bl-checkbox checked></bl-checkbox>`);
      const checkbox = el.shadowRoot?.querySelector("input");

      setTimeout(() => checkbox?.click());
      const ev = await oneEvent(el, "bl-checkbox-change");

      expect(ev).to.exist;
      expect(ev.detail).to.be.equal(false);
    });
  });

  describe("validation", () => {
    it("should be valid by default ", async () => {
      const el = await fixture<BlCheckbox>(html`<bl-checkbox></bl-checkbox>`);

      expect(el.validity.valid).to.be.true;
    });

    it("should be invalid with required attribute", async () => {
      const el = await fixture<BlCheckbox>(html`<bl-checkbox required></bl-checkbox>`);

      expect(el.validity.valid).to.be.false;
    });

    it("should set invalid text", async () => {
      const errorMessage = "This field is mandatory";
      const el = await fixture<BlCheckbox>(
        html`<bl-checkbox required invalid-text="${errorMessage}"></bl-checkbox>`
      );

      el.reportValidity();

      await elementUpdated(el);

      const errorMessageElement = <HTMLParagraphElement>(
        el.shadowRoot?.querySelector(".invalid-text")
      );

      expect(el.validity.valid).to.be.false;

      expect(errorMessageElement).to.exist;
      expect(errorMessageElement?.innerText).to.equal(errorMessage);
    });

    it("should show error when reportValidity method called", async () => {
      const el = await fixture<BlCheckbox>(html`<bl-checkbox required></bl-checkbox>`);

      el.reportValidity();

      await elementUpdated(el);

      expect(el.validity.valid).to.be.false;
      const errorMessageElement = <HTMLParagraphElement>(
        el.shadowRoot?.querySelector(".invalid-text")
      );

      expect(errorMessageElement).to.visible;
    });

    it("should show error when checkbox is unchecked from checked", async () => {
      const el = await fixture<BlCheckbox>(html`<bl-checkbox required checked></bl-checkbox>`);
      const checkbox = el.shadowRoot?.querySelector("input");

      await elementUpdated(el);

      expect(el.validity.valid).to.be.true;


      setTimeout(() => checkbox?.click());
      const invalidEvent = await oneEvent(el, "bl-checkbox-invalid");

      await new Promise(resolve => setTimeout(resolve, 100));
      await elementUpdated(el);


      expect(invalidEvent).to.exist;
      expect(el.validity.valid).to.be.false;
      const errorMessageElement = <HTMLParagraphElement>(
        el.shadowRoot?.querySelector(".invalid-text")
      );

      expect(errorMessageElement).to.visible;
    });
  });

  describe("form integration", () => {
    it("should show errors when parent form is submitted", async () => {
      const form = await fixture<HTMLFormElement>(html`<form novalidate>
        <bl-checkbox required></bl-checkbox>
      </form>`);

      const blCheckbox = form.querySelector<BlCheckbox>("bl-checkbox");

      form.addEventListener("submit", e => e.preventDefault());

      form.dispatchEvent(new SubmitEvent("submit", { cancelable: true }));

      await elementUpdated(form);

      const errorMessageElement = <HTMLParagraphElement>(
        blCheckbox?.shadowRoot?.querySelector(".invalid-text")
      );

      expect(blCheckbox?.validity.valid).to.be.false;

      expect(errorMessageElement).to.exist;
    });
  });
});
