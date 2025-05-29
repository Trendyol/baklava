import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { CSSResultGroup } from "lit/development";
import { msg } from "@lit/localize";
import "../../icon/bl-icon";
import type BlTable from "../bl-table";
import { blTableTag } from "../bl-table";
import style from "../table-body/bl-table-body.css";

export const blTableBodyTag = "bl-table-body";

/**
 * @tag bl-table-body
 * @summary Baklava Table component
 *
 * @slot no-data - Content to display when no data is available
 */
@customElement(blTableBodyTag)
export default class BlTableBody extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  private get _table() {
    return this.closest<BlTable>(blTableTag);
  }

  private get hasTableRows() {
    return this.querySelector("bl-table-row") !== null;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this._table) {
      console.warn("bl-table-body is designed to be used inside a bl-table", this);
    }
  }

  render(): TemplateResult {
    // If there are table rows, show the normal content
    if (this.hasTableRows) {
      return html` <slot></slot> `;
    }

    // If there are no table rows, show the no-data slot or default content
    const noDataTitle = msg("No data available", { desc: "bl-table-body: no data title" });
    const noDataSubtitle = msg("There are currently no records to display.", {
      desc: "bl-table-body: no data subtitle",
    });

    return html`
      <tr class="no-data-row">
        <td class="no-data-cell" colspan="999">
          <slot name="no-data">
            <div class="default-no-data">
              <bl-icon name="info"></bl-icon>
              <p class="title">${noDataTitle}</p>
              <p class="subtitle">${noDataSubtitle}</p>
            </div>
          </slot>
        </td>
      </tr>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blTableBodyTag]: BlTableBody;
  }
}
