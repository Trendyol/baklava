import { assert, expect, fixture, html } from "@open-wc/testing";
import BlSkeleton from "./bl-skeleton";

import type typeOfBlSkeleton from "./bl-skeleton";

describe("bl-skeleton", () => {
  it("is defined", () => {
    const el = document.createElement("bl-skeleton");

    assert.instanceOf(el, BlSkeleton);
  });

  it("renders with default values", async () => {
    const el = await fixture<typeOfBlSkeleton>(html`<bl-skeleton></bl-skeleton>`);

    assert.shadowDom.equal(
      el,
      "<div class=\"skeleton\" role=\"presentation\" aria-hidden=\"true\" style=\"\"></div>"
    );
  });

  it("has correct default property values", async () => {
    const el = await fixture<typeOfBlSkeleton>(html`<bl-skeleton></bl-skeleton>`);

    expect(el.variant).to.equal("rect");
    expect(el.effect).to.equal("pulse");
    expect(el.width).to.be.undefined;
    expect(el.height).to.be.undefined;
  });

  it("reflects variant attribute", async () => {
    const el = await fixture<typeOfBlSkeleton>(
      html`<bl-skeleton variant="circle"></bl-skeleton>`
    );

    expect(el.variant).to.equal("circle");
    expect(el.getAttribute("variant")).to.equal("circle");
  });

  it("reflects effect attribute", async () => {
    const el = await fixture<typeOfBlSkeleton>(
      html`<bl-skeleton effect="wave"></bl-skeleton>`
    );

    expect(el.effect).to.equal("wave");
    expect(el.getAttribute("effect")).to.equal("wave");
  });

  it("applies custom width via inline style", async () => {
    const el = await fixture<typeOfBlSkeleton>(
      html`<bl-skeleton width="200px"></bl-skeleton>`
    );
    const skeleton = el.shadowRoot!.querySelector<HTMLElement>(".skeleton")!;

    expect(skeleton.style.width).to.equal("200px");
  });

  it("applies custom height via inline style", async () => {
    const el = await fixture<typeOfBlSkeleton>(
      html`<bl-skeleton height="50px"></bl-skeleton>`
    );
    const skeleton = el.shadowRoot!.querySelector<HTMLElement>(".skeleton")!;

    expect(skeleton.style.height).to.equal("50px");
  });

  it("applies both width and height", async () => {
    const el = await fixture<typeOfBlSkeleton>(
      html`<bl-skeleton width="300px" height="100px"></bl-skeleton>`
    );
    const skeleton = el.shadowRoot!.querySelector<HTMLElement>(".skeleton")!;

    expect(skeleton.style.width).to.equal("300px");
    expect(skeleton.style.height).to.equal("100px");
  });

  it("does not set inline width/height when not provided", async () => {
    const el = await fixture<typeOfBlSkeleton>(html`<bl-skeleton></bl-skeleton>`);
    const skeleton = el.shadowRoot!.querySelector<HTMLElement>(".skeleton")!;

    expect(skeleton.style.width).to.equal("");
    expect(skeleton.style.height).to.equal("");
  });

  it("sets role=presentation and aria-hidden=true for accessibility", async () => {
    const el = await fixture<typeOfBlSkeleton>(html`<bl-skeleton></bl-skeleton>`);
    const skeleton = el.shadowRoot!.querySelector(".skeleton")!;

    expect(skeleton.getAttribute("role")).to.equal("presentation");
    expect(skeleton.getAttribute("aria-hidden")).to.equal("true");
  });

  it("supports text variant", async () => {
    const el = await fixture<typeOfBlSkeleton>(
      html`<bl-skeleton variant="text"></bl-skeleton>`
    );

    expect(el.variant).to.equal("text");
    expect(el.getAttribute("variant")).to.equal("text");
  });

  it("supports none effect", async () => {
    const el = await fixture<typeOfBlSkeleton>(
      html`<bl-skeleton effect="none"></bl-skeleton>`
    );

    expect(el.effect).to.equal("none");
    expect(el.getAttribute("effect")).to.equal("none");
  });

  it("renders as block-level element by default", async () => {
    const el = await fixture<typeOfBlSkeleton>(html`<bl-skeleton></bl-skeleton>`);

    expect(getComputedStyle(el).display).to.equal("block");
  });
});
