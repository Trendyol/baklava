import { LitElement, html, CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property, state, query, queryAll } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import style from '../select/bl-select.css';
import '../icon/bl-icon';
import '../select/option/bl-select-option';
import type BlSelectOption from './option/bl-select-option';
import { ISelectOption, SelectSize } from './types';

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
  size?: SelectSize = 'medium';

  /**
   * When option is not selected, shows component in error state
   */
  @property({ type: Boolean })
  required?: boolean = false;

  /**
   * Shows the component in disabled state.
   */
  @property({ type: Boolean })
  disabled?: boolean = false;

  /**
   * Allows multiple options to be selected
   */
  @property({ type: Boolean })
  multiple?: boolean = false;

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
   * Shows the component in error state
   */
  @property({ type: Boolean })
  error?: boolean = false;

  /**
   * Shows the component in success state
   */
  @property({ type: Boolean })
  success?: boolean = false;

  /* Declare internal reactive properties */
  @state()
  _isOpen = false;

  @state()
  _selectedItems: ISelectOption[] = [];

  @state()
  _additionalItemCount = 0;

  @state()
  _isInvalid = false;

  @query('.selected-options')
  private _selectedOptionsContainer!: HTMLElement;

  @queryAll('.selected-options li')
  private _selectedOptionsItems!: Array<HTMLElement>;

  private _connectedOptions: BlSelectOption[] = [];

  clickOutsideHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (!this.contains(target) && this._isOpen) {
      this._isOpen = false;
    }
  };

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener('click', this.clickOutsideHandler);
  }
  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener('click', this.clickOutsideHandler);
  }

  get showPlaceHolder() {
    if (this.label) {
      return this.labelFixed
        ? !this._selectedItems.length
        : !this._selectedItems.length && this._isOpen;
    }
    return !this._selectedItems.length;
  }

  inputTemplate() {
    const inputSelectedOptions = html`<ul class="selected-options">
      ${this._selectedItems.map(item => html`<li>${item.text}</li>`)}
    </ul>`;
    const _selectedItemCount = this._additionalItemCount
      ? html`<span>+${this._additionalItemCount}</span>`
      : '';
    const removeIcon = html`<bl-icon
      class="remove-all"
      name="close"
      title="close"
      style="font-size: var(--bl-font-size-xs);"
      @click=${this._onClickRemove}
    ></bl-icon>`;
    const placeholder = this.showPlaceHolder
      ? html`<span class="placeholder">${this.placeholder}</span>`
      : '';

    return html`<div
      class="select-input"
      ?disabled=${this.disabled}
      @click=${this._onClickSelectInput}
    >
      ${placeholder} ${inputSelectedOptions} ${_selectedItemCount}
      <div class="actions">
        ${removeIcon}
        <bl-icon
          name="${this._isOpen ? 'arrow_up' : 'arrow_down'}"
          title="arrow_down"
          style="font-size: var(--bl-font-size-m)"
        ></bl-icon>
      </div>
    </div>`;
  }

  menuTemplate() {
    return html`<div class="select-menu" @bl-select-option=${this._handleSelectOptionEvent}>
      <div class="select-menu-container">
        <slot></slot>
      </div>
    </div>`;
  }

  render() {
    const helpMessage = this.helpText ? html`<p class="help-text">${this.helpText}</p>` : ``;
    const label = this.label ? html`<label>${this.label}</label>` : '';

    return html`<div
      class=${classMap({
        'select-wrapper': true,
        'select-open': this._isOpen,
        'selected': this._selectedItems.length > 0,
        'invalid': this._isInvalid,
      })}
      tabindex="-1"
    >
      ${label} ${this.inputTemplate()} ${this.menuTemplate()} ${helpMessage}
    </div> `;
  }

  private _onClickSelectInput(e: MouseEvent) {
    const isRemoveAll =
      e.target instanceof HTMLElement && e.target.classList.contains('remove-all');
    if (!isRemoveAll) {
      this._isOpen = !this._isOpen;
    }
  }

  set setValue(optionDetail: ISelectOption) {
    const { value } = optionDetail;

    const exist = this._selectedItems.find(item => item.value === value);
    if (exist) {
      this._selectedItems = this._selectedItems.filter(item => item.value !== value);
    } else {
      this._selectedItems = [...this._selectedItems, optionDetail];
    }
  }

  private _handleSingleInput(optionItem: ISelectOption) {
    const { value } = optionItem;

    const oldItem = this._connectedOptions.find(option => option.selected);
    if (oldItem && oldItem.value === value) {
      oldItem.selected = false;
      this._selectedItems = [];
    } else {
      const newItem = this._connectedOptions.find(option => option.value === value);

      if (newItem) {
        if (oldItem) {
          oldItem.selected = false;
        }
        newItem.selected = true;
        this._selectedItems = [optionItem];
      }
    }
  }

  private _handleMultipleInput(optionItem: ISelectOption) {
    const { value } = optionItem;

    const option = this._connectedOptions.find(option => value === option.value);
    if (option) {
      this.setValue = optionItem;
      option.selected = !option.selected;
    }
  }

  private _handleSelectOptionEvent(e: CustomEvent) {
    const optionItem = e.detail as ISelectOption;

    if (this.multiple) {
      this._handleMultipleInput(optionItem);
    } else {
      this._handleSingleInput(optionItem);
    }
  }

  private _onClickRemove() {
    this._connectedOptions
      .filter(option => option.selected)
      .forEach(option => {
        option.selected = false;
      });

    this._selectedItems = [];
  }

  private _checkAdditionalItemCount() {
    let visibleItems = 0;
    for (let i = 0; i < this._selectedOptionsItems.length; i++) {
      if (this._selectedOptionsItems[i].offsetLeft < this._selectedOptionsContainer.offsetWidth) {
        visibleItems++;
      } else {
        break;
      }
    }

    this._additionalItemCount = this._selectedOptionsItems.length - visibleItems;
  }

  private _checkRequired() {
    if (this.required) {
      this._isInvalid = this._selectedItems.length === 0;
    }
  }

  protected updated(_changedProperties: PropertyValues) {
    if (
      _changedProperties.has('_selectedItems') &&
      _changedProperties.get('_selectedItems') instanceof Array
    ) {
      this._checkAdditionalItemCount();
      this._checkRequired();
    } else if (
      _changedProperties.has('multiple') &&
      typeof _changedProperties.get('multiple') === 'boolean'
    ) {
      this._connectedOptions.forEach(option => (option.isCheckbox = this.multiple));
    }
  }

  registerOption(option: BlSelectOption) {
    this._connectedOptions.push(option);

    option.isCheckbox = this.multiple;
    if (option.selected) {
      const optionItem = {
        value: option.value,
        text: option.textContent,
      } as ISelectOption;

      if (this.multiple) {
        this._selectedItems.push(optionItem);
      } else {
        this._selectedItems = [optionItem];
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-select': BlSelect;
  }
}
