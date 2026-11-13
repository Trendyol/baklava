import { assert, aTimeout, fixture, expect, html, elementUpdated } from "@open-wc/testing";
import BlPopover from "./bl-popover";
import type typeOfBlPopover from "./bl-popover";
import type typeOfBlButton from "../button/bl-button";
import { sendKeys } from "@web/test-runner-commands";

describe("bl-popover", () => {
  it("should be defined popover instance", () => {
    const el = document.createElement("bl-popover");

    assert.instanceOf(el, BlPopover);
  });

  it("should be rendered with default values", async () => {
    const el = await fixture<BlPopover>(html`<bl-popover></bl-popover>`);

    assert.shadowDom.equal(
      el,
      `<div class="popover" popover="manual">
      <slot id="popover" aria-live="off"></slot>
      <div class="arrow" aria-hidden="true"></div>
    </div>`
    );
  });

  it("should have correct default values", async () => {
    const el = await fixture<BlPopover>(html`<bl-popover>Test</bl-popover>`);

    expect(el.placement).to.equal("bottom");
  });

  it("should be rendered with slot", async () => {
    const el = await fixture<BlPopover>(
      html`<bl-popover><span class="test">Popover Content</span></bl-popover>`
    );

    expect(el.shadowRoot?.querySelector("#popover")).to.exist;
  });

  it("should be rendered successful with fit-size", async () => {
    const el = await fixture<BlPopover>(html`<bl-popover fit-size>Popover Content</bl-popover>`);

    el.show();
    expect(el).to.exist;
  });

  it("should be visible when show function triggered", async () => {
    const el = await fixture<BlPopover>(html`<bl-popover>Popover Content</bl-popover>`);

    await el.show();
    expect(el.visible).to.be.true;
  });
  it("should not be visible when hide function triggered", async () => {
    const el = await fixture<BlPopover>(html`<bl-popover>Popover Content</bl-popover>`);

    await el.show();
    expect(el.visible).to.be.true;

    await el.hide();
    expect(el.visible).to.be.false;
  });

  it("should be closed by default and not reflect the open attribute", async () => {
    const el = await fixture<BlPopover>(html`<bl-popover>Popover Content</bl-popover>`);

    expect(el.open).to.be.false;
    expect(el.hasAttribute("open")).to.be.false;
  });

  it("should be visible when open attribute is set initially", async () => {
    const el = await fixture<BlPopover>(html`<bl-popover open>Popover Content</bl-popover>`);

    expect(el.visible).to.be.true;
    expect(el.shadowRoot?.querySelector(".popover")?.classList.contains("visible")).to.be.true;
    expect(el.shadowRoot?.querySelector("slot")?.getAttribute("aria-live")).to.equal("polite");

    if ("popover" in HTMLElement.prototype) {
      expect(el.shadowRoot?.querySelector(".popover")?.matches(":popover-open")).to.be.true;
    }
  });

  it("should show and hide when open property changes", async () => {
    const el = await fixture<BlPopover>(html`<bl-popover>Popover Content</bl-popover>`);
    const popoverEl = el.shadowRoot!.querySelector<HTMLElement>(".popover")!;
    const supported = "popover" in HTMLElement.prototype;

    el.open = true;
    await elementUpdated(el);

    expect(el.visible).to.be.true;
    expect(popoverEl.classList.contains("visible")).to.be.true;
    if (supported) expect(popoverEl.matches(":popover-open")).to.be.true;

    el.open = false;
    await elementUpdated(el);

    expect(el.visible).to.be.false;
    expect(popoverEl.classList.contains("visible")).to.be.false;
    if (supported) expect(popoverEl.matches(":popover-open")).to.be.false;
  });

  it("should fire show and hide events once when open property changes", async () => {
    const el = await fixture<BlPopover>(html`<bl-popover>Popover Content</bl-popover>`);
    let showCount = 0;
    let hideCount = 0;

    el.addEventListener("bl-popover-show", () => showCount++);
    el.addEventListener("bl-popover-hide", () => hideCount++);

    el.open = true;
    await elementUpdated(el);
    expect(showCount).to.equal(1);
    expect(hideCount).to.equal(0);

    el.open = false;
    await elementUpdated(el);
    expect(showCount).to.equal(1);
    expect(hideCount).to.equal(1);
  });

  it("should fire show and hide events once when show and hide methods are used", async () => {
    const el = await fixture<BlPopover>(html`<bl-popover>Popover Content</bl-popover>`);
    let showCount = 0;
    let hideCount = 0;

    el.addEventListener("bl-popover-show", () => showCount++);
    el.addEventListener("bl-popover-hide", () => hideCount++);

    el.show();
    await elementUpdated(el);
    el.hide();
    await elementUpdated(el);

    expect(showCount).to.equal(1);
    expect(hideCount).to.equal(1);
  });

  it("should reflect the open attribute when shown and hidden by methods", async () => {
    const el = await fixture<BlPopover>(html`<bl-popover>Popover Content</bl-popover>`);

    el.show();
    await elementUpdated(el);
    expect(el.hasAttribute("open")).to.be.true;

    el.hide();
    await elementUpdated(el);
    expect(el.hasAttribute("open")).to.be.false;
  });

  it("should set open to false when closed by Escape key", async () => {
    const el = await fixture<BlPopover>(html`<bl-popover open>Popover Content</bl-popover>`);

    await sendKeys({ press: "Escape" });
    await elementUpdated(el);

    expect(el.open).to.be.false;
    expect(el.hasAttribute("open")).to.be.false;
  });

  it("should position the popover when it is open initially and target is set later", async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div style="padding: 250px;">
        <button id="late-target">Trigger</button>
        <bl-popover open placement="bottom">Popover Content</bl-popover>
      </div>
    `);
    const popoverEl = wrapper.querySelector<BlPopover>("bl-popover")!;
    const target = wrapper.querySelector<HTMLElement>("#late-target")!;
    const popoverDiv = popoverEl.shadowRoot!.querySelector<HTMLElement>(".popover")!;

    popoverEl.target = target;
    await elementUpdated(popoverEl);
    await aTimeout(50);

    const targetRect = target.getBoundingClientRect();
    const popoverRect = popoverDiv.getBoundingClientRect();

    expect(Math.abs(popoverRect.top - targetRect.bottom)).to.be.lessThan(100);
  });

  it("should be triggered successful when target assigned by id", async () => {
    const body = await fixture<HTMLBodyElement>(html`
      <div style="width: 1500px;height: 1500px;">
        <bl-button id="mybtn"></bl-button>
        <bl-popover id="mypopover" fit-size placement="bottom" offset="5" target="mybtn">
          <span>Popover Content</span>
        </bl-popover>
      </div>
    `);

    const popoverEl = body.querySelector("bl-popover") as typeOfBlPopover;
    const btnEl = body.querySelector("bl-button") as typeOfBlButton;

    popoverEl.setAttribute("target", "mybtn");
    btnEl.onclick = () => {
      popoverEl.show();
    };
    await btnEl.click();
    await elementUpdated(popoverEl);

    expect(popoverEl.visible).to.equal(true);
  });
  it("should be triggered successful when target assigned by object", async () => {
    const body = await fixture<HTMLBodyElement>(html`
      <div style="width: 1500px;height: 1500px;">
        <bl-button id="mybtn"></bl-button>
        <bl-popover id="mypopover" fit-size placement="bottom" offset="5">
          <span>Popover Content</span>
        </bl-popover>
      </div>
    `);

    const popoverEl = body.querySelector("bl-popover") as typeOfBlPopover;
    const btnEl = body.querySelector("bl-button") as typeOfBlButton;

    popoverEl.target = btnEl;
    btnEl.onclick = () => {
      popoverEl.show();
    };
    await btnEl.click();
    await elementUpdated(popoverEl);
    expect(popoverEl.visible).to.equal(true);
  });
  it("should get warning when invalid target type assigned", async () => {
    const body = await fixture<HTMLBodyElement>(html`
      <div style="width: 1500px;height: 1500px;">
        <bl-button id="mybtn"></bl-button>
        <bl-popover id="mypopover" fit-size placement="bottom" offset="5">
          <span>Popover Content</span>
        </bl-popover>
      </div>
    `);

    const popoverEl = body.querySelector("bl-popover") as typeOfBlPopover;

    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    popoverEl.target = 2;
    expect(popoverEl.target).to.be.undefined;
  });
  it("should hide popover when press esc", async () => {
    const body = await fixture<HTMLBodyElement>(html`
      <div style="width: 1500px;height: 1500px;">
        <bl-button id="mybtn"></bl-button>
        <bl-popover id="mypopover" fit-size placement="bottom" offset="5">
          <span>Popover Content</span>
        </bl-popover>
      </div>
    `);

    const popoverEl = body.querySelector("bl-popover") as typeOfBlPopover;

    popoverEl.show();

    await sendKeys({ down: "Escape" });

    expect(popoverEl.visible).to.equal(false);
  });
  it("should hide popover when click outside", async () => {
    const body = await fixture<HTMLBodyElement>(html`
      <div style="width: 1500px;height: 1500px;">
        <bl-button id="mybtn"></bl-button>
        <bl-popover id="mypopover" fit-size placement="bottom" offset="5" target="mybtn">
          <span>Popover Content</span>
        </bl-popover>
      </div>
    `);

    const popoverEl = body.querySelector("bl-popover") as typeOfBlPopover;
    const btnEl = body.querySelector("bl-button") as typeOfBlButton;

    popoverEl.setAttribute("target", "mybtn");
    btnEl.onclick = () => {
      popoverEl.show();
    };
    await btnEl.click();

    expect(popoverEl.visible).to.true;

    const outside = <HTMLBodyElement>popoverEl.closest("body");

    outside.click();

    setTimeout(() => {
      expect(popoverEl.visible).to.false;
    });
  });

  it("should hide when another bl-popover triggers show", async () => {
    const body = await fixture<HTMLBodyElement>(html`
      <div style="width: 1500px;height: 1500px;">
        <bl-button id="mybtn"></bl-button>
        <bl-popover id="mypopover" fit-size placement="bottom" offset="5" target="mybtn">
          <span>Popover Content</span>
        </bl-popover>
        <bl-button id="mybtn-2"></bl-button>
        <bl-popover id="mypopover2" fit-size placement="bottom" offset="5" target="mybtn2">
          <span>Popover Content</span>
        </bl-popover>
      </div>
    `);

    const popoverEl = body.querySelector("#mypopover") as typeOfBlPopover;
    const popoverEl2 = body.querySelector("#mypopover2") as typeOfBlPopover;
    const btnEl = body.querySelector("bl-button") as typeOfBlButton;

    popoverEl.setAttribute("target", "mybtn");
    popoverEl2.setAttribute("target", "mybtn-2");
    btnEl.onclick = () => {
      popoverEl.show();
    };
    await btnEl.click();

    expect(popoverEl.visible).to.true;

    popoverEl2.show();

    setTimeout(() => {
      expect(popoverEl2.visible).to.true;
      expect(popoverEl.visible).to.false;
    });
  });

  it("should not hide when child bl-popover triggers show", async () => {
    const body = await fixture<HTMLBodyElement>(html`
      <div style="width: 1500px;height: 1500px;">
        <bl-button id="mybtn"></bl-button>
        <bl-popover id="mypopover" fit-size placement="bottom" offset="5" target="mybtn">
          <bl-button id="mybtn-2"></bl-button>
          <bl-popover id="mypopover2" fit-size placement="bottom" offset="5" target="mybtn2">
            <span>Popover Content</span>
          </bl-popover>
        </bl-popover>
      </div>
    `);

    const popoverEl = body.querySelector("#mypopover") as typeOfBlPopover;
    const popoverEl2 = body.querySelector("#mypopover2") as typeOfBlPopover;
    const btnEl = body.querySelector("bl-button") as typeOfBlButton;

    popoverEl.setAttribute("target", "mybtn");
    popoverEl2.setAttribute("target", "mybtn-2");
    btnEl.onclick = () => {
      popoverEl.show();
    };
    await btnEl.click();

    expect(popoverEl.visible).to.true;

    popoverEl2.show();

    setTimeout(() => {
      expect(popoverEl2.visible).to.true;
      expect(popoverEl.visible).to.true;
    });
  });

  it("should put the popover into the top layer when shown (supported browsers)", async () => {
    const el = await fixture<BlPopover>(html`<bl-popover>Popover Content</bl-popover>`);
    const popoverEl = el.shadowRoot!.querySelector<HTMLElement>(".popover")!;

    // Skip assertion on browsers without Popover API support.
    if (!("popover" in HTMLElement.prototype)) {
      return;
    }

    el.show();
    await elementUpdated(el);

    expect(popoverEl.matches(":popover-open")).to.be.true;
    expect(el.visible).to.be.true;
  });

  it("should remove the popover from the top layer when hidden (supported browsers)", async () => {
    const el = await fixture<BlPopover>(html`<bl-popover>Popover Content</bl-popover>`);
    const popoverEl = el.shadowRoot!.querySelector<HTMLElement>(".popover")!;

    if (!("popover" in HTMLElement.prototype)) {
      return;
    }

    el.show();
    await elementUpdated(el);
    el.hide();
    await elementUpdated(el);

    expect(popoverEl.matches(":popover-open")).to.be.false;
    expect(el.visible).to.be.false;
  });

  it("should not throw and should clean up when disconnected while open", async () => {
    const el = await fixture<BlPopover>(html`<bl-popover>Popover Content</bl-popover>`);

    el.show();
    await elementUpdated(el);

    expect(() => el.remove()).to.not.throw();
    expect(el.isConnected).to.be.false;
  });

  it("should position near its target even inside a transformed (stacking-context) ancestor", async () => {
    // A `transform` on an ancestor establishes the containing block for the
    // popover even when it is promoted to the top layer. floating-ui must still
    // place the popover next to its target, not at the viewport origin (0,0).
    const wrapper = await fixture<HTMLDivElement>(html`
      <div style="transform: translateZ(0); overflow: auto; padding: 250px;">
        <bl-button id="transformed-target">Trigger</bl-button>
        <bl-popover target="transformed-target" placement="bottom">Popover Content</bl-popover>
      </div>
    `);

    const popoverEl = wrapper.querySelector<BlPopover>("bl-popover")!;
    const target = wrapper.querySelector<HTMLElement>("#transformed-target")!;
    const popoverDiv = popoverEl.shadowRoot!.querySelector<HTMLElement>(".popover")!;

    popoverEl.target = target;
    popoverEl.show();
    await elementUpdated(popoverEl);
    // Let floating-ui's async computePosition / autoUpdate run.
    await aTimeout(50);

    const targetRect = target.getBoundingClientRect();
    const popoverRect = popoverDiv.getBoundingClientRect();

    // The popover must be rendered close to its target, not at the viewport origin.
    expect(popoverRect.top).to.be.greaterThan(targetRect.top);
    expect(Math.abs(popoverRect.top - targetRect.bottom)).to.be.lessThan(100);
  });

  it("should hide the popover when its target is outside the viewport", async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div>
        <div
          id="offscreen-target"
          style="position: fixed; top: -1000px; left: 0; width: 120px; height: 40px"
        ></div>
        <bl-popover placement="bottom">Popover Content</bl-popover>
      </div>
    `);

    const popoverEl = wrapper.querySelector<BlPopover>("bl-popover")!;
    const popoverDiv = popoverEl.shadowRoot!.querySelector<HTMLElement>(".popover")!;

    popoverEl.target = wrapper.querySelector<HTMLElement>("#offscreen-target")!;
    popoverEl.show();
    await elementUpdated(popoverEl);
    await aTimeout(50);

    expect(popoverEl.visible).to.be.true;
    expect(getComputedStyle(popoverDiv).visibility).to.equal("hidden");
  });

  it("should keep the popover visible while its target stays inside the viewport", async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div>
        <div
          id="onscreen-target"
          style="position: fixed; top: 120px; left: 0; width: 120px; height: 40px"
        ></div>
        <bl-popover placement="bottom">Popover Content</bl-popover>
      </div>
    `);

    const popoverEl = wrapper.querySelector<BlPopover>("bl-popover")!;
    const popoverDiv = popoverEl.shadowRoot!.querySelector<HTMLElement>(".popover")!;

    popoverEl.target = wrapper.querySelector<HTMLElement>("#onscreen-target")!;
    popoverEl.show();
    await elementUpdated(popoverEl);
    await aTimeout(50);

    expect(getComputedStyle(popoverDiv).visibility).to.equal("visible");
  });
});
