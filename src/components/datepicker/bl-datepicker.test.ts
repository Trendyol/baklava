import { aTimeout, expect, fixture, html } from "@open-wc/testing";
import BlDatepicker, { blDatepickerChangedEvent } from "./bl-datepicker";
import { BlButton, BlDatePicker } from "../../baklava";
import { blCalendarChangedEvent } from "../calendar/bl-calendar";
import { CALENDAR_TYPES } from "../calendar/bl-calendar.constant";
import sinon from "sinon";

describe("BlDatepicker", () => {
  let element : BlDatepicker;

  beforeEach(async () => {
    element = await fixture<BlDatePicker>(html`<bl-datepicker type="single" locale="en"></bl-datepicker>`);
    await element.updateComplete;
  });

  it("should instantiate the component", () => {
    expect(document.createElement("bl-datepicker")).instanceOf(HTMLElement);
  });

  it("should render the datepicker component", () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
  });

  it("should have default empty value", () => {
    expect(element._value).to.equal("");
  });

  it("should set placeholder correctly", async () => {
    element.placeholder = "Select a date";
    await element.updateComplete;

    expect(element._inputEl?.placeholder).to.equal("Select a date");
  });

  it("should open the popover when input is clicked", async () => {

    element._inputEl?.click();
    await element.updateComplete;

    expect(element._popoverEl).to.exist;
    expect(element._popoverEl?.visible).to.be.true;
  });

  it("should close the popover after selecting a date", async () => {

    element._inputEl?.click();
    await element.updateComplete;

    element._calendarEl?.dispatchEvent(new CustomEvent(blCalendarChangedEvent, { detail: [new Date()] }));
    await element.updateComplete;
    await aTimeout(400);
    expect(element._selectedDates.length).to.equal(1);
    expect(element._popoverEl.visible).to.be.false;
  });

  it("should trigger datepicker change event on date selection", async () => {
    const testDate = new Date(2023, 1, 1);

    element.addEventListener(blDatepickerChangedEvent, (event) => {
      const customEvent = event as CustomEvent;

      expect(customEvent).to.exist;
      expect(customEvent.detail).to.deep.equal([testDate]);

    });

    element._calendarEl.dispatchEvent(new CustomEvent(blCalendarChangedEvent, { detail: [testDate] }));

    await element.updateComplete;
  });

  it("should clear selected dates when clear button is clicked", async () => {
    element._selectedDates = [new Date(2023, 1, 1)];
    await element.updateComplete;

    const clearButton = element.shadowRoot?.querySelector("bl-button") as BlButton;

    clearButton?.click();
    await element.updateComplete;

    expect(element._selectedDates).to.deep.equal([]);
    expect(element._value).to.equal("");
  });

  it("should disable the input when 'disabled' is set", async () => {
    element.disabled = true;
    await element.updateComplete;

    const input = element._inputEl;

    expect(input?.hasAttribute("disabled")).to.be.true;
  });

  it("should use custom value formatter when provided", async () => {
    const testDate = new Date(2023, 1, 1);

    element.valueFormatter = (dates: Date[]) => `Custom format: ${dates[0].toDateString()}`;
    element.setDatePickerInput([testDate]);
    await element.updateComplete;

    expect(element._value).to.equal(`Custom format: ${testDate.toDateString()}`);
  });

  it("should handle multiple date selections", async () => {
    const dates = [new Date(2023, 1, 1), new Date(2023, 1, 2)];

    element.type = CALENDAR_TYPES.MULTIPLE;
    await element.updateComplete;

    element._calendarEl?.dispatchEvent(new CustomEvent(blCalendarChangedEvent, { detail: dates }));
    await element.updateComplete;

    expect(element._selectedDates.length).to.equal(2);
    expect(element._selectedDates).to.deep.equal(dates);
  });

  it("should clear the datepicker even if no dates are selected", async () => {
    element.clearDatepicker();
    await element.updateComplete;

    expect(element._selectedDates).to.deep.equal([]);
    expect(element._value).to.equal("");
  });

  it("should handle selecting a range of dates", async () => {
    const startDate = new Date(2023, 1, 1);
    const endDate = new Date(2023, 1, 7);

    element.type = CALENDAR_TYPES.RANGE;
    await element.updateComplete;

    element._calendarEl?.dispatchEvent(new CustomEvent(blCalendarChangedEvent, { detail: [startDate, endDate] }));
    await element.updateComplete;

    expect(element._selectedDates.length).to.equal(2);
    expect(element._selectedDates).to.deep.equal([startDate, endDate]);
  });

  it("should display help text when provided", async () => {
    element.helpText = "Please select a valid date.";
    await element.updateComplete;

    const input = element._inputEl;

    expect(input?.getAttribute("help-text")).to.equal("Please select a valid date.");
  });

  it("should close the popover after timeout", async () => {
    element._inputEl?.click();
    await element.updateComplete;

    element.closePopoverWithTimeout();
    await aTimeout(300);

    expect(element._popoverEl.visible).to.be.false;
  });

  it("should prevent default mousedown event and focus input element when clicked", async () => {
    const focusSpy = sinon.spy(element._inputEl, "focus");

    const inputAddEventListenerSpy = sinon.spy(element._inputEl, "addEventListener");
    const documentAddEventListenerSpy = sinon.spy(document, "addEventListener");

    await element.firstUpdated();

    expect(inputAddEventListenerSpy).to.have.been.calledWith("mousedown");
    expect(documentAddEventListenerSpy).to.have.been.calledWith("mousedown");

    const mousedownEvent = new MouseEvent("mousedown", { bubbles: true, cancelable: true });

    element._inputEl.dispatchEvent(mousedownEvent);

    expect(mousedownEvent.defaultPrevented).to.be.true;

    const documentMouseEvent = new MouseEvent("mousedown", { bubbles: true, composed: true });

    sinon.stub(documentMouseEvent, "composedPath").returns([element._inputEl]);

    document.dispatchEvent(documentMouseEvent);

    expect(focusSpy).to.have.been.called;
  });

  it("should set selected dates and call setDatePickerInput when default value is provided", async () => {
    element._defaultValue = new Date(2024,10,10);

    const setDatePickerInputSpy = sinon.spy(element, "setDatePickerInput");

    await element.firstUpdated();

    expect(element._selectedDates).to.deep.equal([new Date(2024,10,10)]);

    expect(setDatePickerInputSpy).to.have.been.calledWith(element._selectedDates);
  });

  it("should handle an array of dates for default value", async () => {
    element._defaultValue = [new Date(2024,10,10), new Date(2024,10,11)];

    const setDatePickerInputSpy = sinon.spy(element, "setDatePickerInput");

    await element.firstUpdated();

    expect(element._selectedDates).to.deep.equal([
      new Date(2024,10,10),
      new Date(2024,10,11)
    ]);

    expect(setDatePickerInputSpy).to.have.been.calledWith(element._selectedDates);
  });


  it("should insert a <br /> after every third item", () => {
    const inputString = "Item1, Item2, Item3, Item4";
    const result = element.formatAdditionalDates(inputString);

    expect(result[3].strings).to.include("<br />");
  });


  it("should render the tooltip when floatingDateCount > 0", async () => {
    element._floatingDateCount = 2;
    element.requestUpdate();

    await element.updateComplete;

    const tooltip = element.shadowRoot?.querySelector("bl-tooltip");

    expect(tooltip).to.not.be.null;

    const trigger = tooltip?.querySelector('[slot="tooltip-trigger"]');

    expect(trigger).to.not.be.null;
    expect(trigger?.textContent).to.equal("+2");
  });
});
