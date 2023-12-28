import BlDropdown from "./bl-dropdown";
import {
  assert,
  fixture,
  html,
  oneEvent,
  expect,
  elementUpdated,
  waitUntil,
} from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";

import type typeOfBlDropdown from "./bl-dropdown";
import BlButton from "../button/bl-button";
import "../popover/bl-popover";
import BlPopover from "../popover/bl-popover";

describe("bl-dropdown", () => {
  it("is defined", () => {
    const el = document.createElement("bl-dropdown");

    assert.instanceOf(el, BlDropdown);
  });

  it("should render with the default values", async () => {
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown></bl-dropdown>`);

    assert.shadowDom.equal(
      el,
      `
      <bl-button
        dropdown=""
        kind="default"
        size="medium"
        variant="primary"
        aria-label="Dropdown Button"
      >
        Dropdown Button
      </bl-button>
      <bl-popover placement="bottom-start" fit-size><slot></slot></bl-popover>
    `
    );
  });

  it("should open dropdown", async () => {
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown></bl-dropdown>`);

    const buttonHost = <BlButton>el.shadowRoot?.querySelector("bl-button");
    const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;
    const popover = <BlPopover>el.shadowRoot?.querySelector("bl-popover");

    button?.click();

    expect(el.opened).to.true;
    expect(popover.visible).to.true;
  });

  it("should close dropdown", async () => {
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown></bl-dropdown>`);

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
      <bl-dropdown></bl-dropdown>
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
      <bl-dropdown>
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

    item?.click();

    setTimeout(() => {
      expect(el.opened).to.false;
      expect(popover.visible).to.false;
    });
  });

  it("should fire event when dropdown opened", async () => {
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown></bl-dropdown>`);

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
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown></bl-dropdown>`);

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
    const el = await fixture<typeOfBlDropdown>(html`<bl-dropdown disabled></bl-dropdown>`);

    expect(el.opened).to.false;

    const buttonHost = <BlButton>el.shadowRoot?.querySelector("bl-button");
    const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;
    const popover = <BlPopover>el.shadowRoot?.querySelector("bl-popover");

    button?.click();

    expect(el.opened).to.false;
    expect(popover.visible).to.false;
  });

  describe("keyboard navigation", () => {
    it("should focus next action with down arrow key", async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" /><bl-dropdown>
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
          <input id="previnput" /><bl-dropdown>
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
          <input id="previnput" /><bl-dropdown>
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
});
