import { elementUpdated, assert, fixture, html, expect, oneEvent } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import BlSwitch from "./bl-switch";

describe("bl-switch", () => {
  it("should be defined switch instance", () => {
    const el = document.createElement("bl-switch");

    assert.instanceOf(el, BlSwitch);
  });

  it("should be rendered with default values", async () => {
    const el = await fixture(html`<bl-switch></bl-switch>`);

    assert.shadowDom.equal(
      el,
      `
      <label>
        <slot class="label">
        </slot>
        <span
          aria-busy="false"
          aria-checked="false"
          aria-readonly="false"
          class="switch"
          role="switch"
          tabindex="0"
        >
        </span>
      </label>
      `
    );
  });

  describe("attributes", () => {
    it("should have a switch role", async () => {
      const el = await fixture(html`<bl-switch checked></bl-switch>`);

      expect(el.shadowRoot?.querySelector(".switch")?.getAttribute("role")).to.eq("switch");
    });
  });

  describe("accessibility", () => {
    it("should render with `aria-checked` attribute as checked value", async () => {
      const el = await fixture(html`<bl-switch checked></bl-switch>`);

      expect(el.shadowRoot?.querySelector(".switch")?.getAttribute("aria-checked")).to.equal(
        "true"
      );
    });

    it("should render with `aria-readonly` attribute as disabled", async () => {
      const el = await fixture(html`<bl-switch disabled></bl-switch>`);

      expect(el.shadowRoot?.querySelector(".switch")?.getAttribute("aria-readonly")).to.equal(
        "true"
      );
    });

    it("should render with `aria-label` attribute if provided", async () => {
      const el = await fixture(
        html`<bl-switch disabled aria-label="Label for switch"></bl-switch>`
      );

      expect(el.shadowRoot?.querySelector(".switch")?.getAttribute("aria-label")).to.equal(
        "Label for switch"
      );
    });

    it("should toggle the state when Enter or Space key is pressed", async () => {
      const el = await fixture<BlSwitch>(html`<bl-switch></bl-switch>`);

      await elementUpdated(el);

      await sendKeys({
        press: "Tab",
      });
      await sendKeys({
        press: "Enter",
      });
      expect(el.checked).to.be.true;

      await sendKeys({
        press: "Space",
      });
      expect(el.checked).to.be.false;
    });

    it("should not toggle the state when switch is disabled and Enter or Space key is pressed", async () => {
      const el = await fixture<BlSwitch>(html`<bl-switch disabled></bl-switch>`);

      await elementUpdated(el);

      await sendKeys({
        press: "Tab",
      });
      await sendKeys({
        press: "Enter",
      });
      expect(el.checked).to.be.false;
    });
  });

  describe("events", () => {
    it("should fire bl-switch-toggle event with detail as true when switch is checked", async () => {
      const el = await fixture<BlSwitch>(html`<bl-switch></bl-switch>`);
      const switchElement = el.shadowRoot?.querySelector<HTMLSpanElement>(".switch");

      setTimeout(() => switchElement?.click());
      const ev = await oneEvent(el, "bl-switch-toggle");

      expect(el.checked).to.be.true;
      expect(ev).to.exist;
      expect(ev.detail).to.be.true;
    });

    it("should not fire bl-switch-toggle event when the disabled switch is clicked", async () => {
      const el = await fixture<BlSwitch>(html`<bl-switch disabled></bl-switch>`);
      const switchElement = el.shadowRoot?.querySelector<HTMLSpanElement>(".switch");

      setTimeout(() => switchElement?.click());
      expect(el.checked).not.to.be.true;
    });

    it("should fire bl-switch-toggle event when element is toggled programmatically", async () => {
      const el = await fixture<BlSwitch>(html`<bl-switch></bl-switch>`);

      setTimeout(() => el.toggle());
      const ev = await oneEvent(el, "bl-switch-toggle");

      expect(el.checked).to.be.true;
      expect(ev).to.exist;
      expect(ev.detail).to.be.true;
    });
  });

  describe("loading state", () => {
    it("should render with loading attribute", async () => {
      const el = await fixture<BlSwitch>(html`<bl-switch loading></bl-switch>`);

      expect(el.loading).to.be.true;
      expect(el.hasAttribute("loading")).to.be.true;
    });

    it("should render a loading spinner when loading", async () => {
      const el = await fixture<BlSwitch>(html`<bl-switch loading></bl-switch>`);
      const spinner = el.shadowRoot?.querySelector("bl-spinner");

      expect(spinner).to.exist;
    });

    it("should not render a loading spinner when not loading", async () => {
      const el = await fixture<BlSwitch>(html`<bl-switch></bl-switch>`);
      const spinner = el.shadowRoot?.querySelector("bl-spinner");

      expect(spinner).to.not.exist;
    });

    it("should not toggle when loading", async () => {
      const el = await fixture<BlSwitch>(html`<bl-switch loading></bl-switch>`);
      const switchElement = el.shadowRoot?.querySelector<HTMLSpanElement>(".switch");

      switchElement?.click();
      expect(el.checked).to.be.false;
    });

    it("should not toggle programmatically when loading", async () => {
      const el = await fixture<BlSwitch>(html`<bl-switch loading></bl-switch>`);

      el.toggle();
      expect(el.checked).to.be.false;
    });

    it("should set aria-busy to true when loading", async () => {
      const el = await fixture<BlSwitch>(html`<bl-switch loading></bl-switch>`);
      const switchElement = el.shadowRoot?.querySelector(".switch");

      expect(switchElement?.getAttribute("aria-busy")).to.equal("true");
    });

    it("should set aria-readonly to true when loading", async () => {
      const el = await fixture<BlSwitch>(html`<bl-switch loading></bl-switch>`);
      const switchElement = el.shadowRoot?.querySelector(".switch");

      expect(switchElement?.getAttribute("aria-readonly")).to.equal("true");
    });

    it("should not toggle the state when switch is loading and Enter key is pressed", async () => {
      const el = await fixture<BlSwitch>(html`<bl-switch loading></bl-switch>`);

      await elementUpdated(el);

      await sendKeys({
        press: "Tab",
      });
      await sendKeys({
        press: "Enter",
      });
      expect(el.checked).to.be.false;
    });
  });
});
