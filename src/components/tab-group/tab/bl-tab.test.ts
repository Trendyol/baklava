import { assert, oneEvent, fixture, html } from "@open-wc/testing";
import BlTab from "./bl-tab";
// istanbul ignore next
describe("bl-tab", function () {
  it("should defined", async function () {
    const el = document.createElement("bl-tab");
    await assert.instanceOf(el, BlTab);
  });

  it("renders with default values", async () => {
    const el = await fixture<BlTab>(html` <bl-tab panel="test"></bl-tab>`);
    const expected = `
      <button
        role="tab"
        class="container"
      >
        <div class="title-container">
          <div class="title">
            <slot></slot>
          </div>
        </div>
      </button>
    `;
    assert.shadowDom.equal(el, expected);
  });

  it("renders with a badge", async () => {
    const el = await fixture<BlTab>(html` <bl-tab panel="test" badge="New"></bl-tab>`);
    const expected = `
      <button
        role="tab"
        class="container"
      >
        <div class="title-container">
          <div class="title">
            <slot></slot>
              <div class="badge-container">
               <bl-badge size="small">
                 New
               </bl-badge>
              </div>
          </div>
        </div>
      </button>
    `;
    assert.shadowDom.equal(el, expected);
  });

  it("renders with a help text", async () => {
    const helpText = "Help Me!";
    const el = await fixture<BlTab>(html` <bl-tab panel="test" help-text=${helpText}></bl-tab>`);
    const expected = `
      <button
        role="tab"
        class="container"
      >
        <div class="title-container">
          <div class="title">
            <slot></slot>
          </div>
        </div>
        <div class="help-container">
          <bl-tooltip placement="bottom" style="--bl-tooltip-position:fixed">
            <bl-button
              slot="tooltip-trigger"
              icon="info"
              text
              label="${helpText}"
              secondary
            ></bl-button>
            ${helpText}
          </bl-tooltip>
        </div>
      </button>
    `;
    assert.shadowDom.equal(el, expected);
  });

  it("renders with icon", async () => {
    const icon = "heart"
    const el = await fixture<BlTab>(html` <bl-tab panel="test" icon="${icon}"></bl-tab>`);
    const expected = `
      <button
        role="tab"
        class="container"
      >
        <div class="title-container">
          <div class="title">
            <div class="icon">
             <bl-icon name="${icon}"></bl-icon>
            </div>
            <slot></slot>
          </div>
        </div>
      </button>
    `;
    assert.shadowDom.equal(el, expected);
  });


  it("should create custom event on handle click function", async () => {
    const el = await fixture<BlTab>(html` <bl-tab panel="test"></bl-tab>`);
    const tab = el.shadowRoot?.querySelector(".container");
    const expected = { panel: "test", tab };
    const clickButton = () => el.shadowRoot?.querySelector("button")?.click();
    setTimeout(clickButton);
    const listener = await oneEvent(el, "bl-tab-show");
    const { detail } = await listener;
    assert.deepEqual(detail, expected);
  });

  it("should set name if has panel name", async () => {
    const panelName = "test";
    const el = await fixture<BlTab>(html`<bl-tab panel="${panelName}"></bl-tab>`)
    assert.equal(el.name,panelName)
  });
});
