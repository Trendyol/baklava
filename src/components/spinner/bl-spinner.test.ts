import { fixture, expect } from "@open-wc/testing";
import { html } from "lit-html";
import "./bl-spinner";
import BlSpinner, { SpinnerSize } from "./bl-spinner";

describe("bl-spinner", () => {
  it("renders correctly with default properties", async () => {
    const el = await fixture<BlSpinner>(html`<bl-spinner></bl-spinner>`);

    expect(el.size).to.equal("medium");
    expect(el.disabled).to.be.false;
    expect(el.overlay).to.be.false;
  });

  it("applies size property correctly", async () => {
    const sizes: SpinnerSize[] = ["xxsmall", "xsmall", "small", "medium", "large", "xlarge", "xxlarge"];

    for (const size of sizes) {
      const el = await fixture<BlSpinner>(html`<bl-spinner size=${size}></bl-spinner>`);

      expect(el.size).to.equal(size);
      const spinnerDiv = el.shadowRoot?.querySelector(".spinner");
      const computedStyle = getComputedStyle(spinnerDiv as Element);

      expect(computedStyle.width).to.not.be.empty;
      expect(computedStyle.height).to.not.be.empty;
    }
  });

  it("applies disabled state", async () => {
    const el = await fixture<BlSpinner>(html`<bl-spinner disabled></bl-spinner>`);

    expect(el.disabled).to.be.true;
    expect(el.hasAttribute("disabled")).to.be.true;

    const lightPath = el.shadowRoot?.querySelector(".light path");
    const darkPath = el.shadowRoot?.querySelector(".dark path");
    const lightPathColor = getComputedStyle(lightPath as Element).fill;
    const darkPathColor = getComputedStyle(darkPath as Element).fill;

    expect(lightPathColor).to.include("rgb(149, 161, 181)");
    expect(darkPathColor).to.include("rgb(149, 161, 181)");
  });

  it("applies overlay state", async () => {
    const el = await fixture<BlSpinner>(html`<bl-spinner overlay></bl-spinner>`);

    expect(el.overlay).to.be.true;
    expect(el.hasAttribute("overlay")).to.be.true;

    const spinnerDiv = el.shadowRoot?.querySelector(".spinner") as HTMLElement;
    const hostComputedStyle = getComputedStyle(el);

    expect(hostComputedStyle.position).to.equal("absolute");
    expect(hostComputedStyle.top).to.equal("0px");
    expect(hostComputedStyle.left).to.equal("0px");
    expect(hostComputedStyle.width).to.not.equal("auto");
    expect(hostComputedStyle.height).to.not.equal("auto");

    expect(spinnerDiv).to.exist;
  });


  it("renders light and dark SVG elements", async () => {
    const el = await fixture<BlSpinner>(html`<bl-spinner></bl-spinner>`);
    const lightSvg = el.shadowRoot?.querySelector(".light");
    const darkSvg = el.shadowRoot?.querySelector(".dark");

    expect(lightSvg).to.exist;
    expect(darkSvg).to.exist;
  });

  it("changes spinner color when disabled", async () => {
    const el = await fixture<BlSpinner>(html`<bl-spinner disabled></bl-spinner>`);
    const lightPath = el.shadowRoot?.querySelector(".light path");
    const darkPath = el.shadowRoot?.querySelector(".dark path");
    const lightPathColor = getComputedStyle(lightPath as Element).fill;
    const darkPathColor = getComputedStyle(darkPath as Element).fill;

    expect(lightPathColor).to.include("rgb(149, 161, 181)");
    expect(darkPathColor).to.include("rgb(149, 161, 181)");
  });
});
