import { LitElement, html, CSSResultGroup, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import style from "./bl-dropdown-group.css";

export const blDropdownGroupTag = "bl-dropdown-group";

/**
 * @tag bl-dropdown-group
 * @summary Baklava Dropdown Group component
 */
@customElement(blDropdownGroupTag)
export default class BlDropdownGroup extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the caption.
   */
  @property({ type: String })
  caption?: string;

  render(): TemplateResult {
    const caption = this.caption
      ? html`<span id="label" class="caption">${this.caption}</span>`
      : "";

    return html`<div class="dropdown-group" role="group" aria-labelledby="label">
      ${caption}
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blDropdownGroupTag]: BlDropdownGroup;
  }
}
