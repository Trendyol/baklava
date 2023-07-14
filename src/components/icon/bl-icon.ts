import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { getIconPath } from '../../utilities/asset-paths';
import { event, EventDispatcher } from '../../utilities/event';
import iconList from './icon-list';
import style from './bl-icon.css';

export interface IconLibrary {
  icons: string[];
  resolver: (iconName: string) => string;
}

export interface IconLibraries {
  [key: string]: IconLibrary;
}

const iconLibraries: IconLibraries = {};

export function registerIconLibrary(name: string, library: IconLibrary) {
  iconLibraries[name] = library;
}

registerIconLibrary('default', {
  icons: iconList,
  resolver: (iconName: string) => `${getIconPath()}/${iconName}.svg`
});

const requestMap = new Map<string, Promise<Response>>();

/**
 * @tag bl-icon
 * @summary Baklava Icon component
 *
 * @cssproperty [font-size] Setting size of icon. Default is current font size in DOM place
 * @cssproperty [color=currentColor] Setting color of icon
 */
@customElement('bl-icon')
export default class BlIcon extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Name of the icon library. You can register your own icon library with `registerIconLibrary` function
   */
  @property({ type: String, reflect: true })
  library = 'default';

  private _iconName: string;

  /**
   * Name of the icon to show
   */
  @property({ type: String, reflect: true})
  get name(): string {
    return this._iconName;
  }

  set name(value: string) {
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
    const fileUrl = iconLibraries[this.library].resolver(this.name);

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
