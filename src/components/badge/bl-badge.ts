import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../icon/bl-icon";
import { BaklavaIcon } from "../icon/icon-list";
import style from "./bl-badge.css";

export type BadgeSize = "small" | "medium" | "large";

/**
 * @tag bl-badge
 * @summary Baklava Badge component
 *
 * @cssproperty [--bl-badge-bg-color=--bl-color-background-brand] Sets the background color of badge
 * @cssproperty [--bl-badge-color=--bl-color-text-brand] Sets the color of badge
 */

@customElement("bl-badge")
export default class BlBadge extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the badge size
   */
  @property({ type: String, reflect: true })
  size: BadgeSize = "medium";

  /**
   * Sets the name of the icon
   */
  @property({ type: String })
  icon?: BaklavaIcon;

  render(): TemplateResult {
    const icon = this.icon ? html`<bl-icon name=${this.icon}></bl-icon>` : "";

    return html`<span class="badge">
      <slot name="icon">${icon}</slot>
      <slot></slot>
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-badge": BlBadge;
  }
}
