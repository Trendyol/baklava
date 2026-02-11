import { assert, elementUpdated, expect, fixture, html } from "@open-wc/testing";
import BlBreadcrumb from "./bl-breadcrumb";
import type { BreadcrumbItemData } from "./bl-breadcrumb";

const twoItems: BreadcrumbItemData[] = [
  { href: "#", label: "Item 01" },
  { href: "#", label: "Item 02" },
];
const threeItems: BreadcrumbItemData[] = [
  { href: "#a", label: "A" },
  { href: "#b", label: "B" },
  { href: "#c", label: "C" },
];
const fourItems: BreadcrumbItemData[] = [
  { href: "#1", label: "Item 1" },
  { href: "#2", label: "Item 2" },
  { href: "#3", label: "Item 3" },
  { href: "#4", label: "Item 4" },
];
const fiveItems: BreadcrumbItemData[] = [
  { href: "#1", label: "Item 01" },
  { href: "#2", label: "Item 02" },
  { href: "#3", label: "Item 03" },
  { href: "#4", label: "Item 04" },
  { href: "#5", label: "Item 05" },
];

describe("bl-breadcrumb", () => {
  it("should be defined", () => {
    const el = document.createElement("bl-breadcrumb");

    assert.instanceOf(el, BlBreadcrumb);
  });

  it("should render nav with aria-label Breadcrumb", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${twoItems}></bl-breadcrumb>
    `);
    const nav = el.shadowRoot!.querySelector("nav.breadcrumb");

    expect(nav).to.exist;
    expect(nav!.getAttribute("aria-label")).to.equal("Breadcrumb");
  });

  it("should render empty list when no items", async () => {
    const el = await fixture<BlBreadcrumb>(html`<bl-breadcrumb .items=${[]}></bl-breadcrumb>`);

    const list = el.shadowRoot!.querySelector("ol.breadcrumb-list");

    expect(list).to.exist;
    const items = el.shadowRoot!.querySelectorAll("bl-breadcrumb-item");

    expect(items.length).to.equal(0);
  });

  it("when not collapsed (items.length <= 4), visibleItems returns this.items - all items are shown", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${fourItems}></bl-breadcrumb>
    `);

    expect(el.shadowRoot!.querySelector(".ellipsis-trigger")).to.not.exist;
    const visibleInList = el.shadowRoot!.querySelectorAll("ol.breadcrumb-list > li bl-breadcrumb-item");

    expect(visibleInList.length).to.equal(4);
  });

  describe("if (!this.collapsed) return this.items", () => {
    it("returns this.items when items.length is 1 (not collapsed)", async () => {
      const oneItem: BreadcrumbItemData[] = [{ href: "#a", label: "Only" }];
      const el = await fixture<BlBreadcrumb>(html`
        <bl-breadcrumb .items=${oneItem}></bl-breadcrumb>
      `);

      expect(el.shadowRoot!.querySelector(".ellipsis-trigger")).to.not.exist;
      const visibleInList = el.shadowRoot!.querySelectorAll("ol.breadcrumb-list > li bl-breadcrumb-item");

      expect(visibleInList.length).to.equal(1);
    });

    it("returns this.items when items.length is 2 (not collapsed)", async () => {
      const el = await fixture<BlBreadcrumb>(html`
        <bl-breadcrumb .items=${twoItems}></bl-breadcrumb>
      `);

      expect(el.shadowRoot!.querySelector(".ellipsis-trigger")).to.not.exist;
      const visibleInList = el.shadowRoot!.querySelectorAll("ol.breadcrumb-list > li bl-breadcrumb-item");

      expect(visibleInList.length).to.equal(2);
    });

    it("returns this.items when items.length is 3 (not collapsed)", async () => {
      const el = await fixture<BlBreadcrumb>(html`
        <bl-breadcrumb .items=${threeItems}></bl-breadcrumb>
      `);

      expect(el.shadowRoot!.querySelector(".ellipsis-trigger")).to.not.exist;
      const visibleInList = el.shadowRoot!.querySelectorAll("ol.breadcrumb-list > li bl-breadcrumb-item");

      expect(visibleInList.length).to.equal(3);
    });

    it("returns this.items when items.length is 4 (not collapsed)", async () => {
      const el = await fixture<BlBreadcrumb>(html`
        <bl-breadcrumb .items=${fourItems}></bl-breadcrumb>
      `);

      expect(el.shadowRoot!.querySelector(".ellipsis-trigger")).to.not.exist;
      const visibleInList = el.shadowRoot!.querySelectorAll("ol.breadcrumb-list > li bl-breadcrumb-item");

      expect(visibleInList.length).to.equal(4);
    });

    it("returns this.items when items is empty (not collapsed)", async () => {
      const el = await fixture<BlBreadcrumb>(html`<bl-breadcrumb .items=${[]}></bl-breadcrumb>`);

      expect(el.shadowRoot!.querySelector(".ellipsis-trigger")).to.not.exist;
      const visibleInList = el.shadowRoot!.querySelectorAll("ol.breadcrumb-list bl-breadcrumb-item");

      expect(visibleInList.length).to.equal(0);
    });
  });

  it("when items is empty, visibleItems returns this.items - empty list is shown", async () => {
    const el = await fixture<BlBreadcrumb>(html`<bl-breadcrumb .items=${[]}></bl-breadcrumb>`);

    const visibleInList = el.shadowRoot!.querySelectorAll("ol.breadcrumb-list bl-breadcrumb-item");

    expect(visibleInList.length).to.equal(0);
  });

  it("when collapsed and first and last defined, visibleItems returns [first, last]", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${fiveItems}></bl-breadcrumb>
    `);

    const listItems = el.shadowRoot!.querySelectorAll("ol.breadcrumb-list > li");

    expect(listItems.length).to.equal(3);
    const mainBreadcrumbItems = listItems[0].querySelectorAll("bl-breadcrumb-item");
    const lastLiItems = listItems[2].querySelectorAll("bl-breadcrumb-item");

    expect(mainBreadcrumbItems.length).to.equal(1);
    expect(lastLiItems.length).to.equal(1);
  });

  it("when collapsed but first is falsy, visibleItems returns this.items (fallback)", async () => {
    const sparseItems: BreadcrumbItemData[] = [];

    sparseItems[1] = { href: "#2", label: "Item 02" };
    sparseItems[2] = { href: "#3", label: "Item 03" };
    sparseItems[3] = { href: "#4", label: "Item 04" };
    sparseItems[4] = { href: "#5", label: "Item 05" };

    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${sparseItems}></bl-breadcrumb>
    `);

    expect(el.items.length).to.equal(5);
    const list = el.shadowRoot!.querySelector("ol.breadcrumb-list");

    expect(list).to.exist;
  });

  it("should render single item without ellipsis", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${[{ href: "#a", label: "Only" }]}></bl-breadcrumb>
    `);

    expect(el.shadowRoot!.querySelector(".ellipsis-trigger")).to.not.exist;
    const items = el.shadowRoot!.querySelectorAll("bl-breadcrumb-item");

    expect(items.length).to.equal(1);
  });

  it("should render all items when 4 or fewer (expanded mode)", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${threeItems}></bl-breadcrumb>
    `);

    expect(el.shadowRoot!.querySelector(".ellipsis-trigger")).to.not.exist;
    const items = el.shadowRoot!.querySelectorAll("bl-breadcrumb-item");

    expect(items.length).to.equal(3);
  });

  it("should render exactly 4 items in expanded mode", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${fourItems}></bl-breadcrumb>
    `);

    expect(el.shadowRoot!.querySelector(".ellipsis-trigger")).to.not.exist;
    const items = el.shadowRoot!.querySelectorAll("bl-breadcrumb-item");

    expect(items.length).to.equal(4);
  });

  it("should render ellipsis and popover when more than 4 items", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${fiveItems}></bl-breadcrumb>
    `);

    const trigger = el.shadowRoot!.querySelector(".ellipsis-trigger");

    expect(trigger).to.exist;

    const popover = el.shadowRoot!.querySelector("bl-popover");

    expect(popover).to.exist;

    const allItems = el.shadowRoot!.querySelectorAll("bl-breadcrumb-item");

    expect(allItems.length).to.equal(7);
  });

  it("should show first and last in breadcrumb when collapsed, all items in popover", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${fiveItems}></bl-breadcrumb>
    `);

    const popoverList = el.shadowRoot!.querySelector(".popover-list");

    expect(popoverList).to.exist;
    expect(popoverList!.getAttribute("role")).to.equal("list");

    const popoverItems = el.shadowRoot!.querySelectorAll(".popover-item");

    expect(popoverItems.length).to.equal(5);
  });

  it("should have ellipsis button with aria-label", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${fiveItems}></bl-breadcrumb>
    `);

    const trigger = el.shadowRoot!.querySelector(".ellipsis-trigger") as HTMLElement;

    expect(trigger.getAttribute("aria-label")).to.equal("Aradaki sayfaları göster");
  });

  it("should call popover show when ellipsis is clicked", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${fiveItems}></bl-breadcrumb>
    `);

    const popover = el.shadowRoot!.querySelector("bl-popover") as HTMLElement & {
      show(): void;
      hide(): void;
      visible: boolean;
    };

    expect(typeof popover.show).to.equal("function");

    const trigger = el.shadowRoot!.querySelector(".ellipsis-trigger") as HTMLElement;

    trigger.click();
    await elementUpdated(el);
    expect(popover.visible).to.be.true;
  });

  it("should set ellipsis inactive when popover hides (handlePopoverHide)", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${fiveItems}></bl-breadcrumb>
    `);

    const popover = el.shadowRoot!.querySelector("bl-popover") as HTMLElement & { hide(): void };
    const trigger = el.shadowRoot!.querySelector(".ellipsis-trigger") as HTMLElement;

    trigger.click();
    await elementUpdated(el);
    expect(trigger.classList.contains("active")).to.be.true;
    expect(trigger.getAttribute("aria-expanded")).to.equal("true");

    popover.hide();
    await elementUpdated(el);

    expect(trigger.classList.contains("active")).to.be.false;
    expect(trigger.getAttribute("aria-expanded")).to.equal("false");
  });

  it("should set ellipsis inactive when bl-popover-hide is dispatched", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${fiveItems}></bl-breadcrumb>
    `);

    const popover = el.shadowRoot!.querySelector("bl-popover");
    const trigger = el.shadowRoot!.querySelector(".ellipsis-trigger") as HTMLElement;

    trigger.click();
    await elementUpdated(el);
    expect(trigger.classList.contains("active")).to.be.true;

    popover!.dispatchEvent(new CustomEvent("bl-popover-hide", { bubbles: true }));
    await elementUpdated(el);

    expect(trigger.classList.contains("active")).to.be.false;
  });

  it("should have separators between items", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${[{ href: "#a", label: "A" }, { href: "#b", label: "B" }]}></bl-breadcrumb>
    `);

    const separators = el.shadowRoot!.querySelectorAll(".separator");

    expect(separators.length).to.be.at.least(1);
  });

  it("should render chevron icon in separator", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${[{ href: "#a", label: "A" }, { href: "#b", label: "B" }]}></bl-breadcrumb>
    `);

    const chevron = el.shadowRoot!.querySelector(".separator bl-icon");

    expect(chevron).to.exist;
    expect(chevron!.getAttribute("name")).to.equal("arrow_right");
  });

  it("should render ol with list items", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${[{ href: "#a", label: "A" }, { href: "#b", label: "B" }]}></bl-breadcrumb>
    `);

    const list = el.shadowRoot!.querySelector("ol.breadcrumb-list");

    expect(list).to.exist;

    const listItems = el.shadowRoot!.querySelectorAll("li");

    expect(listItems.length).to.equal(2);
  });

  it("should update when items property changes", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${[{ href: "#a", label: "A" }, { href: "#b", label: "B" }]}></bl-breadcrumb>
    `);

    let items = el.shadowRoot!.querySelectorAll("bl-breadcrumb-item");

    expect(items.length).to.equal(2);

    el.items = [
      { href: "#a", label: "A" },
      { href: "#b", label: "B" },
      { href: "#c", label: "C" },
    ];
    await elementUpdated(el);

    items = el.shadowRoot!.querySelectorAll("bl-breadcrumb-item");
    expect(items.length).to.equal(3);
  });

  it("should set popover target to ellipsis button when collapsed", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${fiveItems}></bl-breadcrumb>
    `);

    const popover = el.shadowRoot!.querySelector("bl-popover") as HTMLElement & { target: Element };
    const trigger = el.shadowRoot!.querySelector(".ellipsis-trigger");

    expect(popover.target).to.equal(trigger);
  });

  it("should render 3 list items when collapsed (first, ellipsis+popover, last)", async () => {
    const el = await fixture<BlBreadcrumb>(html`
      <bl-breadcrumb .items=${fiveItems}></bl-breadcrumb>
    `);

    const listItems = el.shadowRoot!.querySelectorAll("ol.breadcrumb-list > li");

    expect(listItems.length).to.equal(3);
  });
});
