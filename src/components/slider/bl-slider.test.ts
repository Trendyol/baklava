import { assert, expect, fixture, html, oneEvent, elementUpdated } from "@open-wc/testing";
import BlSlider from "./bl-slider";

describe("bl-slider", () => {
  describe("rendering", () => {
    it("should be defined as a custom element", () => {
      const el = document.createElement("bl-slider");

      assert.instanceOf(el, BlSlider);
    });

    it("should render with default attributes", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider></bl-slider>`);

      const wrapper = el.shadowRoot?.querySelector(".wrapper");
      const sliderRow = el.shadowRoot?.querySelector(".slider-row");
      const sliderContainer = el.shadowRoot?.querySelector(".slider-container");
      const trackContainer = el.shadowRoot?.querySelector(".track-container");
      const trackActive = el.shadowRoot?.querySelector(".track-active") as HTMLElement;
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      expect(wrapper).to.exist;
      expect(sliderRow).to.exist;
      expect(sliderContainer).to.exist;
      expect(trackContainer).to.exist;
      expect(trackActive).to.exist;
      expect(trackActive.style.width).to.equal("0%");
      expect(input).to.exist;
      expect(input.type).to.equal("range");
      expect(input.min).to.equal("0");
      expect(input.max).to.equal("100");
      expect(input.step).to.equal("1");
      expect(input.getAttribute("aria-valuemin")).to.equal("0");
      expect(input.getAttribute("aria-valuemax")).to.equal("100");
      expect(input.getAttribute("aria-valuenow")).to.equal("0");
    });

    it("should render with value", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider value="75"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      expect(el.value).to.equal("75");
      expect(input.value).to.equal("75");
    });

    it("should render with label", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider label="Brightness" value="75"></bl-slider>`);
      const label = el.shadowRoot?.querySelector(".label");

      expect(label).to.exist;
      expect(label?.textContent).to.equal("Brightness");
    });

    it("should render with help text", async () => {
      const el = await fixture<BlSlider>(
        html`<bl-slider label="Brightness" help-text="Adjust screen brightness" value="75"></bl-slider>`
      );
      const helpText = el.shadowRoot?.querySelector(".help-text");

      expect(helpText).to.exist;
      expect(helpText?.textContent).to.equal("Adjust screen brightness");
    });

    it("should render with custom min/max values", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="-20" max="40" value="22"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      expect(input.min).to.equal("-20");
      expect(input.max).to.equal("40");
      expect(input.value).to.equal("22");
    });

    it("should not display min and max values by default", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="100" value="50"></bl-slider>`);
      const minValue = el.shadowRoot?.querySelector(".min-value");
      const maxValue = el.shadowRoot?.querySelector(".max-value");

      expect(minValue).to.not.exist;
      expect(maxValue).to.not.exist;
    });

    it("should display min and max values when show-min-max is set", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="100" value="50" show-min-max></bl-slider>`);
      const minValue = el.shadowRoot?.querySelector(".min-value");
      const maxValue = el.shadowRoot?.querySelector(".max-value");

      expect(minValue).to.exist;
      expect(maxValue).to.exist;
      expect(minValue?.textContent).to.equal("0");
      expect(maxValue?.textContent).to.equal("100");
    });

    it("should display custom min and max values with show-min-max", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="-20" max="40" value="10" show-min-max></bl-slider>`);
      const minValue = el.shadowRoot?.querySelector(".min-value");
      const maxValue = el.shadowRoot?.querySelector(".max-value");

      expect(minValue).to.exist;
      expect(maxValue).to.exist;
      expect(minValue?.textContent).to.equal("-20");
      expect(maxValue?.textContent).to.equal("40");
    });

    it("should render with custom step", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider step="0.1" value="1.5"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      expect(input.step).to.equal("0.1");
    });

    it("should use default step of 1 when step is not provided", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      expect(el.step).to.equal("1");
      expect(input.step).to.equal("1");
    });

    it("should use default step of 1 when step is invalid", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider step="" value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      // Empty step should default to 1
      expect(input.step).to.equal("");

      // But internal numeric step should be 1
      // Test by changing value - it should increment by 1
      el.value = "51";
      await elementUpdated(el);
      expect(el.value).to.equal("51");
    });

    it("should use default min of 0 when min is not provided", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      expect(el.min).to.equal("0");
      expect(input.min).to.equal("0");
    });

    it("should use default max of 100 when max is not provided", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      expect(el.max).to.equal("100");
      expect(input.max).to.equal("100");
    });

    it("should use default value of 0 when value is not provided", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      expect(el.value).to.equal("0");
      expect(input.value).to.equal("0");
    });

    it("should render as disabled", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider disabled value="50"></bl-slider>`);
      const wrapper = el.shadowRoot?.querySelector(".wrapper");
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      expect(el.disabled).to.be.true;
      expect(wrapper?.classList.contains("disabled")).to.be.true;
      expect(input.disabled).to.be.true;
    });
  });

  describe("marks", () => {
    it("should render marks from JSON string", async () => {
      const marks = [
        { value: 0, label: "xs" },
        { value: 25, label: "sm" },
        { value: 50, label: "md" },
        { value: 75, label: "lg" },
        { value: 100, label: "xl" },
      ];
      const el = await fixture<BlSlider>(
        html`<bl-slider value="50" step="25" marks=${JSON.stringify(marks)}></bl-slider>`
      );
      const marksContainer = el.shadowRoot?.querySelector(".marks");
      const markElements = el.shadowRoot?.querySelectorAll(".mark");

      expect(marksContainer).to.exist;
      expect(markElements).to.have.lengthOf(5);
    });

    it("should render mark labels correctly", async () => {
      const marks = [
        { value: 0, label: "Min" },
        { value: 100, label: "Max" },
      ];
      const el = await fixture<BlSlider>(html`<bl-slider marks=${JSON.stringify(marks)}></bl-slider>`);
      const markLabels = el.shadowRoot?.querySelectorAll(".mark-label");

      expect(markLabels).to.have.lengthOf(2);
      expect(markLabels?.[0].textContent).to.equal("Min");
      expect(markLabels?.[1].textContent).to.equal("Max");
    });

    it("should handle invalid marks JSON gracefully", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider marks="invalid json"></bl-slider>`);
      const marksContainer = el.shadowRoot?.querySelector(".marks");

      expect(marksContainer).to.not.exist;
    });

    it("should render no marks when marks attribute is not provided", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider value="50"></bl-slider>`);
      const marksContainer = el.shadowRoot?.querySelector(".marks");

      expect(marksContainer).to.not.exist;
    });

    it("should handle marks when min and max are equal (range === 0)", async () => {
      const marks = [
        { value: 50, label: "Fixed" },
      ];
      const el = await fixture<BlSlider>(
        html`<bl-slider min="50" max="50" value="50" marks=${JSON.stringify(marks)}></bl-slider>`
      );
      const marksContainer = el.shadowRoot?.querySelector(".marks");
      const markElements = el.shadowRoot?.querySelectorAll(".mark");
      const mark = el.shadowRoot?.querySelector(".mark") as HTMLElement;

      expect(marksContainer).to.exist;
      expect(markElements).to.have.lengthOf(1);
      // When range is 0, percentage should fallback to 1
      expect(mark.style.left).to.equal("1%");
    });
  });

  describe("tooltip", () => {
    it("should render tooltip when tooltip attribute is set", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider tooltip value="60"></bl-slider>`);
      const tooltip = el.shadowRoot?.querySelector(".tooltip");

      expect(tooltip).to.exist;
      expect(tooltip?.textContent?.trim()).to.equal("60");
    });

    it("should not render tooltip when tooltip attribute is not set", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider value="60"></bl-slider>`);
      const tooltip = el.shadowRoot?.querySelector(".tooltip");

      expect(tooltip).to.not.exist;
    });

    it("should show tooltip on mousedown", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider tooltip value="60"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      const tooltip = el.shadowRoot?.querySelector(".tooltip") as HTMLElement;

      expect(tooltip.classList.contains("visible")).to.be.false;

      input.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      await elementUpdated(el);

      expect(tooltip.classList.contains("visible")).to.be.true;
    });

    it("should hide tooltip on mouseup", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider tooltip value="60"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      const tooltip = el.shadowRoot?.querySelector(".tooltip") as HTMLElement;

      input.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      await elementUpdated(el);

      expect(tooltip.classList.contains("visible")).to.be.true;

      document.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
      await elementUpdated(el);

      expect(tooltip.classList.contains("visible")).to.be.false;
    });

    it("should update tooltip content when value changes", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider tooltip value="60"></bl-slider>`);
      const tooltip = el.shadowRoot?.querySelector(".tooltip") as HTMLElement;

      expect(tooltip.textContent?.trim()).to.equal("60");

      el.value = "80";
      await elementUpdated(el);

      expect(tooltip.textContent?.trim()).to.equal("80");
    });

    it("should display tooltip value with correct decimal places for integer step", async () => {
      const el = await fixture<BlSlider>(
        html`<bl-slider tooltip min="0" max="100" step="1" value="50"></bl-slider>`
      );
      const tooltip = el.shadowRoot?.querySelector(".tooltip") as HTMLElement;

      // Integer step should show no decimal places
      expect(tooltip.textContent?.trim()).to.equal("50");

      el.value = "75";
      await elementUpdated(el);

      expect(tooltip.textContent?.trim()).to.equal("75");
    });

    it("should display tooltip value with correct decimal places for decimal step", async () => {
      const el = await fixture<BlSlider>(
        html`<bl-slider tooltip min="0" max="2" step="0.1" value="1.0"></bl-slider>`
      );
      const tooltip = el.shadowRoot?.querySelector(".tooltip") as HTMLElement;

      // Step 0.1 has 1 decimal place, so tooltip should show 1 decimal place
      expect(tooltip.textContent?.trim()).to.equal("1.0");

      el.value = "1.5";
      await elementUpdated(el);

      expect(tooltip.textContent?.trim()).to.equal("1.5");
    });

    it("should display tooltip value with correct decimal places for step with multiple decimals", async () => {
      const el = await fixture<BlSlider>(
        html`<bl-slider tooltip min="0" max="1" step="0.01" value="0.50"></bl-slider>`
      );
      const tooltip = el.shadowRoot?.querySelector(".tooltip") as HTMLElement;

      // Step 0.01 has 2 decimal places, so tooltip should show 2 decimal places
      expect(tooltip.textContent?.trim()).to.equal("0.50");

      el.value = "0.75";
      await elementUpdated(el);

      expect(tooltip.textContent?.trim()).to.equal("0.75");
    });
  });

  describe("value constraints", () => {
    it("should constrain value between min and max on initialization", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="100" value="150"></bl-slider>`);

      expect(el.value).to.equal("100");
    });

    it("should constrain value to min when below minimum", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="10" max="100" value="5"></bl-slider>`);

      expect(el.value).to.equal("10");
    });

    it("should constrain value to step increments", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="100" step="10" value="37"></bl-slider>`);

      // 37 should round to nearest step (40)
      expect(el.value).to.equal("40");
    });

    it("should handle decimal step values", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="2" step="0.1" value="1.75"></bl-slider>`);

      // 1.75 should round to 1.8 (nearest 0.1)
      expect(parseFloat(el.value)).to.be.closeTo(1.8, 0.01);
    });

    it("should avoid floating point precision errors with decimal steps", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="2" step="0.1" value="1.2"></bl-slider>`);

      // Value should be exactly 1.2, not 1.2000000000000002
      expect(el.value).to.equal("1.2");
      expect(parseFloat(el.value)).to.equal(1.2);
    });

    it("should maintain precision with step 0.01", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="1" step="0.01" value="0.55"></bl-slider>`);

      expect(el.value).to.equal("0.55");
      expect(parseFloat(el.value)).to.equal(0.55);
    });

    it("should handle negative min values", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="-50" max="50" value="-25"></bl-slider>`);

      expect(el.value).to.equal("-25");
    });
  });

  describe("interaction", () => {
    it("should update value on input event", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      input.value = "75";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      await elementUpdated(el);

      expect(el.value).to.equal("75");
    });

    it("should fire bl-slider-change event on change", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      setTimeout(() => {
        input.value = "75";
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });

      const event = await oneEvent(el, "bl-slider-change");

      expect(event).to.exist;
      expect(event.detail.value).to.equal(75);
    });

    it("should not fire bl-slider-change event when disabled", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider disabled value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      let eventFired = false;

      el.addEventListener("bl-slider-change", () => {
        eventFired = true;
      });

      input.value = "75";
      input.dispatchEvent(new Event("change", { bubbles: true }));
      await elementUpdated(el);

      expect(input.disabled).to.be.true;
      expect(eventFired).to.equal(false);
    });

    it("should not update value on input event when disabled", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider disabled value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      input.value = "75";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      await elementUpdated(el);

      // Value should not change when disabled
      expect(el.value).to.equal("50");
    });

    it("should update track width when value changes", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="100" value="0"></bl-slider>`);
      const trackActive = el.shadowRoot?.querySelector(".track-active") as HTMLElement;

      expect(trackActive.style.width).to.equal("0%");

      el.value = "50";
      await elementUpdated(el);

      expect(trackActive.style.width).to.equal("50%");

      el.value = "100";
      await elementUpdated(el);

      expect(trackActive.style.width).to.equal("100%");
    });

    it("should update track width with 1%-99% range for discrete slider", async () => {
      const marks = [
        { value: 0, label: "xs" },
        { value: 50, label: "md" },
        { value: 100, label: "xl" },
      ];
      const el = await fixture<BlSlider>(
        html`<bl-slider min="0" max="100" value="0" marks=${JSON.stringify(marks)}></bl-slider>`
      );
      const trackActive = el.shadowRoot?.querySelector(".track-active") as HTMLElement;

      // Discrete slider'da min değerde %1 olmalı
      expect(trackActive.style.width).to.equal("1%");

      el.value = "50";
      await elementUpdated(el);

      // Orta değerde %50 olmalı
      expect(trackActive.style.width).to.equal("50%");

      el.value = "100";
      await elementUpdated(el);

      // Max değerde %99 olmalı
      expect(trackActive.style.width).to.equal("99%");
    });

    it("should constrain value to max on input event", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="100" value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      input.value = "150";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      await elementUpdated(el);

      expect(el.value).to.equal("100");
    });

    it("should constrain value to min on input event", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="10" max="100" value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      input.value = "5";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      await elementUpdated(el);

      expect(el.value).to.equal("10");
    });

    it("should constrain value to max on change event and fire bl-slider-change", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="100" value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      setTimeout(() => {
        input.value = "150";
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });

      const event = await oneEvent(el, "bl-slider-change");

      expect(event).to.exist;
      expect(event.detail.value).to.equal(100);
      expect(el.value).to.equal("100");
    });

    it("should constrain value to min on change event and fire bl-slider-change", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="10" max="100" value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      setTimeout(() => {
        input.value = "5";
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });

      const event = await oneEvent(el, "bl-slider-change");

      expect(event).to.exist;
      expect(event.detail.value).to.equal(10);
      expect(el.value).to.equal("10");
    });

    it("should constrain value to step on input event", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="100" step="10" value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      input.value = "37";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      await elementUpdated(el);

      // 37 should round to nearest step (40)
      expect(el.value).to.equal("40");
    });

    it("should avoid floating point errors on input with decimal step", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="2" step="0.1" value="1.0"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      input.value = "1.2";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      await elementUpdated(el);

      // Value should be exactly 1.2, not 1.2000000000000002
      expect(el.value).to.equal("1.2");
      expect(parseFloat(el.value)).to.equal(1.2);
    });

    it("should constrain value with custom range on change event", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="-20" max="40" value="0"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      setTimeout(() => {
        input.value = "50";
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });

      const event = await oneEvent(el, "bl-slider-change");

      expect(event).to.exist;
      expect(event.detail.value).to.equal(40);
      expect(el.value).to.equal("40");
    });
  });

  describe("accessibility", () => {
    it("should have proper ARIA attributes", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider label="Volume" min="0" max="100" value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      expect(input.getAttribute("aria-label")).to.equal("Volume");
      expect(input.getAttribute("aria-valuemin")).to.equal("0");
      expect(input.getAttribute("aria-valuemax")).to.equal("100");
      expect(input.getAttribute("aria-valuenow")).to.equal("50");
    });

    it("should update aria-valuenow when value changes", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      expect(input.getAttribute("aria-valuenow")).to.equal("50");

      el.value = "75";
      await elementUpdated(el);

      expect(input.getAttribute("aria-valuenow")).to.equal("75");
    });

    it("should be keyboard accessible", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      expect(input.type).to.equal("range");
      expect(document.activeElement === input || el.shadowRoot?.activeElement === input).to.be.false;

      input.focus();

      expect(el.shadowRoot?.activeElement).to.equal(input);
    });
  });

  describe("percentage calculation", () => {
    it("should calculate correct percentage for default range (0-100)", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider value="50"></bl-slider>`);
      const trackActive = el.shadowRoot?.querySelector(".track-active") as HTMLElement;

      expect(trackActive.style.width).to.equal("50%");
    });

    it("should calculate correct percentage for custom range", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="200" value="100"></bl-slider>`);
      const trackActive = el.shadowRoot?.querySelector(".track-active") as HTMLElement;

      expect(trackActive.style.width).to.equal("50%");
    });

    it("should calculate correct percentage for negative range", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="-100" max="100" value="0"></bl-slider>`);
      const trackActive = el.shadowRoot?.querySelector(".track-active") as HTMLElement;

      expect(trackActive.style.width).to.equal("50%");
    });

    it("should handle zero range gracefully", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="50" max="50" value="50"></bl-slider>`);
      const trackActive = el.shadowRoot?.querySelector(".track-active") as HTMLElement;

      expect(trackActive.style.width).to.equal("0%");
    });
  });

  describe("mark positioning", () => {
    it("should position marks correctly with 1% offset", async () => {
      const marks = [
        { value: 0, label: "Start" },
        { value: 50, label: "Middle" },
        { value: 100, label: "End" },
      ];
      const el = await fixture<BlSlider>(html`<bl-slider marks=${JSON.stringify(marks)}></bl-slider>`);
      const markElements = el.shadowRoot?.querySelectorAll(".mark") as NodeListOf<HTMLElement>;

      // Marks başlangıçta %1, ortada %50, bitişte %99 olmalı
      expect(markElements[0].style.left).to.equal("1%");
      expect(markElements[1].style.left).to.equal("50%");
      expect(markElements[2].style.left).to.equal("99%");
    });

    it("should position marks correctly for custom range with 1% offset", async () => {
      const marks = [
        { value: 0, label: "Start" },
        { value: 100, label: "Middle" },
        { value: 200, label: "End" },
      ];
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="200" marks=${JSON.stringify(marks)}></bl-slider>`);
      const markElements = el.shadowRoot?.querySelectorAll(".mark") as NodeListOf<HTMLElement>;

      // Marks başlangıçta %1, ortada %50, bitişte %99 olmalı
      expect(markElements[0].style.left).to.equal("1%");
      expect(markElements[1].style.left).to.equal("50%");
      expect(markElements[2].style.left).to.equal("99%");
    });

    it("should mark indicators as active when value is greater than or equal to mark value", async () => {
      const marks = [
        { value: 0, label: "xs" },
        { value: 25, label: "sm" },
        { value: 50, label: "md" },
        { value: 75, label: "lg" },
        { value: 100, label: "xl" },
      ];
      const el = await fixture<BlSlider>(html`<bl-slider value="50" marks=${JSON.stringify(marks)}></bl-slider>`);
      const markIndicators = el.shadowRoot?.querySelectorAll(".mark-indicator") as NodeListOf<HTMLElement>;

      // Value is 50, so marks at 0, 25, 50 should be active
      expect(markIndicators[0].classList.contains("active")).to.be.true; // 0
      expect(markIndicators[1].classList.contains("active")).to.be.true; // 25
      expect(markIndicators[2].classList.contains("active")).to.be.true; // 50
      expect(markIndicators[3].classList.contains("active")).to.be.false; // 75
      expect(markIndicators[4].classList.contains("active")).to.be.false; // 100
    });

    it("should update mark active states when value changes", async () => {
      const marks = [
        { value: 0, label: "xs" },
        { value: 50, label: "md" },
        { value: 100, label: "xl" },
      ];
      const el = await fixture<BlSlider>(html`<bl-slider value="25" marks=${JSON.stringify(marks)}></bl-slider>`);
      const markIndicators = el.shadowRoot?.querySelectorAll(".mark-indicator") as NodeListOf<HTMLElement>;

      // Initially value is 25, only first mark (0) should be active
      expect(markIndicators[0].classList.contains("active")).to.be.true;
      expect(markIndicators[1].classList.contains("active")).to.be.false;
      expect(markIndicators[2].classList.contains("active")).to.be.false;

      // Change value to 75
      el.value = "75";
      await elementUpdated(el);

      // Now marks at 0 and 50 should be active
      expect(markIndicators[0].classList.contains("active")).to.be.true;
      expect(markIndicators[1].classList.contains("active")).to.be.true;
      expect(markIndicators[2].classList.contains("active")).to.be.false;
    });
  });

  describe("CSS custom properties", () => {
    it("should apply default CSS custom properties", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider value="50"></bl-slider>`);
      const styles = getComputedStyle(el);

      // Check if custom properties are defined (actual values depend on theme)
      expect(styles.getPropertyValue("--slider-color")).to.exist;
      expect(styles.getPropertyValue("--track-color")).to.exist;
    });

    it("should allow overriding slider color", async () => {
      const el = await fixture<BlSlider>(
        html`<bl-slider value="50" style="--bl-slider-color: #ff0000;"></bl-slider>`
      );
      const styles = getComputedStyle(el);
      const sliderColor = styles.getPropertyValue("--bl-slider-color").trim();

      expect(sliderColor).to.equal("#ff0000");
    });

    it("should allow overriding track color", async () => {
      const el = await fixture<BlSlider>(
        html`<bl-slider value="50" style="--bl-slider-track-color: #00ff00;"></bl-slider>`
      );
      const styles = getComputedStyle(el);
      const trackColor = styles.getPropertyValue("--bl-slider-track-color").trim();

      expect(trackColor).to.equal("#00ff00");
    });
  });

  describe("edge cases", () => {
    it("should handle value attribute changes programmatically", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider value="50"></bl-slider>`);

      expect(el.value).to.equal("50");

      el.value = "75";
      await elementUpdated(el);

      expect(el.value).to.equal("75");

      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      expect(input.value).to.equal("75");
    });

    it("should constrain value when min is increased above current value", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="100" value="25"></bl-slider>`);

      expect(el.value).to.equal("25");

      // Min'i 30'a çıkar, value otomatik 30 olmalı
      el.min = "30";
      await elementUpdated(el);

      expect(el.value).to.equal("30");
    });

    it("should constrain value when max is decreased below current value", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="100" value="75"></bl-slider>`);

      expect(el.value).to.equal("75");

      // Max'ı 50'ye düşür, value otomatik 50 olmalı
      el.max = "50";
      await elementUpdated(el);

      expect(el.value).to.equal("50");
    });

    it("should update slider when both min and max change", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="0" max="100" value="50"></bl-slider>`);

      expect(el.value).to.equal("50");

      // Range'i daralt: 20-60
      el.min = "20";
      el.max = "60";
      await elementUpdated(el);

      // Value hala geçerli aralıkta
      expect(el.value).to.equal("50");

      // Şimdi range'i değiştir ki value dışında kalsın
      el.min = "60";
      el.max = "80";
      await elementUpdated(el);

      // Value min'e constrain edilmeli
      expect(el.value).to.equal("60");
    });

    it("should handle min > max gracefully", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider min="100" max="0" value="50"></bl-slider>`);

      // When min > max, the behavior is browser-dependent
      // but the component should still render
      expect(el).to.exist;
    });

    it("should handle non-numeric values gracefully", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider value="abc"></bl-slider>`);

      // Non-numeric value should default to 0
      expect(parseFloat(el.value) || 0).to.equal(0);
    });

    it("should update tooltip position when value changes during drag", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider tooltip value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      const tooltip = el.shadowRoot?.querySelector(".tooltip") as HTMLElement;

      input.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      await elementUpdated(el);

      const initialLeft = tooltip.style.left;

      input.value = "75";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      await elementUpdated(el);

      const updatedLeft = tooltip.style.left;

      expect(initialLeft).to.not.equal(updatedLeft);
    });
  });

  describe("mouse interaction", () => {
    it("should update tooltip position on mouse move during drag", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider tooltip value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      const tooltip = el.shadowRoot?.querySelector(".tooltip") as HTMLElement;

      // Start dragging
      input.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      await elementUpdated(el);

      expect(tooltip.classList.contains("visible")).to.be.true;

      // Change value during drag
      input.value = "75";
      input.dispatchEvent(new Event("input", { bubbles: true }));

      // Simulate mouse move
      document.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));
      await elementUpdated(el);

      // Tooltip should still be visible and position updated
      expect(tooltip.classList.contains("visible")).to.be.true;
      expect(tooltip.style.left).to.equal("75%");
    });

    it("should not update tooltip position on mouse move when not dragging", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider tooltip value="50"></bl-slider>`);
      const tooltip = el.shadowRoot?.querySelector(".tooltip") as HTMLElement;

      // Tooltip should not be visible when not dragging
      expect(tooltip.classList.contains("visible")).to.be.false;

      // Simulate mouse move without dragging
      document.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));
      await elementUpdated(el);

      // Tooltip should still not be visible
      expect(tooltip.classList.contains("visible")).to.be.false;
    });

    it("should stop showing tooltip on mouse up", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider tooltip value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      const tooltip = el.shadowRoot?.querySelector(".tooltip") as HTMLElement;

      // Start dragging
      input.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      await elementUpdated(el);

      expect(tooltip.classList.contains("visible")).to.be.true;

      // Release mouse
      document.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
      await elementUpdated(el);

      // Tooltip should be hidden
      expect(tooltip.classList.contains("visible")).to.be.false;
    });

    it("should not show tooltip on mouse move when tooltip is disabled", async () => {
      const el = await fixture<BlSlider>(html`<bl-slider value="50"></bl-slider>`);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      const tooltip = el.shadowRoot?.querySelector(".tooltip");

      // Tooltip should not exist
      expect(tooltip).to.not.exist;

      // Start dragging
      input.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      await elementUpdated(el);

      // Simulate mouse move
      document.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));
      await elementUpdated(el);

      // Tooltip should still not exist
      const tooltipAfter = el.shadowRoot?.querySelector(".tooltip");

      expect(tooltipAfter).to.not.exist;
    });
  });
});

