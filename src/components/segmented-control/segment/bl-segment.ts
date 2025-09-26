import { LitElement, html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BlSegmentedControl } from "../../../baklava";
import { event, EventDispatcher } from "../../../utilities/event";
import { BaklavaIcon } from "../../icon/icon-list";
import styles from "./bl-segment.css";

export const blSegmentTag = "bl-segment";

/**
 * Simple data-holder element for bl-segmented-control. It does not render visible UI itself.
 */
@customElement(blSegmentTag)
export default class BlSegment extends LitElement {
  /** Value used by segmented control */
  @property({ type: String }) value = "";

  /** Optional label; if empty, value will be used */
  @property({ type: String }) label = "";

  /** Optional icon name */
  @property({ type: String }) icon?: BaklavaIcon;

  /** Whether this option is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Optional custom color to use when this segment is selected */
  @property({ type: String }) color?: string;

  @property({ type: Boolean }) iconOnly = false;

  @property({ type: Boolean, reflect: true }) selected = false;

  @event("bl-segment-click") private onSegmentClick: EventDispatcher<{
    value: string;
    segment: BlSegment;
  }>;

  private _segmentedControl?: BlSegmentedControl;

  static get styles(): CSSResultGroup {
    return [styles];
  }

  connectedCallback(): void {
    super.connectedCallback();

    // Find parent segmented control and register (when it's defined)
    const parent = this.closest("bl-segmented-control");
    const tryRegister = () => {
      this._segmentedControl = this.closest("bl-segmented-control") as BlSegmentedControl;
      if (
        this._segmentedControl &&
        typeof (this._segmentedControl as BlSegmentedControl).registerSegment === "function"
      ) {
        (this._segmentedControl as BlSegmentedControl).registerSegment(this);
      }
    };

    if (parent) {
      customElements.whenDefined("bl-segmented-control").then(() => queueMicrotask(tryRegister));
    }

    // Set slot attribute for proper slotting
    this.setAttribute("slot", "segments");

    this.addEventListener("click", this.handleClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this._segmentedControl) {
      this._segmentedControl.unregisterSegment(this);
    }

    this.removeEventListener("click", this.handleClick);
  }

  private handleClick = (event: Event) => {
    if (this.disabled) return;

    event.stopPropagation();
    this.onSegmentClick({ value: this.value, segment: this });
  };

  private renderIcon(icon?: BaklavaIcon): TemplateResult | string {
    return icon ? html`<bl-icon class="icon" name=${icon} part="icon"></bl-icon>` : "";
  }

  render(): TemplateResult {
    return html`${this.renderIcon(this.icon as BaklavaIcon)}
    ${!this.iconOnly
      ? html`<span class="label" part="label">${this.label || this.value}</span>`
      : ""}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blSegmentTag]: BlSegment;
  }
}
