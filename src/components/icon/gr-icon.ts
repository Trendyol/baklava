import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './gr-icon.css';

/**
 * @tag gr-icon
 * @summary Grace Button component
 *
 * @property {string} name - Name of the icon to show
 * @property {string} label - Accessible label
 *
 * @cssproperty --gr-icon-size - Sets the size of icon in pixels
 * @cssproperty --gr-icon-color - Sets the color of the icon
 *
 * @event {CustomEvent} gr-load - Fires when SVG icon loaded
 * @event {CustomEvent} gr-error - Fires when SVG icon failed to load
 *
 */
@customElement('gr-icon')
export default class GrIcon extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @property()
  name: string;

  @property()
  label: string;

  render(): TemplateResult {
    return html`<div aria-label=${this.label} aria-hidden="true">
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 0.5C18.6274 0.5 24 5.87258 24 12.5C24 19.1274 18.6274 24.5 12 24.5C5.37258 24.5 0 19.1274 0 12.5C0 5.87258 5.37258 0.5 12 0.5ZM11.9971 6.5C12.5587 6.5 13 6.95481 13 7.50292C13 8.04519 12.5587 8.5 11.9971 8.5C11.4413 8.5 11 8.04519 11 7.50292C11 6.95481 11.4413 6.5 11.9971 6.5ZM13 10.5C13 9.94771 12.5523 9.5 12 9.5C11.4477 9.5 11 9.94771 11 10.5V17.5C11 18.0523 11.4477 18.5 12 18.5C12.5523 18.5 13 18.0523 13 17.5V10.5Z"
          fill="#273142"
        />
      </svg>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gr-icon': GrIcon;
  }
}
