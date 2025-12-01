import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import "./bl-segmented-control";
import "./segment/bl-segment";
import type BlSegmentedControl from "./bl-segmented-control";
import type BlSegment from "./segment/bl-segment";
import { sendKeys } from "@web/test-runner-commands";

describe("bl-segmented-control extra", () => {
  it("propagates iconOnly to segments", async () => {
    const el = await fixture<BlSegmentedControl>(html`
      <bl-segmented-control icon-only>
        <bl-segment value="one" label="One"></bl-segment>
        <bl-segment value="two" label="Two"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    const seg = el.querySelector("bl-segment") as BlSegment;

    expect(seg).to.exist;
    expect(seg.iconOnly).to.equal(true);
  });

  it("toggles aria-disabled and tabIndex when disabled changes", async () => {
    const el = await fixture<BlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment value="one" label="One"></bl-segment>
        <bl-segment value="two" label="Two"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    expect(el.getAttribute("aria-disabled")).to.equal(null);
    expect(el.tabIndex).to.equal(0);

    el.disabled = true;
    await elementUpdated(el);

    expect(el.getAttribute("aria-disabled")).to.equal("true");
    expect(el.tabIndex).to.equal(-1);

    // segments should become aria-disabled and lose tabindex
    const segments = el.querySelectorAll("bl-segment.content");

    expect((segments[0] as HTMLElement).getAttribute("aria-disabled")).to.equal("true");
    expect((segments[0] as HTMLElement).getAttribute("tabindex")).to.equal("-1");

    el.disabled = false;
    await elementUpdated(el);

    expect(el.getAttribute("aria-disabled")).to.equal(null);
    expect(el.tabIndex).to.equal(0);
    // focusedIndex defaults to selected (0) -> tabindex 0 on first
    expect((segments[0] as HTMLElement).getAttribute("aria-disabled")).to.equal(null);
    expect((segments[0] as HTMLElement).getAttribute("tabindex")).to.equal("0");
  });

  it("supports vertical keyboard navigation with Enter", async () => {
    const el = await fixture<BlSegmentedControl>(html`
      <bl-segmented-control orientation="vertical">
        <bl-segment value="one" label="One"></bl-segment>
        <bl-segment value="two" label="Two"></bl-segment>
        <bl-segment value="three" label="Three"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    await sendKeys({ press: "Tab" });
    await sendKeys({ press: "ArrowDown" });
    await sendKeys({ press: "Enter" });
    await elementUpdated(el);

    expect(el.value).to.equal("two");

    await sendKeys({ press: "ArrowUp" });
    await sendKeys({ press: " " });
    await elementUpdated(el);

    expect(el.value).to.equal("one");
  });

  it("selects the next available when selected segment is removed", async () => {
    const host = await fixture<HTMLDivElement>(html`<div></div>`);
    const el = document.createElement("bl-segmented-control") as BlSegmentedControl;

    host.appendChild(el);

    const s1 = document.createElement("bl-segment") as BlSegment;

    s1.setAttribute("value", "one");
    s1.setAttribute("label", "One");

    const s2 = document.createElement("bl-segment") as BlSegment;

    s2.setAttribute("value", "two");
    s2.setAttribute("label", "Two");

    const s3 = document.createElement("bl-segment") as BlSegment;

    s3.setAttribute("value", "three");
    s3.setAttribute("label", "Three");

    el.append(s1, s2, s3);
    await elementUpdated(el);

    // select two
    (s2 as unknown as HTMLElement).click();
    await elementUpdated(el);
    expect(el.value).to.equal("two");

    // remove selected -> should fall back to next available (first)
    s2.remove();
    await elementUpdated(el);
    expect(el.value).to.equal("one");
  });

  it("updates thumb CSS vars in RTL horizontal", async () => {
    const el = await fixture<BlSegmentedControl>(html`
      <bl-segmented-control dir="rtl">
        <bl-segment value="one" label="One"></bl-segment>
        <bl-segment value="two" label="Two"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    const wrapper = el.shadowRoot!.querySelector(".segmented") as HTMLElement;
    const track = el.shadowRoot!.querySelector(".track") as HTMLElement;
    const selected = el.querySelector('bl-segment.content[aria-checked="true"]') as HTMLElement;

    // ensure computed style reads RTL in test env
    (el as unknown as HTMLElement).style.direction = "rtl";

    const trackRect = new DOMRect(0, 0, 200, 20);
    const selectedRect = new DOMRect(120, 0, 60, 20);

    Object.defineProperty(track, "getBoundingClientRect", { value: () => trackRect });
    Object.defineProperty(selected, "getBoundingClientRect", { value: () => selectedRect });

    (el as unknown as { updateThumb: () => void }).updateThumb();

    expect(wrapper.style.getPropertyValue("--thumb-width")).to.equal("60px");
    expect(wrapper.style.getPropertyValue("--thumb-offset")).to.equal("20px");
    expect(wrapper.style.getPropertyValue("--thumb-height")).to.equal("");
  });

  it("updates thumb CSS vars in vertical orientation", async () => {
    const el = await fixture<BlSegmentedControl>(html`
      <bl-segmented-control orientation="vertical">
        <bl-segment value="one" label="One"></bl-segment>
        <bl-segment value="two" label="Two"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    const wrapper = el.shadowRoot!.querySelector(".segmented") as HTMLElement;
    const track = el.shadowRoot!.querySelector(".track") as HTMLElement;
    const selected = el.querySelector('bl-segment.content[aria-checked="true"]') as HTMLElement;

    const trackRect = new DOMRect(0, 10, 200, 200);
    const selectedRect = new DOMRect(0, 50, 200, 50);

    Object.defineProperty(track, "getBoundingClientRect", { value: () => trackRect });
    Object.defineProperty(selected, "getBoundingClientRect", { value: () => selectedRect });

    (el as unknown as { updateThumb: () => void }).updateThumb();

    expect(wrapper.style.getPropertyValue("--thumb-height")).to.equal("50px");
    expect(wrapper.style.getPropertyValue("--thumb-offset")).to.equal("40px");
    expect(wrapper.style.getPropertyValue("--thumb-width")).to.equal("");
  });

  it("observes wrapper and segments with ResizeObserver", async () => {
    const observed: Element[] = [];
    const win = window as unknown as { ResizeObserver: typeof ResizeObserver };
    const OriginalRO = win.ResizeObserver;

    class FakeRO {
      constructor(public cb: ResizeObserverCallback) {}
      observe(el: Element) { observed.push(el); }
      disconnect() {}
    }
    win.ResizeObserver = FakeRO as unknown as typeof ResizeObserver;

    try {
      const el = await fixture<BlSegmentedControl>(html`
        <bl-segmented-control>
          <bl-segment value="one" label="One"></bl-segment>
          <bl-segment value="two" label="Two"></bl-segment>
        </bl-segmented-control>
      `);

      await elementUpdated(el);
      (el as unknown as { setupResizeObserver: () => void }).setupResizeObserver();

      expect(observed.some(n => (n as HTMLElement).classList?.contains("segmented"))).to.equal(true);
      // 2+ segments observed as well (can be observed multiple times during lifecycle)
      expect(observed.filter(n => n.tagName?.toLowerCase() === "bl-segment").length).to.be.greaterThanOrEqual(2);
    } finally {
      win.ResizeObserver = OriginalRO;
    }
  });

  it("applies selected color as CSS var on wrapper", async () => {
    const el = await fixture<BlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment value="one" label="One" color="#f00"></bl-segment>
        <bl-segment value="two" label="Two"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    const wrapper = el.shadowRoot!.querySelector(".segmented") as HTMLElement;

    expect(wrapper.getAttribute("style")).to.contain("--selected-bg: #f00");
  });

  it("updates segments when iconOnly toggles at runtime", async () => {
    const el = await fixture<BlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment value="one" label="One"></bl-segment>
        <bl-segment value="two" label="Two"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);
    const seg = el.querySelector("bl-segment") as BlSegment;

    expect(seg.iconOnly).to.equal(false);

    el.iconOnly = true;
    await elementUpdated(el);

    expect(seg.iconOnly).to.equal(true);
  });
});
