import {CSSResultGroup, html, LitElement, TemplateResult} from "lit";
import {customElement, query} from "lit/decorators.js";
import style from "./bl-tab-group.css";
import BlTabPanel from "../tab-panel/bl-tab-panel";
import BlTab from "../tab/bl-tab";

@customElement('bl-tab-group')
export default class BlTabGroup extends LitElement {

  static get styles(): CSSResultGroup {
    return [style]
  }

  @query('[role="tabpanel"]') private panels: HTMLDivElement;
  @query('[role="tablist"]') private tabs: HTMLDivElement;

  connectedCallback() {
    super.connectedCallback()
    this.updateComplete.then(() => {
      const [hasSelected] = this.getTabs.filter(t => t.selected && !t.disabled)
      if (hasSelected) {
        this.selectedTabName = hasSelected.name
        this.selectedPanelName = hasSelected.panel
      } else {
        const [firstTab] = this.getTabs;
        this.selectedTabName = firstTab.name
        this.selectedPanelName = firstTab.panel
      }
    })
  }

  private _selectedTabName: string;
  set selectedTabName(name: string) {
    this._selectedTabName = name
    this.getTabs.map(t => {
      t.selected = name === t.name
    })
  }

  get selectedTabName() {
    return this._selectedTabName;
  }

  private _selectedPanelName: string;
  get selectedPanelName(): string {
    return this._selectedPanelName;
  }

  set selectedPanelName(name: string) {
    this._selectedPanelName = name;
    this.getPanels.map(p => p.visible = p.name === name)
  }

  private _handleTabClicked(e: CustomEvent) {
    this.selectedTabName = e.detail.panel
    this.selectedPanelName = e.detail.panel
  }

  get getPanels() {
    const slot = this.panels.querySelector('slot')!;
    return [...slot.assignedElements()].filter(el => el.tagName.toLowerCase() === 'bl-tab-panel') as [BlTabPanel];
  }

  get getTabs() {
    const slot = this.tabs.querySelector('slot')!;
    return [...slot.assignedElements()].filter(el => el.tagName.toLowerCase() === 'bl-tab') as [BlTab];
  }


  render(): TemplateResult {
    return html`
      <div class="container">
        <div role="tablist" class="tabs-list" @bl-tab-show=${this._handleTabClicked}>
          <div class="tabs">
            <slot name="tabs" class="tab"></slot>
          </div>
        </div>
        <div role="tabpanel" class="panels">
          <slot></slot>
        </div>
      </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tab-group': BlTabGroup
  }
}
