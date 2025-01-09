import { assert, expect, fixture, oneEvent, html, elementUpdated } from "@open-wc/testing";
import { stub } from "sinon";
import BlInput from "./bl-input";

describe("bl-input", () => {
  it("is defined", () => {
    const el = document.createElement("bl-input");

    assert.instanceOf(el, BlInput);
  });

  it("renders with default values", async () => {
    const el = await fixture<BlInput>(html`<bl-input></bl-input>`);

    assert.shadowDom.equal(
      el,
      `<div class="wrapper">
        <fieldset class="input-wrapper">
          <legend><span></span></legend>
          <input
            aria-invalid="false"
            autocomplete="on"
            id="input"
            type="text"
          >
          <div class="icon">
            <slot name="icon">
              <bl-icon
                class="error-icon"
                name="alert"
              >
              </bl-icon>
            </slot>
          </div>
        </fieldset>
        <div class="hint"></div>
      </div>`,
      { ignoreAttributes: ["for", "id"] }
    );
  });

  it("should set type number", async () => {
    const el = await fixture<BlInput>(html`<bl-input type="number"></bl-input>`);

    expect(el.type).to.equal("number");
    expect(el.shadowRoot?.querySelector("input")?.getAttribute("type")).to.equal("number");
  });

  it('should call showPicker if "showPicker" is in HTMLInputElement.prototype', async () => {
    const el = await fixture<BlInput>(html`<bl-input type="text"></bl-input>`);
    const spy = stub(el.validationTarget, "showPicker");

    el.showPicker();

    el.requestUpdate();
    await el.updateComplete;

    expect(spy).to.have.been.calledOnce;
    expect(typeof el.showPicker).to.be.equals("function");
    expect(el.showPicker).to.exist;
  });

  it("should set type password", async () => {
    const el = await fixture<BlInput>(html`<bl-input type="password"></bl-input>`);

    expect(el.type).to.equal("password");
    expect(el.shadowRoot?.querySelector("input")?.getAttribute("type")).to.equal("password");
  });

  it("should set label", async () => {
    const labelText = "Some Label";
    const el = await fixture<BlInput>(html`<bl-input label="${labelText}"></bl-input>`);
    const label = el.shadowRoot?.querySelector("label");

    expect(label).to.exist;
    expect(label?.innerText).to.equal(labelText);
  });

  it("should set help text", async () => {
    const helpText = "Some help text";
    const el = await fixture<BlInput>(html`<bl-input help-text="${helpText}"></bl-input>`);
    const helpMessage = <HTMLParagraphElement>el.shadowRoot?.querySelector(".help-text");

    expect(helpMessage).to.exist;
    expect(helpMessage?.innerText).to.equal(helpText);
  });

  describe("input with icon", () => {
    it("should show default icon", async () => {
      const el = await fixture<BlInput>(html`<bl-input type="time"></bl-input>`);
      const defaultIcon = el.shadowRoot?.querySelector('bl-icon[name="clock"]');

      expect(defaultIcon).to.exist;
      expect(defaultIcon?.getAttribute("name")).to.equal("clock");
      expect(el.shadowRoot?.querySelector(".has-icon")).to.exist;
    });

    it("should override default icon when custom icon is set", async () => {
      const el = await fixture<BlInput>(html`<bl-input type="time" icon="academy"></bl-input>`);
      const defaultIcon = el.shadowRoot?.querySelector('bl-icon[name="clock"]');
      const customIcon = el.shadowRoot?.querySelector('bl-icon[name="academy"]');

      expect(defaultIcon).to.not.exist;
      expect(customIcon).to.exist;
      expect(el.shadowRoot?.querySelector(".has-icon")).to.exist;
    });

    it("should show custom icon", async () => {
      const el = await fixture<BlInput>(html`<bl-input icon="info"></bl-input>`);
      const customIcon = el.shadowRoot?.querySelector('bl-icon[name="info"]');

      expect(customIcon).to.exist;
      expect(customIcon?.getAttribute("name")).to.equal("info");
      expect(el.shadowRoot?.querySelector(".has-icon")).to.exist;
    });

    it("should show slot icon", async () => {
      const el = await fixture<BlInput>(html`<bl-input><bl-icon slot="icon" name="info"></bl-icon></bl-input>`);
      const slot = el.shadowRoot?.querySelector('slot[name="icon"]') as HTMLSlotElement;
      const slotIcon = el.querySelector('bl-icon[name="info"]');

      expect(slot.assignedNodes()).have.lengthOf(1);
      expect(slot.assignedNodes()[0]).to.equal(slotIcon);

      expect(slotIcon).to.exist;
      expect(slotIcon?.getAttribute("name")).to.equal("info");

      expect(el.shadowRoot?.querySelector(".has-icon")).to.exist;
    });

    it("should show reveal button on password type", async () => {
      const el = await fixture<BlInput>(html`<bl-input type="password"></bl-input>`);
      const revealIcon = el.shadowRoot?.querySelector('bl-icon[name="eye_on"]');
      const hiddenRevealIcon = el.shadowRoot?.querySelector('bl-icon[name="eye_off"]');

      expect(revealIcon).to.exist;
      expect(hiddenRevealIcon).to.exist;

      expect(revealIcon).to.be.visible;
      expect(hiddenRevealIcon).to.have.style("display", "none");
    });

    it("should toggle reveal icon on click", async () => {
      const el = await fixture<BlInput>(html`<bl-input type="password"></bl-input>`);
      const revealButton = el?.shadowRoot?.querySelector(
        'bl-icon[name="eye_on"]'
      ) as HTMLElement | null;

      expect(revealButton).to.exist;
      expect(revealButton).to.be.visible;

      revealButton?.click();
      await elementUpdated(el);

      expect(revealButton).to.have.style("display", "none");
    });
  });

  describe("validation", () => {
    it("should be valid by default", async () => {
      const el = await fixture<BlInput>(html`<bl-input></bl-input>`);

      expect(el.validity.valid).to.be.true;
    });

    it("should be invalid with required attribute", async () => {
      const el = await fixture<BlInput>(html`<bl-input required></bl-input>`);

      expect(el.validity.valid).to.be.false;
    });

    it("should set invalid text", async () => {
      const errorMessage = "This field is mandatory";
      const el = await fixture<BlInput>(
        html`<bl-input required invalid-text="${errorMessage}"></bl-input>`
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
      const el = await fixture<BlInput>(html`<bl-input required></bl-input>`);

      el.reportValidity();

      await elementUpdated(el);

      expect(el.validity.valid).to.be.false;
      const errorMessageElement = <HTMLParagraphElement>(
        el.shadowRoot?.querySelector(".invalid-text")
      );

      expect(errorMessageElement).to.visible;
    });

    it("should show custom error", async () => {
      const errorMessage = "This field is mandatory";
      const el = await fixture<BlInput>(
        html`<bl-input error="${errorMessage}"></bl-input>`
      );

      await elementUpdated(el);

      const errorMessageElement = <HTMLParagraphElement>(
        el.shadowRoot?.querySelector(".invalid-text")
      );

      expect(el.validity.valid).to.be.false;

      expect(errorMessageElement).to.exist;
      expect(errorMessageElement?.innerText).to.equal(errorMessage);
    });

    it("should show custom invalid text", async () => {
      const invalidText = "This field is mandatory";
      const el = await fixture<BlInput>(html`<bl-input required></bl-input>`);

      el.setCustomValidity(invalidText);
      el.setValue(el.value);
      el.reportValidity();

      await elementUpdated(el);

      expect(el.validity.valid).to.be.false;
      const errorMessageElement = <HTMLParagraphElement>(
        el.shadowRoot?.querySelector(".invalid-text")
      );

      expect(errorMessageElement).to.visible;
      expect(errorMessageElement?.innerText).to.equal(invalidText);
    });

    it("should set custom error state with forceCustomError method", async () => {
      const el = await fixture<BlInput>(html`<bl-input></bl-input>`);

      el.forceCustomError();

      await elementUpdated(el);

      expect(el.validity.valid).to.be.false;
      const errorMessageElement = <HTMLParagraphElement>(
        el.shadowRoot?.querySelector(".invalid-text")
      );

      expect(errorMessageElement).to.visible;
    });

    it("should clear custom error state with clearCustomError method", async () => {
      const el = await fixture<BlInput>(html`<bl-input></bl-input>`);

      el.forceCustomError();

      await elementUpdated(el);

      el.clearCustomError();

      await elementUpdated(el);

      expect(el.validity.valid).to.be.true;
      const errorMessageElement = <HTMLParagraphElement>(
        el.shadowRoot?.querySelector(".invalid-text")
      );

      expect(errorMessageElement).to.not.exist;
    });

    it("should render alert icon when invalid and without custom icon", async () => {
      const el = await fixture<BlInput>(html`<bl-input required></bl-input>`);

      el.reportValidity();

      await elementUpdated(el);

      const alertIcon = el.shadowRoot?.querySelector('bl-icon[name="alert"]');

      expect(alertIcon).to.exist;
    });
  });

  describe("events", () => {
    it("should fire bl-input event when user enters a value", async () => {
      const el = await fixture<BlInput>(html`<bl-input></bl-input>`);
      const input = el.shadowRoot?.querySelector("input");

      if (input) {
        input.value = "some value";
      }

      setTimeout(() => input?.dispatchEvent(new Event("input")));

      const ev = await oneEvent(el, "bl-input");

      expect(ev).to.exist;
      expect(ev.detail).to.be.equal("some value");
    });

    it("should toggle input type on reveal button click", async () => {
      const el = await fixture<BlInput>(html`<bl-input type="password"></bl-input>`);
      const revealButton = el?.shadowRoot?.querySelector("bl-icon") as HTMLElement | null;
      const input = el?.shadowRoot?.querySelector("input");

      expect(input).to.attr("type", "password");
      expect(revealButton).to.exist;

      revealButton?.click();
      await elementUpdated(el);

      expect(input).to.attr("type", "text");
    });

    it("should fire bl-input event when input value changes", async () => {
      const el = await fixture<BlInput>(html`<bl-input></bl-input>`);
      const input = el.shadowRoot?.querySelector("input");

      if (input) {
        input.value = "some value";
      }

      setTimeout(() => input?.dispatchEvent(new Event("change")));

      const ev = await oneEvent(el, "bl-change");

      expect(ev).to.exist;
      expect(ev.detail).to.be.equal("some value");
    });
  });

  describe("form integration", () => {
    it("should show errors when parent form is submitted", async () => {
      const form = await fixture<HTMLFormElement>(html`<form novalidate>
        <bl-input required></bl-input>
      </form>`);

      const blInput = form.querySelector<BlInput>("bl-input");

      form.addEventListener("submit", e => e.preventDefault());

      form.dispatchEvent(new SubmitEvent("submit", { cancelable: true }));

      await elementUpdated(form);

      const errorMessageElement = <HTMLParagraphElement>(
        blInput?.shadowRoot?.querySelector(".invalid-text")
      );

      expect(blInput?.validity.valid).to.be.false;

      expect(errorMessageElement).to.exist;
    });

    it("should submit parent form when pressed Enter key", async () => {
      const form = await fixture<HTMLFormElement>(html`<form novalidate>
        <bl-input name="user" value="name"></bl-input>
        <button type="submit">Submit</button>
      </form>`);

      const blInput = form.querySelector<BlInput>("bl-input");

      await elementUpdated(form);

      const submitEvent = new Promise(resolve => {
        function listener(ev: SubmitEvent) {
          ev.preventDefault();
          resolve(ev);
          form.removeEventListener("submit", listener);
        }
        form.addEventListener("submit", listener);
      });

      const enterEvent = new KeyboardEvent("keydown", {
        code: "Enter",
        cancelable: true,
      });

      blInput?.dispatchEvent(enterEvent);

      const ev = await submitEvent;

      expect(ev).to.exist;
    });

    it("should not submit if keydown event is prevented", async () => {
      const form = await fixture<HTMLFormElement>(html`<form novalidate>
        <bl-input name="user" value="name"></bl-input>
        <button type="submit">Submit</button>
      </form>`);

      const blInput = form.querySelector<BlInput>("bl-input");

      blInput?.addEventListener("keydown", e => e.preventDefault());

      await elementUpdated(form);

      let eventFired = false;

      form.addEventListener("submit", e => {
        e.preventDefault();
        eventFired = true;
      });

      const enterEvent = new KeyboardEvent("keydown", {
        code: "Enter",
        cancelable: true,
      });

      blInput?.dispatchEvent(enterEvent);

      expect(eventFired).to.be.false;
    });
  });

  describe("loading state and custom icons", () => {
    it("shows spinner when loading and type is search with non-empty value", async () => {
      const el = await fixture<BlInput>(html`<bl-input loading type="search" value="test"></bl-input>`);
      const spinner = el.shadowRoot?.querySelector("bl-spinner");

      expect(spinner).to.exist;
      expect(spinner?.getAttribute("size")).to.equal("var(--bl-font-size-m)");
    });

    it("shows custom icon when loading is false", async () => {
      const el = await fixture<BlInput>(html`<bl-input icon="info"></bl-input>`);
      const customIcon = el.shadowRoot?.querySelector('bl-icon[name="info"]');

      expect(customIcon).to.exist;
      expect(customIcon?.getAttribute("name")).to.equal("info");
    });

    it("shows error icon when no custom icon is set and loading is false", async () => {
      const el = await fixture<BlInput>(html`<bl-input></bl-input>`);
      const errorIcon = el.shadowRoot?.querySelector('bl-icon[name="alert"]');

      expect(errorIcon).to.exist;
      expect(errorIcon?.getAttribute("name")).to.equal("alert");
    });

    it("does not show spinner when loading is true but type is not search", async () => {
      const el = await fixture<BlInput>(html`<bl-input loading type="text" value="test"></bl-input>`);
      const spinner = el.shadowRoot?.querySelector("bl-spinner");

      expect(spinner).to.not.exist;
    });

    it("does not show spinner when loading is true but value is empty", async () => {
      const el = await fixture<BlInput>(html`<bl-input loading type="search" value=""></bl-input>`);
      const spinner = el.shadowRoot?.querySelector("bl-spinner");

      expect(spinner).to.not.exist;
    });

    it("does not show spinner when loading is false", async () => {
      const el = await fixture<BlInput>(html`<bl-input type="search" value="test"></bl-input>`);
      const spinner = el.shadowRoot?.querySelector("bl-spinner");

      expect(spinner).to.not.exist;
    });
  });
});
