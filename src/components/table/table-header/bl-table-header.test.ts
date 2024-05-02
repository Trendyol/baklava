import { expect, fixture, html } from "@open-wc/testing";
import BlTableHeader from "./bl-table-header";

describe("bl-table-header", () => {
  it("should be defined table-header instance", () => {
    //when
    const el = document.createElement("bl-table-header");

    //then
    expect(el).instanceOf(BlTableHeader);
  });

  it("should be rendered with default values", async () => {
    //when
    const el = await fixture<BlTableHeader>(html`<bl-table-header></bl-table-header>`);

    //then
    expect(el).shadowDom.equal(
      "<slot></slot>"
    );
  });
});
