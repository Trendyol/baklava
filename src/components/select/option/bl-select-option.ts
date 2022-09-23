import { LitElement, html, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../../utilities/event';
import { ISelectOption } from '../bl-select';
import style from './bl-select-option.css';
import BlSelect from '../bl-select';

@customElement('bl-select-option')
export default class BlSelectOption extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /* Declare reactive properties */
  /**
   * Sets the value for the option
   */
  @property({})
  value: string;

  /**
   * Sets option as disabled
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Sets option as selected state
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  @state()
  multiple = false;

  /**
   * Fires when clicked on the option
   */
  @event('bl-select-option') private _onSelect: EventDispatcher<ISelectOption>;

  private blSelect: BlSelect | null;

  private singleOptionTemplate() {
    return html`<div class="single-option" @click="${this._onClickOption}">
      <slot></slot>
    </div>`;
  }

  private checkboxOptionTemplate() {
    return html`<bl-checkbox
      class="checkbox-option"
      .checked="${this.selected}"
      .disabled="${this.disabled}"
      @bl-checkbox-change="${this._onCheckboxChange}"
    >
      <slot></slot>
    </bl-checkbox>`;
  }

  render() {
    return html`<div class="option-container">
      ${this.multiple ? this.checkboxOptionTemplate() : this.singleOptionTemplate()}
    </div>`;
  }

  private _handleEvent() {
    this._onSelect({
      value: this.value,
      text: this.textContent,
      selected: this.selected,
    } as ISelectOption);
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
      this.blSelect = this.closest<BlSelect>('bl-select');
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
    'bl-select-option': BlSelectOption;
  }
}
