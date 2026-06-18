import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { localized, msg, str } from "@lit/localize";
import { event, EventDispatcher } from "../../utilities/event";
import "../button/bl-button";
import "../checkbox-group/checkbox/bl-checkbox";
import "../icon/bl-icon";
import "../popover/bl-popover";
import type BlPopover from "../popover/bl-popover";
import "../spinner/bl-spinner";
import style from "./bl-tree-select.css";

export interface TreeNode {
  value: string;
  label: string;
  count?: number;
  children?: TreeNode[];
}

/**
 * @tag bl-tree-select
 * @summary Baklava Tree Select component for hierarchical selection (e.g. category tree).
 * Supports single/multi select, expand/collapse, Select All, search with path display.
 */
@customElement("bl-tree-select")
@localized()
export default class BlTreeSelect extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Label above the input (e.g. "Kategori*")
   */
  @property({ type: String, attribute: "label", reflect: true })
  label = "";

  /**
   * Placeholder for the input (e.g. "Kategori girin")
   */
  @property({ type: String, reflect: true })
  placeholder = "";

  /**
   * When searching text loading icon
   */
  @property({ type: Boolean, reflect: false })
  isSearchLoading = false;

  /**
   * Tree data: array of root nodes. Each node has value, label, optional count, optional children.
   */
  @property({ type: Array })
  items: TreeNode[] = [];

  /**
   * Selected value(s). Single: string. Multiple: string[].
   */
  @property({ type: Array })
  value: string | string[] | null = null;

  /**
   * When true, multiple selection with checkboxes and Select All. When false, single selection: only leaf nodes have checkboxes.
   * Attribute: is-multiple
   */
  @property({ type: Boolean, attribute: "is-multiple", reflect: true })
  isMultiple = true;

  /**
   * Show "Select All" header in the dropdown (only when multiple)
   */
  @property({ type: Boolean, attribute: "view-select-all", reflect: true })
  viewSelectAll = false;

  /**
   * Text for Select All (e.g. "Select All")
   */
  @property({ type: String, attribute: "select-all-text", reflect: true })
  selectAllText = "";

  /**
   * Placeholder for search input inside dropdown
   */
  @property({ type: String, attribute: "search-placeholder", reflect: true })
  searchPlaceholder = "";

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Required state
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String, attribute: "empty-result-text", reflect: true })
  searchNotFoundText?: string;

  @state()
  private _open = false;

  @state()
  private _searchText = "";

  @state()
  private _expandedValues = new Set<string>();

  @state()
  private _focusedIndex = 0;

  @query("bl-popover")
  private _popover!: BlPopover;

  @query(".tree-select-input")
  private _inputEl!: HTMLInputElement;

  @event("bl-tree-select-change")
  private _onChange: EventDispatcher<{ value: string | string[] | null }>;

  get selectedSet(): Set<string> {
    if (this.value == null) return new Set();
    const arr = Array.isArray(this.value) ? this.value : [this.value];

    return new Set(arr);
  }

  private get _hasValue(): boolean {
    return (
      (this.isMultiple && this.selectedSet.size > 0) ||
      (!this.isMultiple && this._singleValue != null && this._singleValue !== "")
    );
  }

  private get _singleValue(): string | null {
    if (this.value == null) return null;
    if (Array.isArray(this.value)) return this.value[0] ?? null;
    return this.value;
  }

  private get _autocompleteList(): { node: TreeNode; path: string }[] {
    const q = this._searchText.trim().toLowerCase();

    if (!q) return [];
    const flat = this._flatWithPath(this.items);

    return flat.filter(({ path }) => path.toLowerCase().includes(q));
  }

  private _highlightPath(path: string, search: string): TemplateResult {
    const displayPath = path.replace(/\s*\/\s*/g, "/");
    const searchTrimmed = search.trim();
    const searchLower = searchTrimmed.toLowerCase();

    if (!searchLower) return html`${displayPath}`;
    const pathLower = displayPath.toLowerCase();
    const segments: { text: string; match: boolean }[] = [];
    let pos = 0;

    while (pos < displayPath.length) {
      const idx = pathLower.indexOf(searchLower, pos);

      if (idx === -1) {
        if (pos < displayPath.length) segments.push({ text: displayPath.slice(pos), match: false });
        break;
      }
      if (idx > pos) segments.push({ text: displayPath.slice(pos, idx), match: false });
      segments.push({
        text: displayPath.slice(idx, idx + searchTrimmed.length),
        match: true,
      });
      pos = idx + searchTrimmed.length;
    }
    return html`
      ${segments.map(s =>
        s.match ? html`<span class="autocomplete-match">${s.text}</span>` : s.text
      )}
    `;
  }

  private get _focusableValues(): (string | "select-all")[] {
    const list = this._autocompleteList;

    if (list.length > 0) return list.map(({ node }) => node.value);
    const visible = this._filterVisible(this.items, this._searchText.toLowerCase());
    const flat = this._flattenVisible(visible);
    const values = flat.map(n => n.value);

    if (this.isMultiple && this.viewSelectAll) return ["select-all", ...values];
    return values;
  }

  private get _focusedValue(): string | "select-all" | null {
    const list = this._focusableValues;

    if (this._focusedIndex < 0 || this._focusedIndex >= list.length) return null;
    return list[this._focusedIndex];
  }

  private _selectAutocompleteItem(node: TreeNode) {
    if (this.isMultiple) {
      this._toggleNode(node, !this._isChecked(node));
    } else {
      if (!node.children?.length) {
        this._setSingleLeafValue(node, true);
        this.close();
      }
    }
  }

  private _flatWithPath(nodes: TreeNode[], pathPrefix = ""): { node: TreeNode; path: string }[] {
    const result: { node: TreeNode; path: string }[] = [];

    for (const node of nodes) {
      const path = pathPrefix ? `${pathPrefix} / ${node.label}` : node.label;

      result.push({ node, path });
      if (node.children?.length) {
        result.push(...this._flatWithPath(node.children, path));
      }
    }
    return result;
  }

  private _allValues(nodes: TreeNode[]): Set<string> {
    const set = new Set<string>();

    for (const node of nodes) {
      set.add(node.value);
      if (node.children?.length) {
        this._allValues(node.children).forEach(v => set.add(v));
      }
    }
    return set;
  }

  private _flattenVisible(nodes: TreeNode[]): TreeNode[] {
    const result: TreeNode[] = [];

    const visit = (list: TreeNode[]) => {
      for (const node of list) {
        result.push(node);
        if (node.children?.length && this._expandedValues.has(node.value)) {
          visit(node.children);
        }
      }
    };

    visit(nodes);
    return result;
  }

  private _filterVisible(nodes: TreeNode[], searchLower: string): TreeNode[] {
    if (!searchLower) return nodes;
    const flat = this._flatWithPath(nodes);
    const matchingValues = new Set(
      flat
        .filter(({ path }) => path.toLowerCase().includes(searchLower))
        .map(({ node }) => node.value)
    );
    const filterNode = (node: TreeNode): TreeNode | null => {
      const selfMatch = matchingValues.has(node.value);
      const filteredChildren = node.children?.length
        ? node.children.map(filterNode).filter((n): n is TreeNode => n != null)
        : undefined;
      const childMatch = filteredChildren && filteredChildren.length > 0;

      if (selfMatch || childMatch) {
        return {
          ...node,
          children: filteredChildren?.length ? filteredChildren : node.children,
        };
      }
      return null;
    };

    return nodes.map(filterNode).filter((n): n is TreeNode => n != null);
  }

  private _isChecked(node: TreeNode): boolean {
    const sel = this.selectedSet;

    if (!sel.has(node.value)) return false;
    if (!node.children?.length) return true;
    const childValues = this._allValues(node.children);

    return [...childValues].every(v => sel.has(v));
  }

  private _isIndeterminate(node: TreeNode): boolean {
    const sel = this.selectedSet;

    if (!node.children?.length) return false;
    const childValues = [...this._allValues(node.children)];

    if (childValues.length === 0) return false;
    const selectedCount = childValues.filter(v => sel.has(v)).length;

    return selectedCount > 0 && selectedCount < childValues.length;
  }

  private _isExpanded(node: TreeNode): boolean {
    return this._expandedValues.has(node.value);
  }

  private _toggleExpand(node: TreeNode) {
    const next = new Set(this._expandedValues);

    if (next.has(node.value)) next.delete(node.value);
    else next.add(node.value);
    this._expandedValues = next;
  }

  private _findNodeByValue(value: string, nodes: TreeNode[] = this.items): TreeNode | null {
    for (const node of nodes) {
      if (node.value === value) return node;
      if (node.children?.length) {
        const found = this._findNodeByValue(value, node.children);

        if (found) return found;
      }
    }
    return null;
  }

  private _scrollFocusedIntoView() {
    this.requestUpdate();
    requestAnimationFrame(() => {
      const value = this._focusedValue;

      if (value == null) return;
      const el = this.renderRoot.querySelector<HTMLElement>(`[data-tree-focus="${value}"]`);

      el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  }

  private _onPanelKeydown(e: KeyboardEvent) {
    const list = this._focusableValues;

    if (list.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        this._focusedIndex = Math.min(this._focusedIndex + 1, list.length - 1);
        this._scrollFocusedIntoView();
        break;
      case "ArrowUp":
        e.preventDefault();
        this._focusedIndex = Math.max(0, this._focusedIndex - 1);
        this._scrollFocusedIntoView();
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (this._focusedValue && this._focusedValue !== "select-all") {
          const node = this._findNodeByValue(this._focusedValue);

          if (node && this._isExpanded(node)) this._toggleExpand(node);
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (this._focusedValue && this._focusedValue !== "select-all") {
          const node = this._findNodeByValue(this._focusedValue);

          if (node?.children?.length && !this._isExpanded(node)) this._toggleExpand(node);
        }
        break;
      case " ":
      case "Enter":
        e.preventDefault();
        if (this._focusedValue === "select-all") {
          this._handleSelectAll(!this._selectAllState.checked);
        } else if (this._focusedValue) {
          const node = this._findNodeByValue(this._focusedValue);

          if (node) this._selectAutocompleteItem(node);
        }
        break;
      default:
        break;
    }
  }

  private _setSingleLeafValue(node: TreeNode, checked: boolean) {
    if (this.disabled || this.isMultiple) return;
    this.value = checked ? node.value : null;
    this._onChange({ value: this.value });
    if (checked) this.close();
  }

  private _toggleNode(node: TreeNode, checked: boolean) {
    const values = this._allValues([node]);
    const newSet = new Set(this.selectedSet);

    values.forEach(v => (checked ? newSet.add(v) : newSet.delete(v)));
    this._applySelection(newSet);
  }

  private _applySelection(set: Set<string>) {
    if (this.isMultiple) {
      this.value = Array.from(set);
    } else {
      this.value = set.size ? Array.from(set)[0] : null;
    }
    this._onChange({ value: this.value });
    this.requestUpdate();
  }

  private _handleSelectAll(checked: boolean) {
    const visible = this._filterVisible(this.items, this._searchText.toLowerCase());
    const allValues = this._allValues(visible);
    const newSet = new Set(this.selectedSet);

    if (checked) {
      allValues.forEach(v => newSet.add(v));
    } else {
      allValues.forEach(v => newSet.delete(v));
    }
    this._applySelection(newSet);
  }

  private get _selectAllState(): { checked: boolean; indeterminate: boolean } {
    const visible = this._filterVisible(this.items, this._searchText.toLowerCase());
    const allValues = this._allValues(visible);

    if (allValues.size === 0) return { checked: false, indeterminate: false };
    const selectedCount = [...allValues].filter(v => this.selectedSet.has(v)).length;

    return {
      checked: selectedCount === allValues.size,
      indeterminate: selectedCount > 0 && selectedCount < allValues.size,
    };
  }

  private _getDisplayText(): string {
    if (!this.isMultiple) {
      const single = this._singleValue;

      if (single == null || single === "") return "";
      const flat = this._flatWithPath(this.items);
      const found = flat.find(({ node }) => node.value === single);

      return found ? found.node.label : "";
    }
    const sel = this.selectedSet;

    if (sel.size === 0) return "";
    const flat = this._flatWithPath(this.items);
    const labels: string[] = [];

    for (const v of sel) {
      const found = flat.find(({ node }) => node.value === v);

      if (found) labels.push(found.node.label);
    }
    return labels.join(", ");
  }

  open() {
    if (this.disabled) return;
    this._open = true;
    this._popover?.show();
    this.updateComplete.then(() => {
      this._inputEl?.focus();
    });
  }

  close() {
    this._open = false;
    this._searchText = "";
    this._focusedIndex = 0;
    this._popover?.hide();
  }

  private _clearSelection() {
    this.value = this.isMultiple ? [] : null;
    this._onChange({ value: this.value });
  }

  protected firstUpdated() {
    this._popover.target = this.renderRoot.querySelector(".tree-select-trigger") as Element;
  }

  private _handleInputChange(e: Event) {
    this._searchText = (e.target as HTMLInputElement).value;
  }

  private _handleTriggerClick() {
    if (this.disabled) return;
    if (this._open) {
      this.close();
    } else {
      this.open();
    }
  }

  private _handleTriggerKeydown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!this._open) {
        this.open();
      }
    } else if (e.key === "Escape" && this._open) {
      e.preventDefault();
      this.close();
    } else if (this._open) {
      this._onPanelKeydown(e);
    }
  }

  private _onPopoverHide() {
    if (this._open) {
      this._open = false;
      this._searchText = "";
      this._focusedIndex = 0;
    }
  }

  protected updated(_changedProperties: Map<string, unknown>) {
    super.updated(_changedProperties);
    if (this._open) {
      if (_changedProperties.has("_open") || _changedProperties.has("_searchText"))
        this._focusedIndex = 0;
      const list = this._focusableValues;

      this._focusedIndex = Math.min(this._focusedIndex, Math.max(0, list.length - 1));
    }
  }

  private _renderCount(node: TreeNode): TemplateResult | string {
    return node.count != null ? html`<span class="tree-node-count">${node.count}</span>` : "";
  }

  private _renderNode(node: TreeNode, depth: number): TemplateResult {
    const hasChildren = !!node.children?.length;
    const expanded = this._isExpanded(node);
    const checked = this._isChecked(node);
    const indeterminate = this._isIndeterminate(node);
    const expandIcon = hasChildren ? (expanded ? "arrow_down" : "arrow_right") : null;
    const singleMode = !this.isMultiple;
    const isLeaf = !hasChildren;
    const singleLeafChecked = singleMode && isLeaf && this._singleValue === node.value;
    const singleParent = singleMode && hasChildren;

    const rowFocused = this._focusedValue === node.value;

    return html`
      <div
        class=${classMap({
          "tree-node": true,
          "tree-node-expanded": expanded,
          "tree-node-leaf": isLeaf,
          "tree-node-selected": singleMode ? singleLeafChecked : checked,
          "tree-node-single-parent": singleParent,
        })}
        style="--depth: ${depth}"
      >
        <div
          class=${classMap({ "tree-node-row": true, "tree-node-row-focused": rowFocused })}
          data-tree-focus=${node.value}
        >
          <span
            class="tree-expand"
            @click=${(e: MouseEvent) => {
              e.stopPropagation();
              if (hasChildren) this._toggleExpand(node);
            }}
            role="button"
            tabindex=${hasChildren ? 0 : -1}
            aria-expanded=${hasChildren && expanded}
          >
            ${expandIcon
              ? html`<bl-icon name="${expandIcon}"></bl-icon>`
              : html`<span class="tree-expand-spacer"></span>`}
          </span>
          ${singleParent
            ? html`
                <span class="tree-node-label">${node.label}</span>
                ${this._renderCount(node)}
              `
            : singleMode && isLeaf
            ? html`
                <bl-checkbox
                  class="tree-checkbox"
                  .checked=${singleLeafChecked}
                  .disabled=${this.disabled}
                  @bl-checkbox-change=${(e: CustomEvent<boolean>) =>
                    this._setSingleLeafValue(node, e.detail)}
                >
                  <span class="tree-node-label">${node.label}</span>
                </bl-checkbox>
                ${this._renderCount(node)}
              `
            : html`
                <bl-checkbox
                  class="tree-checkbox"
                  .checked=${checked}
                  .indeterminate=${indeterminate}
                  .disabled=${this.disabled}
                  @bl-checkbox-change=${(e: CustomEvent<boolean>) =>
                    this._toggleNode(node, e.detail)}
                >
                  <span class="tree-node-label">${node.label}</span>
                </bl-checkbox>
                ${this._renderCount(node)}
              `}
        </div>
        ${hasChildren && expanded
          ? html`
              <div class="tree-children">
                ${node.children!.map(child => this._renderNode(child, depth + 1))}
              </div>
            `
          : ""}
      </div>
    `;
  }

  private _renderTree(nodes: TreeNode[]): TemplateResult {
    const visible = this._filterVisible(nodes, this._searchText.toLowerCase());

    return html` <div class="tree-list">${visible.map(node => this._renderNode(node, 0))}</div> `;
  }

  private _renderAutocompleteList(): TemplateResult {
    return html`
      <div class="tree-list autocomplete-list">
        ${this._autocompleteList.map(
          ({ node, path }) => html`
            <div
              class=${classMap({
                "autocomplete-row": true,
                "tree-node-row-focused": this._focusedValue === node.value,
              })}
              data-tree-focus=${node.value}
              role="option"
              @click=${() => this._selectAutocompleteItem(node)}
            >
              <span class="autocomplete-path">${this._highlightPath(path, this._searchText)}</span>
            </div>
          `
        )}
      </div>
    `;
  }

  private _renderSelectAllRow(): TemplateResult | string {
    if (!this.isMultiple || !this.viewSelectAll) return "";
    const { checked, indeterminate } = this._selectAllState;
    const count = this.selectedSet.size;

    return html`
      <div
        class=${classMap({
          "select-all-row": true,
          "select-all-row-focused": this._focusedValue === "select-all",
        })}
        data-tree-focus="select-all"
      >
        <bl-checkbox
          class="select-all-checkbox"
          .checked=${checked}
          .indeterminate=${indeterminate}
          @bl-checkbox-change=${(e: CustomEvent<boolean>) => this._handleSelectAll(e.detail)}
        >
          ${this.selectAllText || msg("Select All", { desc: "bl-select: select all text" })}
          ${count > 0
            ? html`<span class="select-all-count"
                >${msg(str`(${count} selected)`, { desc: "bl-tree-select: selected count" })}</span
              >`
            : ""}
        </bl-checkbox>
      </div>
    `;
  }

  private _renderPanelContent(): TemplateResult {
    if (this._searchText.trim()) {
      return this._autocompleteList.length > 0
        ? this._renderAutocompleteList()
        : html`<div class="autocomplete-empty">
            ${this.searchNotFoundText ??
            msg("No Result Found", { desc: "bl-tree-select: search no result text" })}
          </div>`;
    }
    return html`${this._renderSelectAllRow()} ${this._renderTree(this.items)}`;
  }

  render(): TemplateResult {
    const displayText = this._getDisplayText();
    const searchPh =
      this.searchPlaceholder ||
      this.placeholder ||
      msg("Search...", { desc: "bl-tree-select: search placeholder" });
    const inputPlaceholder = this._open ? searchPh : displayText || this.placeholder || undefined;

    return html`
      <div
        class=${classMap({
          "tree-select-wrapper": true,
          "tree-select-open": this._open,
          "tree-select-has-value": this._hasValue,
        })}
      >
        ${this.label
          ? html`<div class="header">
              <label class="tree-select-label">${this.label}</label
              ><label class="required-suffix">${this.required ? "*" : ""}</label>
            </div>`
          : ""}
        <div
          class=${classMap({
            "tree-select-trigger": true,
            "tree-select-trigger-focused": this._open,
            "tree-select-trigger-has-value": this._hasValue && !this._open,
          })}
          tabindex=${this.disabled ? -1 : 0}
          role="combobox"
          aria-expanded=${this._open}
          aria-haspopup="tree"
          aria-label=${ifDefined(this.label || undefined)}
          @click=${this._handleTriggerClick}
          @keydown=${this._handleTriggerKeydown}
        >
          <input
            class="tree-select-input"
            .value=${this._open ? this._searchText : ""}
            placeholder=${ifDefined(inputPlaceholder)}
            ?disabled=${this.disabled}
            ?readonly=${!this._open}
            @input=${this._handleInputChange}
            @click=${(e: MouseEvent) => {
              if (this._open) e.stopPropagation();
            }}
          />
          ${this.isSearchLoading && this._open
            ? html`<bl-spinner class="tree-select-loading" size="small"></bl-spinner>`
            : ""}
          ${this._hasValue && !this.disabled
            ? html`
                <bl-button
                  class="tree-select-clear"
                  variant="tertiary"
                  kind="neutral"
                  size="small"
                  icon="close"
                  label=${msg("Clear", { desc: "bl-tree-select: clear selection button" })}
                  @click=${(e: MouseEvent) => {
                    e.stopPropagation();
                    this._clearSelection();
                  }}
                ></bl-button>
              `
            : ""}
          <bl-icon
            class=${classMap({
              "tree-select-chevron": true,
              "tree-select-chevron-open": this._open,
            })}
            name="arrow_down"
          ></bl-icon>
        </div>
        <bl-popover fit-size placement="bottom-start" @bl-popover-hide=${this._onPopoverHide}>
          <div
            class="tree-select-panel"
            role=${this.isMultiple ? "listbox" : "tree"}
            aria-multiselectable=${this.isMultiple}
            aria-label=${ifDefined(this.label || undefined)}
          >
            ${this._renderPanelContent()}
          </div>
        </bl-popover>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-tree-select": BlTreeSelect;
  }
}
