import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { getIconPath } from '../../utilities/asset-paths';
import { event, EventDispatcher } from '../../utilities/event';

import style from './bl-icon.css';

const requestMap = new Map<string, Promise<Response>>();

/**
 * @tag bl-icon
 * @summary Baklava Icon component
 *
 * @cssproperty [font-size] Setting size of icon. Default is current font size in DOM place
 * @cssproperty [color=currentColor] Setting color of icon
 */
@customElement('bl-icon')
export default class BlIcon<T extends string = string> extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  private _iconName!: T;

  /**
   * Name of the icon to show
   */
  @property()
  get name(): T {
    return this._iconName;
  }

  set name(value: T) {
    if (value !== this._iconName) {
      this._iconName = value;
      this.load();
    }
  }

  /**
   * Fires when SVG icon loaded
   */
  @event('bl-load') private onLoad: EventDispatcher<string>;

  /**
   * Fires when SVG icon failed to load
   */
  @event('bl-error') private onError: EventDispatcher<string>;

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
        this.onLoad(`${this.name} icon loaded`);
        this.requestUpdate();
      } else {
        this.onError(`${this.name} icon failed to load`);
      }
    } catch (error) {
      this.onError(`${this.name} icon failed to load [${error}]`);
    }
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
