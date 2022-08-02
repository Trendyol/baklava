import {
  assert,
  fixture,
  html,
  fixtureCleanup,
} from "@open-wc/testing";
import BlTabGroup from "./bl-tab-group";

describe("bl-tab-group", function () {
  afterEach(() => {
    fixtureCleanup();
  });
  it("should defined", async () => {
    const el = document.createElement("bl-tab-group");
    await assert.instanceOf(el, BlTabGroup);
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
    assert.shadowDom.equal(el, expected);
  });

  it("should render panels", async function () {
    const el = await fixture<BlTabGroup>(
      html` <bl-tab-group>
        <bl-tab panel="test" slot="tabs" title="Test Tab"></bl-tab>
        <bl-tab-panel name="test"></bl-tab-panel>
      </bl-tab-group>`
    );
    assert.equal(el.getPanels.length, 1);
  });

  // TODO make it more efficient
  it("should select correct tab if has selected attr", async function () {
    const el = await fixture<BlTabGroup>(html` <bl-tab-group>
      <bl-tab panel="test-1" slot="tabs" title="Test 1 Tab"></bl-tab>
      <bl-tab panel="test-2" slot="tabs" title="Test 2 Tab" selected></bl-tab>
      <bl-tab-panel name="test-1"></bl-tab-panel>
      <bl-tab-panel name="test-2"></bl-tab-panel>
    </bl-tab-group>`);
    const tab = el.querySelector('bl-tab[selected=""]');
    const selectedTabName = tab?.attributes.getNamedItem("panel")?.value;
    assert.equal(selectedTabName, "test-2");
  });

  it("should handle bl-tab-show event", async function () {
    // const el = await fixture<BlTabGroup>(html` <bl-tab-group>
    //   <bl-tab panel="test-1" slot="tabs" title="Test 1 Tab"></bl-tab>
    //   <bl-tab panel="test-2" slot="tabs" title="Test 2 Tab" selected></bl-tab>
    //   <bl-tab-panel name="test-1"></bl-tab-panel>
    //   <bl-tab-panel name="test-2"></bl-tab-panel>
    // </bl-tab-group>`);
    // const customDetailData = {
    //   panel: "test-1",
    // };
    // document?.dispatchEvent(new CustomEvent("bl-tab-show", { detail: customDetailData }));
    // el.requestUpdate();
    // await el.updateComplete;
    // // expect(el._handleClick)
    // setTimeout(() => console.log(el.selectedPanelName))
    // expect(el._handleTabClicked).to.have.calledOnce
  });
});
