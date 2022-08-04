import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../../utilities/event';

import style from './bl-tab.css';

@customElement('bl-tab')
export default class BlTab extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  protected _panel = '';
  get panel(): string {
    return this.name;
  }

  connectedCallback() {
    super.connectedCallback();

    this.updateComplete.then(() => {
      const el = this.closest('bl-tab-group');
      if (el) {
        el.registerTab(this);
      } else {
        throw new Error('bl-tab should be used inside bl-tab-group.');
      }
    });
  }

  @property({ type: String })
  title: string;

  @property({ type: String })
  caption: string;

  @property({ type: String, reflect: true })
  name: string;

  @property({ type: String, attribute: 'help-text', reflect: true })
  helpText: string;

  @property({ type: String })
  icon = '';

  @property({ type: Boolean, reflect: true })
  notify = false;

  @property({ type: String })
  badge = '';

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: false })
  disabled = false;

  @event('bl-tab-selected') private _onSelect: EventDispatcher<string>;

  select() {
    this._onSelect(this.name);
  }

  render(): TemplateResult {
    const title = this.title || html` <slot></slot>`;

    const helpTooltip = this.helpText
      ? html` <div class="help-container">
          <bl-tooltip placement="bottom" style="--bl-tooltip-position:fixed">
            <bl-button
              slot="tooltip-trigger"
              icon="info"
              text
              label="${this.helpText}"
              secondary
            ></bl-button>
            ${this.helpText}
          </bl-tooltip>
        </div>`
      : null;

    const icon = this.icon
      ? html` <div class="icon">
          <bl-icon name="${this.icon}"></bl-icon>
        </div>`
      : null;

    const badge = this.badge
      ? html` <div class="badge-container">
          <bl-badge size="small">${this.badge}</bl-badge>
        </div>`
      : null;

    const caption = this.caption ? html` <div class="caption">${this.caption}</div>` : null;

    return html`
      <button
        ?disabled="${this.disabled}"
        role="tab"
        class="container"
        @click="${() => this.select()}"
      >
        <div class="title-container">
          <div class="title">${icon} ${title} ${badge}</div>
          ${caption}
        </div>
        ${helpTooltip}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tab': BlTab;
  }
}
