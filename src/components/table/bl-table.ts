import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "element-internals-polyfill";
import { event, EventDispatcher } from "../../utilities/event";
import style from "./bl-table.css";
import BlTableCell from "./table-cell/bl-table-cell";
import BlTableHeaderCell from "./table-header-cell/bl-table-header-cell";
import BlTableRow from "./table-row/bl-table-row";

export const blTableTag = "bl-table";

export const blSortChangeEventName = "bl-table-sort";
export const blRowSelectChangeEventName = "bl-table-row-select";

/**
 * @tag bl-table
 * @summary Baklava Button component
 *
 */
@customElement(blTableTag)
export default class BlTable extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Selected table row selection key list
   */
  @property({ type: Array, reflect: true, attribute: "select-value" })
  get selectValue(): string[] {
    return this._selectValue;
  }
  set selectValue(value: string[]) {
    this._selectValue = value;
    this.updateComplete.then(() => {
      Array.from(this.querySelectorAll("bl-table-header-cell,bl-table-cell,bl-table-row")).map(
        com => {
          (com as BlTableHeaderCell | BlTableCell | BlTableRow).requestUpdate();
        }
      );
    });
  }

  /**
   * Sets table row as selectable
   */
  @property({ type: Boolean, reflect: true })
  selectable = false;

  /**
   * Sets table row multiple selection enable
   */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * Sets table as sortable
   */
  @property({ type: Boolean, reflect: true })
  sortable = false;
  /**
   * Sets table first column as sticky
   */
  @property({ type: Boolean, reflect: true, attribute: "sticky-first-column" })
  stickyFirstColumn = false;
  /**
   * Sets table last column as sticky
   */
  @property({ type: Boolean, reflect: true, attribute: "sticky-last-column" })
  stickyLastColumn = false;

  /**
   * Sets table sorted column key
   */
  @property({ type: String, reflect: true, attribute: "sort-key" })
  get sortKey(): string {
    return this._sortKey;
  }
  set sortKey(value: string) {
    this._sortKey = value;
  }

  /**
   * Sets table sorting direction
   */
  @property({ type: String, reflect: true, attribute: "sort-direction" })
  get sortDirection(): string {
    return this._sortDirection;
  }
  set sortDirection(value: string) {
    this._sortDirection = value;
  }

  /**
   * Fires when table sort options changed
   */
  @event("bl-table-sort") private onSort: EventDispatcher<string[]>;

  /**
   * Fires when selected table rows changed
   */
  @event("bl-table-row-select") private onRowSelect: EventDispatcher<string[]>;

  @state() private _selectValue: string[] = [];

  @state() private _sortKey: string = "";

  @state() private _sortDirection: string = "";

  get tableRows() {
    return this.querySelectorAll("bl-table-body bl-table-row");
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  isFirstColumnSticky() {
    return this.stickyFirstColumn;
  }

  isLastColumnSticky() {
    return this.stickyLastColumn;
  }

  isSelectable(isHeaderCell = false) {
    return isHeaderCell ? this.multiple && this.selectable : this.selectable;
  }

  isRowSelected(selectionKey: string) {
    return this.selectValue.includes(selectionKey);
  }

  isAllSelected() {
    return Array.from(this.tableRows)
      .filter(tr => !(tr as BlTableRow).disabled)
      .every(tr => this.selectValue.includes((tr as BlTableRow).selectionKey));
  }

  isAnySelected() {
    return (
      !this.isAllSelected() &&
      Array.from(this.tableRows)
        .filter(tr => !(tr as BlTableRow).disabled)
        .some(tr => this.selectValue.includes((tr as BlTableRow).selectionKey))
    );
  }

  /**
   * Handles selection changes for both header and row selections.
   * @param isHeader - Indicates if the selection change is for the header.
   * @param isSelected - The selection state.
   * @param selectionKey - The key identifying the selected row. It must be there if it is not the header.
   */
  onSelectionChange(isHeader: boolean = false, isSelected: boolean, selectionKey: string) {
    if (isHeader) {
      this.handleHeaderSelection(isSelected);
    } else {
      this.handleRowSelection(isSelected, selectionKey);
    }

    this.notifyRowSelectionChange();
  }

  /**
   * Updates selected values based on header selection.
   * @param isSelected - The selection state.
   */
  private handleHeaderSelection(isSelected: boolean) {
    this.selectValue = isSelected ? this.getSelectedValuesFromRows() : [];
  }

  /**
   * Updates selected values based on row selection.
   * @param isSelected - The selection state.
   * @param selectionKey - The key identifying the selected row.
   */
  private handleRowSelection(isSelected: boolean, selectionKey: string) {
    if (isSelected) {
      this.addSelection(selectionKey);
    } else {
      this.removeSelection(selectionKey);
    }
  }

  /**
   * Notifies about the row selection change.
   */
  private notifyRowSelectionChange() {
    this.onRowSelect(this.selectValue);
  }

  /**
   * Adds a selection key to the selected values.
   * @param selectionKey - The key to add.
   */
  private addSelection(selectionKey: string) {
    if (!this.selectValue.includes(selectionKey)) {
      this.selectValue.push(selectionKey);
    }
  }

  /**
   * Removes a selection key from the selected values.
   * @param selectionKey - The key to remove.
   */
  private removeSelection(selectionKey: string) {
    this.selectValue = this.selectValue.filter(value => value !== selectionKey);
  }

  /**
   * Gets the selection keys from all selectable table rows.
   * @returns An array of selection keys.
   */
  private getSelectedValuesFromRows(): string[] {
    return Array.from(this.tableRows)
      .filter(tableRow => !(tableRow as BlTableRow).disabled)
      .map(tableRow => (tableRow as BlTableRow).selectionKey);
  }

  onSortChange(sortKey: string, sortDirection: string) {
    this._sortKey = sortKey;
    this._sortDirection = sortDirection;
    this.onSort([this.sortKey, this.sortDirection]);
    this.updateComplete.then(() => {
      Array.from(this.querySelectorAll("bl-table-header-cell")).map(com => {
        (com as BlTableHeaderCell).requestUpdate();
      });
    });
  }

  render(): TemplateResult {
    return html`<div class="table-wrapper">
      <div class="table">
        <table>
          <slot></slot>
        </table>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blTableTag]: BlTable;
  }
  interface HTMLElementEventMap {
    [blSortChangeEventName]: CustomEvent<string[]>;
    [blRowSelectChangeEventName]: CustomEvent<string[]>;
  }
}
