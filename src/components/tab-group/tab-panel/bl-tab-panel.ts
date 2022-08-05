import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './bl-tab-panel.css';

/**
 * @tag bl-tab-panel
 * @summary Baklava Tab panel component
 */
@customElement('bl-tab-panel')
export default class BlTabPanel extends LitElement {
  static get styles(): CSSResultGroup {
    return [styles];
  }

  connectedCallback() {
    super.connectedCallback();

    this.updateComplete.then(() => {
      const el = this.closest('bl-tab-group');
      if (el) {
        el.registerTabPanel(this);
      } else {
        throw new Error('bl-tab-panel should be used inside bl-tab-group.');
      }
    });
  }

  /**
   * Name of the linked tab.
   */
  @property({ type: String, reflect: true })
  tab: string;

  /**
   * This attribute set by `tab-group` to make panel visible or hidden.
   */
  @property({ type: Boolean, reflect: true })
  visible = false;

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tab-panel': BlTabPanel;
  }
}
