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

  /* Declare internal reactive properties */
  @state()
  private _isPopoverOpen = false;

  @state()
  private _selectedOptions: ISelectOption[] = [];

  @state()
  private _additionalSelectedOptionCount = 0;

  @state()
  private _isInvalid = false;

  @query('.selected-options')
  private _selectedOptionsContainer!: HTMLElement;

  @queryAll('.selected-options li')
  private _selectedOptionsItems!: Array<HTMLElement>;

  @query('.popover')
  private _popover: HTMLElement;

  @query('.select-input')
  private _selectInput: HTMLElement;

  @event('bl-select') private _onBlSelect: EventDispatcher<ISelectOption[]>;

  private _connectedOptions: BlSelectOption[] = [];

  private _cleanUpPopover: CleanUpFunction | null = null;

  get options() {
    return this._connectedOptions;
  }

  get isPopoverOpen() {
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
  }

  close() {
    this._isPopoverOpen = false;
    this._cleanUpPopover && this._cleanUpPopover();
  }

  private _clickOutsideHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (!this.contains(target) && this._isPopoverOpen) {
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

    document.addEventListener('click', this._clickOutsideHandler);
  }
  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener('click', this._clickOutsideHandler);
    this._cleanUpPopover && this._cleanUpPopover();
  }

  private inputTemplate() {
    const inputSelectedOptions = html`<ul class="selected-options">
      ${this._selectedOptions.map(item => html`<li>${item.text}</li>`)}
    </ul>`;
    const _selectedItemCount = this._additionalSelectedOptionCount
      ? html`<span>+${this._additionalSelectedOptionCount}</span>`
      : null;
    const removeButton = html` <bl-button
        class="remove-all"
        variant="secondary"
        size="small"
        kind="text"
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
        ${removeButton}
        <bl-icon
          class="dropdown-icon"
          name="${this._isPopoverOpen ? 'arrow_up' : 'arrow_down'}"
        ></bl-icon>
      </div>
    </div>`;
  }

  private menuTemplate() {
    return html`<div class="popover" @bl-select-option=${this._handleSelectOptionEvent}>
      <slot></slot>
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
      'select-open': this._isPopoverOpen,
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
    const oldItem = this._connectedOptions.find(option => option.selected);

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
    for (let i = 0; i < this._selectedOptionsItems.length; i++) {
      if (this._selectedOptionsItems[i].offsetLeft < this._selectedOptionsContainer.offsetWidth) {
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
  }
}
