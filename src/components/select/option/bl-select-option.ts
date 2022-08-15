import { LitElement, html, CSSResultGroup } from 'lit';
import { customElement, property, state, queryAssignedNodes } from 'lit/decorators.js';
import style from './bl-select-option.css';
import { event, EventDispatcher } from '../../../utilities/event';
import { ISelectOption } from './bl-select-option.type';
import { classMap } from 'lit/directives/class-map.js';

@customElement('bl-select-option')
export default class BlSelectOption extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  // Declare reactive properties
  @property({})
  value: string;

  @property({ type: Boolean })
  disabled?: boolean = false;

  @property({ type: Boolean })
  selected = false;

  @state()
  isCheckbox?: boolean = false;

  @queryAssignedNodes()
  _slotText!: Array<HTMLElement>;

  @event('bl-select-option') private _onSelect: EventDispatcher<ISelectOption>;

  render() {
    return html`<div class=${classMap({
      'select-option': true,
      'selected': this.selected,
    })} @click=${this.onClickOption}>
      ${this.isCheckbox ? html`<input type="checkbox" .checked="${this.selected}" />` : ''}
      <span>
        <slot></slot>
      </span>
    </div>
    <div class="select-option-seperator" />
    `
  }

  onClickOption() {
    this._onSelect({
      value: this.value,
      text: this._slotText?.[0].textContent,
    } as ISelectOption);
  }

  connectedCallback() {
    super.connectedCallback();

    this.updateComplete.then(() => {
      const el = this.closest('bl-select');
      if (el) {
        el.registerOption(this);
      } else {
        throw new Error('bl-select-option should be used inside bl-select.');
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-select-option': BlSelectOption;
  }
}
