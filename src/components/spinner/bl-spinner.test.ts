import { assert, expect, fixture, html, elementUpdated } from "@open-wc/testing";
import BlSpinner from "./bl-spinner";

import type typeOfBlSpinner from "./bl-spinner";
import { BlIcon } from "../../baklava-react";

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
    expect(style.backgroundColor).to.equal("rgba(250, 250, 250, 0.5)");
    expect(style.zIndex).to.equal("10");
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
});
