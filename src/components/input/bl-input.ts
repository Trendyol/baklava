import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import style from './bl-input.css';

/**
 * @tag bl-input
 * @summary Baklava Input component
 *
 * @property {string} value - Value of the input
 *
 * @event {CustomEvent} bl-change - Fires when input changed
 *
 */
@customElement('bl-input')
export default class BlInput extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query('input') input: HTMLInputElement;

  @property({})
  type: 'text' | 'number' = 'text';

  @property({})
  label: string;

  @property({})
  placeholder: string;

  @property({})
  value = '';

  @property({ type: Number })
  minlength: number;

  @property({ type: Number })
  maxlength: number;

  @property({ type: Number })
  min: number;

  @property({ type: Number })
  max: number;

  private inputHandler() {
    this.value = this.input.value;
    this.input.reportValidity();
    this.event('bl-input', this.input.value);
  }

  private changeHandler() {
    console.log('change', this.input.validity);

    this.event('bl-change', this.input.value);
  }

  private event(name: string, detail: string) {
    this.dispatchEvent(
      new CustomEvent(name, { detail, bubbles: true, composed: true })
    );
  }

  render(): TemplateResult {
    return html`<input
        type=${this.type}
        placeholder="${this.placeholder || this.label}"
        minlength="${ifDefined(this.minlength)}"
        maxlength="${ifDefined(this.minlength)}"
        min="${ifDefined(this.min)}"
        max="${ifDefined(this.max)}"
        @change=${this.changeHandler}
        @input=${this.inputHandler}
      />
      <p class="error-message"></p> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-input': BlInput;
  }
}
