import { assert, elementUpdated, expect, fixture, html } from "@open-wc/testing";
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

    expect(el.type).to.equal("dots");
    expect(el.direction).to.equal("horizontal");
    expect(el.usage).to.equal("clickable");
  });

  it("renders with custom attributes", async () => {
    const el = await fixture<BlStepper>(html`
      <bl-stepper type="numbers" direction="vertical" usage="non-clickable">
        <bl-stepper-item id="1" title="Step 1"></bl-stepper-item>
        <bl-stepper-item id="2" title="Step 2"></bl-stepper-item>
      </bl-stepper>
    `);

    expect(el.type).to.equal("numbers");
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
      <bl-stepper type="dots">
        <bl-stepper-item id="1" title="Step 1"></bl-stepper-item>
        <bl-stepper-item id="2" title="Step 2"></bl-stepper-item>
      </bl-stepper>
    `);

    const items = el.querySelectorAll("bl-stepper-item");

    expect((items[0] as BlStepperItem).stepperType).to.equal("dots");
    expect((items[1] as BlStepperItem).stepperType).to.equal("dots");

    el.type = "numbers";
    await elementUpdated(el);

    expect((items[0] as BlStepperItem).stepperType).to.equal("numbers");
    expect((items[1] as BlStepperItem).stepperType).to.equal("numbers");
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
    const types: Array<"dots" | "numbers" | "icons"> = ["dots", "numbers", "icons"];

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
});
