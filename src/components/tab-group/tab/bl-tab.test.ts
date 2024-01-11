import { oneEvent, fixture, html, expect } from "@open-wc/testing";
import BlTab from "./bl-tab";
import type BlIcon from "../../icon/bl-icon";

describe("bl-tab", function () {
  it("should defined", async function () {
    const el = document.createElement("bl-tab");

    expect(el).to.be.an.instanceof(BlTab);
  });

  it("renders with default values", async () => {
    const el = await fixture<BlTab>(html` <bl-tab name="test"></bl-tab>`);
    const expected = `
      <button
        role="tab"
        class="container"
        aria-selected="false"
      >
        <div class="title-container">
          <div class="title">
            <slot></slot>
          </div>
        </div>
      </button>
    `;

    expect(el).to.be.shadowDom.equal(expected);
  });

  it("renders with a badge", async () => {
    const el = await fixture<BlTab>(html` <bl-tab name="test" badge="New"></bl-tab>`);
    const badgeEl = el.shadowRoot?.querySelector("bl-badge");

    expect(badgeEl).is.exist;
  });

  it("renders with a help text", async () => {
    const helpText = "Help Me!";
    const el = await fixture<BlTab>(html` <bl-tab name="test" help-text=${helpText}></bl-tab>`);
    const helpContainer = el.shadowRoot?.querySelector<HTMLDivElement>(".help-container");

    expect(helpContainer?.innerText).to.equal(helpText);
  });

  it("renders with icon", async () => {
    const icon = "heart";
    const el = await fixture<BlTab>(html` <bl-tab name="test" icon="${icon}"></bl-tab>`);
    const iconEl = el.shadowRoot?.querySelector<BlIcon>("bl-icon");

    expect(iconEl).is.exist;
  });

  it("should create custom event on handle click function", async () => {
    const el = await fixture<BlTab>(html` <bl-tab name="test"></bl-tab>`);
    const clickButton = () => el.shadowRoot?.querySelector("button")?.click();

    setTimeout(clickButton);
    const listener = await oneEvent(el, "bl-tab-selected");
    const { detail } = await listener;

    expect(detail).is.equal("test");
  });

  it("should create custom event when change selected attribute", async () => {
    const el = await fixture<BlTab>(html` <bl-tab name="test"></bl-tab>`);

    el.selected = true;

    const listener = await oneEvent(el, "bl-tab-selected");
    const { detail } = await listener;

    expect(detail).is.equal("test");
  });

  it("should set caption", async function () {
    const el = await fixture<BlTab>(html`<bl-tab caption="test caption"></bl-tab>`);
    const caption = el.shadowRoot?.querySelector(".caption");

    expect(caption).is.exist;
  });

  it("should have aria-selected attribute set to true if the tab is selected", async function () {
    const el = await fixture<BlTab>(html`<bl-tab name="test" selected></bl-tab>`);

    const tabButton = el.shadowRoot?.querySelector<HTMLButtonElement>(".container");

    expect(el).has.attribute("tabindex", "0");
    expect(tabButton).has.attribute("aria-selected", "true");
  });
});
