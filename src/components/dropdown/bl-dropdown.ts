import { LitElement, html, CSSResultGroup, TemplateResult } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { event, EventDispatcher } from "../../utilities/event";
import "../button/bl-button";
import BlButton, { ButtonSize, ButtonVariant, ButtonKind } from "../button/bl-button";
import BlPopover from "../popover/bl-popover";
import style from "./bl-dropdown.css";
import BlDropdownItem, { blDropdownItemTag } from "./item/bl-dropdown-item";

export const blDropdownTag = "bl-dropdown";

/**
 * @tag bl-dropdown
 * @summary Baklava Dropdown component
 */
@customElement(blDropdownTag)
export default class BlDropdown extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query("bl-popover")
  private _popover: BlPopover;

  @query("bl-button")
  private _button: BlButton;

  @state() private _isPopoverOpen = false;

  /**
   * Sets the dropdown button label
   */
  @property({ type: String, reflect: true })
  label: string;

  /**
   * Sets the dropdown button variant
   */
  @property({ type: String, reflect: true })
  variant: ButtonVariant = "primary";

  /**
   * Sets the dropdown button kind
   */
  @property({ type: String, reflect: true })
  kind: ButtonKind = "default";

  /**
   * Sets the dropdown button size
   */
  @property({ type: String, reflect: true })
  size: ButtonSize = "medium";

  /**
   * Sets button as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Fires when dropdown opened
   */
  @event("bl-dropdown-open") private onOpen: EventDispatcher<string>;

  /**
   * Fires when dropdown closed
   */
  @event("bl-dropdown-close") private onClose: EventDispatcher<string>;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("keydown", this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this.handleKeyDown);
  }

  firstUpdated() {
    // `_button` will be undefined during the initial render.
    // To ensure proper rendering, we set `_popover.target` after the template has been created.
    this._popover.target = this._button;
  }

  get opened() {
    return this._isPopoverOpen;
  }

  private _handleClick() {
    !this._isPopoverOpen && !this.disabled ? this.open() : this.close();
  }

  private focusedOptionIndex = -1;

  private handleKeyDown(event: KeyboardEvent) {
    // Next action
    if (["ArrowDown", "ArrowRight"].includes(event.key)) {
      this.focusedOptionIndex++;

      // Previous action
    } else if (["ArrowUp", "ArrowLeft"].includes(event.key)) {
      this.focusedOptionIndex--;
      // Select action
    } else if (event.key === "Escape") {
      this.focusedOptionIndex = -1;
      this.close();
      return;
    } else {
      // Other keys are not our interest here
      return;
    }

    // Don't exceed array indexes
    this.focusedOptionIndex = Math.max(
      0,
      Math.min(this.focusedOptionIndex, this.options.length - 1)
    );

    this.options[this.focusedOptionIndex].focus();

    event.preventDefault();
  }

  get options(): BlDropdownItem[] {
    return [...this.querySelectorAll(blDropdownItemTag)];
  }

  open() {
    this._isPopoverOpen = true;
    this._popover.show();
    this.onOpen("Dropdown opened!");
  }

  close() {
    this._isPopoverOpen = false;
    this._popover.visible && this._popover.hide();
    this.onClose("Dropdown closed!");
  }

  render(): TemplateResult {
    return html`<bl-button
        dropdown
        .active=${this.opened}
        ?disabled=${this.disabled}
        variant="${this.variant}"
        kind="${this.kind}"
        size="${this.size}"
        @bl-click="${this._handleClick}"
      >
        ${this.label}
      </bl-button>
      <bl-popover fit-size placement="bottom-start" @bl-popover-hide="${this.close}"
        ><div class="popover-content">
          <slot></slot></div
      ></bl-popover> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blDropdownTag]: BlDropdown;
  }
}
