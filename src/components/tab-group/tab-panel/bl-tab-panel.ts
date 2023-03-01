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
      // FIXME: We need to warn if parent is not tab-group
      this.tabGroup?.registerTabPanel(this);
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
  hidden = true;

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tab-panel': BlTabPanel;
  }
}
