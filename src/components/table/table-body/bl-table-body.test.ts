import { expect, fixture, html } from "@open-wc/testing";
import BlTableBody from "./bl-table-body";

describe("bl-table-body", () => {
  it("should be defined table-body instance", () => {
    //when
    const el = document.createElement("bl-table-body");

    //then
    expect(el).instanceOf(BlTableBody);
  });

  it("should render simple slot when table rows exist", async () => {
    //when
    const el = await fixture<BlTableBody>(html`
      <bl-table-body>
        <bl-table-row></bl-table-row>
      </bl-table-body>
    `);

    //then
    expect(el).shadowDom.equal("<slot></slot>");
  });

  it("should render no-data view when no table rows exist", async () => {
    //when
    const el = await fixture<BlTableBody>(html`<bl-table-body></bl-table-body>`);

    //then
    expect(el).shadowDom.equal(`
      <tr class="no-data-row">
        <td class="no-data-cell" colspan="999">
          <slot name="no-data">
            <div class="default-no-data">
              <bl-icon name="info"></bl-icon>
              <p class="title">No data available</p>
              <p class="subtitle">There are currently no records to display.</p>
            </div>
          </slot>
        </td>
      </tr>
    `);
  });
});
