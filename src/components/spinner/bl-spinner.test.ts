import { assert, expect, fixture, html, elementUpdated } from "@open-wc/testing";
import BlSpinner from "./bl-spinner";

import type typeOfBlSpinner from "./bl-spinner";
import BlIcon from "../icon/bl-icon";

describe("bl-spinner", () => {
  it("is defined", () => {
    const el = document.createElement("bl-spinner");

    assert.instanceOf(el, BlSpinner);
  });

  it("renders with default values", async () => {
    const el = await fixture<typeOfBlSpinner>(html`<bl-spinner></bl-spinner>`);

    assert.shadowDom.equal(
      el,
      "<bl-icon class=\"spinner\" name=\"loading\" style=\"color: var(--bl-color-primary); font-size: var(--bl-font-size-m);\"></bl-icon>"
    );
  });

  it("check default values", async () => {
    const el = await fixture<typeOfBlSpinner>(html`<bl-spinner></bl-spinner>`);

    expect(el.size).to.equal("var(--bl-font-size-m)");
    expect(el.disabled).to.equal(false);
    expect(el.overlay).to.equal(false);
    expect(el.color).to.equal("var(--bl-color-primary)");
  });

  it("sets spinner size", async () => {
    const el = await fixture<typeOfBlSpinner>(html`<bl-spinner size="var(--bl-font-size-l)"></bl-spinner>`);

    await elementUpdated(el);

    expect(el.size).to.equal("var(--bl-font-size-l)");
    const spinner = el.shadowRoot?.querySelector("bl-icon");

    expect(spinner?.style.fontSize).to.equal("var(--bl-font-size-l)");
  });

  it("sets spinner color", async () => {
    const el = await fixture<typeOfBlSpinner>(html`<bl-spinner color="var(--bl-color-secondary)"></bl-spinner>`);

    await elementUpdated(el);

    expect(el.color).to.equal("var(--bl-color-secondary)");
    const spinner = el.shadowRoot?.querySelector("bl-icon");

    expect(spinner?.style.color).to.equal("var(--bl-color-secondary)");
  });

  it("sets disabled state", async () => {
    const el = await fixture<typeOfBlSpinner>(html`<bl-spinner disabled></bl-spinner>`);

    await elementUpdated(el);

    expect(el.disabled).to.equal(true);
    const spinner = el.shadowRoot?.querySelector("bl-icon");

    expect(spinner?.style.color).to.equal("var(--bl-color-neutral-light)");
  });

  it("sets overlay state", async () => {
    const el = await fixture<typeOfBlSpinner>(html`<bl-spinner overlay></bl-spinner>`);

    await elementUpdated(el);

    expect(el.overlay).to.equal(true);
    expect(el).to.have.attribute("overlay");
    expect(el.shadowRoot?.querySelector("bl-icon")).to.exist;
  });

  it("applies correct styles for overlay state", async () => {
    const el = await fixture<typeOfBlSpinner>(html`<bl-spinner overlay></bl-spinner>`);

    await elementUpdated(el);

    expect(el.overlay).to.equal(true);
    expect(el).to.have.attribute("overlay");
    const style = getComputedStyle(el);

    expect(style.position).to.equal("absolute");
    expect(style.top).to.equal("0px");
    expect(style.left).to.equal("0px");
    expect(style.backgroundColor).to.equal("rgba(39, 49, 66, 0.7)");
    expect(style.zIndex).to.equal("400");
  });

  it("applies spin animation", async () => {
    const el = await fixture<typeOfBlSpinner>(html`<bl-spinner></bl-spinner>`);
    const spinner = el.shadowRoot?.querySelector("bl-icon");

    const style = getComputedStyle(spinner as BlIcon);

    expect(style.animationName).to.equal("spin");
    expect(style.animationDuration).to.equal("1s");
    expect(style.animationTimingFunction).to.equal("linear");
    expect(style.animationIterationCount).to.equal("infinite");
  });

  it("uses --bl-spinner-duration for the spin animation", async () => {
    //given
    const el = await fixture<typeOfBlSpinner>(html`<bl-spinner></bl-spinner>`);

    el.style.setProperty("--bl-spinner-duration", "2s");

    //when
    await elementUpdated(el);
    const style = getComputedStyle(el.shadowRoot?.querySelector("bl-icon") as BlIcon);

    //then
    expect(style.animationDuration).to.equal("2s");
  });

  it("uses --bl-spinner-overlay-z-index for the overlay", async () => {
    //given
    const el = await fixture<typeOfBlSpinner>(html`<bl-spinner overlay></bl-spinner>`);

    el.style.setProperty("--bl-spinner-overlay-z-index", "123");

    //when
    await elementUpdated(el);

    //then
    expect(getComputedStyle(el).zIndex).to.equal("123");
  });

  it("falls back to --bl-index-overlay when no z-index is set", async () => {
    //given
    const el = await fixture<typeOfBlSpinner>(html`<bl-spinner overlay></bl-spinner>`);

    el.style.setProperty("--bl-index-overlay", "222");

    //when
    await elementUpdated(el);

    //then
    expect(getComputedStyle(el).zIndex).to.equal("222");
  });
});
