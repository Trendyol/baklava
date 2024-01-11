import { assert, elementUpdated, fixture, expect, html, oneEvent } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import BlSelectOption from "./bl-select-option";

describe("bl-select", () => {
  it("is defined", () => {
    const el = document.createElement("bl-select-option");

    assert.instanceOf(el, BlSelectOption);
  });

  it("renders with default values", async () => {
    const el = await fixture<BlSelectOption>(html`<bl-select-option></bl-select-option>`);

    expect(el).shadowDom.equal(
      `<div class="option-container">
       <div class="focus-target single-option" role="option" aria-selected="false">
        <slot>
        </slot>
       </div>
      </div>
      `
    );
  });

  it("should have aria-selected attribute set to true if the option is selected", async function () {
    const el = await fixture<BlSelectOption>(
      html`<bl-select-option value="basketball" selected>Basketball</bl-select-option>`
    );

    const option = el.shadowRoot?.querySelector<HTMLButtonElement>(".focus-target");

    expect(option).has.attribute("aria-selected", "true");
  });

  describe("keyboard navigation", () => {
    it("should get focus", async () => {
      //when
      const el = await fixture<BlSelectOption>(
        html`<bl-select-option value="basketball">Basketball</bl-select-option>`
      );

      await elementUpdated(el);

      //given
      el.focus();

      await elementUpdated(el);

      //then
      expect(document.activeElement).to.equal(el);
    });

    it("should select with Space key", async () => {
      //when
      const el = await fixture<BlSelectOption>(
        html`<bl-select-option value="basketball">Basketball</bl-select-option>`
      );

      await elementUpdated(el);

      //given
      el.focus();

      await elementUpdated(el);

      sendKeys({
        press: "Space",
      });

      //then
      const event = await oneEvent(el, "bl-select-option");

      expect(event).to.exist;
      expect(event.detail).to.equal("basketball");
    });
  });
});
