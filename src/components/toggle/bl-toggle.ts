import { CSSResultGroup, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { setDirectionProperty } from "../../utilities/direction";
import { event, EventDispatcher } from "../../utilities/event";
import { BaklavaIcon } from "../icon/icon-list";
import styles from "./bl-toggle.css";

export type ToggleSize = "small" | "medium" | "large";

/**
 * @tag bl-toggle
 * @summary Baklava Toggle component
 *
 * Toggle component can be used to switch between two states. It supports optional labels and/or icons on each side.
 *
 * @cssproperty [--bl-toggle-color-on=var(--bl-color-primary)] Sets the active (on) background color.
 * @cssproperty [--bl-toggle-animation-duration=300ms] Sets the transition duration for thumb/track.
 */
@customElement("bl-toggle")
export default class BlToggle extends LitElement {
  static get styles(): CSSResultGroup {
    return [styles];
  }

  /**
   * Sets the label for the FALSE state. This appears on the left in LTR and on the right in RTL.
   */
  @property({ type: String, attribute: "label-false" }) labelFalse = "";

  /**
   * Sets the label for the TRUE state. This appears on the right in LTR and on the left in RTL.
   */
  @property({ type: String, attribute: "label-true" }) labelTrue = "";

  /**
   * Controls the checked state of the toggle
   */
  @property({ type: Boolean, reflect: true }) checked = false;

  /**
   * Disables the toggle when set
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Inverts the color scheme when checked (thumb becomes colored, track becomes neutral)
   */
  @property({ type: Boolean, reflect: true }) inverted = false;

  /**
   * Sets the icon for the FALSE state.
   */
  @property({ type: String, attribute: "icon-false" }) iconFalse?: BaklavaIcon;

  /**
   * Sets the icon for the TRUE state.
   */
  @property({ type: String, attribute: "icon-true" }) iconTrue?: BaklavaIcon;

  /**
   * When true, the toggle shows only icons (no text)
   */
  @property({ type: Boolean, reflect: true, attribute: "icon-only" }) iconOnly = false;

  /**
   * Sets the size of the toggle
   */
  @property({ type: String, reflect: true }) size: ToggleSize = "medium";

  /**
   * Emitted when the checked state changes. Event detail is a boolean checked value.
   */
  @event("bl-toggle-change") private onToggle: EventDispatcher<boolean>;

  // detect if a slotted icon exists (e.g. <bl-icon slot="icon">)
  private get _hasIconSlot() {
    return this.querySelector(':scope > [slot="icon"]') !== null;
  }

  private get _hasDefaultSlot() {
    const childNodes = [...this.childNodes];

    return childNodes.some(node => {
      const nodeType = node.nodeType;

      if (nodeType === node.TEXT_NODE && node.textContent?.trim() !== "") {
        return true;
      }

      if (nodeType === node.ELEMENT_NODE) {
        if (!(node as HTMLElement).hasAttribute("slot")) {
          return true;
        }
      }
      return false;
    });
  }

  connectedCallback(): void {
    super.connectedCallback();

    setDirectionProperty(this);
    // Make host focusable for keyboard interactions
    this.tabIndex = this.disabled ? -1 : 0;
    // Handle keyboard on host to ensure events fire when host is focused
    this.addEventListener("keydown", this.handleKeyDown as EventListener);
  }

  toggle() {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.onToggle(this.checked);
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.code === "Enter" || event.code === "Space") {
      this.toggle();
      event.preventDefault();
    }
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("disabled")) {
      this.tabIndex = this.disabled ? -1 : 0;
      if (this.disabled) {
        this.setAttribute("aria-disabled", "true");
      } else {
        this.removeAttribute("aria-disabled");
      }
    }
    // Sync ARIA on host for better accessibility
    this.setAttribute("role", "switch");
    this.setAttribute("aria-checked", String(this.checked));
  }

  render() {
    const ariaLabel =
      this.ariaLabel ?? this.attributes.getNamedItem("aria-label")?.value ?? undefined;

    const falseIconTpl = this.iconFalse ? html`<bl-icon name=${this.iconFalse}></bl-icon>` : "";
    const trueIconTpl = this.iconTrue ? html`<bl-icon name=${this.iconTrue}></bl-icon>` : "";

    const classes = {
      "toggle": true,
      "text-contain": true,
      "has-icon": !!(this.iconFalse || this.iconTrue || this._hasIconSlot),
      "has-content":
        !!(this._hasDefaultSlot || this.labelFalse || this.labelTrue) && !this.iconOnly,
    };

    const slotFalse = html` <span class="label false"
      ><slot name="icon">${falseIconTpl}</slot><span>${this.labelFalse}</span></span
    >`;
    const slotTrue = html` <span class="label true"
      ><slot name="icon">${trueIconTpl}</slot><span>${this.labelTrue}</span></span
    >`;

    const thumbSlot = html`
      <slot name="icon">${!this.checked ? falseIconTpl : trueIconTpl}</slot>
      <span>${!this.checked ? this.labelFalse : this.labelTrue}</span>
    `;

    return html`
      <div
        class=${classMap(classes)}
        .checked=${this.checked}
        ?inverted=${this.inverted}
        ?disabled=${this.disabled}
        role="switch"
        tabindex="${this.disabled ? -1 : 0}"
        @click=${this.toggle}
        aria-checked="${this.checked}"
        aria-disabled=${ifDefined(this.disabled ? "true" : undefined)}
        aria-label=${ifDefined(ariaLabel)}
      >
        <span class="track text-contain">${slotFalse} ${slotTrue} </span>
        <span class="thumb text-contain">${thumbSlot}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-toggle": BlToggle;
  }
}
