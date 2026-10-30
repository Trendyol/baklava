import { expect, fixture, html } from "@open-wc/testing";
import BlRadio from "./bl-radio";

describe("bl-radio", () => {
  it("should be defined radio instance", () => {
    //when
    const el = document.createElement("bl-radio");

    //then
    expect(el).instanceOf(BlRadio);
  });

  it("should be rendered with default values", async () => {
    //when
    const el = await fixture<BlRadio>(html`<bl-radio value="cc">Credit Card</bl-radio>`);

    //then
    expect(el).shadowDom.equal(
      `<div
        aria-disabled="false"
        aria-labelledby="label"
        aria-checked="false"
        class="wrapper"
        role="radio"
       >
        <p id="label">
          <slot></slot>
       </p>
      </div>`
    );
  });

  describe("host display", () => {
    const createInContainer = (hostStyles: string) =>
      fixture<HTMLDivElement>(html`
        <div style="width: 400px; display: flow-root">
          <bl-radio value="cc" style="${hostStyles}">CC</bl-radio>
        </div>
      `);

    it("should not stretch the clickable area to the container width", async () => {
      //when
      const container = await createInContainer("");
      const el = container.querySelector<BlRadio>("bl-radio");

      //then
      expect(getComputedStyle(el!).display).to.equal("inline-block");
      expect(el!.shadowRoot!.querySelector<HTMLElement>(".wrapper")!.offsetWidth).to.be.lessThan(
        container.offsetWidth / 2
      );
    });

    it("should keep the host display overridable from outside", async () => {
      //when
      const container = await createInContainer("display: block");
      const el = container.querySelector<BlRadio>("bl-radio");

      //then
      expect(getComputedStyle(el!).display).to.equal("block");
      expect(el!.shadowRoot!.querySelector<HTMLElement>(".wrapper")!.offsetWidth).to.equal(
        container.offsetWidth
      );
    });
  });
});
