import { assert, expect, fixture, html, elementUpdated, oneEvent } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import BlColorPicker, { hsvToRgb, rgbToHsv, rgbToHex, hexToRgb } from "./bl-color-picker";
import type BlInput from "../input/bl-input";

import type typeOfBlColorPicker from "./bl-color-picker";

function getHexInput(el: typeOfBlColorPicker): BlInput {
  return el.shadowRoot!.querySelector<BlInput>("bl-input.hex-input")!;
}

function getRgbInputs(el: typeOfBlColorPicker): NodeListOf<BlInput> {
  return el.shadowRoot!.querySelectorAll<BlInput>(".rgb-inputs bl-input");
}

function fireBlChange(target: BlInput, value: string) {
  target.dispatchEvent(
    new CustomEvent("bl-change", { detail: value, bubbles: true, composed: true })
  );
}

function stubPointerCapture(element: HTMLElement) {
  element.setPointerCapture = () => {};
  element.releasePointerCapture = () => {};
}

function pointerEvent(type: string, x: number, y: number): PointerEvent {
  return new PointerEvent(type, {
    clientX: x,
    clientY: y,
    pointerId: 1,
    bubbles: true,
    composed: true,
  });
}

describe("bl-color-picker", () => {
  it("is defined", () => {
    const el = document.createElement("bl-color-picker");

    assert.instanceOf(el, BlColorPicker);
  });

  it("renders with default values", async () => {
    const el = await fixture<typeOfBlColorPicker>(
      html`<bl-color-picker></bl-color-picker>`
    );

    expect(el.value).to.equal("#ff0000");
    expect(el.format).to.equal("hex");
    expect(el.disabled).to.equal(false);
  });

  it("renders color area, hue slider, preview, and hex input", async () => {
    const el = await fixture<typeOfBlColorPicker>(
      html`<bl-color-picker></bl-color-picker>`
    );

    expect(el.shadowRoot!.querySelector(".color-area")).to.exist;
    expect(el.shadowRoot!.querySelector(".hue-slider")).to.exist;
    expect(el.shadowRoot!.querySelector(".color-preview")).to.exist;
    expect(getHexInput(el)).to.exist;
  });

  it("syncs internal HSV from value prop", async () => {
    const el = await fixture<typeOfBlColorPicker>(
      html`<bl-color-picker value="#00ff00"></bl-color-picker>`
    );
    const preview = el.shadowRoot!.querySelector<HTMLElement>(".color-preview")!;

    expect(preview.style.backgroundColor).to.equal("rgb(0, 255, 0)");
  });

  it("updates when value prop changes externally", async () => {
    const el = await fixture<typeOfBlColorPicker>(
      html`<bl-color-picker value="#ff0000"></bl-color-picker>`
    );

    el.value = "#0000ff";
    await elementUpdated(el);

    expect(getHexInput(el).value).to.equal("0000FF");
  });

  it("ignores invalid value prop", async () => {
    const el = await fixture<typeOfBlColorPicker>(
      html`<bl-color-picker value="#ff0000"></bl-color-picker>`
    );

    el.value = "invalid";
    await elementUpdated(el);

    const preview = el.shadowRoot!.querySelector<HTMLElement>(".color-preview")!;

    expect(preview.style.backgroundColor).to.equal("rgb(255, 0, 0)");
  });

  describe("hex input", () => {
    it("updates color on valid hex input", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker></bl-color-picker>`
      );

      fireBlChange(getHexInput(el), "00ff00");
      await elementUpdated(el);

      expect(el.value).to.equal("#00ff00");
    });

    it("resets input on invalid hex", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const hexInput = getHexInput(el);

      fireBlChange(hexInput, "zzz");

      expect(hexInput.value).to.equal("FF0000");
    });

    it("fires bl-color-change event on valid input", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker></bl-color-picker>`
      );

      setTimeout(() => fireBlChange(getHexInput(el), "0000ff"));

      const ev = await oneEvent(el, "bl-color-change");

      expect(ev.detail).to.equal("#0000ff");
    });
  });

  describe("rgb input", () => {
    it("shows RGB inputs when format is rgb", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker format="rgb"></bl-color-picker>`
      );

      expect(getRgbInputs(el).length).to.equal(3);
    });

    it("updates color on valid rgb input", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker format="rgb" value="#ff0000"></bl-color-picker>`
      );

      fireBlChange(getRgbInputs(el)[1], "255");
      await elementUpdated(el);

      expect(el.value).to.equal("#ffff00");
    });

    it("updates blue channel on valid rgb input", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker format="rgb" value="#ff0000"></bl-color-picker>`
      );

      fireBlChange(getRgbInputs(el)[2], "128");
      await elementUpdated(el);

      const rgb = hexToRgb(el.value)!;

      expect(rgb.b).to.equal(128);
    });

    it("resets input on NaN value", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker format="rgb" value="#ff0000"></bl-color-picker>`
      );
      const rgbInputs = getRgbInputs(el);

      fireBlChange(rgbInputs[0], "abc");

      expect(rgbInputs[0].value).to.equal("255");
    });

    it("clamps rgb values to 0-255", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker format="rgb" value="#800000"></bl-color-picker>`
      );

      fireBlChange(getRgbInputs(el)[0], "999");
      await elementUpdated(el);

      expect(el.value).to.equal("#ff0000");
    });

    it("clamps negative rgb values to 0", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker format="rgb" value="#800000"></bl-color-picker>`
      );

      fireBlChange(getRgbInputs(el)[0], "-50");
      await elementUpdated(el);

      const rgb = hexToRgb(el.value)!;

      expect(rgb.r).to.equal(0);
    });

    it("disables rgb inputs when disabled", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker format="rgb" disabled></bl-color-picker>`
      );
      const inputs = getRgbInputs(el);

      expect(inputs[0].disabled).to.equal(true);
      expect(inputs[1].disabled).to.equal(true);
      expect(inputs[2].disabled).to.equal(true);
    });
  });

  describe("format toggle", () => {
    it("toggles from hex to rgb on label click", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker></bl-color-picker>`
      );
      const label = el.shadowRoot!.querySelector<HTMLElement>(".format-label")!;

      label.click();
      await elementUpdated(el);

      expect(el.format).to.equal("rgb");
      expect(getRgbInputs(el).length).to.equal(3);
    });

    it("toggles from rgb to hex on label click", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker format="rgb"></bl-color-picker>`
      );
      const labels = el.shadowRoot!.querySelector<HTMLElement>(".rgb-labels")!;

      labels.click();
      await elementUpdated(el);

      expect(el.format).to.equal("hex");
      expect(getHexInput(el)).to.exist;
    });
  });

  describe("color area pointer interaction", () => {
    it("updates color on pointerdown", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;

      stubPointerCapture(area);

      const rect = area.getBoundingClientRect();

      area.dispatchEvent(pointerEvent("pointerdown", rect.left, rect.top + rect.height));
      await elementUpdated(el);

      expect(el.value).to.not.equal("#ff0000");
    });

    it("updates color on pointermove during drag", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;

      stubPointerCapture(area);

      const rect = area.getBoundingClientRect();

      area.dispatchEvent(pointerEvent("pointerdown", rect.left + rect.width, rect.top));
      const valueAfterDown = el.value;

      area.dispatchEvent(
        pointerEvent("pointermove", rect.left + rect.width / 2, rect.top + rect.height / 2)
      );
      await elementUpdated(el);

      expect(el.value).to.not.equal(valueAfterDown);
    });

    it("stops updating after pointerup", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;

      stubPointerCapture(area);

      const rect = area.getBoundingClientRect();

      area.dispatchEvent(pointerEvent("pointerdown", rect.left, rect.top));
      area.dispatchEvent(pointerEvent("pointerup", rect.left, rect.top));

      const valueAfterUp = el.value;

      area.dispatchEvent(
        pointerEvent("pointermove", rect.left + rect.width, rect.top + rect.height)
      );
      await elementUpdated(el);

      expect(el.value).to.equal(valueAfterUp);
    });

    it("ignores pointerdown when disabled", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker disabled value="#ff0000"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;

      stubPointerCapture(area);

      const rect = area.getBoundingClientRect();

      area.dispatchEvent(pointerEvent("pointerdown", rect.left, rect.top + rect.height));
      await elementUpdated(el);

      expect(el.value).to.equal("#ff0000");
    });

    it("ignores pointerdown when already dragging", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;
      const slider = el.shadowRoot!.querySelector<HTMLElement>(".hue-slider")!;

      stubPointerCapture(area);
      stubPointerCapture(slider);

      const sliderRect = slider.getBoundingClientRect();

      slider.dispatchEvent(
        pointerEvent("pointerdown", sliderRect.left + sliderRect.width / 2, sliderRect.top)
      );

      const areaRect = area.getBoundingClientRect();
      const valueBefore = el.value;

      area.dispatchEvent(pointerEvent("pointerdown", areaRect.left, areaRect.top + areaRect.height));

      expect(el.value).to.equal(valueBefore);
    });

    it("ignores pointermove when not dragging area", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;

      const rect = area.getBoundingClientRect();

      area.dispatchEvent(pointerEvent("pointermove", rect.left, rect.top + rect.height));
      await elementUpdated(el);

      expect(el.value).to.equal("#ff0000");
    });

    it("ignores pointerup when not dragging area", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;

      stubPointerCapture(area);

      area.dispatchEvent(pointerEvent("pointerup", 0, 0));

      expect(el.value).to.equal("#ff0000");
    });
  });

  describe("hue slider pointer interaction", () => {
    it("updates hue on pointerdown", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const slider = el.shadowRoot!.querySelector<HTMLElement>(".hue-slider")!;

      stubPointerCapture(slider);

      const rect = slider.getBoundingClientRect();

      slider.dispatchEvent(
        pointerEvent("pointerdown", rect.left + rect.width / 2, rect.top + rect.height / 2)
      );
      await elementUpdated(el);

      expect(el.value).to.not.equal("#ff0000");
    });

    it("updates hue on pointermove during drag", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const slider = el.shadowRoot!.querySelector<HTMLElement>(".hue-slider")!;

      stubPointerCapture(slider);

      const rect = slider.getBoundingClientRect();

      slider.dispatchEvent(pointerEvent("pointerdown", rect.left, rect.top + rect.height / 2));
      const afterDown = el.value;

      slider.dispatchEvent(
        pointerEvent("pointermove", rect.left + rect.width / 2, rect.top + rect.height / 2)
      );
      await elementUpdated(el);

      expect(el.value).to.not.equal(afterDown);
    });

    it("stops updating after pointerup", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const slider = el.shadowRoot!.querySelector<HTMLElement>(".hue-slider")!;

      stubPointerCapture(slider);

      const rect = slider.getBoundingClientRect();

      slider.dispatchEvent(pointerEvent("pointerdown", rect.left, rect.top + rect.height / 2));
      slider.dispatchEvent(pointerEvent("pointerup", rect.left, rect.top + rect.height / 2));

      const afterUp = el.value;

      slider.dispatchEvent(
        pointerEvent("pointermove", rect.left + rect.width, rect.top + rect.height / 2)
      );
      await elementUpdated(el);

      expect(el.value).to.equal(afterUp);
    });

    it("ignores pointerdown when disabled", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker disabled value="#ff0000"></bl-color-picker>`
      );
      const slider = el.shadowRoot!.querySelector<HTMLElement>(".hue-slider")!;

      stubPointerCapture(slider);

      const rect = slider.getBoundingClientRect();

      slider.dispatchEvent(
        pointerEvent("pointerdown", rect.left + rect.width / 2, rect.top + rect.height / 2)
      );
      await elementUpdated(el);

      expect(el.value).to.equal("#ff0000");
    });

    it("ignores pointermove when not dragging hue", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const slider = el.shadowRoot!.querySelector<HTMLElement>(".hue-slider")!;

      const rect = slider.getBoundingClientRect();

      slider.dispatchEvent(
        pointerEvent("pointermove", rect.left + rect.width / 2, rect.top + rect.height / 2)
      );
      await elementUpdated(el);

      expect(el.value).to.equal("#ff0000");
    });

    it("ignores pointerup when not dragging hue", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const slider = el.shadowRoot!.querySelector<HTMLElement>(".hue-slider")!;

      stubPointerCapture(slider);

      slider.dispatchEvent(pointerEvent("pointerup", 0, 0));

      expect(el.value).to.equal("#ff0000");
    });
  });

  describe("keyboard navigation", () => {
    it("adjusts saturation with ArrowLeft in color area", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;

      area.focus();
      await sendKeys({ press: "ArrowLeft" });
      await elementUpdated(el);

      expect(el.value).to.not.equal("#ff0000");
    });

    it("adjusts saturation with ArrowRight in color area", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#804040"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;

      area.focus();

      const before = el.value;

      await sendKeys({ press: "ArrowRight" });
      await elementUpdated(el);

      expect(el.value).to.not.equal(before);
    });

    it("adjusts brightness with ArrowUp in color area", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#800000"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;

      area.focus();
      await sendKeys({ press: "ArrowUp" });
      await elementUpdated(el);

      const initial = hexToRgb("#800000")!;
      const updated = hexToRgb(el.value)!;

      expect(updated.r).to.be.greaterThan(initial.r);
    });

    it("adjusts brightness with ArrowDown in color area", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;

      area.focus();
      await sendKeys({ press: "ArrowDown" });
      await elementUpdated(el);

      const updated = hexToRgb(el.value)!;

      expect(updated.r).to.be.lessThan(255);
    });

    it("uses bigger step with Shift key in color area", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;

      area.focus();

      area.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowLeft", shiftKey: true, bubbles: true })
      );
      await elementUpdated(el);

      expect(el.value).to.not.equal("#ff0000");
    });

    it("adjusts hue with ArrowRight on hue slider", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const slider = el.shadowRoot!.querySelector<HTMLElement>(".hue-slider")!;

      slider.focus();
      await sendKeys({ press: "ArrowRight" });
      await elementUpdated(el);

      expect(el.value).to.not.equal("#ff0000");
    });

    it("adjusts hue with ArrowLeft on hue slider", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#00ff00"></bl-color-picker>`
      );
      const slider = el.shadowRoot!.querySelector<HTMLElement>(".hue-slider")!;

      slider.focus();

      const before = el.value;

      await sendKeys({ press: "ArrowLeft" });
      await elementUpdated(el);

      expect(el.value).to.not.equal(before);
    });

    it("uses bigger step with Shift key on hue slider", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#00ff00"></bl-color-picker>`
      );
      const slider = el.shadowRoot!.querySelector<HTMLElement>(".hue-slider")!;

      slider.focus();

      const before = el.value;

      slider.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight", shiftKey: true, bubbles: true })
      );
      await elementUpdated(el);

      expect(el.value).to.not.equal(before);
    });

    it("ignores unhandled keys in color area", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;

      area.focus();
      area.dispatchEvent(new KeyboardEvent("keydown", { key: "a", bubbles: true }));
      await elementUpdated(el);

      expect(el.value).to.equal("#ff0000");
    });

    it("ignores unhandled keys in hue slider", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const slider = el.shadowRoot!.querySelector<HTMLElement>(".hue-slider")!;

      slider.focus();
      slider.dispatchEvent(new KeyboardEvent("keydown", { key: "a", bubbles: true }));
      await elementUpdated(el);

      expect(el.value).to.equal("#ff0000");
    });
  });

  describe("disabled state", () => {
    it("reflects disabled attribute", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker disabled></bl-color-picker>`
      );

      expect(el.disabled).to.equal(true);
      expect(el.getAttribute("disabled")).to.not.be.null;
    });

    it("disables bl-input when disabled", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker disabled></bl-color-picker>`
      );

      expect(getHexInput(el).disabled).to.equal(true);
    });

    it("ignores area keyboard events when disabled", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker disabled value="#ff0000"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;

      area.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
      await elementUpdated(el);

      expect(el.value).to.equal("#ff0000");
    });

    it("ignores hue keyboard events when disabled", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker disabled value="#ff0000"></bl-color-picker>`
      );
      const slider = el.shadowRoot!.querySelector<HTMLElement>(".hue-slider")!;

      slider.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
      await elementUpdated(el);

      expect(el.value).to.equal("#ff0000");
    });
  });

  describe("updated lifecycle", () => {
    it("skips sync when dragging", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;

      stubPointerCapture(area);

      const rect = area.getBoundingClientRect();

      area.dispatchEvent(pointerEvent("pointerdown", rect.left, rect.top));

      el.value = "#0000ff";
      await elementUpdated(el);

      const preview = el.shadowRoot!.querySelector<HTMLElement>(".color-preview")!;

      expect(preview.style.backgroundColor).to.not.equal("rgb(0, 0, 255)");
    });
  });

  describe("render output", () => {
    it("sets color area background to current hue", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#00ff00"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector<HTMLElement>(".color-area")!;

      expect(area.style.backgroundColor).to.equal("rgb(0, 255, 0)");
    });

    it("positions area thumb based on saturation and brightness", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const thumb = el.shadowRoot!.querySelector<HTMLElement>(".area-thumb")!;

      expect(thumb.style.left).to.equal("100%");
      expect(thumb.style.top).to.equal("0%");
    });

    it("positions hue slider thumb based on hue", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#00ff00"></bl-color-picker>`
      );
      const thumb = el.shadowRoot!.querySelector<HTMLElement>(".slider-thumb")!;
      const leftPercent = parseFloat(thumb.style.left);

      expect(leftPercent).to.be.closeTo((120 / 360) * 100, 1);
    });

    it("sets hue slider thumb background to current hue color", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#00ff00"></bl-color-picker>`
      );
      const thumb = el.shadowRoot!.querySelector<HTMLElement>(".slider-thumb")!;

      expect(thumb.style.backgroundColor).to.equal("rgb(0, 255, 0)");
    });

    it("updates aria-valuenow on hue slider", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#00ff00"></bl-color-picker>`
      );
      const slider = el.shadowRoot!.querySelector(".hue-slider")!;

      expect(slider.getAttribute("aria-valuenow")).to.equal("120");
    });

    it("updates aria-valuetext on color area", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#ff0000"></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector(".color-area")!;
      const text = area.getAttribute("aria-valuetext")!;

      expect(text).to.include("Saturation");
      expect(text).to.include("Brightness");
    });

    it("updates color preview background", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#3498db"></bl-color-picker>`
      );
      const preview = el.shadowRoot!.querySelector<HTMLElement>(".color-preview")!;

      expect(preview.style.backgroundColor).to.not.be.empty;
    });

    it("renders area thumb at bottom-left for black", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker value="#000000"></bl-color-picker>`
      );
      const thumb = el.shadowRoot!.querySelector<HTMLElement>(".area-thumb")!;

      expect(thumb.style.left).to.equal("0%");
      expect(thumb.style.top).to.equal("100%");
    });
  });

  describe("accessibility", () => {
    it("color area has role=slider and aria attributes", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker></bl-color-picker>`
      );
      const area = el.shadowRoot!.querySelector(".color-area")!;

      expect(area.getAttribute("role")).to.equal("slider");
      expect(area.getAttribute("aria-label")).to.equal("Color");
      expect(area.getAttribute("tabindex")).to.equal("0");
    });

    it("hue slider has role=slider and aria attributes", async () => {
      const el = await fixture<typeOfBlColorPicker>(
        html`<bl-color-picker></bl-color-picker>`
      );
      const slider = el.shadowRoot!.querySelector(".hue-slider")!;

      expect(slider.getAttribute("role")).to.equal("slider");
      expect(slider.getAttribute("aria-label")).to.equal("Hue");
      expect(slider.getAttribute("aria-valuemin")).to.equal("0");
      expect(slider.getAttribute("aria-valuemax")).to.equal("360");
    });
  });

  describe("color utility functions", () => {
    it("hsvToRgb converts pure red", () => {
      expect(hsvToRgb(0, 100, 100)).to.deep.equal({ r: 255, g: 0, b: 0 });
    });

    it("hsvToRgb converts pure green", () => {
      expect(hsvToRgb(120, 100, 100)).to.deep.equal({ r: 0, g: 255, b: 0 });
    });

    it("hsvToRgb converts pure blue", () => {
      expect(hsvToRgb(240, 100, 100)).to.deep.equal({ r: 0, g: 0, b: 255 });
    });

    it("hsvToRgb converts black", () => {
      expect(hsvToRgb(0, 0, 0)).to.deep.equal({ r: 0, g: 0, b: 0 });
    });

    it("hsvToRgb converts white", () => {
      expect(hsvToRgb(0, 0, 100)).to.deep.equal({ r: 255, g: 255, b: 255 });
    });

    it("hsvToRgb handles all hue ranges", () => {
      expect(hsvToRgb(30, 100, 100)).to.deep.equal({ r: 255, g: 128, b: 0 });
      expect(hsvToRgb(90, 100, 100)).to.deep.equal({ r: 128, g: 255, b: 0 });
      expect(hsvToRgb(150, 100, 100)).to.deep.equal({ r: 0, g: 255, b: 128 });
      expect(hsvToRgb(210, 100, 100)).to.deep.equal({ r: 0, g: 128, b: 255 });
      expect(hsvToRgb(270, 100, 100)).to.deep.equal({ r: 128, g: 0, b: 255 });
      expect(hsvToRgb(330, 100, 100)).to.deep.equal({ r: 255, g: 0, b: 128 });
    });

    it("hsvToRgb handles 50% saturation and brightness", () => {
      const rgb = hsvToRgb(0, 50, 50);

      expect(rgb.r).to.equal(128);
      expect(rgb.g).to.equal(64);
      expect(rgb.b).to.equal(64);
    });

    it("rgbToHsv converts pure red", () => {
      expect(rgbToHsv(255, 0, 0)).to.deep.equal({ h: 0, s: 100, v: 100 });
    });

    it("rgbToHsv converts black (max === 0, s === 0)", () => {
      expect(rgbToHsv(0, 0, 0)).to.deep.equal({ h: 0, s: 0, v: 0 });
    });

    it("rgbToHsv converts green (max === g)", () => {
      const hsv = rgbToHsv(0, 255, 0);

      expect(hsv.h).to.equal(120);
      expect(hsv.s).to.equal(100);
      expect(hsv.v).to.equal(100);
    });

    it("rgbToHsv converts blue (max === b)", () => {
      const hsv = rgbToHsv(0, 0, 255);

      expect(hsv.h).to.equal(240);
    });

    it("rgbToHsv handles g < b when max is r (hue wraps with +6)", () => {
      const hsv = rgbToHsv(255, 0, 128);

      expect(hsv.h).to.equal(330);
    });

    it("rgbToHsv converts gray (d === 0, h stays 0)", () => {
      const hsv = rgbToHsv(128, 128, 128);

      expect(hsv.h).to.equal(0);
      expect(hsv.s).to.equal(0);
      expect(hsv.v).to.equal(50);
    });

    it("rgbToHsv converts cyan (max === g, b > r)", () => {
      const hsv = rgbToHsv(0, 255, 255);

      expect(hsv.h).to.equal(180);
    });

    it("rgbToHsv converts magenta (max === b, r > g)", () => {
      const hsv = rgbToHsv(255, 0, 255);

      expect(hsv.h).to.equal(300);
    });

    it("rgbToHex converts correctly", () => {
      expect(rgbToHex({ r: 255, g: 0, b: 0 })).to.equal("#ff0000");
      expect(rgbToHex({ r: 0, g: 255, b: 0 })).to.equal("#00ff00");
      expect(rgbToHex({ r: 0, g: 0, b: 255 })).to.equal("#0000ff");
      expect(rgbToHex({ r: 255, g: 255, b: 255 })).to.equal("#ffffff");
    });

    it("rgbToHex pads single-digit hex values", () => {
      expect(rgbToHex({ r: 0, g: 0, b: 0 })).to.equal("#000000");
      expect(rgbToHex({ r: 1, g: 2, b: 3 })).to.equal("#010203");
    });

    it("hexToRgb parses 6-digit hex", () => {
      expect(hexToRgb("#ff5733")).to.deep.equal({ r: 255, g: 87, b: 51 });
    });

    it("hexToRgb parses 3-digit shorthand", () => {
      expect(hexToRgb("#f00")).to.deep.equal({ r: 255, g: 0, b: 0 });
    });

    it("hexToRgb parses without hash", () => {
      expect(hexToRgb("00ff00")).to.deep.equal({ r: 0, g: 255, b: 0 });
    });

    it("hexToRgb returns null for invalid hex", () => {
      expect(hexToRgb("zzz")).to.be.null;
      expect(hexToRgb("#xyz")).to.be.null;
      expect(hexToRgb("")).to.be.null;
    });

    it("hexToRgb returns null for wrong length", () => {
      expect(hexToRgb("#ff")).to.be.null;
      expect(hexToRgb("#ff00")).to.be.null;
    });
  });
});
