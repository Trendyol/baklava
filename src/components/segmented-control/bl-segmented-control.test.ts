import { fixture, html, assert, expect, elementUpdated } from "@open-wc/testing";
import "./bl-segmented-control";
import "./segment/bl-segment";
import BlSegmentedControl from "./bl-segmented-control";
import type typeOfBlSegmentedControl from "./bl-segmented-control";
import { sendKeys } from "@web/test-runner-commands";

describe("bl-segmented-control", () => {
  it("is defined", () => {
    const el = document.createElement("bl-segmented-control");

    assert.instanceOf(el, BlSegmentedControl);
  });

  it("renders with provided segments and selects first by default", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment label="One" value="one"></bl-segment>
        <bl-segment label="Two" value="two"></bl-segment>
        <bl-segment label="Three" value="three"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);
    expect(el.value).to.equal("one");

    const items = el.querySelectorAll(".content");

    expect(items.length).to.equal(3);
    expect((items[0] as HTMLElement).getAttribute("aria-checked")).to.equal("true");
  });

  it("renders empty component", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control></bl-segmented-control>
    `);

    await elementUpdated(el);
    const items = el.querySelectorAll(".content");

    expect(items.length).to.equal(0);
    expect(el.value).to.equal("");

    await sendKeys({ press: "Tab" });
    await sendKeys({ press: "ArrowRight" });
    await sendKeys({ press: "Space" });

    expect(items.length).to.equal(0);
    expect(el.value).to.equal("");
  });

  it("renders with provided segments and selects first by default with RTL", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control dir="rtl">
        <bl-segment label="One" value="one"></bl-segment>
        <bl-segment label="Two" value="two"></bl-segment>
        <bl-segment label="Three" value="three"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);
    expect(el.value).to.equal("one");

    const items = el.querySelectorAll(".content");

    expect(items.length).to.equal(3);
    expect((items[0] as HTMLElement).getAttribute("aria-checked")).to.equal("true");
  });

  it("renders with only icons and no label", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control icon-only>
        <bl-segment value="source" icon="code"></bl-segment>
        <bl-segment value="preview" icon="eye_on"></bl-segment>
        <bl-segment value="export" icon="export"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);
    expect(el.value).to.equal("source");

    const items = el.querySelectorAll(".content");

    expect(items.length).to.equal(3);
    expect((items[0] as HTMLElement).getAttribute("aria-checked")).to.equal("true");
  });

  it("emits change event and updates value on click", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment label="One" value="one"></bl-segment>
        <bl-segment label="Two" value="two"></bl-segment>
        <bl-segment label="Three" value="three"></bl-segment>
      </bl-segmented-control>
    `);

    const items = el.querySelectorAll(".content");

    let detail: string | null = null;

    el.addEventListener("bl-segmented-control-change", (e: Event) => {
      detail = (e as CustomEvent<string>).detail;
    });

    (items[1] as HTMLElement).click();
    await elementUpdated(el);

    expect(el.value).to.equal("two");
    expect(detail).to.equal("two");
  });

  it("supports pre-selected value", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control value="svelte" orientation="horizontal">
        <bl-segment label="React" value="react"></bl-segment>
        <bl-segment label="Vue" value="vue"></bl-segment>
        <bl-segment label="Svelte" value="svelte"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    // Value should remain as provided
    expect(el.value).to.equal("svelte");

    // The selected segment should have aria-checked="true"
    const segments = el.querySelectorAll("bl-segment.content");

    expect(segments.length).to.equal(3);

    expect((segments[2] as HTMLElement).getAttribute("aria-checked")).to.equal("true");

    // The wrapper should indicate it has a selection (thumb will be positioned correctly)
    const wrapper = el.shadowRoot!.querySelector(".segmented") as HTMLElement;

    expect(wrapper?.getAttribute("data-has-selection")).to.equal("true");
  });

  it("supports pre-selected value from segment", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control orientation="horizontal">
        <bl-segment label="React" value="react"></bl-segment>
        <bl-segment label="Vue" value="vue"></bl-segment>
        <bl-segment label="Svelte" value="svelte" selected></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    // Value should remain as provided
    expect(el.value).to.equal("svelte");

    // The selected segment should have aria-checked="true"
    const segments = el.querySelectorAll("bl-segment.content");

    expect(segments.length).to.equal(3);

    expect((segments[2] as HTMLElement).getAttribute("aria-checked")).to.equal("true");

    // The wrapper should indicate it has a selection (thumb will be positioned correctly)
    const wrapper = el.shadowRoot!.querySelector(".segmented") as HTMLElement;

    expect(wrapper?.getAttribute("data-has-selection")).to.equal("true");
  });

  it("supports pre-selected value from segment when first in row are disabled", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control orientation="horizontal">
        <bl-segment label="React" value="react" disabled></bl-segment>
        <bl-segment label="Vue" value="vue" disabled></bl-segment>
        <bl-segment label="Svelte" value="svelte"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    // Value should remain as provided
    expect(el.value).to.equal("svelte");

    // The selected segment should have aria-checked="true"
    const segments = el.querySelectorAll("bl-segment.content");

    expect(segments.length).to.equal(3);
    expect((segments[2] as HTMLElement).getAttribute("aria-checked")).to.equal("true");

    // The wrapper should indicate it has a selection (thumb will be positioned correctly)
    const wrapper = el.shadowRoot!.querySelector(".segmented") as HTMLElement;

    expect(wrapper?.getAttribute("data-has-selection")).to.equal("true");
  });

  it("supports keyboard navigation and selection", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment label="One" value="one"></bl-segment>
        <bl-segment label="Two" value="two"></bl-segment>
        <bl-segment label="Three" value="three"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    // focus the host then navigate to the next and select
    await sendKeys({ press: "Tab" });
    await sendKeys({ press: "ArrowRight" });
    await sendKeys({ press: "Space" });

    await elementUpdated(el);
    expect(el.value).to.equal("two");
  });


  it("can be vertical", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control orientation="vertical">
        <bl-segment label="One" value="one"></bl-segment>
        <bl-segment label="Two" value="two"></bl-segment>
        <bl-segment label="Three" value="three"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    expect(el.getAttribute("orientation")).to.equal("vertical");
  });

  it("should not select disabled segments on click", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment label="One" value="one"></bl-segment>
        <bl-segment label="Two" value="two" disabled></bl-segment>
        <bl-segment label="Three" value="three"></bl-segment>
      </bl-segmented-control>
    `);

    const items = el.querySelectorAll(".content");

    (items[1] as HTMLElement).click();
    await elementUpdated(el);

    expect(el.value).to.equal("one");
  });

  it("should not select anything if all options are disabled", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment label="One" value="one" disabled></bl-segment>
        <bl-segment label="Two" value="two" disabled></bl-segment>
        <bl-segment label="Three" value="three" disabled></bl-segment>
      </bl-segmented-control>
    `);

    const items = el.querySelectorAll(".content");

    (items[1] as HTMLElement).click();
    await elementUpdated(el);

    expect(el.value).to.equal("");
  });

  it("uses pre-selected enabled child when value is empty (covers else in render init)", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment label="One" value="one"></bl-segment>
        <bl-segment label="Two" value="two" selected></bl-segment>
        <bl-segment label="Three" value="three" disabled></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);
    expect(el.value).to.equal("two");
  });

  it("should not select any segments on click when component is disabled", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control disabled>
        <bl-segment label="One" value="one"></bl-segment>
        <bl-segment label="Two" value="two"></bl-segment>
        <bl-segment label="Three" value="three"></bl-segment>
      </bl-segmented-control>
    `);

    const items = el.querySelectorAll(".content");

    (items[0] as HTMLElement).click();
    await elementUpdated(el);
    (items[1] as HTMLElement).click();
    await elementUpdated(el);
    (items[2] as HTMLElement).click();
    await elementUpdated(el);

    // it'll retain the initial value just like a radio button
    expect(el.value).to.equal("one");
  });

  it("should skip disabled segments during keyboard navigation", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment label="One" value="one"></bl-segment>
        <bl-segment label="Two" value="two" disabled></bl-segment>
        <bl-segment label="Three" value="three"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);
    await sendKeys({ press: "Tab" });
    await sendKeys({ press: "ArrowRight" });
    await sendKeys({ press: "Space" });

    expect(el.value).to.equal("three");
  });

  it("should skip disabled segments when clicked", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment label="One" value="one"></bl-segment>
        <bl-segment label="Two" value="two" disabled></bl-segment>
        <bl-segment label="Three" value="three"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    const items = el.querySelectorAll(".content");

    (items[2] as HTMLElement).click();
    (items[1] as HTMLElement).click();
    await elementUpdated(el);

    expect(el.value).to.equal("three");
  });

  it("render pseudo segement with value", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    expect(el.value).to.equal("");
  });

  it("does nothing on keydown when no segments", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`<bl-segmented-control></bl-segmented-control>`);

    await elementUpdated(el);

    // Simulate various keydowns; handler should early-return and not change value
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
    el.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));

    expect(el.value).to.equal("");
  });

  it("keyboard next/prev with no available indices", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment value="a" disabled></bl-segment>
        <bl-segment value="b" disabled></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    // Focus host and try to move; there are no enabled indices
    await sendKeys({ press: "Tab" });
    await sendKeys({ press: "ArrowRight" });
    await sendKeys({ press: "ArrowLeft" });

    expect(el.value).to.equal("");
  });

  it("does not select with keyboard when control is disabled", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control disabled>
        <bl-segment value="a"></bl-segment>
        <bl-segment value="b"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    // Dispatch directly to the host; selection should not change due to disabled guard
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    el.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    await elementUpdated(el);

    // Initial value remains "a"
    expect(el.value).to.equal("a");
  });

  it("does not select disabled option with Space even if focusedIndex points to it", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment value="a"></bl-segment>
        <bl-segment value="b" disabled></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    // Force focus to a disabled index and press Space; selection should not change
    (el as unknown as { focusedIndex: number }).focusedIndex = 1;
    el.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    await elementUpdated(el);

    expect(el.value).to.equal("a");
  });

  it("update cycle safe with no segments", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`<bl-segmented-control></bl-segmented-control>`);

    await elementUpdated(el);

    // Calling internal updateThumb directly should be a no-op and not throw
    (el as unknown as { updateThumb: () => void }).updateThumb();

    expect(el.value).to.equal("");
  });

  it("recreates ResizeObserver and disconnects previous instance safely", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment value="a"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    // First setup creates an observer
    (el as unknown as { setupResizeObserver: () => void }).setupResizeObserver();
    // Second setup should disconnect the previous one and recreate
    (el as unknown as { setupResizeObserver: () => void }).setupResizeObserver();

    // Sanity check: value remains unchanged
    expect(el.value).to.equal("a");
  });

  it("wraps backward with ArrowLeft and selects last on Space", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment value="one"></bl-segment>
        <bl-segment value="two"></bl-segment>
        <bl-segment value="three"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    // Focus host and move backward; should wrap to last index, then select it
    await sendKeys({ press: "Tab" });
    await sendKeys({ press: "ArrowLeft" });
    await sendKeys({ press: "Space" });
    await elementUpdated(el);

    expect(el.value).to.equal("three");
  });

  it("ignores Space when focusedIndex is out of range (no option to select)", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment value="a"></bl-segment>
        <bl-segment value="b"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    // Initially selects first enabled ("a")
    expect(el.value).to.equal("a");

    // Force an invalid focus index, then try to select
    (el as unknown as { focusedIndex: number }).focusedIndex = 999;
    el.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    await elementUpdated(el);

    // Selection remains unchanged because option was undefined
    expect(el.value).to.equal("a");
  });

  it("setupResizeObserver is safe when there is no shadowRoot yet", async () => {
    // Not using fixture keeps the element unrendered (no shadow root yet)
    const el = document.createElement("bl-segmented-control") as unknown as {
      setupResizeObserver: () => void;
    };

    // Should be a no-op without throwing
    el.setupResizeObserver();
  });

  it("updateThumb is safe when there is no shadowRoot yet", async () => {
    const el = document.createElement("bl-segmented-control") as unknown as {
      updateThumb: () => void;
    };

    // Should be a no-op without throwing
    el.updateThumb();
  });

  it("updateThumb returns early when value does not match any segment (idx < 0)", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment value="x"></bl-segment>
        <bl-segment value="y"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    // Set a value that doesn't exist among segments
    el.value = "non-existent";
    await elementUpdated(el);

    // Direct call to ensure guard path executes; should not throw
    (el as unknown as { updateThumb: () => void }).updateThumb();

    // Value stays as set; guard simply avoids measuring
    expect(el.value).to.equal("non-existent");
  });

  it("ignores bl-segment-click with unknown value (index === -1 path)", async () => {
    const el = await fixture<typeOfBlSegmentedControl>(html`
      <bl-segmented-control>
        <bl-segment value="a"></bl-segment>
        <bl-segment value="b"></bl-segment>
      </bl-segmented-control>
    `);

    await elementUpdated(el);

    // Initial selection should be the first enabled
    expect(el.value).to.equal("a");

    let fired = false;

    el.addEventListener("bl-segmented-control-change", () => (fired = true));

    // Dispatch a click event carrying a non-existent value so indexOfValue === -1
    const ev = new CustomEvent("bl-segment-click", {
      detail: { value: "unknown" },
      bubbles: true,
      composed: true,
    });

    el.dispatchEvent(ev);
    await elementUpdated(el);

    // Should remain unchanged and not emit change
    expect(el.value).to.equal("a");
    expect(fired).to.equal(false);
  });
});
