import { CSSResultGroup, html, LitElement, nothing, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { event, EventDispatcher } from "../../utilities/event";
import "../button/bl-button";
import "../icon/bl-icon";
import { BaklavaIcon } from "../icon/icon-list";
import style from "./bl-tag.css";

export type TagSize = "small" | "medium" | "large";
type TagVariant = "selectable" | "removable";

/**
 * @tag bl-tag
 * @summary Baklava Tag component
 */
@customElement("bl-tag")
export default class BlTag extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the tag size
   */
  @property({ type: String, reflect: true })
  size: TagSize = "medium";

  /**
   * Sets the tag variant
   */
  @property({ type: String, reflect: true })
  variant: TagVariant = "selectable";

  /**
   * Sets the name of the icon
   */
  @property({ type: String })
  icon?: BaklavaIcon;

  /**
   * Sets the selected state of the tag
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   *  Disables the tag
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets the value of the tag
   */
  @property({ type: String, reflect: true })
  value: string | null = null;

  /**
   * Dispatches when the tag is clicked
   */
  @event("bl-tag-click") private _onBlTagClick: EventDispatcher<{
    value: string | null;
    selected: boolean;
  }>;

  private _handleClick = () => {
    if (this.variant === "selectable") this.selected = !this.selected;
    this._onBlTagClick({ selected: this.selected, value: this.value });
  };

  private _removeButtonTemplate() {
    const removeIconSize = this.size === "large" ? "medium" : "small";

    if (this.variant !== "removable") return nothing;

    return html`
      <bl-button
        icon="close"
        size=${removeIconSize}
        label="Remove"
        variant="tertiary"
        kind="neutral"
        class="remove-button"
        ?disabled=${this.disabled}
        @bl-click=${this._handleClick}
      ></bl-button>
    `;
  }

  private _iconTemplate() {
    if (!this.icon) return nothing;
    return html`<bl-icon name=${this.icon}></bl-icon>`;
  }

  render(): TemplateResult {
    const selectableVariant = html`<button
      class="tag"
      role="checkbox"
      @click=${this._handleClick}
      ?disabled=${this.disabled}
    >
      ${this._iconTemplate()}
      <slot></slot>
      ${this._removeButtonTemplate()}
    </button>`;

    const removableVariant = html`<div class="tag">
      ${this._iconTemplate()}
      <slot></slot>
      ${this._removeButtonTemplate()}
    </div>`;

    if (this.variant === "selectable") return selectableVariant;
    return removableVariant;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-tag": BlTag;
  }
}
