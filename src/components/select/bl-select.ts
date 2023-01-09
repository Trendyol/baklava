import { LitElement, html, CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property, state, query, queryAll } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { computePosition, flip, MiddlewareArguments, offset, size, autoUpdate } from '@floating-ui/dom';
import style from '../select/bl-select.css';
import '../icon/bl-icon';
import '../select/option/bl-select-option';
import type BlSelectOption from './option/bl-select-option';
import { event, EventDispatcher } from '../../utilities/event';

export interface ISelectOption {
  value: string;
  text: string;
  selected: boolean;
}

export type SelectSize = 'medium' | 'large' | 'small';

export type CleanUpFunction = () => void;

@customElement('bl-select')
export default class BlSelect extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /* Declare reactive properties */
  /**
   * Sets the label value
   */
  @property({})
  label?: string;

  /**
   * Sets the placeholder value. If left blank, the label value (if specified) is set as placeholder.
   */
  @property({})
  placeholder?: string;

  /**
   * Sets the size value. Select component's height value will be changed accordingly
   */
  @property({ type: String, reflect: true })
  size: SelectSize = 'medium';

  /**
   * When option is not selected, shows component in error state
   */
  @property({ type: Boolean })
  required = false;

  /**
   * Shows the component in disabled state.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Allows multiple options to be selected
   */
  @property({ type: Boolean })
  multiple = false;

  /**
   * Makes label as fixed positioned
   */
  @property({ type: Boolean, attribute: 'label-fixed' })
  labelFixed = false;

  /**
   * Adds help text
   */
  @property({ type: String, attribute: 'help-text' })
  helpText?: string;

  /**
   * Set custom error message
   */
  @property({ type: String, attribute: 'invalid-text' })
  customInvalidText?: string;

  /**
   * Show search text for options
   */
  @property({ type: Boolean, attribute: 'search-bar' })
  searchBar?: boolean;

  /**
   * SearchText placeholder
   */
  @property({ type: String, attribute: 'search-bar-placeholder' })
  searchBarPlaceholder?: string;

  /**
   * SearchText not found text
   */
  @property({ type: String, attribute: 'search-not-found-text' })
  searchNotFoundText?: string;

  /**
   * Search bar loading state for fetch request
   */
  @property({ type: Boolean, attribute: 'search-bar-loading-state' })
  searchBarLoadingState?: boolean;

  /**
   * Filterable is enabled/disabled search options on local
   */
  @property({ type: Boolean, attribute: 'search-filterable' })
  searchFilterable = true;

  /**
   * Item Option language for search
   */
  @property({ type: String, attribute: 'language' })
  language = "en-US";

  /* Declare internal reactive properties */
  @state()
  private _isPopoverOpen = false;

  @state()
  private _selectedOptions: ISelectOption[] = [];

  @state()
  private _additionalSelectedOptionCount = 0;

  @state()
  private _isInvalid = false;

  @state()
  private _searchValue = "";

  @state()
  private _hiddenNode = 0;

  @query('.selected-options')
  private _selectedOptionsContainer!: HTMLElement;

  @query('.search-input')
  private _searchBarInput!: HTMLElement;

  @queryAll('.selected-options li')
  private _selectedOptionsItems!: Array<HTMLElement>;

  @query('.popover')
  private _popover: HTMLElement;

  @query('.select-input')
  private _selectInput: HTMLElement;

  @event('bl-select') private _onBlSelect: EventDispatcher<ISelectOption[]>;

  private _connectedOptions: BlSelectOption[] = [];

  private _cleanUpPopover: CleanUpFunction | null = null;

  @event('bl-search') private _onBlSearch: EventDispatcher<CustomEvent>;

  get options() {
    return this._connectedOptions;
  }

  get opened() {
    return this._isPopoverOpen;
  }

  get selectedOptions() {
    return this._selectedOptions;
  }

  get additionalSelectedOptionCount() {
    return this._additionalSelectedOptionCount;
  }

  get isInvalid() {
    return this._isInvalid;
  }

  open() {
    this._isPopoverOpen = true;
    this._setupPopover();
    document.addEventListener('click', this._clickOutsideHandler);

    if (this.searchBar && this._searchBarInput) {
      setTimeout(() => {
        this._searchBarInput.shadowRoot?.querySelector("input")?.focus()
      }, 0)
    }
  }

  close() {
    this._isPopoverOpen = false;
    this._cleanUpPopover && this._cleanUpPopover();
    document.removeEventListener('click', this._clickOutsideHandler);
  }

  private _clickOutsideHandler = (event: MouseEvent) => {
    const eventPath = event.composedPath() as HTMLElement[];

    if (!eventPath?.find(el => el.tagName === 'BL-SELECT')?.contains(this)) {
      this.close();
      this._checkRequired();
    }
  };

  private _setupPopover() {
    this._cleanUpPopover = autoUpdate(this._selectInput, this._popover, () => {
      computePosition(this._selectInput, this._popover, {
        placement: 'bottom',
        strategy: 'fixed',
        middleware: [
          flip(),
          offset(8),
          size({
            apply(args: MiddlewareArguments) {
              Object.assign(args.elements.floating.style, {
                width: `${args.elements.reference.getBoundingClientRect().width}px`,
              });
            },
          }),
        ],
      }).then(({ x, y }) => {
        this._popover.style.setProperty('--left', `${x}px`);
        this._popover.style.setProperty('--top', `${y}px`);
      });
    });
  }

  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback();

    this._cleanUpPopover && this._cleanUpPopover();
  }

  private inputTemplate() {
    const inputSelectedOptions = html`<ul class="selected-options">
      ${this._selectedOptions.map(item => html`<li>${item.text}</li>`)}
    </ul>`;
    const _selectedItemCount = this._additionalSelectedOptionCount
      ? html`<span>+${this._additionalSelectedOptionCount}</span>`
      : null;
    const removeButton = html`<bl-button
        class="remove-all"
        size="small"
        variant="tertiary"
        kind="neutral"
        icon="close"
        @click=${this._onClickRemove}></bl-button>`;
    const placeholder = this._showPlaceHolder
      ? html`<span class="placeholder">${this.placeholder}</span>`
      : '';

    return html`<div
      class="select-input"
      ?disabled=${this.disabled}
      @click=${this._onClickSelectInput}
    >
      ${placeholder} ${inputSelectedOptions} ${_selectedItemCount}
      <div class="actions">
        ${this.multiple ? removeButton : null}
        <bl-icon
          class="dropdown-icon open"
          name="arrow_up"
        ></bl-icon>

        <bl-icon
          class="dropdown-icon closed"
          name="arrow_down"
        ></bl-icon>
      </div>
    </div>`;
  }

  private searchInputIconTemplate () {
    if (this.searchBarLoadingState) {
      return html`<bl-icon name="loading" class="loading"></bl-icon>`
    }
    if (this._searchValue.length) {
      return html`<bl-button
        class="search-input-clear"
        size="small"
        variant="tertiary"
        kind="neutral"
        icon="close"
        @click=${this._onClearSearchInputValue}></bl-button>`
    }
    return html`<bl-icon name="search" class=""></bl-icon>`
  }

  private searchBarTemplate() {
    return this.searchBar ? html`<div class="search-container">
      <div class="search-wrapper">
        <bl-input
          class="search-input"
          .value="${this._searchValue}"
          @bl-input="${this._inputHandler}"
          placeholder="${this.searchBarPlaceholder ?? ""}"
        ></bl-input>
        <div class="search-icon">
          ${this.searchInputIconTemplate()}
        </div>
      </div>
    </div>`: null;
  }

  private searchNotFoundTemplate() {
    return this._connectedOptions.length === this._hiddenNode ? html`
      <div class="not-found">
        <slot name="search-not-found">
          ${this.searchNotFoundText?.length ? this.searchNotFoundText : "Not Found"}
        </slot>
      </div>` : null
  }

  private menuTemplate() {
    return html`<div class="popover" @bl-select-option=${this._handleSelectOptionEvent}>
      ${this.searchBarTemplate()}
      <div class="options-container">
        <slot></slot>
        ${this.searchNotFoundTemplate()}
      </div>
    </div>`;
  }

  render() {
    const invalidMessage = this._isInvalid && this.customInvalidText
      ? html`<p class="invalid-text">${this.customInvalidText}</p>` : ``;
    const helpMessage = this.helpText && !invalidMessage
      ? html`<p class="help-text">${this.helpText}</p>` : ``;
    const label = this.label
      ? html`<label>${this.label}</label>` : '';

    return html`<div
      class=${classMap({
      'select-wrapper': true,
      'select-open': this.opened,
      'selected': this._selectedOptions.length > 0,
      'invalid': this._isInvalid,
    })}
      tabindex="-1"
    >
      ${label} ${this.inputTemplate()} ${this.menuTemplate()} ${helpMessage} ${invalidMessage}
    </div> `;
  }

  private get _showPlaceHolder() {
    if (this.label && !this.labelFixed) {
      return !this._selectedOptions.length && this._isPopoverOpen;
    }
    return !this._selectedOptions.length;
  }

  private _onClickSelectInput() {
    this._isPopoverOpen ? this.close() : this.open();
  }

  private _handleSelectEvent() {
    this._onBlSelect(this._selectedOptions);
  }

  private _handleSingleSelect(optionItem: ISelectOption) {
    const oldItem = this._connectedOptions.find(option => option.value !== optionItem.value && option.selected);

    if (oldItem) {
      oldItem.selected = false;
    }

    this._selectedOptions = [optionItem];
    this._handleSelectEvent();
    this._isPopoverOpen = false;
  }

  private _handleMultipleSelect(optionItem: ISelectOption) {
    const { value } = optionItem;

    if (!optionItem.selected) {
      this._selectedOptions = this._selectedOptions.filter(item => item.value !== value);
    } else {
      this._selectedOptions = [...this._selectedOptions, optionItem];
    }

    this._handleSelectEvent();
  }

  private _handleSelectOptionEvent(e: CustomEvent) {
    const optionItem = e.detail as ISelectOption;

    if (this.multiple) {
      this._handleMultipleSelect(optionItem);
    } else {
      this._handleSingleSelect(optionItem);
    }
  }

  private _onClearSearchInputValue () {
    this._inputHandler(new CustomEvent('bl-input', { detail: "" }))
  }

  private _inputHandler(value: CustomEvent) {
    this._searchValue = value.detail
    this._onBlSearch(value)

    if (this.searchFilterable) {
      this._hiddenNode = 0
      this._connectedOptions = this.options.map(node => {
        if(node.innerText.toLocaleLowerCase(this.language).search(value.detail.toLocaleLowerCase(this.language)) > -1) {
          node.style.display = "block";
        } else {
          node.style.display = "none";
          this._hiddenNode++;
        }
        return node;
      })
    }
  }

  private _onClickRemove(e: MouseEvent) {
    e.stopPropagation();

    this._connectedOptions
      .filter(option => option.selected)
      .forEach(option => {
        option.selected = false;
      });

    this._selectedOptions = [];
    this._handleSelectEvent();
  }

  private _checkAdditionalItemCount() {
    if (!this.multiple) return;

    let visibleItems = 0;
    for(const value of this._selectedOptionsItems) {
      if (value.offsetLeft < this._selectedOptionsContainer.offsetWidth) {
        visibleItems++;
      } else {
        break;
      }
    }

    this._additionalSelectedOptionCount = this._selectedOptionsItems.length - visibleItems;
  }

  private _checkRequired() {
    if (this.required) {
      this._isInvalid = this._selectedOptions.length === 0;
    }
  }

  protected updated(_changedProperties: PropertyValues) {
    if (
      _changedProperties.has('_selectedOptions') &&
      _changedProperties.get('_selectedOptions') instanceof Array
    ) {
      this._checkRequired();
      this._checkAdditionalItemCount();
    } else if (
      _changedProperties.has('multiple') &&
      typeof _changedProperties.get('multiple') === 'boolean'
    ) {
      this._connectedOptions.forEach(option => {
        option.multiple = this.multiple;
        option.selected = false;
      });
      this._selectedOptions = [];
    }
  }

  /**
   * This method is used by `bl-select-option` component to register itself to bl-select.
   * @param option BlSelectOption reference to be registered
   */
  registerOption(option: BlSelectOption) {
    this._connectedOptions.push(option);

    if (option.selected) {
      const optionItem = {
        value: option.value,
        text: option.textContent,
        selected: option.selected,
      } as ISelectOption;

      if (this.multiple) {
        this._selectedOptions = [...this._selectedOptions, optionItem];
      } else {
        this._selectedOptions = [optionItem];
      }

      this.requestUpdate();
    }
  }

  /**
   * This method is used by `bl-select-option` component to unregister itself from bl-select.
   * @param option BlSelectOption reference to be unregistered
   */
  unregisterOption(option: BlSelectOption) {
    this._connectedOptions.splice(this._connectedOptions.indexOf(option), 1);
    this._selectedOptions = this._selectedOptions.filter(item => item.value !== option.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-select': BlSelect;
    'bl-search': BlSelect;
  }
}
