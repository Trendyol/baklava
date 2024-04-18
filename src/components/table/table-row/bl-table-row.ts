import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CSSResultGroup } from "lit/development";
import "element-internals-polyfill";
import "../../checkbox-group/checkbox/bl-checkbox";
import { blTableBodyTag } from "../table-body/bl-table-body";
import type BlTableBody from "../table-body/bl-table-body";
import BlTableCell from "../table-cell/bl-table-cell";
import BlTableHeaderCell from "../table-header-cell/bl-table-header-cell";
import { blTableHeaderTag } from "../table-header/bl-table-header";
import type BlTableHeader from "../table-header/bl-table-header";
import style from "../table-row/bl-table-row.css";

export const blTableRowTag = "bl-table-row";

/**
 * @tag bl-table-row
 * @summary Baklava Table component
 */
@customElement(blTableRowTag)
export default class BlTableRow extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * selection key for table row
   */
  @property({ type: String, reflect: true, attribute: "selection-key" })
  selectionKey: string = "";

  connectedCallback(): void {
    super.connectedCallback();
    if (
      !this.closest<BlTableHeader>(blTableHeaderTag) &&
      !this.closest<BlTableBody>(blTableBodyTag)
    ) {
      console.warn(
        "bl-table-row is designed to be used inside a bl-table-header or bl-table-body",
        this
      );
    }
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    this.removeAttribute("checked");
    this.removeAttribute("disabled");
    this.removeAttribute("sticky-first-column");
    this.removeAttribute("sticky-last-column");

    if (this.stickyFirstColumn) {
      this.setAttribute("sticky-first-column", "true");
    }
    if (this.stickyLastColumn) {
      this.setAttribute("sticky-last-column", "true");
    }
    if (this.checked) {
      this.setAttribute("checked", "true");
    } else if (this.disabled) {
      this.setAttribute("disabled", "true");
    }
    if (_changedProperties.has("selectionKey")) {
      this.updateComplete.then(() => {
        Array.from(this.querySelectorAll("bl-table-header-cell,bl-table-cell")).map(com => {
          (com as BlTableHeaderCell | BlTableCell).requestUpdate();
        });
      });
    }
  }

  private get _table() {
    return this.closest("bl-table");
  }

  private get _firstTableCell() {
    return this.querySelector("bl-table-cell");
  }
  get disabled() {
    return !!this._firstTableCell?.disabled;
  }

  get checked() {
    return !!this._table?.isRowSelected(this.selectionKey);
  }

  get stickyFirstColumn() {
    return !!this._table?.isFirstColumnSticky();
  }

  get stickyLastColumn() {
    return !!this._table?.isLastColumnSticky();
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blTableRowTag]: BlTableRow;
  }
}
