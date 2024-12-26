import { assert, aTimeout, expect, fixture, html, waitUntil } from "@open-wc/testing";
import { spy } from "sinon";
import BlAccordion from "./bl-accordion";

describe("bl-accordion", () => {
  it("is defined", () => {
    const el = document.createElement("bl-accordion");

    assert.instanceOf(el, BlAccordion);
  });

  it("renders with default values", async () => {
    const el = await fixture<BlAccordion>(html`
      <bl-accordion></bl-accordion>`);

    assert.shadowDom.equal(
      el,
      `<details class="accordion">
        <summary aria-controls="content" aria-disabled="false" aria-expanded="false" class="summary" tabindex="0">
          <slot name="caption">
            <span class="caption">
            </span>
          </slot>
          <bl-icon
            class="indicator"
            name="arrow_down"
          >
          </bl-icon>
        </summary>
        <div aria-labelledby="header" class="accordion-content" id="content" role="region">
          <slot>
          </slot>
        </div>
      </details>`
    );
  });

  it("should set icon", async () => {
    const el = await fixture<BlAccordion>(html`<bl-accordion icon="eye_on"></bl-accordion>`);

    await el.updateComplete;
    const iconEl = el.shadowRoot!.querySelector(".icon")!;

    expect(iconEl.getAttribute("name")).to.eq("eye_on");
  });

  it("should set info icon when icon is boolean", async () => {
    const el = await fixture<BlAccordion>(html`<bl-accordion icon></bl-accordion>`);

    const iconEl = el.shadowRoot!.querySelector(".icon")!;

    expect(iconEl.getAttribute("name")).to.eq("info");
  });

  it("should set caption", async () => {
    const captionText = "Best caption";
    const el = await fixture<BlAccordion>(html`<bl-accordion caption="${captionText}"></bl-accordion>`);
    const captionEl = el.shadowRoot?.querySelector<HTMLSpanElement>(".caption");

    expect(captionEl).to.exist;
    expect(captionEl!.innerText).to.eq(captionText);
  });

  it("should set caption via slot", async () => {
    const captionText = "Best caption";
    const el = await fixture<BlAccordion>(html`<bl-accordion><div slot="caption">${captionText}</div></bl-accordion>`);
    const captionSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="caption"]');
    const captionSlotContent = captionSlot!.assignedNodes()[0] as HTMLDivElement;

    expect(captionSlotContent.innerText).to.eq(captionText);
  });

  it("should be visible with the open attribute", async () => {
    const el = await fixture<BlAccordion>(html`
      <bl-accordion open>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Molestie at elementum eu facilisis. Morbi quis commodo odio aenean sed adipiscing diam
        donec.
      </bl-accordion>`);

    const body = el.shadowRoot!.querySelector(".accordion-content")!;

    expect(body.clientHeight).greaterThan(0);
  });

  it("should not be visible without the open attribute", async () => {
    const el = await fixture<BlAccordion>(html`
      <bl-accordion>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Molestie at elementum eu facilisis. Morbi quis commodo odio aenean sed adipiscing diam
        donec.
      </bl-accordion>`);

    const body = el.shadowRoot!.querySelector(".accordion-content")!;

    // Only check for display: none since that's what we're using in the CSS
    expect(getComputedStyle(body).display).to.equal("none");
  });

  it("should emit bl-toggle when click on collapsed accordion", async () => {
    const el = await fixture<BlAccordion>(html`
      <bl-accordion>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Molestie at elementum eu facilisis. Morbi quis commodo odio aenean sed adipiscing diam
        donec.
      </bl-accordion>`);

    const toggleHandler = spy();

    el.addEventListener("bl-toggle", (e) => toggleHandler((e as CustomEvent).detail));

    const summary = el.shadowRoot!.querySelector("summary")!;

    summary.click();

    await waitUntil(() => toggleHandler.calledOnce);

    expect(toggleHandler).to.have.been.calledWith(true);
  });

  it("should emit bl-toggle when click on expanded accordion", async () => {
    const el = await fixture<BlAccordion>(html`
      <bl-accordion open>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Molestie at elementum eu facilisis. Morbi quis commodo odio aenean sed adipiscing diam
        donec.
      </bl-accordion>`);

    const toggleHandler = spy();

    el.addEventListener("bl-toggle", (e) => toggleHandler((e as CustomEvent).detail));

    const summary = el.shadowRoot!.querySelector("summary")!;

    summary.click();

    await waitUntil(() => toggleHandler.calledOnce);

    expect(toggleHandler).to.have.been.calledWith(false);
  });

  it("should not open when disabled", async () => {
    const el = await fixture<BlAccordion>(html`
      <bl-accordion disabled>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Molestie at elementum eu facilisis. Morbi quis commodo odio aenean sed adipiscing diam
        donec.
      </bl-accordion>`);

    const summary = el.shadowRoot!.querySelector("summary")!;

    summary.click();

    expect(el.open).to.eq(false);
  });

  it("should not change open attribute when disabled", async () => {
    const el = await fixture<BlAccordion>(html`
      <bl-accordion disabled open>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Molestie at elementum eu facilisis. Morbi quis commodo odio aenean sed adipiscing diam
        donec.
      </bl-accordion>`);

    expect(el.open).to.eq(false);
  });

  it("should not affect animation", async () => {
    const el = await fixture<BlAccordion>(html`
      <bl-accordion>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Molestie at elementum eu facilisis. Morbi quis commodo odio aenean sed adipiscing diam
        donec.
      </bl-accordion>`);

    const summary = el.shadowRoot!.querySelector("summary")!;

    summary.click();
    summary.click();
    summary.click();

    await aTimeout(200);
    expect(el.open).to.eq(true);
  });
});
