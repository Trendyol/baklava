import { fixture, html, fixtureCleanup, expect } from "@open-wc/testing";
import BlTabGroup from "./bl-tab-group";

describe("bl-tab-group", function () {
  afterEach(() => {
    fixtureCleanup();
  });
  it("should defined", async () => {
    const el = document.createElement("bl-tab-group");
    expect(el).to.be.instanceof(BlTabGroup)
  });

  it("render with default values", async function () {
    const expected = `
      <div class="container">
         <div role="tablist" class="tabs-list">
          <div class="tabs">
            <slot name="tabs"></slot>
          </div>
        </div>
        <div role="tabpanel" class="panels">
          <slot></slot>
        </div>
      </div>
    `;
    const el = await fixture<BlTabGroup>(html` <bl-tab-group></bl-tab-group>`);
    expect(el).to.be.shadowDom.equal(expected)
  });

  it("should render panels", async function () {
    const el = await fixture<BlTabGroup>(
      html` <bl-tab-group>
        <bl-tab name="test" slot="tabs" title="Test Tab"></bl-tab>
        <bl-tab-panel tab="test"></bl-tab-panel>
      </bl-tab-group>`
    );

    expect(el.tabs.length).to.be.equal(1)
  });

  it("should select correct tab if has selected attr", async function () {
    const el = await fixture<BlTabGroup>(html` <bl-tab-group>
      <bl-tab name="test-1" slot="tabs" title="Test 1 Tab"></bl-tab>
      <bl-tab name="test-2" slot="tabs" title="Test 2 Tab" selected></bl-tab>
      <bl-tab-panel tab="test-1"></bl-tab-panel>
      <bl-tab-panel tab="test-2"></bl-tab-panel>
    </bl-tab-group>`);
    const selectedPanel = el.panels.find(p => p.tab === "test-2");

    expect(el.selectedTabName).to.be.equal("test-2");
    expect(selectedPanel?.visible).to.be.true;
  });

  it("should handle bl-tab-selected event", async function () {
    const el = await fixture<BlTabGroup>(html` <bl-tab-group>
      <bl-tab name="test-1" slot="tabs" title="Test 1 Tab"></bl-tab>
      <bl-tab name="test-2" slot="tabs" title="Test 2 Tab" selected></bl-tab>
      <bl-tab-panel tab="test-1"></bl-tab-panel>
      <bl-tab-panel tab="test-2"></bl-tab-panel>
    </bl-tab-group>`);
    el.tabs[0].select()
    expect(el.selectedTabName).to.be.equal('test-1')
  });
});
