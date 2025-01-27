import { CSSResultGroup, html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { FormValue } from "@open-wc/form-helpers";
import { event, EventDispatcher } from "../../../utilities/event";
import { BaklavaIcon } from "../../icon/icon-list";
import BlSelect from "../bl-select";
import style from "./bl-select-option.css";

@customElement("bl-select-option")
export default class BlSelectOption<ValueType extends FormValue = string> extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  private _value: ValueType;

  /* Declare reactive properties */
  /**
   * Sets the value for the option
   */
  @property({})
  get value(): ValueType {
    return this._value || (this.textContent as ValueType);
  }

  set value(val: ValueType) {
    this._value = val;
  }

  /**
   * Sets the label for bl-select, and bl-select renders this value instead of the option's textContent
   */
  @property({ type: String, reflect: true, attribute: "label" })
  label = "";

  /**
   * Sets option as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets option as selected state
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * Sets the name of the icon
   */
  @property({ type: String })
  icon?: BaklavaIcon;

  @state()
  multiple = false;

  /**
   * Fires when clicked on the option
   */
  @event("bl-select-option") private _onSelect: EventDispatcher<ValueType | string | null>;

  /**
   * Fires when checkbox is focused
   */
  @event("bl-focus") private onFocus: EventDispatcher<ValueType | string | null>;

  /**
   * Fires when checkbox is blurred
   */
  @event("bl-blur") private onBlur: EventDispatcher<ValueType | string | null>;

  @query(".focus-target") private focusTarget: HTMLElement;

  /**
   * Focuses this option
   */
  focus() {
    if (!this.multiple) {
      this.focusTarget.tabIndex = 0;
    }
    this.focusTarget.focus();
    this.onFocus(this.value);
  }

  /**
   * Blurs from this option
   */
  blur() {
    this.onBlur(this.value);
    this.focusTarget.tabIndex = -1;
  }

  private blSelect: BlSelect<ValueType> | null;

  private singleOptionTemplate() {
    const icon = this.icon ? html`<bl-icon name=${this.icon}></bl-icon>` : "";

    return html`<div
      class="single-option focus-target"
      @blur=${this.blur}
      @keydown=${this.handleKeydown}
      @click="${this._onClickOption}"
      role="option"
      aria-selected="${this.selected}"
    >
      <slot name="icon">${icon}</slot>
      <slot></slot>
    </div>`;
  }

  private checkboxOptionTemplate() {
    return html`<bl-checkbox
      class="checkbox-option focus-target"
      .checked="${this.selected}"
      .disabled="${this.disabled}"
      @bl-checkbox-change="${this._onCheckboxChange}"
      role="option"
      aria-selected="${this.selected}"
    >
      <slot></slot>
    </bl-checkbox>`;
  }

  render() {
    return html`<div class="option-container">
      ${this.multiple ? this.checkboxOptionTemplate() : this.singleOptionTemplate()}
    </div>`;
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.code === "Enter" || event.code === "Space") {
      this._onClickOption();
      event.preventDefault();
    }
  }

  private _handleEvent() {
    this._onSelect(this.value);
  }

  private _onClickOption() {
    this.selected = !this.selected;
    this._handleEvent();
  }

  private _onCheckboxChange(event: CustomEvent) {
    this.selected = event.detail;
    this._handleEvent();
  }

  connectedCallback() {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this.blSelect = this.closest<BlSelect<ValueType>>("bl-select");
      // FIXME: We should warn when parent is not bl-select

      this.multiple = this.blSelect?.multiple || false;
      this.blSelect?.registerOption(this);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.blSelect?.unregisterOption(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-select-option": BlSelectOption;
  }
}
