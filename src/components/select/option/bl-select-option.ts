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
  isCheckbox = false;

  /**
   * Fires when clicked on the option
   */
  @event('bl-select-option') private _onSelect: EventDispatcher<ISelectOption>;

  private blSelect: BlSelect | null;

  render() {
    const checkbox = this.isCheckbox
      ? html`<input type="checkbox" .checked="${this.selected}" />`
      : '';

    return html`<div class="select-option" @click=${this.onClickOption}>
      ${checkbox}
      <span>
        <slot></slot>
      </span>
    </div> `;
  }

  onClickOption() {
    this._onSelect({
      value: this.value,
      text: this.textContent,
    } as ISelectOption);
  }

  connectedCallback() {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this.blSelect = this.closest<BlSelect>('bl-select');
      // FIXME: We should warn when parent is not bl-select

      this.isCheckbox = this.blSelect?.multiple || false;
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
