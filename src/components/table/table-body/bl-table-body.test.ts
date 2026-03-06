import { expect, fixture, html, elementUpdated } from "@open-wc/testing";
import { spy } from "sinon";
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

  it("should switch to slot view when rows are dynamically added", async () => {
    //given
    const el = await fixture<BlTableBody>(html`<bl-table-body></bl-table-body>`);

    //when
    const row = document.createElement("bl-table-row");

    el.appendChild(row);
    await elementUpdated(el);

    //then
    expect(el).shadowDom.equal("<slot></slot>");
  });

  it("should switch to no-data view when all rows are dynamically removed", async () => {
    //given
    const el = await fixture<BlTableBody>(html`
      <bl-table-body>
        <bl-table-row></bl-table-row>
      </bl-table-body>
    `);

    expect(el).shadowDom.equal("<slot></slot>");

    //when
    el.querySelector("bl-table-row")!.remove();
    await elementUpdated(el);

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

  it("should clean up MutationObserver on disconnect", async () => {
    //given
    const el = await fixture<BlTableBody>(html`<bl-table-body></bl-table-body>`);
    const disconnectSpy = spy(el["_mutationObserver"]!, "disconnect");

    //when
    el.remove();

    //then
    expect(disconnectSpy).to.have.been.calledOnce;
  });
});
