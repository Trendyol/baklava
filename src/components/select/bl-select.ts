import { CSSResultGroup, html, LitElement, PropertyValues } from "lit";
import { customElement, property, query, queryAll, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { autoUpdate, computePosition, flip, MiddlewareState, offset, size } from "@floating-ui/dom";
import { FormControlMixin, requiredValidator } from "@open-wc/form-control";
import { FormValue } from "@open-wc/form-helpers";
import "element-internals-polyfill";
import { event, EventDispatcher } from "../../utilities/event";
import BlCheckbox from "../checkbox-group/checkbox/bl-checkbox";
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

  /**
   * Views select all option in multiple select
   */
  @property({ type: Boolean, attribute: "view-select-all" })
  viewSelectAll = false;

  /**
   * Sets select all text in multiple select
   */
  @property({ type: String, attribute: "select-all-text" })
  selectAllText = "Select All";

  /**
   * Enable search functionality for the options within the list
   */
  @property({ type: Boolean, attribute: "search-bar", reflect: true })
  searchBar = false;

  /**
   * Search for text variations such as "search," "searching," "search by country," and so on
   */
  @property({ type: String, attribute: "search-bar-placeholder", reflect: true })
  searchBarPlaceholder?: string;

  /**
   * Display a loading icon in place of the search icon.
   */
  @property({ type: Boolean, attribute: "search-bar-loading-state", reflect: true })
  searchBarLoadingState = false;

  /**
   * Text to display when no search results are found.
   */
  @property({ type: String, attribute: "search-not-found-text", reflect: true })
  searchNotFoundText = "No Data Found";

  /**
   * Text to display on the clear search button.
   */
  @property({ type: String, attribute: "popover-clear-search-text", reflect: true })
  popoverClearSearchText = "Clear Search";

  /* Declare internal reactive properties */
  @state()
  private _isPopoverOpen = false;

  @state()
  private _additionalSelectedOptionCount = 0;

  @state()
  private _searchText = "";

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

  /**
   * Fires when search text changes
   */
  @event("bl-search") private _onBlSearch: EventDispatcher<string>;

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

  get noResultFound() {
    return this._searchText !== "" && this._connectedOptions.every(option => option.hidden);
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

  get isAllSelected() {
    return this._selectedOptions.length === this._connectedOptions.length;
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
    this._handleSearchOptions({ target: { value: "" } } as InputEvent & {
      target: HTMLInputElement;
    });

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

    const isAllSelectedDisabled =
      this._selectedOptions.length > 0 && this._selectedOptions.every(option => option.disabled);
    const isRemoveButtonShown = !isAllSelectedDisabled && (this.clearable || this.multiple);
    const removeButton = isRemoveButtonShown
      ? html`<bl-button
          class="remove-all"
          size="small"
          variant="tertiary"
          kind="neutral"
          icon="close"
          @click=${this._onClickRemove}
        ></bl-button>`
      : "";

    const searchMagIcon = html`<bl-icon
      class="search-mag-icon"
      name="search"
      style="color: var(--bl-color-primary)"
    ></bl-icon>`;

    const searchLoadingIcon = html`<bl-icon
      class="search-loading-icon"
      name="loading"
      style="color: var(--bl-color-primary)"
    ></bl-icon>`;

    const search = html`<fieldset
      class=${classMap({
        "select-input": true,
        "has-overflowed-options": this._additionalSelectedOptionCount > 0,
      })}
      tabindex="${this.disabled ? "-1" : 0}"
      role="button"
      aria-haspopup="listbox"
      aria-expanded="${this.opened}"
      aria-labelledby="label"
      @click=${this.open}
    >
      <legend><span>${this.label}</span></legend>

      ${this._selectedOptions.length > 0 && !this.opened
        ? inputSelectedOptions
        : html`<input
            class="search-bar-input"
            placeholder="${this.searchBarPlaceholder}"
            @input=${this._handleSearchOptions}
            .value=${this._searchText}
          />`}
      ${!this.opened
        ? html`<span class="additional-selection-count"
            >+${this._additionalSelectedOptionCount}</span
          >`
        : ""}

      <div class="actions" @click=${this.togglePopover}>
        ${this.opened ? (this.searchBarLoadingState ? searchLoadingIcon : searchMagIcon) : ""}
        ${removeButton}
        <bl-icon class="dropdown-icon open" name="arrow_up"></bl-icon>

        <bl-icon class="dropdown-icon closed" name="arrow_down"></bl-icon>
      </div>
    </fieldset>`;

    return this.searchBar
      ? search
      : html`<fieldset
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

  selectAllTemplate() {
    if (!this.multiple || !this.viewSelectAll) {
      return null;
    }

    const isAnySelected = this._selectedOptions.length > 0;

    return html`<bl-checkbox
      class="select-all"
      .checked="${this.isAllSelected}"
      .indeterminate="${isAnySelected && !this.isAllSelected}"
      role="option"
      aria-selected="${this.isAllSelected}"
      @bl-checkbox-change="${this._handleSelectAll}"
    >
      ${this.selectAllText}
    </bl-checkbox>`;
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
        ${this.selectAllTemplate()}
        <slot></slot>
        ${this.searchBar && this.noResultFound
          ? html`<div name="popover-clear-search-text" class="popover-no-result">
              <span>${this.searchNotFoundText}</span>
              <bl-button
                variant="tertiary"
                @click=${() => {
                  this._handleSearchOptions({ target: { value: "" } } as InputEvent & {
                    target: HTMLInputElement;
                  });
                }}
                >${this.popoverClearSearchText}</bl-button
              >
            </div>`
          : ""}
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

  private _handleSearchEvent() {
    this._onBlSearch(this._searchText);
  }

  private _handleSearchOptions(e: InputEvent): void {
    if (!this.searchBar) return;

    this._searchText = (e.target as HTMLInputElement).value.toLowerCase();

    this._handleSearchEvent();

    this._connectedOptions.forEach(option => {
      const isVisible = option.textContent?.toLowerCase().includes(this._searchText);

      option.hidden = !isVisible;
    });

    this._selectedOptions = this.options.filter(option => option.selected);

    this._handleLastVisibleSearchedOption();

    this.requestUpdate();
  }

  private _handleLastVisibleSearchedOption() {
    const lastVisibleOption = [...this.options].reverse().find(option => !option.hidden);

    if (lastVisibleOption) {
      lastVisibleOption?.shadowRoot?.querySelector("div")?.classList.add("no-border-bottom");
    }

    this.options.map(option => {
      if (!option.hidden && option !== lastVisibleOption) {
        option.shadowRoot?.querySelector("div")?.classList.remove("no-border-bottom");
      }
    });
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

  private _handleSelectAll(e: CustomEvent) {
    const selectAllEl = this.shadowRoot?.querySelector(".select-all") as BlCheckbox;

    const checked = e.detail;
    const unselectedOptions = this._connectedOptions.filter(option => !option.selected);
    const isAllUnselectedDisabled = unselectedOptions.every(option => option.disabled);

    // If all available options are selected, instead of checking, uncheck all options
    if (checked && isAllUnselectedDisabled) {
      setTimeout(() => {
        const checkbox = selectAllEl?.shadowRoot?.querySelector("input");

        checkbox?.click();
      }, 0);
      return;
    }

    this._connectedOptions.forEach(option => {
      if (option.disabled) {
        return;
      }

      option.selected = checked;
    });

    this._handleMultipleSelect();

    // Make sure the checkbox state is in sync with selected options
    setTimeout(() => {
      selectAllEl.checked = this.isAllSelected;
      selectAllEl.indeterminate = this._selectedOptions.length > 0 && !this.isAllSelected;
    });
  }

  private _onClickRemove(e: MouseEvent) {
    e.stopPropagation();

    const selectedDisabledOptions = this._selectedOptions.filter(option => option.disabled);

    this._connectedOptions
      .filter(option => !option.disabled && option.selected)
      .forEach(option => {
        option.selected = false;
      });

    this.value = selectedDisabledOptions.length
      ? selectedDisabledOptions.map(option => option.value)
      : null;
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
