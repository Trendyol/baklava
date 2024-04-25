import { assert, aTimeout, expect, fixture, html } from "@open-wc/testing";
import BlAccordionGroup from "./bl-accordion-group";
import "./accordion/bl-accordion";
import BlAccordion from "./accordion/bl-accordion";

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
      await aTimeout(250);
    }

    await aTimeout(250);

    const openAccordions = el.querySelectorAll("bl-accordion[open]");

    expect(openAccordions.length).to.eq(1);
  });
});
