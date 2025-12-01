import { elementUpdated, expect, fixture, html, oneEvent } from "@open-wc/testing";
import "./bl-segment";
import "../bl-segmented-control";
import type BlSegment from "./bl-segment";

describe("bl-segment", () => {
  it("sets slot=segments on connect", async () => {
    const el = await fixture<BlSegment>(html`<bl-segment value="v" label="L"></bl-segment>`);

    await elementUpdated(el);

    expect(el.getAttribute("slot")).to.equal("segments");
  });

  it("renders label fallback to value when no label provided", async () => {
    const el = await fixture<BlSegment>(html`<bl-segment value="v"></bl-segment>`);

    await elementUpdated(el);
    // light DOM holder, but internal render creates a span with value text
    // attach into a segmented control to render inside
    const host = await fixture(html`<bl-segmented-control></bl-segmented-control>`);

    host.appendChild(el);
    await elementUpdated(host);

    const slotted = host.querySelector("bl-segment") as BlSegment;

    expect(slotted).to.exist;

    const label = (slotted.renderRoot as ShadowRoot).querySelector(".label") as HTMLElement;

    expect(label?.textContent).to.equal("v");
  });

  it("emits bl-segment-click with detail on click when enabled", async () => {
    const host = await fixture(html`<bl-segmented-control>
      <bl-segment value="a" label="A"></bl-segment>
    </bl-segmented-control>`);

    const seg = host.querySelector("bl-segment") as BlSegment;
    const listener = oneEvent(seg, "bl-segment-click");

    (seg as unknown as HTMLElement).click();

    const ev = (await listener) as CustomEvent<{ value: string; segment: BlSegment }>;

    expect(ev.detail.value).to.equal("a");
    expect(ev.detail.segment).to.equal(seg);
  });

  it("does not emit click event when disabled", async () => {
    const host = await fixture(html`<bl-segmented-control>
      <bl-segment value="a" label="A" disabled></bl-segment>
    </bl-segmented-control>`);

    const seg = host.querySelector("bl-segment") as BlSegment;
    let fired = false;

    seg.addEventListener("bl-segment-click", () => (fired = true));

    (seg as unknown as HTMLElement).click();
    await elementUpdated(host);

    expect(fired).to.equal(false);
  });
});
