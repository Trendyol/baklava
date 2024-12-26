import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { event, EventDispatcher } from "../../utilities/event";
import "../button/bl-button";
import "../icon/bl-icon";
import { BaklavaIcon } from "../icon/icon-list";
import style from "./bl-tag.css";

export type TagSize = "small" | "medium" | "large";
type TagVariant = "selectable" | "removeable";

/**
 * @tag bl-tag
 * @summary Baklava Tag component
 */

@customElement("bl-tag")
export default class BlTag extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query(".remove-button") removeButton!: HTMLButtonElement;

  /**
   * Sets the tag size
   */
  @property({ type: String, reflect: true })
  size: TagSize = "medium";

  @property({ type: String, reflect: true })
  variant: TagVariant = "selectable";

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  value: string | null = null;

  @event("bl-tag-click") private _onBlTagClick: EventDispatcher<{
    value: string | null;
    selected: boolean;
  }>;

  private handleClick = () => {
    if (this.variant === "selectable") this.selected = !this.selected;
    this._onBlTagClick({ selected: this.selected, value: this.value });
  };

  /**
   * Sets the name of the icon
   */
  @property({ type: String })
  icon?: BaklavaIcon;

  render(): TemplateResult {
    const icon = this.icon ? html`<bl-icon name=${this.icon}></bl-icon>` : "";

    const removeButton =
      this.variant === "removeable"
        ? html`
            <bl-button
              icon="close"
              variant="tertiary"
              kind="neutral"
              class="remove-button"
              ?disabled=${this.disabled}
              @bl-click=${this.handleClick}
            ></bl-button>
          `
        : "";

    return html`<div
      class="tag"
      @click=${this.variant === "selectable" ? this.handleClick : undefined}
      role=${ifDefined(this.variant === "selectable" ? "checkbox" : undefined)}
    >
      <slot name="icon">${icon}</slot>
      <slot></slot>
      ${removeButton}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-tag": BlTag;
  }
}
