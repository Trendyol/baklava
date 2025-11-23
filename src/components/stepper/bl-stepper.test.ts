import { assert, elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import * as sinon from "sinon";
import BlStepper from "./bl-stepper";
import BlStepperItem from "./bl-stepper-item";

describe("bl-stepper", () => {
  it("is defined", () => {
    const el = document.createElement("bl-stepper");

    assert.instanceOf(el, BlStepper);
  });

  it("renders with default values", async () => {
    const el = await fixture<BlStepper>(html`
      <bl-stepper>
        <bl-stepper-item id="1" title="Step 1"></bl-stepper-item>
        <bl-stepper-item id="2" title="Step 2"></bl-stepper-item>
      </bl-stepper>
    `);

    expect(el.type).to.equal("dot");
    expect(el.direction).to.equal("horizontal");
    expect(el.usage).to.equal("clickable");
  });

  it("renders with custom attributes", async () => {
    const el = await fixture<BlStepper>(html`
      <bl-stepper type="number" direction="vertical" usage="non-clickable">
        <bl-stepper-item id="1" title="Step 1"></bl-stepper-item>
        <bl-stepper-item id="2" title="Step 2"></bl-stepper-item>
      </bl-stepper>
    `);

    expect(el.type).to.equal("number");
    expect(el.direction).to.equal("vertical");
    expect(el.usage).to.equal("non-clickable");
  });

  it("dispatches bl-stepper-change event when item is clicked", async () => {
    const el = await fixture<BlStepper>(html`
      <bl-stepper>
        <bl-stepper-item id="1" title="Step 1" variant="default"></bl-stepper-item>
        <bl-stepper-item id="2" title="Step 2" variant="active"></bl-stepper-item>
        <bl-stepper-item id="3" title="Step 3" variant="default"></bl-stepper-item>
      </bl-stepper>
    `);

    const changeSpy = sinon.spy();

    el.addEventListener("bl-stepper-change", changeSpy);

    const firstItem = el.querySelector("bl-stepper-item[id='1']") as BlStepperItem;
    const stepperItemElement = firstItem.shadowRoot!.querySelector(".stepper-item") as HTMLElement;

    stepperItemElement.click();

    await elementUpdated(el);

    expect(changeSpy.calledOnce).to.be.true;
    expect(changeSpy.firstCall.args[0].detail).to.deep.equal({
      currentStep: 0,
      totalSteps: 3,
      activeStep: 0,
    });
  });

  it("does not dispatch change event when usage is non-clickable", async () => {
    const el = await fixture<BlStepper>(html`
      <bl-stepper usage="non-clickable">
        <bl-stepper-item id="1" title="Step 1"></bl-stepper-item>
        <bl-stepper-item id="2" title="Step 2"></bl-stepper-item>
      </bl-stepper>
    `);

    const changeSpy = sinon.spy();

    el.addEventListener("bl-stepper-change", changeSpy);

    const firstItem = el.querySelector("bl-stepper-item[id='1']") as BlStepperItem;

    firstItem.click();

    expect(changeSpy.called).to.be.false;
  });

  it("updates item variants when item is clicked", async () => {
    const el = await fixture<BlStepper>(html`
      <bl-stepper>
        <bl-stepper-item id="1" title="Step 1" variant="default"></bl-stepper-item>
        <bl-stepper-item id="2" title="Step 2" variant="active"></bl-stepper-item>
        <bl-stepper-item id="3" title="Step 3" variant="default"></bl-stepper-item>
      </bl-stepper>
    `);

    const firstItem = el.querySelector("bl-stepper-item[id='1']") as BlStepperItem;
    const secondItem = el.querySelector("bl-stepper-item[id='2']") as BlStepperItem;
    const thirdItem = el.querySelector("bl-stepper-item[id='3']") as BlStepperItem;

    // Click on the third item to test the logic
    const thirdItemElement = thirdItem.shadowRoot!.querySelector(".stepper-item") as HTMLElement;

    thirdItemElement.click();
    await elementUpdated(el);

    expect(firstItem.variant).to.equal("success");
    expect(secondItem.variant).to.equal("success");
    expect(thirdItem.variant).to.equal("active");
  });

  it("warns when more than 9 items are added", async () => {
    const consoleWarnSpy = sinon.spy(console, "warn");

    await fixture<BlStepper>(html`
      <bl-stepper>
        ${Array.from({ length: 10 }, (_, i) =>
          html`<bl-stepper-item id="${i + 1}" title="Step ${i + 1}"></bl-stepper-item>`
        )}
      </bl-stepper>
    `);

    expect(consoleWarnSpy.calledOnce).to.be.true;
    expect(consoleWarnSpy.firstCall.args[0]).to.include("Maximum 9 items are allowed");

    consoleWarnSpy.restore();
  });

  it("updates stepper items when type changes", async () => {
    const el = await fixture<BlStepper>(html`
      <bl-stepper type="dot">
        <bl-stepper-item id="1" title="Step 1"></bl-stepper-item>
        <bl-stepper-item id="2" title="Step 2"></bl-stepper-item>
      </bl-stepper>
    `);

    const items = el.querySelectorAll("bl-stepper-item");

    expect((items[0] as BlStepperItem).stepperType).to.equal("dot");
    expect((items[1] as BlStepperItem).stepperType).to.equal("dot");

    el.type = "number";
    await elementUpdated(el);

    expect((items[0] as BlStepperItem).stepperType).to.equal("number");
    expect((items[1] as BlStepperItem).stepperType).to.equal("number");
  });

  it("updates stepper items when usage changes", async () => {
    const el = await fixture<BlStepper>(html`
      <bl-stepper usage="clickable">
        <bl-stepper-item id="1" title="Step 1"></bl-stepper-item>
        <bl-stepper-item id="2" title="Step 2"></bl-stepper-item>
      </bl-stepper>
    `);

    const items = el.querySelectorAll("bl-stepper-item");

    expect((items[0] as BlStepperItem).stepUsage).to.equal("clickable");
    expect((items[1] as BlStepperItem).stepUsage).to.equal("clickable");

    el.usage = "non-clickable";
    await elementUpdated(el);

    expect((items[0] as BlStepperItem).stepUsage).to.equal("non-clickable");
    expect((items[1] as BlStepperItem).stepUsage).to.equal("non-clickable");
  });

  it("has proper accessibility attributes", async () => {
    const el = await fixture<BlStepper>(html`
      <bl-stepper>
        <bl-stepper-item id="1" title="Step 1" variant="default"></bl-stepper-item>
        <bl-stepper-item id="2" title="Step 2" variant="active"></bl-stepper-item>
        <bl-stepper-item id="3" title="Step 3" variant="default"></bl-stepper-item>
      </bl-stepper>
    `);

    await el.updateComplete;
    const stepperElement = el.shadowRoot!.querySelector(".stepper");

    expect(stepperElement?.getAttribute("role")).to.equal("progressbar");
    expect(stepperElement?.getAttribute("aria-valuenow")).to.equal("1");
    expect(stepperElement?.getAttribute("aria-valuemin")).to.equal("0");
    expect(stepperElement?.getAttribute("aria-valuemax")).to.equal("2");
  });

  it("handles different stepper types", async () => {
    const types: Array<"dot" | "number" | "icon"> = ["dot", "number", "icon"];

    for (const type of types) {
      const el = await fixture<BlStepper>(html`
        <bl-stepper type="${type}">
          <bl-stepper-item id="1" title="Step 1"></bl-stepper-item>
          <bl-stepper-item id="2" title="Step 2"></bl-stepper-item>
        </bl-stepper>
      `);

      expect(el.type).to.equal(type);
    }
  });

  it("handles different directions", async () => {
    const directions: Array<"horizontal" | "vertical"> = ["horizontal", "vertical"];

    for (const direction of directions) {
      const el = await fixture<BlStepper>(html`
        <bl-stepper direction="${direction}">
          <bl-stepper-item id="1" title="Step 1"></bl-stepper-item>
          <bl-stepper-item id="2" title="Step 2"></bl-stepper-item>
        </bl-stepper>
      `);

      expect(el.direction).to.equal(direction);
    }
  });

  it("handles different usage types", async () => {
    const usages: Array<"clickable" | "non-clickable"> = ["clickable", "non-clickable"];

    for (const usage of usages) {
      const el = await fixture<BlStepper>(html`
        <bl-stepper usage="${usage}">
          <bl-stepper-item id="1" title="Step 1"></bl-stepper-item>
          <bl-stepper-item id="2" title="Step 2"></bl-stepper-item>
        </bl-stepper>
      `);

      expect(el.usage).to.equal(usage);
    }
  });

  it("navigates with arrow keys", async () => {
    const el = await fixture<BlStepper>(html`
      <bl-stepper>
        <bl-stepper-item id="1" title="Step 1"></bl-stepper-item>
        <bl-stepper-item id="2" title="Step 2"></bl-stepper-item>
        <bl-stepper-item id="3" title="Step 3"></bl-stepper-item>
      </bl-stepper>
    `);

    const items = el.querySelectorAll("bl-stepper-item");
    const firstItem = items[0] as BlStepperItem;
    const secondItem = items[1] as BlStepperItem;
    const thirdItem = items[2] as BlStepperItem;

    firstItem.focus();
    await elementUpdated(el);

    await sendKeys({ press: "ArrowRight" });
    await elementUpdated(el);

    expect(document.activeElement).to.equal(secondItem);

    await sendKeys({ press: "ArrowRight" });
    await elementUpdated(el);

    expect(document.activeElement).to.equal(thirdItem);

    await sendKeys({ press: "ArrowRight" });
    await elementUpdated(el);

    expect(document.activeElement).to.equal(firstItem);

    await sendKeys({ press: "ArrowLeft" });
    await elementUpdated(el);

    expect(document.activeElement).to.equal(thirdItem);
  });

  it("navigates with ArrowDown and ArrowUp keys", async () => {
    const el = await fixture<BlStepper>(html`
      <bl-stepper direction="vertical">
        <bl-stepper-item id="1" title="Step 1"></bl-stepper-item>
        <bl-stepper-item id="2" title="Step 2"></bl-stepper-item>
        <bl-stepper-item id="3" title="Step 3"></bl-stepper-item>
      </bl-stepper>
    `);

    const items = el.querySelectorAll("bl-stepper-item");
    const firstItem = items[0] as BlStepperItem;
    const secondItem = items[1] as BlStepperItem;

    firstItem.focus();
    await elementUpdated(el);

    await sendKeys({ press: "ArrowDown" });
    await elementUpdated(el);

    expect(document.activeElement).to.equal(secondItem);

    await sendKeys({ press: "ArrowUp" });
    await elementUpdated(el);

    expect(document.activeElement).to.equal(firstItem);
  });

  it("navigates to first item with Home key", async () => {
    const el = await fixture<BlStepper>(html`
      <bl-stepper>
        <bl-stepper-item id="1" title="Step 1"></bl-stepper-item>
        <bl-stepper-item id="2" title="Step 2"></bl-stepper-item>
        <bl-stepper-item id="3" title="Step 3"></bl-stepper-item>
      </bl-stepper>
    `);

    const items = el.querySelectorAll("bl-stepper-item");
    const firstItem = items[0] as BlStepperItem;
    const thirdItem = items[2] as BlStepperItem;

    thirdItem.focus();
    await elementUpdated(el);

    await sendKeys({ press: "Home" });
    await elementUpdated(el);

    expect(document.activeElement).to.equal(firstItem);
  });

  it("navigates to last item with End key", async () => {
    const el = await fixture<BlStepper>(html`
      <bl-stepper>
        <bl-stepper-item id="1" title="Step 1"></bl-stepper-item>
        <bl-stepper-item id="2" title="Step 2"></bl-stepper-item>
        <bl-stepper-item id="3" title="Step 3"></bl-stepper-item>
      </bl-stepper>
    `);

    const items = el.querySelectorAll("bl-stepper-item");
    const firstItem = items[0] as BlStepperItem;
    const thirdItem = items[2] as BlStepperItem;

    firstItem.focus();
    await elementUpdated(el);

    await sendKeys({ press: "End" });
    await elementUpdated(el);

    expect(document.activeElement).to.equal(thirdItem);
  });

  it("sets correct connector properties on items", async () => {
    const el = await fixture<BlStepper>(html`
      <bl-stepper>
        <bl-stepper-item id="1"></bl-stepper-item>
        <bl-stepper-item id="2"></bl-stepper-item>
        <bl-stepper-item id="3"></bl-stepper-item>
      </bl-stepper>
    `);

    const items = el.querySelectorAll("bl-stepper-item");
    const firstItem = items[0] as BlStepperItem;
    const secondItem = items[1] as BlStepperItem;
    const thirdItem = items[2] as BlStepperItem;

    expect(firstItem.showLeadingConnector).to.be.false;
    expect(firstItem.showTrailingConnector).to.be.true;

    expect(secondItem.showLeadingConnector).to.be.true;
    expect(secondItem.showTrailingConnector).to.be.true;

    expect(thirdItem.showLeadingConnector).to.be.true;
    expect(thirdItem.showTrailingConnector).to.be.false;
  });
});
