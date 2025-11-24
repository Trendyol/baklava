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

    const icon = el.shadowRoot!.querySelector("bl-icon");

    expect(icon).to.exist;
    expect(icon?.getAttribute("name")).to.equal("settings");
    expect(icon?.getAttribute("class")).to.contain("step-icon");
  });

  it("renders check icon for success variant", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" variant="success"></bl-stepper-item>
    `);

    el.stepperType = "number";
    await el.updateComplete;

    expect(el.shouldShowIcon).to.be.true;
    expect(el.iconName).to.equal("check");

    const icon = el.shadowRoot!.querySelector("bl-icon");

    expect(icon).to.exist;
    expect(icon?.getAttribute("name")).to.equal("check");
    expect(icon?.getAttribute("class")).to.contain("step-icon");
  });

  it("renders close icon for error variant", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" variant="error"></bl-stepper-item>
    `);

    el.stepperType = "number";
    await el.updateComplete;

    expect(el.shouldShowIcon).to.be.true;
    expect(el.iconName).to.equal("close");

    const icon = el.shadowRoot!.querySelector("bl-icon");

    expect(icon).to.exist;
    expect(icon?.getAttribute("name")).to.equal("close");
    expect(icon?.getAttribute("class")).to.contain("step-icon");
  });

  it("returns default check icon for other variants when not icon type", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item variant="default"></bl-stepper-item>
    `);

    expect(el.iconName).to.equal("check");
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

  it("renders indicator for dot type when not success or error", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" variant="active"></bl-stepper-item>
    `);

    el.stepperType = "dot";
    await el.updateComplete;

    expect(el.shouldShowIcon).to.be.false;

    const indicator = el.shadowRoot!.querySelector(".stepper-indicator");
    const stepDot = el.shadowRoot!.querySelector(".step-dot");

    expect(indicator).to.exist;
    expect(stepDot).to.not.exist;
  });

  it("does not dispatch click event when stepUsage is non-clickable", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" title="Step 1"></bl-stepper-item>
    `);

    el.stepUsage = "non-clickable";
    await el.updateComplete;

    const clickSpy = sinon.spy();

    el.addEventListener("bl-stepper-item-click", clickSpy);

    const stepperItem = el.shadowRoot!.querySelector(".stepper-item") as HTMLElement;

    stepperItem.click();

    expect(clickSpy.called).to.be.false;
    expect(stepperItem.classList.contains("clickable")).to.be.false;
  });

  it("does not handle keyboard navigation when stepUsage is non-clickable", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item id="step-1" title="Step 1"></bl-stepper-item>
    `);

    el.stepUsage = "non-clickable";
    await el.updateComplete;

    const clickSpy = sinon.spy();

    el.addEventListener("bl-stepper-item-click", clickSpy);

    const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });

    el.dispatchEvent(enterEvent);

    expect(clickSpy.called).to.be.false;
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
    el.stepUsage = "non-clickable";

    await elementUpdated(el);

    expect(el.stepperType).to.equal("number");
    expect(el.direction).to.equal("vertical");
    expect(el.stepUsage).to.equal("non-clickable");
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

  it("changes variant to hover on mouse enter and back on mouse leave", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item variant="default"></bl-stepper-item>
    `);

    const stepperItem = el.shadowRoot!.querySelector(".stepper-item") as HTMLElement;

    stepperItem.dispatchEvent(new MouseEvent("mouseenter"));
    await el.updateComplete;
    expect(el.variant).to.equal("hover");

    stepperItem.dispatchEvent(new MouseEvent("mouseleave"));
    await el.updateComplete;
    expect(el.variant).to.equal("default");
  });

  it("does not change variant to hover on mouse enter if variant is not default", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item variant="active"></bl-stepper-item>
    `);

    const stepperItem = el.shadowRoot!.querySelector(".stepper-item") as HTMLElement;

    stepperItem.dispatchEvent(new MouseEvent("mouseenter"));
    await el.updateComplete;
    expect(el.variant).to.equal("active");
  });

  it("does not change variant on mouse leave if variant is not hover", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item variant="active"></bl-stepper-item>
    `);

    const stepperItem = el.shadowRoot!.querySelector(".stepper-item") as HTMLElement;

    stepperItem.dispatchEvent(new MouseEvent("mouseleave"));
    await el.updateComplete;
    expect(el.variant).to.equal("active");
  });

  it("renders connectors in vertical layout", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item direction="vertical"></bl-stepper-item>
    `);

    el.showLeadingConnector = true;
    el.showTrailingConnector = true;
    await el.updateComplete;

    const leadingConnector = el.shadowRoot!.querySelector(".connector-leading");
    const trailingConnector = el.shadowRoot!.querySelector(".connector-trailing");

    expect(leadingConnector).to.exist;
    expect(trailingConnector).to.exist;

    el.showLeadingConnector = false;
    el.showTrailingConnector = false;
    await el.updateComplete;

    const leadingConnectorAfter = el.shadowRoot!.querySelector(".connector-leading");
    const trailingConnectorAfter = el.shadowRoot!.querySelector(".connector-trailing");

    expect(leadingConnectorAfter).to.not.exist;
    expect(trailingConnectorAfter).to.not.exist;
  });

  it("returns 1 as step number when no parent is present", async () => {
    const el = document.createElement("bl-stepper-item");

    expect(el.stepNumber).to.equal(1);
  });

  it("renders leading and trailing connectors based on properties", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item></bl-stepper-item>
    `);

    el.showLeadingConnector = true;
    el.showTrailingConnector = true;
    await el.updateComplete;

    const leadingConnector = el.shadowRoot!.querySelector(".connector-leading");
    const trailingConnector = el.shadowRoot!.querySelector(".connector-trailing");

    expect(leadingConnector).to.exist;
    expect(trailingConnector).to.exist;

    el.showLeadingConnector = false;
    el.showTrailingConnector = false;
    await el.updateComplete;

    const leadingConnectorAfter = el.shadowRoot!.querySelector(".connector-leading");
    const trailingConnectorAfter = el.shadowRoot!.querySelector(".connector-trailing");

    expect(leadingConnectorAfter).to.not.exist;
    expect(trailingConnectorAfter).to.not.exist;
  });

  it("renders completed connectors when variant is active or success", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item variant="active"></bl-stepper-item>
    `);

    el.showLeadingConnector = true;
    el.showTrailingConnector = true;
    await elementUpdated(el);

    const leadingConnector = el.shadowRoot!.querySelector(".connector-leading");
    const trailingConnector = el.shadowRoot!.querySelector(".connector-trailing");

    expect(leadingConnector).to.exist;
    expect(trailingConnector).to.exist;
    expect(leadingConnector?.classList.contains("completed")).to.be.true;
    expect(trailingConnector?.classList.contains("completed")).to.be.true;

    el.variant = "success";
    await elementUpdated(el);

    expect(leadingConnector?.classList.contains("completed")).to.be.true;
    expect(trailingConnector?.classList.contains("completed")).to.be.true;

    el.variant = "default";
    await elementUpdated(el);

    expect(leadingConnector?.classList.contains("completed")).to.be.false;
    expect(trailingConnector?.classList.contains("completed")).to.be.false;
  });

  it("renders icon in vertical layout", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item variant="success" icon="check"></bl-stepper-item>
    `);

    el.direction = "vertical";
    el.stepperType = "icon";
    await el.updateComplete;

    const icon = el.shadowRoot!.querySelector("bl-icon");

    expect(icon).to.exist;
    expect(icon?.getAttribute("name")).to.equal("check");
    expect(icon?.getAttribute("class")).to.contain("step-icon");

    const verticalLayout = el.shadowRoot!.querySelector(".vertical-layout");

    expect(verticalLayout).to.exist;
  });

  it("renders number in vertical layout", async () => {
    const el = await fixture<BlStepperItem>(html`
      <bl-stepper-item variant="active"></bl-stepper-item>
    `);

    el.direction = "vertical";
    el.stepperType = "number";
    await el.updateComplete;

    const stepNumber = el.shadowRoot!.querySelector(".step-number");

    expect(stepNumber).to.exist;
    expect(stepNumber?.textContent?.trim()).to.equal("1");

    const icon = el.shadowRoot!.querySelector("bl-icon");

    expect(icon).to.not.exist;

    const verticalLayout = el.shadowRoot!.querySelector(".vertical-layout");

    expect(verticalLayout).to.exist;
  });
});
