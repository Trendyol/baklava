import BlSplitButton from "./bl-split-button";
import {
    assert,
    fixture,
    html,
    oneEvent,
   expect,
   elementUpdated,
   waitUntil,
  } from "@open-wc/testing";
import type typeOfBlSplitButton from "./bl-split-button";
import { sendKeys } from "@web/test-runner-commands";
import BlPopover from "../popover/bl-popover";
import BlButton from "../button/bl-button";
import "../popover/bl-popover";

describe("bl-split-button", () => {
    it("is defined", () => {
        const el = document.createElement("bl-split-button");

        assert.instanceOf(el, BlSplitButton);
      });

      it("should render with the default values", async () => {
        const el = await fixture<typeOfBlSplitButton>(html`<bl-split-button label="Split Button"></bl-split-button >`);

        assert.shadowDom.equal(
          el,
          `
          <div
            class="split-button-container"
            id="split-button-container"
          >
          <bl-button
            id="split-main-button"
            class="split-main-button"
            kind="default"
            size="medium"
            variant="primary"
            target="_self"
            type=""
          >
          Split Button
          </bl-button>
          <div class="split-divider"></div>
          <bl-button
            class="dropdown-button"
            icon="arrow_down"
            id="dropdown-button"
            kind="default"
            size="medium"
            variant="primary"
            label="split-dropdown-button"
          >
          </bl-button>
          <bl-popover placement="bottom-start" fit-size>
            <div class="popover-content">
              <slot></slot>
            </div>
          </bl-popover>
          </div>
        `
        );
      });

      it("should open dropdown", async () => {
        const el = await fixture<typeOfBlSplitButton>(html`<bl-split-button label="Split Button"></bl-split-button>`);

        const buttonHost = <BlButton>el.shadowRoot?.querySelector("#dropdown-button");
        const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;
        const popover = <BlPopover>el.shadowRoot?.querySelector("bl-popover");

        button?.click();

        expect(el.opened).to.true;
        expect(popover.visible).to.true;
      });

      it("should close dropdown", async () => {
        const el = await fixture<typeOfBlSplitButton>(html`<bl-split-button label="Split Button"></bl-split-button>`);

        const buttonHost = <BlButton>el.shadowRoot?.querySelector("#dropdown-button");
        const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;
        const popover = <BlPopover>el.shadowRoot?.querySelector("bl-popover");

        button?.click();
        expect(el.opened).to.true;
        expect(popover.visible).to.true;

        button?.click();
        expect(el.opened).to.false;
        expect(popover.visible).to.false;
      });

      it("should fire event when primary button clicked", async () => {
        const el = await fixture<typeOfBlSplitButton>(html`<bl-split-button label="Split Button"></bl-split-button>`);

        const buttonHost = <BlButton>el.shadowRoot?.querySelector(".split-main-button");
        const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;

        button?.click();

        setTimeout(() => button?.click());
        const event = await oneEvent(el, "bl-click");

        expect(el).to.exist;
        expect(event).to.exist;
        expect(event.detail).to.be.equal("Click event fired!");
      });

      it("should fire event when dropdown opened", async () => {
        const el = await fixture<typeOfBlSplitButton>(html`<bl-split-button label="Split Button"></bl-split-button>`);

        const buttonHost = <BlButton>el.shadowRoot?.querySelector("#dropdown-button");
        const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;

        setTimeout(() => button?.click());
        const event = await oneEvent(el, "bl-dropdown-open");

        expect(el).to.exist;
        expect(event).to.exist;
        expect(event.detail).to.be.equal("Dropdown opened!");

        expect(el.opened).to.true;
      });

      it("should close dropdown when click dropdown item", async () => {
        const el = await fixture<typeOfBlSplitButton>(html`
          <bl-split-button label="Dropdown Button">
            <bl-dropdown-item>dropdown-item</bl-dropdown-item>
          </bl-split-button>
        `);

        const buttonHost = <BlButton>el.shadowRoot?.querySelector("#dropdown-button");
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


      it("should fire event when dropdown closed", async () => {
        const el = await fixture<typeOfBlSplitButton>(html`<bl-split-button label="Split Button"></bl-split-button>`);

        const buttonHost = <BlButton>el.shadowRoot?.querySelector("#dropdown-button");
        const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;

        button?.click();

        setTimeout(() => button?.click());
        const event = await oneEvent(el, "bl-dropdown-close");

        expect(el).to.exist;
        expect(event).to.exist;
        expect(event.detail).to.be.equal("Dropdown closed!");
      });

      it("should not change opened property when dropdown-disabled", async () => {

        const el = await fixture<typeOfBlSplitButton>(html`<bl-split-button label="Split Button" dropdown-disabled></bl-split-button>`);

        expect(el.opened).to.false;

        const buttonHost = <BlButton>el.shadowRoot?.querySelector("#dropdown-button");
        const button = buttonHost.shadowRoot?.querySelector(".button") as HTMLElement | null;
        const popover = <BlPopover>el.shadowRoot?.querySelector("bl-popover");

        button?.click();

        expect(el.opened).to.false;
        expect(popover.visible).to.false;
      });

    describe("keyboard navigation", () => {
        it("should get focus with tabkey", async () => {
          //when
          const el = await fixture(
            html`<div>
              <input id="previnput" /><bl-split-button label="Split Button">
                <bl-dropdown-item>Action 1</bl-dropdown-item>
                <bl-dropdown-item>Action 2</bl-dropdown-item>
                <bl-dropdown-item>Action 3</bl-dropdown-item>
              </bl-split-button>
            </div>`
          );

          await elementUpdated(el);

          el.querySelector<HTMLInputElement>("#previnput")?.focus();

          await waitUntil(() => el.querySelector("bl-split-button"), "Element did not render children");

          const splitButton = el.querySelector("bl-split-button");

          const tabKey =
            navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("HeadlessChrome")
              ? "Alt+Tab"
              : "Tab";

          //given
          await sendKeys({
            press: tabKey,
          });

          //then
          expect(document.activeElement).to.equal(splitButton);
        });


        it("should focus next action with down arrow key", async () => {
          //when
          const el = await fixture(
            html`<div>
              <input id="previnput" /><bl-split-button label="Split Button">
                <bl-dropdown-item>Action 1</bl-dropdown-item>
                <bl-dropdown-item>Action 2</bl-dropdown-item>
                <bl-dropdown-item>Action 3</bl-dropdown-item>
              </bl-split-button>
            </div>`
          );

          await elementUpdated(el);

          el.querySelector<HTMLInputElement>("#previnput")?.focus();

          await waitUntil(() => el.querySelector("bl-split-button"), "Element did not render children");

          const splitButton = el.querySelector("bl-split-button");

          const tabKey =
            navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("HeadlessChrome")
              ? "Alt+Tab"
              : "Tab";

          //given
          await sendKeys({
            press: tabKey,
          });

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
          expect(document.activeElement).to.equal(splitButton?.options[0]);
        });


         it("should focus previous action with up arrow key", async () => {
          //when
          const el = await fixture(
            html`<div>
              <input id="previnput" /><bl-split-button label="Dropdown Button">
                <bl-dropdown-item>Action 1</bl-dropdown-item>
                <bl-dropdown-item>Action 2</bl-dropdown-item>
                <bl-dropdown-item>Action 3</bl-dropdown-item>
              </bl-split-button >
            </div>`
          );

          await elementUpdated(el);

          el.querySelector<HTMLInputElement>("#previnput")?.focus();

         await waitUntil(() => el.querySelector("bl-split-button"), "Element did not render children");

          const dropdown = el.querySelector("bl-split-button");

          const tabKey =
            navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("HeadlessChrome")
              ? "Alt+Tab"
              : "Tab";

          //given
          await sendKeys({
            press: tabKey,
          });

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
              <input id="previnput" /><bl-split-button label="Dropdown Button">
                <bl-dropdown-item>Action 1</bl-dropdown-item>
                <bl-dropdown-item>Action 2</bl-dropdown-item>
                <bl-dropdown-item>Action 3</bl-dropdown-item>
              </bl-split-button >
            </div>`
          );

          await elementUpdated(el);

          el.querySelector<HTMLInputElement>("#previnput")?.focus();

          await waitUntil(() => el.querySelector("bl-split-button"), "Element did not render children");

          const dropdown = el.querySelector("bl-split-button");

          const tabKey =
            navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("HeadlessChrome")
              ? "Alt+Tab"
              : "Tab";

          //given
          await sendKeys({
            press: tabKey,
          });

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


