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
});
