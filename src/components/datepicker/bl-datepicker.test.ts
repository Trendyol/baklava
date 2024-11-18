import { aTimeout, expect, fixture, html } from "@open-wc/testing";
import BlDatepicker, { blDatepickerChangedEvent } from "./bl-datepicker";
import { BlButton, BlDatePicker } from "../../baklava";
import { blCalendarChangedEvent } from "../calendar/bl-calendar";
import { CALENDAR_TYPES } from "../calendar/bl-calendar.constant";
import sinon from "sinon";

describe("BlDatepicker", () => {
  let element: BlDatepicker;
  let getElementByIdStub: sinon.SinonStub;
  let consoleWarnSpy: sinon.SinonSpy;

  beforeEach(async () => {
    element = await fixture<BlDatePicker>(html`
      <bl-datepicker type="single" locale="en"></bl-datepicker>`);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    getElementByIdStub = sinon.stub(element.shadowRoot, "getElementById").callsFake((id) => {
      if (id === "datepicker-input") {
        return { offsetWidth: 300 };
      }
      if (id === "icon-container") {
        return { offsetWidth: 60 };
      }
      return null;
    });
    consoleWarnSpy = sinon.spy(console, "warn");

    await element.updateComplete;
  });

  afterEach(() => {
    getElementByIdStub.restore();
    consoleWarnSpy.restore();
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
    element._defaultValue = new Date(2024, 10, 10);

    const setDatePickerInputSpy = sinon.spy(element, "setDatePickerInput");

    await element.firstUpdated();

    expect(element._selectedDates).to.deep.equal([new Date(2024, 10, 10)]);

    expect(setDatePickerInputSpy).to.have.been.calledWith(element._selectedDates);
  });

  it("should handle an array of dates for default value", async () => {
    element._defaultValue = [new Date(2024, 10, 10), new Date(2024, 10, 11)];

    const setDatePickerInputSpy = sinon.spy(element, "setDatePickerInput");

    await element.firstUpdated();

    expect(element._selectedDates).to.deep.equal([
      new Date(2024, 10, 10),
      new Date(2024, 10, 11)
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

    const trigger = tooltip?.querySelector("[slot=\"tooltip-trigger\"]");

    expect(trigger).to.not.be.null;
    expect(trigger?.textContent).to.equal("+2");
  });

  it("should include \" ,...\" when floatingDateCount is greater than 0 for MULTIPLE type", () => {

    element.type = CALENDAR_TYPES.MULTIPLE;
    element._selectedDates = [new Date("2024-01-01"), new Date("2024-01-02"), new Date("2024-01-03")];
    element.setFloatingDates();
    element._defaultValueFormatter();
    expect(element._value).to.include(" ,...");
  });

  it("should not include \" ,...\" when floatingDateCount is 0 for MULTIPLE type", () => {

    element.type = CALENDAR_TYPES.MULTIPLE;
    element._selectedDates = [new Date("2024-01-01")];

    element.setFloatingDates();

    element._defaultValueFormatter();
    expect(element._value).to.not.include(" ,...");
  });

  it("should format a date correctly", () => {
    const testDate = new Date(2024, 9, 8);
    const formattedDate = element.formatDate(testDate);

    expect(formattedDate).to.equal("08/10/2024");
  });

  it("should handle single-digit days and months correctly", () => {
    const testDate = new Date(2024, 0, 5);
    const formattedDate = element.formatDate(testDate);

    expect(formattedDate).to.equal("05/01/2024");
  });

  it("should call openPopover when popoverEl is not visible", () => {
    const openPopoverSpy = sinon.spy(element, "openPopover");

    element._togglePopover();

    expect(openPopoverSpy).to.have.been.calledOnce;
    expect(element._popoverEl.visible).to.be.true;
    openPopoverSpy.restore();
  });

  it("should call closePopover when popoverEl is visible", () => {
    element._popoverEl.show();
    const closePopoverSpy = sinon.spy(element, "closePopover");

    element._togglePopover();

    expect(closePopoverSpy).to.have.been.calledOnce;
    expect(element._popoverEl.visible).to.be.false;
    closePopoverSpy.restore();
  });

  it("should return a single date when defaultValue is a single Date", () => {
    const date = new Date("2024-01-01");

    element._defaultValue = date;
    expect(element.defaultValue).to.equal(date);
  });

  it("should return an array of dates when defaultValue is an array of Dates", () => {
    const dates = [new Date("2024-01-01"), new Date("2024-02-01")];

    element._defaultValue = dates;
    expect(element.defaultValue).to.deep.equal(dates);
  });

  it("should return undefined if defaultValue is not set", () => {
    expect(element.defaultValue).to.be.undefined;
  });

  it("should warn when 'defaultValue' is not an array for multiple/range selection", async () => {
    element = await fixture<BlDatePicker>(html`
      <bl-datepicker type="multiple" locale="en"></bl-datepicker>`);
    element._defaultValue = new Date();

    element.firstUpdated();

    expect(consoleWarnSpy.calledOnce).to.be.true;
  });

  it("should not warn when defaultValue is an array for multiple/range selection", () => {
    element.type = CALENDAR_TYPES.MULTIPLE;
    element._defaultValue = [new Date(), new Date()];

    element.firstUpdated();

    expect(consoleWarnSpy.called).to.be.false;
  });

  it("should warn when defaultValue is an array but not exactly two Date objects in RANGE mode", async () => {
    element.type = CALENDAR_TYPES.RANGE;
    element._defaultValue = [];
    element.setDatePickerInput([]);

    await element.updateComplete;

    expect(consoleWarnSpy.calledOnce).to.be.true;
    expect(consoleWarnSpy.calledWith("'defaultValue' must be an array of two Date objects when the date selection mode is set to range.")).to.be.true;

    consoleWarnSpy.resetHistory();

    element._defaultValue = [new Date()];
    element.setDatePickerInput([new Date()]);

    await element.updateComplete;

    expect(consoleWarnSpy.calledOnce).to.be.true;
    expect(consoleWarnSpy.calledWith("'defaultValue' must be an array of two Date objects when the date selection mode is set to range.")).to.be.true;

    consoleWarnSpy.resetHistory();

    element._defaultValue = [new Date(), new Date(), new Date()];
    element.setDatePickerInput([new Date(), new Date(), new Date()]);

    await element.updateComplete;

    expect(consoleWarnSpy.calledOnce).to.be.true;
    expect(consoleWarnSpy.calledWith("'defaultValue' must be an array of two Date objects when the date selection mode is set to range.")).to.be.true;
  });

  it("should not warn when 'defaultValue' is an array of exactly two Date objects in RANGE mode", () => {
    element.type = CALENDAR_TYPES.RANGE;
    element._defaultValue = [new Date(), new Date()];

    element.firstUpdated();

    expect(consoleWarnSpy.called).to.be.false;
  });

  it("should warn if minDate is greater than or equal to maxDate", async () => {

    element.maxDate = new Date(2023, 0, 1);
    await element.updateComplete;

    element.minDate = new Date(2023, 0, 2);
    await element.updateComplete;

    expect(consoleWarnSpy.calledWith("minDate cannot be greater than maxDate.")).to.be.true;
  });

  it("should warn if maxDate is less than or equal to minDate", async () => {

    element.minDate = new Date(2023, 0, 2);
    await element.updateComplete;

    element.maxDate = new Date(2023, 0, 1);
    await element.updateComplete;

    expect(consoleWarnSpy.calledWith("maxDate cannot be smaller than minDate.")).to.be.true;
  });

});
