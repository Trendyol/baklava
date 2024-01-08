import { expect, fixture, html } from "@open-wc/testing";
import BlTableRow from "./bl-table-row";

describe("bl-table-row", () => {
  it("should be defined table-row instance", () => {
    //when
    const el = document.createElement("bl-table-row");

    //then
    expect(el).instanceOf(BlTableRow);
    expect(el.index).to.equal(-1);
  });

  it("should be rendered with default values", async () => {
    //when
    const el = await fixture<BlTableRow>(html`<bl-table-row></bl-table-row>`);

    //then
    expect(el).shadowDom.equal(
      "<slot></slot>"
    );
  });
});
