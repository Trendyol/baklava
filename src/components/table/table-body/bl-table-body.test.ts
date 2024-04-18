import { expect, fixture, html } from "@open-wc/testing";
import BlTableBody from "./bl-table-body";

describe("bl-table-body", () => {
  it("should be defined table-body instance", () => {
    //when
    const el = document.createElement("bl-table-body");

    //then
    expect(el).instanceOf(BlTableBody);
  });

  it("should be rendered with default values", async () => {
    //when
    const el = await fixture<BlTableBody>(html`<bl-table-body></bl-table-body>`);

    //then
    expect(el).shadowDom.equal(
      "<slot></slot>"
    );
  });
});
