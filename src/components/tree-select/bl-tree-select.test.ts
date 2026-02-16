import { assert, elementUpdated, expect, fixture, html, oneEvent } from "@open-wc/testing";
import { render } from "lit";
import type { TemplateResult } from "lit";
import { sendKeys } from "@web/test-runner-commands";
import BlTreeSelect from "./bl-tree-select";
import type { TreeNode } from "./bl-tree-select";
import type BlSelect from "../select/bl-select";

const sampleTree: TreeNode[] = [
  {
    value: "p1",
    label: "Parent 1",
    count: 2,
    children: [
      { value: "c1", label: "Child 1", count: 1 },
      { value: "c2", label: "Child 2" },
    ],
  },
  { value: "p2", label: "Parent 2", count: 0, children: [] },
];

/** bl-checkbox input is inside its shadowRoot */
function getCheckboxInput(host: Element, selector: string): HTMLInputElement | null {
  const blCheckbox = host.shadowRoot?.querySelector(selector);

  if (!blCheckbox || !("shadowRoot" in blCheckbox)) return null;
  return (blCheckbox as Element & { shadowRoot: ShadowRoot }).shadowRoot.querySelector("input");
}

/** Get the bl-select element from tree-select's shadow root */
function getBlSelect(host: BlTreeSelect): BlSelect | null {
  return host.shadowRoot?.querySelector("bl-select") as BlSelect | null;
}

/** Get the search input inside bl-select's shadow DOM */
function getSearchInput(host: BlTreeSelect): HTMLInputElement | null {
  const blSelect = getBlSelect(host);

  return blSelect?.shadowRoot?.querySelector<HTMLInputElement>(".search-bar-input") ?? null;
}

/** Get the clear overlay button from tree-select's shadow root */
function getClearButton(host: BlTreeSelect): HTMLElement | null {
  return host.shadowRoot?.querySelector(".tree-select-clear-overlay") as HTMLElement | null;
}

describe("bl-tree-select", () => {
  it("is defined", () => {
    const el = document.createElement("bl-tree-select");

    assert.instanceOf(el, BlTreeSelect);
  });

  it("renders with default values", async () => {
    const el = await fixture<BlTreeSelect>(html`<bl-tree-select></bl-tree-select>`);

    expect(el.shadowRoot?.querySelector(".tree-select-wrapper")).to.exist;
    expect(getBlSelect(el)).to.exist;
    expect(el.label).to.equal("");
    expect(el.placeholder).to.equal("");
    expect(el.isMultiple).to.be.true;
    expect(el.value).to.be.null;
  });

  it("renders label and required suffix when set", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select label="Category" required></bl-tree-select>`
    );

    const label = el.shadowRoot?.querySelector(".tree-select-label");

    expect(label?.textContent?.trim()).to.equal("Category");
    expect(el.shadowRoot?.querySelector(".required-suffix")?.textContent).to.include("*");
  });

  it("renders label without required suffix when required is false (line 624 : \"\")", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select label="Category"></bl-tree-select>`
    );

    const requiredSuffix = el.shadowRoot?.querySelector(".required-suffix");

    expect(requiredSuffix?.textContent?.trim()).to.equal("");
  });

  it("renders placeholder on input", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select placeholder="Select..."></bl-tree-select>`
    );

    const blSelect = getBlSelect(el);

    expect(blSelect?.searchBarPlaceholder).to.equal("Select...");
  });

  it("opens panel on click and closes on Escape", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.exist;
    expect(el.shadowRoot?.querySelector(".tree-select-panel")).to.exist;

    const input = getSearchInput(el);

    input?.focus();
    await sendKeys({ press: "Escape" });
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.not.exist;
  });

  it("open() shows panel and close() hides it", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.exist;

    el.close();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.not.exist;
  });

  it("does not open when disabled", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} disabled></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.not.exist;
  });

  it("renders tree when opened with items", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const treeList = el.shadowRoot?.querySelector(".tree-list");

    expect(treeList).to.exist;
    expect(treeList?.querySelectorAll(".tree-node").length).to.be.greaterThan(0);
    expect(treeList?.querySelector(".tree-node-label")?.textContent?.trim()).to.equal("Parent 1");
  });

  it("reflects value as single string and selectedSet", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .value=${"c1"}></bl-tree-select>`
    );

    expect(el.value).to.equal("c1");
    expect(el.selectedSet.has("c1")).to.be.true;
    expect(el.selectedSet.size).to.equal(1);
  });

  it("reflects value as array and selectedSet", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .value=${["c1", "c2"]}></bl-tree-select>`
    );

    expect(el.value).to.deep.equal(["c1", "c2"]);
    expect(el.selectedSet.has("c1")).to.be.true;
    expect(el.selectedSet.has("c2")).to.be.true;
  });

  it("dispatches bl-tree-select-change when selection changes via checkbox", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} is-multiple></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const input = getCheckboxInput(el, ".tree-node .tree-checkbox");

    const promise = oneEvent(el, "bl-tree-select-change");

    setTimeout(() => input?.click());
    const ev = await promise;

    expect(ev.detail?.value).to.be.an("array");
    expect((ev.detail?.value as string[]).length).to.be.greaterThan(0);
  });

  it("clear button clears selection and dispatches change", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .value=${["c1"]} is-multiple></bl-tree-select>`
    );

    const clearBtn = getClearButton(el);

    expect(clearBtn).to.exist;
    const promise = oneEvent(el, "bl-tree-select-change");

    clearBtn!.click();
    const ev = await promise;

    expect(ev.detail?.value).to.deep.equal([]);
    expect(el.value).to.deep.equal([]);
  });

  it("_clearSelection sets value to null in single mode", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .value=${"p2"} .isMultiple=${false}></bl-tree-select>`
    );

    await elementUpdated(el);
    const clearSelection = (el as unknown as { _clearSelection(): void })._clearSelection.bind(el);
    const promise = oneEvent(el, "bl-tree-select-change");

    clearSelection();
    await promise;
    expect(el.value).to.be.null;
  });

  it("does not show clear button when disabled", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .value=${["c1"]} disabled></bl-tree-select>`
    );

    expect(getClearButton(el)).to.not.exist;
  });

  it("shows Select All row when viewSelectAll and isMultiple", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select
        .items=${sampleTree}
        is-multiple
        view-select-all
        select-all-text="Select All"
      ></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".select-all-row")).to.exist;
    expect(el.shadowRoot?.querySelector(".select-all-checkbox")?.textContent).to.include(
      "Select All"
    );
  });

  it("Select All checkbox toggles all visible nodes", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select
        .items=${sampleTree}
        is-multiple
        view-select-all
      ></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const selectAllInput = getCheckboxInput(el, ".select-all-row .select-all-checkbox");

    const promise1 = oneEvent(el, "bl-tree-select-change");

    setTimeout(() => selectAllInput?.click());
    await promise1;
    await elementUpdated(el);
    expect(el.selectedSet.size).to.be.greaterThan(0);

    const promise2 = oneEvent(el, "bl-tree-select-change");

    setTimeout(() => selectAllInput?.click());
    await promise2;
    await elementUpdated(el);
    expect(el.selectedSet.size).to.equal(0);
  });

  it("unchecking parent node removes node and all descendants from selection (_toggleNode else)", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} is-multiple></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const parent1Checkbox = getCheckboxInput(el, '[data-tree-focus="p1"] .tree-checkbox');

    const promise1 = oneEvent(el, "bl-tree-select-change");

    setTimeout(() => parent1Checkbox?.click());
    await promise1;
    await elementUpdated(el);
    expect(el.selectedSet.has("p1")).to.be.true;
    expect(el.selectedSet.has("c1")).to.be.true;
    expect(el.selectedSet.has("c2")).to.be.true;

    const promise2 = oneEvent(el, "bl-tree-select-change");

    setTimeout(() => parent1Checkbox?.click());
    await promise2;
    await elementUpdated(el);
    expect(el.selectedSet.has("p1")).to.be.false;
    expect(el.selectedSet.has("c1")).to.be.false;
    expect(el.selectedSet.has("c2")).to.be.false;
  });

  it("single mode: only leaf nodes have checkbox", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .isMultiple=${false}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const parentRow = el.shadowRoot?.querySelector(".tree-node-single-parent");

    expect(parentRow).to.exist;
    expect(parentRow?.querySelector("bl-checkbox")).to.not.exist;
    expect(parentRow?.querySelector(".tree-node-label")?.textContent?.trim()).to.equal("Parent 1");

    const leafRows = el.shadowRoot?.querySelectorAll(".tree-node-leaf") ?? [];
    const leafWithCheckbox = Array.from(leafRows).find(
      row => row.querySelector("bl-checkbox")
    );

    expect(leafWithCheckbox).to.exist;
  });

  it("single mode: selecting leaf dispatches change and closes", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .isMultiple=${false}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const leafInput = getCheckboxInput(el, ".tree-node-leaf .tree-checkbox");

    const promise = oneEvent(el, "bl-tree-select-change");

    setTimeout(() => leafInput?.click());
    const ev = await promise;

    expect(ev.detail?.value).to.equal("p2");
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.not.exist;
  });

  it("_setSingleLeafValue returns early when disabled or isMultiple", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .isMultiple=${false}></bl-tree-select>`
    );

    await elementUpdated(el);
    const setSingleLeafValue = (el as unknown as {
      _setSingleLeafValue(node: TreeNode, checked: boolean): void;
    })._setSingleLeafValue.bind(el);
    const leafNode = sampleTree[1];

    setSingleLeafValue(leafNode, true);
    expect(el.value).to.equal("p2");
    (el as unknown as { disabled: boolean }).disabled = true;
    await elementUpdated(el);
    setSingleLeafValue(sampleTree[0]?.children?.[0] as TreeNode, true);
    expect(el.value).to.equal("p2");

    const elMulti = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .value=${["c1"]} is-multiple></bl-tree-select>`
    );

    await elementUpdated(elMulti);
    const setSingleLeafValueMulti = (elMulti as unknown as {
      _setSingleLeafValue(node: TreeNode, checked: boolean): void;
    })._setSingleLeafValue.bind(elMulti);

    setSingleLeafValueMulti(sampleTree[1] as TreeNode, true);
    expect(elMulti.value).to.deep.equal(["c1"]);
  });

  it("_setSingleLeafValue sets value to null when checked is false", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .value=${"p2"} .isMultiple=${false}></bl-tree-select>`
    );

    await elementUpdated(el);
    const setSingleLeafValue = (el as unknown as {
      _setSingleLeafValue(node: TreeNode, checked: boolean): void;
    })._setSingleLeafValue.bind(el);
    const promise = oneEvent(el, "bl-tree-select-change");

    setSingleLeafValue(sampleTree[1] as TreeNode, false);
    await promise;
    expect(el.value).to.be.null;
  });

  it("single mode: _applySelection sets value to first item or null (else branch)", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .isMultiple=${false}></bl-tree-select>`
    );

    await elementUpdated(el);
    const applySelection = (el as unknown as { _applySelection(set: Set<string>): void })
      ._applySelection.bind(el);

    const promise1 = oneEvent(el, "bl-tree-select-change");

    applySelection(new Set(["p2"]));
    const ev1 = await promise1;

    expect(ev1.detail?.value).to.equal("p2");
    expect(el.value).to.equal("p2");

    const promise2 = oneEvent(el, "bl-tree-select-change");

    applySelection(new Set());
    const ev2 = await promise2;

    expect(ev2.detail?.value).to.be.null;
    expect(el.value).to.be.null;
  });

  it("_highlightPath returns display path without highlight when search is empty (!searchLower)", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    await elementUpdated(el);
    const highlightPath = (el as unknown as {
      _highlightPath(path: string, search: string): TemplateResult;
    })._highlightPath.bind(el);
    const result = highlightPath("Parent 1 / Child 1", "");
    const container = document.createElement("div");

    render(result, container);
    expect(container.textContent?.trim()).to.equal("Parent 1/Child 1");
    expect(container.querySelector(".autocomplete-match")).to.be.null;
  });

  it("_focusedValue returns null when _focusedIndex is out of bounds", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} is-multiple></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const host = el as unknown as { _focusedIndex: number; _focusedValue: string | "select-all" | null };

    host._focusedIndex = -1;
    expect(host._focusedValue).to.be.null;

    host._focusedIndex = 999;
    expect(host._focusedValue).to.be.null;
  });

  it("_scrollFocusedIntoView returns early when _focusedValue is null (line 329)", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} is-multiple></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    (el as unknown as { _focusedIndex: number })._focusedIndex = -1;
    const scrollFocusedIntoView = (el as unknown as { _scrollFocusedIntoView(): void })
      ._scrollFocusedIntoView.bind(el);

    scrollFocusedIntoView();
    await new Promise<void>(r => requestAnimationFrame(() => r()));
    await elementUpdated(el);
  });

  it("_selectAutocompleteItem with leaf node (no children) sets value and closes in single mode", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .isMultiple=${false}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const input = getSearchInput(el);

    input!.value = "child";
    input?.dispatchEvent(new InputEvent("input", { bubbles: true }));
    await elementUpdated(el);
    const leafRow = el.shadowRoot?.querySelector(".autocomplete-row");

    expect(leafRow).to.exist;
    const promise = oneEvent(el, "bl-tree-select-change");

    (leafRow as HTMLElement).click();
    await promise;
    await elementUpdated(el);
    expect(el.value).to.equal("c1");
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.not.exist;
  });

  it("_selectAutocompleteItem with node that has children in single mode does not set value (line 202 false branch)", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .isMultiple=${false}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const parentNode = sampleTree[0];
    const selectAutocompleteItem = (el as unknown as {
      _selectAutocompleteItem(node: TreeNode): void;
    })._selectAutocompleteItem.bind(el);

    selectAutocompleteItem(parentNode);
    await elementUpdated(el);
    expect(el.value).to.be.null;
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.exist;
  });

  it("_isIndeterminate returns false when childValues.length === 0", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} is-multiple></bl-tree-select>`
    );

    await elementUpdated(el);
    const nodeWithChildren = sampleTree[0];
    const origAllValues = (el as unknown as { _allValues(nodes: TreeNode[]): Set<string> })
      ._allValues.bind(el);

    (el as unknown as { _allValues(nodes: TreeNode[]): Set<string> })._allValues = () =>
      new Set<string>();
    const isIndeterminate = (el as unknown as { _isIndeterminate(node: TreeNode): boolean })
      ._isIndeterminate.bind(el);

    expect(isIndeterminate(nodeWithChildren)).to.be.false;
    (el as unknown as { _allValues(nodes: TreeNode[]): Set<string> })._allValues = origAllValues;
  });

  it("_getDisplayText returns empty string when single value not found in tree (label : \"\")", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .value=${"not-in-tree"} .isMultiple=${false}></bl-tree-select>`
    );

    await elementUpdated(el);
    const getDisplayText = (el as unknown as { _getDisplayText(): string })._getDisplayText.bind(el);

    expect(getDisplayText()).to.equal("");
  });

  it("_findNodeByValue returns found node when value is in children (if (found) return found)", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    await elementUpdated(el);
    const findNodeByValue = (el as unknown as {
      _findNodeByValue(value: string, nodes?: TreeNode[]): TreeNode | null;
    })._findNodeByValue.bind(el);

    const c1 = findNodeByValue("c1");

    expect(c1).to.not.be.null;
    expect(c1?.value).to.equal("c1");
    expect(c1?.label).to.equal("Child 1");
    const c2 = findNodeByValue("c2");

    expect(c2).to.not.be.null;
    expect(c2?.value).to.equal("c2");
  });

  it("expand/collapse toggles children visibility", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const expandBtn = el.shadowRoot?.querySelector(".tree-expand[aria-expanded]") as HTMLElement;

    expect(expandBtn?.getAttribute("aria-expanded")).to.equal("false");
    expandBtn?.click();
    await elementUpdated(el);
    expect(expandBtn?.getAttribute("aria-expanded")).to.equal("true");
    expect(el.shadowRoot?.querySelector(".tree-node-expanded")).to.exist;
    expect(el.shadowRoot?.querySelector(".tree-children")).to.exist;

    expandBtn?.click();
    await elementUpdated(el);
    expect(expandBtn?.getAttribute("aria-expanded")).to.equal("false");
  });

  it("node without count renders no tree-node-count (count != null : \"\" branch)", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const expandBtn = el.shadowRoot?.querySelector(".tree-expand[aria-expanded]") as HTMLElement;

    expandBtn?.click();
    await elementUpdated(el);
    const c2Row = el.shadowRoot?.querySelector('[data-tree-focus="c2"]')?.closest(".tree-node");

    expect(c2Row).to.exist;
    expect(c2Row?.querySelector(".tree-node-count")).to.not.exist;
  });

  it("single mode: parent without count renders no tree-node-count (line 556 : \"\")", async () => {
    const treeParentNoCount: TreeNode[] = [
      {
        value: "p",
        label: "Parent",
        children: [{ value: "c", label: "Child" }],
      },
    ];

    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${treeParentNoCount} .isMultiple=${false}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const parentRow = el.shadowRoot?.querySelector(".tree-node-single-parent");

    expect(parentRow).to.exist;
    expect(parentRow?.querySelector(".tree-node-count")).to.not.exist;
  });

  it("single mode: leaf without count renders no tree-node-count (line 571 : \"\")", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .isMultiple=${false}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const expandBtn = el.shadowRoot?.querySelector(".tree-expand[aria-expanded]") as HTMLElement;

    expandBtn?.click();
    await elementUpdated(el);
    const c2Row = el.shadowRoot?.querySelector('[data-tree-focus="c2"]')?.closest(".tree-node");

    expect(c2Row).to.exist;
    expect(c2Row?.querySelector(".tree-node-count")).to.not.exist;
  });

  it("typing in input filters to autocomplete list", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const input = getSearchInput(el);

    input?.focus();
    input!.value = "child";
    input?.dispatchEvent(new InputEvent("input", { bubbles: true }));
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".autocomplete-list")).to.exist;
    expect(el.shadowRoot?.querySelectorAll(".autocomplete-row").length).to.be.greaterThan(0);
  });

  it("shows empty state when search has no results", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select
        .items=${sampleTree}
        empty-result-text="No results"
      ></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const input = getSearchInput(el);

    input!.value = "xyznonexistent";
    input?.dispatchEvent(new InputEvent("input", { bubbles: true }));
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".autocomplete-empty")).to.exist;
    expect(el.shadowRoot?.querySelector(".autocomplete-empty")?.textContent?.trim()).to.equal(
      "No results"
    );
  });

  it("shows loading spinner when search text is non-empty and open", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .isSearchLoading=${true} .items=${sampleTree}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const blSelect = getBlSelect(el);

    expect(blSelect?.searchBarLoadingState).to.be.true;
    expect(blSelect?.shadowRoot?.querySelector(".search-spinner")).to.exist;
  });

  it("chevron button click toggles open state", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    const blSelect = getBlSelect(el);
    const chevron = blSelect?.shadowRoot?.querySelector(".dropdown-icon.closed") as HTMLElement;

    expect(chevron).to.exist;
    chevron?.click();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.exist;

    const chevronOpen = blSelect?.shadowRoot?.querySelector(".dropdown-icon.open") as HTMLElement;

    chevronOpen?.click();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.not.exist;
  });

  it("wrapper Enter opens and Escape closes", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    const blSelect = getBlSelect(el);
    const fieldset = blSelect?.shadowRoot?.querySelector(".select-input") as HTMLElement;

    fieldset?.focus();
    await sendKeys({ press: "Enter" });
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.exist;

    await sendKeys({ press: "Escape" });
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.not.exist;
  });

  it("ArrowDown increases focused index when panel has items", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const input = getSearchInput(el);

    input?.focus();
    await sendKeys({ press: "ArrowDown" });
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-node-row-focused")).to.exist;
  });

  it("has-value class when single value is set", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .value=${"c1"} .isMultiple=${false}></bl-tree-select>`
    );

    expect(el.shadowRoot?.querySelector(".tree-select-has-value")).to.exist;
  });

  it("has-value class when multiple values are set", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .value=${["c1", "c2"]}></bl-tree-select>`
    );

    expect(el.shadowRoot?.querySelector(".tree-select-has-value")).to.exist;
  });

  it("panel has role listbox when isMultiple and role tree when single", async () => {
    const multi = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} is-multiple></bl-tree-select>`
    );

    multi.open();
    await elementUpdated(multi);
    expect(multi.shadowRoot?.querySelector(".tree-select-panel")?.getAttribute("role")).to.equal(
      "listbox"
    );

    const single = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .isMultiple=${false}></bl-tree-select>`
    );

    single.open();
    await elementUpdated(single);
    expect(single.shadowRoot?.querySelector(".tree-select-panel")?.getAttribute("role")).to.equal(
      "tree"
    );
  });

  it("clicking autocomplete row selects item and dispatches change in multiple mode", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} is-multiple></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const input = getSearchInput(el);

    input!.value = "parent";
    input?.dispatchEvent(new InputEvent("input", { bubbles: true }));
    await elementUpdated(el);
    const firstRow = el.shadowRoot?.querySelector(".autocomplete-row") as HTMLElement;

    const promise = oneEvent(el, "bl-tree-select-change");

    firstRow?.click();
    await promise;
    expect(el.selectedSet.size).to.be.greaterThan(0);
  });

  it("single mode: clicking autocomplete leaf row selects value and closes panel", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .isMultiple=${false}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const input = getSearchInput(el);

    input!.value = "child";
    input?.dispatchEvent(new InputEvent("input", { bubbles: true }));
    await elementUpdated(el);
    const rows = el.shadowRoot?.querySelectorAll(".autocomplete-row") ?? [];
    const leafRow = Array.from(rows).find(
      row => (row.getAttribute("data-tree-focus") === "c1" || row.getAttribute("data-tree-focus") === "c2")
    ) as HTMLElement;

    const promise = oneEvent(el, "bl-tree-select-change");

    leafRow?.click();
    const ev = await promise;

    expect(["c1", "c2"]).to.include(ev.detail?.value);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.not.exist;
  });

  it("parent node toggle selects all descendants in multiple mode", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} is-multiple></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const expandBtn = el.shadowRoot?.querySelector(".tree-expand[aria-expanded]") as HTMLElement;

    expandBtn?.click();
    await elementUpdated(el);
    const parentInput = getCheckboxInput(el, ".tree-node .tree-checkbox");

    const promise = oneEvent(el, "bl-tree-select-change");

    setTimeout(() => parentInput?.click());
    await promise;
    await elementUpdated(el);
    expect(el.selectedSet.has("p1")).to.be.true;
    expect(el.selectedSet.has("c1")).to.be.true;
    expect(el.selectedSet.has("c2")).to.be.true;
  });

  it("selectedSet is empty when value is null", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    expect(el.selectedSet.size).to.equal(0);
  });

  it("close resets search text", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const input = getSearchInput(el);

    input!.value = "test";
    input?.dispatchEvent(new InputEvent("input", { bubbles: true }));
    await elementUpdated(el);
    el.close();
    await elementUpdated(el);

    const host = el as unknown as { _searchText: string };

    expect(host._searchText).to.equal("");
  });

  it("handles value as array for single mode (_singleValue)", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} .value=${["c1"]} .isMultiple=${false}></bl-tree-select>`
    );

    expect(el.selectedSet.has("c1")).to.be.true;
    expect(el.shadowRoot?.querySelector(".tree-select-has-value")).to.exist;
  });

  it("ArrowUp moves focus when panel open", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const input = getSearchInput(el);

    input?.focus();
    await sendKeys({ press: "ArrowDown" });
    await sendKeys({ press: "ArrowDown" });
    await elementUpdated(el);
    await sendKeys({ press: "ArrowUp" });
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-node-row-focused")).to.exist;
  });

  it("Space on wrapper toggles open", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    const blSelect = getBlSelect(el);
    const fieldset = blSelect?.shadowRoot?.querySelector(".select-input") as HTMLElement;

    fieldset?.focus();
    await sendKeys({ press: " " });
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.exist;
  });

  it("bl-select is present and disabled attribute propagates", async () => {
    const enabled = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    const blSelectEnabled = getBlSelect(enabled);

    expect(blSelectEnabled).to.exist;
    expect(blSelectEnabled?.disabled).to.not.be.true;

    const disabled = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} disabled></bl-tree-select>`
    );

    const blSelectDisabled = getBlSelect(disabled);

    expect(blSelectDisabled?.disabled).to.be.true;
  });

  it("empty-result-text attribute is reflected", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select empty-result-text="No items"></bl-tree-select>`
    );

    expect(el.searchNotFoundText).to.equal("No items");
  });

  it("ArrowRight expands focused node when panel open", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const input = getSearchInput(el);

    input?.focus();
    await sendKeys({ press: "ArrowRight" });
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-node-expanded")).to.exist;
  });

  it("ArrowLeft collapses focused node when expanded", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const input = getSearchInput(el);

    input?.focus();
    await sendKeys({ press: "ArrowRight" });
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-node-expanded")).to.exist;

    await sendKeys({ press: "ArrowLeft" });
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-node-expanded")).to.not.exist;
  });

  it("_onPanelKeydown default branch does nothing for unhandled key (line 381)", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const host = el as unknown as {
      _onPanelKeydown(e: KeyboardEvent): void;
      _focusedIndex: number;
    };
    const prevIndex = host._focusedIndex;
    const prevValue = el.value;

    host._onPanelKeydown(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }));
    await elementUpdated(el);
    expect(host._focusedIndex).to.equal(prevIndex);
    expect(el.value).to.equal(prevValue);
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.exist;
  });

  it("Enter on focused option triggers selection", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} is-multiple></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const input = getSearchInput(el);

    input?.focus();
    await sendKeys({ press: "ArrowDown" });
    await elementUpdated(el);
    const promise = oneEvent(el, "bl-tree-select-change");

    await sendKeys({ press: "Enter" });
    await promise;
    expect(el.selectedSet.size).to.be.greaterThan(0);
  });

  it("Space on focused option triggers selection (case Space)", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} is-multiple></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const input = getSearchInput(el);

    input?.focus();
    await sendKeys({ press: "ArrowDown" });
    await elementUpdated(el);
    const promise = oneEvent(el, "bl-tree-select-change");

    await sendKeys({ press: " " });
    await promise;
    expect(el.selectedSet.size).to.be.greaterThan(0);
  });

  it("Enter when Select All is focused calls handleSelectAll", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select
        .items=${sampleTree}
        is-multiple
        view-select-all
      ></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const panel = el.shadowRoot?.querySelector<HTMLElement>(".tree-select-panel");

    expect(panel).to.exist;
    panel!.focus();
    await elementUpdated(el);
    // Panel açıldığında _focusedIndex=0, view-select-all ile ilk öğe "select-all"
    const promise1 = oneEvent(el, "bl-tree-select-change");

    panel!.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await promise1;
    await elementUpdated(el);
    expect(el.selectedSet.size).to.be.greaterThan(0);

    const promise2 = oneEvent(el, "bl-tree-select-change");

    panel!.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await promise2;
    await elementUpdated(el);
    expect(el.selectedSet.size).to.equal(0);
  });

  it("Space when Select All is focused toggles select all", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select
        .items=${sampleTree}
        is-multiple
        view-select-all
      ></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const panel = el.shadowRoot?.querySelector<HTMLElement>(".tree-select-panel");

    expect(panel).to.exist;
    panel!.focus();
    await elementUpdated(el);
    // Panel açıldığında _focusedIndex=0, view-select-all ile ilk öğe "select-all"
    const promise1 = oneEvent(el, "bl-tree-select-change");

    panel!.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    await promise1;
    await elementUpdated(el);
    expect(el.selectedSet.size).to.be.greaterThan(0);

    const promise2 = oneEvent(el, "bl-tree-select-change");

    panel!.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    await promise2;
    await elementUpdated(el);
    expect(el.selectedSet.size).to.equal(0);
  });

  it("_filterVisible returns parent with filteredChildren when only child matches (childMatch branch)", async () => {
    const deepTree: TreeNode[] = [
      {
        value: "fruits",
        label: "Fruits",
        children: [
          { value: "apple", label: "Apple" },
          { value: "grape", label: "Grape" },
        ],
      },
      { value: "vegetables", label: "Vegetables" },
    ];
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${deepTree}></bl-tree-select>`
    );

    await elementUpdated(el);
    const filterVisible = (el as unknown as {
      _filterVisible(nodes: TreeNode[], searchLower: string): TreeNode[];
    })._filterVisible.bind(el);

    const result = filterVisible(deepTree, "apple");

    expect(result.length).to.equal(1);
    expect(result[0].value).to.equal("fruits");
    expect(result[0].children?.length).to.equal(1);
    expect(result[0].children?.[0].value).to.equal("apple");
  });

  it("_filterVisible returns node with original children when selfMatch true but no filteredChildren (node.children fallback)", async () => {
    const treeWithEmptyChildren: TreeNode[] = [
      { value: "p2", label: "Parent 2", count: 0, children: [] },
    ];
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${treeWithEmptyChildren}></bl-tree-select>`
    );

    await elementUpdated(el);
    const filterVisible = (el as unknown as {
      _filterVisible(nodes: TreeNode[], searchLower: string): TreeNode[];
    })._filterVisible.bind(el);

    const result = filterVisible(treeWithEmptyChildren, "parent 2");

    expect(result.length).to.equal(1);
    expect(result[0].value).to.equal("p2");
    expect(result[0].children).to.deep.equal([]);
  });

  it("_filterVisible returns null for nodes where neither selfMatch nor childMatch (null branch)", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    await elementUpdated(el);
    const filterVisible = (el as unknown as {
      _filterVisible(nodes: TreeNode[], searchLower: string): TreeNode[];
    })._filterVisible.bind(el);

    const result = filterVisible(sampleTree, "xyznotfound");

    expect(result.length).to.equal(0);
  });

  it("_selectAllState returns checked:false, indeterminate:false when items are empty (line 428)", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${[]} is-multiple view-select-all></bl-tree-select>`
    );

    await elementUpdated(el);
    const host = el as unknown as {
      _selectAllState: { checked: boolean; indeterminate: boolean };
    };

    expect(host._selectAllState.checked).to.be.false;
    expect(host._selectAllState.indeterminate).to.be.false;
  });

  it("_onPanelKeydown returns early when focusable list is empty (line 341)", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${[]}></bl-tree-select>`
    );

    el.open();
    await elementUpdated(el);
    const host = el as unknown as {
      _onPanelKeydown(e: KeyboardEvent): void;
      _focusedIndex: number;
    };

    host._focusedIndex = 0;
    const event = new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true });

    host._onPanelKeydown(event);
    await elementUpdated(el);
    expect(host._focusedIndex).to.equal(0);
    expect(el.value).to.be.null;
  });

  it("firstUpdated returns early when _selectEl is not available (line 476)", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree}></bl-tree-select>`
    );

    await elementUpdated(el);
    Object.defineProperty(el, "_selectEl", { get: () => null, configurable: true });
    const host = el as unknown as { firstUpdated(): void; _open: boolean };

    host.firstUpdated();
    expect(host._open).to.be.false;
  });

  it("monkey-patched open returns early when disabled (line 491)", async () => {
    const el = await fixture<BlTreeSelect>(
      html`<bl-tree-select .items=${sampleTree} disabled></bl-tree-select>`
    );

    await elementUpdated(el);
    const blSelect = getBlSelect(el);

    blSelect?.open();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".tree-select-open")).to.not.exist;
  });
});
