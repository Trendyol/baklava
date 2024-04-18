import { expect, fixture, html } from "@open-wc/testing";
import BlTableHeaderCell from "./bl-table-header-cell";

describe("bl-table-header-cell", () => {
  it("should be defined table-header-cell instance", () => {
    //when
    const el = document.createElement("bl-table-header-cell");

    //then
    expect(el).instanceOf(BlTableHeaderCell);
    expect(el.index).to.equal(-1);
  });

  it("should be rendered with default values", async () => {
    //when
    const el = await fixture<BlTableHeaderCell>(html`<bl-table-header-cell></bl-table-header-cell>`);

    //then
    expect(el).shadowDom.equal(
      `<div class='table-header-cell'>
        <slot></slot>
      </div>`
    );
  });
});
