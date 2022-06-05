import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { getIconPath } from '../../utilities/asset-paths';

import style from './bl-icon.css';

const requestMap = new Map<string, Promise<Response>>();

/**
 * @tag bl-icon
 * @summary Baklava Icon component
 *
 * @property {string} name - Name of the icon to show
 *
 * @cssproperty font-size - Setting size of icon. Default is current font size in DOM place
 * @cssproperty color - Setting color of icon. Default is `currentColor`
 *
 * @event {CustomEvent} bl-load - Fires when SVG icon loaded
 * @event {CustomEvent} bl-error - Fires when SVG icon failed to load
 *
 */
@customElement('bl-icon')
export default class BlIcon extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  private _iconName: string;

  @property()
  get name(): string {
    return this._iconName;
  }

  set name(value: string) {
    if (value !== this._iconName) {
      this._iconName = value;
      this.load();
    }
  }

  @state() private svg: string;

  async load() {
    const iconPath = getIconPath();
    const fileUrl = `${iconPath}/${this.name}.svg`;

    if (!requestMap.has(fileUrl)) {
      requestMap.set(fileUrl, fetch(fileUrl));
    }

    try {
      const iconRequest = await requestMap.get(fileUrl);
      const res = await iconRequest?.clone();

      if (res?.ok) {
        this.svg = await res.text();
        this.event('bl-load', `${this.name} icon loaded`);
        this.requestUpdate();
      } else {
        this.event('bl-error', `${this.name} icon failed to load`);
      }
    } catch (error) {
      this.event('bl-error', `${this.name} icon failed to load [${error}]`);
    }
  }

  private event(name: string, detail: string) {
    this.dispatchEvent(
      new CustomEvent(name, { detail, bubbles: true, composed: true })
    );
  }

  render(): TemplateResult {
    return html`<div aria-hidden="true">${unsafeSVG(this.svg)}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-icon': BlIcon;
  }
}
