import { assert, elementUpdated, expect, fixture, html } from "@open-wc/testing";
import * as sinon from "sinon";
import BlStepperItem from "./bl-stepper-item";

describe("bl-stepper-item", () => {
  it("is defined", () => {
    const el = document.createElement("bl-stepper-item");

    assert.instanceOf(el, BlStepperItem);
  });

  it("renders with default values", async () => {
    const el = await fixture<BlStepperItem>(html`<bl-stepper-item></bl-stepper-item>`);

    expect(el.id).to.equal("");
    expect(el.variant).to.equal("default");
    expect(el.disabled).to.equal(false);
    expect(el.icon).to.equal("check");
    expect(el.title).to.equal("");
    expect(el.description).to.equal("");
  });

  it("renders with custom attributes", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item
        id="step-1"
        variant="active"
        disabled
        icon="settings"
        title="Step Title"
        description="Step Description"
      ></bl-stepper-item>
    `);

    expect(el.id).to.equal("step-1");
    expect(el.variant).to.equal("active");
    expect(el.disabled).to.equal(true);
    expect(el.icon).to.equal("settings");
    expect(el.title).to.equal("Step Title");
    expect(el.description).to.equal("Step Description");
  });

  it("dispatches bl-stepper-item-click event when clicked", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" title="Step 1"></bl-stepper-item>
    `);

    const clickSpy = sinon.spy();

    el.addEventListener("bl-stepper-item-click", clickSpy);

    const stepperItem = el.shadowRoot!.querySelector(".stepper-item") as HTMLElement;

    stepperItem.click();

    expect(clickSpy.calledOnce).to.be.true;
    expect(clickSpy.firstCall.args[0].detail).to.equal("step-1");
  });

  it("does not dispatch click event when disabled", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" disabled></bl-stepper-item>
    `);

    const clickSpy = sinon.spy();

    el.addEventListener("bl-stepper-item-click", clickSpy);

    el.click();

    expect(clickSpy.called).to.be.false;
  });

  it("does not dispatch click event when variant is error", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" variant="error"></bl-stepper-item>
    `);

    const clickSpy = sinon.spy();

    el.addEventListener("bl-stepper-item-click", clickSpy);

    el.click();

    expect(clickSpy.called).to.be.false;
  });

  it("handles keyboard navigation", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" title="Step 1"></bl-stepper-item>
    `);

    const clickSpy = sinon.spy();

    el.addEventListener("bl-stepper-item-click", clickSpy);

    const stepperItem = el.shadowRoot!.querySelector(".stepper-item") as HTMLElement;

    // Test Enter key
    const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });

    stepperItem.dispatchEvent(enterEvent);

    expect(clickSpy.calledOnce).to.be.true;

    // Test Space key
    clickSpy.resetHistory();
    const spaceEvent = new KeyboardEvent("keydown", { key: " " });

    stepperItem.dispatchEvent(spaceEvent);

    expect(clickSpy.calledOnce).to.be.true;
  });

  it("does not handle keyboard navigation when disabled", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" disabled></bl-stepper-item>
    `);

    const clickSpy = sinon.spy();

    el.addEventListener("bl-stepper-item-click", clickSpy);

    const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });

    el.dispatchEvent(enterEvent);

    expect(clickSpy.called).to.be.false;
  });

  it("renders correct step number", async () => {
    const container = await fixture(html`
      <div>
        <bl-stepper-item id="1" title="Step 1"></bl-stepper-item>
        <bl-stepper-item id="2" title="Step 2"></bl-stepper-item>
        <bl-stepper-item id="3" title="Step 3"></bl-stepper-item>
      </div>
    `);

    const items = Array.from(container.querySelectorAll("bl-stepper-item")) as BlStepperItem[];

    expect(items[0].stepNumber).to.equal(1);
    expect(items[1].stepNumber).to.equal(2);
    expect(items[2].stepNumber).to.equal(3);
  });

  it("renders correct icon for different variants and types", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" variant="success" icon="settings"></bl-stepper-item>
    `);

    el.stepperType = "icon";
    await el.updateComplete;

    expect(el.shouldShowIcon).to.be.true;
    expect(el.iconName).to.equal("settings");
  });

  it("renders check icon for success variant", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" variant="success"></bl-stepper-item>
    `);

    expect(el.shouldShowIcon).to.be.true;
    expect(el.iconName).to.equal("check");
  });

  it("renders close icon for error variant", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" variant="error"></bl-stepper-item>
    `);

    expect(el.shouldShowIcon).to.be.true;
    expect(el.iconName).to.equal("close");
  });

  it("renders step number for number type when not success or error", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" variant="active"></bl-stepper-item>
    `);

    el.stepperType = "number";
    await el.updateComplete;

    expect(el.shouldShowIcon).to.be.false;

    const stepNumber = el.shadowRoot!.querySelector(".step-number");

    expect(stepNumber).to.exist;
    expect(stepNumber?.textContent?.trim()).to.equal("1");
  });

  it("renders dot for dot type when not success or error", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" variant="active"></bl-stepper-item>
    `);

    el.stepperType = "dot";
    await el.updateComplete;

    expect(el.shouldShowIcon).to.be.false;

    const stepDot = el.shadowRoot!.querySelector(".step-dot");

    expect(stepDot).to.exist;
  });

  it("has proper accessibility attributes", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" title="Step Title" disabled></bl-stepper-item>
    `);

    const stepperItem = el.shadowRoot!.querySelector(".stepper-item");

    expect(stepperItem?.getAttribute("role")).to.equal("button");
    expect(stepperItem?.getAttribute("aria-label")).to.equal("Step Title");
    expect(stepperItem?.getAttribute("aria-disabled")).to.equal("true");
    expect(stepperItem?.getAttribute("tabindex")).to.equal("-1");
  });

  it("has proper accessibility attributes when clickable", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" title="Step Title"></bl-stepper-item>
    `);

    const stepperItem = el.shadowRoot!.querySelector(".stepper-item");

    expect(stepperItem?.getAttribute("role")).to.equal("button");
    expect(stepperItem?.getAttribute("aria-label")).to.equal("Step Title");
    expect(stepperItem?.getAttribute("aria-disabled")).to.equal("false");
    expect(stepperItem?.getAttribute("tabindex")).to.equal("0");
  });

  it("handles different variants", async () => {
    const variants: Array<"default" | "active" | "hover" | "success" | "error"> = ["default", "active", "hover", "success", "error"];

    for (const variant of variants) {
      const el = await fixture<BlStepperItem>(html`
        <bl-stepper-item variant="${variant}"></bl-stepper-item>
      `);

      expect(el.variant).to.equal(variant);
    }
  });

  it("updates internal properties when parent stepper changes", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1"></bl-stepper-item>
    `);

    el.stepperType = "number";
    el.direction = "vertical";

    await elementUpdated(el);

    expect(el.stepperType).to.equal("number");
    expect(el.direction).to.equal("vertical");
  });

  it("renders title and description when provided", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item title="Step Title" description="Step Description"></bl-stepper-item>
    `);

    const title = el.shadowRoot!.querySelector(".stepper-title");
    const description = el.shadowRoot!.querySelector(".stepper-description");

    expect(title).to.exist;
    expect(title?.textContent?.trim()).to.equal("Step Title");
    expect(description).to.exist;
    expect(description?.textContent?.trim()).to.equal("Step Description");
  });

  it("does not render title and description when not provided", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item></bl-stepper-item>
    `);

    const title = el.shadowRoot!.querySelector(".stepper-title");
    const description = el.shadowRoot!.querySelector(".stepper-description");

    expect(title).to.be.null;
    expect(description).to.be.null;
  });
});
