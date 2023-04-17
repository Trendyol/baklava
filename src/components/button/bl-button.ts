import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { submit } from '@open-wc/form-helpers';
import { event, EventDispatcher } from '../../utilities/event';
import style from './bl-button.css';
import '../icon/bl-icon';
import { BaklavaIcon } from '../icon/icon-list';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonKind = 'default' | 'neutral' | 'success' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';
export type TargetType = '_blank' | '_parent' | '_self' | '_top';

/**
 * @tag bl-button
 * @summary Baklava Button component
 *
 * @cssproperty [--bl-button-display=inline-block] Sets the display property of button
 * @cssproperty [--bl-button-justify=center] Sets the justify-content property of button
 *
 */
@customElement('bl-button')
export default class BlButton extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the button variant
   */
  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'primary';

  /**
   * Sets the button kind
   */
  @property({ type: String, reflect: true })
  kind: ButtonKind = 'default';

  /**
   * Sets the button size
   */
  @property({ type: String, reflect: true })
  size: ButtonSize = 'medium';

  /**
   * Sets the button label. Used for accessibility.
   */
  @property({ type: String })
  label: string;

  /**
   * Sets the button label for loading status.
   */
  @property({ type: String, attribute: 'loading-label' })
  loadingLabel: string;

  /**
   * Sets loading state of button
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Sets button as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Set link url. If set, button will be rendered as anchor tag.
   */
  @property({ type: String })
  href?: string;

  /**
   * Sets the icon name. Shows icon with bl-icon component
   */
  @property({ type: String })
  icon?: BaklavaIcon;

  /**
   * Sets the anchor target. Used when `href` is set.
   */
  @property({ type: String })
  target?: TargetType = '_self';

  /**
   * Sets the type of the button. Set `submit` to use button as the submitter of parent form.
   */
  @property({ type: String })
  type: 'submit' | null;

  /**
   * Sets button type to dropdown
   */
  @property({ type: Boolean })
  dropdown = false;

  /**
   * Sets button to get keyboard focus automatically
   */
  @property({ type: Boolean, reflect: true })
  autofocus = false;

  /**
   * Active state
   */
  @state({})
  active = false;

  @query('.button')
  private button: HTMLAnchorElement | HTMLButtonElement;

  /**
   * Fires when button clicked
   */
  @event('bl-click') private onClick: EventDispatcher<string>;

  private get _isActive() {
    return this.active;
  }

  private form: HTMLFormElement | null;

  connectedCallback() {
    super.connectedCallback();
    this.form = this.closest('form');
  }

  private caretTemplate(): TemplateResult {
    return html` <bl-icon class="open" name="arrow_up"></bl-icon>
      <bl-icon class="close" name="arrow_down"></bl-icon>`;
  }

  private _handleClick() {
    if (this.type === 'submit' && this.form) {
      submit(this.form);
    }

    this.onClick('Click event fired!');
  }

  focus() {
    this.button.focus();
  }

  get _hasIconSlot() {
    return this.querySelector(':scope > [slot="icon"]') !== null;
  }

  get _hasDefaultSlot() {
    const childNodes = [...this.childNodes];
    return childNodes.some(node => {
      const nodeType = node.nodeType;
      // has only text node.
      if (nodeType === node.TEXT_NODE && node.textContent?.trim() !== '') {
        return true;
      }
      // has element node, it should not have slot attribute.
      if (nodeType === node.ELEMENT_NODE) {
        if (!(node as HTMLElement).hasAttribute('slot')) {
          return true;
        }
      }
      return false;
    });
  }

  render(): TemplateResult {
    const isDisabled = this.loading || this.disabled;
    const label = this.loading && this.loadingLabel ? this.loadingLabel : html`<slot></slot>`;
    const isAnchor = !!this.href;
    const icon = this.icon ? html`<bl-icon name=${this.icon}></bl-icon>` : '';
    const loadingIcon = this.loading
      ? html`<bl-icon class="loading-icon" name="loading"></bl-icon>`
      : '';
    const slots = html`<slot name="icon">${icon}</slot> <span class="label">${label}</span>`;
    const caret = this.dropdown ? this.caretTemplate() : '';
    const classes = classMap({
      'button': true,
      'has-icon': this.icon || this._hasIconSlot,
      'has-content': this._hasDefaultSlot,
      'active': !isAnchor && this._isActive,
    });

    return isAnchor
      ? html`<a
          class=${classes}
          ?autofocus=${this.autofocus}
          aria-disabled="${ifDefined(isDisabled)}"
          aria-label="${ifDefined(this.label)}"
          href=${ifDefined(this.href)}
          target=${ifDefined(this.target)}
          role="button"
          >${loadingIcon} ${slots}
        </a>`
      : html`<button
          class=${classes}
          ?autofocus=${this.autofocus}
          aria-disabled="${ifDefined(isDisabled)}"
          aria-label="${ifDefined(this.label)}"
          ?disabled=${isDisabled}
          @click="${this._handleClick}"
        >
          ${loadingIcon} ${slots} ${caret}
        </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-button': BlButton;
  }
}
