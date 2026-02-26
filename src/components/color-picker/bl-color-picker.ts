import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { event, EventDispatcher } from "../../utilities/event";
import "../input/bl-input";
import type BlInput from "../input/bl-input";
import style from "./bl-color-picker.css";

export type ColorFormat = "hex" | "rgb";

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSV {
  h: number;
  s: number;
  v: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** @internal */
export function hsvToRgb(h: number, s: number, v: number): RGB {
  s /= 100;
  v /= 100;

  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

/** @internal */
export function rgbToHsv(r: number, g: number, b: number): HSV {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }

  return { h: Math.round(h), s: Math.round(s * 100), v: Math.round(v * 100) };
}

/** @internal */
export function rgbToHex({ r, g, b }: RGB): string {
  return `#${[r, g, b].map(c => c.toString(16).padStart(2, "0")).join("")}`;
}

/** @internal */
export function hexToRgb(hex: string): RGB | null {
  let h = hex.replace("#", "");

  if (h.length === 3) {
    h = h
      .split("")
      .map(c => c + c)
      .join("");
  }

  const match = h.match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);

  if (!match) return null;

  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}

export const blColorPickerTag = "bl-color-picker";

/**
 * @tag bl-color-picker
 * @summary Baklava Color Picker component
 *
 * @cssproperty [--bl-color-picker-width=260px] Sets the width of the color picker
 */
@customElement(blColorPickerTag)
export default class BlColorPicker extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the selected color value in hex format
   */
  @property()
  value = "#ff0000";

  /**
   * Sets the display format for the color input
   */
  @property({ type: String, reflect: true })
  format: ColorFormat = "hex";

  /**
   * Sets the disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @state() private _hue = 0;
  @state() private _saturation = 100;
  @state() private _brightness = 100;

  private _activeDrag: "area" | "hue" | null = null;

  @query(".color-area") private _colorArea!: HTMLElement;
  @query(".hue-slider") private _hueSlider!: HTMLElement;

  /**
   * Fires when the selected color changes
   */
  @event("bl-color-change") private _onColorChange: EventDispatcher<string>;

  private get _rgb(): RGB {
    return hsvToRgb(this._hue, this._saturation, this._brightness);
  }

  private get _hex(): string {
    return rgbToHex(this._rgb);
  }

  connectedCallback() {
    super.connectedCallback();
    this._syncFromValue();
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has("value") && !this._activeDrag) {
      this._syncFromValue();
    }
  }

  private _syncFromValue() {
    const rgb = hexToRgb(this.value);

    if (!rgb) return;

    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);

    this._hue = hsv.h;
    this._saturation = hsv.s;
    this._brightness = hsv.v;
  }

  private _emitChange() {
    const hex = this._hex;

    this.value = hex;
    this._onColorChange(hex);
  }

  /* ── Color Area ── */

  private _updateAreaFromPointer(e: PointerEvent) {
    const rect = this._colorArea.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    const y = clamp(e.clientY - rect.top, 0, rect.height);

    this._saturation = Math.round((x / rect.width) * 100);
    this._brightness = Math.round(100 - (y / rect.height) * 100);
    this._emitChange();
  }

  private _handleAreaPointerDown = (e: PointerEvent) => {
    if (this.disabled || this._activeDrag) return;
    e.preventDefault();
    this._colorArea.focus();
    this._activeDrag = "area";
    this._colorArea.setPointerCapture(e.pointerId);
    this._updateAreaFromPointer(e);
  };

  private _handleAreaPointerMove = (e: PointerEvent) => {
    if (this._activeDrag !== "area") return;
    this._updateAreaFromPointer(e);
  };

  private _handleAreaPointerUp = (e: PointerEvent) => {
    if (this._activeDrag !== "area") return;
    this._activeDrag = null;
    this._colorArea.releasePointerCapture(e.pointerId);
  };

  private _handleAreaKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    const step = e.shiftKey ? 10 : 1;
    let handled = true;

    switch (e.key) {
      case "ArrowLeft":
        this._saturation = clamp(this._saturation - step, 0, 100);
        break;
      case "ArrowRight":
        this._saturation = clamp(this._saturation + step, 0, 100);
        break;
      case "ArrowUp":
        this._brightness = clamp(this._brightness + step, 0, 100);
        break;
      case "ArrowDown":
        this._brightness = clamp(this._brightness - step, 0, 100);
        break;
      default:
        handled = false;
    }

    if (handled) {
      e.preventDefault();
      this._emitChange();
    }
  };

  /* ── Hue Slider ── */

  private _updateHueFromPointer(e: PointerEvent) {
    const rect = this._hueSlider.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);

    this._hue = Math.round((x / rect.width) * 360);
    this._emitChange();
  }

  private _handleHuePointerDown = (e: PointerEvent) => {
    if (this.disabled || this._activeDrag) return;
    e.preventDefault();
    this._hueSlider.focus();
    this._activeDrag = "hue";
    this._hueSlider.setPointerCapture(e.pointerId);
    this._updateHueFromPointer(e);
  };

  private _handleHuePointerMove = (e: PointerEvent) => {
    if (this._activeDrag !== "hue") return;
    this._updateHueFromPointer(e);
  };

  private _handleHuePointerUp = (e: PointerEvent) => {
    if (this._activeDrag !== "hue") return;
    this._activeDrag = null;
    this._hueSlider.releasePointerCapture(e.pointerId);
  };

  private _handleHueKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    const step = e.shiftKey ? 10 : 1;
    let handled = true;

    switch (e.key) {
      case "ArrowLeft":
        this._hue = clamp(this._hue - step, 0, 360);
        break;
      case "ArrowRight":
        this._hue = clamp(this._hue + step, 0, 360);
        break;
      default:
        handled = false;
    }

    if (handled) {
      e.preventDefault();
      this._emitChange();
    }
  };

  /* ── Input Handling ── */

  private _handleHexInput(e: CustomEvent<string>) {
    const blInput = e.target as BlInput;
    const hex = `#${e.detail.trim()}`;
    const rgb = hexToRgb(hex);

    if (rgb) {
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);

      this._hue = hsv.h;
      this._saturation = hsv.s;
      this._brightness = hsv.v;
      this._emitChange();
    } else {
      blInput.value = this._hex.replace("#", "").toUpperCase();
    }
  }

  private _handleRgbInput(channel: "r" | "g" | "b", e: CustomEvent<string>) {
    const blInput = e.target as BlInput;
    const val = parseInt(e.detail);

    if (isNaN(val)) {
      blInput.value = String(this._rgb[channel]);
      return;
    }

    const rgb = this._rgb;

    rgb[channel] = clamp(val, 0, 255);

    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);

    this._hue = hsv.h;
    this._saturation = hsv.s;
    this._brightness = hsv.v;
    this._emitChange();
  }

  private _toggleFormat() {
    this.format = this.format === "hex" ? "rgb" : "hex";
  }

  /* ── Render ── */

  private _renderInputs(): TemplateResult {
    const rgb = this._rgb;

    if (this.format === "rgb") {
      return html`
        <div class="rgb-inputs">
          <bl-input
            class="rgb-input"
            type="number"
            size="small"
            label-fixed
            .value=${String(rgb.r)}
            @bl-change=${(e: CustomEvent<string>) => this._handleRgbInput("r", e)}
            ?disabled=${this.disabled}
          ></bl-input>
          <bl-input
            class="rgb-input"
            type="number"
            size="small"
            label-fixed
            .value=${String(rgb.g)}
            @bl-change=${(e: CustomEvent<string>) => this._handleRgbInput("g", e)}
            ?disabled=${this.disabled}
          ></bl-input>
          <bl-input
            class="rgb-input"
            type="number"
            size="small"
            label-fixed
            .value=${String(rgb.b)}
            @bl-change=${(e: CustomEvent<string>) => this._handleRgbInput("b", e)}
            ?disabled=${this.disabled}
          ></bl-input>
        </div>
      `;
    }

    return html`
      <bl-input
        class="hex-input"
        size="small"
        label-fixed
        .value=${this._hex.replace("#", "").toUpperCase()}
        @bl-change=${this._handleHexInput}
        ?disabled=${this.disabled}
        maxlength="6"
      ></bl-input>
    `;
  }

  private _renderLabels(): TemplateResult {
    if (this.format === "rgb") {
      return html`
        <div class="rgb-labels" @click=${this._toggleFormat}>
          <span>R</span>
          <span>G</span>
          <span>B</span>
        </div>
      `;
    }

    return html`<span class="format-label" @click=${this._toggleFormat}>HEX</span>`;
  }

  render(): TemplateResult {
    const hueColor = `hsl(${this._hue}, 100%, 50%)`;
    const areaThumbLeft = `${this._saturation}%`;
    const areaThumbTop = `${100 - this._brightness}%`;
    const hueThumbLeft = `${(this._hue / 360) * 100}%`;

    return html`
      <div class="color-picker">
        <div
          class="color-area"
          style="background-color: ${hueColor}"
          tabindex="0"
          role="slider"
          aria-label="Color"
          aria-valuetext="Saturation ${this._saturation}%, Brightness ${this._brightness}%"
          @pointerdown=${this._handleAreaPointerDown}
          @pointermove=${this._handleAreaPointerMove}
          @pointerup=${this._handleAreaPointerUp}
          @keydown=${this._handleAreaKeyDown}
        >
          <div class="area-thumb" style="left: ${areaThumbLeft}; top: ${areaThumbTop}"></div>
        </div>

        <div
          class="hue-slider"
          tabindex="0"
          role="slider"
          aria-label="Hue"
          aria-valuemin="0"
          aria-valuemax="360"
          aria-valuenow="${this._hue}"
          @pointerdown=${this._handleHuePointerDown}
          @pointermove=${this._handleHuePointerMove}
          @pointerup=${this._handleHuePointerUp}
          @keydown=${this._handleHueKeyDown}
        >
          <div
            class="slider-thumb"
            style="left: ${hueThumbLeft}; background-color: ${hueColor}"
          ></div>
        </div>

        <div class="input-section">
          <div class="input-row">
            <div class="color-preview" style="background-color: ${this._hex}"></div>
            ${this._renderInputs()}
          </div>
          <div class="label-row">
            <div class="spacer"></div>
            ${this._renderLabels()}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blColorPickerTag]: BlColorPicker;
  }
}
