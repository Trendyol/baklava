import { autoUpdate, computePosition, flip, MiddlewareArguments, offset, size } from '@floating-ui/dom';
import { FormControlMixin } from '@open-wc/form-control';
import 'element-internals-polyfill';
import { CSSResultGroup, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { event, EventDispatcher } from '../../utilities/event';
import '../icon/bl-icon';
import style from '../select/bl-select.css';
import '../select/option/bl-select-option';
import type BlSelectOption from './option/bl-select-option';

export interface ISelectOption<T> {
  value: T;
  text: string;
  selected: boolean;
}

export type SelectSize = 'medium' | 'large' | 'small';

export type CleanUpFunction = () => void;

@customElement('bl-select')
export default class BlSelect<ValueType = string> extends FormControlMixin(LitElement) {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets name of the input
   */
  @property()
  name: string;

  private _value: ValueType | ValueType[] | null;

  /**
   * Sets initial value of the input
   */
  @property()
  get value(): ValueType | ValueType[] | null {
    return this._value;
  }

  set value(val: ValueType | ValueType[] | null) {
    this._value = val;

    if (typeof val === 'string') {
      this.setValue(val);
    } else if (Array.isArray(val)) {
      const formData = new FormData();
      val.forEach((option) => formData.append(this.name, `${option}`));
      this.setValue(formData);
    }
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
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Allows multiple options to be selected
   */
  @property({ type: Boolean })
  multiple = false;

  /**
   * Makes label as fixed positioned
   */
  @property({ type: Boolean, attribute: 'label-fixed', reflect: true })
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
  private _selectedOptions: ISelectOption<ValueType>[] = [];

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

  @event('bl-select') private _onBlSelect: EventDispatcher<ISelectOption<ValueType>[]>;

  private _connectedOptions: BlSelectOption<ValueType>[] = [];

  private _cleanUpPopover: CleanUpFunction | null = null;

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
  }

  close() {
    this._isPopoverOpen = false;
    this.focusedOptionIndex = -1;
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

  disconnectedCallback() {
    super.disconnectedCallback();

    this._cleanUpPopover && this._cleanUpPopover();
  }

  private inputTemplate() {
    const inputSelectedOptions = html`<ul class="selected-options">
      ${this._selectedOptions.map(item => html`<li>${item.text}</li>`)}
    </ul>`;
    const removeButton = html`<bl-button
        class="remove-all"
        size="small"
        variant="tertiary"
        kind="neutral"
        icon="close"
        @click=${this._onClickRemove}></bl-button>`;

    return html`<div
      class=${classMap({
        'select-input': true,
        'has-overflowed-options': this._additionalSelectedOptionCount > 0
      })}
      tabindex="0"
      @click=${this.togglePopover}
    >
      <span class="placeholder">${this.placeholder}</span>
      ${inputSelectedOptions}
      <span class="additional-selection-count">+${this._additionalSelectedOptionCount}</span>
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
      @keydown=${this.handleKeydown}
    >
      ${label}
      ${this.inputTemplate()}
      <div class="popover" tabindex="${ifDefined(this._isPopoverOpen ? undefined : '-1')}" @bl-select-option=${this._handleSelectOptionEvent}>
        <slot></slot>
      </div>
      ${helpMessage}
      ${invalidMessage}
    </div> `;
  }

  private focusedOptionIndex = -1;

  private handleKeydown(event: KeyboardEvent) {
    if (this.focusedOptionIndex === -1 && event.code === 'Enter' || event.code === 'Space') {
      this.togglePopover();
    } else if (event.code === 'Escape') {
      this.close();
      event.preventDefault();
    } else if (this._isPopoverOpen && ['ArrowDown', 'ArrowUp'].includes(event.code)) {
      event.code === 'ArrowDown' && this.focusedOptionIndex++;
      event.code === 'ArrowUp' && this.focusedOptionIndex--;

      // Don't exceed array indexes
      this.focusedOptionIndex = Math.max(
        0,
        Math.min(this.focusedOptionIndex, this.options.length - 1)
      );

      this.options[this.focusedOptionIndex].focus();
    }

  }

  private togglePopover() {
    this._isPopoverOpen ? this.close() : this.open();
  }

  private _handleSelectEvent() {
    if (this.multiple) {
      this.value = this._selectedOptions.map((option) => option.value);
    } else {
      this.value = this._selectedOptions.length ? this._selectedOptions[0].value : null;
    }
    this._onBlSelect(this._selectedOptions);
  }

  private _handleSingleSelect(optionItem: ISelectOption<ValueType>) {
    const oldItem = this._connectedOptions.find(option => option.value !== optionItem.value && option.selected);

    if (oldItem) {
      oldItem.selected = false;
    }

    this._selectedOptions = [optionItem];
    this._handleSelectEvent();
    this._isPopoverOpen = false;
  }

  private _handleMultipleSelect(optionItem: ISelectOption<ValueType>) {
    const { value } = optionItem;

    if (!optionItem.selected) {
      this._selectedOptions = this._selectedOptions.filter(item => item.value !== value);
    } else {
      this._selectedOptions = [...this._selectedOptions, optionItem];
    }

    this._handleSelectEvent();
  }

  private _handleSelectOptionEvent(e: CustomEvent) {
    const optionItem = e.detail as ISelectOption<ValueType>;

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
  registerOption(option: BlSelectOption<ValueType>) {
    this._connectedOptions.push(option);

    if (option.selected) {
      const optionItem = {
        value: option.value,
        text: option.textContent,
        selected: option.selected,
      } as ISelectOption<ValueType>;

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
  unregisterOption(option: BlSelectOption<ValueType>) {
    this._connectedOptions.splice(this._connectedOptions.indexOf(option), 1);
    this._selectedOptions = this._selectedOptions.filter(item => item.value !== option.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-select': BlSelect;
  }
}
