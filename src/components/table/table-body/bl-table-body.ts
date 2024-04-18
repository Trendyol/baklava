import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { CSSResultGroup } from "lit/development";
import "element-internals-polyfill";
import { blTableTag } from "../bl-table";
import type BlTable from "../bl-table";
import style from "../table-body/bl-table-body.css";

export const blTableBodyTag = "bl-table-body";

/**
 * @tag bl-table-body
 * @summary Baklava Table component
 */
@customElement(blTableBodyTag)
export default class BlTableBody extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }
  connectedCallback(): void {
    super.connectedCallback();
    if (!this.closest<BlTable>(blTableTag)) {
      console.warn("bl-table-body is designed to be used inside a bl-table", this);
    }
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blTableBodyTag]: BlTableBody;
  }
}
