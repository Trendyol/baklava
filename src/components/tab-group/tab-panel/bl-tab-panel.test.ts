import { assert, fixture, html } from "@open-wc/testing";
import BlTabPanel from "./bl-tab-panel";

describe("bl-tab-panel", function () {
  it("should defined", function () {
    const el = document.createElement("bl-tab-panel");
    assert.instanceOf(el, BlTabPanel);
  });

  it("should render with default values", async function () {
    const el = await fixture<BlTabPanel>(html` <bl-tab-panel name="test-panel"></bl-tab-panel>`);
    const expected = `
      <slot></slot>
    `;
    assert.shadowDom.equal(el, expected);
  });

  it("should set name property", async function() {
    const name = 'test-panel'
    const el = await fixture<BlTabPanel>(html` <bl-tab-panel name="${name}"></bl-tab-panel>`);
    assert.equal(el.name, name)
  });
});
