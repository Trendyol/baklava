import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
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
  selectAllText = "Select All";

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
  emptyResultText = "Sonuç Bulunamadı.";

  @state()
  private _open = false;

  @state()
  private _searchText = "";

  @state()
  private _expandedValues = new Set<string>();

  @state()
  private _focusedIndex = 0;

  @query(".tree-select-input")
  private _inputEl!: HTMLElement;

  @query("bl-popover")
  private _popoverRef!: BlPopover;

  @event("bl-tree-select-change")
  private _onChange: EventDispatcher<{ value: string | string[] | null }>;

  private _onPopoverHide = () => {
    this._open = false;
    this._searchText = "";
    this._focusedIndex = 0;
  };

  get selectedSet(): Set<string> {
    if (this.value == null) return new Set();
    const arr = Array.isArray(this.value) ? this.value : [this.value];

    return new Set(arr);
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

  private _pathDisplay(path: string): string {
    return path.replace(/\s*\/\s*/g, "/");
  }

  private _highlightPath(path: string, search: string): TemplateResult {
    const displayPath = this._pathDisplay(path);
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

    const selectAllChecked = this._getSelectAllChecked();

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
          this._handleSelectAll(!selectAllChecked);
        } else if (this._focusedValue) {
          const node = this._findNodeByValue(this._focusedValue);

          if (node) this._selectAutocompleteItem(node);
        }
        break;
      default:
        break;
    }
  }

  /** Single modda sadece yaprak node seçilir (checkbox ile). Parent’ta checkbox yok. */
  private _setSingleLeafValue(node: TreeNode, checked: boolean) {
    if (this.disabled || this.isMultiple) return;
    this.value = checked ? node.value : null;
    this._onChange({ value: this.value });
    if (checked) this.close();
  }

  /** Parent seçildiğinde kendisi + tüm alt node'lar (children) seçilir; kaldırıldığında hepsi kaldırılır. */
  private _toggleNode(node: TreeNode, checked: boolean) {
    const nodeAndAllDescendants = this._getNodeAndDescendantValues(node);
    const newSet = new Set(this.selectedSet);

    if (checked) {
      nodeAndAllDescendants.forEach(v => newSet.add(v));
    } else {
      nodeAndAllDescendants.forEach(v => newSet.delete(v));
    }
    this._applySelection(newSet);
  }

  private _getNodeAndDescendantValues(node: TreeNode): Set<string> {
    return this._allValues([node]);
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

  private _getSelectAllChecked(): boolean {
    const visible = this._filterVisible(this.items, this._searchText.toLowerCase());
    const allValues = this._allValues(visible);

    if (allValues.size === 0) return false;
    return [...allValues].every(v => this.selectedSet.has(v));
  }

  private _getSelectAllIndeterminate(): boolean {
    const visible = this._filterVisible(this.items, this._searchText.toLowerCase());
    const allValues = this._allValues(visible);

    if (allValues.size === 0) return false;
    const selectedCount = [...allValues].filter(v => this.selectedSet.has(v)).length;

    return selectedCount > 0 && selectedCount < allValues.size;
  }

  private _getDisplayText(): string {
    if (this._open && this._searchText) return this._searchText;
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
    this._popoverRef?.show();
  }

  close() {
    this._open = false;
    this._searchText = "";
    this._popoverRef?.hide();
  }

  private _clearSelection() {
    this.value = this.isMultiple ? [] : null;
    this._onChange({ value: this.value });
  }

  protected updated(_changedProperties: Map<string, unknown>) {
    super.updated(_changedProperties);
    if (this._inputEl && this._popoverRef && this._popoverRef.target !== this._inputEl) {
      this._popoverRef.target = this._inputEl;
    }
    if (this._open) {
      if (_changedProperties.has("_open") || _changedProperties.has("_searchText"))
        this._focusedIndex = 0;
      const list = this._focusableValues;

      this._focusedIndex = Math.min(this._focusedIndex, Math.max(0, list.length - 1));
    }
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
                ${node.count != null
                  ? html`<span class="tree-node-count">${node.count}</span>`
                  : ""}
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
                ${node.count != null
                  ? html`<span class="tree-node-count">${node.count}</span>`
                  : ""}
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
                ${node.count != null
                  ? html`<span class="tree-node-count">${node.count}</span>`
                  : ""}
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

  render(): TemplateResult {
    const displayText = this._getDisplayText();
    const selectedCount = this.selectedSet.size;
    const selectAllChecked = this._getSelectAllChecked();
    const selectAllIndeterminate = this._getSelectAllIndeterminate();

    return html`
      <div
        class=${classMap({
          "tree-select-wrapper": true,
          "tree-select-open": this._open,
          "tree-select-has-value":
            (this.isMultiple && selectedCount > 0) ||
            (!this.isMultiple && this._singleValue != null && this._singleValue !== ""),
        })}
      >
        ${this.label
          ? html`<div class="header">
              <label class="tree-select-label">${this.label}</label
              ><label class="required-suffix">${this.required ? "*" : ""}</label>
            </div>`
          : ""}
        <div
          class="tree-select-input"
          role="button"
          tabindex=${this.disabled ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded=${this._open}
          @click=${() => (this._open ? this.close() : this.open())}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              this._open ? this.close() : this.open();
            }
            if (e.key === "Escape") this.close();
          }}
        >
          <input
            type="text"
            class="tree-select-search-input"
            placeholder=${ifDefined(this.placeholder || undefined)}
            .value=${this._open ? this._searchText : displayText}
            ?readonly=${!this._open}
            @input=${(e: InputEvent) => {
              this._searchText = (e.target as HTMLInputElement).value;
            }}
            @keydown=${(e: KeyboardEvent) => {
              if (
                this._open &&
                ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", " ", "Enter"].includes(e.key)
              ) {
                e.preventDefault();
                this._onPanelKeydown(e);
              }
            }}
            @focus=${() => this.open()}
            @click=${(e: MouseEvent) => e.stopPropagation()}
          />
          ${this._open && this._searchText.trim() !== ""
            ? html`<bl-spinner
                class="tree-select-loading"
                size="var(--bl-font-size-m)"
              ></bl-spinner>`
            : ""}
          ${!this.disabled &&
          (selectedCount > 0 || (this._singleValue != null && this._singleValue !== ""))
            ? html`
                <bl-button
                  class="tree-select-clear"
                  variant="tertiary"
                  kind="neutral"
                  size="small"
                  icon="close"
                  label="Temizle"
                  @click=${(e: MouseEvent) => {
                    e.stopPropagation();
                    this._clearSelection();
                  }}
                ></bl-button>
              `
            : ""}
          <bl-button
            class="tree-select-chevron"
            variant="tertiary"
            kind="neutral"
            size="small"
            icon=${this._open ? "arrow_up" : "arrow_down"}
            label=${this._open ? "Close" : "Open"}
            @click=${(e: MouseEvent) => {
              e.stopPropagation();
              this._open ? this.close() : this.open();
            }}
          ></bl-button>
        </div>

        <bl-popover
          .target=${this._inputEl}
          placement="bottom"
          .offset=${8}
          fit-size
          @bl-popover-hide=${this._onPopoverHide}
        >
          <div
            class="tree-select-panel"
            role=${this.isMultiple ? "listbox" : "tree"}
            aria-multiselectable=${this.isMultiple}
            aria-label=${ifDefined(this.label || undefined)}
            tabindex="0"
            @keydown=${this._onPanelKeydown}
          >
            ${this._searchText.trim() !== ""
              ? this._autocompleteList.length > 0
                ? html`
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
                            <span class="autocomplete-path"
                              >${this._highlightPath(path, this._searchText)}</span
                            >
                          </div>
                        `
                      )}
                    </div>
                  `
                : html`<div class="autocomplete-empty">${this.emptyResultText}</div>`
              : html`
                  ${this.isMultiple && this.viewSelectAll
                    ? html`
                        <div
                          class=${classMap({
                            "select-all-row": true,
                            "select-all-row-focused": this._focusedValue === "select-all",
                          })}
                          data-tree-focus="select-all"
                        >
                          <bl-checkbox
                            class="select-all-checkbox"
                            .checked=${selectAllChecked}
                            .indeterminate=${selectAllIndeterminate}
                            @bl-checkbox-change=${(e: CustomEvent<boolean>) =>
                              this._handleSelectAll(e.detail)}
                          >
                            ${this.selectAllText}
                            ${selectedCount > 0
                              ? html`<span class="select-all-count"
                                  >(${selectedCount} selected)</span
                                >`
                              : ""}
                          </bl-checkbox>
                        </div>
                      `
                    : ""}
                  ${this._renderTree(this.items)}
                `}
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
