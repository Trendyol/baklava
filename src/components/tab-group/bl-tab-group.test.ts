import { fixture, html, fixtureCleanup, expect, nextFrame, elementUpdated } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import BlTabGroup from './bl-tab-group';

const createTab = () => {
  const tabName = Date.now().toString();
  const tab = document.createElement('bl-tab');
  tab.slot = 'tabs';
  tab.name = tabName;
  tab.title = 'Add Player';

  return tab;
};

describe('bl-tab-group', function () {
  afterEach(() => {
    fixtureCleanup();
  });
  it('should defined', async () => {
    const el = document.createElement('bl-tab-group');
    expect(el).to.be.instanceof(BlTabGroup);
  });

  it('render with default values', async function () {
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
    expect(el).to.be.shadowDom.equal(expected);
  });

  it('should render panels', async function () {
    const el = await fixture<BlTabGroup>(
      html` <bl-tab-group>
        <bl-tab name="test" slot="tabs">Test Tab</bl-tab>
        <bl-tab-panel tab="test"></bl-tab-panel>
      </bl-tab-group>`
    );

    expect(el.tabs.length).to.be.equal(1);
  });

  it('should select correct tab if has selected attr', async function () {
    const el = await fixture<BlTabGroup>(html` <bl-tab-group>
      <bl-tab name="test-1" slot="tabs">Test 1 Tab</bl-tab>
      <bl-tab name="test-2" slot="tabs" selected>Test 2 Tab</bl-tab>
      <bl-tab-panel tab="test-1"></bl-tab-panel>
      <bl-tab-panel tab="test-2"></bl-tab-panel>
    </bl-tab-group>`);
    const selectedPanel = el.panels.find(p => p.tab === 'test-2');

    expect(el.selectedTabName).to.be.equal('test-2');
    expect(selectedPanel?.hidden).to.be.false;
  });

  it('should handle bl-tab-selected event', async function () {
    const el = await fixture<BlTabGroup>(html` <bl-tab-group>
      <bl-tab name="test-1" slot="tabs">Test 1 Tab</bl-tab>
      <bl-tab name="test-2" slot="tabs" selected>Test 2 Tab</bl-tab>
      <bl-tab-panel tab="test-1"></bl-tab-panel>
      <bl-tab-panel tab="test-2"></bl-tab-panel>
    </bl-tab-group>`);
    el.tabs[0].select();
    await el.updateComplete;
    expect(el.selectedTabName).to.be.equal('test-1');
    expect(el.tabs[0].selected).to.be.true;
    expect(el.tabs[1].selected).to.be.false;
    expect(el.panels.find(p => p.tab === el.tabs[0].name)?.hidden).to.be.false;
    expect(el.panels.find(p => p.tab === el.tabs[1].name)?.hidden).to.be.true;
  });
});

describe('should selected tab functionality works when add or remove tabs ', function () {
  it('should new tab selected', async function () {
    const el = await fixture<BlTabGroup>(html` <bl-tab-group>
      <bl-tab name="test-1" slot="tabs">Test 1 Tab</bl-tab>
      <bl-tab-panel tab="test-2"></bl-tab-panel>
    </bl-tab-group>`);
    expect(el.tabs[0].selected).to.be.true;

    // add new tab with selected flag
    const tab = createTab();
    tab.selected = true;
    el.appendChild(tab);

    await nextFrame();

    expect(el.tabs.length).to.be.equal(2);
    expect(el.tabs[0].selected).to.be.false;
    expect(el.tabs[1].selected).to.be.true;
  });

  it('add a tab with disabled flag', async function () {
    const el = await fixture<BlTabGroup>(html` <bl-tab-group>
      <bl-tab name="test-1" slot="tabs">Test 1 Tab</bl-tab>
      <bl-tab-panel tab="test-2"></bl-tab-panel>
    </bl-tab-group>`);
    expect(el.tabs[0].selected).to.be.true;

    // add new tab with disabled flag
    const tab = createTab();
    tab.disabled = true;
    el.appendChild(tab);

    await nextFrame();

    expect(el.tabs.length).to.be.equal(2);
    expect(el.tabs[0].selected).to.be.true;
    expect(el.tabs[1].selected).to.be.false;
  });

  it('first tab is disabled', async function () {
    const el = await fixture<BlTabGroup>(html` <bl-tab-group>
      <bl-tab name="test-1" slot="tabs" disabled>Test 1 Tab</bl-tab>
      <bl-tab-panel tab="test-2"></bl-tab-panel>
    </bl-tab-group>`);
    expect(el.tabs[0].selected).to.be.false;

    // add new tab
    const tab = createTab();
    el.appendChild(tab);

    await nextFrame();

    expect(el.tabs.length).to.be.equal(2);
    expect(el.tabs[0].selected).to.be.false;
    expect(el.tabs[1].selected).to.be.true;
  });

  it('added two tabs that first is disabled and second is selected', async function () {
    const el = await fixture<BlTabGroup>(html` <bl-tab-group>
      <bl-tab name="test-1" slot="tabs" disabled>Test 1 Tab</bl-tab>
      <bl-tab-panel tab="test-2"></bl-tab-panel>
    </bl-tab-group>`);
    expect(el.tabs[0].selected).to.be.false;

    // add new tabs
    const disabledTab = createTab();
    const selectedTab = createTab();
    disabledTab.disabled = true;
    selectedTab.selected = true;
    el.appendChild(disabledTab);
    el.appendChild(selectedTab);

    await nextFrame();

    expect(el.tabs.length).to.be.equal(3);
    expect(el.tabs[0].selected).to.be.false;
    expect(el.tabs[2].selected).to.be.true;
  });

  it('add a disabled and selected tab then remove selected tab', async function () {
    const el = await fixture<BlTabGroup>(html` <bl-tab-group>
      <bl-tab name="test-1" slot="tabs">Test 1 Tab</bl-tab>
      <bl-tab-panel tab="test-2"></bl-tab-panel>
    </bl-tab-group>`);

    // add new tabs
    const disabledTab = createTab();
    const selectedTab = createTab();
    disabledTab.disabled = true;
    selectedTab.selected = true;
    el.appendChild(disabledTab);
    await nextFrame();
    expect(el.tabs[0].selected).to.be.true;
    el.appendChild(selectedTab);
    await nextFrame();
    expect(el.tabs[0].selected).to.be.false;
    expect(el.tabs[2].selected).to.be.true;

    // remove last tab that selected
    el.removeChild(el.tabs[el.tabs.length - 1]);

    await nextFrame();

    expect(el.tabs.length).to.be.equal(2);
    expect(el.tabs[0].selected).to.be.true;
    expect(el.tabs[1].selected).to.be.false;
    expect(el.tabs[1].disabled).to.be.true;
  });
});

describe('accessibility', () => {
  it('should change the tab when the right arrow key followed by enter key is used', async () => {
    const el = await fixture<BlTabGroup>(html` <bl-tab-group>
      <bl-tab name="test-1" slot="tabs">Test 1 Tab</bl-tab>
      <bl-tab name="test-2" slot="tabs">Test 2 Tab</bl-tab>
      <bl-tab name="test-3" slot="tabs" selected>Test 3 Tab</bl-tab>
      <bl-tab-panel tab="test-1"></bl-tab-panel>
      <bl-tab-panel tab="test-2"></bl-tab-panel>
      <bl-tab-panel tab="test-3"></bl-tab-panel>
    </bl-tab-group>`);

    await elementUpdated(el);

    await sendKeys({
      press: 'Tab',
    });
    await sendKeys({
      press: 'ArrowRight',
    });
    await sendKeys({
      press: 'Enter',
    });

    expect(el.tabs[0].selected).to.be.true;
    expect(el.tabs[2].selected).to.be.false;
  });

  it('should change the tab when the left arrow key followed by enter key is used', async () => {
    const el = await fixture<BlTabGroup>(html` <bl-tab-group>
      <bl-tab name="test-1" slot="tabs" selected>Test 1 Tab</bl-tab>
      <bl-tab name="test-2" slot="tabs">Test 2 Tab</bl-tab>
      <bl-tab name="test-3" slot="tabs">Test 3 Tab</bl-tab>
      <bl-tab-panel tab="test-1"></bl-tab-panel>
      <bl-tab-panel tab="test-2"></bl-tab-panel>
      <bl-tab-panel tab="test-3"></bl-tab-panel>
    </bl-tab-group>`);

    await elementUpdated(el);

    await sendKeys({
      press: 'Tab',
    });
    await sendKeys({
      press: 'ArrowLeft',
    });
    await sendKeys({
      press: 'Enter',
    });

    expect(el.tabs[0].selected).to.be.false;
    expect(el.tabs[2].selected).to.be.true;
  });

  it('should skip the disabled tabs when the arrow keys are used', async () => {
    const el = await fixture<BlTabGroup>(html` <bl-tab-group>
      <bl-tab name="test-1" slot="tabs" selected>Test 1 Tab</bl-tab>
      <bl-tab name="test-2" slot="tabs" disabled>Test 2 Tab</bl-tab>
      <bl-tab name="test-3" slot="tabs">Test 3 Tab</bl-tab>
      <bl-tab-panel tab="test-1"></bl-tab-panel>
      <bl-tab-panel tab="test-2"></bl-tab-panel>
      <bl-tab-panel tab="test-3"></bl-tab-panel>
    </bl-tab-group>`);

    await elementUpdated(el);

    await sendKeys({
      press: 'Tab',
    });
    await sendKeys({
      press: 'ArrowRight',
    });
    await sendKeys({
      press: 'Enter',
    });

    expect(el.tabs[0].selected).to.be.false;
    expect(el.tabs[1].selected).to.be.false;
    expect(el.tabs[2].selected).to.be.true;
  });
});
