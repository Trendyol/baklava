import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { ReferenceElement } from "@floating-ui/core";
import { setDirectionProperty } from "../../utilities/direction";
import { event, EventDispatcher } from "../../utilities/event";
import "../button/bl-button";
import BlButton, { ButtonKind, ButtonSize, ButtonVariant, TargetType } from "../button/bl-button";
import BlDropdownItem, { blDropdownItemTag } from "../dropdown/item/bl-dropdown-item";
import { BaklavaIcon } from "../icon/icon-list";
import BlPopover from "../popover/bl-popover";
import style from "./bl-split-button.css";

export const blSplitButtonTag = "bl-split-button";

/**
 * @tag bl-split-button
 * @summary Baklava Split Button component
 *
 * @slot - Default slot for bl-dropdown-item elements
 */

@customElement(blSplitButtonTag)
export default class BlSplitButton extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query("#split-button-container") private trigger: ReferenceElement;

  @query("bl-popover")
  private _popover: BlPopover;

  @query("#split-main-button")
  private mainButton: BlButton;

  @query("#dropdown-button")
  private dropdownButton: BlButton;

  @state() private _isPopoverOpen = false;

  /**
   * Sets the split button label
   */
  @property({ type: String, reflect: true })
  label: string;

  /**
   * Sets the split button variant
   */
  @property({ type: String, reflect: true })
  variant: Exclude<ButtonVariant, "tertiary"> = "primary";

  /**
   * Sets the split button kind
   */
  @property({ type: String, reflect: true })
  kind: ButtonKind = "default";

  /**
   * Sets the split button size
   */
  @property({ type: String, reflect: true })
  size: ButtonSize = "medium";

  /**
   * Set link url. If set, split main button will be rendered as anchor tag.
   */
  @property({ type: String, reflect: true })
  href: string;

  /**
   * Sets main button as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets loading state of button
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Sets the button label for loading status.
   */
  @property({ type: String, attribute: "loading-label" })
  loadingLabel: string;

  /**
   * Sets dropdown button as disabled
   */
  @property({ attribute: "dropdown-disabled", type: Boolean })
  dropdownDisabled = false;

  /**
   * Sets the icon name. Shows icon with bl-icon component
   */
  @property({ type: String })
  icon?: BaklavaIcon;

  /**
   * Sets the anchor target. Used when `href` is set.
   */
  @property({ type: String })
  target?: TargetType = "_self";

  /**
   * Sets the type of the button. Set `submit` to use button as the submitter of parent form.
   */
  @property({ type: String })
  type: "submit";

  /**
   * Sets button to get keyboard focus automatically
   */
  @property({ type: Boolean, reflect: true })
  autofocus = false;

  /**
   * Sets the associated form of the button. Use when `type` is set to `submit` and button is not inside the target form.
   */
  @property({ type: String })
  form: HTMLFormElement | string;

  /**
   * Fires when dropdown opened
   */
  @event("bl-dropdown-open") private onOpen: EventDispatcher<string>;

  /**
   * Fires when dropdown closed
   */
  @event("bl-dropdown-close") private onClose: EventDispatcher<string>;

  /**
   * Fires when main button click
   */
  @event("bl-click") private onClick: EventDispatcher<string>;

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("keydown", this.handleKeyDown);

    setDirectionProperty(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("keydown", this.handleKeyDown);
  }

  firstUpdated() {
    // To ensure proper rendering, we set `_popover.target` after the template has been created.
    this._popover.target = this.trigger;
    this.dropdownButton.addEventListener("bl-click", e => e.stopPropagation());
    this.mainButton.addEventListener("bl-click", e => e.stopPropagation());
  }

  get opened() {
    return this._isPopoverOpen;
  }

  private _handleClick() {
    !this._isPopoverOpen && !this.dropdownDisabled ? this.open() : this.close();
  }

  private _handlePrimaryClick() {
    this.onClick("Click event fired!");
  }

  private focusedOptionIndex = -1;

  private handleKeyDown(event: KeyboardEvent) {
    // Next action
    if (this._isPopoverOpen && ["ArrowDown", "ArrowRight"].includes(event.key)) {
      this.focusedOptionIndex++;
      // Previous action
    } else if (this._isPopoverOpen && ["ArrowUp", "ArrowLeft"].includes(event.key)) {
      this.focusedOptionIndex--;
      // Select action
    } else if (this._isPopoverOpen && event.key === "Escape") {
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
    if (!this._isPopoverOpen) {
      return;
    }

    this._isPopoverOpen = false;
    this._popover.visible && this._popover.hide();
    this.onClose("Dropdown closed!");
  }

  render(): TemplateResult {
    return html` <div class="split-button-container" id="split-button-container">
      <bl-button
        id="split-main-button"
        class="split-main-button"
        variant="${this.variant}"
        kind="${this.kind}"
        size="${this.size}"
        loading-label="${ifDefined(this.loadingLabel)}"
        icon="${ifDefined(this.icon)}"
        href="${ifDefined(this.type)}"
        ?disabled="${this.disabled}"
        ?loading="${this.loading}"
        type="${this.type}"
        target="${ifDefined(this.target)}"
        form="${ifDefined(this.form)}"
        ?autofocus="${this.autofocus}"
        @bl-click="${this._handlePrimaryClick}"
      >
        ${this.label}
      </bl-button>
      <div class="split-divider"></div>
      <bl-button
        id="dropdown-button"
        class="dropdown-button"
        .active="${this.opened}"
        icon="${this.opened ? "arrow_up" : "arrow_down"}"
        ?disabled="${this.dropdownDisabled}"
        variant="${this.variant}"
        kind="${this.kind}"
        size="${this.size}"
        ?loading="${this.loading}"
        label="split-dropdown-button"
        @bl-click="${this._handleClick}"
      >
      </bl-button>
      <bl-popover fit-size placement="bottom-start" @bl-popover-hide="${this.close}">
        <div class="popover-content">
          <slot></slot>
        </div>
      </bl-popover>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blSplitButtonTag]: BlSplitButton;
  }
}
