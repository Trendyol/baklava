import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { CSSResultGroup } from "lit/development";
import "element-internals-polyfill";
import "../../checkbox-group/checkbox/bl-checkbox";
import { blTableBodyTag } from "../table-body/bl-table-body";
import type BlTableBody from "../table-body/bl-table-body";
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

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  updated() {
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
  }

  private get _table() {
    return this.closest("bl-table") ?? null;
  }

  private get _firstTableCell() {
    return this.querySelector("bl-table-cell");
  }
  get disabled() {
    return !!this._firstTableCell?.disabled;
  }
  get index() {
    const parent = this.parentNode;

    if (!parent) {
      return -1;
    }
    return [...parent.children].indexOf(this);
  }

  get checked() {
    return !!this._table?.isRowSelected(this.index);
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
