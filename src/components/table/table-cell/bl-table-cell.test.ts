import { expect, fixture, html } from "@open-wc/testing";
import BlTableCell from "./bl-table-cell";

describe("bl-table-cell", () => {
  it("should be defined table-cell instance", () => {
    //when
    const el = document.createElement("bl-table-cell");

    //then
    expect(el).instanceOf(BlTableCell);
    expect(el.index).to.equal(-1);
    expect(el.selectionKey).to.equal("");
  });

  it("should be rendered with default values", async () => {
    //when
    const el = await fixture<BlTableCell>(html`<bl-table-cell></bl-table-cell>`);

    //then
    expect(el).shadowDom.equal(
      `<div class='table-cell'>
        <slot></slot>
      </div>`
    );
  });
});
