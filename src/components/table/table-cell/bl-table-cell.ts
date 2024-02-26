import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CSSResultGroup } from "lit/development";
import "element-internals-polyfill";
import "../../checkbox-group/checkbox/bl-checkbox";
import style from "../table-cell/bl-table-cell.css";
import BlTableRow, { blTableRowTag } from "../table-row/bl-table-row";

export const blTableCellTag = "bl-table-cell";
/**
 * @tag bl-table-cell
 * @summary Baklava Table component
 */
@customElement(blTableCellTag)
export default class BlTableCell extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Disable selection
   */
  @property({ type: Boolean, reflect: true, attribute: "disabled" })
  disableSelection = false;

  private get _table() {
    return this.closest("bl-table");
  }
  private get _tableRow() {
    return this.closest("bl-table-row");
  }
  get disabled() {
    return this.disableSelection;
  }
  get selectable() {
    return this.index === 0 && !!this._table?.isSelectable(false) && this.selectionKey;
  }
  get index() {
    const parent = this.parentNode;

    if (!parent) {
      return -1;
    }
    return [...parent.children].indexOf(this);
  }
  get selectionKey(): string {
    return this._tableRow ? this._tableRow.selectionKey : "";
  }
  get checked() {
    return !!this._tableRow?.checked;
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
      console.warn("bl-table-cell is designed to be used inside a bl-table-row", this);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  onChange(event: CustomEvent) {
    this._table?.onSelectionChange(false, event.detail, this.selectionKey);
  }

  private _renderCheckbox() {
    return this.selectable
      ? html`<bl-checkbox
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          value="row"
          @bl-checkbox-change=${this.onChange}
        >
        </bl-checkbox>`
      : null;
  }
  render(): TemplateResult {
    const className = this.shadowRight ? "shadow-right" : this.shadowLeft ? "shadow-left" : "";

    return html`<div class="table-cell ${className}">
      ${this._renderCheckbox()}
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blTableCellTag]: BlTableCell;
  }
}
