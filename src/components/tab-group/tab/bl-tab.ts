import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../../utilities/event';

import style from './bl-tab.css';
import type BlTabGroup from '../bl-tab-group';

/**
 * @tag bl-tab
 * @summary Baklava Tab component
 */
@customElement('bl-tab')
export default class BlTab extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  private tabGroup: BlTabGroup | null;

  connectedCallback() {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this.tabGroup = this.closest<BlTabGroup>('bl-tab-group');
      // FIXME: We need to warn if parent is not tab-group
      this.tabGroup?.registerTab(this);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.tabGroup?.unregisterTab(this);
  }

  /**
   * Title of tab
   */
  @property({ type: String })
  title: string;

  /**
   * Sets the caption of tab
   */
  @property({ type: String })
  caption: string;

  /**
   * Name of the tab that should match `tab-panel`'s `tab` attribute
   */
  @property({ type: String, reflect: true })
  name: string;

  /**
   * Set tooltip text. Should be set to display information icon.
   */
  @property({ type: String, attribute: 'help-text', reflect: true })
  helpText: string;

  /**
   * Name of the icon which display on the left side of the tab.
   */
  @property({ type: String })
  icon = '';

  /**
   * Shows notification dot.
   */
  @property({ type: Boolean, reflect: true })
  notify = false;

  /**
   * Sets the content of the badge.
   */
  @property({ type: String })
  badge = '';

  /**
   * Set `tab` as selected.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * Set `tab` as disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Fires when tab is selected.
   */
  @event('bl-tab-selected') private _onSelect: EventDispatcher<string>;

  /**
   * Set tab selected.
   */
  select() {
    this._onSelect(this.name);
  }

  render(): TemplateResult {
    const title = this.title || html` <slot></slot>`;

    const helpTooltip = this.helpText
      ? html` <div class="help-container">
          <bl-tooltip>
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
