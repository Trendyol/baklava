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

  @query('.panels') private panels: HTMLDivElement;
  @query('.tabs') private tabs: HTMLDivElement;

  connectedCallback() {
    super.connectedCallback()

    this.updateComplete.then(() => {
      if(!this._activeTabName) {
        const [firstTab] = this._getTabs;
        this.activeTabName = firstTab.name
        this.activePanelName = firstTab.name
      }
    })
  }

  private _activeTabName: string;
  set activeTabName(name: string) {
    this._activeTabName = name
  }

  private _activePanelName: string;
  get activePanelName(): string {
    return this._activePanelName;
  }
  set activePanelName(name: string) {
    this._activePanelName = name;
    this.getPanels.map(p => p.visible = p.name === name)
  }

  private _handleTabClicked(e: CustomEvent) {
    this.activeTabName = e.detail.name
    this.activePanelName = e.detail.name
  }

  get getPanels() {
    const slot = this.panels.querySelector('slot')!;
    return [...slot.assignedElements()].filter(el => el.tagName.toLowerCase() === 'bl-tab-panel') as [BlTabPanel];
  }

  get _getTabs() {
    const slot = this.tabs.querySelector('slot')!;
    return [...slot.assignedElements()].filter(el => el.tagName.toLowerCase() === 'bl-tab') as [BlTab];
  }


  render(): TemplateResult {
    return html`
      <div class="container">
        <div class="tabs" @tabClicked=${this._handleTabClicked}>
          <slot name="tabs" class="tab"></slot>
        </div>
        <div class="panels">
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
