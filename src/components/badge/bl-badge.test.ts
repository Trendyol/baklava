import { assert, elementUpdated, expect, fixture, html } from "@open-wc/testing";
import BlBadge from "./bl-badge";
import type typeOfBlBadge from "./bl-badge";

describe("bl-badge", () => {
  it("should be defined badge instance", () => {
    //when
    const el = document.createElement("bl-badge");

    //then
    assert.instanceOf(el, BlBadge);
  });

  it("should be rendered with default values", async () => {
    //when
    const el = await fixture<typeOfBlBadge>(html`<bl-badge></bl-badge>`);

    //then
    assert.shadowDom.equal(
      el,
      `
        <span class="badge">
          <slot name="icon"></slot>
          <slot></slot>
        </span>
      `
    );
  });

  it("should have correct default values", async () => {
    //when
    const el = await fixture<typeOfBlBadge>(html`<bl-badge>Test</bl-badge>`);

    //then
    expect(el.size).to.equal("medium");
  });

  it("should be rendered when there is slot", async () => {
    //when
    const el = await fixture<typeOfBlBadge>(html` <bl-badge><strong>Test</strong></bl-badge> `);

    //then
    expect(el.shadowRoot?.querySelector("span")).to.exist;
  });

  it("should be rendered with correct size attribute", async () => {
    //when
    const el = await fixture<typeOfBlBadge>(html`<bl-badge size="large">Test</bl-badge>`);

    //then
    expect(el.getAttribute("size")).to.eq("large");
  });

  it("should be rendered with correct size attribute when size attribute was changed", async () => {
    //given
    const el = await fixture<typeOfBlBadge>(html`<bl-badge size="large">Test</bl-badge>`);

    el.setAttribute("size", "medium");

    //when
    await elementUpdated(el);

    //then
    expect(el.getAttribute("size")).to.eq("medium");
  });

  it("should be rendered with icon", async () => {
    //when
    const el = await fixture<typeOfBlBadge>(html`<bl-badge icon="info">Test</bl-badge>`);

    //then
    expect(el.shadowRoot?.querySelector("bl-icon")).to.exist;
  });

  it("should not have icon when badge size is small", async () => {
    //when
    const el = await fixture(html`<bl-badge icon="info" size="small">Test</bl-badge>`);

    //then
    const iconEl = el.shadowRoot?.querySelector("bl-icon");

    expect(iconEl).to.exist;

    if (iconEl) {
      const visible = !!(
        iconEl.offsetWidth ||
        iconEl.offsetHeight ||
        iconEl.getClientRects().length
      );

      expect(visible).to.be.false;
    }
  });
});
