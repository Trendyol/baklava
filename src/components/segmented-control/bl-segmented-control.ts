import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import { setDirectionProperty } from "../../utilities/direction";
import { event, EventDispatcher } from "../../utilities/event";
import styles from "./bl-segmented-control.css";
import type BlSegment from "./segment/bl-segment";

export type SegmentedSize = "small" | "medium" | "large";
export type SegmentedOrientation = "horizontal" | "vertical";

/**
 * @tag bl-segmented-control
 * @summary Baklava Segmented Control component
 *
 * Segmented control allows selection from two or more options. It supports optional labels and/or icons and can be vertical.
 *
 * @cssproperty [--bl-segment-bg=var(--bl-color-neutral-lightest, #eee)] Sets the background color for the active selected segment.
 * @cssproperty [--bl-segment-color=var(--bl-color-neutral-none, #000)] Sets the text color for the active selected segment.
 * @cssproperty [--bl-segment-selected-bg=var(--bl-segment-color-on, var(--bl-color-primary))] Sets the background color of the selected segment (thumb)
 * @cssproperty [--bl-segment-selected-color=var(--bl-color-info-contrast, #fff)] Sets text/icon color of the selected segment
 * @cssproperty [--bl-segment-width=max-content] Sets fixed width of the component.
 * @cssproperty [--bl-segment-animation-duration=300ms] Sets the transition duration for thumb/track.
 */
@customElement("bl-segmented-control")
export default class BlSegmentedControl extends LitElement {
  static get styles(): CSSResultGroup {
    return [styles];
  }

  private _connectedSegments: BlSegment[] = [];

  private get segments(): BlSegment[] {
    return this._connectedSegments;
  }

  /**
   * Current selected value
   */
  @property({ type: String, reflect: true }) value = "";

  /** Disable the whole component */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** When true, shows only icons (no text) if icons exist */
  @property({ type: Boolean, reflect: true, attribute: "icon-only" }) iconOnly = false;

  /** Size */
  @property({ type: String, reflect: true }) size: SegmentedSize = "medium";

  /** Orientation: horizontal or vertical */
  @property({ type: String, reflect: true }) orientation: SegmentedOrientation = "horizontal";

  /**
   * Emitted when the value changes. Event detail is the selected value.
   */
  @event("bl-segmented-control-change") private onChange: EventDispatcher<string>;

  private focusedIndex = 0;
  private resizeObserver?: ResizeObserver;

  /**
   * Register a segment (called by bl-segment on connect)
   */
  registerSegment(segment: BlSegment): void {
    const isFirstAndNotDisabled =
      this._connectedSegments.filter(s => !s.disabled).length === 0 && !segment.disabled;

    this._connectedSegments.push(segment);

    // Inherit props from parent to segment
    segment.iconOnly = this.iconOnly;

    if (!segment.disabled && segment.selected) {
      this.value = segment.value;
      this.focusedIndex = this._connectedSegments.length - 1;
    } else if (!this.value && isFirstAndNotDisabled) {
      // Otherwise, if no value yet, fall back to first enabled segment
      this.value = segment.value;
      this.focusedIndex = this._connectedSegments.length - 1;
    }
    // Ensure layout is updated for thumb positioning
    // Force a render so that style variables/DOM reflect any new selection
    queueMicrotask(() => {
      this.updateSegmentStates();
      this.requestUpdate();
      this.updateThumb();
      this.setupResizeObserver();
    });
  }

  /**
   * Unregister a segment (called by bl-segment on disconnect)
   */
  unregisterSegment(segment: BlSegment): void {
    const index = this._connectedSegments.indexOf(segment);

    if (index !== -1) {
      this._connectedSegments.splice(index, 1);
    }

    // If the removed segment was selected, pick the next available
    if (segment.value === this.value) {
      const next = this._connectedSegments.find(s => !s.disabled);

      this.value = next?.value ?? "";
    }

    // Adjust focused index bounds
    const idx = this.indexOfValue(this.value);

    if (idx >= 0) this.focusedIndex = idx;
    this.updateSegmentStates();
    this.updateThumb();
    this.setupResizeObserver();
  }

  connectedCallback(): void {
    super.connectedCallback();
    setDirectionProperty(this);
    // Make host focusable to support arrow key navigation
    this.tabIndex = this.disabled ? -1 : 0;
    this.addEventListener("keydown", this.handleKeyDown as EventListener);
    this.addEventListener("bl-segment-click", this.handleSegmentClick as EventListener);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.removeEventListener("bl-segment-click", this.handleSegmentClick as EventListener);
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("disabled")) {
      this.tabIndex = this.disabled ? -1 : 0;
      if (this.disabled) {
        this.setAttribute("aria-disabled", "true");
      } else {
        this.removeAttribute("aria-disabled");
      }
      this.updateSegmentStates();
    }

    if (changed.has("iconOnly")) {
      this._connectedSegments.forEach(segment => (segment.iconOnly = this.iconOnly));
    }

    // ensure a focused index points to a selected option when value changes
    if (changed.has("value")) {
      const idx = this.indexOfValue(this.value);

      if (idx >= 0) this.focusedIndex = idx;
      this.updateSegmentStates();
    }

    // After DOM updates, refresh thumb metrics (async to ensure layout is ready)
    requestAnimationFrame(() => {
      this.updateThumb();
      this.setupResizeObserver();
    });
  }

  private updateSegmentStates(): void {
    this._connectedSegments.forEach((segment, index) => {
      const isSelected = segment.value === this.value;
      const isDisabled = this.disabled || segment.disabled;

      segment.selected = isSelected;
      segment.classList.add("content");
      segment.setAttribute("role", "radio");
      segment.setAttribute("aria-checked", String(isSelected));

      if (isDisabled) {
        segment.setAttribute("aria-disabled", "true");
        segment.setAttribute("tabindex", "-1");
      } else {
        segment.removeAttribute("aria-disabled");
        segment.setAttribute("tabindex", index === this.focusedIndex ? "0" : "-1");
      }
    });
  }

  private indexOfValue(value: string): number {
    return this.segments.findIndex(o => o.value === value);
  }

  private get availableIndices(): number[] {
    return this.segments
      .map((o, i) => (this.disabled || o.disabled ? -1 : i))
      .filter(i => i !== -1);
  }

  private selectByIndex(index: number) {
    if (this.disabled) return;
    const option = this.segments[index];

    if (!option || option.disabled) return;

    this.value = option.value;
    this.onChange(this.value);
  }

  private handleSegmentClick = (event: CustomEvent<{ value: string }>) => {
    const { value } = event.detail;
    const index = this.indexOfValue(value);

    if (index !== -1) {
      this.selectByIndex(index);
      this.focusedIndex = index;
      this.updateSegmentStates();
    }
  };

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.segments.length) return;

    const nextKeys = ["ArrowRight", "ArrowDown"];
    const prevKeys = ["ArrowLeft", "ArrowUp"];

    if (nextKeys.includes(event.key)) {
      // move forward
      const indices = this.availableIndices;

      if (!indices.length) return;
      const current = indices.indexOf(this.focusedIndex);

      this.focusedIndex = indices[(current + 1 + indices.length) % indices.length];
      this.updateSegmentStates();
      this.requestUpdate();
      event.preventDefault();
      return;
    }
    if (prevKeys.includes(event.key)) {
      // move backward
      const indices = this.availableIndices;

      if (!indices.length) return;
      const current = indices.indexOf(this.focusedIndex);

      this.focusedIndex = indices[(current - 1 + indices.length) % indices.length];
      this.updateSegmentStates();
      this.requestUpdate();
      event.preventDefault();
      return;
    }
    if (event.key === " " || event.key === "Enter") {
      this.selectByIndex(this.focusedIndex);
      event.preventDefault();
      return;
    }
  }

  private setupResizeObserver() {
    const shadow = this.shadowRoot;

    if (!shadow) return;

    const wrapper = shadow.querySelector(".segmented");

    // Recreate observer each time to ensure a fresh observed elements list
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.updateThumb();
    });

    if (wrapper instanceof HTMLElement) this.resizeObserver.observe(wrapper);

    // Observe actual slotted segments
    this._connectedSegments.forEach(el => {
      if (el instanceof HTMLElement) this.resizeObserver!.observe(el);
    });
  }

  private updateThumb() {
    const shadow = this.shadowRoot;

    if (!shadow) return;

    const wrapper = shadow.querySelector(".segmented") as HTMLElement | null;
    const track = shadow.querySelector(".track") as HTMLElement | null;

    if (!wrapper || !track || !this._connectedSegments.length) return;

    const idx = this.indexOfValue(this.value);

    if (idx < 0) return;
    const selected = this._connectedSegments[idx];

    const trackRect = track.getBoundingClientRect();
    const selectedRect = selected.getBoundingClientRect();

    if (this.orientation !== "vertical") {
      const dir = getComputedStyle(this).direction;
      const width = selectedRect.width;
      const offset =
        dir === "rtl" ? trackRect.right - selectedRect.right : selectedRect.left - trackRect.left;

      wrapper.style.setProperty("--thumb-width", `${Math.round(width)}px`);
      wrapper.style.setProperty("--thumb-offset", `${Math.round(offset)}px`);
      wrapper.style.removeProperty("--thumb-height");
    } else {
      const height = selectedRect.height;
      const offset = selectedRect.top - trackRect.top;

      wrapper.style.setProperty("--thumb-height", `${Math.round(height)}px`);
      wrapper.style.setProperty("--thumb-offset", `${Math.round(offset)}px`);
      wrapper.style.removeProperty("--thumb-width");
    }
  }

  render(): TemplateResult {
    const ariaLabel = this.ariaLabel ?? this.getAttribute("aria-label") ?? undefined;

    const segments = this.segments;

    // if no explicit value yet, prefer a pre-selected child, otherwise the first non-disabled child
    if (!this.value && segments.length) {
      const preselectedIdx = segments.findIndex(s => !s.disabled && s.selected);

      if (preselectedIdx === -1) {
        const firstIdx = this.availableIndices[0];

        if (firstIdx !== undefined) this.value = segments[firstIdx].value;
      }
    }

    const idx = this.indexOfValue(this.value);
    const hasSelection = idx >= 0;
    const selectedIndex = hasSelection ? idx : 0;
    const selected = segments[selectedIndex];

    const styleVars: Record<string, string> = {
      "--count": String(Math.max(1, segments.length)),
      "--index": String(selectedIndex),
    };

    if (selected?.color) {
      styleVars["--selected-bg"] = String(selected.color);
    }

    const classes = {
      segmented: true,
    };

    return html`
      <div
        class=${classMap(classes)}
        style=${styleMap(styleVars)}
        role="radiogroup"
        aria-label=${ifDefined(ariaLabel)}
        aria-disabled=${this.disabled ? "true" : "false"}
        data-has-selection=${hasSelection ? "true" : "false"}
        @focus=${() => (this.focusedIndex = selectedIndex >= 0 ? selectedIndex : 0)}
      >
        <span class="track">
          <slot name="segments"></slot>
        </span>
        <span class="thumb" aria-hidden="true"></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-segmented-control": BlSegmentedControl;
  }
}
