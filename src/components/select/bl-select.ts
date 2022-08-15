import { LitElement, html, CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property, state, query, queryAll} from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import style from '../select/bl-select.css';
import '../icon/bl-icon';
import '../select/option/bl-select-option';
import type BlSelectOption from './option/bl-select-option';
import { ISelectOption } from './option/bl-select-option.type';

@customElement('bl-select')
export default class BlSelect extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  // Declare reactive properties
  @property({})
  label?: string;

  @property({})
  value?: string;

  @property({ type: Boolean })
  required?: boolean = false;

  @property({ type: Boolean })
  disabled?: boolean = false;

  @property({ type: Boolean })
  multiple?: boolean = false;

  @property({ type: String, attribute: 'help-text' })
  helpText?: string;

  // Declare internal reactive properties
  @state()
  _isOpen = false;

  @state()
  _selectedItems: ISelectOption[] = [];

  @state()
  _additionalItemCount = 0;

  @state()
  _isShowRemoveIcon = false;

  @state()
  _isInvalid = false;

  @query(".selected-options")
  private _selectedOptionsContainer!: HTMLElement

  @queryAll(".selected-options li")
  private _selectedOptionsItems!: Array<HTMLElement>

  private _connectedOptions: BlSelectOption[] = [];

  inputTemplate() {
    const inputSelectedOptions = html`<ul class="selected-options">
      ${this._selectedItems.map(item => html`<li>${item.text}</li>`)}
    </ul>`;
    const _selectedItemCount = this._additionalItemCount ? html`<span>+${this._additionalItemCount}</span>` : '';
    const removeIcon = this._isShowRemoveIcon ? html`<bl-icon class="remove-all" name="close" title="close" style="font-size: var(--bl-font-size-s)" @click=${this._onClickRemove}></bl-icon><span class="action-seperator"></span>` : '';
    const label = this.label ? html`<label>${this.label}</label>` : '';

    return html`<div class="select-input" ?disabled=${this.disabled} @click=${this._onClickSelectInput} @mouseover=${this._onHoverInput} @mouseleave=${this._onLeaveInput}>
      ${label}
      ${inputSelectedOptions}
      ${_selectedItemCount}
      <div class="actions">
        ${removeIcon}
        <bl-icon name="${ this._isOpen ? 'arrow_up' : 'arrow_down' }" title="arrow_down" style="font-size: var(--bl-font-size-m)"></bl-icon>
      </div>
    </div>`;
  }

  menuTemplate() {
    return html`<div class="select-menu" @bl-select-option=${this._handleSelectOption}>
      <div class="select-menu-container">
        <slot></slot>
      </div>
    </div>`;
  }

  render() {
    const helpMessage = this.helpText && !this._isOpen ? html`<p class="help-text">${this.helpText}</p>` : ``;

    return html`<div class=${classMap({
      'select-wrapper': true,
      'select-open': this._isOpen,
      'selected': this._selectedItems.length > 0,
      'invalid': this._isInvalid
    })}
     tabindex="-1">
      ${this.inputTemplate()}
      ${this.menuTemplate()}
    </div>
    ${helpMessage}
    `;
  }

  private _onClickSelectInput(e: MouseEvent) {
    const isRemoveAll = e.target instanceof HTMLElement && e.target.classList.contains('remove-all');
    if(!isRemoveAll) {
      this._isOpen = !this._isOpen
    }
  }
  set setValue(optionDetail: ISelectOption) {
    const { value } = optionDetail;

    const exist = this._selectedItems.find(item => item.value === value);
    if(exist) {
      this._selectedItems = this._selectedItems.filter(item => item.value !== value)
    } else {
      this._selectedItems = [...this._selectedItems, optionDetail]
    }
  }
  private _handleSingleInput(optionItem: ISelectOption) {
    const { value } = optionItem;

    const oldItem = this._connectedOptions.find(option => option.selected);
    if(oldItem && oldItem.value === value) {
      oldItem.selected = false;
      this._selectedItems = [];
    } else {
      const newItem = this._connectedOptions.find(option => option.value === value);

      if(newItem) {
        if(oldItem) {
          oldItem.selected = false;
        }
        newItem.selected = true;
        this._selectedItems = [optionItem]
      }
    }
  }
  private _handleMultipleInput(optionItem: ISelectOption) {
    const { value } = optionItem;

    const option = this._connectedOptions.find(option =>  value === option.value)
    if(option) {
      this.setValue = optionItem;
      option.selected = !(option.selected);
    }
  }
  private _handleSelectOption(e: CustomEvent) {
    const optionItem = e.detail as ISelectOption;

    if(this.multiple) {
      this._handleMultipleInput(optionItem);
    } else {
      this._handleSingleInput(optionItem);
    }
  }

  private _onHoverInput() {
    this._isShowRemoveIcon = this._selectedItems.length > 0;
  }

  private _onLeaveInput() {
    this._isShowRemoveIcon = false;
  }

  private _onClickRemove() {
    this._connectedOptions.filter(option => option.selected).forEach(option => {
      option.selected = false;
    })

    this._selectedItems = [];
  }

  private _checkAdditionalItemCount() {
    let visibleItems = 0;
    for(let i = 0; i < this._selectedOptionsItems.length; i++) {
      if(this._selectedOptionsItems[i].offsetLeft < this._selectedOptionsContainer.offsetWidth) {
        visibleItems++;
      } else {
        break;
      }
    }

    this._additionalItemCount =  this._selectedOptionsItems.length - visibleItems;
  }

  private _checkRequired() {
    if(this.required) {
      this._isInvalid = this._selectedItems.length === 0;
    }
  }

  protected updated (_changedProperties: PropertyValues) {
    if(_changedProperties.has('_selectedItems')
      && _changedProperties.get('_selectedItems') instanceof Array) {
      this._checkAdditionalItemCount();
      this._checkRequired();
    }
  }

  registerOption(option: BlSelectOption) {
    option.isCheckbox = this.multiple;
    if(option.selected) {
      const detail = {
        value: option.value,
        text: option.textContent
      } as ISelectOption;

      this._selectedItems.push(detail);
      this.requestUpdate();
    }
    this._connectedOptions.push(option);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-select': BlSelect;
  }
}
