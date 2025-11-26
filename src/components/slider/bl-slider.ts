import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import { event, EventDispatcher } from "../../utilities/event";
import style from "./bl-slider.css";

export interface SliderMark {
  value: number;
  label: string;
}

/**
 * @tag bl-slider
 * @summary Baklava Slider component
 *
 * @cssproperty [--bl-slider-color=--bl-color-primary] Color of the active track & thumb
 * @cssproperty [--bl-slider-track-color=--bl-color-neutral-lightest] Color of the inactive track
 */
@customElement("bl-slider")
export default class BlSlider extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the label of the slider
   */
  @property({ type: String })
  label?: string;

  /**
   * Makes slider disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets slider value
   */
  @property({ type: String })
  value = "0";

  /**
   * Sets help text for the slider
   */
  @property({ type: String, attribute: "help-text" })
  helpText?: string;

  /**
   * Sets min value for the slider
   */
  @property({ type: String })
  min = "0";

  /**
   * Sets max value for the slider
   */
  @property({ type: String })
  max = "100";

  /**
   * Sets step increment for the slider
   */
  @property({ type: String })
  step = "1";

  /**
   * Shows value tooltip during slider interaction
   */
  @property({ type: Boolean })
  tooltip = false;

  /**
   * JSON string of objects with value and label properties to display marks on the slider
   */
  @property({ type: String })
  marks?: string;

  /**
   * Shows min and max values next to the slider
   */
  @property({ type: Boolean, attribute: "show-min-max" })
  showMinMax = false;

  @state()
  private _isDragging = false;

  /**
   * Fires when slider value changes through user interaction
   */
  @event("bl-slider-change") private onChange: EventDispatcher<{ value: number }>;

  private get _numericValue(): number {
    return parseFloat(this.value) || 0;
  }

  private get _numericMin(): number {
    return parseFloat(this.min) || 0;
  }

  private get _numericMax(): number {
    return parseFloat(this.max) || 100;
  }

  private get _numericStep(): number {
    return parseFloat(this.step) || 1;
  }

  private get _decimalPlaces(): number {
    const stepStr = this._numericStep.toString();

    return stepStr.includes(".") ? stepStr.split(".")[1].length : 0;
  }

  private get _range(): number {
    return this._numericMax - this._numericMin;
  }

  private get _parsedMarks(): SliderMark[] {
    if (!this.marks) return [];

    try {
      return JSON.parse(this.marks);
    } catch {
      return [];
    }
  }

  private get _percentage(): number {
    if (this._range === 0) return 0;

    const basePercentage = ((this._numericValue - this._numericMin) / this._range) * 100;

    // Discrete slider (marks varsa) ise track %1-%99 arasında olmalı
    if (this._parsedMarks.length > 0) {
      return 1 + (basePercentage / 100) * 98;
    }

    return basePercentage;
  }

  private _constrainValue(value: number): number {
    // Clamp value between min and max
    let constrained = Math.max(this._numericMin, Math.min(this._numericMax, value));

    // Round to step
    const steps = Math.round((constrained - this._numericMin) / this._numericStep);

    constrained = this._numericMin + steps * this._numericStep;

    // Ensure we don't exceed max due to floating point arithmetic
    constrained = Math.min(this._numericMax, constrained);

    // Fix floating point precision issues
    return parseFloat(constrained.toFixed(this._decimalPlaces));
  }

  private _updateValue(event: Event, emitEvent = false) {
    if (this.disabled) return;

    const input = event.target as HTMLInputElement;
    const constrainedValue = this._constrainValue(parseFloat(input.value));

    this.value = String(constrainedValue);

    if (emitEvent) {
      this.onChange({ value: constrainedValue });
    }
  }

  private _handleInput = (event: Event) => this._updateValue(event, false);
  private _handleChange = (event: Event) => this._updateValue(event, true);

  private _handleMouseDown = () => {
    if (!this.disabled && this.tooltip) {
      this._isDragging = true;
    }
  };

  private _handleMouseUp = () => {
    if (this.tooltip) {
      this._isDragging = false;
    }
  };

  private _handleMouseMove = () => {
    if (this._isDragging && this.tooltip) {
      this.requestUpdate();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    // Constrain initial value
    const constrainedValue = this._constrainValue(this._numericValue);

    if (constrainedValue !== this._numericValue) {
      this.value = String(constrainedValue);
    }

    document.addEventListener("mouseup", this._handleMouseUp);
    document.addEventListener("mousemove", this._handleMouseMove);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("mouseup", this._handleMouseUp);
    document.removeEventListener("mousemove", this._handleMouseMove);
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    // Min veya max değiştiğinde value'yu yeniden constrain et
    if (changedProperties.has("min") || changedProperties.has("max")) {
      const constrainedValue = this._constrainValue(this._numericValue);

      if (constrainedValue !== this._numericValue) {
        this.value = String(constrainedValue);
      }
    }
  }

  private _renderLabel() {
    return this.label ? html`<label class="label">${this.label}</label>` : null;
  }

  private _renderHelpText() {
    return this.helpText ? html`<div class="help-text">${this.helpText}</div>` : null;
  }

  private _renderMarks() {
    const marks = this._parsedMarks;

    if (marks.length === 0) return null;

    return html`
      <div class="marks">
        ${marks.map(mark => {
          // Marks başlangıçta %1, bitişte %99 olacak şekilde ayarlanır
          const percentage =
            this._range === 0 ? 1 : 1 + ((mark.value - this._numericMin) / this._range) * 98;
          const isActive = mark.value <= this._numericValue;

          return html`
            <div class="mark" style=${styleMap({ left: `${percentage}%` })}>
              <div class=${classMap({ "mark-indicator": true, "active": isActive })}></div>
              <div class="mark-label">${mark.label}</div>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderTooltip() {
    if (!this.tooltip) return null;

    const tooltipClasses = {
      "tooltip": true,
      "visible": this._isDragging,
    };

    const displayValue = this._numericValue.toFixed(this._decimalPlaces);

    return html`
      <div class=${classMap(tooltipClasses)} style=${styleMap({ left: `${this._percentage}%` })}>
        ${displayValue}
      </div>
    `;
  }

  render(): TemplateResult {
    const wrapperClasses = {
      "wrapper": true,
      "disabled": this.disabled,
    };

    const trackStyle = styleMap({
      width: `${this._percentage}%`,
    });

    return html`
      <div class=${classMap(wrapperClasses)}>
        ${this._renderLabel()}

        <div class="slider-row">
          ${this.showMinMax ? html`<div class="min-value">${this._numericMin}</div>` : null}

          <div class="slider-container">
            ${this._renderTooltip()}

            <div class="track-container">
              <div class="track-inactive"></div>
              <div class="track-active" style=${trackStyle}></div>
            </div>

            <input
              type="range"
              class="input"
              .value=${this.value}
              min=${this.min}
              max=${this.max}
              step=${this.step}
              ?disabled=${this.disabled}
              @input=${this._handleInput}
              @change=${this._handleChange}
              @mousedown=${this._handleMouseDown}
              aria-label=${ifDefined(this.label)}
              aria-valuemin=${this.min}
              aria-valuemax=${this.max}
              aria-valuenow=${this.value}
            />

            ${this._renderMarks()}
          </div>

          ${this.showMinMax ? html`<div class="max-value">${this._numericMax}</div>` : null}
        </div>

        ${this._renderHelpText()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-slider": BlSlider;
  }
}
