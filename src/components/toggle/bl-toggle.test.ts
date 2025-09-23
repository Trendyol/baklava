import { fixture, html, assert, expect, elementUpdated } from "@open-wc/testing";
import "./bl-toggle";
import BlToggle from "./bl-toggle";
import type typeOfBlToggle from "./bl-toggle";
import { sendKeys } from "@web/test-runner-commands";

describe("bl-toggle", () => {
  it("is defined", () => {
    const el = document.createElement("bl-toggle");

    assert.instanceOf(el, BlToggle);
  });

  it("renders with default values", async () => {
    const el = await fixture<typeOfBlToggle>(html`<bl-toggle></bl-toggle>`);

    assert.shadowDom.equal(
      el,
      `
    <div class="toggle text-contain" role="switch" aria-checked="false" tabindex="0">
      <span class="track text-contain">
        <span class="content false">
          <slot name="icon"></slot>
          <span class="label"></span>
        </span>
        <span class="content true">
          <slot name="icon"></slot>
          <span class="label"></span>
        </span>
      </span>
      <span class="thumb text-contain">
      <span class="content false">
        <slot name="icon"></slot>
        <span class="label"></span>
      </span>
      </span>
    </div>
    `
    );
  });
  it("check default values", async () => {
    const el = await fixture<typeOfBlToggle>(html`<bl-toggle>Button</bl-toggle>`);

    expect(el.checked).to.equal(false);
    expect(el.disabled).to.equal(false);
    expect(el.inverted).to.equal(false);

    // When there is default text content, has-content class should be applied
    const root = el.shadowRoot!.querySelector(".toggle") as HTMLElement;

    expect(root.classList.contains("has-content")).to.equal(true);
  });

  describe("attributes", () => {
    it("should handle attributes properly", async () => {
      const el = await fixture<typeOfBlToggle>(html`<bl-toggle disabled inverted checked></bl-toggle>`);

      expect(el.checked).to.equal(true);
      expect(el.disabled).to.equal(true);
      expect(el.inverted).to.equal(true);

      // Disabled at connect time should set tabindex to -1 on host
      expect(el.tabIndex).to.equal(-1);
    });
  });

  it("should toggle the state when Enter or Space key is pressed", async () => {
    const el = await fixture<BlToggle>(html`<bl-toggle></bl-toggle>`);

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

    // aria-checked on host should reflect
    expect(el.getAttribute("aria-checked")).to.equal("false");
  });

  it("prevents toggle when disabled (click and keyboard) and syncs ARIA/tabIndex", async () => {
    const el = await fixture<BlToggle>(html`<bl-toggle></bl-toggle>`);

    // Initially enabled: tabindex 0
    expect(el.tabIndex).to.equal(0);
    const root = el.shadowRoot!.querySelector(".toggle") as HTMLElement;

    // Enable disabled dynamically and verify aria-disabled + tabIndex change
    el.disabled = true;
    await elementUpdated(el);
    expect(el.tabIndex).to.equal(-1);
    expect(el.getAttribute("aria-disabled")).to.equal("true");

    // Try to click and press keys, state should not change and no event dispatched
    let fired = false;

    el.addEventListener("bl-toggle-change", () => (fired = true));

    root.click();
    await elementUpdated(el);
    expect(el.checked).to.equal(false);

    await sendKeys({ press: "Enter" });
    await elementUpdated(el);
    expect(el.checked).to.equal(false);
    expect(fired).to.equal(false);

    // Re-enable and ensure aria-disabled removed and tabIndex restored
    el.disabled = false;
    await elementUpdated(el);
    expect(el.tabIndex).to.equal(0);
    expect(el.hasAttribute("aria-disabled")).to.equal(false);
  });

  it("applies has-content when there is an unslotted child element", async () => {
    const el = await fixture<BlToggle>(html`<bl-toggle><span>child</span></bl-toggle>`);
    const root = el.shadowRoot!.querySelector(".toggle") as HTMLElement;

    expect(root.classList.contains("has-content")).to.equal(true);
  });

  it("applies has-icon when an icon is provided via slot", async () => {
    const el = await fixture<BlToggle>(html`<bl-toggle><span slot="icon">i</span></bl-toggle>`);
    const root = el.shadowRoot!.querySelector(".toggle") as HTMLElement;

    expect(root.classList.contains("has-icon")).to.equal(true);
  });

  it("renders icon templates when icon-* attributes are set", async () => {
    const el = await fixture<BlToggle>(html`<bl-toggle icon-false="home" icon-true="award"></bl-toggle>`);
    const shadow = el.shadowRoot!;

    // Fallback content of slots should render bl-icon elements in both true/false labels
    const labelEls = shadow.querySelectorAll(".content");

    labelEls.forEach(label => {
      expect((label as HTMLElement).querySelector("bl-icon")).to.exist;
    });

    // Thumb should also contain a bl-icon fallback
    const thumb = shadow.querySelector(".thumb")!;

    expect(thumb.querySelector("bl-icon")).to.exist;

    // has-icon class should be applied
    const root = shadow.querySelector(".toggle") as HTMLElement;

    expect(root.classList.contains("has-icon")).to.equal(true);
  });

  it("resolves aria-label from attribute", async () => {
    const el = await fixture<BlToggle>(html`<bl-toggle aria-label="Power"></bl-toggle>`);
    const root = el.shadowRoot!.querySelector(".toggle") as HTMLElement;

    expect(root.getAttribute("aria-label")).to.equal("Power");
  });
});
