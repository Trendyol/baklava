import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './bl-tab-panel.css';
import type BlTabGroup from '../bl-tab-group';

/**
 * @tag bl-tab-panel
 * @summary Baklava Tab panel component
 */
@customElement('bl-tab-panel')
export default class BlTabPanel extends LitElement {
  static get styles(): CSSResultGroup {
    return [styles];
  }

  private tabGroup: BlTabGroup | null;

  connectedCallback() {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this.tabGroup = this.closest('bl-tab-group');
      if (this.tabGroup) {
        this.tabGroup.registerTabPanel(this);
      } else {
        throw new Error('bl-tab-panel should be used inside bl-tab-group.');
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.tabGroup?.unregisterTabPanel(this);
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
