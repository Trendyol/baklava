import { assert, aTimeout, fixture, html, waitUntil } from "@open-wc/testing";
import "./accordion/bl-accordion";
import BlAccordion from "./accordion/bl-accordion";
import BlAccordionGroup from "./bl-accordion-group";

describe("bl-accordion-group", () => {
  it("is defined", () => {
    const el = document.createElement("bl-accordion-group");

    assert.instanceOf(el, BlAccordionGroup);
  });

  it("renders with default values", async () => {
    const el = await fixture<BlAccordionGroup>(html`
      <bl-accordion-group></bl-accordion-group>`);

    assert.shadowDom.equal(el, "<div class=\"accordion-group\"><slot /></div>");
  });

  it("should open only one accordion", async () => {
    const el = await fixture<BlAccordionGroup>(html`
      <bl-accordion-group>
        <bl-accordion></bl-accordion>
        <bl-accordion></bl-accordion>
        <bl-accordion></bl-accordion>
      </bl-accordion-group>`);

    await el.updateComplete;

    const accordions = el.querySelectorAll<BlAccordion>("bl-accordion")!;

    for (const accordion of accordions) {
      accordion.shadowRoot!.querySelector("summary")!.click();
      await aTimeout(400);
    }

    await aTimeout(400);

    await waitUntil(
      () => {
        const openAccordions = el.querySelectorAll("bl-accordion[open]");

        return openAccordions.length === 1;
      },
      "Expected only one accordion to be open",
      { timeout: 5000 }
    );
  });
});
