import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { event, EventDispatcher } from "../../utilities/event";
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

  @state() private _actionElement: HTMLElement | null = null;
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

  @event("bl-tag-click") _onBlTagClick: EventDispatcher<{
    value: string | null;
    selected: boolean;
  }>;

  connectedCallback(): void {
    super.connectedCallback();

    this._actionElement?.addEventListener("click", this.handleClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this._actionElement?.removeEventListener("click", this.handleClick);
  }

  private handleClick() {
    console.log(this._actionElement);

    if (this.variant === "selectable") this.selected = !this.selected;
    this._onBlTagClick({ selected: this.selected, value: this.value });
  }

  /**
   * Sets the name of the icon
   */
  @property({ type: String })
  icon?: BaklavaIcon;

  render(): TemplateResult {
    const icon = this.icon
      ? html`
          <slot name="icon">
            <bl-icon name=${this.icon}></bl-icon>
          </slot>
        `
      : "";

    const removeButton =
      this.variant === "removeable"
        ? html`
            <div role="button" type="button" class="remove-button">
              <bl-icon name="close"></bl-icon>
            </div>
          `
        : "";

    return html`<button type="button" class="tag">
      ${icon}
      <slot></slot>
      ${removeButton}
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-tag": BlTag;
  }
}
