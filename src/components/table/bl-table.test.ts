import {expect, fixture, html, oneEvent} from "@open-wc/testing";
import BlTable, { blRowSelectChangeEventName, blSortChangeEventName } from "./bl-table";
import  "./table-header/bl-table-header";
import  "./table-cell/bl-table-cell";
import  "./table-header-cell/bl-table-header-cell";
import  "./table-body/bl-table-body";
import  "./table-row/bl-table-row";

describe("bl-table", () => {
  it("should be defined table instance", () => {
    //when
    const el = document.createElement("bl-table");

    //then
    expect(el).instanceOf(BlTable);
  });

  it("should be rendered with default values", async () => {
    //when
    const el = await fixture<BlTable>(
      html`
        <bl-table>
          <bl-table-header >
            <bl-table-row>
              <bl-table-header-cell>
                ID
              </bl-table-header-cell>
              <bl-table-header-cell>
                First Name
              </bl-table-header-cell>
              <bl-table-header-cell>
                Last Name
              </bl-table-header-cell>
              <bl-table-header-cell>
                Email
              </bl-table-header-cell>
              <bl-table-header-cell>
                Gender
              </bl-table-header-cell>
              <bl-table-header-cell>
                IP Address
              </bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row>
              <bl-table-cell>
                1
              </bl-table-cell>
              <bl-table-cell>
                Antonella
              </bl-table-cell>
              <bl-table-cell>
                Bellefonte
              </bl-table-cell>
              <bl-table-cell>
                abellefonte0@nba.com
              </bl-table-cell>
              <bl-table-cell>
                Female
              </bl-table-cell>
              <bl-table-cell>
                193.108.174.118
              </bl-table-cell>
            </bl-table-row>
            <bl-table-row>
              <bl-table-cell>
                2
              </bl-table-cell>
              <bl-table-cell>
                Wash
              </bl-table-cell>
              <bl-table-cell>
                Carnson
              </bl-table-cell>
              <bl-table-cell>
                wcarnson1@jalbum.net
              </bl-table-cell>
              <bl-table-cell>
                Male
              </bl-table-cell>
              <bl-table-cell>
                255.169.128.60
              </bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>`
    );

    //then
    expect(el).shadowDom.equal(
      `<div class="table-wrapper">
      <div class="table">
        <table>
          <slot></slot>
        </table>
      </div>
    </div>`
    );
  });

  it("should be rendered with sortable", async () => {
    //when
    const el = await fixture<BlTable>(
      html`
        <bl-table sortable>
          <bl-table-header >
            <bl-table-row>
              <bl-table-header-cell sort-key="id">
                ID
              </bl-table-header-cell>
              <bl-table-header-cell>
                First Name
              </bl-table-header-cell>
              <bl-table-header-cell>
                Last Name
              </bl-table-header-cell>
              <bl-table-header-cell>
                Email
              </bl-table-header-cell>
              <bl-table-header-cell>
                Gender
              </bl-table-header-cell>
              <bl-table-header-cell>
                IP Address
              </bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row>
              <bl-table-cell>
                1
              </bl-table-cell>
              <bl-table-cell>
                Antonella
              </bl-table-cell>
              <bl-table-cell>
                Bellefonte
              </bl-table-cell>
              <bl-table-cell>
                abellefonte0@nba.com
              </bl-table-cell>
              <bl-table-cell>
                Female
              </bl-table-cell>
              <bl-table-cell>
                193.108.174.118
              </bl-table-cell>
            </bl-table-row>
            <bl-table-row>
              <bl-table-cell>
                2
              </bl-table-cell>
              <bl-table-cell>
                Wash
              </bl-table-cell>
              <bl-table-cell>
                Carnson
              </bl-table-cell>
              <bl-table-cell>
                wcarnson1@jalbum.net
              </bl-table-cell>
              <bl-table-cell>
                Male
              </bl-table-cell>
              <bl-table-cell>
                255.169.128.60
              </bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>`
    );
    const tableHeaderCell = el.querySelector("bl-table-header-cell");

    const sortIcon = tableHeaderCell!.shadowRoot!.querySelector(".sort-icons-wrapper bl-icon") as HTMLElement;

    //then
    expect(sortIcon.getAttribute("name")).to.equal(
      "sorting"
    );
  });

  it("should be rendered with initial sorted as asc", async () => {
    //when
    const el = await fixture<BlTable>(
      html`
        <bl-table sort-key="id" sort-direction="asc" sortable>
          <bl-table-header >
            <bl-table-row>
              <bl-table-header-cell sort-key="id">
                ID
              </bl-table-header-cell>
              <bl-table-header-cell>
                First Name
              </bl-table-header-cell>
              <bl-table-header-cell>
                Last Name
              </bl-table-header-cell>
              <bl-table-header-cell>
                Email
              </bl-table-header-cell>
              <bl-table-header-cell>
                Gender
              </bl-table-header-cell>
              <bl-table-header-cell>
                IP Address
              </bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row>
              <bl-table-cell>
                1
              </bl-table-cell>
              <bl-table-cell>
                Antonella
              </bl-table-cell>
              <bl-table-cell>
                Bellefonte
              </bl-table-cell>
              <bl-table-cell>
                abellefonte0@nba.com
              </bl-table-cell>
              <bl-table-cell>
                Female
              </bl-table-cell>
              <bl-table-cell>
                193.108.174.118
              </bl-table-cell>
            </bl-table-row>
            <bl-table-row>
              <bl-table-cell>
                2
              </bl-table-cell>
              <bl-table-cell>
                Wash
              </bl-table-cell>
              <bl-table-cell>
                Carnson
              </bl-table-cell>
              <bl-table-cell>
                wcarnson1@jalbum.net
              </bl-table-cell>
              <bl-table-cell>
                Male
              </bl-table-cell>
              <bl-table-cell>
                255.169.128.60
              </bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>`
    );
    const tableHeaderCell = el.querySelector("bl-table-header-cell");

    const sortIcon = tableHeaderCell!.shadowRoot!.querySelector(".sort-icons-wrapper bl-icon") as HTMLElement;

    //then
    expect(sortIcon.getAttribute("name")).to.equal(
      "sorting_asc"
    );
  });

  it("should be rendered with initial sorted as desc", async () => {
    //when
    const el = await fixture<BlTable>(
      html`
        <bl-table sort-key="id" sort-direction="desc" sortable>
          <bl-table-header >
            <bl-table-row>
              <bl-table-header-cell sort-key="id">
                ID
              </bl-table-header-cell>
              <bl-table-header-cell>
                First Name
              </bl-table-header-cell>
              <bl-table-header-cell>
                Last Name
              </bl-table-header-cell>
              <bl-table-header-cell>
                Email
              </bl-table-header-cell>
              <bl-table-header-cell>
                Gender
              </bl-table-header-cell>
              <bl-table-header-cell>
                IP Address
              </bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row>
              <bl-table-cell>
                1
              </bl-table-cell>
              <bl-table-cell>
                Antonella
              </bl-table-cell>
              <bl-table-cell>
                Bellefonte
              </bl-table-cell>
              <bl-table-cell>
                abellefonte0@nba.com
              </bl-table-cell>
              <bl-table-cell>
                Female
              </bl-table-cell>
              <bl-table-cell>
                193.108.174.118
              </bl-table-cell>
            </bl-table-row>
            <bl-table-row>
              <bl-table-cell>
                2
              </bl-table-cell>
              <bl-table-cell>
                Wash
              </bl-table-cell>
              <bl-table-cell>
                Carnson
              </bl-table-cell>
              <bl-table-cell>
                wcarnson1@jalbum.net
              </bl-table-cell>
              <bl-table-cell>
                Male
              </bl-table-cell>
              <bl-table-cell>
                255.169.128.60
              </bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>`
    );
    const tableHeaderCell = el.querySelector("bl-table-header-cell");

    const sortIcon = tableHeaderCell!.shadowRoot!.querySelector(".sort-icons-wrapper bl-icon") as HTMLElement;

    //then
    expect(sortIcon.getAttribute("name")).to.equal(
      "sorting_desc"
    );
  });

  it("should be rendered with initial selected row", async () => {
    //when
    const el = await fixture<BlTable>(
      html`
        <bl-table selectable selected-values="['row-1']">
          <bl-table-header >
            <bl-table-row>
              <bl-table-header-cell>
                ID
              </bl-table-header-cell>
              <bl-table-header-cell>
                First Name
              </bl-table-header-cell>
              <bl-table-header-cell>
                Last Name
              </bl-table-header-cell>
              <bl-table-header-cell>
                Email
              </bl-table-header-cell>
              <bl-table-header-cell>
                Gender
              </bl-table-header-cell>
              <bl-table-header-cell>
                IP Address
              </bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row selection-key="row-1">
              <bl-table-cell>
                1
              </bl-table-cell>
              <bl-table-cell>
                Antonella
              </bl-table-cell>
              <bl-table-cell>
                Bellefonte
              </bl-table-cell>
              <bl-table-cell>
                abellefonte0@nba.com
              </bl-table-cell>
              <bl-table-cell>
                Female
              </bl-table-cell>
              <bl-table-cell>
                193.108.174.118
              </bl-table-cell>
            </bl-table-row>
            <bl-table-row>
              <bl-table-cell>
                2
              </bl-table-cell>
              <bl-table-cell>
                Wash
              </bl-table-cell>
              <bl-table-cell>
                Carnson
              </bl-table-cell>
              <bl-table-cell>
                wcarnson1@jalbum.net
              </bl-table-cell>
              <bl-table-cell>
                Male
              </bl-table-cell>
              <bl-table-cell>
                255.169.128.60
              </bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>`
    );
    const firstTableRow = el.querySelector("bl-table-body bl-table-row");

    //then
    expect(firstTableRow!.getAttribute("checked")).to.equal(
      "true"
    );
  });

  it("should be rendered with sticky first column", async () => {
    //when
    const el = await fixture<BlTable>(
      html`
        <bl-table sticky-first-column>
          <bl-table-header >
            <bl-table-row>
              <bl-table-header-cell>
                ID
              </bl-table-header-cell>
              <bl-table-header-cell>
                First Name
              </bl-table-header-cell>
              <bl-table-header-cell>
                Last Name
              </bl-table-header-cell>
              <bl-table-header-cell>
                Email
              </bl-table-header-cell>
              <bl-table-header-cell>
                Gender
              </bl-table-header-cell>
              <bl-table-header-cell>
                IP Address
              </bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row>
              <bl-table-cell>
                1
              </bl-table-cell>
              <bl-table-cell>
                Antonella
              </bl-table-cell>
              <bl-table-cell>
                Bellefonte
              </bl-table-cell>
              <bl-table-cell>
                abellefonte0@nba.com
              </bl-table-cell>
              <bl-table-cell>
                Female
              </bl-table-cell>
              <bl-table-cell>
                193.108.174.118
              </bl-table-cell>
            </bl-table-row>
            <bl-table-row>
              <bl-table-cell>
                2
              </bl-table-cell>
              <bl-table-cell>
                Wash
              </bl-table-cell>
              <bl-table-cell>
                Carnson
              </bl-table-cell>
              <bl-table-cell>
                wcarnson1@jalbum.net
              </bl-table-cell>
              <bl-table-cell>
                Male
              </bl-table-cell>
              <bl-table-cell>
                255.169.128.60
              </bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>`
    );
    const tableHeaderCell = el.querySelector("bl-table-header-cell")!.shadowRoot!.querySelector(".table-header-cell");
    const tableCellList = el.querySelectorAll("bl-table-body bl-table-row bl-table-cell:first-child");

    //then
    tableCellList.forEach(tc=>{
      const tableCell = tc!.shadowRoot!.querySelector(".table-cell");

      expect(tableCell!.className).to.equal(
          "table-cell shadow-right"
      );
    });
    expect(tableHeaderCell!.className).to.equal(
      "table-header-cell shadow-right"
    );
  });

  it("should be rendered with sticky last column", async () => {
    //when
    const el = await fixture<BlTable>(
      html`
        <bl-table sticky-last-column>
          <bl-table-header >
            <bl-table-row>
              <bl-table-header-cell>
                ID
              </bl-table-header-cell>
              <bl-table-header-cell>
                First Name
              </bl-table-header-cell>
              <bl-table-header-cell>
                Last Name
              </bl-table-header-cell>
              <bl-table-header-cell>
                Email
              </bl-table-header-cell>
              <bl-table-header-cell>
                Gender
              </bl-table-header-cell>
              <bl-table-header-cell>
                IP Address
              </bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row>
              <bl-table-cell>
                1
              </bl-table-cell>
              <bl-table-cell>
                Antonella
              </bl-table-cell>
              <bl-table-cell>
                Bellefonte
              </bl-table-cell>
              <bl-table-cell>
                abellefonte0@nba.com
              </bl-table-cell>
              <bl-table-cell>
                Female
              </bl-table-cell>
              <bl-table-cell>
                193.108.174.118
              </bl-table-cell>
            </bl-table-row>
            <bl-table-row>
              <bl-table-cell>
                2
              </bl-table-cell>
              <bl-table-cell>
                Wash
              </bl-table-cell>
              <bl-table-cell>
                Carnson
              </bl-table-cell>
              <bl-table-cell>
                wcarnson1@jalbum.net
              </bl-table-cell>
              <bl-table-cell>
                Male
              </bl-table-cell>
              <bl-table-cell>
                255.169.128.60
              </bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>`
    );
    const tableHeaderCell = el.querySelector("bl-table-header bl-table-row bl-table-header-cell:last-child")!.shadowRoot!.querySelector(".table-header-cell");
    const tableCellList = el.querySelectorAll("bl-table-body bl-table-row bl-table-cell:last-child");

    //then
    tableCellList.forEach(tc=>{
      const tableCell = tc!.shadowRoot!.querySelector(".table-cell");

      expect(tableCell!.className).to.equal(
          "table-cell shadow-left"
      );
    });
    expect(tableHeaderCell!.className).to.equal(
      "table-header-cell shadow-left"
    );
  });

  describe("events", () => {
    it("should fire bl-sort event as asc when user click on sortable table header cell that not sorted", async () => {
      const el = await fixture<BlTable>(
          html`
            <bl-table sortable>
              <bl-table-header>
                <bl-table-row>
                  <bl-table-header-cell sort-key="id">
                    ID
                  </bl-table-header-cell>
                  <bl-table-header-cell sort-key="first_name">
                    First Name
                  </bl-table-header-cell>
                  <bl-table-header-cell sort-key="last_name">
                    Last Name
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Email
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Gender
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    IP Address
                  </bl-table-header-cell>
                </bl-table-row>
              </bl-table-header>
              <bl-table-body>
                <bl-table-row>
                  <bl-table-cell>
                    1
                  </bl-table-cell>
                  <bl-table-cell>
                    Antonella
                  </bl-table-cell>
                  <bl-table-cell>
                    Bellefonte
                  </bl-table-cell>
                  <bl-table-cell>
                    abellefonte0@nba.com
                  </bl-table-cell>
                  <bl-table-cell>
                    Female
                  </bl-table-cell>
                  <bl-table-cell>
                    193.108.174.118
                  </bl-table-cell>
                </bl-table-row>
                <bl-table-row>
                  <bl-table-cell disabled>
                    2
                  </bl-table-cell>
                  <bl-table-cell>
                    Wash
                  </bl-table-cell>
                  <bl-table-cell>
                    Carnson
                  </bl-table-cell>
                  <bl-table-cell>
                    wcarnson1@jalbum.net
                  </bl-table-cell>
                  <bl-table-cell>
                    Male
                  </bl-table-cell>
                  <bl-table-cell>
                    255.169.128.60
                  </bl-table-cell>
                </bl-table-row>
              </bl-table-body>
            </bl-table>`
      );

      const tableHeaderCell = el.querySelector("bl-table-header-cell");

      if(tableHeaderCell?.shadowRoot){
        const sortIcons = tableHeaderCell.shadowRoot.querySelector(".sort-icons-wrapper") as HTMLElement;

        setTimeout(() => sortIcons?.click());
      }

      const ev = await oneEvent(el, blSortChangeEventName);

      expect(ev).to.exist;
      expect(ev.detail).to.be.deep.equal(["id", "asc"]);
    });

    it("should fire bl-sort event as desc when user click on sortable table header cell that sorted as asc", async () => {
      const el = await fixture<BlTable>(
          html`
            <bl-table sortable sort-key="id" sort-direction="asc">
              <bl-table-header>
                <bl-table-row>
                  <bl-table-header-cell sort-key="id">
                    ID
                  </bl-table-header-cell>
                  <bl-table-header-cell sort-key="first_name">
                    First Name
                  </bl-table-header-cell>
                  <bl-table-header-cell sort-key="last_name">
                    Last Name
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Email
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Gender
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    IP Address
                  </bl-table-header-cell>
                </bl-table-row>
              </bl-table-header>
              <bl-table-body>
                <bl-table-row>
                  <bl-table-cell>
                    1
                  </bl-table-cell>
                  <bl-table-cell>
                    Antonella
                  </bl-table-cell>
                  <bl-table-cell>
                    Bellefonte
                  </bl-table-cell>
                  <bl-table-cell>
                    abellefonte0@nba.com
                  </bl-table-cell>
                  <bl-table-cell>
                    Female
                  </bl-table-cell>
                  <bl-table-cell>
                    193.108.174.118
                  </bl-table-cell>
                </bl-table-row>
                <bl-table-row>
                  <bl-table-cell disabled>
                    2
                  </bl-table-cell>
                  <bl-table-cell>
                    Wash
                  </bl-table-cell>
                  <bl-table-cell>
                    Carnson
                  </bl-table-cell>
                  <bl-table-cell>
                    wcarnson1@jalbum.net
                  </bl-table-cell>
                  <bl-table-cell>
                    Male
                  </bl-table-cell>
                  <bl-table-cell>
                    255.169.128.60
                  </bl-table-cell>
                </bl-table-row>
              </bl-table-body>
            </bl-table>`
      );

      const tableHeaderCell = el.querySelector("bl-table-header-cell");

      if(tableHeaderCell?.shadowRoot){
        const sortIcons = tableHeaderCell.shadowRoot.querySelector(".sort-icons-wrapper") as HTMLElement;

        setTimeout(() => sortIcons?.click());
      }

      const ev = await oneEvent(el, blSortChangeEventName);

      expect(ev).to.exist;
      expect(ev.detail).to.be.deep.equal(["id", "desc"]);
    });

    it("should fire bl-sort event when user click on sortable table header cell that sorted as desc", async () => {
      const el = await fixture<BlTable>(
          html`
            <bl-table sortable sort-key="id" sort-direction="desc">
              <bl-table-header>
                <bl-table-row>
                  <bl-table-header-cell sort-key="id">
                    ID
                  </bl-table-header-cell>
                  <bl-table-header-cell sort-key="first_name">
                    First Name
                  </bl-table-header-cell>
                  <bl-table-header-cell sort-key="last_name">
                    Last Name
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Email
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Gender
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    IP Address
                  </bl-table-header-cell>
                </bl-table-row>
              </bl-table-header>
              <bl-table-body>
                <bl-table-row>
                  <bl-table-cell>
                    1
                  </bl-table-cell>
                  <bl-table-cell>
                    Antonella
                  </bl-table-cell>
                  <bl-table-cell>
                    Bellefonte
                  </bl-table-cell>
                  <bl-table-cell>
                    abellefonte0@nba.com
                  </bl-table-cell>
                  <bl-table-cell>
                    Female
                  </bl-table-cell>
                  <bl-table-cell>
                    193.108.174.118
                  </bl-table-cell>
                </bl-table-row>
                <bl-table-row>
                  <bl-table-cell disabled>
                    2
                  </bl-table-cell>
                  <bl-table-cell>
                    Wash
                  </bl-table-cell>
                  <bl-table-cell>
                    Carnson
                  </bl-table-cell>
                  <bl-table-cell>
                    wcarnson1@jalbum.net
                  </bl-table-cell>
                  <bl-table-cell>
                    Male
                  </bl-table-cell>
                  <bl-table-cell>
                    255.169.128.60
                  </bl-table-cell>
                </bl-table-row>
              </bl-table-body>
            </bl-table>`
      );

      const tableHeaderCell = el.querySelector("bl-table-header-cell");

      if(tableHeaderCell?.shadowRoot){
        const sortIcons = tableHeaderCell.shadowRoot.querySelector(".sort-icons-wrapper") as HTMLElement;

        setTimeout(() => sortIcons?.click());
      }

      const ev = await oneEvent(el, blSortChangeEventName);

      expect(ev).to.exist;
      expect(ev.detail).to.be.deep.equal(["id", ""]);
    });

    it("should fire bl-row-select event when user checked on checkbox in header row", async () => {
      const el = await fixture<BlTable>(
          html`
            <bl-table
                selectable
                multiple
            >
              <bl-table-header>
                <bl-table-row>
                  <bl-table-header-cell>
                    ID
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    First Name
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Last Name
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Email
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Gender
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    IP Address
                  </bl-table-header-cell>
                </bl-table-row>
              </bl-table-header>
              <bl-table-body>
                <bl-table-row selection-key="row-1">
                  <bl-table-cell>
                    1
                  </bl-table-cell>
                  <bl-table-cell>
                    Antonella
                  </bl-table-cell>
                  <bl-table-cell>
                    Bellefonte
                  </bl-table-cell>
                  <bl-table-cell>
                    abellefonte0@nba.com
                  </bl-table-cell>
                  <bl-table-cell>
                    Female
                  </bl-table-cell>
                  <bl-table-cell>
                    193.108.174.118
                  </bl-table-cell>
                </bl-table-row>
                <bl-table-row selection-key="row-2">
                  <bl-table-cell ?disabled=${true}>
                    2
                  </bl-table-cell>
                  <bl-table-cell>
                    Wash
                  </bl-table-cell>
                  <bl-table-cell>
                    Carnson
                  </bl-table-cell>
                  <bl-table-cell>
                    wcarnson1@jalbum.net
                  </bl-table-cell>
                  <bl-table-cell>
                    Male
                  </bl-table-cell>
                  <bl-table-cell>
                    255.169.128.60
                  </bl-table-cell>
                </bl-table-row>
                <bl-table-row selection-key="row-3">
                  <bl-table-cell>
                    3
                  </bl-table-cell>
                  <bl-table-cell>
                    Name
                  </bl-table-cell>
                  <bl-table-cell>
                    Surname
                  </bl-table-cell>
                  <bl-table-cell>
                    name1@test.net
                  </bl-table-cell>
                  <bl-table-cell>
                    Male
                  </bl-table-cell>
                  <bl-table-cell>
                    255.169.123.60
                  </bl-table-cell>
                </bl-table-row>
              </bl-table-body>
            </bl-table>`
      );

      const tableHeaderCell = el.querySelector("bl-table-header-cell");

      if(tableHeaderCell?.shadowRoot){
        const checkbox = tableHeaderCell.shadowRoot.querySelector("bl-checkbox") as HTMLElement;
        const checkboxEvent = new CustomEvent("bl-checkbox-change", {
          detail: true,
        });

        setTimeout(() => checkbox?.dispatchEvent(checkboxEvent));
      }

      const ev = await oneEvent(el, blRowSelectChangeEventName);

      expect(ev).to.exist;
      expect(ev.detail).to.be.deep.equal([
          "row-1",
          "row-3",
      ]);
    });
    it("should fire bl-row-select event with unchecked all rows when user checked on checkbox when all available rows are selected", async () => {
      const el = await fixture<BlTable>(
          html`
            <bl-table
              selected-values="${JSON.stringify(["row-1","row-3"])}"
                selectable
                multiple
            >
              <bl-table-header>
                <bl-table-row>
                  <bl-table-header-cell>
                    ID
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    First Name
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Last Name
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Email
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Gender
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    IP Address
                  </bl-table-header-cell>
                </bl-table-row>
              </bl-table-header>
              <bl-table-body>
                <bl-table-row selection-key="row-1">
                  <bl-table-cell>
                    1
                  </bl-table-cell>
                  <bl-table-cell>
                    Antonella
                  </bl-table-cell>
                  <bl-table-cell>
                    Bellefonte
                  </bl-table-cell>
                  <bl-table-cell>
                    abellefonte0@nba.com
                  </bl-table-cell>
                  <bl-table-cell>
                    Female
                  </bl-table-cell>
                  <bl-table-cell>
                    193.108.174.118
                  </bl-table-cell>
                </bl-table-row>
                <bl-table-row selection-key="row-2">
                  <bl-table-cell ?disabled=${true}>
                    2
                  </bl-table-cell>
                  <bl-table-cell>
                    Wash
                  </bl-table-cell>
                  <bl-table-cell>
                    Carnson
                  </bl-table-cell>
                  <bl-table-cell>
                    wcarnson1@jalbum.net
                  </bl-table-cell>
                  <bl-table-cell>
                    Male
                  </bl-table-cell>
                  <bl-table-cell>
                    255.169.128.60
                  </bl-table-cell>
                </bl-table-row>
                <bl-table-row selection-key="row-3">
                  <bl-table-cell>
                    3
                  </bl-table-cell>
                  <bl-table-cell>
                    Name
                  </bl-table-cell>
                  <bl-table-cell>
                    Surname
                  </bl-table-cell>
                  <bl-table-cell>
                    name1@test.net
                  </bl-table-cell>
                  <bl-table-cell>
                    Male
                  </bl-table-cell>
                  <bl-table-cell>
                    255.169.123.60
                  </bl-table-cell>
                </bl-table-row>
              </bl-table-body>
            </bl-table>`
      );

      const tableHeaderCell = el.querySelector("bl-table-header-cell");

      if(tableHeaderCell?.shadowRoot){
        const checkbox = tableHeaderCell.shadowRoot.querySelector("bl-checkbox") as HTMLElement;
        const checkboxEvent = new CustomEvent("bl-checkbox-change", {
          detail: true,
        });

        setTimeout(() => checkbox?.dispatchEvent(checkboxEvent));
      }

      const ev = await oneEvent(el, blRowSelectChangeEventName);

      expect(ev).to.exist;
      expect(ev.detail).to.be.deep.equal([ ]);
    });

    it("should fire bl-row-select event when user unchecked on checkbox in header row", async () => {
      const el = await fixture<BlTable>(
          html`
            <bl-table
                selected-values="${JSON.stringify(["row-1", "row-2"])}"
                selectable
                multiple
            >
              <bl-table-header>
                <bl-table-row>
                  <bl-table-header-cell>
                    ID
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    First Name
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Last Name
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Email
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Gender
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    IP Address
                  </bl-table-header-cell>
                </bl-table-row>
              </bl-table-header>
              <bl-table-body>
                <bl-table-row selection-key="row-1">
                  <bl-table-cell>
                    1
                  </bl-table-cell>
                  <bl-table-cell>
                    Antonella
                  </bl-table-cell>
                  <bl-table-cell>
                    Bellefonte
                  </bl-table-cell>
                  <bl-table-cell>
                    abellefonte0@nba.com
                  </bl-table-cell>
                  <bl-table-cell>
                    Female
                  </bl-table-cell>
                  <bl-table-cell>
                    193.108.174.118
                  </bl-table-cell>
                </bl-table-row>
                <bl-table-row selection-key="row-2">
                  <bl-table-cell>
                    2
                  </bl-table-cell>
                  <bl-table-cell>
                    Wash
                  </bl-table-cell>
                  <bl-table-cell>
                    Carnson
                  </bl-table-cell>
                  <bl-table-cell>
                    wcarnson1@jalbum.net
                  </bl-table-cell>
                  <bl-table-cell>
                    Male
                  </bl-table-cell>
                  <bl-table-cell>
                    255.169.128.60
                  </bl-table-cell>
                </bl-table-row>
              </bl-table-body>
            </bl-table>`
      );

      const tableHeaderCell = el.querySelector("bl-table-header-cell");

      if(tableHeaderCell?.shadowRoot){
        const checkbox = tableHeaderCell.shadowRoot.querySelector("bl-checkbox") as HTMLElement;
        const checkboxEvent = new CustomEvent("bl-checkbox-change", {
          detail: false,
        });

        setTimeout(() => checkbox?.dispatchEvent(checkboxEvent));
      }

      const ev = await oneEvent(el, blRowSelectChangeEventName);

      expect(ev).to.exist;
      expect(ev.detail).to.be.deep.equal([]);
    });

    it("should fire bl-row-select event when user checked on checkbox in first table row", async () => {
      const el = await fixture<BlTable>(
          html`
            <bl-table
                selectable
                multiple
            >
              <bl-table-header>
                <bl-table-row>
                  <bl-table-header-cell>
                    ID
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    First Name
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Last Name
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Email
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Gender
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    IP Address
                  </bl-table-header-cell>
                </bl-table-row>
              </bl-table-header>
              <bl-table-body>
                <bl-table-row selection-key="row-1">
                  <bl-table-cell>
                    1
                  </bl-table-cell>
                  <bl-table-cell>
                    Antonella
                  </bl-table-cell>
                  <bl-table-cell>
                    Bellefonte
                  </bl-table-cell>
                  <bl-table-cell>
                    abellefonte0@nba.com
                  </bl-table-cell>
                  <bl-table-cell>
                    Female
                  </bl-table-cell>
                  <bl-table-cell>
                    193.108.174.118
                  </bl-table-cell>
                </bl-table-row>
                <bl-table-row selection-key="row-2">
                  <bl-table-cell>
                    2
                  </bl-table-cell>
                  <bl-table-cell>
                    Wash
                  </bl-table-cell>
                  <bl-table-cell>
                    Carnson
                  </bl-table-cell>
                  <bl-table-cell>
                    wcarnson1@jalbum.net
                  </bl-table-cell>
                  <bl-table-cell>
                    Male
                  </bl-table-cell>
                  <bl-table-cell>
                    255.169.128.60
                  </bl-table-cell>
                </bl-table-row>
              </bl-table-body>
            </bl-table>`
      );

      const tableCell = el.querySelector("bl-table-cell");

      if(tableCell?.shadowRoot){
        const checkbox = tableCell.shadowRoot.querySelector("bl-checkbox") as HTMLElement;
        const checkboxEvent = new CustomEvent("bl-checkbox-change", {
          detail: true,
        });

        setTimeout(() => checkbox?.dispatchEvent(checkboxEvent));
      }

      const ev = await oneEvent(el, blRowSelectChangeEventName);

      expect(ev).to.exist;
      expect(ev.detail).to.be.deep.equal(["row-1"]);
    });

    it("should fire bl-row-select event when user unchecked on checkbox in first table row", async () => {
      const el = await fixture<BlTable>(
          html`
            <bl-table
                selected-values="${JSON.stringify(["row-1", "row-2"])}"
                selectable
                multiple
            >
              <bl-table-header>
                <bl-table-row>
                  <bl-table-header-cell>
                    ID
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    First Name
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Last Name
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Email
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    Gender
                  </bl-table-header-cell>
                  <bl-table-header-cell>
                    IP Address
                  </bl-table-header-cell>
                </bl-table-row>
              </bl-table-header>
              <bl-table-body>
                <bl-table-row selection-key="row-1">
                  <bl-table-cell>
                    1
                  </bl-table-cell>
                  <bl-table-cell>
                    Antonella
                  </bl-table-cell>
                  <bl-table-cell>
                    Bellefonte
                  </bl-table-cell>
                  <bl-table-cell>
                    abellefonte0@nba.com
                  </bl-table-cell>
                  <bl-table-cell>
                    Female
                  </bl-table-cell>
                  <bl-table-cell>
                    193.108.174.118
                  </bl-table-cell>
                </bl-table-row>
                <bl-table-row selection-key="row-2">
                  <bl-table-cell>
                    2
                  </bl-table-cell>
                  <bl-table-cell>
                    Wash
                  </bl-table-cell>
                  <bl-table-cell>
                    Carnson
                  </bl-table-cell>
                  <bl-table-cell>
                    wcarnson1@jalbum.net
                  </bl-table-cell>
                  <bl-table-cell>
                    Male
                  </bl-table-cell>
                  <bl-table-cell>
                    255.169.128.60
                  </bl-table-cell>
                </bl-table-row>
              </bl-table-body>
            </bl-table>`
      );

      const tableCell = el.querySelector("bl-table-cell");

      if(tableCell?.shadowRoot){
        const checkbox = tableCell.shadowRoot.querySelector("bl-checkbox") as HTMLElement;
        const checkboxEvent = new CustomEvent("bl-checkbox-change", {
          detail: false,
        });

        setTimeout(() => checkbox?.dispatchEvent(checkboxEvent));
      }

      const ev = await oneEvent(el, blRowSelectChangeEventName);

      expect(ev).to.exist;
      expect(ev.detail).to.be.deep.equal(["row-2"]);
    });
  });
});
