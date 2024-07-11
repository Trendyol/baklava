import { assert, elementUpdated, expect, fixture, html, oneEvent } from "@open-wc/testing";
import { sendKeys, sendMouse } from "@web/test-runner-commands";
import { getMiddleOfElement } from "../../utilities/elements";
import type typeOfBlPopover from "../popover/bl-popover";
import BlTooltip from "./bl-tooltip";
import type typeOfBlTooltip from "./bl-tooltip";

describe("bl-tooltip", () => {
  it("should be defined tooltip instance", () => {
    //when
    const el = document.createElement("bl-tooltip");

    //then
    assert.instanceOf(el, BlTooltip);
  });

  it("should be rendered with default values", async () => {
    //when
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip></bl-tooltip>`);

    //then
    assert.shadowDom.equal(
      el,
      `
      <slot
       aria-describedby="tooltip"
       class="trigger"
       name="tooltip-trigger">
      </slot>
      <bl-popover placement="top">
        <slot
          class="content"
          id="tooltip"
          role="tooltip">
        </slot>
       </bl-popover>
      `
    );
  });

  it("should have correct default values", async () => {
    //when
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip>Test</bl-tooltip>`);

    //then
    expect(el.placement).to.equal("top");
  });

  it("should be rendered with slot", async () => {
    //when
    const el = await fixture<typeOfBlTooltip>(html`<bl-tooltip
      ><button slot="tooltip-trigger">Test</button> Tooltip Test
    </bl-tooltip>`);

    //then
    expect(el.shadowRoot?.querySelector(".trigger")).to.exist;
    expect(el.shadowRoot?.querySelector("bl-popover")).to.exist;
  });

  it("should be rendered with correct placement attribute", async () => {
    //when
    const el = await fixture<typeOfBlTooltip>(
      html`<bl-tooltip placement="top-end"
        ><button slot="tooltip-trigger">Test</button> Test Tooltip</bl-tooltip
      >`
    );

    //then
    expect(el.getAttribute("placement")).to.eq("top-end");
  });

  it("should be rendered with correct placement attribute when placement attribute was changed", async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(
      html`<bl-tooltip placement="top-end"
        ><button slot="tooltip-trigger">Test</button> Test Tooltip</bl-tooltip
      >`
    );

    el.setAttribute("placement", "right-start");

    //when
    await elementUpdated(el);

    //then
    expect(el.getAttribute("placement")).to.eq("right-start");
  });

  it("should have `visible` class when mouse over of trigger", async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(
      html`<bl-tooltip placement="top-end"
        ><button slot="tooltip-trigger">Test</button> Test Tooltip</bl-tooltip
      >`
    );
    const tooltipPopover = el.shadowRoot?.querySelector("bl-popover") as typeOfBlPopover;
    const trigger = document.querySelector("button") as HTMLElement;
    const { x, y } = getMiddleOfElement(trigger);

    //when
    await sendMouse({ type: "move", position: [x, y] });

    //then
    expect(tooltipPopover.visible).to.be.true;
    expect(el.visible).to.be.true;
  });

  it("should not have `show` class when mouse leave of trigger", async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(
      html`<bl-tooltip placement="left-end"
        ><button slot="tooltip-trigger">Test</button> Test Tooltip</bl-tooltip
      >`
    );
    const tooltip = el.shadowRoot!.querySelector("bl-popover")!;
    const trigger = document.querySelector("button") as HTMLElement;
    const body = document.querySelector("body") as HTMLElement;

    const { x: triggerX, y: triggerY } = getMiddleOfElement(trigger);
    const { x: bodyX, y: bodyY } = getMiddleOfElement(body);

    //when
    await sendMouse({ type: "move", position: [triggerX, triggerY] });
    await sendMouse({ type: "move", position: [bodyX, bodyY] });

    //then
    expect(tooltip).to.not.have.class("show");
  });

  it("should fires bl-tooltip-show on mouse over", async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(
      html`<bl-tooltip placement="top-end"
        ><button slot="tooltip-trigger">Test</button> Test Tooltip</bl-tooltip
      >`
    );
    const trigger = document.querySelector("button") as HTMLElement;
    const { x, y } = getMiddleOfElement(trigger);

    //when
    setTimeout(() => sendMouse({ type: "move", position: [x, y] }));

    //then
    const ev = await oneEvent(el, "bl-tooltip-show");

    expect(ev).to.exist;
    expect(ev.detail).to.be.null;
  });

  it("should fires bl-tooltip-hide on mouse leave", async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(
      html`<bl-tooltip placement="left-end"
        ><button slot="tooltip-trigger">Test</button> Test Tooltip</bl-tooltip
      >`
    );
    const trigger = document.querySelector("button") as HTMLElement;
    const body = document.querySelector("body") as HTMLElement;
    const { x: triggerX, y: triggerY } = getMiddleOfElement(trigger);
    const { x: bodyX, y: bodyY } = getMiddleOfElement(body);

    //when
    await sendMouse({ type: "move", position: [triggerX, triggerY] });
    setTimeout(() => {
      sendMouse({ type: "move", position: [bodyX, bodyY] });
    });

    //then
    const ev = await oneEvent(el, "bl-tooltip-hide");

    expect(ev).to.exist;
    expect(ev.detail).to.be.null;
  });

  it("should show/hide with focus and blur events", async () => {
    //given
    const el = await fixture<typeOfBlTooltip>(
      html`<bl-tooltip><button slot="tooltip-trigger">Test</button> Test Tooltip </bl-tooltip>`
    );

    const tabKey =
      navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("HeadlessChrome")
        ? "Alt+Tab"
        : "Tab";

    //when
    setTimeout(async () => {
      // Focus tooltip
      await sendKeys({
        press: tabKey,
      });

      // Blur tooltip
      await sendKeys({
        press: tabKey,
      });
    });

    //then
    const ev = await oneEvent(el, "bl-tooltip-hide");

    expect(ev).to.exist;
    expect(el.visible).to.be.false;
  });

  it("should work with target attribute", async () => {
    // given
    const el = await fixture(html`
      <div><bl-tooltip target="btn">Tooltip Text</bl-tooltip><button type="button" id="btn">Test</button></div>`);

    const tooltipEl = el.querySelector("bl-tooltip")!;
    const trigger = el.querySelector<HTMLButtonElement>("#btn")!;

    // when
    const { x, y } = getMiddleOfElement(trigger);

    setTimeout(() => sendMouse({ type: "move", position: [x, y] }));

    // then
    const ev = await oneEvent(tooltipEl, "bl-tooltip-show");

    expect(ev).to.exist;
    expect(ev.detail).to.be.equal("");
  });

  it("should remove previous target elements", async () => {
    // given
    const el = await fixture(html`
      <div><bl-tooltip target="btn">Tooltip Text</bl-tooltip><button type="button" id="btn">Test</button><button type="button" id="new-btn">Test</button></div>`);

    const tooltipEl = el.querySelector("bl-tooltip")!;
    const triggerPrev = el.querySelector<HTMLButtonElement>("#btn")!;

    // when
    tooltipEl.target = "new-btn";
    const { x, y } = getMiddleOfElement(triggerPrev);

    setTimeout(() => sendMouse({ type: "move", position: [x, y] }));

    // then
    const ev = await new Promise(resolve => {
      function listener(ev: Event) {
        resolve(ev);
        tooltipEl.removeEventListener("bl-tooltip-show", listener);
      }
      tooltipEl.addEventListener("bl-tooltip-show", listener);
      setTimeout(() => {
        resolve(null);
        tooltipEl.removeEventListener("bl-tooltip-show", listener);
      }, 200);
    });

    expect(ev).to.be.eq(null);
  });
});
