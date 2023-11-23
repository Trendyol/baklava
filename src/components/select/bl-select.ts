import { CSSResultGroup, html, LitElement, PropertyValues } from "lit";
import { customElement, property, query, queryAll, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { autoUpdate, computePosition, flip, MiddlewareState, offset, size } from "@floating-ui/dom";
import { FormControlMixin, requiredValidator } from "@open-wc/form-control";
import { FormValue } from "@open-wc/form-helpers";
import "element-internals-polyfill";
import { event, EventDispatcher } from "../../utilities/event";
import "../icon/bl-icon";
import style from "../select/bl-select.css";
import "../select/option/bl-select-option";
import type BlSelectOption from "./option/bl-select-option";

export interface ISelectOption<T = string> {
  value: T;
  text: string;
  selected: boolean;
}

export type SelectSize = "medium" | "large" | "small";

export type CleanUpFunction = () => void;

/**
 * @tag bl-select
 * @summary Baklava Select component
 *
 * @cssproperty [--bl-popover-position=fixed] Sets the positioning strategy of select popover. You can set it as `absolute` if you need to show popover relative to its trigger element.
 */
@customElement("bl-select")
export default class BlSelect<ValueType extends FormValue = string> extends FormControlMixin(
  LitElement
) {
  static get styles(): CSSResultGroup {
    return [style];
  }
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static formControlValidators = [requiredValidator];

  /**
   * Sets name of the select field
   */
  @property()
  name: string;

  private _value: ValueType | ValueType[] | null;

  private _initialValue: ValueType | ValueType[] | null;

  /**
   * Sets the value of the select
   */
  @property()
  get value(): ValueType | ValueType[] | null {
    return this._value;
  }

  set value(val: ValueType | ValueType[] | null) {
    this._value = val;

    if (Array.isArray(val)) {
      const formData = new FormData();

      val.forEach(option => formData.append(this.name, `${option}`));
      this.setValue(formData);
    } else {
      this.setValue(val);
    }

    this.setOptionsSelected();
  }

  shouldFormValueUpdate(): boolean {
    return this.value !== null && this.value !== "";
  }

  /* Declare reactive properties */
  /**
   * Sets the label value
   */
  @property({ reflect: true })
  label?: string;

  /**
   * Sets the placeholder value. If left blank, the label value (if specified) is set as placeholder.
   */
  @property({ reflect: true })
  placeholder?: string;

  /**
   * Sets the size value. Select component's height value will be changed accordingly
   */
  @property({ type: String, reflect: true })
  size: SelectSize = "medium";

  /**
   * When option is not selected, shows component in error state
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Shows the component in disabled state.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets whether the selected option is clearable
   */
  @property({ type: Boolean, reflect: true })
  clearable = false;

  /**
   * Allows multiple options to be selected
   */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * Sets input to get keyboard focus automatically
   */
  @property({ type: Boolean, reflect: true })
  autofocus = false;

  /**
   * Makes label as fixed positioned
   */
  @property({ type: Boolean, attribute: "label-fixed", reflect: true })
  labelFixed = false;

  /**
   * Adds help text
   */
  @property({ type: String, attribute: "help-text", reflect: true })
  helpText?: string;

  /**
   * Set custom error message
   */
  @property({ type: String, attribute: "invalid-text", reflect: true })
  customInvalidText?: string;

  /* Declare internal reactive properties */
  @state()
  private _isPopoverOpen = false;

  @state()
  private _additionalSelectedOptionCount = 0;

  @query(".selected-options")
  private selectedOptionsContainer!: HTMLElement;

  @queryAll(".selected-options li")
  private selectedOptionsItems!: NodeListOf<HTMLElement>;

  @query(".popover")
  private _popover: HTMLElement;

  @query(".select-input")
  private _selectInput: HTMLElement;

  /**
   * Fires when selection changes
   */
  @event("bl-select") private _onBlSelect: EventDispatcher<ISelectOption<ValueType>[]>;

  private _connectedOptions: BlSelectOption<ValueType>[] = [];

  private _cleanUpPopover: CleanUpFunction | null = null;

  private setOptionsSelected() {
    this._connectedOptions.forEach(
      option =>
        (option.selected =
          this.value === option.value ||
          (Array.isArray(this.value) && this.value.includes(option.value)))
    );

    this._selectedOptions = [...this.options.filter(option => option.selected)];
  }

  get options() {
    return this._connectedOptions;
  }

  get opened() {
    return this._isPopoverOpen;
  }

  @state()
  private _selectedOptions: BlSelectOption<ValueType>[] = [];

  @state()
  private dirty = false;

  get selectedOptions(): BlSelectOption<ValueType>[] {
    return this._selectedOptions;
  }

  get additionalSelectedOptionCount() {
    return this._additionalSelectedOptionCount;
  }

  validityCallback(): string | void {
    if (this.customInvalidText) {
      return this.customInvalidText;
    }
    const select = document.createElement("select");

    select.required = this.required;

    return select.validationMessage;
  }

  reportValidity() {
    this.dirty = true;
    return this.checkValidity();
  }

  resetFormControl(): void {
    this.value = this._initialValue;
  }

  @query(".select-input")
  validationTarget: HTMLElement;

  open() {
    this._isPopoverOpen = true;
    this._setupPopover();
    document.addEventListener("click", this._interactOutsideHandler, true);
    document.addEventListener("focus", this._interactOutsideHandler, true);
  }

  close() {
    this._isPopoverOpen = false;
    this.focusedOptionIndex = -1;
    this._cleanUpPopover && this._cleanUpPopover();
    document.removeEventListener("click", this._interactOutsideHandler, true);
    document.removeEventListener("focus", this._interactOutsideHandler, true);
  }

  private _interactOutsideHandler = (event: MouseEvent | FocusEvent) => {
    const eventPath = event.composedPath() as HTMLElement[];

    if (!eventPath?.find(el => el.tagName === "BL-SELECT")?.contains(this)) {
      this.close();
    }
  };

  private _setupPopover() {
    this._cleanUpPopover = autoUpdate(this._selectInput, this._popover, () => {
      computePosition(this._selectInput, this._popover, {
        placement: "bottom",
        strategy: "fixed",
        middleware: [
          flip(),
          offset(8),
          size({
            apply(args: MiddlewareState) {
              Object.assign(args.elements.floating.style, {
                width: `${args.elements.reference.getBoundingClientRect().width}px`,
              });
            },
          }),
        ],
      }).then(({ x, y }) => {
        this._popover.style.setProperty("--left", `${x}px`);
        this._popover.style.setProperty("--top", `${y}px`);
      });
    });
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.form?.addEventListener("submit", (e: SubmitEvent) => {
      if (!this.reportValidity()) {
        e.preventDefault();
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._cleanUpPopover && this._cleanUpPopover();
  }

  private inputTemplate() {
    const inputSelectedOptions = html`<ul class="selected-options">
      ${this._selectedOptions.map(item => html`<li>${item.textContent}</li>`)}
    </ul>`;
    const removeButton =
      this.clearable || this.multiple
        ? html`<bl-button
            class="remove-all"
            size="small"
            variant="tertiary"
            kind="neutral"
            icon="close"
            @click=${this._onClickRemove}
          ></bl-button>`
        : "";

    return html`<fieldset
      class=${classMap({
        "select-input": true,
        "has-overflowed-options": this._additionalSelectedOptionCount > 0,
      })}
      tabindex="${this.disabled ? "-1" : 0}"
      ?autofocus=${this.autofocus}
      @click=${this.togglePopover}
      role="button"
      aria-haspopup="listbox"
      aria-expanded="${this.opened}"
      aria-labelledby="label"
    >
      <legend><span>${this.label}</span></legend>
      <span class="placeholder">${this.placeholder}</span>
      <span class="label">${this.label}</span>
      ${inputSelectedOptions}
      <span class="additional-selection-count">+${this._additionalSelectedOptionCount}</span>
      <div class="actions">
        ${removeButton}
        <bl-icon class="dropdown-icon open" name="arrow_up"></bl-icon>

        <bl-icon class="dropdown-icon closed" name="arrow_down"></bl-icon>
      </div>
    </fieldset>`;
  }

  render() {
    const invalidMessage = !this.checkValidity()
      ? html`<p id="errorMessage" aria-live="polite" class="invalid-text">
          ${this.validationMessage}
        </p>`
      : "";

    const helpMessage = this.helpText ? html`<p class="help-text">${this.helpText}</p>` : "";

    const label = this.label ? html`<label id="label">${this.label}</label>` : "";

    return html`<div
      class=${classMap({
        "select-wrapper": true,
        "select-open": this.opened,
        "selected": this._selectedOptions.length > 0,
        "invalid": !this.validity.valid,
        "dirty": this.dirty,
      })}
      @keydown=${this.handleKeydown}
    >
      ${label} ${this.inputTemplate()}
      <div
        class="popover"
        tabindex="${ifDefined(this._isPopoverOpen ? undefined : "-1")}"
        @bl-select-option=${this._handleSelectOptionEvent}
        role="listbox"
        aria-multiselectable="${this.multiple}"
        aria-labelledby="label"
      >
        <slot></slot>
      </div>
      <div class="hint">${invalidMessage} ${helpMessage}</div>
    </div> `;
  }

  private focusedOptionIndex = -1;

  private handleKeydown(event: KeyboardEvent) {
    if (this.focusedOptionIndex === -1 && ["Enter", "Space"].includes(event.code)) {
      this.togglePopover();
      event.preventDefault();
    } else if (this._isPopoverOpen === false && ["ArrowDown", "ArrowUp"].includes(event.code)) {
      this.open();
      event.preventDefault();
    } else if (event.code === "Escape") {
      this.close();
      event.preventDefault();
    } else if (this._isPopoverOpen && ["ArrowDown", "ArrowUp"].includes(event.code)) {
      event.code === "ArrowDown" && this.focusedOptionIndex++;
      event.code === "ArrowUp" && this.focusedOptionIndex--;

      // Don't exceed array indexes
      this.focusedOptionIndex = Math.max(
        0,
        Math.min(this.focusedOptionIndex, this.options.length - 1)
      );

      this.options[this.focusedOptionIndex].focus();

      event.preventDefault();
    }
  }

  private togglePopover() {
    this._isPopoverOpen ? this.close() : this.open();
  }

  private _handleSelectEvent() {
    this._onBlSelect(
      this._selectedOptions.map(
        option =>
          ({
            value: option.value,
            selected: option.selected,
            text: option.textContent,
          } as ISelectOption<ValueType>)
      )
    );
  }

  private _handleSingleSelect(optionItem: BlSelectOption<ValueType>) {
    this.value = optionItem.value;

    this._handleSelectEvent();
    this._isPopoverOpen = false;
  }

  private _handleMultipleSelect() {
    this.value = this._connectedOptions
      .filter(option => option.selected)
      .map(option => option.value);

    this._handleSelectEvent();
  }

  private _handleSelectOptionEvent(e: CustomEvent) {
    const optionItem = e.target as BlSelectOption<ValueType>;

    this.dirty = true;

    if (this.multiple) {
      this._handleMultipleSelect();
    } else {
      this._handleSingleSelect(optionItem);
    }
  }

  private _onClickRemove(e: MouseEvent) {
    e.stopPropagation();

    this._connectedOptions
      .filter(option => option.selected)
      .forEach(option => {
        option.selected = false;
      });

    this.value = null;
    this._additionalSelectedOptionCount = 0;
    this._handleSelectEvent();
  }

  private _checkAdditionalItemCount() {
    if (!this.multiple || !this.selectedOptionsItems || this.selectedOptionsItems.length < 2) {
      this._additionalSelectedOptionCount = 0;
      return;
    }

    const firstNonVisibleItemIndex = [...this.selectedOptionsItems].findIndex(
      item => item.offsetLeft > this.selectedOptionsContainer.offsetWidth
    );

    if (firstNonVisibleItemIndex > -1) {
      this._additionalSelectedOptionCount =
        this.selectedOptionsItems.length - firstNonVisibleItemIndex;
    } else {
      this._additionalSelectedOptionCount = 0;
    }
  }

  protected firstUpdated(): void {
    if (this.value === undefined) {
      this.value = "" as ValueType;
    }

    this._initialValue = this._value;
  }

  protected updated(_changedProperties: PropertyValues) {
    if (
      _changedProperties.has("multiple") &&
      typeof _changedProperties.get("multiple") === "boolean"
    ) {
      this.value = null;
    }

    if (_changedProperties.has("_selectedOptions")) {
      this._checkAdditionalItemCount();
    }
  }

  /**
   * This method is used by `bl-select-option` component to register itself to bl-select.
   * @param option BlSelectOption reference to be registered
   */
  registerOption(option: BlSelectOption<ValueType>) {
    this._connectedOptions.push(option);

    if (option.selected) {
      if (this.multiple) {
        if (!Array.isArray(this.value)) {
          this.value = [];
        }
        this.value = [...this.value, option.value];
      } else {
        this.value = option.value;
      }
    }

    this.setOptionsSelected();
    this.requestUpdate();
  }

  /**
   * This method is used by `bl-select-option` component to unregister itself from bl-select.
   * @param option BlSelectOption reference to be unregistered
   */
  unregisterOption(option: BlSelectOption<ValueType>) {
    this._connectedOptions.splice(this._connectedOptions.indexOf(option), 1);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-select": BlSelect;
  }
}
