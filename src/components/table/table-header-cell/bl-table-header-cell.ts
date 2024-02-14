import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import "element-internals-polyfill";
import "../../checkbox-group/checkbox/bl-checkbox";
import BlCheckbox from "../../checkbox-group/checkbox/bl-checkbox";
import "../../icon/bl-icon";
import { BaklavaIcon } from "../../icon/icon-list";
import type BlTableRow from "../table-row/bl-table-row";
import { blTableRowTag } from "../table-row/bl-table-row";
import style from "./bl-table-header-cell.css";

export const blTableHeaderCellTag = "bl-table-header-cell";

/**
 * @tag bl-table-header-cell
 * @summary Baklava Table component
 *
 * @cssproperty [--bl-table-header-cell-width] Set the column width
 * @cssproperty [--bl-table-header-cell-min-width] Set the column min width
 */
@customElement(blTableHeaderCellTag)
export default class BlTableHeaderCell extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }
  /**
   * Set key value for column
   */
  @property({ type: String, reflect: true, attribute: "sort-key" })
  sortKey = "";

  private get _table() {
    return this.closest("bl-table");
  }
  private get _tableRow() {
    return this.closest("bl-table-row");
  }
  get selectable() {
    return this.index === 0 && !!this._table?.isSelectable(true);
  }
  get sortable() {
    return !!this._table?.sortable && !!this.sortKey;
  }
  get index() {
    const parent = this.parentNode;

    if (!parent) {
      return -1;
    }
    return [...parent.children].indexOf(this);
  }
  get checked() {
    return !!this._table?.isAllSelected();
  }
  get indeterminate() {
    return !!this._table?.isAnySelected();
  }
  get isAllUnselectedDisabled() {
    return !!this._table?.isAllUnselectedDisabled();
  }
  get sortDirection(): string {
    if (this._table?.sortKey === this.sortKey) {
      return this._table?.sortDirection || "";
    }

    return "";
  }
  get sortIconName(): BaklavaIcon {
    if (this.sortDirection === "asc") {
      return "sorting_asc";
    } else if (this.sortDirection === "desc") {
      return "sorting_desc";
    }

    return "sorting_default";
  }

  get shadowRight() {
    return !!this._tableRow?.stickyFirstColumn && this.index === 0;
  }
  get shadowLeft() {
    return !!this._tableRow?.stickyLastColumn;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.closest<BlTableRow>(blTableRowTag)) {
      console.warn("bl-table-header-cell is designed to be used inside a bl-table-row", this);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  onChange(event: CustomEvent) {
    const selectAllEl = this.shadowRoot?.querySelector(".select-all") as BlCheckbox;

    const checked = event.detail;

    // If all available rows are selected, instead of checking, uncheck all options
    if (checked && this.isAllUnselectedDisabled) {
      setTimeout(() => {
        const checkbox = selectAllEl?.shadowRoot?.querySelector("input");

        checkbox?.click();
      }, 0);
      return;
    }
    this._table?.onSelectionChange(true, event.detail, "");
    setTimeout(() => {
      selectAllEl.checked = this.checked;
      selectAllEl.indeterminate = this.indeterminate;
    });
  }

  onSort() {
    let _sortDirection = "asc";

    if (this.sortDirection === "asc") {
      _sortDirection = "desc";
    } else if (this.sortDirection === "desc") {
      _sortDirection = "";
    }

    this._table?.onSortChange(this.sortKey, _sortDirection);
  }

  private _renderCheckbox() {
    return this.selectable
      ? html`<bl-checkbox
          class="select-all"
          value="all"
          .indeterminate="${this.indeterminate}"
          @bl-checkbox-change=${this.onChange}
          role="option"
          .checked="${this.checked}"
          aria-selected="${this.checked}"
        >
        </bl-checkbox>`
      : null;
  }

  render(): TemplateResult {
    const className = this.shadowRight ? "shadow-right" : this.shadowLeft ? "shadow-left" : "";
    const template = this.sortable
      ? html` <div class="sort-icons-wrapper" @click=${this.onSort}>
          <slot></slot>
          <bl-icon name="${this.sortIconName}"></bl-icon>
        </div>`
      : html` <slot></slot>`;

    return html`<div class="table-header-cell ${className}">
      ${this._renderCheckbox()} ${template}
    </div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blTableHeaderCellTag]: BlTableHeaderCell;
  }
}
