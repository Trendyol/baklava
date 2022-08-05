import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import style from './bl-tab-group.css';
import './tab-panel/bl-tab-panel';
import './tab/bl-tab';
import type BlTabPanel from './tab-panel/bl-tab-panel';
import type BlTab from './tab/bl-tab';

/**
 * @tag bl-tab-group
 * @summary Baklava Tab group component
 */
@customElement('bl-tab-group')
export default class BlTabGroup extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  private _connectedTabs: BlTab[] = [];
  private _connectedPanels: BlTabPanel[] = [];

  get tabs() {
    return this._connectedTabs;
  }

  get panels() {
    return this._connectedPanels;
  }

  /**
   * This method is used by `tab` component to register them self to the tab group.
   * @param tab BlTab reference to be registered
   */
  registerTab(tab: BlTab) {
    const isFirstAndNotDisabled =
      this._connectedTabs.filter(t => !t.disabled).length === 0 && !tab.disabled;
    this._connectedTabs.push(tab);
    if ((!tab.disabled && tab.selected) || isFirstAndNotDisabled) {
      this.selectedTabName = tab.name;
    }
  }

  /**
   * This method is used by `tab` component to unregister them self to the tab group.
   * @param tab BlTab reference to be unregistered
   */
  unregisterTab(tab: BlTab) {
    this._connectedTabs.splice(this._connectedTabs.indexOf(tab), 1);
    if (tab.selected) {
      this._connectedTabs.find(t => !t.disabled)?.select();
    }
  }

  /**
   * This method is used by `tab-panel` component to register them self to the tab group.
   * @param panel BlTabPanel reference to be registered
   */
  registerTabPanel(panel: BlTabPanel) {
    panel.visible = panel.tab === this.selectedTabName;
    this._connectedPanels.push(panel);
  }

  /**
   * This method is used by `tab-panel` component to unregister them self to the tab group.
   * @param panel BlTabPanel reference to be unregistered
   */
  unregisterTabPanel(panel: BlTabPanel) {
    this._connectedTabs.splice(this._connectedPanels.indexOf(panel), 1);
  }

  private _selectedTabName: string;

  get selectedTabName() {
    return this._selectedTabName;
  }

  set selectedTabName(name: string) {
    this._selectedTabName = name;
    this._connectedTabs.forEach(t => {
      t.selected = name === t.name;
    });
    this._connectedPanels.forEach(p => {
      p.visible = p.tab === this._selectedTabName;
    });
  }

  private _handleTabSelected(e: CustomEvent) {
    this.selectedTabName = e.detail;
  }

  render(): TemplateResult {
    return html` <div class="container" @bl-tab-selected="${this._handleTabSelected}">
      <div role="tablist" class="tabs-list">
        <div class="tabs">
          <slot name="tabs"></slot>
        </div>
      </div>
      <div role="tabpanel" class="panels">
        <slot></slot>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tab-group': BlTabGroup;
  }
}
