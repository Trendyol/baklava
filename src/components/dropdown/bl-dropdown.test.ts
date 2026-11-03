import {
  assert,
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
  waitUntil,
} from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import BlDropdown from "./bl-dropdown";

import BlButton from "../button/bl-button";
import "../popover/bl-popover";
import BlPopover from "../popover/bl-popover";
import type typeOfBlDropdown from "./bl-dropdown";

describe("bl-dropdown", () => {
  it("is defined", () => {
    const el = document.createElement("bl-dropdown");

    assert.instanceOf(el, BlDropdown);
  });

  it("should render with the default values", async () => {
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown label="Dropdown Button"></bl-dropdown>`);

    assert.shadowDom.equal(
      el,
      `
      <bl-button
        dropdown=""
        kind="default"
        size="medium"
        variant="primary"
      >
        Dropdown Button
      </bl-button>
      <bl-popover placement="bottom-start" fit-size><div class="popover-content"><slot></slot></div></bl-popover>
    `
    );
  });

  it("should open dropdown", async () => {
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown label="Dropdown Button"></bl-dropdown>`);

    const buttonHost = <BlButton>el.shadowRoot?.querySelector("bl-button");
    const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;
    const popover = <BlPopover>el.shadowRoot?.querySelector("bl-popover");

    button?.click();

    expect(el.opened).to.true;
    expect(popover.visible).to.true;
  });

  it("should close dropdown", async () => {
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown label="Dropdown Button"></bl-dropdown>`);

    const buttonHost = <BlButton>el.shadowRoot?.querySelector("bl-button");
    const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;
    const popover = <BlPopover>el.shadowRoot?.querySelector("bl-popover");

    button?.click();
    expect(el.opened).to.true;
    expect(popover.visible).to.true;

    button?.click();
    expect(el.opened).to.false;
    expect(popover.visible).to.false;
  });

  it("should close dropdown when click outside", async () => {
    const el = await fixture<typeOfBlDropdown>(html`<body>
      <bl-dropdown label="Dropdown Button"></bl-dropdown>
    </body>`);

    const buttonHost = <BlButton>el.shadowRoot?.querySelector("bl-button");
    const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;
    const popover = <BlPopover>el.shadowRoot?.querySelector("bl-popover");

    button?.click();
    expect(el.opened).to.true;
    expect(popover.visible).to.true;

    const body = <HTMLBodyElement>el.closest("body");

    body.click();

    setTimeout(() => {
      expect(el.opened).to.false;
      expect(popover.visible).to.false;
    });
  });

  it("should close dropdown when click dropdown item", async () => {
    const el = await fixture<typeOfBlDropdown>(html`
      <bl-dropdown label="Dropdown Button">
        <bl-dropdown-item>dropdown-item</bl-dropdown-item>
      </bl-dropdown>
    `);

    const buttonHost = <BlButton>el.shadowRoot?.querySelector("bl-button");
    const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;
    const popover = <BlPopover>el.shadowRoot?.querySelector("bl-popover");

    button?.click();
    expect(el.opened).to.true;
    expect(popover.visible).to.true;

    const item = el
      .querySelector("bl-dropdown-item")
      ?.shadowRoot?.querySelector("bl-button") as HTMLElement | null;

    item?.dispatchEvent(
      new CustomEvent("bl-click", {
        bubbles: true,
        composed: true,
      })
    );

    setTimeout(() => {
      expect(el.opened).to.false;
      expect(popover.visible).to.false;
    });
  });

  it("should fire event when dropdown opened", async () => {
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown label="Dropdown Button"></bl-dropdown>`);

    const buttonHost = <BlButton>el.shadowRoot?.querySelector("bl-button");
    const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;

    setTimeout(() => button?.click());
    const event = await oneEvent(el, "bl-dropdown-open");

    expect(el).to.exist;
    expect(event).to.exist;
    expect(event.detail).to.be.equal("Dropdown opened!");

    expect(el.opened).to.true;
  });

  it("should fire event when dropdown closed", async () => {
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown label="Dropdown Button"></bl-dropdown>`);

    const buttonHost = <BlButton>el.shadowRoot?.querySelector("bl-button");
    const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;

    button?.click();

    setTimeout(() => button?.click());
    const event = await oneEvent(el, "bl-dropdown-close");

    expect(el).to.exist;
    expect(event).to.exist;
    expect(event.detail).to.be.equal("Dropdown closed!");
  });

  it("should not change opened property when disabled", async () => {
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown label="Dropdown Button" disabled></bl-dropdown>`);

    expect(el.opened).to.false;

    const buttonHost = <BlButton>el.shadowRoot?.querySelector("bl-button");
    const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;
    const popover = <BlPopover>el.shadowRoot?.querySelector("bl-popover");

    button?.click();

    expect(el.opened).to.false;
    expect(popover.visible).to.false;
  });

  it("should not close dropdown when disabled item is clicked", async () => {
    const el = await fixture<typeOfBlDropdown>(html`
      <bl-dropdown label="Dropdown Button">
        <bl-dropdown-item disabled>dropdown-item</bl-dropdown-item>
      </bl-dropdown>
    `);

    const buttonHost = <BlButton>el.shadowRoot?.querySelector("bl-button");
    const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;
    const popover = <BlPopover>el.shadowRoot?.querySelector("bl-popover");

    button?.click();
    expect(el.opened).to.true;
    expect(popover.visible).to.true;

    const item = el
      .querySelector("bl-dropdown-item")
      ?.shadowRoot?.querySelector("bl-button") as HTMLElement | null;

    item?.click();

    setTimeout(() => {
      expect(el.opened).to.true;
      expect(popover.visible).to.true;
    });
  });

  describe("keyboard navigation", () => {
    it("should focus next action with down arrow key", async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" /><bl-dropdown label="Dropdown Button">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
            <bl-dropdown-item>Action 3</bl-dropdown-item>
          </bl-dropdown>
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>("#previnput")?.focus();

      await waitUntil(() => el.querySelector("bl-dropdown"), "Element did not render children");

      const dropdown = el.querySelector("bl-dropdown");

      const tabKey =
        navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("HeadlessChrome")
          ? "Alt+Tab"
          : "Tab";

      //given
      await sendKeys({
        press: tabKey,
      });
      await sendKeys({
        press: "Enter",
      });
      await sendKeys({
        press: "ArrowDown",
      });

      //then
      expect(document.activeElement).to.equal(dropdown?.options[0]);
    });

    it("should focus previous action with up arrow key", async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" /><bl-dropdown label="Dropdown Button">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
            <bl-dropdown-item>Action 3</bl-dropdown-item>
          </bl-dropdown>
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>("#previnput")?.focus();

      await waitUntil(() => el.querySelector("bl-dropdown"), "Element did not render children");

      const dropdown = el.querySelector("bl-dropdown");

      const tabKey =
        navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("HeadlessChrome")
          ? "Alt+Tab"
          : "Tab";

      //given
      await sendKeys({
        press: tabKey,
      });

      await sendKeys({
        press: "Enter",
      });

      await sendKeys({
        press: "ArrowDown",
      });

      await sendKeys({
        press: "ArrowDown",
      });

      await sendKeys({
        down: "ArrowUp",
      });

      //then
      expect(document.activeElement).to.equal(dropdown?.options[0]);
    });

    it("should close dropdown with escape key", async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" /><bl-dropdown label="Dropdown Button">
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
            <bl-dropdown-item>Action 3</bl-dropdown-item>
          </bl-dropdown>
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>("#previnput")?.focus();

      await waitUntil(() => el.querySelector("bl-dropdown"), "Element did not render children");

      const dropdown = el.querySelector("bl-dropdown");

      const tabKey =
        navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("HeadlessChrome")
          ? "Alt+Tab"
          : "Tab";

      //given
      await sendKeys({
        press: tabKey,
      });
      await sendKeys({
        press: "Enter",
      });

      //then
      expect(dropdown?.opened).to.equal(true);

      //given
      await sendKeys({
        press: "Escape",
      });

      //then
      expect(dropdown?.opened).to.equal(false);
    });
  });

  describe("content max height css property", () => {
    const getContent = (el: BlDropdown) =>
      el.shadowRoot?.querySelector<HTMLElement>(".popover-content") as HTMLElement;

    it("should not constrain the content height by default", async () => {
      const el = await fixture<BlDropdown>(html`<bl-dropdown label="Dropdown Button">
        <bl-dropdown-item>Option</bl-dropdown-item>
      </bl-dropdown>`);
      const style = getComputedStyle(getContent(el));

      expect(style.maxHeight).to.eq("none");
      expect(style.overflowY).to.eq("auto");
    });

    it("should resolve --bl-dropdown-content-max-height on the content", async () => {
      const el = await fixture<BlDropdown>(
        html`<bl-dropdown label="Dropdown Button" style="--bl-dropdown-content-max-height: 100px">
          <bl-dropdown-item>Option</bl-dropdown-item>
        </bl-dropdown>`
      );

      expect(getComputedStyle(getContent(el)).maxHeight).to.eq("100px");
    });

    it("should keep the slotted items and groups from shrinking", async () => {
      const el = await fixture<BlDropdown>(html`<bl-dropdown label="Dropdown Button">
        <bl-dropdown-item>Option</bl-dropdown-item>
        <bl-dropdown-group caption="Group">
          <bl-dropdown-item>Grouped option</bl-dropdown-item>
        </bl-dropdown-group>
      </bl-dropdown>`);
      const item = el.querySelector("bl-dropdown-item") as HTMLElement;
      const group = el.querySelector("bl-dropdown-group") as HTMLElement;

      expect(getComputedStyle(item).flexShrink).to.eq("0");
      expect(getComputedStyle(group).flexShrink).to.eq("0");
    });

    it("should scroll the overflowing options instead of compressing them", async () => {
      const el = await fixture<BlDropdown>(
        html`<bl-dropdown label="Dropdown Button" style="--bl-dropdown-content-max-height: 60px">
          <bl-dropdown-item>Option 1</bl-dropdown-item>
          <bl-dropdown-item>Option 2</bl-dropdown-item>
          <bl-dropdown-item>Option 3</bl-dropdown-item>
          <bl-dropdown-item>Option 4</bl-dropdown-item>
        </bl-dropdown>`
      );

      el.open();
      await elementUpdated(el);

      const content = getContent(el);

      await waitUntil(() => content.clientHeight > 0, "dropdown content did not render");

      expect(content.clientHeight).to.be.lessThan(70);
      expect(content.scrollHeight).to.be.greaterThan(content.clientHeight);
    });
  });
});
